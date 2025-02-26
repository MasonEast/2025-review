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
