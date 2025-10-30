# Next.js 面试题

## Next.js 基础概念

### 1. 什么是 Next.js

Next.js 是一个基于 React 的全栈框架，由 Vercel 开发和维护。它提供了开箱即用的服务端渲染（SSR）、静态站点生成（SSG）、API 路由等功能。

**核心特点：**
- 零配置：开箱即用
- 混合渲染：支持 SSR、SSG、ISR、CSR
- 文件系统路由：基于文件的路由系统
- API 路由：内置后端 API 支持
- 自动代码分割：优化加载性能
- 图片优化：内置 Image 组件
- 快速刷新：极速的开发体验
- TypeScript 支持：原生支持 TypeScript

### 2. Next.js vs React

| 特性     | React                      | Next.js            |
| -------- | -------------------------- | ------------------ |
| 路由     | 需要额外库（React Router） | 文件系统路由       |
| SSR      | 需要自己实现               | 内置支持           |
| 代码分割 | 手动配置                   | 自动实现           |
| API 路由 | 需要单独后端               | 内置支持           |
| 图片优化 | 手动处理                   | Image 组件自动优化 |
| SEO      | 需要额外配置               | 原生支持           |

### 3. Next.js 版本演进

**Pages Router（Next.js 12 及之前）：**
- 基于 pages 目录的路由
- getServerSideProps、getStaticProps
- 传统的客户端/服务端混合模式

**App Router（Next.js 13+）：**
- 基于 app 目录的路由
- React Server Components
- Streaming 和 Suspense
- 嵌套布局
- Server Actions

## 渲染模式

### 1. 静态生成（SSG - Static Site Generation）

在构建时生成 HTML，适用于内容不经常变化的页面。

**Pages Router：**
```javascript
// pages/posts/[id].js
export async function getStaticProps({ params }) {
  const post = await fetchPost(params.id);
  return {
    props: { post },
    revalidate: 60, // ISR: 60秒后重新生成
  };
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  const paths = posts.map(post => ({
    params: { id: post.id }
  }));
  
  return {
    paths,
    fallback: 'blocking', // false | true | 'blocking'
  };
}

export default function Post({ post }) {
  return <div>{post.title}</div>;
}
```

**App Router：**
```javascript
// app/posts/[id]/page.js
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map(post => ({
    id: post.id
  }));
}

export default async function Post({ params }) {
  const post = await fetchPost(params.id);
  return <div>{post.title}</div>;
}
```

**优点：**
- 性能最佳，访问速度快
- 可以部署到 CDN
- SEO 友好

**缺点：**
- 数据可能不是最新的
- 构建时间随页面数量增长

### 2. 服务端渲染（SSR - Server-Side Rendering）

每次请求时在服务器端生成 HTML。

**Pages Router：**
```javascript
// pages/dashboard.js
export async function getServerSideProps(context) {
  const { req, res, query, params } = context;
  
  // 可以访问 cookies, headers
  const user = await fetchUser(req.cookies.token);
  
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  return {
    props: { user },
  };
}

export default function Dashboard({ user }) {
  return <div>Welcome {user.name}</div>;
}
```

**App Router：**
```javascript
// app/dashboard/page.js
import { cookies, headers } from 'next/headers';

export default async function Dashboard() {
  // 使用动态数据源会自动变成 SSR
  const cookieStore = cookies();
  const headersList = headers();
  
  const user = await fetchUser(cookieStore.get('token'));
  
  return <div>Welcome {user.name}</div>;
}
```

**优点：**
- 数据始终是最新的
- 可以访问请求信息（cookies、headers）
- SEO 友好

**缺点：**
- 服务器负载较大
- TTFB（首字节时间）较长
- 需要服务器运行

### 3. 增量静态再生（ISR - Incremental Static Regeneration）

在请求时重新生成静态页面，结合了 SSG 和 SSR 的优点。

**Pages Router：**
```javascript
export async function getStaticProps() {
  const posts = await fetchPosts();
  
  return {
    props: { posts },
    revalidate: 10, // 每10秒重新生成
  };
}
```

