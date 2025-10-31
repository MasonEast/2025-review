# Node.js 面试题

## Node.js 基础

### 1. 什么是 Node.js

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，让 JavaScript 可以在服务器端运行。

**核心特点：**
- 事件驱动
- 非阻塞 I/O
- 单线程
- 跨平台
- 高性能

**优势：**
- 高并发处理能力
- 前后端统一语言
- 丰富的 NPM 生态
- 适合 I/O 密集型应用
- 实时应用支持

**劣势：**
- 不适合 CPU 密集型任务
- 单线程容错性差
- 回调地狱（已通过 Promise/async-await 解决）

### 2. Node.js vs 浏览器 JavaScript

| 特性     | Node.js            | 浏览器       |
| -------- | ------------------ | ------------ |
| 运行环境 | V8 引擎            | 各种 JS 引擎 |
| 全局对象 | global             | window       |
| 模块系统 | CommonJS/ES Module | ES Module    |
| API      | fs、http、os 等    | DOM、BOM API |
| 事件循环 | libuv              | 浏览器实现   |
| 用途     | 服务端开发         | 前端开发     |

### 3. Node.js 架构

```
┌─────────────────────────────────────┐
│         JavaScript Code             │
│    (Application & Node.js API)      │
├─────────────────────────────────────┤
│           Node.js Bindings          │
├─────────────────────────────────────┤
│              V8 Engine              │
│         (JavaScript Runtime)        │
├─────────────────────────────────────┤
│               libuv                 │
│    (Event Loop, Thread Pool)        │
├─────────────────────────────────────┤
│         Operating System            │
└─────────────────────────────────────┘
```

**组成部分：**
- **V8 引擎**：执行 JavaScript 代码
- **libuv**：提供事件循环和异步 I/O
- **Node.js Bindings**：JavaScript 和 C++ 的桥梁
- **核心模块**：fs、http、crypto 等

## 事件循环（Event Loop）

### 1. 事件循环机制

Node.js 事件循环分为 6 个阶段：

```
   ┌───────────────────────────┐
┌─>│           timers          │  执行 setTimeout、setInterval 回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  执行延迟到下一个循环的 I/O 回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  内部使用
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │  检索新的 I/O 事件
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  执行 setImmediate 回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──│      close callbacks      │  执行 close 事件回调
   └───────────────────────────┘
```

**各阶段说明：**
1. **timers**：执行 `setTimeout` 和 `setInterval` 的回调
2. **pending callbacks**：执行系统操作的回调
3. **idle, prepare**：内部使用
4. **poll**：获取新的 I/O 事件，执行 I/O 回调
5. **check**：执行 `setImmediate` 回调
6. **close callbacks**：执行 `close` 事件回调

### 2. 微任务和宏任务

**宏任务（Macro Task）：**
- setTimeout
- setInterval
- setImmediate（Node.js）
- I/O 操作

**微任务（Micro Task）：**
- Promise.then/catch/finally
- process.nextTick（Node.js，优先级最高）
- queueMicrotask

**执行顺序：**
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
}).then(() => {
  console.log('5');
});

process.nextTick(() => {
  console.log('6');
});

console.log('7');

// 输出：1, 7, 6, 4, 5, 2, 3
```

**执行顺序：**
1. 同步代码
2. process.nextTick
3. 微任务（Promise）
4. 宏任务（setTimeout）

### 3. setImmediate vs setTimeout

```javascript
// setImmediate 在 check 阶段执行
// setTimeout 在 timers 阶段执行

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

// 在主模块中，执行顺序不确定
// 但在 I/O 回调中，setImmediate 总是先执行

const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  setImmediate(() => {
    console.log('setImmediate');
  });
});
// 输出：setImmediate, setTimeout
```

## 模块系统

### 1. CommonJS

**导出：**
```javascript
// module.exports 导出
module.exports = {
  name: 'test',
  age: 18
};

// 或者
module.exports.name = 'test';
module.exports.age = 18;

// exports 是 module.exports 的引用
exports.name = 'test';
exports.age = 18;

// 注意：不能直接赋值给 exports
// exports = { name: 'test' }; // ❌ 错误
```

**导入：**
```javascript
const obj = require('./module');
const { name, age } = require('./module');

// 内置模块
const fs = require('fs');
const path = require('path');

// 第三方模块
const express = require('express');
```

**模块加载机制：**
1. 路径分析
2. 文件定位
3. 编译执行
4. 缓存模块

**模块加载顺序：**
1. 缓存加载
2. 核心模块
3. 文件模块
4. 目录模块（查找 package.json 或 index.js）
5. node_modules 模块

### 2. ES Module

**导出：**
```javascript
// 命名导出
export const name = 'test';
export function fn() {}

