# JavaScript 深入学习文档

## 目录
1. [ES6+ 核心特性](#es6-核心特性)
2. [原型链与继承](#原型链与继承)
3. [闭包与作用域](#闭包与作用域)
4. [异步编程](#异步编程)
5. [手写实现](#手写实现)
6. [进阶技巧](#进阶技巧)

---

## ES6+ 核心特性

### 1. let 和 const
```javascript
// var 存在变量提升和函数作用域问题
console.log(a); // undefined
var a = 1;

// let 和 const 是块级作用域，不存在变量提升
console.log(b); // ReferenceError
let b = 2;

// const 声明的常量不能重新赋值
const PI = 3.14;
PI = 3.15; // TypeError

// 但可以修改对象的属性
const obj = { name: 'Tom' };
obj.name = 'Jerry'; // 可以
obj = {}; // TypeError
```

**学习要点：**
- var、let、const 的区别
- 暂时性死区（TDZ）
- 块级作用域的应用场景

---

### 2. 解构赋值

**数组解构**
```javascript
// 基础用法
const [a, b, c] = [1, 2, 3];

// 跳过某些值
const [first, , third] = [1, 2, 3];

// 默认值
const [x = 1, y = 2] = [10];
console.log(x, y); // 10, 2

// 剩余参数
const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]

// 交换变量
let a = 1, b = 2;
[a, b] = [b, a];
```

**对象解构**
```javascript
// 基础用法
const { name, age } = { name: 'Tom', age: 18 };

// 重命名
const { name: userName, age: userAge } = { name: 'Tom', age: 18 };

// 默认值
const { x = 10, y = 20 } = { x: 30 };
console.log(x, y); // 30, 20

// 嵌套解构
const user = {
  name: 'Tom',
  address: {
    city: 'Beijing',
    district: 'Chaoyang'
  }
};
const { address: { city } } = user;

// 函数参数解构
function getUserInfo({ name, age = 18 }) {
  console.log(name, age);
}
getUserInfo({ name: 'Tom' });
```

---

### 3. 箭头函数

```javascript
// 基础语法
const add = (a, b) => a + b;
const square = x => x * x; // 单参数可省略括号
const greet = () => 'Hello'; // 无参数

// 返回对象需要加括号
const getUser = id => ({ id, name: 'Tom' });

// this 指向特性
const obj = {
  name: 'Tom',
  sayHi: function() {
    setTimeout(() => {
      console.log(this.name); // 'Tom'，箭头函数继承外层 this
    }, 1000);
  },
  sayHello: function() {
    setTimeout(function() {
      console.log(this.name); // undefined，普通函数 this 指向 window
    }, 1000);
  }
};
```

**箭头函数特点：**
- 没有自己的 `this`，继承外层作用域的 `this`
- 不能作为构造函数
- 没有 `arguments` 对象
- 不能使用 `yield` 命令

---

### 4. 模板字符串

```javascript
// 基础用法
const name = 'Tom';
const age = 18;
const message = `My name is ${name}, I'm ${age} years old.`;

// 多行字符串
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// 表达式计算
const price = 100;
const count = 3;
console.log(`Total: ${price * count}`);

// 标签模板
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
  }, '');
}

const result = highlight`Name: ${name}, Age: ${age}`;
console.log(result); // Name: <strong>Tom</strong>, Age: <strong>18</strong>
```

---

### 5. 扩展运算符与剩余参数

```javascript
// 数组扩展运算符
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// 数组复制
const original = [1, 2, 3];
const copy = [...original];

// 数组去重
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// 对象扩展运算符
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// 对象浅拷贝
const user = { name: 'Tom', age: 18 };
const userCopy = { ...user };

// 剩余参数
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// 结合解构
const [first, ...rest] = [1, 2, 3, 4];
const { name, ...others } = { name: 'Tom', age: 18, city: 'Beijing' };
```

---

### 6. 默认参数

```javascript
// 基础用法
function greet(name = 'Guest') {
  return `Hello, ${name}`;
}

// 默认参数可以是表达式
function calculate(a, b = a * 2) {
  return a + b;
}

// 默认参数与解构结合
function createUser({ name = 'Anonymous', age = 0 } = {}) {
  return { name, age };
}

// 函数默认值是惰性求值的
let x = 1;
function foo(y = x) {
  console.log(y);
}
foo(); // 1
x = 2;
foo(); // 2
```

---

### 7. Promise

```javascript
// 基础用法
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Success!');
    } else {
      reject('Error!');
    }
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));

