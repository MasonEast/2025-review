# 浏览器与网络面试题

## HTTP 协议

### 1. HTTP 基础

HTTP（HyperText Transfer Protocol，超文本传输协议）是一种用于分布式、协作式和超媒体信息系统的应用层协议。

**特点：**
- 无状态：每个请求都是独立的
- 明文传输：内容未加密（HTTP）
- 基于 TCP/IP：可靠的传输协议
- 请求-响应模式：客户端发送请求，服务器返回响应

### 2. HTTP 请求方法

```
GET     - 获取资源（幂等）
POST    - 创建资源
PUT     - 更新资源（幂等）
DELETE  - 删除资源（幂等）
PATCH   - 部分更新资源
HEAD    - 获取响应头
OPTIONS - 获取服务器支持的方法
CONNECT - 建立隧道（用于代理）
TRACE   - 追踪路径
```

**GET vs POST：**

| 特性     | GET                         | POST     |
| -------- | --------------------------- | -------- |
| 参数位置 | URL 中                      | 请求体中 |
| 长度限制 | 有限制（浏览器/服务器决定） | 无限制   |
| 缓存     | 可缓存                      | 不可缓存 |
| 历史记录 | 保留在历史记录中            | 不保留   |
| 书签     | 可收藏                      | 不可收藏 |
| 安全性   | 参数暴露在 URL              | 相对安全 |
| 幂等性   | 幂等                        | 非幂等   |

### 3. HTTP 状态码

**1xx - 信息性状态码：**
- 100 Continue：继续请求
- 101 Switching Protocols：切换协议

**2xx - 成功状态码：**
- 200 OK：请求成功
- 201 Created：资源创建成功
- 204 No Content：无内容（删除成功）
- 206 Partial Content：部分内容（范围请求）

**3xx - 重定向状态码：**
- 301 Moved Permanently：永久重定向
- 302 Found：临时重定向
- 303 See Other：使用 GET 获取资源
- 304 Not Modified：资源未修改（缓存）
- 307 Temporary Redirect：临时重定向（保持方法）
- 308 Permanent Redirect：永久重定向（保持方法）

**4xx - 客户端错误状态码：**
- 400 Bad Request：请求错误
- 401 Unauthorized：未授权
- 403 Forbidden：禁止访问
- 404 Not Found：资源未找到
- 405 Method Not Allowed：方法不允许
- 408 Request Timeout：请求超时
- 413 Payload Too Large：请求体过大
- 429 Too Many Requests：请求过多

**5xx - 服务器错误状态码：**
- 500 Internal Server Error：服务器内部错误
- 501 Not Implemented：未实现
- 502 Bad Gateway：网关错误
- 503 Service Unavailable：服务不可用
- 504 Gateway Timeout：网关超时

### 4. HTTP 请求头

**通用请求头：**
```
Cache-Control: no-cache             # 缓存控制
Connection: keep-alive              # 连接管理
Date: Wed, 21 Oct 2015 07:28:00 GMT # 日期
```

**请求头：**
```
Accept: text/html                   # 可接受的内容类型
Accept-Encoding: gzip, deflate      # 可接受的编码
Accept-Language: zh-CN,zh;q=0.9     # 可接受的语言
Authorization: Bearer token         # 授权凭证
Cookie: name=value                  # Cookie
Host: www.example.com               # 主机名
User-Agent: Mozilla/5.0             # 用户代理
Referer: https://example.com        # 来源页面
Origin: https://example.com         # 源
If-Modified-Since: Wed, 21 Oct      # 条件请求（缓存）
If-None-Match: "etag"               # 条件请求（缓存）
```

### 5. HTTP 响应头

**通用响应头：**
```
Cache-Control: max-age=3600         # 缓存控制
Connection: keep-alive              # 连接管理
Date: Wed, 21 Oct 2015 07:28:00 GMT # 日期
```

**响应头：**
```
Content-Type: text/html             # 内容类型
Content-Length: 1234                # 内容长度
Content-Encoding: gzip              # 内容编码
Set-Cookie: name=value              # 设置 Cookie
Location: https://example.com       # 重定向地址
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4" # 实体标签
Last-Modified: Wed, 21 Oct          # 最后修改时间
Expires: Wed, 21 Oct 2015           # 过期时间
Access-Control-Allow-Origin: *      # CORS
Access-Control-Allow-Methods: GET   # CORS
Access-Control-Allow-Headers: *     # CORS
X-Frame-Options: DENY               # 防止点击劫持
X-Content-Type-Options: nosniff     # 防止 MIME 类型嗅探
```

### 6. HTTP/1.0、HTTP/1.1、HTTP/2、HTTP/3 对比

**HTTP/1.0：**
- 每个请求都建立新的 TCP 连接
- 无法复用连接
- 无持久连接