**App Router：**
```javascript
// app/posts/page.js
export const revalidate = 10; // 每10秒重新验证

export default async function Posts() {
  const posts = await fetchPosts();
  return <PostList posts={posts} />;
}
```

**按需重新验证：**
```javascript
// pages/api/revalidate.js
export default async function handler(req, res) {
  try {
    await res.revalidate('/posts/1');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
```

**优点：**
- 结合了 SSG 的性能和 SSR 的新鲜度
- 减少服务器负载
- 可以处理大量页面

### 4. 客户端渲染（CSR - Client-Side Rendering）

在浏览器端使用 JavaScript 渲染内容。

```javascript
'use client'; // App Router 中需要标记

import { useState, useEffect } from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);
  
  return <PostList posts={posts} />;
}
```

**使用场景：**
- 需要用户交互的内容
- 个性化内容
- 实时数据
- 不需要 SEO 的页面

## 路由系统

### 1. Pages Router（传统）

**基于文件的路由：**
```
pages/
├── index.js           → /
├── about.js           → /about
├── blog/
│   ├── index.js       → /blog
│   ├── [slug].js      → /blog/:slug
│   └── [...slug].js   → /blog/*
└── api/
    └── users.js       → /api/users
```

**动态路由：**
```javascript
// pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  
  return <div>Post: {id}</div>;
}
```

**Catch-all 路由：**
```javascript
// pages/docs/[...slug].js
export default function Docs() {
  const router = useRouter();
  const { slug } = router.query; // slug 是数组
  
  // /docs/a/b/c → slug: ['a', 'b', 'c']
  return <div>{slug?.join('/')}</div>;
}
```

**可选 Catch-all 路由：**
```javascript
// pages/docs/[[...slug]].js
// 匹配 /docs 和 /docs/a/b/c
```

### 2. App Router（新）

**文件约定：**
```
app/
├── page.js            → /（页面）
├── layout.js          → 布局
├── loading.js         → 加载状态
├── error.js           → 错误处理
├── not-found.js       → 404 页面
├── template.js        → 模板
├── blog/
│   ├── page.js        → /blog
│   ├── [slug]/
│   │   └── page.js    → /blog/:slug
│   └── layout.js      → 博客布局
└── dashboard/
    ├── layout.js
    ├── page.js        → /dashboard
    └── settings/
        └── page.js    → /dashboard/settings
```

**布局嵌套：**
```javascript
// app/layout.js（根布局）
export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// app/dashboard/layout.js（嵌套布局）
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

**路由组（Route Groups）：**
```
app/
├── (marketing)/
│   ├── about/
│   └── blog/
└── (shop)/
    ├── cart/
    └── checkout/
```
括号中的文件夹不会出现在 URL 中。

**并行路由（Parallel Routes）：**
```javascript
// app/layout.js
export default function Layout({ children, team, analytics }) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  );
}

// 文件结构
app/
├── @team/
│   └── page.js
├── @analytics/
│   └── page.js
└── page.js
```

**拦截路由（Intercepting Routes）：**
```
app/
├── feed/
│   └── page.js
└── photo/
    ├── [id]/
    │   └── page.js
    └── (..)feed/
        └── page.js
```

### 3. 路由导航

**Pages Router：**
```javascript
import { useRouter } from 'next/router';
import Link from 'next/link';