// Promise 链式调用
fetch('/api/user')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return fetch(`/api/posts/${data.id}`);
  })
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));

// Promise.all - 并发执行，全部成功才成功
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(results => console.log(results)); // [1, 2, 3]

// Promise.race - 返回最快的结果
Promise.race([p1, p2, p3])
  .then(result => console.log(result)); // 最快返回的那个

// Promise.allSettled - 等待全部完成，不管成功失败
Promise.allSettled([p1, p2, p3])
  .then(results => console.log(results));

// Promise.any - 只要有一个成功就成功
Promise.any([p1, p2, p3])
  .then(result => console.log(result));
```

---

### 8. async/await

```javascript
// 基础用法
async function fetchUser() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// 并发请求
async function fetchAll() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);
    return { users, posts, comments };
  } catch (error) {
    console.error(error);
  }
}

// 顺序执行
async function processInSequence(urls) {
  const results = [];
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    results.push(data);
  }
  return results;
}

// 错误处理
async function getUserData(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchUserPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    throw error; // 可以继续向上抛出
  }
}
```

---

### 9. Class 类

```javascript
// 基础类
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }

  // 静态方法
  static create(name, age) {
    return new Person(name, age);
  }

  // getter
  get info() {
    return `${this.name}, ${this.age}`;
  }

  // setter
  set info(value) {
    const [name, age] = value.split(',');
    this.name = name;
    this.age = parseInt(age);
  }
}

// 继承
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // 调用父类构造函数
    this.grade = grade;
  }

  sayHi() {
    super.sayHi(); // 调用父类方法
    console.log(`I'm in grade ${this.grade}`);
  }

  study() {
    console.log(`${this.name} is studying`);
  }
}

// 使用
const student = new Student('Tom', 18, 12);
student.sayHi();
student.study();

// 私有属性（ES2022）
class BankAccount {
  #balance = 0; // 私有属性

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

---

### 10. 模块化

```javascript
// 导出 - module.js
export const PI = 3.14;
export function add(a, b) {
  return a + b;
}
export class Calculator {
  // ...
}

// 默认导出
export default function multiply(a, b) {
  return a * b;
}

// 导入
import multiply, { PI, add, Calculator } from './module.js';

// 全部导入
import * as math from './module.js';

// 重命名导入
import { add as sum } from './module.js';

// 仅执行模块
import './init.js';

// 动态导入
async function loadModule() {
  const module = await import('./module.js');
  module.default();
}
```

---

## 原型链与继承

### 1. 原型基础

```javascript
// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 在原型上添加方法
Person.prototype.sayHi = function() {
  console.log(`Hi, I'm ${this.name}`);
};

const person = new Person('Tom', 18);
person.sayHi(); // Hi, I'm Tom

// 原型链关系
console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.constructor === Person); // true
console.log(person.__proto__.__proto__ === Object.prototype); // true

// 检查原型
console.log(person instanceof Person); // true
console.log(Person.prototype.isPrototypeOf(person)); // true
```

**原型链图解：**
```
person 
  ↓ __proto__
Person.prototype 
  ↓ __proto__
Object.prototype 
  ↓ __proto__
null
```

---

### 2. 继承的多种方式

**1) 原型链继承**
```javascript
function Parent() {
  this.name = 'parent';
  this.colors = ['red', 'blue'];
}

Parent.prototype.getName = function() {
  return this.name;
};

function Child() {
  this.age = 18;
}

Child.prototype = new Parent();

const child1 = new Child();
const child2 = new Child();

// 缺点：所有实例共享引用类型属性
child1.colors.push('green');
console.log(child2.colors); // ['red', 'blue', 'green']
```

**2) 构造函数继承**
```javascript
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Parent.prototype.getName = function() {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name); // 调用父类构造函数
  this.age = age;
}

const child1 = new Child('Tom', 18);
const child2 = new Child('Jerry', 20);

child1.colors.push('green');
console.log(child2.colors); // ['red', 'blue']

// 缺点：无法继承父类原型上的方法
console.log(child1.getName); // undefined
```

**3) 组合继承（推荐）**
```javascript
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Parent.prototype.getName = function() {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name); // 第二次调用 Parent
  this.age = age;
}