// 默认导出
export default {
  name: 'test',
  age: 18
};
```

**导入：**
```javascript
// 命名导入
import { name, fn } from './module.js';

// 默认导入
import obj from './module.js';

// 混合导入
import obj, { name, fn } from './module.js';

// 全部导入
import * as module from './module.js';
```

**在 Node.js 中使用 ES Module：**
```json
// package.json
{
  "type": "module"
}
```

或使用 `.mjs` 扩展名。

### 3. CommonJS vs ES Module

| 特性       | CommonJS     | ES Module  |
| ---------- | ------------ | ---------- |
| 加载方式   | 运行时加载   | 编译时加载 |
| 输出       | 值的拷贝     | 值的引用   |
| this       | 指向当前模块 | undefined  |
| 循环依赖   | 加载时执行   | 动态引用   |
| 顶层 await | 不支持       | 支持       |

## 核心模块

### 1. fs（文件系统）

**读取文件：**
```javascript
const fs = require('fs');
const path = require('path');

// 异步读取
fs.readFile(path.join(__dirname, 'file.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 同步读取
try {
  const data = fs.readFileSync(path.join(__dirname, 'file.txt'), 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}

// Promise 方式
const fsPromises = require('fs').promises;
fsPromises.readFile(path.join(__dirname, 'file.txt'), 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await
async function readFile() {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'file.txt'), 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

**写入文件：**
```javascript
// 异步写入
fs.writeFile('file.txt', 'Hello World', (err) => {
  if (err) throw err;
  console.log('文件已保存');
});

// 追加内容
fs.appendFile('file.txt', '\nNew Line', (err) => {
  if (err) throw err;
  console.log('内容已追加');
});

// 同步写入
fs.writeFileSync('file.txt', 'Hello World');
```

**其他操作：**
```javascript
// 检查文件是否存在
fs.access('file.txt', fs.constants.F_OK, (err) => {
  console.log(err ? '文件不存在' : '文件存在');
});

// 获取文件信息
fs.stat('file.txt', (err, stats) => {
  if (err) throw err;
  console.log(stats.isFile()); // 是否是文件
  console.log(stats.isDirectory()); // 是否是目录
  console.log(stats.size); // 文件大小
});

// 删除文件
fs.unlink('file.txt', (err) => {
  if (err) throw err;
  console.log('文件已删除');
});

// 创建目录
fs.mkdir('newDir', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('目录已创建');
});

// 读取目录
fs.readdir('./', (err, files) => {
  if (err) throw err;
  console.log(files);
});

// 删除目录
fs.rmdir('newDir', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('目录已删除');
});
```

### 2. path（路径）

```javascript
const path = require('path');

// 连接路径
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); 
// '/foo/bar/baz/asdf'

// 解析路径（返回绝对路径）
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile');
// '/tmp/subfile'

// 获取目录名
path.dirname('/foo/bar/baz/asdf/quux.html'); 
// '/foo/bar/baz/asdf'

// 获取文件名
path.basename('/foo/bar/baz/asdf/quux.html'); 
// 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html'); 
// 'quux'

// 获取扩展名
path.extname('index.html'); 
// '.html'

// 解析路径对象
path.parse('/home/user/dir/file.txt');
// {
//   root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// 格式化路径
path.format({
  dir: '/home/user/dir',
  base: 'file.txt'
});
// '/home/user/dir/file.txt'

// 规范化路径
path.normalize('/foo/bar//baz/asdf/quux/..');
// '/foo/bar/baz/asdf'

// 路径分隔符
console.log(path.sep); // '/' (Linux) 或 '\' (Windows)

// 常用路径
console.log(__dirname); // 当前文件所在目录
console.log(__filename); // 当前文件完整路径
console.log(process.cwd()); // 当前工作目录
```

### 3. http/https

**创建 HTTP 服务器：**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // 设置响应头
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  // 路由处理
  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.end('Hello World');
  } else if (req.url === '/api' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Success', data: body }));
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000/');
});
```

**发起 HTTP 请求：**
```javascript
const http = require('http');

// GET 请求
http.get('http://api.example.com/data', (res) => {
  let data = '';
  
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
}).on('error', (err) => {
  console.error(err);
});

// POST 请求
const options = {
  hostname: 'api.example.com',
  port: 80,
  path: '/data',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
});

req.on('error', (err) => {
  console.error(err);
});

req.write(JSON.stringify({ name: 'test' }));
req.end();
```

### 4. Stream（流）

Node.js 中有四种基本的流类型：
- **Readable**：可读流
- **Writable**：可写流
- **Duplex**：双工流（可读可写）
- **Transform**：转换流（读写过程中可以修改数据）

**可读流：**
```javascript
const fs = require('fs');

// 创建可读流
const readStream = fs.createReadStream('input.txt', { encoding: 'utf8' });

// 监听 data 事件
readStream.on('data', (chunk) => {
  console.log('接收到数据:', chunk);
});

// 监听 end 事件
readStream.on('end', () => {
  console.log('数据读取完成');
});

// 监听 error 事件
readStream.on('error', (err) => {
  console.error('读取错误:', err);
});
```

**可写流：**
```javascript
const fs = require('fs');

// 创建可写流
const writeStream = fs.createWriteStream('output.txt');

// 写入数据
writeStream.write('Hello World\n');
writeStream.write('Node.js Stream\n');

// 结束写入
writeStream.end();

// 监听 finish 事件
writeStream.on('finish', () => {
  console.log('写入完成');
});
```

**管道（Pipe）：**
```javascript
const fs = require('fs');

// 复制文件
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

// 链式调用
const zlib = require('zlib');
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
```

**Transform 流：**
```javascript
const { Transform } = require('stream');

// 创建转换流（转大写）
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin
  .pipe(upperCaseTransform)
  .pipe(process.stdout);
```

### 5. Buffer

Buffer 是用于处理二进制数据的类。

```javascript
// 创建 Buffer
const buf1 = Buffer.alloc(10); // 创建 10 字节的 Buffer
const buf2 = Buffer.from('Hello'); // 从字符串创建
const buf3 = Buffer.from([1, 2, 3]); // 从数组创建

// 写入数据
buf1.write('Hello');

// 读取数据
console.log(buf2.toString()); // 'Hello'
console.log(buf2.toString('hex')); // 十六进制

// Buffer 操作
const buf4 = Buffer.concat([buf2, buf3]); // 合并
console.log(buf2.length); // 长度
console.log(buf2[0]); // 访问字节

// 比较
const buf5 = Buffer.from('ABC');
const buf6 = Buffer.from('BCD');
console.log(buf5.compare(buf6)); // -1, 0, 1

// 拷贝
const buf7 = Buffer.alloc(3);
buf5.copy(buf7);
```

### 6. Events（事件）

```javascript
const EventEmitter = require('events');

// 创建事件发射器
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// 监听事件
myEmitter.on('event', (a, b) => {
  console.log('事件触发:', a, b);
});

// 只监听一次
myEmitter.once('event', () => {
  console.log('只触发一次');
});

// 触发事件
myEmitter.emit('event', 'a', 'b');

// 移除监听
const callback = () => console.log('callback');
myEmitter.on('event', callback);
myEmitter.removeListener('event', callback);

// 获取监听器数量
console.log(myEmitter.listenerCount('event'));

// 获取所有监听器
console.log(myEmitter.listeners('event'));

// 设置最大监听器数量
myEmitter.setMaxListeners(20);
```

### 7. process（进程）

```javascript
// 环境变量
console.log(process.env.NODE_ENV);
console.log(process.env.PATH);

// 命令行参数
console.log(process.argv);
// node app.js arg1 arg2
// ['/path/to/node', '/path/to/app.js', 'arg1', 'arg2']

// 当前工作目录
console.log(process.cwd());

// 改变工作目录
process.chdir('/tmp');

// 进程 ID
console.log(process.pid);
console.log(process.ppid); // 父进程 ID

// 平台信息
console.log(process.platform); // 'darwin', 'win32', 'linux'
console.log(process.arch); // 'x64', 'arm'

// Node.js 版本
console.log(process.version);
console.log(process.versions);

// 内存使用情况
console.log(process.memoryUsage());

// CPU 使用情况
console.log(process.cpuUsage());

// 进程运行时间
console.log(process.uptime());

// 退出进程
process.exit(0);

// 监听进程事件
process.on('exit', (code) => {
  console.log(`进程退出，退出码: ${code}`);
});

process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
});
```

## 异步编程

### 1. Callback（回调）

```javascript
const fs = require('fs');

