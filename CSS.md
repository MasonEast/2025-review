# CSS 面试题

## CSS 基础

### 1. CSS 是什么

CSS（Cascading Style Sheets，层叠样式表）是用于描述 HTML 文档样式的语言，用于控制网页的外观和布局。

**核心特点：**
- 样式与内容分离
- 层叠性
- 继承性
- 可复用性

**CSS 引入方式：**
```html
<!-- 1. 内联样式 -->
<div style="color: red;">内容</div>

<!-- 2. 内部样式 -->
<style>
  div { color: red; }
</style>

<!-- 3. 外部样式 -->
<link rel="stylesheet" href="style.css">

<!-- 4. @import 导入 -->
<style>
  @import url('style.css');
</style>
```

### 2. CSS 选择器

**基础选择器：**
```css
/* 元素选择器 */
div { }

/* 类选择器 */
.class-name { }

/* ID 选择器 */
#id-name { }

/* 通配符选择器 */
* { }

/* 属性选择器 */
[type="text"] { }
[class^="btn"] { }    /* 以 btn 开头 */
[class$="btn"] { }    /* 以 btn 结尾 */
[class*="btn"] { }    /* 包含 btn */
```

**组合选择器：**
```css
/* 后代选择器 */
div p { }

/* 子选择器 */
div > p { }

/* 相邻兄弟选择器 */
div + p { }

/* 通用兄弟选择器 */
div ~ p { }

/* 多个选择器 */
div, p, span { }
```

**伪类选择器：**
```css
/* 链接伪类 */
a:link { }
a:visited { }
a:hover { }
a:active { }

/* 结构伪类 */
:first-child
:last-child
:nth-child(n)
:nth-last-child(n)
:nth-of-type(n)
:first-of-type
:last-of-type
:only-child
:only-of-type

/* 状态伪类 */
:focus
:checked
:disabled
:enabled
:valid
:invalid
:required
:optional

/* 其他伪类 */
:not(selector)
:empty
:root
:target
```

**伪元素选择器：**
```css
/* 注意：伪元素使用双冒号 :: */
::before
::after
::first-line
::first-letter
::selection
::placeholder
```

### 3. 选择器优先级

**优先级计算：**
- 内联样式：1000
- ID 选择器：100
- 类选择器、属性选择器、伪类：10
- 元素选择器、伪元素：1
- 通配符、组合符：0

**优先级规则：**
```css
/* 优先级：1 */
div { color: red; }

/* 优先级：10 */
.class { color: blue; }

/* 优先级：100 */
#id { color: green; }

/* 优先级：11 */
div.class { color: yellow; }

/* 优先级：111 */
#id div.class { color: purple; }

/* !important 最高优先级 */
div { color: red !important; }
```

**优先级顺序：**
```
!important > 内联样式 > ID 选择器 > 类选择器 > 元素选择器 > 通配符 > 继承 > 浏览器默认
```

### 4. CSS 继承

**可继承属性：**
- 文本相关：color、font-family、font-size、font-weight、line-height、text-align、letter-spacing 等
- 列表相关：list-style 等
- 光标：cursor

**不可继承属性：**
- 盒模型：width、height、margin、padding、border
- 定位：position、top、right、bottom、left
- 背景：background 系列
- 显示：display、overflow 等

**继承控制：**
```css
/* 强制继承 */
div { color: inherit; }

/* 初始值 */
div { color: initial; }

/* 恢复默认 */
div { color: unset; }

/* 恢复 */
div { all: revert; }
```

## 盒模型

### 1. 标准盒模型 vs IE 盒模型

**标准盒模型（content-box）：**
```
总宽度 = width + padding + border + margin
总高度 = height + padding + border + margin

实际内容宽度 = width
```

**IE 盒模型（border-box）：**
```
总宽度 = width + margin
总高度 = height + margin

实际内容宽度 = width - padding - border
```

**设置盒模型：**
```css
/* 标准盒模型 */
box-sizing: content-box;

/* IE 盒模型（推荐） */
box-sizing: border-box;

/* 全局设置 */
* {
  box-sizing: border-box;
}
```

### 2. 外边距折叠（Margin Collapse）

**垂直外边距折叠：**
```css
/* 相邻兄弟元素 */
.box1 { margin-bottom: 20px; }
.box2 { margin-top: 30px; }
/* 实际间距：30px（取最大值） */

/* 父子元素 */
.parent { margin-top: 20px; }
.child { margin-top: 30px; }
/* 父元素的 margin-top：30px（取最大值） */
```

**防止外边距折叠：**
```css
/* 1. 使用 padding 代替 margin */
.parent { padding-top: 20px; }

/* 2. 创建 BFC */
.parent { overflow: hidden; }

/* 3. 使用 border */
.parent { border-top: 1px solid transparent; }

/* 4. 使用 flex 或 grid */
.parent { display: flex; }
```

### 3. 盒模型相关属性

