# TypeScript 面试题

## TypeScript 基础

### 1. 什么是 TypeScript

TypeScript 是 JavaScript 的超集，由 Microsoft 开发和维护。它在 JavaScript 的基础上添加了静态类型系统。

**核心特点：**
- 静态类型检查
- 面向对象编程（类、接口、继承等）
- 编译时错误检查
- 更好的 IDE 支持（代码补全、重构）
- 支持最新的 ECMAScript 特性
- 可编译为任意版本的 JavaScript

**优势：**
- 提前发现错误
- 更好的代码提示
- 更容易重构
- 更好的团队协作
- 提高代码质量和可维护性

### 2. TypeScript vs JavaScript

| 特性       | JavaScript | TypeScript |
| ---------- | ---------- | ---------- |
| 类型系统   | 动态类型   | 静态类型   |
| 类型检查   | 运行时     | 编译时     |
| 错误发现   | 运行时     | 编译时     |
| IDE 支持   | 一般       | 优秀       |
| 学习曲线   | 平缓       | 稍陡       |
| 文件扩展名 | .js        | .ts / .tsx |

### 3. TypeScript 的编译过程

```
TypeScript 源码 (.ts)
    ↓ (编译)
JavaScript 代码 (.js)
    ↓ (执行)
运行结果
```

**编译命令：**
```bash
# 编译单个文件
tsc app.ts

# 编译整个项目
tsc

# 监听模式
tsc --watch

# 指定配置文件
tsc -p tsconfig.json
```

## 基本类型

### 1. 原始类型

**boolean（布尔值）：**
```typescript
let isDone: boolean = false;
```

**number（数字）：**
```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

**string（字符串）：**
```typescript
let name: string = "张三";
let message: string = `Hello, ${name}`;
```

**null 和 undefined：**
```typescript
let u: undefined = undefined;
let n: null = null;

// strictNullChecks 关闭时，null 和 undefined 可以赋值给任何类型
let num: number = null; // 错误（strictNullChecks 开启）
```

**symbol：**
```typescript
let sym1: symbol = Symbol('key');
let sym2: symbol = Symbol('key');
console.log(sym1 === sym2); // false
```

**bigint：**
```typescript
let big: bigint = 100n;
```

### 2. 引用类型

**array（数组）：**
```typescript
// 方式一：类型[]
let list: number[] = [1, 2, 3];

// 方式二：Array<类型>
let list: Array<number> = [1, 2, 3];

// 多种类型
let arr: (number | string)[] = [1, '2', 3];
```

**tuple（元组）：**
```typescript
// 固定长度和类型的数组
let tuple: [string, number];
tuple = ['hello', 10]; // 正确
tuple = [10, 'hello']; // 错误

// 访问元素
console.log(tuple[0].substring(1)); // 正确
console.log(tuple[1].substring(1)); // 错误，number 没有 substring

// 越界元素使用联合类型
tuple[2] = 'world'; // 正确，可以是 string 或 number
```

**enum（枚举）：**
```typescript
// 数字枚举
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

let dir: Direction = Direction.Up; // 1

// 字符串枚举
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

let color: Color = Color.Red; // "RED"

// 常量枚举（编译时移除）
const enum Month {
  Jan,
  Feb,
  Mar
}

let month = Month.Jan; // 编译为: let month = 0
```

**object（对象）：**
```typescript
// 对象类型
let obj: object = { name: '张三' };

// 更精确的对象类型
let person: { name: string; age: number } = {
  name: '张三',
  age: 20
};
```

### 3. 特殊类型

**any（任意类型）：**
```typescript
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

// any 类型可以访问任意属性和方法
notSure.toFixed();
notSure.name;
```

**unknown（未知类型）：**
```typescript
let value: unknown;

value = true;
value = 42;
value = "Hello";

// 不能直接使用，需要类型检查
let value1: unknown = value; // 正确
let value2: any = value; // 正确
let value3: string = value; // 错误

// 需要类型检查或断言
if (typeof value === 'string') {
  console.log(value.toUpperCase());
}
```

**void（空类型）：**
```typescript
// 函数没有返回值
function warnUser(): void {
  console.log("This is a warning message");
}