// 回调函数
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// 回调地狱
fs.readFile('file1.txt', 'utf8', (err, data1) => {
  if (err) throw err;
  fs.readFile('file2.txt', 'utf8', (err, data2) => {
    if (err) throw err;
    fs.readFile('file3.txt', 'utf8', (err, data3) => {
      if (err) throw err;
      console.log(data1, data2, data3);
    });
  });
});
```

### 2. Promise

```javascript
const fs = require('fs').promises;

// Promise 链
fs.readFile('file1.txt', 'utf8')
  .then(data1 => {
    console.log(data1);
    return fs.readFile('file2.txt', 'utf8');
  })
  .then(data2 => {
    console.log(data2);
    return fs.readFile('file3.txt', 'utf8');
  })
  .then(data3 => {
    console.log(data3);
  })
  .catch(err => {
    console.error(err);
  });

// Promise.all（并行）
Promise.all([
  fs.readFile('file1.txt', 'utf8'),
  fs.readFile('file2.txt', 'utf8'),
  fs.readFile('file3.txt', 'utf8')
])
  .then(([data1, data2, data3]) => {
    console.log(data1, data2, data3);
  })
  .catch(err => {
    console.error(err);
  });

// Promise.race
Promise.race([
  fs.readFile('file1.txt', 'utf8'),
  fs.readFile('file2.txt', 'utf8')
])
  .then(data => {
    console.log('最快的:', data);
  });

