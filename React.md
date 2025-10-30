# React

## Recoil 和 Redux，MobX 的区别

### 1. Recoil

- 更强调原子性和灵活性。它将状态拆分成多个原子（atoms），每个原子代表一个独立的状态单元。组件可以独立地订阅和修改这些原子状态，并且可以通过选择器（selectors）来派生和组合状态。这种设计使得状态管理更加细粒度，易于扩展和复用。
- API 更加简洁和直观。主要使用 atom 来定义状态原子，使用 selector 来定义派生状态。组件可以直接使用 useRecoilState、useRecoilValue 等钩子来访问和修改状态。
- 内置了一些性能优化机制，例如自动记忆化选择器，只有当依赖的状态发生变化时才会重新计算选择器的值。

### 2. Redux

- 采用单向数据流和单一数据源的设计理念。整个应用的状态被存储在一个单一的 store 中，并且这个状态是只读的。唯一改变状态的方式是触发 action，reducer 会根据 action 来纯函数式地计算新的状态。这种设计使得应用的状态变化可预测，便于调试和维护。
- API 相对复杂，需要定义 action、reducer、store 等多个概念。通常的使用流程是：定义 action 类型和 action 创建函数，编写 reducer 函数来处理不同的 action，然后使用 createStore 函数创建 store。组件需要通过 connect 高阶组件或者 useSelector、useDispatch 等钩子来连接到 store 并获取状态和分发 action。
- 性能优化通常需要手动进行，例如使用 reselect 库来创建记忆化的选择器，避免不必要的重新计算。

### 3. MobX

- MobX 是一个用于管理应用状态的库，它遵循响应式编程模式。
- MobX 的核心概念是 observable，它是一个可观察的状态单元。通过 observable，我们可以将状态与组件关联起来，并在组件中读取和更新状态。
- MobX 的另一个核心概念是 action，它是一个描述状态变化的普通对象。通过 action，我们可以将状态的变化与组件解耦，使得状态的变化更加可预测和可追踪。
- MobX 的优点是简单易用，它遵循响应式编程模式，使得状态的变化更加可预测和可追踪。同时，MobX 的性能也非常优秀，它使用了代理（Proxy）和观察者（Observer）模式，可以避免不必要的重新渲染。
- MobX 的缺点是相对于 Redux 来说，它的功能相对较少，不支持中间件、异步操作等高级功能。同时，MobX 的学习曲线相对较陡，需要一定的学习成本。

### 4. Recoil vs Redux vs MobX

- Recoil、Redux 和 MobX 都是用于管理应用状态的库，它们都遵循 Flux 架构模式。
- Recoil、Redux 和 MobX 的核心概念都是 store、action 和 observable。
- Recoil、Redux 和 MobX 的优点和缺点各不相同，需要根据具体的应用场景和需求来选择合适的库。

## scheduler 调度机制原理

### 1. 为什么需要调度器

在浏览器环境中，JavaScript 的执行是单线程的，而浏览器中的渲染、事件处理、网络请求等都是异步的。因此，当我们在 React 中更新组件时，React 需要协调这些更新，并确定更新顺序，然后按照正确的顺序渲染组件。这个过程需要大量的计算和协调，可能会导致性能问题。
为了解决这个问题，React 引入了调度器（scheduler）机制。调度器的作用是协调 React 的更新，并确定更新顺序，然后按照正确的顺序渲染组件。调度器可以确保 React 的更新不会阻塞浏览器的渲染，从而提高性能。

### 2. 调度器的工作原理

调度器的工作原理可以分为以下几个步骤：

1. 当 React 需要更新组件时，它会将更新任务添加到调度器中。
2. 调度器会根据任务的优先级，确定任务的执行顺序。
3. 调度器会根据浏览器的空闲时间，确定任务的执行时机。
4. 当浏览器有空闲时间时，调度器会从任务队列中取出任务，并执行任务。
5. 任务执行完成后，调度器会继续执行下一个任务，直到任务队列为空。

### 3. 调度器的实现

调度器的实现可以分为以下几个部分：