Child.prototype = new Parent(); // 第一次调用 Parent
Child.prototype.constructor = Child;

const child1 = new Child('Tom', 18);
const child2 = new Child('Jerry', 20);

child1.colors.push('green');
console.log(child2.colors); // ['red', 'blue']
console.log(child1.getName()); // 'Tom'

// 缺点：调用了两次父类构造函数
```

**4) 寄生组合继承（最佳）**
```javascript
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Parent.prototype.getName = function() {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

// 关键：使用 Object.create
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child = new Child('Tom', 18);
console.log(child.getName()); // 'Tom'

// 封装继承函数
function inherit(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}
```

---

### 3. Object.create 深入

```javascript
// Object.create 创建一个新对象，使用现有对象作为原型
const parent = {
  name: 'parent',
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

const child = Object.create(parent);
child.name = 'child';
child.sayHi(); // Hi, I'm child

// Object.create 的实现
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

// 创建一个没有原型的对象
const obj = Object.create(null);
console.log(obj.__proto__); // undefined
```

---

## 闭包与作用域

### 1. 作用域链

```javascript
// 全局作用域
const globalVar = 'global';

function outer() {
  // 外层函数作用域
  const outerVar = 'outer';
  
  function inner() {
    // 内层函数作用域
    const innerVar = 'inner';
    console.log(globalVar); // 'global'
    console.log(outerVar);  // 'outer'
    console.log(innerVar);  // 'inner'
  }
  
  inner();
  // console.log(innerVar); // ReferenceError
}

outer();
```

---

### 2. 闭包原理

```javascript
// 基础闭包
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 闭包应用：私有变量
function createPerson(name) {
  let _age = 0; // 私有变量
  
  return {
    getName() {
      return name;
    },
    getAge() {
      return _age;
    },
    setAge(age) {
      if (age > 0 && age < 150) {
        _age = age;
      }
    }
  };
}

const person = createPerson('Tom');
person.setAge(18);
console.log(person.getAge()); // 18
console.log(person._age); // undefined

// 闭包应用：模块化
const calculator = (function() {
  let result = 0;
  
  return {
    add(num) {
      result += num;
      return this;
    },
    subtract(num) {
      result -= num;
      return this;
    },
    multiply(num) {
      result *= num;
      return this;
    },
    getResult() {
      return result;
    }
  };
})();

calculator.add(10).multiply(2).subtract(5).getResult(); // 15
```

---

### 3. 闭包常见问题

**问题1：循环中的闭包**
```javascript
// 错误示例
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 输出 5 个 5
  }, 1000);
}

// 解决方案1：使用 IIFE
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0, 1, 2, 3, 4
    }, 1000);
  })(i);
}

// 解决方案2：使用 let
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2, 3, 4
  }, 1000);
}

// 解决方案3：使用 bind
for (var i = 0; i < 5; i++) {
  setTimeout(function(j) {
    console.log(j);
  }.bind(null, i), 1000);
}
```

**问题2：内存泄漏**
```javascript
// 可能造成内存泄漏
function outer() {
  const largeData = new Array(1000000).fill('data');
  
  return function inner() {
    console.log('Hello');
    // inner 引用了 outer 的作用域
    // 即使不使用 largeData，它也不会被回收
  };
}

// 改进：只保留需要的数据
function outer() {
  const largeData = new Array(1000000).fill('data');
  const needed = largeData.slice(0, 10);
  
  return function inner() {
    console.log(needed); // 只保留需要的部分
  };
}
```

---

### 4. this 指向详解

```javascript
// 1. 默认绑定
function foo() {
  console.log(this); // 严格模式: undefined, 非严格模式: window
}

// 2. 隐式绑定
const obj = {
  name: 'Tom',
  sayName() {
    console.log(this.name);
  }
};
obj.sayName(); // 'Tom'

const sayName = obj.sayName;
sayName(); // undefined，this 丢失

// 3. 显式绑定
function greet() {
  console.log(`Hello, ${this.name}`);
}

const user = { name: 'Tom' };
greet.call(user); // Hello, Tom
greet.apply(user); // Hello, Tom
const boundGreet = greet.bind(user);
boundGreet(); // Hello, Tom