// Promise.allSettled
Promise.allSettled([
  fs.readFile('file1.txt', 'utf8'),
  fs.readFile('nonexistent.txt', 'utf8')
])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`文件 ${index + 1}:`, result.value);
      } else {
        console.error(`文件 ${index + 1} 错误:`, result.reason);
      }
    });
  });
```

### 3. Async/Await

```javascript
const fs = require('fs').promises;

// 基本使用
async function readFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    console.log(data1);
    
    const data2 = await fs.readFile('file2.txt', 'utf8');
    console.log(data2);
    
    const data3 = await fs.readFile('file3.txt', 'utf8');
    console.log(data3);
  } catch (err) {
    console.error(err);
  }
}

// 并行执行
async function readFilesParallel() {
  try {
    const [data1, data2, data3] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8'),
      fs.readFile('file3.txt', 'utf8')
    ]);
    
    console.log(data1, data2, data3);
  } catch (err) {
    console.error(err);
  }
}

// 错误处理
async function readFileWithRetry(filename, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const data = await fs.readFile(filename, 'utf8');
      return data;
    } catch (err) {
      if (i === maxRetries - 1) {
        throw err;
      }
      console.log(`重试 ${i + 1}/${maxRetries}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// 顶层 await（ES Module）
// const data = await fs.readFile('file.txt', 'utf8');
```

## Web 框架

### 1. Express

**基础使用：**
```javascript
const express = require('express');
const app = express();

// 中间件
app.use(express.json()); // 解析 JSON
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码

// 静态文件
app.use(express.static('public'));

// 路由
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  res.status(201).json(user);
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  res.json({ id, ...user });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `User ${id} deleted` });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

**中间件：**
```javascript
// 自定义中间件
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);

// 路由级中间件
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // 验证 token
  next();
};

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected resource' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});
```

**路由模块化：**
```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([]);
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id });
});

router.post('/', (req, res) => {
  res.status(201).json(req.body);
});

module.exports = router;

// app.js
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);
```

### 2. Koa

**基础使用：**
```javascript
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

// 中间件
app.use(bodyParser());

// 错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
    ctx.app.emit('error', err, ctx);
  }
});

// 日志中间件
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 路由
router.get('/', async (ctx) => {
  ctx.body = 'Hello World';
});

router.get('/api/users', async (ctx) => {
  ctx.body = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
});