function Navigation() {
  const router = useRouter();
  
  // 声明式导航
  return <Link href="/about">关于</Link>;
  
  // 编程式导航
  const handleClick = () => {
    router.push('/dashboard');
    router.replace('/dashboard'); // 不添加历史记录
    router.back(); // 返回
    router.reload(); // 刷新
  };
}
```

**App Router：**
```javascript
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Navigation() {
  const router = useRouter();
  
  // 编程式导航
  const handleClick = () => {
    router.push('/dashboard');
    router.replace('/dashboard');
    router.back();
    router.forward();
    router.refresh(); // 重新获取数据
    router.prefetch('/about'); // 预取
  };
}
```

## 数据获取

### 1. Pages Router 数据获取

**getStaticProps（SSG）：**
```javascript
export async function getStaticProps(context) {
  const { params, preview, previewData, locale, locales } = context;
  
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 60, // ISR
    notFound: false, // 返回 404
    redirect: { destination: '/', permanent: false }
  };
}
```

**getServerSideProps（SSR）：**
```javascript
export async function getServerSideProps(context) {
  const { req, res, query, params, resolvedUrl } = context;
  
  // 设置缓存
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  
  const data = await fetchData();
  
  return {
    props: { data }
  };
}
```

**getStaticPaths（动态 SSG）：**
```javascript
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: false // false | true | 'blocking'
  };
}
```

**fallback 选项：**
- `false`：未生成的路径返回 404
- `true`：首次请求时显示 fallback UI，然后生成页面
- `'blocking'`：首次请求时等待页面生成（类似 SSR）

```javascript
// fallback: true 的使用
export default function Post({ post }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return <div>{post.title}</div>;
}
```

### 2. App Router 数据获取

**Server Components 中直接获取：**
```javascript
// app/posts/page.js
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache', // 默认：缓存
    // cache: 'no-store', // 不缓存（SSR）
    // next: { revalidate: 60 } // ISR
  });
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}
```

**fetch 缓存选项：**
```javascript
// 缓存（SSG）
fetch(url, { cache: 'force-cache' });

// 不缓存（SSR）
fetch(url, { cache: 'no-store' });

// ISR
fetch(url, { next: { revalidate: 3600 } });

// 标记缓存
fetch(url, { next: { tags: ['posts'] } });
```

**并行数据获取：**
```javascript
async function getData() {
  const [posts, users] = await Promise.all([
    fetchPosts(),
    fetchUsers()
  ]);
  
  return { posts, users };
}
```

**顺序数据获取：**
```javascript
async function getData() {
  const user = await fetchUser();
  const posts = await fetchPostsByUser(user.id);
  
  return { user, posts };
}
```

**预加载数据（避免瀑布流）：**
```javascript
// lib/data.js
import { cache } from 'react';

export const getUser = cache(async (id) => {
  const user = await db.user.findUnique({ id });
  return user;
});

// 多次调用 getUser(1) 只会执行一次
```

### 3. 客户端数据获取

**SWR（推荐）：**
```javascript
'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return <div>Hello {data.name}</div>;
}
```

**React Query：**
```javascript
'use client';

import { useQuery } from '@tanstack/react-query';

export default function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(r => r.json())
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  
  return <PostList posts={data} />;
}
```

## API Routes

### 1. Pages Router API Routes

```javascript
// pages/api/users.js
export default function handler(req, res) {
  const { method, query, body, cookies } = req;
  
  switch (method) {
    case 'GET':
      res.status(200).json({ users: [] });
      break;
    case 'POST':
      // 创建用户
      res.status(201).json({ user: body });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// 配置
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    externalResolver: true,
  },
};
```

**动态 API 路由：**
```javascript
// pages/api/posts/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  res.status(200).json({ id, title: 'Post Title' });
}
```

**文件上传：**
```javascript
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    res.status(200).json({ files });
  });
}
```

### 2. App Router Route Handlers

```javascript
// app/api/posts/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  const posts = await fetchPosts();
  
  return NextResponse.json({ posts });
}

export async function POST(request) {
  const body = await request.json();
  const post = await createPost(body);
  
  return NextResponse.json({ post }, { status: 201 });
}
```

**动态路由：**
```javascript
// app/api/posts/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params;
  const post = await fetchPost(id);
  
  return NextResponse.json({ post });
}
```

**请求和响应：**
```javascript
export async function POST(request) {
  // 获取请求头
  const authorization = request.headers.get('authorization');
  
  // 获取 cookies
  const token = request.cookies.get('token');
  
  // 获取请求体
  const body = await request.json();
  // const formData = await request.formData();
  
  // 设置响应头和 cookies
  const response = NextResponse.json({ success: true });
  response.headers.set('X-Custom-Header', 'value');
  response.cookies.set('token', 'abc123', {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7天
  });
  
  return response;
}
```

### 3. Server Actions

Server Actions 允许在客户端组件中直接调用服务端函数。

```javascript
// app/actions.js
'use server';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  const post = await db.post.create({
    data: { title, content }
  });
  
  revalidatePath('/posts'); // 重新验证路径
  redirect(`/posts/${post.id}`); // 重定向
  
  return { success: true, post };
}
```

**在客户端组件中使用：**
```javascript
'use client';

