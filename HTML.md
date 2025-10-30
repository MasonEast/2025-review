# HTML 面试题

## HTML 基础概念

### 1. 什么是 HTML

HTML（HyperText Markup Language，超文本标记语言）是用于创建网页的标准标记语言。它描述了网页的结构和内容。

**核心特点：**
- 使用标签（tags）来标记内容
- 是一种标记语言，不是编程语言
- 与 CSS 和 JavaScript 配合构建网页
- 由 W3C（万维网联盟）维护标准

### 2. HTML 文档基本结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="页面描述">
  <meta name="keywords" content="关键词">
  <title>页面标题</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>头部内容</header>
  <main>主体内容</main>
  <footer>底部内容</footer>
  
  <script src="script.js"></script>
</body>
</html>
```

**结构说明：**
- `<!DOCTYPE html>`：文档类型声明，告诉浏览器使用 HTML5
- `<html>`：根元素，包含整个页面内容
- `<head>`：头部元素，包含元数据
- `<body>`：主体元素，包含可见内容

### 3. HTML5 新特性

**新增语义化标签：**
- `<header>`：头部区域
- `<nav>`：导航区域
- `<main>`：主要内容
- `<article>`：文章内容
- `<section>`：章节/区块
- `<aside>`：侧边栏
- `<footer>`：页脚
- `<figure>` 和 `<figcaption>`：图片和说明
- `<time>`：时间
- `<mark>`：高亮文本

**多媒体标签：**
- `<audio>`：音频
- `<video>`：视频
- `<canvas>`：画布
- `<svg>`：矢量图形

**表单增强：**
- 新的输入类型：email、url、number、range、date、color 等
- 新的表单属性：placeholder、required、pattern、min、max 等
- 新的表单元素：`<datalist>`、`<output>`、`<progress>`

**其他新特性：**
- Web Storage（localStorage、sessionStorage）
- Web Workers
- WebSocket
- Geolocation API
- Drag and Drop API

## 语义化 HTML

### 1. 什么是语义化

语义化 HTML 是指使用恰当的标签来标记内容，让标签本身就能表达内容的含义。

**优点：**
- **利于 SEO**：搜索引擎更好地理解页面结构
- **可访问性**：屏幕阅读器能更好地解析
- **代码可读性**：开发者更容易理解代码
- **维护性**：代码结构清晰，易于维护

### 2. 语义化标签示例

**不好的做法：**
```html
<div class="header">
  <div class="nav">
    <div class="menu-item">首页</div>
    <div class="menu-item">关于</div>
  </div>
</div>
<div class="content">
  <div class="article">
    <div class="title">文章标题</div>
    <div class="text">文章内容...</div>
  </div>
</div>
<div class="footer">
  <div>版权信息</div>
</div>
```

**好的做法：**
```html
<header>
  <nav>
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="/about">关于</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>文章标题</h1>
    <p>文章内容...</p>
  </article>
</main>
<footer>
  <p>&copy; 2025 版权所有</p>
</footer>
```

### 3. 常用语义化标签

**页面结构：**
```html
<header>
  <nav>
    <ul>
      <li><a href="#home">首页</a></li>
    </ul>
  </nav>
</header>

<main>
  <section>
    <h2>章节标题</h2>
    <article>
      <h3>文章标题</h3>
      <p>文章内容</p>
    </article>
  </section>
  
  <aside>
    <h3>相关推荐</h3>
  </aside>
</main>

<footer>
  <address>
    联系方式: <a href="mailto:example@email.com">example@email.com</a>
  </address>
</footer>
```

**内容语义：**
```html
<!-- 强调 -->
<strong>重要文本</strong>（语义上的强调）
<b>粗体文本</b>（视觉上的粗体）

<em>强调文本</em>（语义上的强调）
<i>斜体文本</i>（视觉上的斜体）

<!-- 引用 -->
<blockquote cite="来源URL">
  <p>引用的文本</p>
</blockquote>
<cite>引用来源</cite>

<q>行内引用</q>

<!-- 代码 -->
<code>内联代码</code>
<pre><code>代码块</code></pre>

<!-- 时间 -->
<time datetime="2025-01-01">2025年1月1日</time>