router.post('/api/users', async (ctx) => {
  const user = ctx.request.body;
  ctx.status = 201;
  ctx.body = user;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

**Koa vs Express：**

| 特性     | Express          | Koa         |
| -------- | ---------------- | ----------- |
| 回调处理 | 回调函数         | async/await |
| 中间件   | 线性执行         | 洋葱模型    |
| 错误处理 | try-catch 或回调 | try-catch   |
| 内置功能 | 丰富             | 精简        |
| 大小     | 较大             | 较小        |
| 学习曲线 | 平缓             | 稍陡        |

## 数据库操作

### 1. MySQL

```javascript
const mysql = require('mysql2/promise');

// 创建连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 查询
async function getUsers() {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// 参数化查询（防止 SQL 注入）
async function getUserById(id) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// 插入
async function createUser(name, email) {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    return result.insertId;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// 更新
async function updateUser(id, name, email) {
  try {
    const [result] = await pool.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    return result.affectedRows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// 删除
async function deleteUser(id) {
  try {
    const [result] = await pool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// 事务
async function transferMoney(fromId, toId, amount) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    await connection.query(
      'UPDATE accounts SET balance = balance - ? WHERE id = ?',
      [amount, fromId]
    );
    
    await connection.query(
      'UPDATE accounts SET balance = balance + ? WHERE id = ?',
      [amount, toId]
    );
    
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}
```

### 2. MongoDB

```javascript
const { MongoClient, ObjectId } = require('mongodb');

// 连接数据库
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'test';

async function connectDB() {
  await client.connect();
  console.log('Connected to MongoDB');
  return client.db(dbName);
}

// 插入
async function createUser(user) {
  const db = await connectDB();
  const result = await db.collection('users').insertOne(user);
  return result.insertedId;
}

// 查询
async function getUsers() {
  const db = await connectDB();
  const users = await db.collection('users').find({}).toArray();
  return users;
}

async function getUserById(id) {
  const db = await connectDB();
  const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
  return user;
}

// 更新
async function updateUser(id, update) {
  const db = await connectDB();
  const result = await db.collection('users').updateOne(
    { _id: new ObjectId(id) },
    { $set: update }
  );
  return result.modifiedCount;
}

// 删除
async function deleteUser(id) {
  const db = await connectDB();
  const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}

// 聚合
async function getUserStats() {
  const db = await connectDB();
  const stats = await db.collection('users').aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]).toArray();
  return stats;
}

// 使用 Mongoose（ODM）
const mongoose = require('mongoose');

// 连接
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 定义 Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

// 定义 Model
const User = mongoose.model('User', userSchema);

// CRUD 操作
async function mongooseExample() {
  // 创建
  const user = await User.create({
    name: 'Alice',
    email: 'alice@example.com',
    age: 25
  });
  
  // 查询
  const users = await User.find({});
  const user = await User.findById(id);
  const user = await User.findOne({ email: 'alice@example.com' });
  
  // 更新
  await User.updateOne({ _id: id }, { age: 26 });
  await User.findByIdAndUpdate(id, { age: 26 }, { new: true });
  
  // 删除
  await User.deleteOne({ _id: id });
  await User.findByIdAndDelete(id);
}
```

### 3. Redis

```javascript
const redis = require('redis');

// 创建客户端
const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

await client.connect();

// 字符串操作
await client.set('key', 'value');
const value = await client.get('key');
await client.del('key');

// 设置过期时间
await client.setEx('key', 3600, 'value'); // 1小时后过期

// 哈希操作
await client.hSet('user:1', 'name', 'Alice');
await client.hSet('user:1', 'age', '25');
const name = await client.hGet('user:1', 'name');
const user = await client.hGetAll('user:1');

// 列表操作
await client.lPush('list', 'item1');
await client.rPush('list', 'item2');
const item = await client.lPop('list');
const items = await client.lRange('list', 0, -1);

// 集合操作
await client.sAdd('set', 'member1');
await client.sAdd('set', 'member2');
const members = await client.sMembers('set');
const isMember = await client.sIsMember('set', 'member1');

// 有序集合操作
await client.zAdd('zset', { score: 1, value: 'member1' });
await client.zAdd('zset', { score: 2, value: 'member2' });
const members = await client.zRange('zset', 0, -1);

// 发布订阅
const publisher = client.duplicate();
const subscriber = client.duplicate();

await subscriber.connect();
await publisher.connect();

await subscriber.subscribe('channel', (message) => {
  console.log('Received:', message);
});

await publisher.publish('channel', 'Hello');

// 事务
const multi = client.multi();
multi.set('key1', 'value1');
multi.set('key2', 'value2');
multi.incr('counter');
await multi.exec();

// 关闭连接
await client.quit();
```

## 进程与线程

### 1. child_process（子进程）

```javascript
const { exec, execFile, spawn, fork } = require('child_process');

// exec：执行命令，缓冲输出
exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

// execFile：执行文件
execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

// spawn：执行命令，流式输出
const ls = spawn('ls', ['-l']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});

// fork：创建 Node.js 子进程
const child = fork('child.js');

// 发送消息
child.send({ hello: 'world' });

// 接收消息
child.on('message', (msg) => {
  console.log('来自子进程:', msg);
});

// child.js
process.on('message', (msg) => {
  console.log('来自父进程:', msg);
  process.send({ foo: 'bar' });
});
```

### 2. cluster（集群）

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  
  // 衍生工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
    // 重启工作进程
    cluster.fork();
  });
  
  cluster.on('listening', (worker, address) => {
    console.log(`工作进程 ${worker.process.pid} 正在监听 ${address.address}:${address.port}`);
  });
} else {
  // 工作进程可以共享 TCP 连接
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`由进程 ${process.pid} 处理\n`);
  }).listen(8000);
  
  console.log(`工作进程 ${process.pid} 已启动`);
}
```

### 3. worker_threads（工作线程）

```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // 主线程
  console.log('主线程');
  
  const worker = new Worker(__filename, {
    workerData: { num: 5 }
  });
  
  worker.on('message', (msg) => {
    console.log('来自工作线程:', msg);
  });
  
  worker.on('error', (err) => {
    console.error('工作线程错误:', err);
  });
  
  worker.on('exit', (code) => {
    console.log(`工作线程退出，退出码 ${code}`);
  });
  
  worker.postMessage('Hello Worker');
} else {
  // 工作线程
  console.log('工作线程');
  
  parentPort.on('message', (msg) => {
    console.log('来自主线程:', msg);
    
    // 计算斐波那契数列（CPU 密集型任务）
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    const result = fibonacci(workerData.num);
    parentPort.postMessage({ result });
  });
}