import { createPost } from './actions';
import { useFormState, useFormStatus } from 'react-dom';

export default function CreatePostForm() {
  const [state, formAction] = useFormState(createPost, null);
  
  return (
    <form action={formAction}>
      <input name="title" />
      <textarea name="content" />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  );
}
```

**直接调用 Server Action：**
```javascript
'use client';

import { createPost } from './actions';

export default function CreatePost() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await createPost(formData);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Server Components vs Client Components

### 1. Server Components（默认）

Server Components 在服务器端渲染，不会发送到客户端。

**特点：**
- 可以直接访问后端资源（数据库、文件系统）
- 保持敏感信息在服务器端（API 密钥、令牌）
- 减少客户端 JavaScript 体积
- 更好的 SEO
- 不能使用浏览器 API
- 不能使用 React Hooks（useState、useEffect 等）
- 不能使用事件处理

```javascript
// app/posts/page.js（Server Component）
async function getPosts() {
  const posts = await db.post.findMany();
  return posts;
}

export default async function Posts() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}
```

### 2. Client Components

需要使用 `'use client'` 指令标记。

**特点：**
- 可以使用浏览器 API
- 可以使用 React Hooks
- 可以处理用户交互
- 会增加客户端 JavaScript 体积

```javascript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### 3. 组件组合模式

**推荐的模式：**
```javascript
// app/page.js（Server Component）
import ClientComponent from './ClientComponent';

async function getData() {
  const data = await fetchData();
  return data;
}

export default async function Page() {
  const data = await getData();
  
  // 将数据作为 props 传递给客户端组件
  return <ClientComponent data={data} />;
}
```

**将 Server Component 作为 children 传递：**
```javascript
// ClientComponent.js
'use client';

export default function ClientComponent({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && children}
    </div>
  );
}

// page.js
export default async function Page() {
  const data = await getData();
  
  return (
    <ClientComponent>
      <ServerComponent data={data} />
    </ClientComponent>
  );
}
```

### 4. 何时使用哪种组件

| 场景                  | Server Component | Client Component |
| --------------------- | ---------------- | ---------------- |
| 数据获取              | ✅                | ❌                |
| 访问后端资源          | ✅                | ❌                |
| 保持敏感信息          | ✅                | ❌                |
| 交互和事件监听        | ❌                | ✅                |
| 使用 State 和生命周期 | ❌                | ✅                |
| 使用浏览器 API        | ❌                | ✅                |
| 使用自定义 Hooks      | ❌                | ✅                |

## 性能优化

### 1. 图片优化

**Image 组件：**
```javascript
import Image from 'next/image';

export default function Avatar() {
  return (
    <Image
      src="/avatar.jpg"
      alt="Avatar"
      width={500}
      height={500}
      quality={75} // 1-100
      priority // 预加载
      placeholder="blur" // 模糊占位符
      blurDataURL="data:image/..." // 自定义占位符
      loading="lazy" // lazy | eager
      sizes="(max-width: 768px) 100vw, 50vw" // 响应式
    />
  );
}
```

**远程图片：**
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['example.com'],
    // 或使用 remotePatterns（更灵活）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};
```

**响应式图片：**
```javascript
<Image
  src="/hero.jpg"
  alt="Hero"
  fill // 填充父容器
  style={{ objectFit: 'cover' }}
  sizes="100vw"
/>
```

### 2. 字体优化

**使用 next/font：**
```javascript
// app/layout.js
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="zh" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**本地字体：**
```javascript
import localFont from 'next/font/local';

const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
  variable: '--font-my-font',
});
```

### 3. 代码分割

**动态导入：**
```javascript
import dynamic from 'next/dynamic';