1. 任务队列：调度器使用一个任务队列来存储待执行的任务。任务队列中的任务按照优先级排序，优先级高的任务会优先执行。
2. 任务优先级：调度器使用任务优先级来确定任务的执行顺序。任务优先级分为三种：Immediate、UserBlocking、Normal。Immediate 优先级最高，UserBlocking 优先级次之，Normal 优先级最低。
3. 浏览器空闲时间：调度器使用 requestIdleCallback API 来确定浏览器的空闲时间。当浏览器有空闲时间时，调度器会从任务队列中取出任务，并执行任务。
4. 任务执行：调度器使用 requestAnimationFrame API 来执行任务。当浏览器准备好渲染下一帧时，调度器会从任务队列中取出任务，并执行任务。

### 4. 调度器的使用

调度器可以在 React 中通过 useTransition API 来使用。useTransition API 可以接受一个回调函数和一个可选的配置对象作为参数。回调函数中可以包含需要更新的组件，配置对象中可以设置任务的优先级。

```javascript
import { useTransition } from "react";

function MyComponent() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      // 更新组件
    });
  }

  return (
    <button onClick={handleClick}>
      {isPending ? "Loading..." : "Click me"}
    </button>
  );
}
```

在上面的例子中，当用户点击按钮时，startTransition 函数会启动一个过渡任务，并将需要更新的组件传递给回调函数。回调函数中的代码会在过渡任务中执行，而不会阻塞主线程。同时，isPending 状态会根据过渡任务的执行状态进行更新，从而实现过渡效果。

### 5. 总结

React 18 引入了新的调度器，用于优化组件的更新过程。调度器通过任务队列和任务优先级来管理任务的执行顺序，并通过 requestIdleCallback 和 requestAnimationFrame API 来确定浏览器的空闲时间。调度器可以在 React 中通过 useTransition API 来使用，从而实现过渡效果。

## useRef 怎么实现的

useRef 是 React 提供的一个 Hook，用于在函数组件中创建一个可变的引用对象。useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象将在组件的整个生命周期内保持不变。

useRef 的实现原理如下：

1. 在函数组件中调用 useRef 时，React 会创建一个 ref 对象，并将其存储在组件的 fiber 节点中。
2. 当组件重新渲染时，React 会从 fiber 节点中取出之前存储的 ref 对象，并将其返回给函数组件。
3. 当 ref 对象的 .current 属性被修改时，React 不会重新渲染组件，因为 ref 对象是可变的，不会触发组件的重新渲染。

```javascript
function useRef(initialValue) {
  const fiber = getCurrentFiber();
  if (!fiber.ref) {
    fiber.ref = { current: initialValue };
  }
  return fiber.ref;
}
```

在上面的代码中，useRef 函数会获取当前组件的 fiber 节点，并检查该节点是否已经存在 ref 对象。如果不存在，则创建一个新的 ref 对象，并将其存储在 fiber 节点中。最后，返回该 ref 对象。

## React18 新特性

### 1. Concurrent Mode

Concurrent Mode 是 React 18 的新特性之一，它允许 React 在多个任务之间进行切换，从而提高应用的性能和响应速度。Concurrent Mode 通过调度器（Scheduler）来实现任务的调度和切换。

### 2. startTransition

startTransition 是 React 18 的新特性之一，它允许开发者将某些更新标记为过渡更新，从而提高应用的性能和响应速度。过渡更新是指那些不会立即影响用户界面的更新，例如数据加载、数据筛选等。

### 3. useDeferredValue

useDeferredValue 是 React 18 的新特性之一，它允许开发者将某个值延迟更新，从而提高应用的性能和响应速度。useDeferredValue 返回一个延迟更新的值，当该值发生变化时，React 会将其标记为过渡更新，并在下一个空闲时间进行更新。

### 4. useId

useId 是 React 18 的新特性之一，它用于生成唯一的 ID，可以用于无障碍访问（accessibility）属性。useId 会生成一个稳定的、在服务端和客户端保持一致的唯一 ID。

```javascript
import { useId } from 'react';

function MyComponent() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>姓名</label>
      <input id={id} type="text" />
    </div>
  );
}
```

### 5. Automatic Batching（自动批处理）

React 18 默认对所有更新进行批处理，包括 Promise、setTimeout、原生事件处理程序等。这意味着多个状态更新会被合并成一次重新渲染，从而提高性能。