// 4. new 绑定
function Person(name) {
  this.name = name;
}
const person = new Person('Tom');
console.log(person.name); // 'Tom'

// 5. 箭头函数
const obj2 = {
  name: 'Tom',
  sayName: () => {
    console.log(this.name); // 继承外层 this
  }
};

// 优先级：new > 显式绑定 > 隐式绑定 > 默认绑定
```

---

## 异步编程

### 1. 事件循环（Event Loop）

```javascript
console.log('1'); // 同步任务

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 微任务
});

console.log('4'); // 同步任务

// 输出顺序：1, 4, 3, 2

// 复杂示例
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise(resolve => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');

/* 输出顺序：
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

**宏任务 vs 微任务**
- **宏任务**：setTimeout, setInterval, setImmediate, I/O, UI渲染
- **微任务**：Promise.then, MutationObserver, process.nextTick

**执行顺序**：
1. 执行同步代码
2. 执行所有微任务
3. 执行一个宏任务
4. 执行所有微任务
5. 重复 3-4

---

### 2. Promise 进阶

**实现 Promise.all**
```javascript
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }
    
    const results = [];
    let completedCount = 0;
    
    if (promises.length === 0) {
      resolve(results);
      return;
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = value;
          completedCount++;
          
          if (completedCount === promises.length) {
            resolve(results);
          }
        },
        reason => {
          reject(reason);
        }
      );
    });
  });
};
```

**实现 Promise.race**
```javascript
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }
    
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
};
```

**Promise 链式调用**
```javascript
// 串行执行多个异步任务
function runInSequence(tasks) {
  return tasks.reduce((promise, task) => {
    return promise.then(result => {
      return task().then(Array.prototype.concat.bind(result));
    });
  }, Promise.resolve([]));
}

// 使用示例
const tasks = [
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.resolve(3)
];

runInSequence(tasks).then(results => {
  console.log(results); // [1, 2, 3]
});
```

---

### 3. async/await 进阶

**并发控制**
```javascript
// 控制并发数量
async function asyncPool(poolLimit, array, iteratorFn) {
  const results = [];
  const executing = [];
  
  for (const [index, item] of array.entries()) {
    const promise = Promise.resolve().then(() => iteratorFn(item, array));
    results.push(promise);
    
    if (poolLimit <= array.length) {
      const e = promise.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  
  return Promise.all(results);
}

// 使用示例
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => {
  console.log(results);
});
```

**错误重试**
```javascript
async function retry(fn, times = 3, delay = 1000) {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === times - 1) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 使用示例
retry(() => fetch('/api/data'), 3, 2000)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('重试失败:', error));
```

**超时控制**
```javascript
function timeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), ms);
    })
  ]);
}

// 使用示例
timeout(fetch('/api/data'), 5000)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

---

## 手写实现

### 1. 防抖（Debounce）

```javascript
/**
 * 防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 * 应用场景：搜索框输入、窗口 resize
 */
function debounce(func, wait, immediate = false) {
  let timeout;
  
  return function(...args) {
    const context = this;
    
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
}

// 使用示例
const input = document.querySelector('input');
input.addEventListener('input', debounce(function(e) {
  console.log('搜索:', e.target.value);
}, 500));
```

---

### 2. 节流（Throttle）

```javascript
/**
 * 节流：规定时间内只触发一次
 * 应用场景：滚动事件、按钮点击
 */
function throttle(func, wait) {
  let timeout;
  let previous = 0;
  
  return function(...args) {
    const context = this;
    const now = Date.now();
    const remaining = wait - (now - previous);
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}

// 使用示例
window.addEventListener('scroll', throttle(function() {
  console.log('滚动位置:', window.scrollY);
}, 1000));
```

---

### 3. 深拷贝

```javascript
/**
 * 深拷贝：完整复制对象，包括嵌套对象
 */
function deepClone(obj, hash = new WeakMap()) {
  // null 或非对象类型直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // 处理 Date
  if (obj instanceof Date) {
    return new Date(obj);
  }
  
  // 处理 RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  // 创建新对象或数组
  const cloneObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, cloneObj);
  
  // 递归拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  
  return cloneObj;
}

// 使用示例
const original = {
  name: 'Tom',
  hobbies: ['reading', 'coding'],
  address: {
    city: 'Beijing',
    district: 'Chaoyang'
  }
};

const copy = deepClone(original);
copy.address.city = 'Shanghai';
console.log(original.address.city); // 'Beijing'
```

---

### 4. 实现 call、apply、bind

**call 实现**
```javascript
Function.prototype.myCall = function(context, ...args) {
  // context 为 null 或 undefined 时，指向 window
  context = context || window;
  
  // 创建唯一的 key 避免覆盖原有属性
  const fn = Symbol('fn');
  context[fn] = this;
  
  // 执行函数
  const result = context[fn](...args);
  
  // 删除添加的属性
  delete context[fn];
  
  return result;
};

// 测试
function greet(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const user = { name: 'Tom' };
greet.myCall(user, 'Hello', '!'); // Hello, I'm Tom!
```

**apply 实现**
```javascript
Function.prototype.myApply = function(context, args = []) {
  context = context || window;
  
  const fn = Symbol('fn');
  context[fn] = this;
  
  const result = context[fn](...args);
  
  delete context[fn];
  
  return result;
};

// 测试
greet.myApply(user, ['Hi', '.']); // Hi, I'm Tom.
```

**bind 实现**
```javascript
Function.prototype.myBind = function(context, ...args1) {
  const fn = this;
  
  return function(...args2) {
    // 如果是通过 new 调用，this 指向实例
    if (this instanceof fn) {
      return new fn(...args1, ...args2);
    }
    
    return fn.apply(context, [...args1, ...args2]);
  };
};

// 测试
const boundGreet = greet.myBind(user, 'Hey');
boundGreet('~'); // Hey, I'm Tom~
```

---

### 5. 实现 new 操作符

```javascript
function myNew(Constructor, ...args) {
  // 创建一个新对象，原型指向构造函数的 prototype
  const obj = Object.create(Constructor.prototype);
  
  // 执行构造函数，绑定 this
  const result = Constructor.apply(obj, args);
  
  // 如果构造函数返回对象，则返回该对象，否则返回创建的对象
  return result instanceof Object ? result : obj;
}

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function() {
  console.log(`Hi, I'm ${this.name}`);
};

const person = myNew(Person, 'Tom', 18);
person.sayHi(); // Hi, I'm Tom
```

---

### 6. 实现 instanceof

```javascript
function myInstanceof(obj, constructor) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(obj);
  
  // 获取构造函数的 prototype
  const prototype = constructor.prototype;
  
  // 沿着原型链查找
  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  
  return false;
}

// 测试
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof([], Object)); // true
console.log(myInstanceof({}, Array)); // false
```

---

### 7. 柯里化（Curry）

```javascript
/**
 * 柯里化：将多参数函数转换为单参数函数序列
 */
function curry(fn) {
  return function curried(...args) {
    // 参数够了就执行
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    // 参数不够继续返回函数
    return function(...args2) {
      return curried.apply(this, [...args, ...args2]);
    };
  };
}

// 使用示例
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

---

### 8. 发布订阅模式

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  // 订阅事件
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  // 发布事件
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        callback(...args);
      });
    }
  }
  
  // 取消订阅
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
  
  // 只订阅一次
  once(event, callback) {
    const fn = (...args) => {
      callback(...args);
      this.off(event, fn);
    };
    this.on(event, fn);
  }
}