// void 类型的变量只能赋值 undefined
let unusable: void = undefined;
```

**never（永不存在的值）：**
```typescript
// 函数永远不会返回
function error(message: string): never {
  throw new Error(message);
}

// 死循环
function infiniteLoop(): never {
  while (true) {}
}

// 类型守卫
function assertNever(x: never): never {
  throw new Error("Unexpected value: " + x);
}
```

**any vs unknown：**

| 特性               | any                | unknown           |
| ------------------ | ------------------ | ----------------- |
| 类型安全           | ❌                  | ✅                 |
| 可以赋值给其他类型 | ✅                  | ❌                 |
| 可以调用方法       | ✅                  | ❌（需要类型检查） |
| 使用场景           | 快速迁移、第三方库 | 更安全的 any      |

## 高级类型

### 1. 联合类型（Union Types）

```typescript
// 表示值可以是多种类型之一
let value: string | number;
value = "hello";
value = 123;

// 联合类型的数组
let arr: (string | number)[] = [1, 'hello', 2];

// 函数参数
function printId(id: string | number) {
  console.log(id);
}
```

### 2. 交叉类型（Intersection Types）

```typescript
// 合并多个类型
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type Staff = Person & Employee;

let staff: Staff = {
  name: '张三',
  employeeId: 1001
};
```

### 3. 类型别名（Type Alias）

```typescript
// 基本类型别名
type Name = string;
type Age = number;

// 联合类型别名
type StringOrNumber = string | number;

// 对象类型别名
type Person = {
  name: string;
  age: number;
};

// 函数类型别名
type SetUser = (name: string, age: number) => void;
```

### 4. 字符串字面量类型

```typescript
// 只能是指定的字符串值
type EventType = 'click' | 'scroll' | 'mousemove';

let event: EventType = 'click'; // 正确
let event2: EventType = 'dbclick'; // 错误

// 函数参数
function handleEvent(event: EventType) {
  // ...
}
```

### 5. 数字字面量类型

  ```typescript
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

let roll: DiceRoll = 3; // 正确
let roll2: DiceRoll = 7; // 错误
```

### 6. 条件类型（Conditional Types）

```typescript
// T extends U ? X : Y
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// 分发条件类型
type ToArray<T> = T extends any ? T[] : never;
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]
```

### 7. 映射类型（Mapped Types）

```typescript
// 基于旧类型创建新类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 使用
interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person>;
// { readonly name: string; readonly age: number; }

type PartialPerson = Partial<Person>;
// { name?: string; age?: number; }
```

### 8. 索引类型（Index Types）

```typescript
// keyof：获取类型的所有键
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // "name" | "age"

// 索引访问类型
type NameType = Person['name']; // string
type AgeType = Person['age']; // number
type PersonValues = Person[keyof Person]; // string | number

// 泛型约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let person = { name: '张三', age: 20 };
let name = getProperty(person, 'name'); // 正确
let age = getProperty(person, 'age'); // 正确
let invalid = getProperty(person, 'gender'); // 错误
```

### 9. infer 关键字

    ```typescript
// 在条件类型中推断类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type Func = () => number;
type FuncReturnType = ReturnType<Func>; // number

// 推断数组元素类型
type ArrayElementType<T> = T extends (infer E)[] ? E : T;
type NumberArray = ArrayElementType<number[]>; // number
type StringType = ArrayElementType<string>; // string
```

## 接口（Interface）

### 1. 基本接口

```typescript
interface Person {
      name: string;
      age: number;
    }

let person: Person = {
  name: '张三',
  age: 20
};
```

### 2. 可选属性

```typescript
interface Person {
  name: string;
  age?: number; // 可选属性
}

let person1: Person = { name: '张三' }; // 正确
let person2: Person = { name: '李四', age: 20 }; // 正确
```

### 3. 只读属性

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

let point: Point = { x: 10, y: 20 };
point.x = 5; // 错误，x 是只读的
```

### 4. 索引签名