**width 和 height：**
```css
/* 固定值 */
width: 200px;

/* 百分比 */
width: 50%;

/* 自动 */
width: auto;

/* 视口单位 */
width: 50vw;

/* 最小/最大宽度 */
min-width: 200px;
max-width: 800px;

/* fit-content */
width: fit-content;
```

**padding：**
```css
/* 四个方向 */
padding: 10px;

/* 上下 左右 */
padding: 10px 20px;

/* 上 左右 下 */
padding: 10px 20px 30px;

/* 上 右 下 左（顺时针） */
padding: 10px 20px 30px 40px;

/* 单独设置 */
padding-top: 10px;
padding-right: 20px;
padding-bottom: 30px;
padding-left: 40px;
```

**margin：**
```css
/* 语法同 padding */
margin: 10px;

/* 水平居中 */
margin: 0 auto;

/* 负边距 */
margin-top: -10px;
```

**border：**
```css
/* 简写 */
border: 1px solid #000;

/* 分别设置 */
border-width: 1px;
border-style: solid;
border-color: #000;

/* 单独设置边 */
border-top: 1px solid #000;
border-right: 2px dashed #f00;

/* 圆角 */
border-radius: 5px;
border-radius: 10px 20px 30px 40px;

/* 椭圆 */
border-radius: 50%;
```

## BFC（块级格式化上下文）

### 1. 什么是 BFC

BFC（Block Formatting Context）是页面中的一块独立渲染区域，内部元素的布局不会影响外部元素。

**BFC 的特性：**
1. 内部的盒子会在垂直方向上一个接一个排列
2. 同一个 BFC 内相邻元素的 margin 会折叠
3. BFC 区域不会与浮动元素重叠
4. BFC 可以包含浮动元素（清除浮动）
5. 计算 BFC 高度时，浮动元素也参与计算

### 2. 创建 BFC

```css
/* 1. 根元素 html */

/* 2. 浮动元素 */
float: left;
float: right;

/* 3. 绝对定位元素 */
position: absolute;
position: fixed;

/* 4. overflow 不为 visible */
overflow: hidden;
overflow: auto;
overflow: scroll;

/* 5. display 为 inline-block、table-cell、flex、grid 等 */
display: inline-block;
display: table-cell;
display: flex;
display: grid;

/* 6. contain 属性 */
contain: layout;
contain: paint;
```

### 3. BFC 应用场景

**1. 清除浮动：**
```css
.parent {
  overflow: hidden; /* 创建 BFC */
}

.child {
  float: left;
}
```

**2. 防止外边距折叠：**
```css
.wrapper {
  overflow: hidden; /* 创建 BFC */
}

.box {
  margin-top: 20px;
}
```

**3. 两栏布局：**
```css
.left {
  float: left;
  width: 200px;
}

.right {
  overflow: hidden; /* 创建 BFC，不与浮动元素重叠 */
}
```

## 定位（Position）

### 1. 定位类型

**static（默认）：**
```css
position: static;
/* 默认定位，元素在正常文档流中 */
/* top、right、bottom、left 无效 */
```

**relative（相对定位）：**
```css
position: relative;
top: 10px;
left: 20px;
/* 相对于元素原来的位置定位 */
/* 不脱离文档流，原位置仍占据空间 */
```

**absolute（绝对定位）：**
```css
position: absolute;
top: 0;
left: 0;
/* 相对于最近的非 static 定位祖先元素定位 */
/* 脱离文档流，不占据空间 */
```

**fixed（固定定位）：**
```css
position: fixed;
top: 0;
right: 0;
/* 相对于浏览器窗口定位 */
/* 脱离文档流，固定在屏幕位置 */
```

**sticky（粘性定位）：**
```css
position: sticky;
top: 0;
/* 在滚动到阈值前为 relative，之后为 fixed */
/* 常用于导航栏 */
```

### 2. 定位属性

```css
/* 偏移属性 */
top: 10px;
right: 20px;
bottom: 30px;
left: 40px;

/* z-index（层叠顺序） */
z-index: 1;
z-index: 999;
z-index: -1;

/* 只对定位元素有效（非 static） */
```

### 3. 居中方案

**水平居中：**
```css
/* 1. 行内元素 */
.parent {
  text-align: center;
}

/* 2. 块级元素 */
.child {
  margin: 0 auto;
  width: 200px;
}

/* 3. flex */
.parent {
  display: flex;
  justify-content: center;
}

/* 4. 绝对定位 */
.child {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

**垂直居中：**
```css
/* 1. 单行文本 */
.parent {
  height: 100px;
  line-height: 100px;
}

/* 2. flex */
.parent {
  display: flex;
  align-items: center;
}

/* 3. 绝对定位 */
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

/* 4. table-cell */
.parent {
  display: table-cell;
  vertical-align: middle;
}
```

**水平垂直居中：**
```css
/* 1. flex（最推荐） */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 2. grid */
.parent {
  display: grid;
  place-items: center;
}

