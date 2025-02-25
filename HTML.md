# HTML

## HTML5

### HTML5 新特性

#### 新的语义元素

- `<article>` 定义一篇文章
- `<section>` 定义文档中的一个区域
- `<nav>` 定义导航链接的部分
- `<header>` 定义文档的头部区域
- `<footer>` 定义文档的尾部区域
- `<aside>` 定义页面主内容之外的内容（比如侧边栏）
- `<figure>` 定义媒介内容的分组，以及它们的标题（可选）
- `<figcaption>` 定义 `<figure>` 元素的标题

#### 新的表单控件

- `<datalist>` 定义选项列表。与 input 元素配合使用，来定义 input 可能的值。
- `<output>` 定义不同类型的输出，比如脚本的输出。

#### 新的表单属性

- autocomplete 属性规定 form 或 input 域应该自动完成。
- autofocus 属性规定在页面加载时，域应该自动获得焦点。
- form 属性规定输入域所属的一个或多个表单。
- formaction 属性规定当提交表单时处理该输入控件的文件的 URL。（覆盖 form 元素的 action 属性）
- formenctype 属性规定当把表单数据发送到服务器时如何编码。（覆盖 form 元素的 enctype 属性）
- formmethod 属性定义了发送 form 数据的 HTTP 方法。（覆盖 form 元素的 method 属性）
- formnovalidate 属性是一个布尔属性。如果设置，则规定在提交表单时不应该验证 form 数据。
- formtarget 属性规定的名称或关键词指示提交表单后在何处显示接收到的响应。（覆盖 form 元素的 target 属性）
- height 和 width 属性规定 `<canvas>` 元素的高度和宽度。

### HTML5 新增 API

#### 1. Geolocation API

Geolocation API 用于获得用户的地理位置。

#### 2. Drag and Drop API

HTML5 拖放（Drag 和 Drop）API 使网页元素可拖动。

#### 3. Audio 和 Video API

HTML5 提供了 audio 和 video 元素，让开发者能够不需要借助任何插件就能嵌入音频和视频内容。

#### 4. Canvas API

HTML5 `<canvas>` 元素用于通过 JavaScript 在网页上绘制图形。

#### 5. SVG

SVG 是一种使用 XML 描述 2D 图形的语言。

#### 6. Web Worker

Web Worker 为 JavaScript 创建多线程运行环境，允许主线程运行的同时，执行另一个脚本文件，互不干扰。

#### 7. Web Storage

Web Storage 提供了两种在客户端存储数据的新方法：localStorage（长期存储）和 sessionStorage（会话存储）。

#### 8. WebSocket

WebSocket 是一种在单个 TCP 连接上进行全双工通讯的协议。

### HTML5 新增表单元素

- `<datalist>`：定义选项列表，与 input 元素配合使用，来定义 input 可能的值；
- `<keygen>`：定义键对生成器字段（密钥对字段）；
- `<output>`：定义不同类型的输出，比如脚本的输出；

### HTML5 新增表单属性

- autocomplete 属性规定 form 或 input 域应该自动完成；
- autofocus 属性规定在页面加载时，域应该自动获得焦点；
- form 属性规定输入域所属的一个或多个表单；
- formaction 属性规定当提交表单时处理该输入控件的文件的 URL；
- formenctype 属性规定当把表单数据（form-data）提交至服务器时如何对其进行编码；
- formmethod 属性定义用以向 action URL 发送表单数据（form-data）的 HTTP 方法；
- formnovalidate 属性规定在提交表单时不应该验证 form-data；
- formtarget 属性规定一个名称或关键词，指示提交表单后在何处显示接收到的响应；
- height 和 width 属性规定 `<canvas>` 元素的高度和宽度；