```typescript
// 字符串索引
interface StringArray {
  [index: number]: string;
}

let arr: StringArray = ['a', 'b', 'c'];

// 对象索引
interface Dictionary {
  [key: string]: any;
}

let dict: Dictionary = {
  name: '张三',
  age: 20
};
```

### 5. 函数类型接口

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function(source: string, subString: string) {
  return source.indexOf(subString) !== -1;
};
```

### 6. 类类型接口

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  
  setTime(d: Date) {
    this.currentTime = d;
  }
}
```

### 7. 接口继承

```typescript
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square: Square = {
  color: 'blue',
  sideLength: 10
};

// 多重继承
interface A {
  a: string;
}

interface B {
  b: number;
}

interface C extends A, B {
  c: boolean;
}

let obj: C = {
  a: 'hello',
  b: 123,
  c: true
};
```

### 8. 接口合并

```typescript
// 同名接口会自动合并
interface User {
  name: string;
}

interface User {
  age: number;
}

// User 接口实际为
// { name: string; age: number; }

let user: User = {
  name: '张三',
  age: 20
};
```

## 泛型（Generics）

### 1. 泛型函数

```typescript
// 不使用泛型
function identity(arg: number): number {
  return arg;
}

// 使用泛型
function identity<T>(arg: T): T {
  return arg;
}

// 使用
let output1 = identity<string>("hello"); // 明确指定类型
let output2 = identity("hello"); // 类型推断
```

### 2. 泛型约束

```typescript
// 约束泛型必须具有某些属性
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity({ length: 10, value: 3 }); // 正确
loggingIdentity([1, 2, 3]); // 正确
loggingIdentity(3); // 错误，number 没有 length 属性
```

### 3. 泛型接口

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = function(arg) {
  return arg;
};
```

### 4. 泛型类

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};
```

### 5. 多个类型参数

```typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

let p = pair<string, number>('hello', 123);
```

### 6. 泛型默认类型

```typescript
interface Container<T = string> {
  value: T;
}

let c1: Container = { value: 'hello' }; // T 默认为 string
let c2: Container<number> = { value: 123 }; // T 为 number
```

### 7. 常见泛型应用

**数组方法：**
```typescript
// map
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

// filter
function filter<T>(arr: T[], fn: (item: T) => boolean): T[] {
  return arr.filter(fn);
}
```

**Promise：**
```typescript
function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then(response => response.json());
}

// 使用
interface User {
  id: number;
  name: string;
}

fetchData<User>('/api/user').then(user => {
  console.log(user.name);
});
```

## 类（Class）

### 1. 基本类

```typescript
class Person {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

let person = new Person('张三', 20);
person.sayHello();
```

### 2. 访问修饰符

```typescript
class Animal {
  public name: string; // 公有（默认）
  private age: number; // 私有
  protected species: string; // 受保护
  
  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }
  
  public getName() {
    return this.name;
  }
  
  private getAge() {
    return this.age;
  }
  
  protected getSpecies() {
    return this.species;
  }
}

class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, 'Dog');
  }
  
  public showInfo() {
    console.log(this.name); // 正确，public
    // console.log(this.age); // 错误，private
    console.log(this.species); // 正确，protected
  }
}

let dog = new Dog('旺财', 3);
console.log(dog.name); // 正确，public
// console.log(dog.age); // 错误，private
// console.log(dog.species); // 错误，protected
```

### 3. readonly 修饰符

```typescript
class Person {
  readonly name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

let person = new Person('张三');
// person.name = '李四'; // 错误，只读属性
```

### 4. 参数属性

```typescript
// 简化写法
class Person {
  constructor(
    public name: string,
    private age: number,
    protected species: string
  ) {}
}

// 等价于
class Person {
  public name: string;
  private age: number;
  protected species: string;
  
  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }
}
```

### 5. getter 和 setter

```typescript
class Employee {
  private _fullName: string = '';
  
  get fullName(): string {
    return this._fullName;
  }
  
  set fullName(newName: string) {
    this._fullName = newName;
  }
}

let employee = new Employee();
employee.fullName = '张三';
console.log(employee.fullName);
```

### 6. 静态成员