```javascript
// React 18 之前，只有在 React 事件处理程序中的更新会被批处理
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 17 会渲染两次，React 18 只渲染一次
}, 1000);
```

### 6. Suspense

React 18 增强了 Suspense 的功能，现在可以在服务端渲染（SSR）中使用 Suspense。

## React 核心概念

### 1. 什么是 React

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发和维护。它采用组件化的开发模式，使得代码更加模块化、可复用和易于维护。

**React 的核心特点：**
- 声明式编程：描述 UI 应该是什么样子，而不是如何去实现
- 组件化：将 UI 拆分成独立、可复用的组件
- 虚拟 DOM：通过虚拟 DOM 提高渲染性能
- 单向数据流：数据从父组件流向子组件

### 2. JSX

JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码。JSX 会被编译成 React.createElement() 函数调用。

```javascript
// JSX
const element = <h1>Hello, world!</h1>;

// 编译后
const element = React.createElement('h1', null, 'Hello, world!');
```

**JSX 的注意事项：**
- JSX 必须有一个根元素（或使用 Fragment）
- className 代替 class
- 使用驼峰命名法（camelCase）
- 可以在 {} 中嵌入 JavaScript 表达式
- 注释使用 {/* */}

### 3. 虚拟 DOM (Virtual DOM)

虚拟 DOM 是 React 的核心概念之一，它是真实 DOM 的 JavaScript 对象表示。

**工作原理：**
1. 当状态发生变化时，React 会创建新的虚拟 DOM 树
2. 通过 Diff 算法比较新旧虚拟 DOM 树的差异
3. 将差异批量更新到真实 DOM 中

**优点：**
- 减少直接操作 DOM 的次数，提高性能
- 跨平台能力（React Native）
- 声明式编程，代码更易维护

### 4. Diff 算法

React 的 Diff 算法用于比较两棵虚拟 DOM 树的差异，采用了三个策略来优化性能：

**策略一：Tree Diff**
- 只会对同一层级的节点进行比较，不会跨层级比较
- 如果节点不存在了，则该节点及其子节点会被完全删除

**策略二：Component Diff**
- 如果是同一类型的组件，继续按照原策略比较虚拟 DOM
- 如果不是同一类型的组件，则将该组件标记为 dirty component，并替换整个组件

**策略三：Element Diff**
- 对于同一层级的子节点，通过 key 来进行区分
- 三种操作：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）、REMOVE_NODE（删除）

**为什么需要 key：**
```javascript
// 没有 key 的情况
// 旧：<li>A</li><li>B</li>
// 新：<li>C</li><li>A</li><li>B</li>
// React 会修改前两个 li，并插入新的 li

// 有 key 的情况
// 旧：<li key="A">A</li><li key="B">B</li>
// 新：<li key="C">C</li><li key="A">A</li><li key="B">B</li>
// React 会直接插入新的 li，保留原有的 li
```

### 5. Fiber 架构

Fiber 是 React 16 引入的新的协调引擎，用于实现增量渲染。

**为什么需要 Fiber：**
- React 15 的协调过程是同步的、递归的，一旦开始就无法中断
- 对于大型应用，可能会导致主线程被长时间占用，造成页面卡顿

**Fiber 的特点：**
- 可中断的渲染：将渲染工作分解成多个小任务
- 优先级调度：不同的更新有不同的优先级
- 时间切片：利用浏览器的空闲时间进行渲染

**Fiber 节点的数据结构：**
```javascript
{
  type: 'div',           // 节点类型
  key: null,             // key
  props: {},             // props
  stateNode: null,       // 真实 DOM 节点
  return: null,          // 父 Fiber 节点
  child: null,           // 第一个子 Fiber 节点
  sibling: null,         // 下一个兄弟 Fiber 节点
  alternate: null,       // 上一次的 Fiber 节点
  effectTag: 'UPDATE',   // 副作用标记
}
```

**双缓存机制：**
- current Fiber 树：当前显示在页面上的 Fiber 树
- workInProgress Fiber 树：正在构建的 Fiber 树
- 通过 alternate 属性连接两棵树
- 渲染完成后，workInProgress 树变成 current 树

## React Hooks

### 1. useState

