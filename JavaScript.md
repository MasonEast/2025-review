# JavaScript

## 1. 基础知识

### 1.1. 基本语法

#### 1.1.1. 严格模式

```javascript
"use strict";
```

#### 1.1.2. 变量

- var
- let
- const

#### 1.1.3. 数据类型

- 基本类型：number、string、boolean、undefined、null、symbol、bigint
- 引用类型：object

#### 1.1.4. 类型转换

- 转换为字符串：toString()、String()、加号（+）
- 转换为数字：parseInt()、parseFloat()、Number()、一元运算符（-）、一元运算符（+）
- 转换为布尔值：Boolean()、双感叹号（!!）

#### 1.1.5. 运算符

- 算术运算符：+、-、\*、/、%、++、--
- 比较运算符：==、===、!=、!==、>、<、>=、<=
- 逻辑运算符：&&、||、!
- 位运算符：&、|、^、~、<<、>>、>>>
- 赋值运算符：=、+=、-=、\*=、/=、%=、<<=、>>=、>>>=、&=、|=、^=

#### 1.1.6. 流程控制

- if
- switch
- for
- while
- do...while
- break
- continue

#### 1.1.7. 函数

- 函数声明：function fn() {}
- 函数表达式：var fn = function() {}
- 箭头函数：var fn = () => {}
- 函数参数：arguments
- 函数返回值：return

#### 1.1.8. 对象

- 创建对象：var obj = {}
- 对象属性：obj.name
- 对象方法：obj.fn = function() {}
- 对象遍历：for...in

#### 1.1.9. 数组

- 创建数组：var arr = []
- 数组元素：arr[0]
- 数组方法：push()、pop()、shift()、unshift()、splice()、slice()、concat()、join()、reverse()、sort()、forEach()、map()、filter()、reduce()、indexOf()、lastIndexOf()

#### 1.1.10. 字符串

- 创建字符串：var str = ""
- 字符串方法：charAt()、charCodeAt()、concat()、indexOf()、lastIndexOf()、slice()、substring()、substr()、split()、replace()、toUpperCase()、toLowerCase()、trim()、trimLeft()、trimRight()

#### 1.1.11. 正则表达式

- 创建正则表达式：var reg = /pattern/flags
- 正则表达式方法：test()、exec()、match()、search()、replace()

#### JS 脚本延迟加载的方式有哪些

1. 使用 `<script>` 标签的 defer 属性: 脚本在文档解析完成后，但在 DOMContentLoaded 事件触发之前执行。defer 属性仅适用于外部脚本
2. 使用 `<script>` 标签的 async 属性: 脚本在加载时不会阻塞 HTML 文档的解析，但它与 defer 的区别在于，脚本一旦下载完成就会立即执行，而不是等到整个页面都解析完毕。这意味着 async 脚本的执行顺序是不确定的。
3. 动态创建 `<script>` 标签
4. 使用服务端的延迟加载技术