// 使用示例
const emitter = new EventEmitter();

function handleLogin(user) {
  console.log('用户登录:', user);
}

emitter.on('login', handleLogin);
emitter.emit('login', { name: 'Tom' }); // 用户登录: { name: 'Tom' }

emitter.off('login', handleLogin);
emitter.emit('login', { name: 'Jerry' }); // 无输出
```

---

### 9. 数组扁平化

```javascript
// 方法1：递归
function flatten1(arr) {
  const result = [];
  
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result.push(...flatten1(item));
    } else {
      result.push(item);
    }
  });
  
  return result;
}

// 方法2：reduce
function flatten2(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten2(item) : item);
  }, []);
}

// 方法3：使用栈
function flatten3(arr) {
  const stack = [...arr];
  const result = [];
  
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  
  return result;
}

// 方法4：指定深度
function flatten4(arr, depth = 1) {
  if (depth === 0) return arr;
  
  return arr.reduce((acc, item) => {
    return acc.concat(
      Array.isArray(item) ? flatten4(item, depth - 1) : item
    );
  }, []);
}

// 测试
const nested = [1, [2, [3, [4, 5]]]];
console.log(flatten1(nested)); // [1, 2, 3, 4, 5]
console.log(flatten4(nested, 2)); // [1, 2, 3, [4, 5]]