// 使用 Worker Pool
const { Worker } = require('worker_threads');

class WorkerPool {
  constructor(workerScript, numWorkers) {
    this.workerScript = workerScript;
    this.numWorkers = numWorkers;
    this.workers = [];
    this.freeWorkers = [];
    
    for (let i = 0; i < numWorkers; i++) {
      this.addWorker();
    }
  }
  
  addWorker() {
    const worker = new Worker(this.workerScript);
    this.workers.push(worker);
    this.freeWorkers.push(worker);
    
    worker.on('error', (err) => {
      console.error('Worker error:', err);
    });
  }
  
  async exec(workerData) {
    if (this.freeWorkers.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.exec(workerData);
    }
    
    const worker = this.freeWorkers.pop();
    
    return new Promise((resolve, reject) => {
      worker.once('message', (msg) => {
        resolve(msg);
        this.freeWorkers.push(worker);
      });
      
      worker.once('error', (err) => {
        reject(err);
        this.freeWorkers.push(worker);
      });
      
      worker.postMessage(workerData);
    });
  }
  
  destroy() {
    this.workers.forEach(worker => worker.terminate());
  }
}
```

## 性能优化

### 1. 内存优化

**避免内存泄漏：**
```javascript
// 1. 清理定时器
const timer = setInterval(() => {
  // ...
}, 1000);

// 使用完后清理
clearInterval(timer);

// 2. 清理事件监听器
const EventEmitter = require('events');
const emitter = new EventEmitter();

const listener = () => {
  // ...
};

emitter.on('event', listener);

// 使用完后移除
emitter.removeListener('event', listener);

// 3. 避免全局变量
// ❌ 不好
global.cache = {};

// ✅ 好
const cache = new Map();

// 4. 使用 WeakMap 和 WeakSet
const cache = new WeakMap();
const obj = {};
cache.set(obj, 'value');
// 当 obj 被回收时，cache 中的条目也会被自动清理

// 5. Stream 处理大文件
const fs = require('fs');
const stream = fs.createReadStream('large-file.txt');
stream.on('data', chunk => {
  // 处理数据块
});
```

**监控内存使用：**
```javascript
// 查看内存使用情况
console.log(process.memoryUsage());
// {
//   rss: 常驻集大小（物理内存）
//   heapTotal: 堆总大小
//   heapUsed: 堆已使用大小
//   external: V8 管理的绑定到 JS 对象的 C++ 对象的内存
//   arrayBuffers: ArrayBuffer 和 SharedArrayBuffer 的内存
// }

// 监控内存使用
setInterval(() => {
  const usage = process.memoryUsage();
  console.log(`Memory: ${Math.round(usage.heapUsed / 1024 / 1024)} MB`);
}, 5000);
```

### 2. CPU 优化

**使用集群：**
```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // 启动服务器
}
```

**使用 Worker Threads 处理 CPU 密集型任务：**
```javascript
const { Worker } = require('worker_threads');

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}

// CPU 密集型任务放到 Worker 中执行
const result = await runWorker({ task: 'heavy-computation' });
```

### 3. I/O 优化

**使用 Stream：**
```javascript
// ❌ 不好：一次性读取整个文件
const fs = require('fs');
const data = fs.readFileSync('large-file.txt');

// ✅ 好：使用流
const stream = fs.createReadStream('large-file.txt');
stream.pipe(res);
```

**批量操作：**
```javascript
// ❌ 不好：逐个插入
for (let item of items) {
  await db.insert(item);
}

// ✅ 好：批量插入
await db.insertMany(items);
```

**使用连接池：**
```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
  connectionLimit: 10 // 连接池大小
});
```

### 4. 缓存策略

**内存缓存：**
```javascript
const cache = new Map();

async function getData(key) {
  // 先查缓存
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  // 查询数据库
  const data = await db.query(key);
  
  // 存入缓存
  cache.set(key, data);
  
  return data;
}
```

**Redis 缓存：**
```javascript
const redis = require('redis');
const client = redis.createClient();

async function getData(key) {
  // 先查 Redis
  const cached = await client.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // 查询数据库
  const data = await db.query(key);
  
  // 存入 Redis（1小时过期）
  await client.setEx(key, 3600, JSON.stringify(data));
  
  return data;
}
```

**LRU 缓存：**
```javascript
const LRU = require('lru-cache');

const cache = new LRU({
  max: 500, // 最多 500 个条目
  maxAge: 1000 * 60 * 60 // 1小时
});

cache.set('key', 'value');
const value = cache.get('key');
```

## 安全

### 1. 输入验证

```javascript
const validator = require('validator');

// 验证邮箱
if (!validator.isEmail(email)) {
  throw new Error('无效的邮箱地址');
}