**HTTP/1.1：**
- 持久连接（Connection: keep-alive）
- 管道化（Pipelining）
- 支持断点续传（Range）
- 缓存处理（ETag、Cache-Control）
- Host 头必须（支持虚拟主机）

**HTTP/2：**
- 二进制分帧：传输效率更高
- 多路复用：一个连接并发多个请求
- 头部压缩（HPACK）：减少传输大小
- 服务器推送：主动推送资源
- 请求优先级：合理分配资源

**HTTP/3：**
- 基于 QUIC（UDP）：快速建立连接
- 解决队头阻塞：丢包不影响其他流
- 连接迁移：IP 变化连接不中断
- 内置 TLS：更安全

**对比表格：**

| 特性       | HTTP/1.1     | HTTP/2       | HTTP/3     |
| ---------- | ------------ | ------------ | ---------- |
| 传输协议   | TCP          | TCP          | QUIC (UDP) |
| 多路复用   | ❌            | ✅            | ✅          |
| 头部压缩   | ❌            | ✅ (HPACK)    | ✅ (QPACK)  |
| 服务器推送 | ❌            | ✅            | ✅          |
| 队头阻塞   | ✅            | 部分解决     | ✅ 完全解决 |
| 连接建立   | 慢 (3次握手) | 慢 (3次握手) | 快 (0-RTT) |

## HTTPS 协议

### 1. HTTPS 基础

HTTPS = HTTP + SSL/TLS，通过 SSL/TLS 对 HTTP 进行加密。

**特点：**
- 数据加密：防止窃听
- 身份验证：防止中间人攻击
- 数据完整性：防止篡改
- 默认端口：443

### 2. HTTPS 工作原理

```
1. 客户端发起 HTTPS 请求
2. 服务器返回证书（包含公钥）
3. 客户端验证证书
   - 验证证书颁发机构（CA）
   - 验证证书有效期
   - 验证域名
4. 客户端生成随机密钥
5. 使用公钥加密随机密钥发送给服务器
6. 服务器使用私钥解密，获得随机密钥
7. 双方使用随机密钥进行对称加密通信
```

### 3. SSL/TLS 握手过程

```
客户端                                    服务器
  |                                         |
  |---- Client Hello -------------------->  |
  |     (支持的加密套件、随机数)              |
  |                                         |
  |<--- Server Hello ---------------------- |
  |     (选择的加密套件、随机数、证书)        |
  |                                         |
  |---- Client Key Exchange -------------->  |
  |     (预主密钥，用服务器公钥加密)          |
  |                                         |
  |---- Change Cipher Spec --------------->  |
  |---- Finished ------------------------->  |
  |                                         |
  |<--- Change Cipher Spec ----------------|
  |<--- Finished --------------------------|
  |                                         |
  |<======== 加密通信 =====================>|
```

### 4. 对称加密 vs 非对称加密

**对称加密：**
- 加密和解密使用相同的密钥
- 速度快，效率高
- 密钥分发困难
- 例：AES、DES、3DES

**非对称加密：**
- 加密和解密使用不同的密钥（公钥和私钥）
- 速度慢，效率低
- 密钥分发容易
- 例：RSA、ECC

**HTTPS 使用混合加密：**
- 使用非对称加密传输对称加密的密钥
- 使用对称加密进行数据传输

### 5. 数字证书

**证书内容：**
- 证书颁发机构（CA）
- 证书所有者
- 公钥
- 有效期
- 签名算法
- CA 的数字签名

**证书链：**
```
根证书（Root CA）
  └─ 中间证书（Intermediate CA）
      └─ 服务器证书（End-entity Certificate）
```

## TCP/IP 协议

### 1. TCP 三次握手

```
客户端                    服务器
  |                         |
  |---- SYN (seq=x) ------->|  (1) 客户端发送 SYN
  |                         |
  |<--- SYN+ACK ------------|  (2) 服务器回复 SYN+ACK
  |     (seq=y, ack=x+1)    |
  |                         |
  |---- ACK --------------->|  (3) 客户端发送 ACK
  |     (ack=y+1)           |
  |                         |
  |<==== 连接建立 ==========>|
```

**为什么需要三次握手：**
1. 确认双方的发送和接收能力
2. 同步序列号
3. 防止旧的重复连接初始化

**为什么不是两次或四次：**
- 两次：无法确认客户端的接收能力
- 四次：三次已经足够，四次冗余

### 2. TCP 四次挥手

```
客户端                    服务器
  |                         |
  |---- FIN (seq=u) ------->|  (1) 客户端发送 FIN
  |                         |
  |<--- ACK ----------------|  (2) 服务器回复 ACK
  |     (ack=u+1)           |
  |                         |
  |<--- FIN (seq=w) --------|  (3) 服务器发送 FIN
  |                         |
  |---- ACK --------------->|  (4) 客户端回复 ACK
  |     (ack=w+1)           |
  |                         |
  |<==== 连接关闭 ==========>|
```