useState 是最常用的 Hook，用于在函数组件中添加状态。

```javascript
const [state, setState] = useState(initialState);

// 函数式更新
setState(prevState => prevState + 1);

// 惰性初始化
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation();
  return initialState;
});
```

**注意事项：**
- setState 是异步的，不会立即更新状态
- 多次调用 setState 会被合并（批处理）
- 如果新状态与旧状态相同，React 会跳过渲染

### 2. useEffect

useEffect 用于处理副作用，相当于 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合。

```javascript
useEffect(() => {
  // 副作用代码
  
  return () => {
    // 清理函数
  };
}, [dependencies]);
```

**执行时机：**
- 没有依赖数组：每次渲染后执行
- 空依赖数组 []：只在组件挂载时执行一次
- 有依赖数组：依赖项变化时执行

**常见用途：**
- 数据获取
- 订阅事件
- 手动操作 DOM
- 定时器

### 3. useLayoutEffect

useLayoutEffect 与 useEffect 类似，但它会在所有 DOM 变更之后同步执行。

```javascript
useLayoutEffect(() => {
  // 同步执行的副作用
}, [dependencies]);
```

**与 useEffect 的区别：**
- useEffect：异步执行，不会阻塞浏览器绘制
- useLayoutEffect：同步执行，会阻塞浏览器绘制
- useLayoutEffect 的执行时机更早，在浏览器绘制之前

**使用场景：**
- 需要在渲染前读取 DOM 布局并同步触发重渲染
- 避免闪烁问题

### 4. useMemo

useMemo 用于缓存计算结果，避免不必要的重复计算。

```javascript
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]);
```

**使用场景：**
- 计算开销大的操作
- 避免子组件不必要的重新渲染（传递引用类型的 props）

### 5. useCallback

useCallback 用于缓存函数，避免函数在每次渲染时重新创建。

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

**与 useMemo 的区别：**
- useMemo 缓存计算结果
- useCallback 缓存函数本身
- useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

### 6. useContext

useContext 用于在组件树中共享数据，避免 props 层层传递。

```javascript
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>当前主题：{theme}</div>;
}
```

### 7. useReducer

useReducer 是 useState 的替代方案，适用于复杂的状态逻辑。

```javascript
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

**useReducer vs useState：**
- 状态逻辑复杂时使用 useReducer
- 多个子值或下一个状态依赖之前的状态时使用 useReducer
- 简单状态使用 useState

### 8. 自定义 Hook

自定义 Hook 可以将组件逻辑提取到可复用的函数中。

```javascript
// 自定义 Hook：useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// 使用
function App() {
  const [name, setName] = useLocalStorage('name', 'Bob');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

**自定义 Hook 的规则：**
- 必须以 "use" 开头
- 只能在函数组件或其他 Hook 中调用
- 不能在条件语句、循环或嵌套函数中调用

### 9. Hook 使用规则

**两个核心规则：**
1. 只在最顶层使用 Hook（不要在循环、条件或嵌套函数中调用）
2. 只在 React 函数组件或自定义 Hook 中调用 Hook

**为什么有这些规则：**
- React 依赖 Hook 的调用顺序来正确管理状态
- 如果在条件语句中调用 Hook，会导致调用顺序不一致
- React 使用链表来存储 Hook 的状态

## 组件

### 1. 类组件 vs 函数组件

**类组件：**
```javascript
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    // 组件挂载后
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

**函数组件：**
```javascript
function Welcome(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 组件挂载后
  }, []);

  return <h1>Hello, {props.name}</h1>;
}
```

**区别：**
- 类组件有生命周期方法，函数组件使用 Hook
- 类组件需要 this，函数组件不需要
- 函数组件代码更简洁
- 函数组件性能更好（没有 this 绑定）

### 2. 受控组件 vs 非受控组件

**受控组件：**
表单数据由 React 组件来管理。

```javascript
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
```

**非受控组件：**
表单数据由 DOM 本身管理，使用 ref 获取值。

```javascript
function UncontrolledInput() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return <input ref={inputRef} />;
}
```

**选择建议：**
- 大多数情况下使用受控组件
- 文件上传必须使用非受控组件
- 与非 React 代码集成时可以使用非受控组件

### 3. 高阶组件 (HOC)

高阶组件是一个函数，接收一个组件作为参数，返回一个新的组件。

```javascript
// HOC 示例：添加日志功能
function withLogging(WrappedComponent) {
  return function EnhancedComponent(props) {
    useEffect(() => {
      console.log('组件已挂载');
      return () => console.log('组件已卸载');
    }, []);

    return <WrappedComponent {...props} />;
  };
}