/* 3. 绝对定位 + transform */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 4. 绝对定位 + margin */
.child {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 200px;
  height: 200px;
}
```

## 浮动（Float）

### 1. 浮动基础

```css
/* 左浮动 */
float: left;

/* 右浮动 */
float: right;

/* 不浮动 */
float: none;
```

**浮动特性：**
1. 脱离文档流
2. 向左或向右移动，直到碰到容器边缘或另一个浮动元素
3. 浮动元素会生成块级框
4. 父元素高度塌陷

### 2. 清除浮动

**方法一：clear 属性**
```css
.clear {
  clear: both;
}
```

**方法二：BFC**
```css
.parent {
  overflow: hidden;
}
```

**方法三：伪元素（最推荐）**
```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* 更完整的版本 */
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}

.clearfix::after {
  clear: both;
}
```

## Flexbox 布局

### 1. Flex 容器属性

**display：**
```css
display: flex;        /* 块级 flex */
display: inline-flex; /* 行内 flex */
```

**flex-direction：**
```css
flex-direction: row;            /* 默认，水平从左到右 */
flex-direction: row-reverse;    /* 水平从右到左 */
flex-direction: column;         /* 垂直从上到下 */
flex-direction: column-reverse; /* 垂直从下到上 */
```

**flex-wrap：**
```css
flex-wrap: nowrap;       /* 默认，不换行 */
flex-wrap: wrap;         /* 换行 */
flex-wrap: wrap-reverse; /* 反向换行 */
```

**flex-flow：**
```css
/* flex-direction 和 flex-wrap 的简写 */
flex-flow: row wrap;
```

**justify-content（主轴对齐）：**
```css
justify-content: flex-start;    /* 左对齐 */
justify-content: flex-end;      /* 右对齐 */
justify-content: center;        /* 居中 */
justify-content: space-between; /* 两端对齐 */
justify-content: space-around;  /* 环绕对齐 */
justify-content: space-evenly;  /* 均匀分布 */
```

**align-items（交叉轴对齐）：**
```css
align-items: flex-start; /* 起点对齐 */
align-items: flex-end;   /* 终点对齐 */
align-items: center;     /* 居中 */
align-items: baseline;   /* 基线对齐 */
align-items: stretch;    /* 拉伸（默认） */
```

**align-content（多行对齐）：**
```css
align-content: flex-start;
align-content: flex-end;
align-content: center;
align-content: space-between;
align-content: space-around;
align-content: stretch;
```

**gap：**
```css
gap: 10px;           /* 行列间距 */
row-gap: 10px;       /* 行间距 */
column-gap: 20px;    /* 列间距 */
```

### 2. Flex 项目属性

**order：**
```css
order: 0;  /* 默认 */
order: 1;  /* 越小越靠前 */
order: -1;
```

**flex-grow：**
```css
flex-grow: 0; /* 默认，不放大 */
flex-grow: 1; /* 放大比例 */
```

**flex-shrink：**
```css
flex-shrink: 1; /* 默认，等比缩小 */
flex-shrink: 0; /* 不缩小 */
```

**flex-basis：**
```css
flex-basis: auto;  /* 默认，项目本来大小 */
flex-basis: 200px; /* 指定宽度 */
flex-basis: 0;     /* 忽略项目本身大小 */
```

**flex：**
```css
/* flex-grow flex-shrink flex-basis 的简写 */
flex: 1;           /* 1 1 0% */
flex: auto;        /* 1 1 auto */
flex: none;        /* 0 0 auto */
flex: 1 200px;     /* 1 1 200px */
```

**align-self：**
```css
align-self: auto;       /* 默认，继承父元素 */
align-self: flex-start;
align-self: flex-end;
align-self: center;
align-self: baseline;
align-self: stretch;
```

### 3. Flex 常见布局

**两栏布局：**
```css
.container {
  display: flex;
}

.left {
  width: 200px;
}

.right {
  flex: 1;
}
```

**三栏布局：**
```css
.container {
  display: flex;
}

.left, .right {
  width: 200px;
}

.center {
  flex: 1;
}
```

**等分布局：**
```css
.container {
  display: flex;
}

.item {
  flex: 1;
}
```

**圣杯布局：**
```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header, .footer {
  height: 60px;
}

.main {
  display: flex;
  flex: 1;
}

.left, .right {
  width: 200px;
}

.center {
  flex: 1;
}
```

## Grid 布局

### 1. Grid 容器属性

**display：**
```css
display: grid;        /* 块级 grid */
display: inline-grid; /* 行内 grid */
```

**定义网格：**
```css
/* 列 */
grid-template-columns: 100px 200px 100px;
grid-template-columns: 1fr 2fr 1fr;
grid-template-columns: repeat(3, 1fr);
grid-template-columns: repeat(auto-fill, 100px);
grid-template-columns: 100px auto 100px;
grid-template-columns: minmax(100px, 1fr);

/* 行 */
grid-template-rows: 100px 200px;
grid-template-rows: repeat(3, 100px);