**为什么需要四次挥手：**
- TCP 是全双工通信
- 需要分别关闭两个方向的连接
- 服务器可能还有数据要发送

**TIME_WAIT 状态：**
- 客户端在发送最后一个 ACK 后进入 TIME_WAIT 状态
- 等待 2MSL（Maximum Segment Lifetime）
- 确保服务器收到 ACK
- 避免旧连接的数据干扰新连接

### 3. TCP vs UDP

| 特性     | TCP                  | UDP             |
| -------- | -------------------- | --------------- |
| 连接     | 面向连接             | 无连接          |
| 可靠性   | 可靠（确认、重传）   | 不可靠          |
| 顺序     | 保证顺序             | 不保证顺序      |
| 速度     | 慢                   | 快              |
| 头部大小 | 20 字节              | 8 字节          |
| 流量控制 | 有                   | 无              |
| 拥塞控制 | 有                   | 无              |
| 适用场景 | 文件传输、邮件、HTTP | 视频、语音、DNS |

**TCP 可靠性保证：**
1. 确认应答（ACK）
2. 超时重传
3. 流量控制（滑动窗口）
4. 拥塞控制
5. 顺序控制（序列号）
6. 校验和

### 4. TCP 滑动窗口

**作用：**
- 流量控制：防止发送方发送过快
- 提高效率：不需要等待每个数据包的确认

**工作原理：**
```
发送方窗口：
[已发送已确认] [已发送未确认] [可发送] [不可发送]
               ←---- 窗口 ----→

接收方窗口：
[已接收] [可接收] [不可接收]
         ←-窗口-→
```

### 5. TCP 拥塞控制

**四个算法：**

1. **慢启动（Slow Start）：**
   - 初始窗口很小（通常为 1 MSS）
   - 每收到一个 ACK，窗口大小翻倍
   - 指数增长

2. **拥塞避免（Congestion Avoidance）：**
   - 窗口达到阈值后，线性增长
   - 每个 RTT 增加 1 MSS

3. **快速重传（Fast Retransmit）：**
   - 收到 3 个重复 ACK 立即重传
   - 不等待超时

4. **快速恢复（Fast Recovery）：**
   - 快速重传后，不回到慢启动
   - 直接进入拥塞避免

## DNS 解析

### 1. DNS 基础

DNS（Domain Name System，域名系统）将域名转换为 IP 地址。

**层次结构：**
```
.                          (根域名)
  └─ .com                  (顶级域名)
      └─ example.com       (二级域名)
          └─ www.example.com (三级域名)
```

### 2. DNS 查询过程

```
浏览器 -> 浏览器缓存 -> 系统缓存 -> 路由器缓存 
  -> ISP DNS 缓存 -> 根域名服务器 -> 顶级域名服务器 
  -> 权威域名服务器 -> 返回 IP 地址
```

**详细步骤：**
1. 浏览器检查自身缓存
2. 检查操作系统缓存（/etc/hosts）
3. 检查路由器缓存
4. 查询 ISP 的 DNS 服务器（递归查询）
5. ISP DNS 服务器进行迭代查询：
   - 查询根域名服务器
   - 查询顶级域名服务器（如 .com）
   - 查询权威域名服务器
6. 返回 IP 地址
7. 缓存结果

### 3. DNS 记录类型

```
A 记录     - IPv4 地址
AAAA 记录  - IPv6 地址
CNAME 记录 - 别名记录
MX 记录    - 邮件交换记录
NS 记录    - 域名服务器记录
TXT 记录   - 文本记录
SOA 记录   - 授权记录
PTR 记录   - 指针记录（反向解析）
```

### 4. DNS 优化

**方法：**
- DNS 预解析：`<link rel="dns-prefetch" href="//example.com">`
- 减少 DNS 查询次数
- 使用 CDN
- 增加 DNS 缓存时间（TTL）
- 使用可靠的 DNS 服务商

## 浏览器渲染原理

### 1. 浏览器架构

**主要组件：**
- 用户界面：地址栏、前进后退按钮等
- 浏览器引擎：在用户界面和渲染引擎之间传送指令
- 渲染引擎：解析 HTML、CSS，渲染页面
- 网络：处理网络请求
- JavaScript 引擎：解析和执行 JavaScript
- UI 后端：绘制基本控件
- 数据存储：持久化数据（Cookie、localStorage 等）

### 2. 渲染流程

```
1. 解析 HTML → 构建 DOM 树
2. 解析 CSS → 构建 CSSOM 树
3. 合并 DOM 和 CSSOM → 构建渲染树（Render Tree）
4. 布局（Layout/Reflow）→ 计算元素位置和大小
5. 绘制（Paint）→ 绘制像素
6. 合成（Composite）→ 合成图层
```