<!-- 缩写 -->
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- 删除和插入 -->
<del>已删除的文本</del>
<ins>新插入的文本</ins>

<!-- 上标和下标 -->
X<sup>2</sup>（X的平方）
H<sub>2</sub>O（水的化学式）

<!-- 标记 -->
<mark>高亮文本</mark>
```

## 常用标签详解

### 1. 标题标签

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

**注意事项：**
- 一个页面通常只有一个 `<h1>`
- 标题应该按层级顺序使用（不要跳级）
- 标题对 SEO 很重要

### 2. 链接标签

```html
<!-- 基本链接 -->
<a href="https://example.com">外部链接</a>

<!-- 新窗口打开 -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  新窗口打开
</a>

<!-- 锚点链接 -->
<a href="#section1">跳转到章节1</a>
<div id="section1">章节1内容</div>

<!-- 下载链接 -->
<a href="file.pdf" download>下载文件</a>

<!-- 邮件链接 -->
<a href="mailto:example@email.com">发送邮件</a>

<!-- 电话链接 -->
<a href="tel:+8613800138000">拨打电话</a>
```

**target 属性：**
- `_self`：当前窗口打开（默认）
- `_blank`：新窗口打开
- `_parent`：父框架中打开
- `_top`：整个窗口中打开

**rel 属性：**
- `noopener`：防止新页面访问 window.opener
- `noreferrer`：不发送 HTTP referer
- `nofollow`：告诉搜索引擎不要跟踪此链接

### 3. 图片标签

```html
<!-- 基本图片 -->
<img src="image.jpg" alt="图片描述" width="300" height="200">

<!-- 响应式图片 -->
<img 
  src="small.jpg" 
  srcset="small.jpg 300w, medium.jpg 600w, large.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="响应式图片"
>

<!-- picture 元素（艺术指导） -->
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg">
  <source media="(min-width: 400px)" srcset="medium.jpg">
  <img src="small.jpg" alt="图片">
</picture>

<!-- 懒加载 -->
<img src="image.jpg" alt="图片" loading="lazy">

<!-- 图片和说明 -->
<figure>
  <img src="image.jpg" alt="图片">
  <figcaption>图片说明文字</figcaption>
</figure>
```

**重要属性：**
- `alt`：替代文本，对可访问性和 SEO 很重要
- `loading`：lazy（懒加载）、eager（立即加载）
- `srcset`：响应式图片
- `sizes`：图片在不同视口的显示尺寸

### 4. 列表标签

```html
<!-- 无序列表 -->
<ul>
  <li>列表项1</li>
  <li>列表项2</li>
  <li>列表项3</li>
</ul>

<!-- 有序列表 -->
<ol>
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项</li>
</ol>

<!-- 自定义起始编号 -->
<ol start="5">
  <li>从5开始</li>
  <li>6</li>
</ol>

<!-- 倒序 -->
<ol reversed>
  <li>3</li>
  <li>2</li>
  <li>1</li>
</ol>

<!-- 描述列表 -->
<dl>
  <dt>术语1</dt>
  <dd>术语1的描述</dd>
  
  <dt>术语2</dt>
  <dd>术语2的描述</dd>
</dl>
```

### 5. 表格标签

```html
<table>
  <caption>表格标题</caption>
  <thead>
    <tr>
      <th>表头1</th>
      <th>表头2</th>
      <th>表头3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>数据1</td>
      <td>数据2</td>
      <td>数据3</td>
    </tr>
    <tr>
      <td>数据4</td>
      <td>数据5</td>
      <td>数据6</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">表格底部</td>
    </tr>
  </tfoot>
</table>
```

**合并单元格：**
```html
<table>
  <tr>
    <!-- 横向合并2列 -->
    <td colspan="2">合并的单元格</td>
    <td>单元格3</td>
  </tr>
  <tr>
    <!-- 纵向合并2行 -->
    <td rowspan="2">合并的单元格</td>
    <td>单元格2</td>
    <td>单元格3</td>
  </tr>
  <tr>
    <td>单元格2</td>
    <td>单元格3</td>
  </tr>