// 使用
const EnhancedComponent = withLogging(MyComponent);
```

**常见用途：**
- 代码复用、逻辑抽象
- 渲染劫持
- 状态抽象和操作
- Props 操作

**注意事项：**
- 不要在 render 方法中使用 HOC
- 必须将不相关的 props 传递给被包装组件
- 最大化组合性
- 包装显示名称以便调试

### 4. Render Props

Render Props 是一种在 React 组件之间共享代码的技术。

```javascript
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// 使用
<MouseTracker render={({ x, y }) => (
  <h1>鼠标位置：({x}, {y})</h1>
)} />
```

**优点：**
- 更灵活的代码复用
- 解决了 HOC 的一些问题（props 命名冲突、静态方法丢失等）

**缺点：**
- 嵌套过深会导致回调地狱
- 现在更推荐使用 Hooks

### 5. 组件通信

**父子组件通信：**
```javascript
// 父传子：通过 props
<Child name="张三" />

// 子传父：通过回调函数
<Child onChange={(value) => console.log(value)} />
```

**跨层级组件通信：**
```javascript
// Context API
const ThemeContext = React.createContext();

// Provider
<ThemeContext.Provider value="dark">
  <Child />
</ThemeContext.Provider>

// Consumer
const theme = useContext(ThemeContext);
```

**兄弟组件通信：**
- 通过共同的父组件传递
- 使用状态管理库（Redux、MobX 等）
- 使用 Context API
- 使用事件总线（不推荐）

## 生命周期

### 1. 类组件生命周期

**挂载阶段：**
1. constructor()
2. static getDerivedStateFromProps()
3. render()
4. componentDidMount()

**更新阶段：**
1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()

**卸载阶段：**
1. componentWillUnmount()

**错误处理：**
1. static getDerivedStateFromError()
2. componentDidCatch()

### 2. 生命周期方法详解

```javascript
class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('constructor');
  }

  static getDerivedStateFromProps(props, state) {
    // 根据 props 更新 state
    console.log('getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    // 组件挂载后：发送网络请求、订阅事件
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 性能优化：决定是否重新渲染
    console.log('shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 在 DOM 更新前获取快照
    console.log('getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 组件更新后
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    // 组件卸载前：清理定时器、取消订阅
    console.log('componentWillUnmount');
  }

  render() {
    console.log('render');
    return <div>{this.state.count}</div>;
  }
}
```

### 3. 函数组件生命周期（Hooks）

```javascript
function LifecycleDemo() {
  // componentDidMount
  useEffect(() => {
    console.log('组件挂载');
  }, []);

  // componentDidUpdate
  useEffect(() => {
    console.log('组件更新');
  });

  // componentWillUnmount
  useEffect(() => {
    return () => {
      console.log('组件卸载');
    };
  }, []);

  // 监听特定 props 或 state
  useEffect(() => {
    console.log('count 变化');
  }, [count]);
}
```

## 性能优化

### 1. React.memo

React.memo 是一个高阶组件，用于优化函数组件的性能。

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
});

// 自定义比较函数
const MyComponent = React.memo(
  function MyComponent(props) {
    return <div>{props.name}</div>;
  },
  (prevProps, nextProps) => {
    // 返回 true 表示不重新渲染
    return prevProps.name === nextProps.name;
  }
);
```

### 2. PureComponent

PureComponent 自动实现了 shouldComponentUpdate，进行浅比较。

```javascript
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.name}</div>;
  }
}
```

### 3. shouldComponentUpdate

手动控制组件是否重新渲染。

```javascript
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 只有当 name 发生变化时才重新渲染
    return this.props.name !== nextProps.name;
  }

  render() {
    return <div>{this.props.name}</div>;
  }
}
```

### 4. 列表渲染优化

```javascript
// 使用唯一且稳定的 key
{items.map(item => (
  <Item key={item.id} data={item} />
))}

// 不要使用索引作为 key（除非列表是静态的）
// 错误示例
{items.map((item, index) => (
  <Item key={index} data={item} />
))}
```

### 5. 代码分割

**使用 React.lazy 和 Suspense：**
```javascript
import React, { lazy, Suspense } from 'react';

const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

**路由级别的代码分割：**
```javascript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 6. 虚拟列表

对于长列表，只渲染可见区域的元素。

```javascript
import { FixedSizeList } from 'react-window';

function MyList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index]}</div>
      )}
    </FixedSizeList>
  );
}
```

### 7. 防抖和节流

```javascript
import { useMemo } from 'react';
import { debounce } from 'lodash';

function SearchComponent() {
  const [query, setQuery] = useState('');

  // 防抖
  const debouncedSearch = useMemo(
    () => debounce((value) => {
      // 执行搜索
      console.log('搜索:', value);
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return <input value={query} onChange={handleChange} />;
}
```

### 8. 避免内联函数和对象

```javascript
// 不好的做法
function Parent() {
  return <Child onClick={() => console.log('clicked')} style={{ color: 'red' }} />;
}

// 好的做法
function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  const style = useMemo(() => ({ color: 'red' }), []);

  return <Child onClick={handleClick} style={style} />;
}
```

## 事件系统

### 1. 合成事件

React 实现了自己的事件系统，称为合成事件（SyntheticEvent）。

**特点：**
- 跨浏览器兼容
- 事件委托：所有事件都绑定到根节点
- 事件池：React 17 之前使用事件池复用事件对象
- React 17 之后不再使用事件池

```javascript
function handleClick(e) {
  e.preventDefault(); // 阻止默认行为
  e.stopPropagation(); // 阻止冒泡
  console.log(e.nativeEvent); // 访问原生事件
}

<button onClick={handleClick}>点击</button>
```

### 2. 事件处理

```javascript
// 类组件
class MyComponent extends React.Component {
  handleClick = () => {
    console.log(this); // this 指向组件实例
  }

  render() {
    return <button onClick={this.handleClick}>点击</button>;
  }
}

// 函数组件
function MyComponent() {
  const handleClick = () => {
    console.log('clicked');
  };

  return <button onClick={handleClick}>点击</button>;
}
```

### 3. 传递参数

```javascript
// 方法一：箭头函数
<button onClick={() => handleClick(id)}>删除</button>

// 方法二：bind
<button onClick={handleClick.bind(this, id)}>删除</button>

// 方法三：使用 data 属性
<button data-id={id} onClick={handleClick}>删除</button>
function handleClick(e) {
  const id = e.currentTarget.dataset.id;
}
```

## 路由

### 1. React Router 基础

```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 2. 路由 Hooks

```javascript
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';

function MyComponent() {
  // 编程式导航
  const navigate = useNavigate();
  navigate('/home');
  navigate(-1); // 后退

  // 获取路由参数
  const { id } = useParams();

  // 获取 location 对象
  const location = useLocation();
  console.log(location.pathname);

  // 获取和设置查询参数
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  setSearchParams({ query: 'new value' });
}
```

### 3. 路由守卫

```javascript
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
}

// 使用
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
```

### 4. 嵌套路由

```javascript
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="users" element={<Users />}>
      <Route path=":id" element={<UserDetail />} />
    </Route>
  </Route>
</Routes>

// Layout 组件
function Layout() {
  return (
    <div>
      <nav>...</nav>
      <Outlet /> {/* 渲染子路由 */}
    </div>
  );
}
```

## 常见面试题

### 1. React 和 Vue 的区别

**相同点：**
- 都使用虚拟 DOM
- 都是组件化开发
- 都支持服务端渲染

**不同点：**
- 数据流：React 单向数据流，Vue 双向绑定
- 模板语法：React 使用 JSX，Vue 使用模板
- 状态管理：React 使用 setState/useState，Vue 使用响应式系统
- 性能优化：React 需要手动优化（memo、useMemo），Vue 自动追踪依赖

### 2. setState 是同步还是异步

在 React 18 之前：
- 在 React 事件处理程序中是异步的（批处理）
- 在 setTimeout、Promise、原生事件中是同步的

在 React 18 之后：
- 默认所有更新都是异步的（自动批处理）
- 可以使用 flushSync 强制同步更新

```javascript
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(count + 1);
  });
  // 此时 DOM 已经更新
}
```

### 3. 为什么 useState 返回数组而不是对象

- 数组可以自由命名变量
- 对象需要使用固定的属性名或者解构重命名

```javascript
// 数组：可以自由命名
const [count, setCount] = useState(0);
const [age, setAge] = useState(0);