**详细说明：**

**1. 构建 DOM 树：**
```html
<html>
  <head>
    <title>页面</title>
  </head>
  <body>
    <div>Hello</div>
  </body>
</html>
```

**2. 构建 CSSOM 树：**
```css
div {
  color: red;
  font-size: 16px;
}
```

**3. 构建渲染树：**
- 只包含可见元素
- 不包含 `display: none` 的元素
- 包含 `visibility: hidden` 的元素（占据空间）

**4. 布局（Layout）：**
- 计算元素的位置和大小
- 盒模型计算
- 流式布局

**5. 绘制（Paint）：**
- 填充颜色
- 绘制文字
- 绘制边框
- 绘制阴影

**6. 合成（Composite）：**
- 将多个图层合成到一起
- GPU 加速

### 3. 重排（Reflow）和重绘（Repaint）

**重排（Reflow）：**
- 元素的几何属性变化（位置、大小）
- 需要重新计算布局
- 代价昂贵

**触发重排的操作：**
- 添加/删除元素
- 修改元素尺寸（width、height、padding、margin、border）
- 内容变化（文本变化、图片大小变化）
- 浏览器窗口大小变化
- 获取某些属性（offsetTop、scrollTop、clientTop、getComputedStyle 等）

**重绘（Repaint）：**
- 元素的外观变化（颜色、背景）
- 不影响布局
- 代价较小

**触发重绘的操作：**
- 修改颜色（color、background-color）
- 修改边框颜色
- 修改可见性（visibility）

**优化建议：**
1. 避免频繁操作 DOM
2. 使用 class 代替内联样式
3. 批量修改 DOM
4. 使用 DocumentFragment
5. 将元素设为 `position: absolute` 或 `position: fixed`
6. 使用 CSS3 动画（transform、opacity）
7. 避免频繁读取会引起重排的属性
8. 使用 `will-change` 提示浏览器

### 4. 图层（Layer）

**创建独立图层的条件：**
- 3D 或透视变换（perspective、transform: translateZ(0)）
- 使用加速视频解码的 `<video>` 元素
- 拥有 3D（WebGL）上下文的 `<canvas>` 元素
- 使用加速 CSS 滤镜
- 元素有一个 z-index 较低且包含复合层的兄弟节点
- 元素有 `will-change` 属性

**优点：**
- 提升为独立图层可以避免重排影响其他元素
- GPU 加速

**缺点：**
- 图层过多会增加内存消耗
- 需要合理使用

### 5. 关键渲染路径优化

**目标：**
- 减少关键资源的数量
- 减少关键资源的大小
- 缩短关键路径长度

**优化方法：**
1. 内联关键 CSS
2. 异步加载非关键 CSS
3. 延迟加载 JavaScript（defer、async）
4. 减少 DOM 深度
5. 减少 CSS 选择器复杂度
6. 使用 CDN
7. 启用 HTTP/2
8. 资源压缩

## 浏览器缓存

### 1. 缓存位置

**缓存优先级（从高到低）：**
1. Service Worker
2. Memory Cache（内存缓存）
3. Disk Cache（磁盘缓存）
4. Push Cache（HTTP/2 推送缓存）
5. 网络请求

### 2. 强缓存

不向服务器发送请求，直接从缓存中读取资源。

**Cache-Control：**
```
Cache-Control: max-age=3600          # 缓存 3600 秒
Cache-Control: no-cache              # 需要验证（协商缓存）
Cache-Control: no-store              # 不缓存
Cache-Control: private               # 只能被浏览器缓存
Cache-Control: public                # 可以被代理服务器缓存
Cache-Control: immutable             # 资源不会改变
Cache-Control: must-revalidate       # 缓存过期必须验证
```

**Expires：**
```
Expires: Wed, 21 Oct 2015 07:28:00 GMT
```
- HTTP/1.0 的缓存控制
- 绝对时间
- 优先级低于 Cache-Control

### 3. 协商缓存

向服务器发送请求，由服务器判断缓存是否有效。

**Last-Modified / If-Modified-Since：**
```
# 响应头
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT

# 请求头
If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT
```
- 基于修改时间
- 精度到秒
- 如果资源未修改，返回 304

**ETag / If-None-Match：**
```
# 响应头
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# 请求头
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```
- 基于内容的唯一标识
- 精度更高
- 优先级高于 Last-Modified

### 4. 缓存策略

**HTML 文件：**
```
Cache-Control: no-cache
```
- 每次都验证
- 确保获取最新内容

**CSS、JS 文件：**
```
Cache-Control: max-age=31536000, immutable
```
- 使用哈希文件名（main.abc123.js）
- 长期缓存
- 文件内容变化时文件名变化