</table>
```

### 6. 表单标签

```html
<form action="/submit" method="POST" enctype="multipart/form-data">
  <!-- 文本输入 -->
  <label for="username">用户名：</label>
  <input type="text" id="username" name="username" 
         placeholder="请输入用户名" required>
  
  <!-- 密码输入 -->
  <label for="password">密码：</label>
  <input type="password" id="password" name="password" 
         minlength="6" maxlength="20" required>
  
  <!-- 邮箱 -->
  <label for="email">邮箱：</label>
  <input type="email" id="email" name="email" 
         pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
  
  <!-- 数字 -->
  <label for="age">年龄：</label>
  <input type="number" id="age" name="age" 
         min="18" max="100" step="1">
  
  <!-- 范围 -->
  <label for="volume">音量：</label>
  <input type="range" id="volume" name="volume" 
         min="0" max="100" value="50">
  
  <!-- 日期 -->
  <label for="birthday">生日：</label>
  <input type="date" id="birthday" name="birthday">
  
  <!-- 颜色 -->
  <label for="color">颜色：</label>
  <input type="color" id="color" name="color">
  
  <!-- 文件上传 -->
  <label for="file">上传文件：</label>
  <input type="file" id="file" name="file" 
         accept="image/*" multiple>
  
  <!-- 单选框 -->
  <fieldset>
    <legend>性别：</legend>
    <label>
      <input type="radio" name="gender" value="male"> 男
    </label>
    <label>
      <input type="radio" name="gender" value="female"> 女
    </label>
  </fieldset>
  
  <!-- 复选框 -->
  <fieldset>
    <legend>爱好：</legend>
    <label>
      <input type="checkbox" name="hobby" value="reading"> 阅读
    </label>
    <label>
      <input type="checkbox" name="hobby" value="music"> 音乐
    </label>
    <label>
      <input type="checkbox" name="hobby" value="sports"> 运动
    </label>
  </fieldset>
  
  <!-- 下拉选择 -->
  <label for="city">城市：</label>
  <select id="city" name="city">
    <option value="">请选择</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
  </select>
  
  <!-- 多选下拉 -->
  <label for="skills">技能：</label>
  <select id="skills" name="skills" multiple size="3">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
  </select>
  
  <!-- 数据列表 -->
  <label for="browser">浏览器：</label>
  <input list="browsers" id="browser" name="browser">
  <datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
  </datalist>
  
  <!-- 文本域 -->
  <label for="message">留言：</label>
  <textarea id="message" name="message" 
            rows="5" cols="30" 
            placeholder="请输入留言"></textarea>
  
  <!-- 按钮 -->
  <button type="submit">提交</button>
  <button type="reset">重置</button>
  <button type="button">普通按钮</button>
  
  <!-- 或使用 input -->
  <input type="submit" value="提交">
  <input type="reset" value="重置">
</form>
```

**表单属性：**
- `action`：提交地址
- `method`：GET 或 POST
- `enctype`：编码类型
  - `application/x-www-form-urlencoded`（默认）
  - `multipart/form-data`（文件上传必需）
  - `text/plain`

**输入验证属性：**
- `required`：必填
- `pattern`：正则表达式验证
- `min`、`max`：数值范围
- `minlength`、`maxlength`：长度限制
- `step`：数值步长

### 7. 多媒体标签

**视频：**
```html
<video width="640" height="360" controls 
       poster="poster.jpg" preload="metadata">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track src="subtitles.vtt" kind="subtitles" 
         srclang="zh" label="中文字幕">
  您的浏览器不支持视频标签。
</video>
```

**音频：**
```html
<audio controls preload="auto">
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  您的浏览器不支持音频标签。
</audio>
```

**属性说明：**
- `controls`：显示控制条
- `autoplay`：自动播放
- `loop`：循环播放
- `muted`：静音
- `preload`：预加载（none、metadata、auto）
- `poster`：视频封面图

### 8. Canvas 和 SVG

**Canvas：**
```html
<canvas id="myCanvas" width="500" height="300">
  您的浏览器不支持 Canvas。
</canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  
  // 绘制矩形
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 100, 50);
  
  // 绘制圆形
  ctx.beginPath();
  ctx.arc(200, 100, 50, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
</script>
```

**SVG：**
```html
<svg width="200" height="200">
  <circle cx="100" cy="100" r="50" 
          fill="blue" stroke="red" stroke-width="2" />
  <rect x="20" y="20" width="80" height="80" 
        fill="green" />
  <line x1="0" y1="0" x2="200" y2="200" 
        stroke="black" stroke-width="2" />
  <text x="100" y="100" font-size="20" 
        text-anchor="middle" fill="white">
    SVG 文本
  </text>
</svg>
```

**Canvas vs SVG：**

| 特性     | Canvas       | SVG              |
| -------- | ------------ | ---------------- |
| 渲染方式 | 位图（栅格） | 矢量图           |
| 分辨率   | 依赖分辨率   | 不依赖分辨率     |
| 缩放     | 会失真       | 不会失真         |
| 事件处理 | 不支持       | 支持             |
| 性能     | 适合大量绘制 | 适合少量复杂图形 |
| 修改     | 需要重绘     | 可直接修改       |

## Meta 标签

### 1. 字符编码

```html
<meta charset="UTF-8">
```

### 2. 视口设置（移动端）

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- 
  width=device-width: 宽度等于设备宽度
  initial-scale=1.0: 初始缩放比例
  maximum-scale=1.0: 最大缩放比例
  minimum-scale=1.0: 最小缩放比例
  user-scalable=no: 禁止用户缩放
-->
```

### 3. SEO 相关

```html
<!-- 页面描述 -->
<meta name="description" content="页面描述，长度建议150-160字符">

<!-- 关键词 -->
<meta name="keywords" content="关键词1, 关键词2, 关键词3">

<!-- 作者 -->
<meta name="author" content="作者名">

<!-- 版权 -->
<meta name="copyright" content="版权信息">

<!-- 搜索引擎索引方式 -->
<meta name="robots" content="index, follow">
<!-- 
  index: 允许索引
  noindex: 不允许索引
  follow: 允许跟踪链接
  nofollow: 不允许跟踪链接
-->
```

### 4. 社交媒体分享（Open Graph）

```html
<!-- Open Graph（Facebook、LinkedIn等） -->
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com">
<meta property="og:type" content="website">
<meta property="og:site_name" content="网站名称">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="页面标题">
<meta name="twitter:description" content="页面描述">
<meta name="twitter:image" content="https://example.com/image.jpg">
<meta name="twitter:site" content="@username">
```

### 5. HTTP 相关

```html
<!-- 刷新和重定向 -->
<meta http-equiv="refresh" content="5;url=https://example.com">
<!-- 5秒后跳转到指定URL -->

<!-- 缓存控制 -->
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="pragma" content="no-cache">

<!-- X-UA-Compatible（IE兼容模式） -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

### 6. 移动应用相关

```html
<!-- iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="应用标题">
<link rel="apple-touch-icon" href="icon.png">

<!-- Android -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#4285f4">

<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json">
```

## HTML 实体字符

### 1. 常用实体字符

```html
<!-- 空格 -->
&nbsp;   <!--  -->
&ensp;   <!-- 半角空格 -->
&emsp;   <!-- 全角空格 -->

<!-- 符号 -->
&lt;     <!-- < -->
&gt;     <!-- > -->
&amp;    <!-- & -->
&quot;   <!-- " -->
&apos;   <!-- ' -->
&copy;   <!-- © -->
&reg;    <!-- ® -->
&trade;  <!-- ™ -->

<!-- 货币 -->
&yen;    <!-- ¥ -->
&euro;   <!-- € -->
&pound;  <!-- £ -->
&cent;   <!-- ¢ -->

<!-- 数学符号 -->
&times;  <!-- × -->
&divide; <!-- ÷ -->
&plusmn; <!-- ± -->
&ne;     <!-- ≠ -->
&le;     <!-- ≤ -->
&ge;     <!-- ≥ -->

<!-- 箭头 -->
&larr;   <!-- ← -->
&uarr;   <!-- ↑ -->
&rarr;   <!-- → -->
&darr;   <!-- ↓ -->
```

### 2. Unicode 字符

```html
<!-- 使用十进制 -->
&#8364;  <!-- € -->

<!-- 使用十六进制 -->
&#x20AC; <!-- € -->
```

## 可访问性（Accessibility）

### 1. ARIA 属性

**ARIA（Accessible Rich Internet Applications）** 用于提高 Web 内容和应用的可访问性。

```html
<!-- role 属性 -->
<nav role="navigation">
  <ul role="menu">
    <li role="menuitem"><a href="/">首页</a></li>
  </ul>
</nav>

<div role="alert">这是一个警告信息</div>
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">对话框标题</h2>
</div>

<!-- aria-label -->
<button aria-label="关闭">
  <span class="icon-close"></span>
</button>

<!-- aria-labelledby -->
<div aria-labelledby="section-title">
  <h2 id="section-title">章节标题</h2>
</div>

<!-- aria-describedby -->
<input type="text" aria-describedby="username-help">
<span id="username-help">用户名必须是6-20个字符</span>

<!-- aria-hidden -->
<span aria-hidden="true" class="icon"></span>

<!-- aria-live（动态内容） -->
<div aria-live="polite">加载中...</div>
<!-- 
  off: 不通知（默认）
  polite: 等待空闲时通知
  assertive: 立即通知
-->

<!-- aria-expanded（展开/收起状态） -->
<button aria-expanded="false" aria-controls="menu">
  菜单
</button>
<div id="menu" hidden>菜单内容</div>

<!-- aria-selected（选中状态） -->
<div role="tablist">
  <button role="tab" aria-selected="true">标签1</button>
  <button role="tab" aria-selected="false">标签2</button>
</div>
```

### 2. 语义化和可访问性最佳实践

```html
<!-- 为图片添加 alt -->
<img src="logo.png" alt="公司 Logo">

<!-- 表单标签关联 -->
<label for="email">邮箱：</label>
<input type="email" id="email" name="email">

<!-- 使用 fieldset 和 legend -->
<fieldset>
  <legend>个人信息</legend>
  <!-- 表单字段 -->
</fieldset>

<!-- 跳过导航链接 -->
<a href="#main-content" class="skip-link">跳过导航</a>
<nav>导航内容</nav>
<main id="main-content">主要内容</main>

<!-- 语言标识 -->
<html lang="zh-CN">
<p>中文内容</p>
<p lang="en">English content</p>

<!-- 表格的 caption 和 scope -->
<table>
  <caption>销售数据表</caption>
  <thead>
    <tr>
      <th scope="col">月份</th>
      <th scope="col">销售额</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">一月</th>
      <td>10000</td>
    </tr>
  </tbody>
</table>
```

### 3. 键盘导航

```html
<!-- tabindex -->
<div tabindex="0">可通过 Tab 键聚焦</div>
<div tabindex="-1">可通过 JavaScript 聚焦</div>
<!-- 
  tabindex="0": 按文档顺序聚焦
  tabindex="-1": 不参与 Tab 导航
  tabindex="1+": 指定顺序（不推荐）
-->

<!-- accesskey -->
<button accesskey="s">保存 (Alt+S)</button>
```

## 性能优化

### 1. 资源加载优化

```html
<!-- 预连接 -->
<link rel="preconnect" href="https://api.example.com">

<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="https://cdn.example.com">

<!-- 预加载 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="script.js" as="script">

<!-- 预获取（低优先级） -->
<link rel="prefetch" href="next-page.html">

<!-- 预渲染 -->
<link rel="prerender" href="next-page.html">
```

### 2. 延迟加载

```html
<!-- 图片懒加载 -->
<img src="image.jpg" loading="lazy" alt="图片">

<!-- 脚本延迟加载 -->
<script src="script.js" defer></script>
<script src="script.js" async></script>
<!-- 
  defer: 延迟执行，按顺序执行
  async: 异步加载，加载完立即执行
-->
```

### 3. 减少 HTTP 请求

```html
<!-- 内联关键 CSS -->
<style>
  /* 关键 CSS */
  .header { /* ... */ }
</style>

<!-- 内联小图片（Base64） -->
<img src="data:image/png;base64,iVBORw0KG..." alt="图标">

<!-- CSS Sprites -->
<div class="icon icon-home"></div>
```

### 4. 压缩和最小化

- 压缩 HTML、CSS、JavaScript
- 使用 gzip 或 Brotli 压缩
- 使用 WebP 格式图片
- 移除不必要的空格和注释

## 常见面试题

### 1. DOCTYPE 的作用是什么？

DOCTYPE（文档类型声明）告诉浏览器使用哪个 HTML 版本来解析文档。

```html
<!DOCTYPE html> <!-- HTML5 -->
```

**作用：**
- 触发标准模式（Standards Mode）
- 不声明会触发怪异模式（Quirks Mode）
- 影响 CSS 渲染和 JavaScript 执行

### 2. HTML5 有哪些新特性？

**语义化标签：**
- header、nav、main、article、section、aside、footer

**多媒体：**
- audio、video、canvas、svg

**表单增强：**
- 新输入类型：email、url、number、date、color 等
- 新属性：placeholder、required、pattern 等

**API：**
- Web Storage、Web Workers、WebSocket、Geolocation

### 3. 行内元素和块级元素的区别？

**块级元素：**
- 独占一行
- 可以设置宽高
- 可以设置内外边距
- 例：div、p、h1-h6、ul、ol、li、table、form

**行内元素：**
- 不独占一行
- 不能设置宽高（由内容撑开）
- 可以设置左右边距，上下边距无效
- 例：span、a、img、input、label、strong、em

**行内块元素：**
- 不独占一行
- 可以设置宽高
- 例：img、input、button

### 4. src 和 href 的区别？

**src（source）：**
- 用于替换当前元素
- 会暂停其他资源的下载和处理
- 例：img、script、iframe

**href（hypertext reference）：**
- 用于建立当前文档与外部资源的链接
- 不会暂停其他资源的处理
- 例：link、a

### 5. script 标签的 defer 和 async 的区别？

**没有属性：**
- 立即下载并执行
- 阻塞 HTML 解析

**defer：**
- 异步下载
- HTML 解析完成后按顺序执行
- 在 DOMContentLoaded 之前执行

**async：**
- 异步下载
- 下载完成后立即执行
- 不保证执行顺序

```html
<script src="script.js"></script>         <!-- 阻塞 -->
<script src="script.js" defer></script>   <!-- 延迟 -->
<script src="script.js" async></script>   <!-- 异步 -->
```

### 6. title 和 alt 属性的区别？

**title：**
- 鼠标悬停时显示的提示文本
- 可用于任何元素
- 不是必需的

**alt：**
- 图片无法显示时的替代文本
- 只用于 img、area、input（type="image"）
- 对可访问性和 SEO 很重要
- img 标签应该有 alt 属性

```html
<img src="logo.png" alt="公司 Logo" title="这是我们的 Logo">
```

### 7. 如何实现浏览器内多个标签页之间的通信？

**方法一：localStorage + storage 事件**
```javascript
// 页面1
localStorage.setItem('message', 'Hello');

// 页面2
window.addEventListener('storage', (e) => {
  console.log(e.key, e.newValue);
});
```

**方法二：SharedWorker**
```javascript
const worker = new SharedWorker('worker.js');
worker.port.start();
worker.port.postMessage('Hello');
worker.port.onmessage = (e) => {
  console.log(e.data);
};
```

**方法三：BroadcastChannel**
```javascript
const channel = new BroadcastChannel('my-channel');
channel.postMessage('Hello');
channel.onmessage = (e) => {
  console.log(e.data);
};
```

**方法四：Service Worker**
**方法五：WebSocket**

### 8. 页面生命周期事件有哪些？

```javascript
// DOMContentLoaded: DOM 构建完成
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');
});