// 原生方法
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5]
```

---

### 10. Promise 实现

```javascript
class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    
    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };
    
    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }
      
      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }
      
      if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });
        
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    
    return promise2;
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    );
  }
  
  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }
  
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

// 测试
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Success'), 1000);
});

promise.then(value => {
  console.log(value); // Success
});
```

---

## 进阶技巧

### 1. 数组高级操作

```javascript
const users = [
  { id: 1, name: 'Tom', age: 18, city: 'Beijing' },
  { id: 2, name: 'Jerry', age: 20, city: 'Shanghai' },
  { id: 3, name: 'Mike', age: 18, city: 'Beijing' },
  { id: 4, name: 'Lucy', age: 22, city: 'Guangzhou' }
];

// 1. 分组
const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});
};

const groupedByAge = groupBy(users, 'age');
// { 18: [...], 20: [...], 22: [...] }

// 2. 去重
const unique = arr => [...new Set(arr)];

// 对象数组去重
const uniqueBy = (arr, key) => {
  const seen = new Set();
  return arr.filter(item => {
    const k = item[key];
    return seen.has(k) ? false : seen.add(k);
  });
};

// 3. 排序
users.sort((a, b) => a.age - b.age); // 按年龄升序
users.sort((a, b) => b.age - a.age); // 按年龄降序

// 多条件排序
users.sort((a, b) => {
  return a.age - b.age || a.name.localeCompare(b.name);
});

// 4. 查找
const user = users.find(u => u.id === 2);
const userIndex = users.findIndex(u => u.id === 2);

// 5. 筛选
const adults = users.filter(u => u.age >= 18);

// 6. 映射
const names = users.map(u => u.name);

// 7. 累加
const totalAge = users.reduce((sum, u) => sum + u.age, 0);

// 8. 链式操作
const result = users
  .filter(u => u.age >= 18)
  .map(u => ({ ...u, isAdult: true }))
  .sort((a, b) => a.age - b.age);
```

---

### 2. 对象高级操作

```javascript
// 1. 合并对象
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }

// 深度合并
function deepMerge(target, source) {
  for (let key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  return Object.assign(target || {}, source);
}

// 2. 对象转数组
const obj = { a: 1, b: 2, c: 3 };
const entries = Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]
const keys = Object.keys(obj); // ['a', 'b', 'c']
const values = Object.values(obj); // [1, 2, 3]

// 3. 数组转对象
const arr = [['a', 1], ['b', 2]];
const objFromArr = Object.fromEntries(arr); // { a: 1, b: 2 }

// 4. 对象属性筛选
function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

const user = { name: 'Tom', age: 18, email: 'tom@example.com' };
const picked = pick(user, ['name', 'age']); // { name: 'Tom', age: 18 }

// 5. 对象属性排除
function omit(obj, keys) {
  return Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

const omitted = omit(user, ['email']); // { name: 'Tom', age: 18 }

// 6. 冻结对象
const frozen = Object.freeze({ a: 1 });
frozen.a = 2; // 无效
frozen.b = 3; // 无效

// 7. 密封对象
const sealed = Object.seal({ a: 1 });
sealed.a = 2; // 有效
sealed.b = 3; // 无效
```

---

### 3. 字符串技巧

```javascript
// 1. 模板字符串高级用法
const tag = (strings, ...values) => {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
  }, '');
};

const name = 'Tom';
const age = 18;
const result = tag`Name: ${name}, Age: ${age}`;

// 2. 字符串填充
'5'.padStart(3, '0'); // '005'
'5'.padEnd(3, '0'); // '500'

// 3. 重复
'ha'.repeat(3); // 'hahaha'

// 4. 首字母大写
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// 5. 驼峰转换
const camelCase = str => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};
camelCase('hello-world'); // 'helloWorld'

// 6. 蛇形转换
const snakeCase = str => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};
snakeCase('helloWorld'); // 'hello_world'