**图片：**
```
Cache-Control: max-age=31536000
```
- 长期缓存
- 使用 CDN

**API 请求：**
```
Cache-Control: no-store
```
- 不缓存
- 确保数据实时性

### 5. 用户操作对缓存的影响

| 操作             | 强缓存 | 协商缓存 |
| ---------------- | ------ | -------- |
| 地址栏输入       | ✅      | ✅        |
| 页面链接跳转     | ✅      | ✅        |
| 前进后退         | ✅      | ✅        |
| F5 刷新          | ❌      | ✅        |
| Ctrl+F5 强制刷新 | ❌      | ❌        |

## 跨域问题

### 1. 同源策略

**同源的定义：**
- 协议相同
- 域名相同
- 端口相同

**例子：**
```
http://example.com:80/page1.html  (源)

http://example.com:80/page2.html  ✅ 同源
https://example.com:80/page1.html ❌ 协议不同
http://www.example.com:80/page1.html ❌ 域名不同
http://example.com:8080/page1.html ❌ 端口不同
```

**同源策略限制：**
- 无法读取非同源的 Cookie、LocalStorage、IndexedDB
- 无法操作非同源的 DOM
- 无法发送非同源的 AJAX 请求（可以发送，但浏览器会拦截响应）

### 2. CORS（跨域资源共享）

**简单请求：**
- 方法：GET、HEAD、POST
- 头部：Accept、Accept-Language、Content-Language、Content-Type（限定值）
- Content-Type：text/plain、multipart/form-data、application/x-www-form-urlencoded

**服务器响应：**
```
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: X-Custom-Header
```

**预检请求（Preflight）：**
- 非简单请求会先发送 OPTIONS 请求
- 询问服务器是否允许跨域

**预检请求头：**
```
OPTIONS /api/data HTTP/1.1
Origin: https://example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
```

**预检响应头：**
```
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Max-Age: 86400
```

### 3. JSONP

**原理：**
- 利用 `<script>` 标签不受同源策略限制
- 只支持 GET 请求

**实现：**
```javascript
// 客户端
function handleResponse(data) {
  console.log(data);
}

const script = document.createElement('script');
script.src = 'https://api.example.com/data?callback=handleResponse';
document.body.appendChild(script);

// 服务器返回
handleResponse({ name: 'John', age: 30 });
```

### 4. 其他跨域方法

**1. postMessage：**
```javascript
// 发送方
otherWindow.postMessage(message, targetOrigin);

// 接收方
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://example.com') return;
  console.log(event.data);
});
```

**2. WebSocket：**
- WebSocket 没有同源限制

**3. nginx 反向代理：**
```nginx
location /api {
  proxy_pass https://api.example.com;
}
```

**4. document.domain（仅限主域相同）：**
```javascript
// a.example.com
document.domain = 'example.com';

// b.example.com
document.domain = 'example.com';
```

## 浏览器安全

### 1. XSS（跨站脚本攻击）

**类型：**

**1. 存储型 XSS：**
- 恶意脚本存储在服务器
- 用户访问时执行
- 危害最大

**2. 反射型 XSS：**
- 恶意脚本在 URL 中
- 需要用户点击
- 危害较小

**3. DOM 型 XSS：**
- 前端 JavaScript 处理不当
- 不经过服务器

**防御方法：**
1. 输入过滤：过滤特殊字符
2. 输出转义：HTML 实体编码
3. CSP（Content Security Policy）
4. HttpOnly Cookie：防止 JavaScript 读取 Cookie
5. 验证码
6. 使用安全的框架（React、Vue 自动转义）