// load: 所有资源加载完成
window.addEventListener('load', () => {
  console.log('Page loaded');
});

// beforeunload: 页面即将卸载
window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = '';
});

// unload: 页面卸载
window.addEventListener('unload', () => {
  console.log('Page unloaded');
});

// visibilitychange: 页面可见性变化
document.addEventListener('visibilitychange', () => {
  console.log(document.hidden);
});
```

### 9. 如何优化网页的性能？

**HTML 方面：**
- 减少 DOM 层级
- 使用语义化标签
- 减少 HTTP 请求
- 使用 CDN
- 资源预加载（preload、prefetch）
- 图片懒加载
- 压缩和最小化代码

**关键渲染路径优化：**
- 减少关键资源数量
- 减小关键资源大小
- 缩短关键路径长度

### 10. iframe 的优缺点？

**优点：**
- 可以加载第三方内容
- 并行加载
- 沙箱隔离

**缺点：**
- 阻塞主页面的 onload 事件
- 不利于 SEO
- 增加 HTTP 请求
- 影响页面性能
- 移动端兼容性差

**使用场景：**
- 嵌入第三方内容（地图、视频）
- 广告展示
- 沙箱环境

### 11. 如何处理 HTML5 新标签的浏览器兼容性？

**方法一：使用 HTML5 Shiv**
```html
<!--[if lt IE 9]>
  <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