// 7. 截断字符串
const truncate = (str, length) => {
  return str.length > length ? str.slice(0, length) + '...' : str;
};
```

---

### 4. 正则表达式

```javascript
// 1. 邮箱验证
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailRegex.test('user@example.com'); // true

// 2. 手机号验证（中国）
const phoneRegex = /^1[3-9]\d{9}$/;
phoneRegex.test('13800138000'); // true

// 3. URL 验证
const urlRegex = /^https?:\/\/.+/;
urlRegex.test('https://example.com'); // true

// 4. 密码强度（至少8位，包含大小写字母和数字）
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// 5. 提取所有数字
const extractNumbers = str => str.match(/\d+/g);
extractNumbers('abc123def456'); // ['123', '456']

// 6. 替换
const text = 'Hello World';
text.replace(/World/, 'JavaScript'); // 'Hello JavaScript'
text.replace(/o/g, '0'); // 'Hell0 W0rld'

// 7. 命名捕获组
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = '2024-01-15'.match(dateRegex);
console.log(match.groups); // { year: '2024', month: '01', day: '15' }
```

---

### 5. 性能优化技巧

```javascript
// 1. 使用对象查找代替 switch
// 不推荐
function getDiscount(type) {
  switch(type) {
    case 'VIP':
      return 0.8;
    case 'SVIP':
      return 0.5;
    default:
      return 1;
  }
}

// 推荐
const discountMap = {
  VIP: 0.8,
  SVIP: 0.5,
  default: 1
};

const getDiscount = type => discountMap[type] || discountMap.default;

// 2. 避免不必要的计算
// 不推荐
for (let i = 0; i < arr.length; i++) {
  // arr.length 每次都计算
}

// 推荐
const len = arr.length;
for (let i = 0; i < len; i++) {
  // 只计算一次
}

// 3. 使用 requestAnimationFrame
function animate() {
  // 动画逻辑
  requestAnimationFrame(animate);
}

// 4. 使用 Web Workers 处理复杂计算
const worker = new Worker('worker.js');
worker.postMessage({ data: largeArray });
worker.onmessage = function(e) {
  console.log('结果:', e.data);
};

// 5. 使用 DocumentFragment 批量操作 DOM
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
document.querySelector('ul').appendChild(fragment);
```

---

## 学习资源推荐

### 在线文档
- [MDN Web Docs](https://developer.mozilla.org/) - 最权威的 Web 技术文档
- [JavaScript.info](https://javascript.info/) - 现代 JavaScript 教程
- [ES6 入门教程](https://es6.ruanyifeng.com/) - 阮一峰

### 书籍
- 《JavaScript 高级程序设计（第4版）》
- 《你不知道的 JavaScript》（上、中、下）
- 《JavaScript 设计模式与开发实践》
- 《深入理解 ES6》

### 练习平台
- [LeetCode](https://leetcode.cn/) - 算法练习
- [JavaScript30](https://javascript30.com/) - 30 天挑战
- [Codewars](https://www.codewars.com/) - 代码挑战

### 视频课程
- 慕课网 JavaScript 进阶课程
- B站前端技术分享
- 极客时间《重学前端》

---

## 学习建议

1. **循序渐进**：从基础开始，不要跳跃式学习
2. **多写代码**：理论结合实践，每个知识点都要写 Demo
3. **阅读源码**：学习优秀开源项目的代码风格和设计思想
4. **总结归纳**：定期整理笔记，构建知识体系
5. **持续学习**：JavaScript 在不断发展，保持学习热情

---

## 练习题目

### 基础题
1. 实现一个函数，判断两个对象是否相等
2. 实现数组的 map、filter、reduce 方法
3. 实现一个简单的模板引擎
4. 实现 Promise.all 和 Promise.race
5. 实现一个 LRU 缓存

### 进阶题
1. 实现一个完整的 Promise（符合 Promises/A+ 规范）
2. 实现一个虚拟 DOM 和 diff 算法
3. 实现一个简单的响应式系统（类似 Vue）
4. 实现一个发布订阅模式的事件总线
5. 实现一个带并发控制的请求调度器

### 实战项目
1. 实现一个 TodoList 应用（包含增删改查）
2. 实现一个图片懒加载库
3. 实现一个无限滚动列表
4. 实现一个拖拽排序功能
5. 实现一个简单的打包工具

---

**持续更新中... 🚀**

祝学习顺利！如有问题欢迎交流探讨。