/* 简写 */
grid-template: 100px 200px / 1fr 2fr;
```

**网格间距：**
```css
gap: 10px;
row-gap: 10px;
column-gap: 20px;

/* 旧语法 */
grid-gap: 10px;
grid-row-gap: 10px;
grid-column-gap: 20px;
```

**对齐方式：**
```css
/* 整体对齐 */
justify-items: start | end | center | stretch;
align-items: start | end | center | stretch;
place-items: center; /* 简写 */

/* 网格整体在容器中的对齐 */
justify-content: start | end | center | stretch | space-between | space-around | space-evenly;
align-content: start | end | center | stretch | space-between | space-around | space-evenly;
place-content: center; /* 简写 */
```

**自动网格：**
```css
/* 自动行 */
grid-auto-rows: 100px;
grid-auto-rows: minmax(100px, auto);

/* 自动列 */
grid-auto-columns: 100px;

/* 自动流向 */
grid-auto-flow: row;        /* 默认，按行填充 */
grid-auto-flow: column;     /* 按列填充 */
grid-auto-flow: row dense;  /* 密集填充 */
```

### 2. Grid 项目属性

**定位：**
```css
/* 列 */
grid-column-start: 1;
grid-column-end: 3;
grid-column: 1 / 3;         /* 简写 */
grid-column: 1 / span 2;    /* 跨越 2 列 */

/* 行 */
grid-row-start: 1;
grid-row-end: 3;
grid-row: 1 / 3;            /* 简写 */
grid-row: 1 / span 2;       /* 跨越 2 行 */

/* 区域 */
grid-area: 1 / 1 / 3 / 3;   /* row-start / col-start / row-end / col-end */
```

**对齐：**
```css
/* 单个项目对齐 */
justify-self: start | end | center | stretch;
align-self: start | end | center | stretch;
place-self: center; /* 简写 */
```

### 3. Grid 常见布局

**等分布局：**
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

**响应式布局：**
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}
```

**圣杯布局：**
```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
}

.header {
  grid-column: 1 / 4;
}

.footer {
  grid-column: 1 / 4;
}
```

**区域布局：**
```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 60px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

## 响应式设计

### 1. 媒体查询

```css
/* 基本语法 */
@media screen and (max-width: 768px) {
  /* 样式 */
}

/* 常用断点 */
/* 移动端 */
@media (max-width: 767px) { }

/* 平板 */
@media (min-width: 768px) and (max-width: 1023px) { }

/* 桌面端 */
@media (min-width: 1024px) { }

/* 高分辨率屏幕 */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) { }

/* 横屏 */
@media (orientation: landscape) { }

/* 竖屏 */
@media (orientation: portrait) { }

/* 暗色模式 */
@media (prefers-color-scheme: dark) { }

/* 多条件 */
@media screen and (min-width: 768px) and (max-width: 1023px) { }
```

### 2. 响应式单位

**相对单位：**
```css
/* em：相对于父元素字体大小 */
font-size: 1.5em;

/* rem：相对于根元素字体大小 */
font-size: 1.5rem;

/* %：相对于父元素 */
width: 50%;

/* vw：视口宽度的 1% */
width: 50vw;

/* vh：视口高度的 1% */
height: 50vh;

/* vmin：vw 和 vh 中较小的值 */
font-size: 5vmin;

/* vmax：vw 和 vh 中较大的值 */
font-size: 5vmax;
```

**响应式字体：**
```css
/* 使用 clamp */
font-size: clamp(1rem, 2.5vw, 2rem);

/* 使用 calc */
font-size: calc(16px + 0.5vw);
```

### 3. 响应式图片

```css
/* 自适应图片 */
img {
  max-width: 100%;
  height: auto;
}

/* object-fit */
img {
  width: 100%;
  height: 300px;
  object-fit: cover;      /* 裁剪 */
  object-fit: contain;    /* 包含 */
  object-fit: fill;       /* 拉伸 */
  object-fit: none;       /* 保持原始尺寸 */
}

/* object-position */
img {
  object-position: center top;
}
```

```html
<!-- picture 元素 -->
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Responsive Image">
</picture>

<!-- srcset -->
<img srcset="small.jpg 300w,
             medium.jpg 600w,
             large.jpg 1200w"
     sizes="(max-width: 600px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
     src="medium.jpg"
     alt="Responsive Image">
```

### 4. 移动端适配

**viewport 设置：**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

**1px 问题解决：**
```css
/* 使用伪元素 + transform */
.border::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #000;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}

/* 使用 box-shadow */
.border {
  box-shadow: 0 1px 1px -1px #000;
}
```

**rem 适配：**
```javascript
// 动态设置根元素字体大小
(function() {
  const setRem = () => {
    const width = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = width / 10 + 'px';
  };
  
  setRem();
  window.addEventListener('resize', setRem);
})();
```

## CSS3 新特性

### 1. 圆角

```css
border-radius: 10px;
border-radius: 10px 20px 30px 40px;
border-radius: 50%; /* 圆形 */