// 懒加载组件
const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // 禁用 SSR
});

export default function Page() {
  return <DynamicComponent />;
}
```

**按需导入库：**
```javascript
// 只在客户端导入
const Chart = dynamic(() => import('chart.js'), {
  ssr: false
});
```

### 4. Script 优化

```javascript
import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* 策略：beforeInteractive - 页面交互前加载 */}
      <Script
        src="https://example.com/script.js"
        strategy="beforeInteractive"
      />
      
      {/* 策略：afterInteractive - 页面交互后加载（默认） */}
      <Script
        src="https://analytics.com/script.js"
        strategy="afterInteractive"
      />
      
      {/* 策略：lazyOnload - 浏览器空闲时加载 */}
      <Script
        src="https://chat.com/script.js"
        strategy="lazyOnload"
      />
      
      {/* 内联脚本 */}
      <Script id="inline-script">
        {`console.log('Hello')`}
      </Script>
    </>
  );
}
```

### 5. 预取和预加载

```javascript
import Link from 'next/link';

// 自动预取（生产环境）
<Link href="/about" prefetch={true}>
  关于
</Link>

// 禁用预取
<Link href="/about" prefetch={false}>
  关于
</Link>
```

**手动预取：**
```javascript
'use client';

import { useRouter } from 'next/navigation';

export default function Button() {
  const router = useRouter();
  
  return (
    <button
      onMouseEnter={() => router.prefetch('/dashboard')}
      onClick={() => router.push('/dashboard')}
    >
      Dashboard
    </button>
  );
}
```

### 6. 缓存策略

**Pages Router：**
```javascript
export async function getServerSideProps({ res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  
  const data = await fetchData();
  return { props: { data } };
}
```

**App Router：**
```javascript
// 路由段配置
export const revalidate = 3600; // 每小时重新验证
export const dynamic = 'force-static'; // 'auto' | 'force-dynamic' | 'error' | 'force-static'
export const fetchCache = 'default-cache'; // 'auto' | 'default-cache' | 'only-cache' | 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store'

export default async function Page() {
  // ...
}
```

### 7. Streaming 和 Suspense

```javascript
// app/posts/page.js
import { Suspense } from 'react';

async function Posts() {
  const posts = await fetchPosts(); // 慢
  return <PostList posts={posts} />;
}

async function Sidebar() {
  const data = await fetchSidebar(); // 快
  return <SidebarContent data={data} />;
}

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
      
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
```

### 8. 部分预渲染（Partial Prerendering）

Next.js 14+ 的实验性功能。

```javascript
// next.config.js
module.exports = {
  experimental: {
    ppr: true,
  },
};

// app/page.js
export default function Page() {
  return (
    <div>
      <StaticContent /> {/* 静态部分 */}
      <Suspense fallback={<Skeleton />}>
        <DynamicContent /> {/* 动态部分 */}
      </Suspense>
    </div>
  );
}
```

## 中间件（Middleware）

### 1. 基本使用

```javascript
// middleware.js（项目根目录）
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // 重定向
  if (pathname === '/old-path') {
    return NextResponse.redirect(new URL('/new-path', request.url));
  }
  
  // 重写
  if (pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard-v2', request.url));
  }
  
  // 修改请求头
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-custom-header', 'value');
  
  // 修改响应头
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('x-custom-response', 'value');
  
  return response;
}

// 配置匹配路径
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### 2. 认证中间件

```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;
  
  // 保护路由
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 已登录用户访问登录页，重定向到首页
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}
```

### 3. 国际化中间件

```javascript
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'zh', 'ja'];
const defaultLocale = 'en';

function getLocale(request) {
  const negotiator = new Negotiator({
    headers: { 'accept-language': request.headers.get('accept-language') }
  });
  const languages = negotiator.languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // 检查路径是否已包含语言
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // 重定向到对应语言
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}
```

### 4. 日志和分析

```javascript
export function middleware(request) {
  console.log({
    time: new Date().toISOString(),
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
  });
  
  return NextResponse.next();
}
```

## 配置