**CSP 配置：**
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com
```

### 2. CSRF（跨站请求伪造）

**原理：**
- 利用用户已登录的身份
- 诱导用户访问恶意网站
- 恶意网站向目标网站发送请求

**攻击示例：**
```html
<!-- 恶意网站 -->
<img src="https://bank.com/transfer?to=attacker&amount=1000">
```

**防御方法：**
1. CSRF Token：
   ```html
   <form>
     <input type="hidden" name="csrf_token" value="random_token">
   </form>
   ```

2. SameSite Cookie：
   ```
   Set-Cookie: session=abc123; SameSite=Strict
   ```
   - Strict：完全禁止第三方 Cookie
   - Lax：部分场景发送 Cookie（默认）
   - None：允许第三方 Cookie（需要 Secure）

3. 验证 Referer/Origin
4. 验证码
5. 双重 Cookie 验证

### 3. 点击劫持（Clickjacking）

**原理：**
- 使用 iframe 嵌入目标网站
- 透明覆盖
- 诱导用户点击

**防御方法：**
1. X-Frame-Options：
   ```
   X-Frame-Options: DENY              # 禁止被嵌入
   X-Frame-Options: SAMEORIGIN        # 只允许同源嵌入
   X-Frame-Options: ALLOW-FROM https://example.com
   ```

2. CSP frame-ancestors：
   ```
   Content-Security-Policy: frame-ancestors 'self'
   ```

3. JavaScript 防御：
   ```javascript
   if (top !== self) {
     top.location = self.location;
   }
   ```

### 4. 中间人攻击（MITM）

**原理：**
- 攻击者拦截客户端和服务器之间的通信
- 窃听、篡改数据

**防御方法：**
1. 使用 HTTPS
2. HSTS（HTTP Strict Transport Security）：
   ```
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   ```
3. 证书固定（Certificate Pinning）
4. 避免使用公共 Wi-Fi

### 5. SQL 注入

**原理：**
- 在 SQL 查询中注入恶意代码
- 例：`SELECT * FROM users WHERE username = '' OR '1'='1'`

**防御方法：**
1. 使用参数化查询（预编译语句）
2. 输入验证
3. 最小权限原则
4. WAF（Web Application Firewall）

## 性能优化

### 1. 网络层面

**减少请求次数：**
- 合并资源（CSS、JS）
- CSS Sprites
- 使用字体图标
- 避免重定向

**减少请求大小：**
- 压缩资源（Gzip、Brotli）
- 图片优化（WebP、压缩）
- 代码压缩（Minify）
- Tree Shaking

**使用缓存：**
- 强缓存
- 协商缓存
- Service Worker

**并行请求：**
- 域名分片（HTTP/1.1）
- HTTP/2 多路复用
- 使用 CDN

**DNS 优化：**
- DNS 预解析
- 减少 DNS 查询
- 使用可靠的 DNS 服务商

### 2. 渲染层面

**关键渲染路径优化：**
- 内联关键 CSS
- 异步加载非关键资源
- 延迟加载 JavaScript

**减少重排和重绘：**
- 避免频繁操作 DOM
- 使用 class 代替内联样式
- 批量修改 DOM
- 使用 transform 和 opacity

**图层优化：**
- 合理使用 will-change
- 避免过多图层

**骨架屏：**
- 提升感知性能
- 减少白屏时间

### 3. JavaScript 层面

**代码分割：**
- 按路由分割
- 按组件分割
- 动态导入

**懒加载：**
- 图片懒加载
- 组件懒加载
- 路由懒加载

**防抖和节流：**
```javascript
// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流
function throttle(fn, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      fn.apply(this, args);
      last = now;
    }
  };
}
```

**Web Workers：**
- 处理复杂计算
- 避免阻塞主线程

**requestAnimationFrame：**
- 动画优化
- 60fps 流畅动画

### 4. 资源加载优化

**preload（预加载）：**
```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="script.js" as="script">
<link rel="preload" href="font.woff2" as="font" crossorigin>
```

**prefetch（预获取）：**
```html
<link rel="prefetch" href="next-page.html">
```

**preconnect（预连接）：**
```html
<link rel="preconnect" href="https://api.example.com">
```

**dns-prefetch（DNS 预解析）：**
```html
<link rel="dns-prefetch" href="https://cdn.example.com">
```

### 5. 监控和分析

**性能指标：**
- FCP（First Contentful Paint）：首次内容绘制
- LCP（Largest Contentful Paint）：最大内容绘制
- FID（First Input Delay）：首次输入延迟
- CLS（Cumulative Layout Shift）：累积布局偏移
- TTFB（Time to First Byte）：首字节时间
- TTI（Time to Interactive）：可交互时间

**监控工具：**
- Chrome DevTools
- Lighthouse
- WebPageTest
- Performance API

**Performance API：**
```javascript
// Navigation Timing
const navigation = performance.getEntriesByType('navigation')[0];
console.log('DNS 查询时间:', navigation.domainLookupEnd - navigation.domainLookupStart);
console.log('TCP 连接时间:', navigation.connectEnd - navigation.connectStart);
console.log('请求时间:', navigation.responseEnd - navigation.requestStart);
console.log('DOM 解析时间:', navigation.domComplete - navigation.domLoading);