// 如果是对象
const { state: count, setState: setCount } = useState(0);
const { state: age, setState: setAge } = useState(0); // 需要重命名
```

### 4. React 如何实现组件复用

1. 高阶组件（HOC）
2. Render Props
3. 自定义 Hooks（推荐）
4. 组件组合

### 5. React 中的 key 有什么作用

- key 帮助 React 识别哪些元素改变了（添加、删除、修改）
- 在 Diff 算法中，React 使用 key 来匹配新旧节点
- key 应该是稳定的、唯一的
- 不要使用索引作为 key（除非列表是静态的）

### 6. React 中的 refs 有什么用

- 访问 DOM 节点或 React 元素
- 存储不需要触发重新渲染的可变值
- 与第三方 DOM 库集成

```javascript
function TextInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

### 7. 如何避免组件重复渲染

1. 使用 React.memo
2. 使用 useMemo 缓存计算结果
3. 使用 useCallback 缓存函数
4. 使用 PureComponent
5. 合理拆分组件
6. 使用不可变数据

### 8. React Portal 是什么

Portal 提供了一种将子节点渲染到父组件 DOM 层次结构之外的方法。

```javascript
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
}
```

**使用场景：**
- 模态框
- 提示框
- 悬浮卡片

### 9. React 错误边界