### 1. next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用严格模式
  reactStrictMode: true,
  
  // 启用 SWC 编译器
  swcMinify: true,
  
  // 环境变量
  env: {
    CUSTOM_KEY: 'value',
  },
  
  // 重定向
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
  
  // 重写
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
  
  // 请求头
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Custom-Header',
            value: 'my-value',
          },
        ],
      },
    ];
  },
  
  // 图片配置
  images: {
    domains: ['example.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // 国际化
  i18n: {
    locales: ['en', 'zh', 'ja'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  
  // 输出模式
  output: 'standalone', // 'standalone' | 'export'
  
  // 实验性功能
  experimental: {
    appDir: true,
    serverActions: true,
    ppr: true,
  },
  
  // Webpack 配置
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 自定义配置
    return config;
  },
};

module.exports = nextConfig;
```

### 2. 环境变量

**.env.local：**
```bash
# 只在服务端可用
DATABASE_URL=postgresql://...
API_SECRET=secret123

# 在浏览器中可用（必须以 NEXT_PUBLIC_ 开头）
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=abc123
```

**使用：**
```javascript
// 服务端
const dbUrl = process.env.DATABASE_URL;

// 客户端
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

**.env 文件优先级：**
```
.env.local（优先级最高，git ignore）
.env.development.local
.env.production.local
.env.development
.env.production
.env
```

### 3. TypeScript 配置

**tsconfig.json：**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**类型定义：**
```typescript
// app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Description',
};

// 页面组件
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params, searchParams }: PageProps) {
  return <div>Page {params.id}</div>;
}

// API Route
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: [] });
}
```

## SEO 优化

### 1. Metadata API

**静态 metadata：**
```javascript
// app/page.js
export const metadata = {
  title: 'My App',
  description: 'App description',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'John Doe' }],
  creator: 'John Doe',
  publisher: 'Vercel',
  openGraph: {
    title: 'My App',
    description: 'App description',
    url: 'https://example.com',
    siteName: 'My App',
    images: [
      {
        url: 'https://example.com/og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My App',
    description: 'App description',
    creator: '@username',
    images: ['https://example.com/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};
```

**动态 metadata：**
```javascript
// app/posts/[id]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.id);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}
```

**合并 metadata：**
```javascript
// app/layout.js
export const metadata = {
  title: {
    default: 'My App',
    template: '%s | My App', // %s 会被替换为子页面的 title
  },
  description: 'Default description',
};

// app/about/page.js
export const metadata = {
  title: 'About', // 最终：About | My App
};
```

### 2. JSON-LD 结构化数据

```javascript
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Article Title',
    image: 'https://example.com/image.jpg',
    author: {
      '@type': 'Person',
      name: 'John Doe',
    },
    publisher: {
      '@type': 'Organization',
      name: 'My App',
      logo: {
        '@type': 'ImageObject',
        url: 'https://example.com/logo.png',
      },
    },
    datePublished: '2024-01-01',
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>...</article>
    </>
  );
}
```

### 3. Sitemap

```javascript
// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
```

**动态 sitemap：**
```javascript
export default async function sitemap() {
  const posts = await fetchPosts();
  
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
    },
    ...posts.map(post => ({
      url: `https://example.com/posts/${post.slug}`,
      lastModified: post.updatedAt,
    })),
  ];
}
```

### 4. Robots.txt

```javascript
// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

## 部署

### 1. Vercel 部署（推荐）

**自动部署：**
1. 将代码推送到 Git 仓库（GitHub、GitLab、Bitbucket）
2. 在 Vercel 导入项目
3. 每次 push 自动部署

**环境变量：**
在 Vercel 项目设置中添加环境变量。

**预览部署：**
每个 PR 都会创建预览部署。

### 2. Docker 部署

**Dockerfile：**
```dockerfile
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# 构建
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 运行
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**next.config.js：**
```javascript
module.exports = {
  output: 'standalone',
};
```

**docker-compose.yml：**
```yaml
version: '3.8'
services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
      - NEXT_PUBLIC_API_URL=https://api.example.com