<![endif]-->
```

**方法二：手动创建元素**
```javascript
document.createElement('header');
document.createElement('nav');
document.createElement('article');
```

**方法三：使用 Polyfill**

### 12. Web Storage、Cookie、Session 的区别？

| 特性         | Cookie         | localStorage | sessionStorage | Session            |
| ------------ | -------------- | ------------ | -------------- | ------------------ |
| 存储位置     | 客户端         | 客户端       | 客户端         | 服务端             |
| 存储大小     | 4KB            | 5-10MB       | 5-10MB         | 无限制             |
| 生命周期     | 可设置过期时间 | 永久         | 页面会话期间   | 会话期间           |
| 与服务器通信 | 每次请求都发送 | 不发送       | 不发送         | 通过 Cookie 或 URL |
| 易用性       | 需要封装       | 简单         | 简单           | -                  |
| 作用域       | 同源           | 同源         | 同源且同标签页 | -                  |

**使用场景：**
- Cookie：身份验证、跟踪
- localStorage：长期本地存储
- sessionStorage：临时数据
- Session：服务端会话管理

### 13. 渐进增强和优雅降级的区别？

**渐进增强（Progressive Enhancement）：**
- 从基础功能开始
- 逐步添加高级功能
- 确保基础功能在所有浏览器中可用

```html
<!-- 基础 HTML -->
<a href="/page">链接</a>

