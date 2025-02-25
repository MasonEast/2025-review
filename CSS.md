# CSS

## 盒模型

盒模型分为标准盒模型和 IE 盒模型。

两者的区别是：标准盒模型的宽高不包括 padding 和 border，而 IE 盒模型的宽高包括 padding 和 border。

可以通过修改元素的 box-sizing 属性来改变元素的盒模型：

box-sizeing: content-box 表示标准盒模型

box-sizeing: border-box 表示 IE 盒模型

## BFC

BFC（Block Formatting Context）块级格式化上下文，是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

BFC 的特性：

1. BFC 内部的元素会在垂直方向上依次排列，且相邻的两个元素之间的外边距会发生重叠。
2. BFC 内部的元素不会与外部的元素发生重叠。可以通过给元素添加 overflow: hidden 属性来创建一个新的 BFC，从而避免元素重叠。
3. BFC 内部的元素可以包含浮动元素。可以通过给元素添加 overflow: hidden 属性来创建一个新的 BFC，从而包含浮动元素。
4. BFC 内部的元素可以阻止外边距折叠。可以通过给元素添加 overflow: hidden 属性来创建一个新的 BFC，从而阻止外边距折叠。

创建 BFC 的方法：

1. 根元素
2. 浮动元素（float 属性不为 none）
3. 绝对定位元素（position 属性为 absolute 或 fixed）

## CSS 选择器

CSS 选择器用于选择要应用样式的 HTML 元素。以下是一些常用的 CSS 选择器：

1. 元素选择器：根据元素名称选择元素，例如：`p`、`div`、`h1` 等。
2. 类选择器：根据元素的 class 属性选择元素，例如：`.my-class`。
3. ID 选择器：根据元素的 id 属性选择元素，例如：`#my-id`。
4. 属性选择器：根据元素的属性和属性值选择元素，例如：`[type="text"]`。

## CSS 属性

CSS 属性用于定义元素的样式。以下是一些常用的 CSS 属性：

1. color：设置文本颜色。
2. font-size：设置字体大小。
3. background-color：设置背景颜色。
4. width：设置元素的宽度。
5. height：设置元素的高度。
6. margin：设置元素的外边距。
7. padding：设置元素的内边距。
8. border：设置元素的边框。
9. display：设置元素的显示方式，例如：block、inline、flex 等。

## CSS 伪类

CSS 伪类用于选择元素的特定状态。以下是一些常用的 CSS 伪类：

1. :hover：选择鼠标悬停在其上的元素。
2. :active：选择被激活的元素（例如，被点击的元素）。
3. :focus：选择获得焦点的元素（例如，被点击的输入框）。
4. :first-child：选择其父元素的第一个子元素。
5. :last-child：选择其父元素的最后一个子元素。
6. :nth-child(n)：选择其父元素的第 n 个子元素。

## CSS 伪元素

CSS 伪元素用于选择元素的特定部分。以下是一些常用的 CSS 伪元素：

1. ::before：在元素内容之前插入内容。
2. ::after：在元素内容之后插入内容。
3. ::first-line：选择元素的第一行文本。
4. ::first-letter：选择元素的第一个字母。

## CSS 媒体查询

CSS 媒体查询用于根据不同的设备特性（例如，屏幕宽度、分辨率等）应用不同的样式。以下是一个示例：

```css
@media screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

上述代码表示当屏幕宽度小于或等于 600 像素时，将背景颜色设置为浅蓝色。

## CSS Flexbox

CSS Flexbox 是一种布局模型，用于创建灵活的布局。以下是一些常用的 Flexbox 属性：

1. display：设置元素的显示方式为 flex。
2. flex-direction：设置主轴的方向。
3. justify-content：设置主轴上的对齐方式。
4. align-items：设置交叉轴上的对齐方式。
5. flex-wrap：设置是否换行。

## CSS Grid

CSS Grid 是一种布局模型，用于创建复杂的网格布局。以下是一些常用的 CSS Grid 属性：

1. display：设置元素的显示方式为 grid。
2. grid-template-columns：设置网格的列数和宽度。
3. grid-template-rows：设置网格的行数和高度。
4. grid-column-gap：设置网格列之间的间距。
5. grid-row-gap：设置网格行之间的间距。

## CSS 响应式设计

CSS 响应式设计是一种设计方法，用于创建适应不同设备和屏幕尺寸的网页。以下是一些常用的 CSS 响应式设计技术：

1. 媒体查询：根据不同的设备特性应用不同的样式。
2. Flexbox：创建灵活的布局。
3. Grid：创建复杂的网格布局。

## CSS 预处理器

CSS 预处理器是一种工具，用于编写更高效的 CSS 代码。以下是一些常用的 CSS 预处理器：

1. Sass：一种强大的 CSS 预处理器，支持变量、嵌套、混合等高级功能。
2. Less：一种简洁的 CSS 预处理器，支持变量、嵌套、混合等高级功能。
3. Stylus：一种灵活的 CSS 预处理器，支持变量、嵌套、混合等高级功能。

## CSS 动画

CSS 动画是一种用于创建动态效果的 CSS 技术。以下是一些常用的 CSS 动画属性：

1. animation-name：指定动画的名称。
2. animation-duration：指定动画的持续时间。
3. animation-timing-function：指定动画的时间函数。
4. animation-delay：指定动画的延迟时间。
5. animation-iteration-count：指定动画的重复次数。
6. animation-direction：指定动画的方向。
7. animation-fill-mode：指定动画的填充模式。

## CSS 过渡

CSS 过渡是一种用于创建平滑过渡效果的 CSS 技术。以下是一些常用的 CSS 过渡属性：

1. transition-property：指定要过渡的属性。
2. transition-duration：指定过渡的持续时间。
3. transition-timing-function：指定过渡的时间函数。
4. transition-delay：指定过渡的延迟时间。

## CSS 变量

CSS 变量是一种用于存储和复用 CSS 值的技术。以下是一些常用的 CSS 变量属性：

1. --variable-name：定义一个 CSS 变量。
2. var(--variable-name)：使用一个 CSS 变量。
3. :root：定义全局 CSS 变量。
4. calc()：计算 CSS 值。

## CSS 布局

CSS 布局是一种用于创建网页布局的技术。以下是一些常用的 CSS 布局技术：

1. Flexbox：创建灵活的布局。
2. Grid：创建复杂的网格布局。
3. Float：创建浮动布局。
4. Position：创建定位布局。