```

### 3. 静态导出

```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true, // 静态导出需要
  },
};
```

**构建：**
```bash
npm run build
# 输出到 out/ 目录
```

**限制：**
- 不支持 SSR
- 不支持 ISR
- 不支持 API Routes
- 不支持 Image Optimization（需要 unoptimized: true）

### 4. 自定义服务器

```javascript
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

**package.json：**
```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```

## 常见面试题

### 1. Next.js 的主要优势是什么？

- **SEO 友好**：支持 SSR 和 SSG，搜索引擎可以直接抓取内容
- **性能优化**：自动代码分割、图片优化、字体优化
- **开发体验**：快速刷新、零配置、TypeScript 支持
- **混合渲染**：可以在同一应用中使用不同的渲染策略
- **全栈能力**：API Routes 和 Server Actions
- **生态完善**：与 Vercel 深度集成，部署简单

### 2. getStaticProps、getServerSideProps 和 getStaticPaths 的区别

**getStaticProps（SSG）：**
- 在构建时运行
- 生成静态 HTML
- 可以配合 revalidate 实现 ISR
- 适合内容不经常变化的页面

**getServerSideProps（SSR）：**
- 每次请求时运行
- 在服务器端生成 HTML
- 可以访问请求信息
- 适合需要实时数据的页面

**getStaticPaths：**
- 用于动态路由的 SSG
- 指定哪些路径需要预渲染
- 配合 getStaticProps 使用

### 3. 什么是 ISR（增量静态再生）？

ISR 允许在请求时重新生成静态页面，结合了 SSG 和 SSR 的优点：

- 首次请求返回静态页面（快速）
- 后台重新生成页面
- 后续请求获得更新后的页面

```javascript
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 10, // 10秒后重新验证
  };
}
```

### 4. App Router 和 Pages Router 有什么区别？

**Pages Router（传统）：**
- 基于 pages 目录
- 使用 getStaticProps、getServerSideProps
- 客户端路由
- 全局布局通过 _app.js

**App Router（新）：**
- 基于 app 目录
- React Server Components
- 嵌套布局和路由
- Streaming 和 Suspense
- Server Actions
- 更好的性能和开发体验

### 5. Server Components 和 Client Components 的区别？

**Server Components（默认）：**
- 在服务器端渲染
- 可以直接访问后端资源
- 不会发送到客户端
- 不能使用 React Hooks
- 不能处理交互

**Client Components：**
- 使用 'use client' 标记
- 可以使用 React Hooks
- 可以处理用户交互
- 会增加客户端 JavaScript 体积

### 6. 如何优化 Next.js 应用的性能？

1. **使用适当的渲染策略**：SSG > ISR > SSR > CSR
2. **代码分割**：使用动态导入
3. **图片优化**：使用 Image 组件
4. **字体优化**：使用 next/font
5. **预取**：Link 组件自动预取
6. **缓存策略**：合理配置缓存
7. **Streaming**：使用 Suspense 改善加载体验
8. **Bundle 分析**：使用 @next/bundle-analyzer
9. **减少客户端 JavaScript**：优先使用 Server Components

### 7. Next.js 中如何实现认证？

**方式一：使用 NextAuth.js**
```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
});
```

**方式二：使用中间件**
```javascript
// middleware.js
export function middleware(request) {
  const token = request.cookies.get('token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### 8. Next.js 中如何处理错误？

**App Router：**
```javascript
// app/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>出错了！</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>重试</button>
    </div>
  );
}

// app/global-error.js（全局错误）
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>出错了！</h2>
        <button onClick={() => reset()}>重试</button>
      </body>
    </html>
  );
}
```

**自定义 404 页面：**
```javascript
// app/not-found.js
export default function NotFound() {
  return <h2>404 - 页面未找到</h2>;
}
```

### 9. 如何在 Next.js 中实现国际化？

**App Router：**
```javascript
// middleware.js
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'zh'];
const defaultLocale = 'en';