// 验证 URL
if (!validator.isURL(url)) {
  throw new Error('无效的 URL');
}

// 转义 HTML
const safe = validator.escape(userInput);

// 使用 Joi 进行数据验证
const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(120),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

const { error, value } = schema.validate(data);
if (error) {
  throw new Error(error.details[0].message);
}
```

### 2. SQL 注入防护

```javascript
// ❌ 不好：字符串拼接
const sql = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ 好：参数化查询
const sql = 'SELECT * FROM users WHERE id = ?';
const [rows] = await connection.query(sql, [userId]);

// 或使用 ORM
const user = await User.findById(userId);
```

### 3. XSS 防护

```javascript
const xss = require('xss');

// 清理用户输入
const clean = xss(userInput);

// Express 中设置 HTTP 头
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// 使用 helmet
const helmet = require('helmet');
app.use(helmet());
```

### 4. CSRF 防护

```javascript
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/submit', csrfProtection, (req, res) => {
  // 处理表单提交
});
```

### 5. 身份认证

**JWT：**
```javascript
const jwt = require('jsonwebtoken');

// 生成 token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// 验证 token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected resource' });
});
```

**密码加密：**
```javascript
const bcrypt = require('bcrypt');

// 注册时加密密码
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// 登录时验证密码
const isMatch = await bcrypt.compare(password, hashedPassword);
if (!isMatch) {
  throw new Error('密码错误');
}
```

### 6. 环境变量

```javascript
require('dotenv').config();

// .env 文件
// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=secret
// JWT_SECRET=your-secret-key

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

// 不要在代码中硬编码敏感信息
// ❌ const apiKey = 'sk-1234567890abcdef';
// ✅ const apiKey = process.env.API_KEY;
```

## 常见面试题

### 1. Node.js 的事件循环是什么？

**答案：**
Node.js 的事件循环是处理非阻塞 I/O 操作的机制。它分为 6 个阶段：
1. timers：执行 setTimeout 和 setInterval 回调
2. pending callbacks：执行延迟的 I/O 回调
3. idle, prepare：内部使用
4. poll：获取新的 I/O 事件
5. check：执行 setImmediate 回调
6. close callbacks：执行 close 事件回调

每个阶段都有一个回调队列，当进入某个阶段时，会执行该阶段的所有回调。

### 2. process.nextTick 和 setImmediate 的区别？

**答案：**
- `process.nextTick`：在当前操作完成后立即执行，优先级最高，在所有 I/O 事件之前
- `setImmediate`：在 check 阶段执行，在 I/O 事件之后

在 I/O 回调中，setImmediate 总是先于 setTimeout 执行。

### 3. Node.js 如何处理 CPU 密集型任务？

**答案：**
Node.js 单线程不适合 CPU 密集型任务，可以通过以下方式处理：
1. **Worker Threads**：使用工作线程处理 CPU 密集型任务
2. **Cluster**：使用集群模式，利用多核 CPU
3. **子进程**：使用 child_process 创建子进程
4. **任务队列**：将任务放入队列，异步处理
5. **微服务**：将 CPU 密集型任务拆分到独立服务

### 4. CommonJS 和 ES Module 的区别？

**答案：**

| 特性       | CommonJS               | ES Module     |
| ---------- | ---------------------- | ------------- |
| 加载方式   | 运行时加载             | 编译时加载    |
| 输出       | 值的拷贝               | 值的引用      |
| 语法       | require/module.exports | import/export |
| 顶层 await | 不支持                 | 支持          |
| this       | 指向 module.exports    | undefined     |
| 循环依赖   | 加载时执行             | 动态引用      |

### 5. 如何避免回调地狱？

**答案：**
1. **使用 Promise**：Promise 链式调用
2. **使用 async/await**：同步风格的异步代码
3. **模块化**：将回调函数拆分成独立函数
4. **使用事件**：EventEmitter 模式
5. **使用流**：Stream API

### 6. Stream 的优势是什么？

**答案：**
1. **内存效率**：不需要一次性加载整个文件到内存
2. **时间效率**：可以边读边处理，不用等待全部读取完成
3. **组合性**：可以通过 pipe 串联多个流
4. **背压机制**：自动处理读写速度不匹配的问题

### 7. 如何实现 Node.js 的集群？

**答案：**
```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // 重启工作进程
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(8000);
}
```

### 8. 如何处理 Node.js 中的错误？

**答案：**
1. **try-catch**：同步代码和 async/await
2. **回调函数**：错误优先回调（error-first callback）
3. **Promise.catch()**：Promise 错误处理
4. **事件监听**：监听 'error' 事件
5. **全局错误处理**：
   ```javascript
   process.on('uncaughtException', (err) => {
     console.error('未捕获的异常:', err);
     process.exit(1);
   });
   
   process.on('unhandledRejection', (reason, promise) => {
     console.error('未处理的 Promise 拒绝:', reason);
   });
   ```

### 9. Express 中间件的执行顺序是什么？

**答案：**
Express 中间件按照注册顺序执行：
1. 应用级中间件（app.use）
2. 路由级中间件
3. 错误处理中间件（4个参数）

```javascript
app.use(middleware1); // 1
app.use('/api', middleware2); // 2
app.get('/api/users', middleware3, handler); // 3
app.use(errorHandler); // 4（最后）
```

### 10. 如何优化 Node.js 性能？

**答案：**
1. **使用集群**：利用多核 CPU
2. **使用缓存**：Redis、内存缓存
3. **使用 Stream**：处理大文件
4. **连接池**：数据库连接池
5. **异步操作**：避免阻塞
6. **代码优化**：避免内存泄漏
7. **CDN**：静态资源使用 CDN
8. **负载均衡**：使用 Nginx
9. **监控**：使用 PM2、APM 工具
10. **压缩**：Gzip 压缩

### 11. 什么是中间件？如何编写自定义中间件？

**答案：**
中间件是处理请求的函数，可以访问请求对象（req）、响应对象（res）和下一个中间件函数（next）。

```javascript
// Express 中间件
function myMiddleware(req, res, next) {
  console.log('请求路径:', req.path);
  next(); // 调用下一个中间件
}