错误边界是一种 React 组件，可以捕获其子组件树中的 JavaScript 错误。

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// 使用
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

**注意：**
- 错误边界只能是类组件
- 无法捕获事件处理程序中的错误
- 无法捕获异步代码中的错误
- 无法捕获自身的错误

### 10. React 18 的并发特性

**Concurrent Rendering（并发渲染）：**
- 可中断的渲染
- React 可以同时准备多个版本的 UI

**新的 API：**
- startTransition：标记非紧急更新
- useDeferredValue：延迟更新某个值
- useTransition：获取过渡状态

```javascript
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);

    // 标记为非紧急更新
    startTransition(() => {
      const newList = generateList(e.target.value);
      setList(newList);
    });
  };

  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending ? <div>加载中...</div> : <List items={list} />}
    </>
  );
}
```

## 服务端渲染（SSR）

### 1. 什么是 SSR

服务端渲染是指在服务器端将 React 组件渲染成 HTML 字符串，然后发送给客户端。

**优点：**
- SEO 友好
- 首屏加载速度快
- 更好的用户体验

**缺点：**
- 服务器压力大
- 开发复杂度高
- 某些生命周期方法不能使用

### 2. Next.js

Next.js 是一个 React 框架，支持服务端渲染和静态站点生成。

```javascript
// pages/index.js
export default function Home({ data }) {
  return <div>{data}</div>;
}

// 服务端渲染
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

// 静态生成
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}
```

## 测试

### 1. React Testing Library

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('renders button and handles click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>点击</Button>);

  const button = screen.getByText('点击');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 2. 测试 Hooks

```javascript
import { renderHook, act } from '@testing-library/react';

test('useCounter', () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

## 最佳实践

### 1. 组件设计原则

- 单一职责原则
- 保持组件简单
- 合理拆分组件
- 使用组合而非继承
- 避免过早优化

### 2. 代码规范

- 使用 ESLint 和 Prettier
- 遵循 React 官方风格指南
- 使用 TypeScript
- 编写测试

### 3. 性能优化建议

- 使用生产版本的 React
- 使用 React DevTools Profiler
- 避免不必要的渲染
- 使用代码分割
- 优化图片和资源加载
- 使用 CDN

### 4. 状态管理建议

- 优先使用组件内部状态
- 需要跨组件共享时使用 Context
- 复杂应用使用 Redux/MobX/Zustand
- 服务端状态使用 React Query/SWR