export function middleware(request) {
  // 检测语言
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${request.nextUrl.pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// app/[lang]/layout.js
export default function Layout({ children, params }) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
```

### 10. Next.js 中如何进行数据缓存？

**fetch 缓存：**
```javascript
// 缓存
fetch(url, { cache: 'force-cache' });

// 不缓存
fetch(url, { cache: 'no-store' });

// ISR
fetch(url, { next: { revalidate: 3600 } });

// 标记缓存
fetch(url, { next: { tags: ['posts'] } });
```

**重新验证缓存：**
```javascript
import { revalidateTag, revalidatePath } from 'next/cache';

// 按标签重新验证
revalidateTag('posts');

// 按路径重新验证
revalidatePath('/posts');
```

**React cache：**
```javascript
import { cache } from 'react';

export const getUser = cache(async (id) => {
  const user = await db.user.findUnique({ id });
  return user;
});
```

## 最佳实践

### 1. 项目结构

```
my-app/
├── app/                    # App Router
│   ├── (auth)/            # 路由组
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── settings/
│   ├── api/               # API Routes
│   │   └── posts/
│   │       └── route.js
│   ├── layout.js          # 根布局
│   ├── page.js            # 首页
│   ├── loading.js         # 加载状态
│   ├── error.js           # 错误页面
│   └── not-found.js       # 404 页面
├── components/            # 公共组件
│   ├── ui/               # UI 组件
│   └── shared/           # 共享组件
├── lib/                   # 工具函数
│   ├── db.js             # 数据库
│   ├── utils.js          # 工具函数
│   └── constants.js      # 常量
├── public/                # 静态资源
│   ├── images/
│   └── fonts/
├── styles/                # 样式文件
│   └── globals.css
├── middleware.js          # 中间件
├── next.config.js         # Next.js 配置
├── package.json
└── tsconfig.json          # TypeScript 配置
```

### 2. 性能优化清单

- ✅ 使用 Image 组件优化图片
- ✅ 使用 next/font 优化字体
- ✅ 实施代码分割和懒加载
- ✅ 使用适当的渲染策略（SSG > ISR > SSR）
- ✅ 配置合理的缓存策略
- ✅ 使用 Suspense 和 Streaming
- ✅ 优先使用 Server Components
- ✅ 实施预取策略
- ✅ 分析和优化 Bundle 大小
- ✅ 使用 CDN 部署静态资源

### 3. SEO 优化清单

- ✅ 配置 metadata 和 OpenGraph
- ✅ 生成 sitemap.xml
- ✅ 配置 robots.txt
- ✅ 实施结构化数据（JSON-LD）
- ✅ 优化页面加载速度
- ✅ 确保移动端友好
- ✅ 使用语义化 HTML
- ✅ 配置正确的 HTTP 状态码

### 4. 安全最佳实践

- ✅ 不在客户端暴露敏感信息
- ✅ 使用环境变量管理密钥
- ✅ 实施 CSRF 保护
- ✅ 配置 CSP（内容安全策略）
- ✅ 使用 HTTPS
- ✅ 实施速率限制
- ✅ 验证和清理用户输入
- ✅ 使用 httpOnly cookies

### 5. 开发规范

- ✅ 使用 TypeScript
- ✅ 配置 ESLint 和 Prettier
- ✅ 编写单元测试和集成测试
- ✅ 使用 Git 版本控制
- ✅ 实施 CI/CD
- ✅ 编写清晰的注释和文档
- ✅ 遵循组件化原则
- ✅ 保持代码简洁和可维护

## 总结

Next.js 是一个功能强大的 React 框架，提供了：

1. **多种渲染模式**：SSR、SSG、ISR、CSR
2. **优秀的开发体验**：零配置、快速刷新、TypeScript 支持
3. **内置优化**：自动代码分割、图片优化、字体优化
4. **全栈能力**：API Routes、Server Actions
5. **现代特性**：Server Components、Streaming、Suspense
6. **简单部署**：与 Vercel 深度集成

掌握 Next.js 需要理解：
- React 基础知识
- 不同渲染模式的使用场景
- Server Components 和 Client Components
- 性能优化技巧
- SEO 最佳实践

持续学习官方文档和最新特性，保持技术更新！