```typescript
class Grid {
  static origin = { x: 0, y: 0 };
  
  static calculateDistance(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist);
  }
}

console.log(Grid.origin);
console.log(Grid.calculateDistance({ x: 10, y: 10 }));
```

### 7. 抽象类

```typescript
abstract class Animal {
  abstract makeSound(): void; // 抽象方法
  
  move(): void {
    console.log('Moving...');
  }
}

class Dog extends Animal {
  makeSound() {
    console.log('Woof! Woof!');
  }
}

// let animal = new Animal(); // 错误，不能实例化抽象类
let dog = new Dog();
dog.makeSound();
dog.move();
```

### 8. 类实现接口

```typescript
interface Printable {
  print(): void;
}

class Document implements Printable {
  print() {
    console.log('Printing document...');
  }
}
```

## 类型推断和类型保护

### 1. 类型推断

```typescript
// 基本类型推断
let x = 3; // 推断为 number
let y = 'hello'; // 推断为 string

// 数组推断
let arr = [1, 2, 3]; // 推断为 number[]
let arr2 = [1, 'hello', true]; // 推断为 (number | string | boolean)[]

// 函数返回值推断
function add(a: number, b: number) {
  return a + b; // 推断返回 number
}

// 上下文类型推断
window.onmousedown = function(mouseEvent) {
  // mouseEvent 推断为 MouseEvent
  console.log(mouseEvent.button);
};
```

### 2. 类型断言

```typescript
// 方式一：<类型>值
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// 方式二：值 as 类型（推荐）
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// 双重断言（不推荐）
let num = 123;
let str = num as any as string;
```

### 3. 非空断言

```typescript
// 告诉编译器某个值不是 null 或 undefined
function processValue(value: string | null) {
  // value.length; // 错误
  value!.length; // 正确，非空断言
}

// DOM 元素
let button = document.getElementById('button')!;
button.addEventListener('click', () => {});
```

### 4. 类型守卫

**typeof 类型守卫：**
```typescript
function printValue(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

**instanceof 类型守卫：**
```typescript
class Bird {
  fly() {
    console.log('Flying...');
  }
}

class Fish {
  swim() {
    console.log('Swimming...');
  }
}

function move(animal: Bird | Fish) {
  if (animal instanceof Bird) {
    animal.fly();
  } else {
    animal.swim();
  }
}
```

**in 类型守卫：**
```typescript
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}
```

**自定义类型守卫：**
```typescript
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

// 类型谓词 is
function isBird(animal: Bird | Fish): animal is Bird {
  return (animal as Bird).fly !== undefined;
}

function move(animal: Bird | Fish) {
  if (isBird(animal)) {
    animal.fly();
  } else {
    animal.swim();
  }
}
```

## 工具类型

### 1. Partial（可选）

```typescript
// 将所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string; }

// 使用场景：更新对象
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}
```

### 2. Required（必选）

```typescript
// 将所有属性变为必选
type Required<T> = {
  [P in keyof T]-?: T[P];
};

interface User {
  name?: string;
  age?: number;
}

type RequiredUser = Required<User>;
// { name: string; age: number; }
```

### 3. Readonly（只读）

```typescript
// 将所有属性变为只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; }

let user: ReadonlyUser = { name: '张三', age: 20 };
// user.name = '李四'; // 错误
```

### 4. Pick（挑选）

```typescript
// 从类型中挑选部分属性
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  name: string;
  age: number;
  email: string;
}

type UserPreview = Pick<User, 'name' | 'age'>;
// { name: string; age: number; }
```

### 5. Omit（排除）

```typescript
// 从类型中排除部分属性
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface User {
  name: string;
  age: number;
  password: string;
}

type UserWithoutPassword = Omit<User, 'password'>;
// { name: string; age: number; }
```

### 6. Record（记录）

```typescript
// 创建具有指定键和值类型的对象类型
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type PageInfo = {
  title: string;
};

type Pages = 'home' | 'about' | 'contact';

const pages: Record<Pages, PageInfo> = {
  home: { title: '首页' },
  about: { title: '关于' },
  contact: { title: '联系' }
};
```

### 7. Exclude（排除类型）

```typescript
// 从联合类型中排除指定类型
type Exclude<T, U> = T extends U ? never : T;