app.use(myMiddleware);

// Koa 中间件
async function myMiddleware(ctx, next) {
  console.log('请求开始');
  await next(); // 执行下一个中间件
  console.log('请求结束');
}

app.use(myMiddleware);
```

### 12. 如何防止 SQL 注入？

**答案：**
1. **参数化查询**：使用占位符
2. **ORM/ODM**：使用 Sequelize、Mongoose 等
3. **输入验证**：验证和清理用户输入
4. **最小权限**：数据库用户最小权限原则
5. **预编译语句**：使用 prepared statements

### 13. Node.js 的内存泄漏有哪些常见原因？

**答案：**
1. **全局变量**：过多的全局变量
2. **闭包**：闭包引用未释放
3. **定时器**：未清理的定时器
4. **事件监听器**：未移除的事件监听器
5. **缓存**：无限增长的缓存
6. **循环引用**：对象之间的循环引用

### 14. Buffer 是什么？有什么用？

**答案：**
Buffer 是用于处理二进制数据的类，类似于数组，但是专门用于处理字节数据。

**用途：**
- 处理文件 I/O
- 网络通信
- 图片处理
- 加密解密
- 数据流处理

### 15. require 的加载机制是什么？

**答案：**
1. **路径分析**：确定模块位置
2. **文件定位**：查找文件（.js、.json、.node）
3. **编译执行**：根据扩展名编译
4. **缓存模块**：缓存已加载的模块

**查找顺序：**
1. 缓存
2. 核心模块
3. 文件模块（相对/绝对路径）
4. node_modules

## 最佳实践

### 1. 项目结构

```
project/
├── src/
│   ├── controllers/    # 控制器
│   ├── models/         # 模型
│   ├── routes/         # 路由
│   ├── middlewares/    # 中间件
│   ├── services/       # 业务逻辑
│   ├── utils/          # 工具函数
│   ├── config/         # 配置
│   └── app.js          # 应用入口
├── tests/              # 测试
├── public/             # 静态文件
├── .env                # 环境变量
├── .gitignore
├── package.json
└── README.md
```

### 2. 错误处理

```javascript
// 统一错误处理
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 错误处理中间件
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // 生产环境
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }
  }
});
```

### 3. 日志记录

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// 使用
logger.info('Server started');
logger.error('Error occurred', { error: err });
```

### 4. 环境配置

```javascript
// config/config.js
module.exports = {
  development: {
    port: 3000,
    db: {
      host: 'localhost',
      port: 27017,
      name: 'dev'
    }
  },
  production: {
    port: process.env.PORT,
    db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME
    }
  }
};

const config = require('./config')[process.env.NODE_ENV || 'development'];
```

### 5. 代码规范

```javascript
// .eslintrc.js
module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error'
  }
};

// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## 总结

Node.js 是现代全栈开发的重要技术，掌握 Node.js 需要：

1. **基础知识**：事件循环、模块系统、核心 API
2. **异步编程**：Callback、Promise、async/await
3. **Web 框架**：Express、Koa
4. **数据库**：MySQL、MongoDB、Redis
5. **进程管理**：cluster、worker_threads
6. **性能优化**：内存、CPU、I/O 优化
7. **安全**：输入验证、SQL 注入防护、XSS 防护
8. **最佳实践**：项目结构、错误处理、日志记录

持续学习，在实践中提升 Node.js 能力！