/* 椭圆 */
border-radius: 50% / 25%;
border-top-left-radius: 10px 20px;
```

### 2. 阴影

**盒阴影：**
```css
/* 语法：x偏移 y偏移 模糊半径 扩展半径 颜色 */
box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);

/* 内阴影 */
box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);

/* 多重阴影 */
box-shadow: 
  0 2px 5px rgba(0, 0, 0, 0.3),
  0 5px 15px rgba(0, 0, 0, 0.2);
```

**文字阴影：**
```css
text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

/* 多重文字阴影 */
text-shadow: 
  1px 1px 0 #fff,
  2px 2px 5px rgba(0, 0, 0, 0.5);
```

### 3. 渐变

**线性渐变：**
```css
/* 从上到下 */
background: linear-gradient(#fff, #000);

/* 指定方向 */
background: linear-gradient(to right, #fff, #000);
background: linear-gradient(45deg, #fff, #000);

/* 多个颜色 */
background: linear-gradient(to right, red, yellow, green);

/* 颜色位置 */
background: linear-gradient(to right, red 0%, yellow 50%, green 100%);

/* 重复渐变 */
background: repeating-linear-gradient(45deg, #fff 0px, #fff 10px, #000 10px, #000 20px);
```

**径向渐变：**
```css
/* 从中心向外 */
background: radial-gradient(#fff, #000);

/* 指定形状 */
background: radial-gradient(circle, #fff, #000);
background: radial-gradient(ellipse, #fff, #000);

/* 指定大小 */
background: radial-gradient(circle at center, #fff 0%, #000 100%);
background: radial-gradient(100px 100px at center, #fff, #000);

/* 重复渐变 */
background: repeating-radial-gradient(circle, #fff 0px, #fff 10px, #000 10px, #000 20px);
```

**锥形渐变：**
```css
background: conic-gradient(red, yellow, green, blue, red);
background: conic-gradient(from 45deg, red, yellow, green);
```

### 4. 变换（Transform）

**2D 变换：**
```css
/* 平移 */
transform: translate(50px, 100px);
transform: translateX(50px);
transform: translateY(100px);

/* 缩放 */
transform: scale(1.5);
transform: scale(2, 0.5);
transform: scaleX(2);
transform: scaleY(0.5);

/* 旋转 */
transform: rotate(45deg);

/* 倾斜 */
transform: skew(10deg, 20deg);
transform: skewX(10deg);
transform: skewY(20deg);

/* 组合 */
transform: translate(50px, 100px) rotate(45deg) scale(1.5);

/* 原点 */
transform-origin: center center;
transform-origin: left top;
transform-origin: 50% 50%;
```

**3D 变换：**
```css
/* 3D 平移 */
transform: translate3d(50px, 100px, 200px);
transform: translateZ(200px);

/* 3D 旋转 */
transform: rotateX(45deg);
transform: rotateY(45deg);
transform: rotateZ(45deg);
transform: rotate3d(1, 1, 1, 45deg);

/* 3D 缩放 */
transform: scale3d(1, 2, 0.5);
transform: scaleZ(2);

/* 透视 */
perspective: 1000px;
transform: perspective(1000px) rotateY(45deg);

/* 3D 空间 */
transform-style: preserve-3d;
```

### 5. 过渡（Transition）

```css
/* 基本语法 */
transition: property duration timing-function delay;

/* 单个属性 */
transition: width 0.3s ease 0s;

/* 多个属性 */
transition: width 0.3s, height 0.5s, background 0.2s;

/* 所有属性 */
transition: all 0.3s;

/* 分别设置 */
transition-property: width;
transition-duration: 0.3s;
transition-timing-function: ease;
transition-delay: 0s;

/* 时间函数 */
transition-timing-function: linear;
transition-timing-function: ease;
transition-timing-function: ease-in;
transition-timing-function: ease-out;
transition-timing-function: ease-in-out;
transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
transition-timing-function: steps(4, end);
```

### 6. 动画（Animation）

**定义动画：**
```css
@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100px);
  }
}

/* 或者 */
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0);
  }
}
```

**应用动画：**
```css
/* 基本语法 */
animation: name duration timing-function delay iteration-count direction fill-mode;

/* 示例 */
animation: slide 1s ease 0s infinite alternate both;

/* 分别设置 */
animation-name: slide;                    /* 动画名称 */
animation-duration: 1s;                   /* 持续时间 */
animation-timing-function: ease;          /* 时间函数 */
animation-delay: 0s;                      /* 延迟时间 */
animation-iteration-count: infinite;      /* 重复次数，infinite 为无限 */
animation-direction: alternate;           /* 方向：normal, reverse, alternate, alternate-reverse */
animation-fill-mode: both;                /* 填充模式：none, forwards, backwards, both */
animation-play-state: running;            /* 播放状态：running, paused */
```

**常用动画示例：**
```css
/* 淡入 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 弹跳 */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* 旋转 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 脉冲 */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

### 7. 滤镜（Filter）

```css
/* 模糊 */
filter: blur(5px);

/* 亮度 */
filter: brightness(1.5);

/* 对比度 */
filter: contrast(1.5);

/* 灰度 */
filter: grayscale(100%);

/* 色相旋转 */
filter: hue-rotate(90deg);

/* 反转 */
filter: invert(100%);

/* 透明度 */
filter: opacity(50%);

/* 饱和度 */
filter: saturate(2);

/* 褐色 */
filter: sepia(100%);

/* 阴影 */
filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));

/* 组合 */
filter: brightness(1.1) contrast(1.2) saturate(1.3);
```

### 8. 混合模式

```css
/* 背景混合 */
background-blend-mode: multiply;
background-blend-mode: screen;
background-blend-mode: overlay;
background-blend-mode: darken;
background-blend-mode: lighten;

/* 元素混合 */
mix-blend-mode: multiply;
mix-blend-mode: screen;
mix-blend-mode: overlay;
mix-blend-mode: difference;
```

## CSS 变量

### 1. 定义和使用

```css
/* 定义全局变量 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size: 16px;
  --spacing: 10px;
}

/* 使用变量 */
.button {
  background-color: var(--primary-color);
  font-size: var(--font-size);
  padding: var(--spacing);
}

/* 带默认值 */
.button {
  color: var(--text-color, #333);
}

/* 在局部作用域定义 */
.container {
  --container-width: 1200px;
  max-width: var(--container-width);
}
```

### 2. JavaScript 操作

```javascript
// 获取变量值
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');

// 设置变量值
root.style.setProperty('--primary-color', '#ff0000');

// 删除变量
root.style.removeProperty('--primary-color');
```

### 3. 实用案例

**主题切换：**
```css
:root {
  --bg-color: #fff;
  --text-color: #333;
}

[data-theme="dark"] {
  --bg-color: #333;
  --text-color: #fff;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

## CSS 预处理器

### 1. Sass/SCSS

**变量：**
```scss
$primary-color: #007bff;
$font-size: 16px;

.button {
  background-color: $primary-color;
  font-size: $font-size;
}
```

**嵌套：**
```scss
.nav {
  background: #333;
  
  ul {
    list-style: none;
  }
  
  li {
    display: inline-block;
    
    a {
      color: #fff;
      
      &:hover {
        color: #007bff;
      }
    }
  }
}
```

**混合（Mixin）：**
```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button-style($bg-color) {
  background-color: $bg-color;
  padding: 10px 20px;
  border-radius: 5px;
}

.container {
  @include flex-center;
}

.button {
  @include button-style(#007bff);
}
```

**继承：**
```scss
%button-base {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.button-primary {
  @extend %button-base;
  background-color: #007bff;
}

.button-secondary {
  @extend %button-base;
  background-color: #6c757d;
}
```

**函数：**
```scss
@function calculate-rem($size) {
  @return $size / 16px * 1rem;
}

.title {
  font-size: calculate-rem(24px);
}
```

**导入：**
```scss
@import 'variables';
@import 'mixins';
@import 'base';
```

### 2. Less

**变量：**
```less
@primary-color: #007bff;
@font-size: 16px;

.button {
  background-color: @primary-color;
  font-size: @font-size;
}
```

**嵌套：**
```less
.nav {
  background: #333;
  
  ul {
    list-style: none;
  }
  
  li {
    display: inline-block;
    
    a {
      color: #fff;
      
      &:hover {
        color: #007bff;
      }
    }
  }
}
```

**混合：**
```less
.flex-center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-style(@bg-color) {
  background-color: @bg-color;
  padding: 10px 20px;
  border-radius: 5px;
}

.container {
  .flex-center();
}

.button {
  .button-style(#007bff);
}
```

## 性能优化

### 1. CSS 性能优化

**减少选择器复杂度：**
```css
/* ❌ 不好 */
div.container ul.list li.item a.link { }

/* ✅ 好 */
.link { }
```

**避免通配符：**
```css
/* ❌ 避免 */
* { margin: 0; padding: 0; }

/* ✅ 使用 reset.css 或 normalize.css */
```

**使用 CSS Containment：**
```css
.card {
  contain: layout style paint;
}
```

**使用 will-change：**
```css
.element {
  will-change: transform, opacity;
}

/* 动画结束后移除 */
.element.animated {
  will-change: auto;
}
```

**硬件加速：**
```css
.element {
  transform: translateZ(0);
  /* 或 */
  transform: translate3d(0, 0, 0);
}
```

### 2. 渲染性能

**避免重排（Reflow）：**
```css
/* 触发重排的属性（尽量避免频繁修改） */
width, height
margin, padding
border
position
display
top, left, right, bottom
```

**优先使用重绘（Repaint）：**
```css
/* 只触发重绘的属性 */
color
background-color
visibility
box-shadow
```

**最优：使用 transform 和 opacity：**
```css
/* 只触发合成的属性（性能最好） */
transform
opacity
```

### 3. 加载优化

**关键 CSS 内联：**
```html
<style>
  /* 首屏关键 CSS */
  .header { }
  .hero { }
</style>

<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
```

**CSS 压缩和合并：**
```bash
# 使用工具压缩 CSS
npm install -g cssnano
cssnano input.css output.css
```

**使用 CDN：**
```html
<link rel="stylesheet" href="https://cdn.example.com/style.css">
```

## 常见面试题

### 1. 盒模型有哪些？有什么区别？

**答案：**
盒模型分为标准盒模型和 IE 盒模型。

**标准盒模型（content-box）：**
- 宽度 = content
- 总宽度 = width + padding + border + margin

**IE 盒模型（border-box）：**
- 宽度 = content + padding + border
- 总宽度 = width + margin

**设置：**
```css
box-sizing: content-box; /* 标准盒模型 */
box-sizing: border-box;  /* IE 盒模型（推荐） */
```

### 2. 如何实现水平垂直居中？

**答案：**
```css
/* 1. Flex（最推荐） */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 2. Grid */
.parent {
  display: grid;
  place-items: center;
}

/* 3. 绝对定位 + transform */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 4. 绝对定位 + margin */
.child {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 200px;
  height: 200px;
}
```

### 3. 什么是 BFC？如何创建 BFC？

**答案：**
BFC（Block Formatting Context）是块级格式化上下文，是一个独立的渲染区域。

**创建 BFC：**
1. float 不为 none
2. position 为 absolute 或 fixed
3. display 为 inline-block、table-cell、flex、grid
4. overflow 不为 visible

**BFC 应用：**
1. 清除浮动
2. 防止外边距折叠
3. 两栏布局

### 4. Flex 布局和 Grid 布局的区别？

**答案：**

| 特性       | Flex                 | Grid                 |
| ---------- | -------------------- | -------------------- |
| 维度       | 一维（行或列）       | 二维（行和列）       |
| 适用场景   | 简单布局、组件内布局 | 复杂布局、页面级布局 |
| 对齐方式   | 灵活                 | 更强大               |
| 浏览器支持 | 更好                 | 较新                 |
| 学习曲线   | 平缓                 | 稍陡                 |

**选择建议：**
- 一维布局用 Flex
- 二维布局用 Grid
- 两者可以结合使用

### 5. CSS 选择器优先级如何计算？

**答案：**
优先级从高到低：
1. !important
2. 内联样式（1000）
3. ID 选择器（100）
4. 类选择器、属性选择器、伪类（10）
5. 元素选择器、伪元素（1）
6. 通配符、组合符（0）

**计算规则：**
- 每个选择器按类型累加
- 比较时从左到右逐位比较
- 如果优先级相同，后定义的覆盖先定义的

### 6. 如何清除浮动？

**答案：**
```css
/* 方法一：clear（不推荐） */
.clear {
  clear: both;
}

/* 方法二：BFC */
.parent {
  overflow: hidden;
}

/* 方法三：伪元素（推荐） */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

### 7. position 有哪些值？有什么区别？

**答案：**
1. **static**：默认，正常文档流
2. **relative**：相对定位，相对于原位置，不脱离文档流
3. **absolute**：绝对定位，相对于最近的非 static 祖先，脱离文档流
4. **fixed**：固定定位，相对于浏览器窗口，脱离文档流
5. **sticky**：粘性定位，relative 和 fixed 的结合

### 8. 如何实现两栏布局？

**答案：**
```css
/* 方法一：Float */
.left {
  float: left;
  width: 200px;
}
.right {
  margin-left: 200px;
}

/* 方法二：Flex */
.container {
  display: flex;
}
.left {
  width: 200px;
}
.right {
  flex: 1;
}

/* 方法三：Grid */
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* 方法四：绝对定位 */
.left {
  position: absolute;
  width: 200px;
}
.right {
  margin-left: 200px;
}
```

### 9. CSS3 有哪些新特性？

**答案：**
1. **选择器**：伪类、伪元素、属性选择器
2. **盒模型**：box-sizing、border-radius、box-shadow
3. **背景**：background-size、background-clip、多背景
4. **渐变**：linear-gradient、radial-gradient
5. **变换**：transform（2D/3D）
6. **过渡**：transition
7. **动画**：animation、@keyframes
8. **布局**：flex、grid
9. **媒体查询**：@media
10. **字体**：@font-face、font-feature-settings
11. **滤镜**：filter
12. **变量**：CSS 自定义属性
13. **混合模式**：mix-blend-mode

### 10. 如何实现响应式设计？

**答案：**
1. **媒体查询**：
```css
@media (max-width: 768px) {
  /* 移动端样式 */
}
```

2. **流式布局**：使用百分比、vw/vh
3. **Flexbox/Grid**：弹性布局
4. **响应式图片**：srcset、picture
5. **viewport 设置**：
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
6. **相对单位**：rem、em、vw、vh
7. **移动优先**：从小屏幕开始设计

### 11. 如何优化 CSS 性能？

**答案：**
1. **减少选择器复杂度**
2. **避免使用通配符**
3. **使用 CSS Containment**
4. **使用 will-change 提示浏览器**
5. **优先使用 transform 和 opacity**
6. **避免频繁触发重排**
7. **CSS 压缩和合并**
8. **关键 CSS 内联**
9. **使用 CDN**
10. **移除未使用的 CSS**

### 12. display: none 和 visibility: hidden 的区别？

**答案：**

| 特性     | display: none  | visibility: hidden        |
| -------- | -------------- | ------------------------- |
| 空间占用 | 不占据空间     | 占据空间                  |
| 回流重绘 | 触发回流和重绘 | 只触发重绘                |
| 子元素   | 子元素也不显示 | 子元素可设置 visible 显示 |
| 过渡动画 | 不支持         | 支持                      |
| 事件     | 不响应事件     | 不响应事件                |

### 13. 伪类和伪元素的区别？

**答案：**
**伪类（:）：**
- 用于选择元素的特定状态
- 单冒号
- 例如：:hover、:active、:focus、:first-child

**伪元素（::）：**
- 用于创建不存在于 DOM 的元素
- 双冒号（CSS3）
- 例如：::before、::after、::first-line、::first-letter

### 14. 如何实现三角形？

**答案：**
```css
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #007bff;
}

/* 不同方向的三角形 */
/* 向上 */
.triangle-up {
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #007bff;
}

/* 向下 */
.triangle-down {
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid #007bff;
}

/* 向左 */
.triangle-left {
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-right: 100px solid #007bff;
}

/* 向右 */
.triangle-right {
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-left: 100px solid #007bff;
}
```

### 15. 如何实现 1px 边框？

**答案：**
在高分辨率屏幕上，1px 可能显示为 2px 或更粗。

**解决方案：**
```css
/* 方法一：伪元素 + transform */
.border::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #000;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}

/* 方法二：box-shadow */
.border {
  box-shadow: 0 1px 1px -1px #000;
}

/* 方法三：viewport + rem */
@media (-webkit-min-device-pixel-ratio: 2) {
  html {
    font-size: 50px; /* 0.5 * 100 */
  }
}

/* 方法四：border-image */
.border {
  border-bottom: 1px solid transparent;
  border-image: url(data:image/png;base64,...) 0 0 2 0 stretch;
}
```

## 最佳实践

### 1. 命名规范

**BEM（Block Element Modifier）：**
```css
/* Block */
.button { }

/* Element */
.button__icon { }
.button__text { }

/* Modifier */
.button--primary { }
.button--large { }
.button--disabled { }

/* 组合 */
.button--primary .button__icon { }
```

**语义化命名：**
```css
/* ✅ 好 */
.header
.nav
.sidebar
.main-content
.footer

/* ❌ 不好 */
.box1
.red-text
.left-div
```

### 2. 代码组织

```css
/* 1. 变量定义 */
:root {
  --primary-color: #007bff;
  --spacing: 10px;
}

/* 2. Reset/Normalize */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 3. 全局样式 */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

/* 4. 布局 */
.container { }
.row { }
.col { }

/* 5. 组件 */
.button { }
.card { }
.modal { }

/* 6. 工具类 */
.text-center { }
.mt-10 { }
.d-flex { }

/* 7. 响应式 */
@media (max-width: 768px) { }
```

### 3. 性能最佳实践

```css
/* ✅ 使用简单选择器 */
.button { }

/* ❌ 避免过度嵌套 */
.header .nav ul li a span { }

/* ✅ 使用 transform 和 opacity */
.element {
  transform: translateX(100px);
  opacity: 0.5;
}

/* ❌ 避免频繁修改布局属性 */
.element {
  width: 100px; /* 触发重排 */
}

/* ✅ 使用 CSS Containment */
.card {
  contain: layout style paint;
}

/* ✅ 使用 will-change */
.element:hover {
  will-change: transform;
  transform: scale(1.1);
}
```

### 4. 可维护性

```css
/* ✅ 使用变量 */
:root {
  --primary-color: #007bff;
}

.button {
  background: var(--primary-color);
}

/* ✅ 使用注释 */
/* ==================
   Button Component
   ================== */

/* ✅ 模块化 */
@import 'variables';
@import 'mixins';
@import 'components/button';

/* ✅ 避免魔法数字 */
/* ❌ */
.element {
  top: 23px;
  left: 47px;
}

/* ✅ */
:root {
  --header-height: 60px;
  --sidebar-width: 200px;
}

.element {
  top: var(--header-height);
  left: var(--sidebar-width);
}
```

## 总结

CSS 是前端开发的核心技能之一，掌握 CSS 需要：

1. **基础知识**：选择器、盒模型、定位、浮动
2. **布局技术**：Flex、Grid、响应式设计
3. **CSS3 特性**：动画、过渡、变换、滤镜
4. **性能优化**：减少重排、使用硬件加速
5. **最佳实践**：命名规范、代码组织、可维护性

持续学习，在实践中提升 CSS 能力！