type T1 = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
type T2 = Exclude<string | number | boolean, boolean>; // string | number
```

### 8. Extract（提取类型）

```typescript
// 从联合类型中提取指定类型
type Extract<T, U> = T extends U ? T : never;

type T1 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // 'a'
type T2 = Extract<string | number | boolean, boolean>; // boolean
```

### 9. NonNullable（非空）

```typescript
// 排除 null 和 undefined
type NonNullable<T> = T extends null | undefined ? never : T;

type T1 = NonNullable<string | number | null>; // string | number
type T2 = NonNullable<string | undefined>; // string
```

### 10. ReturnType（返回类型）

```typescript
// 获取函数的返回类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

function getUserInfo() {
  return { name: '张三', age: 20 };
}

type UserInfo = ReturnType<typeof getUserInfo>;
// { name: string; age: number; }
```

### 11. Parameters（参数类型）

```typescript
// 获取函数的参数类型（元组）
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number) {
  return { name, age };
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, number]
```

### 12. ConstructorParameters（构造函数参数）

```typescript
// 获取构造函数的参数类型
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;

class Person {
  constructor(public name: string, public age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>;
// [string, number]
```

### 13. InstanceType（实例类型）

```typescript
// 获取构造函数的实例类型
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

class Person {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

type PersonInstance = InstanceType<typeof Person>;
// Person
```

## 装饰器（Decorators）

### 1. 类装饰器

```typescript
// 启用装饰器：tsconfig.json 中设置 "experimentalDecorators": true

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }
  
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

### 2. 方法装饰器

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}
```

### 3. 属性装饰器

```typescript
function format(formatString: string) {
  return function(target: any, propertyKey: string) {
    let value: string;
    
    const getter = function() {
      return value;
    };
    
    const setter = function(newVal: string) {
      value = formatString.replace('%s', newVal);
    };
    
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class Greeter {
  @format('Hello, %s')
  greeting: string;
}
```

### 4. 参数装饰器

```typescript
function required(target: Object, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter ${parameterIndex} in ${propertyKey} is required`);
}

class Greeter {
  greet(@required name: string) {
    return "Hello " + name;
  }
}
```

## 模块和命名空间

### 1. 模块（Modules）

**导出：**
```typescript
// person.ts
export interface Person {
  name: string;
  age: number;
}

export function createPerson(name: string, age: number): Person {
  return { name, age };
}

// 默认导出
export default class User {
  name: string;
}
```

**导入：**
```typescript
// 命名导入
import { Person, createPerson } from './person';

// 默认导入
import User from './person';

// 全部导入
import * as person from './person';

// 重命名
import { Person as P } from './person';
```

### 2. 命名空间（Namespaces）

```typescript
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }
  
  export class LettersOnlyValidator implements StringValidator {
    isValid(s: string) {
      return /^[A-Za-z]+$/.test(s);
    }
  }
  
  export class NumbersOnlyValidator implements StringValidator {
    isValid(s: string) {
      return /^[0-9]+$/.test(s);
    }
  }
}

// 使用
let validator = new Validation.LettersOnlyValidator();
```

### 3. 命名空间 vs 模块

| 特性     | 模块          | 命名空间          |
| -------- | ------------- | ----------------- |
| 作用域   | 文件作用域    | 全局作用域        |
| 加载方式 | 动态加载      | 编译时合并        |
| 依赖声明 | 明确的 import | 隐式依赖          |
| 推荐使用 | ✅             | ❌（除非特殊场景） |

## 声明文件

### 1. 声明文件（.d.ts）

```typescript
// types/jquery.d.ts
declare var $: (selector: string) => any;

// 使用
$('#button').click();
```

### 2. declare 关键字

```typescript
// 声明全局变量
declare var globalVar: string;

// 声明全局函数
declare function globalFunction(param: string): void;

// 声明全局类
declare class GlobalClass {
  constructor(param: string);
  method(): void;
}

// 声明模块
declare module 'my-module' {
  export function myFunction(): void;
}
```

### 3. 第三方库类型声明

```bash
# 安装类型声明包
npm install --save-dev @types/node
npm install --save-dev @types/react
npm install --save-dev @types/lodash
```

### 4. 自定义类型声明

```typescript
// global.d.ts
interface Window {
  myCustomProperty: string;
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

## tsconfig.json 配置

### 1. 基本配置

```json
{
  "compilerOptions": {
    // 目标 JavaScript 版本
    "target": "ES2020",
    
    // 模块系统
    "module": "ESNext",
    
    // 模块解析策略
    "moduleResolution": "node",
    
    // 输出目录
    "outDir": "./dist",
    
    // 根目录
    "rootDir": "./src",
    
    // 严格模式
    "strict": true,
    
    // 允许导入 JSON
    "resolveJsonModule": true,
    
    // ESM 互操作
    "esModuleInterop": true,
    
    // 跳过库检查
    "skipLibCheck": true,
    
    // 强制文件名大小写一致
    "forceConsistentCasingInFileNames": true,
    
    // 声明文件
    "declaration": true,
    
    // Source Map
    "sourceMap": true,
    
    // 库文件
    "lib": ["ES2020", "DOM"],
    
    // 路径映射
    "paths": {
      "@/*": ["src/*"]
    },
    
    // 装饰器
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  
  // 包含的文件
  "include": ["src/**/*"],
  
  // 排除的文件
  "exclude": ["node_modules", "dist"]
}
```

### 2. 严格模式选项

```json
{
  "compilerOptions": {
    "strict": true, // 启用所有严格检查
    
    // 以下选项在 strict: true 时自动启用
    "noImplicitAny": true, // 禁止隐式 any
    "strictNullChecks": true, // 严格的 null 检查
    "strictFunctionTypes": true, // 严格的函数类型检查
    "strictBindCallApply": true, // 严格的 bind/call/apply 检查
    "strictPropertyInitialization": true, // 严格的属性初始化检查
    "noImplicitThis": true, // 禁止隐式 this
    "alwaysStrict": true // 始终以严格模式解析
  }
}
```

## 常见面试题

### 1. interface 和 type 的区别？

**相同点：**
- 都可以描述对象或函数
- 都支持扩展

**不同点：**

| 特性         | interface | type |
| ------------ | --------- | ---- |
| 基本类型别名 | ❌         | ✅    |
| 联合类型     | ❌         | ✅    |
| 元组类型     | ❌         | ✅    |
| 声明合并     | ✅         | ❌    |
| 计算属性     | ❌         | ✅    |

**示例：**
```typescript
// type 可以，interface 不行
type Name = string;
type StringOrNumber = string | number;
type Point = [number, number];

// interface 可以声明合并
interface User {
  name: string;
}
interface User {
  age: number;
}
// 合并为 { name: string; age: number; }
```

**建议：**
- 定义对象类型时优先使用 interface
- 定义基本类型别名、联合类型时使用 type
- 需要声明合并时使用 interface

### 2. any、unknown、never 的区别？

**any：**
- 任意类型
- 可以赋值给任何类型
- 可以调用任何方法
- 会关闭类型检查

**unknown：**
- 未知类型
- 不能赋值给其他类型（除了 any 和 unknown）
- 不能调用方法（需要类型检查）
- 更安全的 any

**never：**
- 永不存在的值的类型
- 函数永远不会返回
- 用于类型守卫的穷举检查

**示例：**
```typescript
// any
let a: any = 1;
a = 'hello';
a.foo(); // 不会报错

// unknown
let u: unknown = 1;
u = 'hello';
// u.foo(); // 错误
if (typeof u === 'string') {
  u.toUpperCase(); // 正确
}

// never
function error(message: string): never {
  throw new Error(message);
}
```

### 3. TypeScript 中的泛型是什么？

泛型是指在定义函数、接口或类时，不预先指定具体的类型，而在使用时再指定类型的一种特性。

**作用：**
- 代码复用
- 类型安全
- 更好的代码提示

**示例：**
```typescript
// 不使用泛型
function identity(arg: number): number {
  return arg;
}

// 使用泛型
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>('hello');
let output2 = identity(123); // 类型推断
```

### 4. keyof 和 typeof 的作用？

**keyof：**
- 获取类型的所有键
- 返回联合类型

```typescript
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // "name" | "age"
```

**typeof：**
- 获取值的类型
- 在类型上下文中使用

```typescript
const person = {
  name: '张三',
  age: 20
};

type Person = typeof person;
// { name: string; age: number; }

function add(a: number, b: number) {
  return a + b;
}

type AddType = typeof add;
// (a: number, b: number) => number
```

### 5. TypeScript 中的枚举是什么？

枚举（Enum）是组织收集有关联变量的一种方式。

**数字枚举：**
```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

console.log(Direction.Up); // 1
console.log(Direction[1]); // "Up"
```

**字符串枚举：**
```typescript
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

console.log(Color.Red); // "RED"
```

**常量枚举：**
```typescript
const enum Month {
  Jan,
  Feb,
  Mar
}

let month = Month.Jan; // 编译为: let month = 0
```

### 6. TypeScript 的类型守卫有哪些？

1. **typeof 类型守卫**
2. **instanceof 类型守卫**
3. **in 类型守卫**
4. **自定义类型守卫（类型谓词）**

详见"类型推断和类型保护"章节。

### 7. 什么是类型断言？

类型断言用于手动指定一个值的类型。

**语法：**
```typescript
// 尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法（推荐，在 JSX 中只能使用这种）
let strLength: number = (someValue as string).length;
```

**使用场景：**
- 从 any 类型转换
- 联合类型转换为具体类型
- 访问 DOM 元素

### 8. 如何实现一个 Pick 工具类型？

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 测试
interface User {
  name: string;
  age: number;
  email: string;
}

type UserPreview = MyPick<User, 'name' | 'age'>;
// { name: string; age: number; }
```

### 9. 如何实现一个 Omit 工具类型？

```typescript
type MyExclude<T, U> = T extends U ? never : T;

type MyOmit<T, K extends keyof any> = {
  [P in MyExclude<keyof T, K>]: T[P];
};

// 或者使用 Pick 和 Exclude
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 测试
interface User {
  name: string;
  age: number;
  password: string;
}

type UserWithoutPassword = MyOmit<User, 'password'>;
// { name: string; age: number; }
```

### 10. TypeScript 中的协变和逆变是什么？

**协变（Covariance）：**
- 子类型可以赋值给父类型
- 适用于返回值类型

**逆变（Contravariance）：**
- 父类型可以赋值给子类型
- 适用于参数类型

**示例：**
```typescript
// 协变
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

let animal: Animal = { name: 'Animal' };
let dog: Dog = { name: 'Dog', breed: 'Husky' };

animal = dog; // 正确，协变

// 逆变（函数参数）
type AnimalHandler = (animal: Animal) => void;
type DogHandler = (dog: Dog) => void;

let animalHandler: AnimalHandler = (animal) => {};
let dogHandler: DogHandler = (dog) => {};

dogHandler = animalHandler; // 正确，逆变
// animalHandler = dogHandler; // 错误
```

### 11. 如何处理循环引用的类型？

使用接口或类型别名的自引用。

```typescript
// 链表节点
interface ListNode {
  value: number;
  next: ListNode | null;
}

// 树节点
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// JSON 类型
type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
```

### 12. TypeScript 的类型兼容性规则？

TypeScript 使用结构类型系统（Structural Type System）。

**基本规则：**
- 如果 y 至少具有与 x 相同的成员，则 x 兼容 y

**示例：**
```typescript
interface Named {
  name: string;
}

class Person {
  name: string;
  age: number;
}

let p: Named;
p = new Person(); // 正确，Person 有 name 属性

// 函数参数（逆变）
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // 正确
// x = y; // 错误，x 的参数少
```

### 13. 什么是映射类型？

映射类型基于旧类型创建新类型。

**语法：**
```typescript
type MappedType<T> = {
  [P in keyof T]: T[P];
};
```

**示例：**
```typescript
// Readonly 实现
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Partial 实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 添加前缀
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// {
//   getName: () => string;
//   getAge: () => number;
// }
```

### 14. 如何优化 TypeScript 项目的编译速度？

**方法：**
1. 使用项目引用（Project References）
2. 启用增量编译（incremental）
3. 跳过库检查（skipLibCheck）
4. 使用 esbuild 或 swc
5. 减少类型复杂度
6. 合理使用 any
7. 升级 TypeScript 版本

**配置：**
```json
{
  "compilerOptions": {
    "incremental": true,
    "skipLibCheck": true,
    "composite": true
  }
}
```

### 15. TypeScript 中 const 和 readonly 的区别？

**const：**
- 用于变量
- 编译为 JavaScript
- 运行时常量
- 不能重新赋值

**readonly：**
- 用于属性
- 仅在 TypeScript 中
- 编译时检查
- 属性不能修改

**示例：**
```typescript
const x = 1;
// x = 2; // 错误

interface Point {
  readonly x: number;
  readonly y: number;
}

let p: Point = { x: 10, y: 20 };
// p.x = 5; // 错误

// 但可以整体赋值
p = { x: 5, y: 25 }; // 正确
```

## 实战应用

### 1. React 组件类型

```typescript
import React from 'react';

// Props 接口
interface ButtonProps {
  type?: 'primary' | 'default';
  size?: 'small' | 'medium' | 'large';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

// 函数组件
const Button: React.FC<ButtonProps> = ({ type = 'default', size = 'medium', onClick, children }) => {
  return (
    <button className={`btn-${type} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

// 类组件
class Button extends React.Component<ButtonProps> {
  render() {
    return <button>{this.props.children}</button>;
  }
}
```

### 2. Vue 组件类型

```typescript
import { defineComponent, PropType } from 'vue';

interface User {
  name: string;
  age: number;
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    update: (user: User) => true
  },
  setup(props, { emit }) {
    const handleUpdate = () => {
      emit('update', props.user);
    };
    
    return {
      handleUpdate
    };
  }
});
```

### 3. Express 类型

```typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// 自定义 Request 类型
interface CustomRequest extends Request {
  user?: {
    id: string;
    name: string;
  };
}

// 中间件
const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  req.user = { id: '1', name: '张三' };
  next();
};

// 路由
app.get('/user', authMiddleware, (req: CustomRequest, res: Response) => {
  res.json({ user: req.user });
});
```

### 4. API 响应类型

```typescript
// 通用响应类型
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 用户类型
interface User {
  id: number;
  name: string;
  email: string;
}

// API 函数
async function getUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/user/${id}`);
  return response.json();
}

// 使用
const result = await getUser(1);
console.log(result.data.name);
```

## 最佳实践

### 1. 类型优先

- ✅ 优先使用接口定义对象类型
- ✅ 使用类型别名定义联合类型
- ✅ 避免使用 any
- ✅ 使用 unknown 代替 any

### 2. 类型安全

- ✅ 启用严格模式
- ✅ 使用类型守卫
- ✅ 避免类型断言
- ✅ 使用非空断言要谨慎

### 3. 代码组织

- ✅ 使用模块化
- ✅ 统一管理类型定义
- ✅ 使用路径别名
- ✅ 合理拆分类型文件

### 4. 性能优化

- ✅ 启用增量编译
- ✅ 跳过库检查
- ✅ 使用项目引用
- ✅ 减少类型复杂度

### 5. 团队协作

- ✅ 统一编码规范
- ✅ 使用 ESLint
- ✅ 代码审查
- ✅ 文档完善

## 总结

TypeScript 是 JavaScript 的超集，通过静态类型系统提高了代码质量和可维护性。掌握 TypeScript 需要：

1. **理解类型系统**：基本类型、高级类型、泛型
2. **掌握接口和类**：面向对象编程
3. **熟悉工具类型**：Partial、Pick、Omit 等
4. **类型推断和保护**：让类型更智能
5. **实战应用**：React、Vue、Node.js
6. **最佳实践**：代码组织、性能优化

持续学习，保持对新特性的关注，在实践中提升 TypeScript 技能！