// Resource Timing
const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
  console.log(resource.name, resource.duration);
});
```

## 常见面试题

### 1. 从输入 URL 到页面展示发生了什么？

1. **URL 解析**
   - 解析协议、域名、端口、路径、参数

2. **DNS 解析**
   - 查询缓存
   - 递归查询 DNS 服务器
   - 获取 IP 地址

3. **建立 TCP 连接**
   - 三次握手
   - 如果是 HTTPS，进行 TLS 握手

4. **发送 HTTP 请求**
   - 构建请求报文
   - 发送到服务器

5. **服务器处理请求**
   - 接收请求
   - 处理业务逻辑
   - 返回响应

6. **浏览器接收响应**
   - 解析响应头
   - 检查状态码
   - 处理缓存

7. **渲染页面**
   - 解析 HTML，构建 DOM 树
   - 解析 CSS，构建 CSSOM 树
   - 合并生成渲染树
   - 布局
   - 绘制
   - 合成

8. **加载资源**
   - 加载 CSS、JS、图片等
   - 执行 JavaScript

9. **页面可交互**
   - DOM 构建完成
   - JavaScript 执行完成
   - 页面可交互

10. **关闭连接**
    - 四次挥手

### 2. 强缓存和协商缓存的区别？

**强缓存：**
- 不向服务器发送请求
- 直接从缓存读取
- 状态码：200 (from cache)
- 控制：Cache-Control、Expires

**协商缓存：**
- 向服务器发送请求
- 服务器判断是否使用缓存
- 状态码：304 Not Modified
- 控制：ETag/If-None-Match、Last-Modified/If-Modified-Since

**流程：**
```
请求资源 
  ↓
强缓存是否有效？
  ├─ 是 → 使用缓存 (200 from cache)
  └─ 否 → 协商缓存
         ↓
      服务器判断
        ├─ 未修改 → 使用缓存 (304)
        └─ 已修改 → 返回新资源 (200)
```

### 3. GET 和 POST 的区别？

| 特性     | GET                     | POST     |
| -------- | ----------------------- | -------- |
| 参数位置 | URL（查询字符串）       | 请求体   |
| 长度限制 | 有（浏览器/服务器限制） | 无       |
| 安全性   | 参数暴露在 URL          | 相对安全 |
| 缓存     | 可缓存                  | 不可缓存 |
| 历史记录 | 保留在历史记录          | 不保留   |
| 书签     | 可收藏                  | 不可收藏 |
| 幂等性   | 幂等                    | 非幂等   |
| 编码     | URL 编码                | 多种编码 |
| 用途     | 获取数据                | 提交数据 |

### 4. TCP 为什么需要三次握手？

**原因：**
1. 确认双方的收发能力
   - 第一次：客户端发送能力、服务器接收能力
   - 第二次：服务器发送能力、客户端接收能力
   - 第三次：确认双方收发正常

2. 同步序列号
   - 交换初始序列号
   - 用于数据包排序和确认

3. 防止已失效的连接请求
   - 避免旧的连接请求建立新连接
   - 浪费资源

**为什么不是两次：**
- 无法确认客户端的接收能力
- 服务器无法确认客户端是否收到 SYN+ACK

**为什么不是四次：**
- 三次已经足够
- 四次是冗余的

### 5. HTTPS 的工作原理？

**流程：**
1. 客户端发起 HTTPS 请求
2. 服务器返回证书（公钥）
3. 客户端验证证书
4. 客户端生成随机密钥
5. 使用公钥加密随机密钥
6. 服务器使用私钥解密
7. 双方使用随机密钥进行对称加密通信

**为什么使用混合加密：**
- 非对称加密：安全但慢，用于传输密钥
- 对称加密：快速但不安全（密钥传输），用于数据传输

### 6. 什么是 XSS 攻击？如何防御？

**XSS（Cross-Site Scripting）：**
- 攻击者注入恶意脚本
- 在用户浏览器中执行
- 窃取信息、劫持会话

**类型：**
- 存储型：存储在服务器
- 反射型：通过 URL 传播
- DOM 型：前端代码漏洞

**防御：**
1. 输入过滤和验证
2. 输出转义（HTML 实体编码）
3. CSP（Content Security Policy）
4. HttpOnly Cookie
5. 使用安全的框架

### 7. 什么是 CSRF 攻击？如何防御？

**CSRF（Cross-Site Request Forgery）：**
- 利用用户已登录的身份
- 诱导用户访问恶意网站
- 发送伪造的请求

**防御：**
1. CSRF Token
2. SameSite Cookie
3. 验证 Referer/Origin
4. 验证码
5. 双重 Cookie 验证

### 8. 如何解决跨域问题？

**方法：**
1. **CORS**：服务器设置 Access-Control-Allow-Origin
2. **JSONP**：利用 script 标签（仅 GET）
3. **代理服务器**：nginx 反向代理
4. **postMessage**：跨窗口通信
5. **WebSocket**：没有同源限制
6. **document.domain**：主域相同时

### 9. HTTP/2 相比 HTTP/1.1 有哪些改进？

**主要改进：**
1. **二进制分帧**：更高效的传输
2. **多路复用**：一个连接并发多个请求
3. **头部压缩**：HPACK 算法
4. **服务器推送**：主动推送资源
5. **请求优先级**：合理分配资源

**优势：**
- 减少延迟
- 减少连接数
- 更好的带宽利用
- 减少 RTT

### 10. 什么是重排和重绘？如何优化？

**重排（Reflow）：**
- 元素几何属性变化
- 重新计算布局
- 代价大

**重绘（Repaint）：**
- 元素外观变化
- 不影响布局
- 代价小

**优化方法：**
1. 避免频繁操作 DOM
2. 使用 class 代替内联样式
3. 批量修改 DOM
4. 使用 DocumentFragment
5. 使用 transform 和 opacity
6. 避免频繁读取会触发重排的属性
7. 使用 will-change

### 11. Cookie、localStorage、sessionStorage 的区别？

| 特性         | Cookie         | localStorage | sessionStorage |
| ------------ | -------------- | ------------ | -------------- |
| 存储大小     | 4KB            | 5-10MB       | 5-10MB         |
| 生命周期     | 可设置过期时间 | 永久         | 会话期间       |
| 与服务器通信 | 每次请求都发送 | 不发送       | 不发送         |
| 作用域       | 可跨子域       | 同源         | 同源且同标签页 |
| 易用性       | 需要封装       | 简单         | 简单           |
| 安全性       | HttpOnly 保护  | 无特殊保护   | 无特殊保护     |

### 12. 什么是事件循环（Event Loop）？

**概念：**
- JavaScript 是单线程的
- 事件循环是 JavaScript 的执行机制
- 处理异步操作

**执行顺序：**
```
1. 执行同步代码
2. 执行微任务（microtask）
   - Promise.then
   - MutationObserver
   - queueMicrotask
