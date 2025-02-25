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

#### 1.1.12. 日期

- 创建日期：var date = new Date()
- 日期方法：getFullYear()、getMonth()、getDate()、getDay()、getHours()、getMinutes()、getSeconds()、getTime()、setFullYear()、setMonth()、setDate()、setHours()、setMinutes()、setSeconds()、setTime()、parse()、UTC()
- 日期格式化：toLocaleString()、toLocaleDateString()、toLocaleTimeString()、toString()、toDateString()、toTimeString()、toUTCString()、toISOString()、toJSON()

#### 1.1.13. Math

- Math 对象方法：abs()、ceil()、floor()、round()、max()、min()、pow()、sqrt()、random()、PI、E

#### 1.1.14. JSON

- JSON 对象方法：parse()、stringify()

#### 1.1.15. DOM

- 获取元素：document.getElementById()、document.getElementsByClassName()、document.getElementsByTagName()、document.querySelector()、document.querySelectorAll()
- 操作元素：element.innerHTML、element.style、element.className、element.setAttribute()、element.getAttribute()、element.removeAttribute()、element.appendChild()、element.insertBefore()、element.removeChild()、element.replaceChild()、element.cloneNode()
- 事件：element.addEventListener()、element.removeEventListener()、element.dispatchEvent()
- BOM：window 对象、navigator 对象、screen 对象、location 对象、history 对象、document 对象

#### 1.1.16. ES6

- let、const、箭头函数、模板字符串、解构赋值、展开运算符、Promise、async/await、class、模块化

#### 1.1.17. ES7

- Array.prototype.includes()、指数运算符

#### 1.1.18. ES8

- Object.values()、Object.entries()、Object.getOwnPropertyDescriptors()、String.prototype.padStart()、String.prototype.padEnd()、async/await、函数参数列表结尾允许逗号

#### 1.1.19. ES9

- 对象的扩展运算符、正则扩展、Promise.finally()

#### 1.1.20. ES10

- flat()、flatMap()、trimStart()、trimEnd()、Object.fromEntries()、Symbol.prototype.description

#### 1.1.21. ES11

- BigInt、Promise.allSettled()、String.prototype.replaceAll()、可选链操作符、空值合并运算符、globalThis、动态 import()、Promise.any()、WeakRef、FinalizationRegistry

#### 1.1.22. ES12

- replaceAll()、Promise.any()、WeakRef、FinalizationRegistry、逻辑赋值运算符、数字分隔符

#### 1.1.23. ES13

- String.prototype.replaceAll()、Promise.any()、WeakRef、FinalizationRegistry、逻辑赋值运算符、数字分隔符

#### 1.1.24. ES14

- String.prototype.replaceAll()、Promise.any()、WeakRef、FinalizationRegistry、逻辑赋值运算符、数字分隔符

## 1.2. 前端框架

#### 1.2.1. React

- JSX 语法、组件、生命周期、setState()、虚拟 DOM、diff 算法、Hooks、Context、Redux、React Router

#### 1.2.2. Vue

- 模板语法、指令、计算属性、侦听器、组件、生命周期、Vuex、Vue Router

#### 1.2.3. Angular

- 模板语法、指令、组件、生命周期、依赖注入、RxJS、Angular Router

## 1.3. 前端工程化

#### 1.3.1. Webpack

- 基本配置、loader、plugin、热更新、代码分割、Tree Shaking、打包优化

#### 1.3.2. Babel

- 基本使用、插件、预设、polyfill、配置

#### 1.3.3. ESLint

- 基本使用、规则配置、插件、自定义规则

#### 1.3.4. Git

- 基本操作、分支管理、冲突解决、版本回退、远程仓库、多人协作

#### 1.3.5. NPM

- 基本使用、包管理、依赖管理、发布包

#### 1.3.6. Yarn

- 基本使用、包管理、依赖管理、发布包

#### 1.3.7. LintStaged

- 基本使用、配置、集成

#### 1.3.8. Husky

- 基本使用、配置、集成

#### 1.3.9. Commitlint

- 基本使用、配置、集成

#### 1.3.10. Prettier

- 基本使用、配置、集成

#### 1.3.11. Stylelint

- 基本使用、配置、集成

#### 1.3.12. Eslint-config-prettier

- 基本使用、配置、集成

#### 1.3.13. Eslint-plugin-prettier

- 基本使用、配置、集成

#### 1.3.14. Eslint-config-airbnb

- 基本使用、配置、集成

#### 1.3.15. Eslint-plugin-import

- 基本使用、配置、集成

#### 1.3.16. Eslint-plugin-react

- 基本使用、配置、集成

#### 1.3.17. Eslint-plugin-vue

- 基本使用、配置、集成

#### 1.3.18. Eslint-plugin-angular

- 基本使用、配置、集成

#### 1.3.19. Eslint-plugin-node

- 基本使用、配置、集成

#### 1.3.20. Eslint-plugin-promise

- 基本使用、配置、集成

#### 1.3.21. Eslint-plugin-standard

- 基本使用、配置、集成

#### 1.3.22. Eslint-plugin-html

- 基本使用、配置、集成

#### 1.3.23. Eslint-plugin-json

## 1.4. Vue

#### 1.4.1. Vue CLI

- 基本使用、配置、插件、命令行工具

#### 1.4.2. Vue Router

- 基本使用、配置、路由守卫、路由懒加载

#### 1.4.3. Vuex

- 基本使用、配置、模块化、持久化

#### 1.4.4. Vue Composition API

- 基本使用、配置、模块化、持久化

#### 1.4.5. Vue 3

- 基本使用、配置、模块化、持久化

#### 1.4.6. Vue 3 Composition API

- 基本使用、配置、模块化、持久化

#### 1.4.7. Vue 3 Teleport

- 基本使用、配置、模块化、持久化

#### 1.4.8. Vue 3 Fragments

- 基本使用、配置、模块化、持久化

#### 1.4.9. Vue 3 Suspense

- 基本使用、配置、模块化、持久化

#### 1.4.10. Vue 3 SSR

- 基本使用、配置、模块化、持久化

#### 1.4.11. Vue 3 SSR with Nuxt.js

- 基本使用、配置、模块化、持久化

#### 1.4.12. Vue 3 SSR with Next.js

## 1.5. React

#### 1.5.1. React

- 基本使用、配置、模块化、持久化

#### 1.5.2. React Router

- 基本使用、配置、路由守卫、路由懒加载

#### 1.5.3. Redux

- 基本使用、配置、模块化、持久化

#### 1.5.4. React Hooks

- 基本使用、配置、模块化、持久化

#### 1.5.5. React 18

- 基本使用、配置、模块化、持久化

#### 1.5.6. React 18 Concurrent Mode

- 基本使用、配置、模块化、持久化

#### 1.5.7. React 18 Suspense

- 基本使用、配置、模块化、持久化

#### 1.5.8. React 18 Server Components

- 基本使用、配置、模块化、持久化

#### 1.5.9. React 18 Server Components with Next.js

- 基本使用、配置、模块化、持久化

#### 1.5.10. React 18 Server Components with Nuxt.js

- 基本使用、配置、模块化、持久化
