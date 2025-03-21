# TS

## 说说 TypeScript 中命名空间与模块的理解和区别

- 命名空间：在代码量较大的情况下，为了避免各种变量命名冲突，可将相似功能的函数、类、接口等放置到命名空间内
- 模块：模块是在代码量较大的情况下，为了方便管理，将代码进行拆分，将代码拆分成一个个小的模块

## 说说你对 TypeScript 中接口的理解

- 接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过该接口调用方法而无需关心这个方法的具体实现

## 说说你对 TypeScript 中泛型的理解

- 泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

## 说说你对 TypeScript 中枚举的理解

- 枚举是组织收集有关联变量的一种方式

## 说说你对 TypeScript 中类型断言的理解

- 类型断言可以用来手动指定一个值的类型

## TypeScript 支持的访问修饰符有哪些？

- public: 公有，可以在任何地方被访问
- private: 私有，只能在类的内部被访问
- protected: 受保护，可以在类的内部和子类中被访问

## TypeScript 中有哪些声明变量的方式？

- var
- let
- const
- import
- function
- class
- interface
- type
- enum
- namespace

## TypeScript 中的 Declare 关键字有什么作用

- 所有的 JavaScript 库/框架都没有 TypeScript 声明文件，但是我们希望在 TypeScript 文件中使用它们时不会出现编译错误。为此，我们使用 declare 关键字。
- 在我们希望定义可能存在于其他地方的变量的环境声明和方法中，可以使用 declare 关键字。

## 使用 TS 实现一个判断传入参数是否是数组类型的方法

```typescript
function isArray(x: unknown): boolean {
  if (Array.isArray(x)) {
    return true;
  }
  return false;
}
```

## 什么是方法重载？

方法重载是指在一个类中定义多个同名的方法，但要求每个方法具有不同的参数的类型或参数的个数。 基本上，它在派生类或子类中重新定义了基类方法。

方法覆盖规则：

- 该方法必须与父类中的名称相同。
- 它必须具有与父类相同的参数。
- 必须存在 IS-A 关系或继承。

## TS 中的 interface 和 type 的异同

- 相同点：都可以用来定义一个对象或函数

```typescript
interface Person {
  name: string;
  age: number;
}

interface SetUser {
  (name: string, age: number): void;
}

type Person = {
  name: string;
  age: number;
};

type SetUser = (name: string, age: number) => void;
```

- 不同点：

  - type 可以定义基本类型别名，联合类型，元组等类型，而 interface 不行

  ```typescript
  // 基本类型别名
  type Name = string;

  // 联合类型
  interface Dog {
    wong();
  }
  interface Cat {
    miao();
  }

  type Pet = Dog | Cat;

  // 具体定义数组每个位置的类型
  type PetList = [Dog, Pet];

  type StringOrNumber = string | number;
  type Text = string | { text: string };
  type NameLookup = Dictionary<string, Person>;
  type Callback<T> = (data: T) => void;
  type Pair<T> = [T, T];
  type Coordinates = Pair<number>;
  type Tree<T> = T | { left: Tree<T>; right: Tree<T> };
  ```

  - interface 能够声明合并，而 type 不行

    ```typescript
    interface User {
      name: string;
      age: number;
    }

    interface User {
      sex: string;
    }

    /*
    User 接口为 {
    name: string
    age: number
    sex: string 
    }
    */
    ```

## 常用的函数

### Omit

- Omit 类型的作用是用于创建一个类型，该类型具有原始类型中除了指定属性之外的所有属性。

```typescript
interface User {
  name: string;
  age: number;
  password: string;
}

type UserWithoutPassword = Omit<User, "password">;

// UserWithoutPassword 类型为 { name: string; age: number; }
```

### Partial

- Partial 类型的作用是用于创建一个类型，该类型具有原始类型中所有属性，但所有属性都设置为可选的。

```typescript
interface User {
  name: string;
  age: number;
  password: string;
}

type UserPartial = Partial<User>;

// UserPartial 类型为 { name?: string; age?: number; password?: string; }
```

### Required

- Required 类型的作用是用于创建一个类型，该类型具有原始类型中所有属性，但所有属性都设置为必选的。

```typescript
interface User {
  name?: string;
  age?: number;
  password?: string;
}

type UserRequired = Required<User>;

// UserRequired 类型为 { name: string; age: number; password: string; }
```

### Readonly

- Readonly 类型的作用是用于创建一个类型，该类型具有原始类型中所有属性，但所有属性都设置为只读的。

```typescript
interface User {
  name: string;
  age: number;
  password: string;
}

type UserReadonly = Readonly<User>;

// UserReadonly 类型为 { readonly name: string; readonly age: number; readonly password: string; }
```

### Pick

- Pick 类型的作用是用于从原始类型中选择一些属性，并创建一个新的类型。

```typescript
interface User {
  name: string;
  age: number;
  password: string;
}

type UserPick = Pick<User, "name" | "age">;

// UserPick 类型为 { name: string; age: number; }
```

### Record

- Record 类型的作用是用于创建一个类型，该类型具有一组键值对。

```typescript
type UserRecord = Record<string, number>;

// UserRecord 类型为 { [key: string]: number; }
```

### Exclude

- Exclude 类型的作用是用于从联合类型中排除一些类型，并创建一个新的类型。

```typescript
type Exclude<T, U> = T extends U ? never : T;
```