3. 执行宏任务（macrotask）
   - setTimeout
   - setInterval
   - I/O
   - UI 渲染
4. 重复 2-3
```

**示例：**
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// 输出：1 4 3 2
```

### 13. 浏览器的渲染过程是怎样的？

**流程：**
1. 解析 HTML → DOM 树
2. 解析 CSS → CSSOM 树
3. 合并 → 渲染树
4. 布局（Layout）
5. 绘制（Paint）
6. 合成（Composite）

**优化点：**
- 减少 DOM 深度
- 减少 CSS 选择器复杂度
- 避免重排和重绘
- 使用 CSS3 动画
- 合理使用图层

### 14. 什么是 CDN？有什么优势？

**CDN（Content Delivery Network）：**
- 内容分发网络
- 将资源缓存到全球各地的边缘节点
- 用户从最近的节点获取资源

**优势：**
1. 加快访问速度
2. 减轻源服务器压力
3. 提高可用性
4. 防止 DDoS 攻击
5. 节省带宽成本

**工作原理：**
1. 用户请求资源
2. DNS 解析到最近的 CDN 节点
3. CDN 节点返回缓存的资源
4. 如果没有缓存，向源服务器请求
5. 缓存资源并返回给用户

### 15. 什么是 Service Worker？

**Service Worker：**
- 运行在浏览器后台的脚本
- 独立于网页
- 可以拦截网络请求
- 实现离线缓存

**生命周期：**
1. 注册（Register）
2. 安装（Install）
3. 激活（Activate）
4. 控制（Fetch）

**使用场景：**
- 离线应用（PWA）
- 缓存管理
- 推送通知
- 后台同步

**示例：**
```javascript
// 注册
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/style.css',
        '/script.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

## 最佳实践

### 1. 网络请求优化

- ✅ 使用 HTTPS
- ✅ 启用 HTTP/2
- ✅ 使用 CDN
- ✅ 启用 Gzip/Brotli 压缩
- ✅ 合理使用缓存
- ✅ 减少请求次数
- ✅ 并行加载资源
- ✅ DNS 预解析

### 2. 渲染性能优化

- ✅ 减少 DOM 操作
- ✅ 避免重排和重绘
- ✅ 使用 CSS3 动画
- ✅ 合理使用图层
- ✅ 骨架屏
- ✅ 虚拟滚动
- ✅ 图片懒加载
- ✅ 代码分割

### 3. 安全防护

- ✅ 输入验证和输出转义
- ✅ 使用 CSRF Token
- ✅ 设置 CSP
- ✅ HttpOnly Cookie
- ✅ SameSite Cookie
- ✅ X-Frame-Options
- ✅ HTTPS
- ✅ 定期更新依赖

### 4. 监控和分析

- ✅ 性能监控
- ✅ 错误监控
- ✅ 用户行为分析
- ✅ 日志记录
- ✅ 使用 Performance API
- ✅ Lighthouse 评分
- ✅ 真实用户监控（RUM）

## 总结

浏览器和网络是前端开发的基础，掌握这些知识需要：

1. **理解协议**：HTTP、HTTPS、TCP、DNS
2. **掌握浏览器原理**：渲染流程、缓存机制、事件循环
3. **了解安全问题**：XSS、CSRF、点击劫持等
4. **性能优化**：网络优化、渲染优化、资源优化
5. **实践应用**：跨域、缓存策略、性能监控

持续学习，保持对新技术的关注！