<!-- 添加 JavaScript 增强 -->
<a href="/page" onclick="loadPage(); return false;">链接</a>
```

**优雅降级（Graceful Degradation）：**
- 从完整功能开始
- 为旧浏览器提供降级方案
- 优先考虑现代浏览器

```html
<!-- 现代浏览器 -->
<video controls>
  <source src="video.mp4">
  <!-- 降级方案 -->
  <img src="poster.jpg" alt="视频封面">
</video>
```

### 14. 如何实现网页的多语言支持？

**方法一：使用 lang 属性**
```html
<html lang="zh-CN">
  <p>中文内容</p>
  <p lang="en">English content</p>
</html>
```

**方法二：动态切换内容**
```html
<div data-i18n="welcome"></div>

<script>
const translations = {
  'zh-CN': { welcome: '欢迎' },
  'en-US': { welcome: 'Welcome' }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[lang][key];
  });
}
</script>
```

**方法三：服务端渲染不同语言版本**

### 15. HTML 最佳实践有哪些？

**语义化：**
- 使用恰当的标签
- 合理的文档结构

**可访问性：**
- 使用 alt 属性
- 使用 label 关联表单
- 使用 ARIA 属性
- 支持键盘导航

**性能：**
- 减少 DOM 层级
- 资源优化
- 懒加载

**SEO：**
- 合理的标题层级
- meta 标签
- 语义化标签

**代码质量：**
- 缩进一致
- 小写标签
- 闭合标签
- 属性使用双引号
- 注释清晰

**安全：**
- 转义用户输入
- 使用 CSP
- HTTPS

## 总结

HTML 是 Web 开发的基础，掌握 HTML 需要：

1. **理解语义化**：使用恰当的标签
2. **熟悉常用标签**：表单、表格、多媒体等
3. **掌握 HTML5 新特性**：语义化标签、API 等
4. **注重可访问性**：ARIA、alt、label 等
5. **性能优化**：资源加载、懒加载等
6. **SEO 优化**：meta 标签、结构化数据等

持续学习和实践，保持对新特性的关注！
