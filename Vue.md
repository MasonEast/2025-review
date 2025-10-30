# Vue 面试题

## Vue 基础概念

### 1. 什么是 Vue

Vue.js 是一个用于构建用户界面的渐进式 JavaScript 框架。由尤雨溪（Evan You）创建。

**核心特点：**
- 渐进式框架：可以逐步采用，从简单到复杂
- 响应式数据绑定：数据变化自动更新视图
- 组件化开发：可复用的组件系统
- 虚拟 DOM：提高性能
- 轻量级：核心库只关注视图层
- 易学易用：API 设计友好

**Vue 的设计理念：**
- 简单：降低学习成本
- 灵活：渐进式采用
- 高效：虚拟 DOM 和优化策略
- 组合：组件化开发

### 2. Vue 的优势

**相比 React：**
- 更简单的模板语法
- 双向数据绑定（v-model）
- 更完整的官方生态（Router、状态管理）
- 更友好的学习曲线
- 中文文档完善

**相比 Angular：**
- 更轻量级
- 更灵活
- 学习曲线更平缓
- 不强制使用 TypeScript

**通用优势：**
- 虚拟 DOM
- 组件化
- 响应式系统
- 完整的生态系统

### 3. MVVM 模式

Vue 采用 MVVM（Model-View-ViewModel）架构模式。

```
View（视图层）
  ↕ （数据绑定）
ViewModel（Vue 实例）
  ↕ （数据操作）
Model（数据层）
```

**各层职责：**
- **Model**：数据模型，存储数据
- **View**：视图层，展示界面
- **ViewModel**：连接层，实现数据绑定和事件监听

**优点：**
- 低耦合：View 和 Model 独立
- 可重用：ViewModel 可复用
- 独立开发：前后端分离
- 可测试：逻辑与视图分离

## Vue 2 vs Vue 3

### 1. 核心差异

**Vue 3 的主要改进：**

**1. 性能提升：**
- 重写虚拟 DOM
- 更快的组件初始化
- 更小的打包体积（Tree-shaking）
- 编译优化（静态提升、Patch flag）

**2. Composition API：**
- 更好的逻辑组织和复用
- 更好的 TypeScript 支持
- 替代 Options API

**3. 响应式系统：**
- 使用 Proxy 替代 Object.defineProperty
- 更好的性能
- 支持动态属性添加

**4. 新特性：**
- Teleport（传送门）
- Fragments（多根节点）
- Suspense（异步组件）
- 更好的 TypeScript 支持

**5. 打包优化：**
- Tree-shaking 友好
- 按需引入
- 更小的体积

### 2. 响应式原理对比

**Vue 2（Object.defineProperty）：**
```javascript
// Vue 2
Object.defineProperty(obj, 'key', {
  get() {
    // 依赖收集
    return value;
  },
  set(newValue) {
    // 派发更新
    value = newValue;
  }
});
```

**限制：**
- 无法检测属性的添加和删除
- 无法检测数组索引和长度的变化
- 需要遍历对象的所有属性

**Vue 3（Proxy）：**
```javascript
// Vue 3
const proxy = new Proxy(target, {
  get(target, key, receiver) {
    // 依赖收集
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    // 派发更新
    const result = Reflect.set(target, key, value, receiver);
    trigger(target, key);
    return result;
  }
});
```

**优势：**
- 可以检测属性的添加和删除
- 可以检测数组索引和长度的变化
- 不需要遍历所有属性
- 性能更好

### 3. API 差异

**创建应用：**
```javascript
// Vue 2
import Vue from 'vue';
new Vue({
  render: h => h(App)
}).$mount('#app');

// Vue 3
import { createApp } from 'vue';
createApp(App).mount('#app');
```

**全局 API：**
```javascript
// Vue 2
Vue.component('my-component', {});
Vue.directive('my-directive', {});
Vue.mixin({});

// Vue 3
const app = createApp(App);
app.component('my-component', {});
app.directive('my-directive', {});
app.mixin({});
```

**生命周期：**
```javascript
// Vue 2
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed

// Vue 3
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeUnmount  // 改名
unmounted      // 改名
```

## 响应式原理

### 1. Vue 2 响应式原理

**核心：Object.defineProperty**

**实现步骤：**
1. 数据劫持：遍历对象属性，使用 Object.defineProperty 劫持
2. 依赖收集：getter 中收集依赖（Watcher）
3. 派发更新：setter 中通知依赖更新

**核心代码：**
```javascript
function defineReactive(obj, key, val) {
  const dep = new Dep(); // 依赖收集器
  
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      // 通知更新
      dep.notify();
    }
  });
}

// 观察者
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}
```

**Dep（依赖收集器）：**
```javascript
class Dep {
  constructor() {
    this.subs = []; // 存储 Watcher
  }
  
  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target);
    }
  }
  
  notify() {
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }
}
```

**Watcher（观察者）：**
```javascript
class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
  }
  
  get() {
    Dep.target = this;
    const value = this.vm[this.exp]; // 触发 getter
    Dep.target = null;
    return value;
  }
  
  update() {
    const newValue = this.vm[this.exp];
    if (newValue !== this.value) {
      this.value = newValue;
      this.cb(newValue);
    }
  }
}
```

**限制：**
- 无法检测对象属性的添加或删除
- 无法检测数组索引和长度的变化
- 需要递归遍历对象

**解决方案：**
```javascript
// 添加属性
Vue.set(obj, 'newProp', value);
this.$set(this.obj, 'newProp', value);

// 数组操作
this.arr.push(item);
this.arr.splice(index, 1, item);
Vue.set(this.arr, index, item);
```

### 2. Vue 3 响应式原理

**核心：Proxy**

**实现步骤：**
1. 使用 Proxy 代理对象
2. 在 get 中收集依赖
3. 在 set 中触发更新

**核心代码：**
```javascript
// reactive
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      // 依赖收集
      track(target, key);
      // 递归代理
      if (typeof result === 'object' && result !== null) {
        return reactive(result);
      }
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      // 触发更新
      if (oldValue !== value) {
        trigger(target, key);
      }
      return result;
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      // 触发更新
      trigger(target, key);
      return result;
    }
  });
}

// ref
function ref(value) {
  return {
    get value() {
      track(this, 'value');
      return value;
    },
    set value(newValue) {
      value = newValue;
      trigger(this, 'value');
    }
  };
}
```

**依赖收集：**
```javascript
// 当前活动的 effect
let activeEffect = null;

// 依赖映射 WeakMap<target, Map<key, Set<effect>>>
const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) return;
  
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  
  dep.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}
```

**优势：**
- 可以检测属性的添加和删除
- 可以检测数组索引和长度的变化
- 懒代理：只在访问时代理
- 性能更好

### 3. computed 和 watch 的实现

**computed（计算属性）：**
```javascript
// Vue 3
function computed(getter) {
  let value;
  let dirty = true; // 缓存标志
  
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true; // 依赖变化时标记为脏
    }
  });
  
  return {
    get value() {
      if (dirty) {
        value = effectFn(); // 重新计算
        dirty = false;
      }
      return value;
    }
  };
}
```

**watch（侦听器）：**
```javascript
// Vue 3
function watch(source, cb, options = {}) {
  let getter;
  
  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
  }
  
  let oldValue;
  
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      const newValue = effectFn();
      cb(newValue, oldValue);
      oldValue = newValue;
    }
  });
  
  if (options.immediate) {
    cb(effectFn(), undefined);
  } else {
    oldValue = effectFn();
  }
}
```

## Options API vs Composition API

### 1. Options API（Vue 2）

**特点：**
- 选项式 API
- 按选项类型组织代码
- this 指向组件实例

**示例：**
```javascript
export default {
  data() {
    return {
      count: 0,
      user: null
    };
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    }
  },
  watch: {
    count(newVal, oldVal) {
      console.log('count changed:', newVal);
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    async fetchUser() {
      this.user = await api.getUser();
    }
  },
  mounted() {
    this.fetchUser();
  }
};
```

**优点：**
- 结构清晰
- 易于理解
- 适合简单组件

**缺点：**
- 逻辑分散
- 复用困难
- this 指向问题
- TypeScript 支持不好

### 2. Composition API（Vue 3）

**特点：**
- 组合式 API
- 按逻辑关注点组织代码
- 使用 setup 函数

**示例：**
```javascript
import { ref, computed, watch, onMounted } from 'vue';

export default {
  setup() {
    // 响应式数据
    const count = ref(0);
    const user = ref(null);
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2);
    
    // 侦听器
    watch(count, (newVal, oldVal) => {
      console.log('count changed:', newVal);
    });
    
    // 方法
    const increment = () => {
      count.value++;
    };
    
    const fetchUser = async () => {
      user.value = await api.getUser();
    };
    
    // 生命周期
    onMounted(() => {
      fetchUser();
    });
    
    return {
      count,
      user,
      doubleCount,
      increment
    };
  }
};
```

**优点：**
- 逻辑聚合
- 更好的复用（组合式函数）
- 更好的 TypeScript 支持
- 更灵活

**缺点：**
- 学习成本
- ref 和 reactive 的选择

### 3. 组合式函数（Composables）

抽取可复用的逻辑。

**示例：useCounter**
```javascript
// composables/useCounter.js
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  const doubleCount = computed(() => count.value * 2);
  
  const increment = () => {
    count.value++;
  };
  
  const decrement = () => {
    count.value--;
  };
  
  const reset = () => {
    count.value = initialValue;
  };
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  };
}
```

**使用：**
```javascript
import { useCounter } from '@/composables/useCounter';

export default {
  setup() {
    const { count, doubleCount, increment } = useCounter(10);
    
    return {
      count,
      doubleCount,
      increment
    };
  }
};
```

**其他常见组合式函数：**

**useFetch：**
```javascript
import { ref } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);
  
  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await fetch(url);
      data.value = await response.json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };
  
  return {
    data,
    error,
    loading,
    fetchData
  };
}
```

**useLocalStorage：**
```javascript
import { ref, watch } from 'vue';

export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue);
  
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });
  
  return value;
}
```

## 组件系统

### 1. 组件注册

**全局注册：**
```javascript
// Vue 3
import { createApp } from 'vue';
import MyComponent from './MyComponent.vue';

const app = createApp(App);
app.component('MyComponent', MyComponent);
```

**局部注册：**
```javascript
import MyComponent from './MyComponent.vue';

export default {
  components: {
    MyComponent
  }
};
```

### 2. 组件通信

**1. Props（父传子）：**
```vue
<!-- 父组件 -->
<template>
  <Child :message="msg" :count="10" />
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello'
    };
  }
};
</script>

<!-- 子组件 -->
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: '',
      validator(value) {
        return value.length > 0;
      }
    },
    count: Number
  }
};
</script>
```

**2. Emit（子传父）：**
```vue
<!-- 子组件 -->
<template>
  <button @click="handleClick">点击</button>
</template>

<script>
export default {
  emits: ['custom-event'],
  methods: {
    handleClick() {
      this.$emit('custom-event', 'data');
    }
  }
};
</script>

<!-- 父组件 -->
<template>
  <Child @custom-event="handleEvent" />
</template>

<script>
export default {
  methods: {
    handleEvent(data) {
      console.log(data);
    }
  }
};
</script>
```

**3. v-model（双向绑定）：**
```vue
<!-- 父组件 -->
<template>
  <CustomInput v-model="searchText" />
  <!-- 等价于 -->
  <CustomInput 
    :modelValue="searchText"
    @update:modelValue="searchText = $event"
  />
</template>

<!-- 子组件 -->
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
};
</script>
```

**4. Provide / Inject（跨层级）：**
```javascript
// 祖先组件
export default {
  provide() {
    return {
      message: 'Hello',
      theme: this.theme // 注意：不是响应式的
    };
  }
};

// Vue 3 响应式 provide
import { provide, ref } from 'vue';

export default {
  setup() {
    const theme = ref('dark');
    provide('theme', theme); // 响应式
  }
};

// 后代组件
export default {
  inject: ['message', 'theme']
};

// Vue 3
import { inject } from 'vue';

export default {
  setup() {
    const theme = inject('theme');
    return { theme };
  }
};
```

**5. EventBus（事件总线）：**
```javascript
// Vue 2
const EventBus = new Vue();

// 发送事件
EventBus.$emit('event-name', data);

// 监听事件
EventBus.$on('event-name', (data) => {
  console.log(data);
});

// Vue 3（需要使用第三方库或自己实现）
import mitt from 'mitt';
const emitter = mitt();

// 发送
emitter.emit('event-name', data);

// 监听
emitter.on('event-name', (data) => {
  console.log(data);
});
```

**6. $refs（父访问子）：**
```vue
<template>
  <Child ref="childRef" />
</template>

<script>
export default {
  mounted() {
    this.$refs.childRef.childMethod();
  }
};
</script>
```

**7. $parent / $root（不推荐）：**
```javascript
// 访问父组件
this.$parent.parentMethod();

// 访问根组件
this.$root.rootMethod();
```

**8. Vuex / Pinia（状态管理）：**
适用于复杂的状态管理。

### 3. 插槽（Slots）

**默认插槽：**
```vue
<!-- 子组件 -->
<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<!-- 父组件 -->
<template>
  <Child>
    <p>插槽内容</p>
  </Child>
</template>
```

**具名插槽：**
```vue
<!-- 子组件 -->
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<!-- 父组件 -->
<template>
  <Child>
    <template #header>
      <h1>标题</h1>
    </template>
    
    <p>默认内容</p>
    
    <template #footer>
      <p>页脚</p>
    </template>
  </Child>
</template>
```

**作用域插槽：**
```vue
<!-- 子组件 -->
<template>
  <div>
    <slot :user="user" :count="count"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: { name: 'John' },
      count: 10
    };
  }
};
</script>

<!-- 父组件 -->
<template>
  <Child>
    <template #default="{ user, count }">
      <p>{{ user.name }} - {{ count }}</p>
    </template>
  </Child>
</template>
```

### 4. 动态组件

```vue
<template>
  <component :is="currentComponent" />
  
  <button @click="currentComponent = 'ComponentA'">A</button>
  <button @click="currentComponent = 'ComponentB'">B</button>
</template>

<script>
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

export default {
  components: {
    ComponentA,
    ComponentB
  },
  data() {
    return {
      currentComponent: 'ComponentA'
    };
  }
};
</script>
```

**keep-alive（缓存组件）：**
```vue
<template>
  <keep-alive :include="['ComponentA']" :exclude="['ComponentB']">
    <component :is="currentComponent" />
  </keep-alive>
</template>
```

### 5. 异步组件

**Vue 3：**
```javascript
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() =>
  import('./MyComponent.vue')
);

// 带选项
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./MyComponent.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
});
```

**Vue 2：**
```javascript
const AsyncComponent = () => import('./MyComponent.vue');

// 带选项
const AsyncComponent = () => ({
  component: import('./MyComponent.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000
});
```

## 生命周期

### 1. Vue 2 生命周期

```javascript
export default {
  beforeCreate() {
    // 实例初始化之后，数据观测和事件配置之前
    // 无法访问 data、methods
  },
  created() {
    // 实例创建完成，数据观测和事件配置完成
    // 可以访问 data、methods
    // 无法访问 DOM
  },
  beforeMount() {
    // 挂载之前，render 函数首次被调用
  },
  mounted() {
    // 挂载完成，可以访问 DOM
    // 适合：DOM 操作、API 请求、定时器
  },
  beforeUpdate() {
    // 数据更新时，DOM 更新之前
  },
  updated() {
    // DOM 更新完成
    // 避免在此修改数据，可能导致死循环
  },
  beforeDestroy() {
    // 实例销毁之前
    // 适合：清理定时器、取消订阅、解绑事件
  },
  destroyed() {
    // 实例销毁完成
  },
  // keep-alive 专属
  activated() {
    // 被 keep-alive 缓存的组件激活时调用
  },
  deactivated() {
    // 被 keep-alive 缓存的组件停用时调用
  },
  // 错误捕获
  errorCaptured(err, vm, info) {
    // 捕获子孙组件的错误
    return false; // 阻止错误继续向上传播
  }
};
```

### 2. Vue 3 生命周期

**Options API：**
```javascript
export default {
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // 改名
  unmounted() {},     // 改名
  activated() {},
  deactivated() {},
  errorCaptured() {}
};
```

**Composition API：**
```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured
} from 'vue';

export default {
  setup() {
    // 注意：没有 beforeCreate 和 created
    // setup 本身就在这两个钩子之间执行
    
    onBeforeMount(() => {
      console.log('before mount');
    });
    
    onMounted(() => {
      console.log('mounted');
    });
    
    onBeforeUpdate(() => {
      console.log('before update');
    });
    
    onUpdated(() => {
      console.log('updated');
    });
    
    onBeforeUnmount(() => {
      console.log('before unmount');
    });
    
    onUnmounted(() => {
      console.log('unmounted');
    });
  }
};
```

### 3. 生命周期流程图

```
创建阶段
  ├─ beforeCreate
  ├─ created
  ├─ beforeMount
  └─ mounted

更新阶段
  ├─ beforeUpdate
  └─ updated

销毁阶段
  ├─ beforeUnmount/beforeDestroy
  └─ unmounted/destroyed

keep-alive
  ├─ activated
  └─ deactivated
```

### 4. 父子组件生命周期执行顺序

**挂载阶段：**
```
父 beforeCreate
父 created
父 beforeMount
  子 beforeCreate
  子 created
  子 beforeMount
  子 mounted
父 mounted
```

**更新阶段：**
```
父 beforeUpdate
  子 beforeUpdate
  子 updated
父 updated
```

**销毁阶段：**
```
父 beforeUnmount
  子 beforeUnmount
  子 unmounted
父 unmounted
```

## 指令

### 1. 内置指令

**v-bind（属性绑定）：**
```vue
<template>
  <!-- 完整写法 -->
  <img v-bind:src="imageSrc" v-bind:alt="imageAlt" />
  
  <!-- 简写 -->
  <img :src="imageSrc" :alt="imageAlt" />
  
  <!-- 动态属性名 -->
  <div :[attrName]="value"></div>
  
  <!-- 绑定对象 -->
  <div v-bind="{ id: 'container', class: 'wrapper' }"></div>
  
  <!-- class 绑定 -->
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>
  <div :class="[activeClass, errorClass]"></div>
  <div :class="[isActive ? activeClass : '', errorClass]"></div>
  
  <!-- style 绑定 -->
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }"></div>
  <div :style="[baseStyles, overridingStyles]"></div>
</template>
```

**v-on（事件绑定）：**
```vue
<template>
  <!-- 完整写法 -->
  <button v-on:click="handleClick">点击</button>
  
  <!-- 简写 -->
  <button @click="handleClick">点击</button>
  
  <!-- 内联语句 -->
  <button @click="count++">+1</button>
  
  <!-- 传参 -->
  <button @click="handleClick($event, 'arg')">点击</button>
  
  <!-- 事件修饰符 -->
  <button @click.stop="handleClick">阻止冒泡</button>
  <button @click.prevent="handleClick">阻止默认</button>
  <button @click.capture="handleClick">捕获模式</button>
  <button @click.self="handleClick">只在自身触发</button>
  <button @click.once="handleClick">只触发一次</button>
  <button @click.passive="handleClick">被动模式</button>
  
  <!-- 按键修饰符 -->
  <input @keyup.enter="submit" />
  <input @keyup.tab="nextField" />
  <input @keyup.delete="remove" />
  <input @keyup.esc="cancel" />
  <input @keyup.space="handleSpace" />
  <input @keyup.up="handleUp" />
  <input @keyup.down="handleDown" />
  <input @keyup.left="handleLeft" />
  <input @keyup.right="handleRight" />
  
  <!-- 系统修饰符 -->
  <input @keyup.ctrl="handleCtrl" />
  <input @keyup.alt="handleAlt" />
  <input @keyup.shift="handleShift" />
  <input @keyup.meta="handleMeta" />
  
  <!-- 鼠标修饰符 -->
  <button @click.left="handleLeftClick">左键</button>
  <button @click.right="handleRightClick">右键</button>
  <button @click.middle="handleMiddleClick">中键</button>
  
  <!-- 组合修饰符 -->
  <input @keyup.ctrl.enter="submit" />
  
  <!-- 动态事件 -->
  <button @[eventName]="handleEvent">动态事件</button>
</template>
```

**v-model（双向绑定）：**
```vue
<template>
  <!-- 文本输入 -->
  <input v-model="message" />
  
  <!-- 多行文本 -->
  <textarea v-model="text"></textarea>
  
  <!-- 复选框 -->
  <input type="checkbox" v-model="checked" />
  
  <!-- 多个复选框 -->
  <input type="checkbox" value="A" v-model="checkedValues" />
  <input type="checkbox" value="B" v-model="checkedValues" />
  
  <!-- 单选按钮 -->
  <input type="radio" value="A" v-model="picked" />
  <input type="radio" value="B" v-model="picked" />
  
  <!-- 下拉选择 -->
  <select v-model="selected">
    <option value="A">选项 A</option>
    <option value="B">选项 B</option>
  </select>
  
  <!-- 修饰符 -->
  <input v-model.lazy="message" />      <!-- 在 change 时更新 -->
  <input v-model.number="age" />        <!-- 转为数字 -->
  <input v-model.trim="message" />      <!-- 去除首尾空格 -->
  
  <!-- 自定义组件 -->
  <CustomInput v-model="searchText" />
</template>
```

**v-if / v-else-if / v-else（条件渲染）：**
```vue
<template>
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else>其他</div>
  
  <!-- template 分组 -->
  <template v-if="ok">
    <h1>标题</h1>
    <p>内容</p>
  </template>
</template>
```

**v-show（条件显示）：**
```vue
<template>
  <!-- 切换 display 属性 -->
  <div v-show="isVisible">内容</div>
</template>
```

**v-if vs v-show：**

| 特性         | v-if             | v-show   |
| ------------ | ---------------- | -------- |
| 渲染         | 条件为真时才渲染 | 始终渲染 |
| 切换成本     | 高               | 低       |
| 初始渲染成本 | 低               | 高       |
| 使用场景     | 条件很少改变     | 频繁切换 |

**v-for（列表渲染）：**
```vue
<template>
  <!-- 数组 -->
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
  
  <!-- 带索引 -->
  <div v-for="(item, index) in items" :key="item.id">
    {{ index }} - {{ item.name }}
  </div>
  
  <!-- 对象 -->
  <div v-for="(value, key) in object" :key="key">
    {{ key }}: {{ value }}
  </div>
  
  <!-- 带索引的对象 -->
  <div v-for="(value, key, index) in object" :key="key">
    {{ index }}. {{ key }}: {{ value }}
  </div>
  
  <!-- 范围 -->
  <div v-for="n in 10" :key="n">{{ n }}</div>
  
  <!-- template -->
  <template v-for="item in items" :key="item.id">
    <li>{{ item.name }}</li>
    <li>{{ item.age }}</li>
  </template>
</template>
```

**注意：不要在同一元素上使用 v-if 和 v-for**
```vue
<!-- 不推荐 -->
<div v-for="item in items" v-if="item.isActive">
  {{ item.name }}
</div>

<!-- 推荐：使用计算属性 -->
<div v-for="item in activeItems" :key="item.id">
  {{ item.name }}
</div>

<script>
export default {
  computed: {
    activeItems() {
      return this.items.filter(item => item.isActive);
    }
  }
};
</script>
```

**v-text / v-html：**
```vue
<template>
  <!-- v-text -->
  <span v-text="message"></span>
  <!-- 等价于 -->
  <span>{{ message }}</span>
  
  <!-- v-html（注意 XSS 风险） -->
  <div v-html="htmlContent"></div>
</template>
```

**v-pre（跳过编译）：**
```vue
<template>
  <span v-pre>{{ 这不会被编译 }}</span>
</template>
```

**v-once（只渲染一次）：**
```vue
<template>
  <span v-once>{{ message }}</span>
</template>
```

**v-cloak（隐藏未编译的模板）：**
```vue
<style>
[v-cloak] {
  display: none;
}
</style>

<template>
  <div v-cloak>
    {{ message }}
  </div>
</template>
```

### 2. 自定义指令

**全局指令：**
```javascript
// Vue 3
const app = createApp(App);

app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

// Vue 2
Vue.directive('focus', {
  inserted(el) {
    el.focus();
  }
});
```

**局部指令：**
```javascript
export default {
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      }
    }
  }
};
```

**指令钩子：**
```javascript
// Vue 3
{
  created(el, binding, vnode) {},     // 元素创建后
  beforeMount(el, binding, vnode) {}, // 元素挂载前
  mounted(el, binding, vnode) {},     // 元素挂载后
  beforeUpdate(el, binding, vnode) {},// 元素更新前
  updated(el, binding, vnode) {},     // 元素更新后
  beforeUnmount(el, binding, vnode) {},// 元素卸载前
  unmounted(el, binding, vnode) {}    // 元素卸载后
}

// Vue 2
{
  bind(el, binding, vnode) {},        // 第一次绑定时
  inserted(el, binding, vnode) {},    // 插入父节点时
  update(el, binding, vnode) {},      // 更新时
  componentUpdated(el, binding, vnode) {},// 组件更新完成后
  unbind(el, binding, vnode) {}       // 解绑时
}
```

**参数说明：**
- `el`：指令绑定的元素
- `binding`：指令信息对象
  - `value`：指令的绑定值
  - `oldValue`：指令绑定的前一个值
  - `arg`：传给指令的参数
  - `modifiers`：修饰符对象
- `vnode`：虚拟节点

**示例：v-loading**
```javascript
app.directive('loading', {
  mounted(el, binding) {
    if (binding.value) {
      const loadingEl = document.createElement('div');
      loadingEl.className = 'loading';
      loadingEl.innerText = '加载中...';
      el.appendChild(loadingEl);
      el.style.position = 'relative';
    }
  },
  updated(el, binding) {
    const loadingEl = el.querySelector('.loading');
    if (binding.value && !loadingEl) {
      const loadingEl = document.createElement('div');
      loadingEl.className = 'loading';
      loadingEl.innerText = '加载中...';
      el.appendChild(loadingEl);
    } else if (!binding.value && loadingEl) {
      el.removeChild(loadingEl);
    }
  }
});

// 使用
<div v-loading="isLoading">内容</div>
```

**示例：v-permission（权限控制）**
```javascript
app.directive('permission', {
  mounted(el, binding) {
    const { value } = binding;
    const permissions = store.getters.permissions;
    
    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = permissions.some(role => {
        return value.includes(role);
      });
      
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
});

// 使用
<button v-permission="['admin']">删除</button>
```

## 状态管理

### 1. Vuex（Vue 2 & Vue 3）

**核心概念：**
- State：存储状态
- Getters：派生状态
- Mutations：同步修改状态
- Actions：异步操作
- Modules：模块化

**基本使用：**
```javascript
// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    count: 0,
    user: null
  },
  getters: {
    doubleCount: state => state.count * 2,
    isLoggedIn: state => !!state.user
  },
  mutations: {
    INCREMENT(state) {
      state.count++;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    async fetchUser({ commit }) {
      const user = await api.getUser();
      commit('SET_USER', user);
    }
  },
  modules: {
    // 模块
  }
});

export default store;
```

**组件中使用：**
```javascript
// Options API
export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    doubleCount() {
      return this.$store.getters.doubleCount;
    }
  },
  methods: {
    increment() {
      this.$store.commit('INCREMENT');
    },
    fetchUser() {
      this.$store.dispatch('fetchUser');
    }
  }
};

// 辅助函数
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['count', 'user']),
    ...mapGetters(['doubleCount', 'isLoggedIn'])
  },
  methods: {
    ...mapMutations(['INCREMENT', 'SET_USER']),
    ...mapActions(['fetchUser'])
  }
};

// Composition API
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    
    const count = computed(() => store.state.count);
    const doubleCount = computed(() => store.getters.doubleCount);
    
    const increment = () => store.commit('INCREMENT');
    const fetchUser = () => store.dispatch('fetchUser');
    
    return {
      count,
      doubleCount,
      increment,
      fetchUser
    };
  }
};
```

### 2. Pinia（Vue 3 推荐）

**特点：**
- 更简单的 API
- 完整的 TypeScript 支持
- 没有 mutations（只有 state、getters、actions）
- 支持多个 store
- 更好的代码分割
- 更小的体积

**基本使用：**
```javascript
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++;
    },
    async fetchData() {
      const data = await api.getData();
      this.count = data.count;
    }
  }
});
```

**组件中使用：**
```javascript
import { useCounterStore } from '@/stores/counter';

export default {
  setup() {
    const counter = useCounterStore();
    
    // 访问 state
    console.log(counter.count);
    
    // 访问 getters
    console.log(counter.doubleCount);
    
    // 调用 actions
    counter.increment();
    
    // 直接修改 state
    counter.count++;
    
    // 批量修改
    counter.$patch({
      count: counter.count + 1
    });
    
    return {
      counter
    };
  }
};
```

**使用 setup 语法：**
```javascript
// 更简洁的写法
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  
  function increment() {
    count.value++;
  }
  
  async function fetchData() {
    const data = await api.getData();
    count.value = data.count;
  }
  
  return {
    count,
    doubleCount,
    increment,
    fetchData
  };
});
```

### 3. Vuex vs Pinia

| 特性            | Vuex         | Pinia      |
| --------------- | ------------ | ---------- |
| API 复杂度      | 较复杂       | 简单       |
| TypeScript 支持 | 一般         | 完美       |
| Mutations       | 需要         | 不需要     |
| 模块化          | 需要手动配置 | 自动模块化 |
| DevTools 支持   | 支持         | 支持       |
| 体积            | 较大         | 较小       |
| Vue 3 支持      | 支持         | 原生支持   |

## Vue Router

### 1. 基本使用

**安装和配置：**
```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue') // 懒加载
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    props: true // 将路由参数作为 props 传递
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

**使用：**
```vue
<template>
  <!-- 声明式导航 -->
  <router-link to="/">首页</router-link>
  <router-link :to="{ name: 'User', params: { id: 123 } }">用户</router-link>
  
  <!-- 路由出口 -->
  <router-view />
</template>

<script>
export default {
  methods: {
    // 编程式导航
    goToUser() {
      this.$router.push('/user/123');
      this.$router.push({ name: 'User', params: { id: 123 } });
      this.$router.replace('/user/123'); // 不添加历史记录
      this.$router.go(-1); // 后退
      this.$router.back(); // 后退
      this.$router.forward(); // 前进
    }
  },
  computed: {
    // 获取路由参数
    userId() {
      return this.$route.params.id;
    },
    // 获取查询参数
    search() {
      return this.$route.query.q;
    }
  }
};
</script>
```

### 2. 动态路由

```javascript
const routes = [
  {
    path: '/user/:id',
    component: User
  },
  {
    path: '/user/:id/post/:postId',
    component: Post
  },
  // 匹配所有路径
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];
```

### 3. 嵌套路由

```javascript
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        path: '',
        component: UserHome
      },
      {
        path: 'profile',
        component: UserProfile
      },
      {
        path: 'posts',
        component: UserPosts
      }
    ]
  }
];
```

```vue
<!-- User.vue -->
<template>
  <div>
    <h2>User {{ $route.params.id }}</h2>
    <router-view />
  </div>
</template>
```

### 4. 命名视图

```javascript
const routes = [
  {
    path: '/',
    components: {
      default: Home,
      sidebar: Sidebar,
      footer: Footer
    }
  }
];
```

```vue
<template>
  <router-view />
  <router-view name="sidebar" />
  <router-view name="footer" />
</template>
```

### 5. 路由守卫

**全局守卫：**
```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to: 即将进入的路由
  // from: 当前导航正要离开的路由
  // next: 必须调用
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

// 全局解析守卫
router.beforeResolve((to, from, next) => {
  // 在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后
  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  // 不接受 next
  document.title = to.meta.title || 'App';
});
```

**路由独享守卫：**
```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (hasPermission()) {
        next();
      } else {
        next('/403');
      }
    }
  }
];
```

**组件内守卫：**
```javascript
export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被确认前调用
    // 不能访问 this
    next(vm => {
      // 通过 vm 访问组件实例
    });
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 可以访问 this
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问 this
    const answer = window.confirm('确定要离开吗？');
    if (answer) {
      next();
    } else {
      next(false);
    }
  }
};
```

**Composition API 中使用：**
```javascript
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

export default {
  setup() {
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm('确定要离开吗？');
      if (!answer) return false;
    });
    
    onBeforeRouteUpdate((to, from) => {
      // 路由更新时
    });
  }
};
```

### 6. 路由元信息

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      title: '管理后台',
      roles: ['admin']
    }
  }
];

// 使用
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 需要认证
  }
  document.title = to.meta.title || 'App';
  next();
});
```

### 7. 滚动行为

```javascript
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // savedPosition: 浏览器前进/后退时的位置
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    } else {
      return { top: 0 };
    }
  }
});
```

## 性能优化

### 1. 组件优化

**异步组件：**
```javascript
const AsyncComponent = defineAsyncComponent(() =>
  import('./MyComponent.vue')
);
```

**keep-alive 缓存：**
```vue
<template>
  <keep-alive :include="['ComponentA']" :max="10">
    <component :is="currentComponent" />
  </keep-alive>
</template>
```

**函数式组件（Vue 2）：**
```javascript
export default {
  functional: true,
  render(h, context) {
    return h('div', context.props.message);
  }
};
```

### 2. 响应式优化

**Object.freeze：**
```javascript
export default {
  data() {
    return {
      // 冻结对象，不进行响应式处理
      frozenData: Object.freeze({
        // 大量不需要响应式的数据
      })
    };
  }
};
```

**shallowRef / shallowReactive：**
```javascript
import { shallowRef, shallowReactive } from 'vue';

// 只有 .value 是响应式的
const state = shallowRef({ count: 0 });

// 只有第一层是响应式的
const state = shallowReactive({
  count: 0,
  nested: { value: 1 } // 不是响应式的
});
```

### 3. 渲染优化

**v-once：**
```vue
<template>
  <div v-once>
    <!-- 只渲染一次 -->
    {{ message }}
  </div>
</template>
```

**v-memo（Vue 3.2+）：**
```vue
<template>
  <!-- 只有当 item.id 变化时才重新渲染 -->
  <div v-for="item in list" :key="item.id" v-memo="[item.id]">
    {{ item.name }}
  </div>
</template>
```

**虚拟列表：**
```vue
<template>
  <RecycleScroller
    :items="items"
    :item-size="50"
    key-field="id"
  >
    <template #default="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </RecycleScroller>
</template>
```

### 4. 编译优化

**生产环境构建：**
```bash
npm run build
```

**按需引入：**
```javascript
// 完整引入
import ElementPlus from 'element-plus';

// 按需引入
import { ElButton, ElSelect } from 'element-plus';
```

**Tree-shaking：**
确保使用 ES Modules 格式，Webpack 会自动进行 Tree-shaking。

### 5. 网络优化

**路由懒加载：**
```javascript
const routes = [
  {
    path: '/about',
    component: () => import('./About.vue')
  }
];
```

**代码分割：**
```javascript
// 使用 import() 动态导入
const module = await import('./module.js');
```

**预加载：**
```javascript
// Webpack 魔法注释
const About = () => import(/* webpackPrefetch: true */ './About.vue');
```

## 常见面试题

### 1. Vue 的响应式原理是什么？

**Vue 2：**
- 使用 `Object.defineProperty` 劫持数据
- 在 getter 中收集依赖（Watcher）
- 在 setter 中通知依赖更新

**Vue 3：**
- 使用 `Proxy` 代理对象
- 可以检测属性的添加和删除
- 性能更好，支持 Map、Set 等

### 2. computed 和 watch 的区别？

**computed：**
- 计算属性，有缓存
- 依赖的数据变化时才重新计算
- 必须有返回值
- 适合：根据已有数据计算新数据

**watch：**
- 侦听器，无缓存
- 数据变化时执行回调
- 不需要返回值
- 适合：数据变化时执行异步操作或开销较大的操作

### 3. Vue 的生命周期有哪些？

**Vue 2/3：**
- `beforeCreate` / `created`
- `beforeMount` / `mounted`
- `beforeUpdate` / `updated`
- `beforeUnmount/beforeDestroy` / `unmounted/destroyed`
- `activated` / `deactivated`（keep-alive）
- `errorCaptured`

### 4. v-if 和 v-show 的区别？

**v-if：**
- 条件渲染，条件为假时不渲染
- 切换成本高
- 适合：条件很少改变

**v-show：**
- 条件显示，始终渲染，切换 display
- 切换成本低
- 适合：频繁切换

### 5. Vue 组件通信方式有哪些？

1. Props / Emit（父子）
2. v-model（双向绑定）
3. $refs（父访问子）
4. Provide / Inject（跨层级）
5. EventBus（兄弟）
6. Vuex / Pinia（全局状态）

### 6. Vue 2 和 Vue 3 的区别？

**主要区别：**
- 响应式系统：Object.defineProperty → Proxy
- Composition API：更好的逻辑组织
- 性能提升：更快、更小
- TypeScript 支持：更好
- 新特性：Teleport、Fragments、Suspense

### 7. 为什么 data 是一个函数？

确保每个组件实例都有独立的数据副本，避免数据共享导致的问题。

```javascript
// 错误：所有实例共享同一个对象
data: {
  count: 0
}

// 正确：每个实例都有独立的数据
data() {
  return {
    count: 0
  };
}
```

### 8. nextTick 的原理？

`nextTick` 在下次 DOM 更新循环结束之后执行延迟回调。

**原理：**
- 使用微任务（Promise、MutationObserver）
- 降级使用宏任务（setImmediate、setTimeout）

**使用场景：**
- 在数据变化后立即获取更新后的 DOM

```javascript
this.message = 'changed';
this.$nextTick(() => {
  // DOM 已更新
});
```

### 9. key 的作用是什么？

key 是 Vue 识别节点的唯一标识，用于优化虚拟 DOM 的 Diff 算法。

**作用：**
- 更准确：避免就地复用
- 更快速：提高 Diff 效率

**注意：**
- 不要使用索引作为 key（列表会变化时）
- key 应该是稳定、唯一的

### 10. Vue Router 的路由模式有哪些？

**hash 模式：**
- URL 带 `#`
- 兼容性好
- 不需要服务器配置

**history 模式：**
- URL 正常
- 需要服务器配置（刷新会 404）
- 使用 HTML5 History API

**abstract 模式：**
- 不依赖浏览器环境
- 用于 Node.js 等环境

### 11. Vuex 和 Pinia 的区别？

**Pinia 的优势：**
- 更简单的 API（无 mutations）
- 完整的 TypeScript 支持
- 更好的代码分割
- 更小的体积
- Vue 3 原生支持

### 12. 如何实现组件的权限控制？

**方法一：自定义指令**
```javascript
app.directive('permission', {
  mounted(el, binding) {
    const { value } = binding;
    const roles = store.getters.roles;
    
    if (value && !roles.includes(value)) {
      el.parentNode?.removeChild(el);
    }
  }
});
```

**方法二：路由守卫**
```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.roles) {
    const userRoles = store.getters.roles;
    const hasPermission = to.meta.roles.some(role =>
      userRoles.includes(role)
    );
    
    if (hasPermission) {
      next();
    } else {
      next('/403');
    }
  } else {
    next();
  }
});
```

### 13. Vue 的性能优化方法？

**组件层面：**
- 异步组件
- keep-alive 缓存
- 函数式组件

**响应式层面：**
- Object.freeze
- shallowRef / shallowReactive

**渲染层面：**
- v-once
- v-memo
- 虚拟列表

**编译层面：**
- 生产环境构建
- 按需引入
- Tree-shaking

**网络层面：**
- 路由懒加载
- 代码分割
- 资源压缩

### 14. Vue 3 的 Teleport 有什么用？

Teleport 可以将组件的 HTML 渲染到 DOM 的其他位置。

```vue
<template>
  <teleport to="body">
    <div class="modal">
      模态框内容
    </div>
  </teleport>
</template>
```

**使用场景：**
- 模态框
- 通知
- 弹出菜单

### 15. Vue 3 的 Suspense 有什么用？

Suspense 用于处理异步组件的加载状态。

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

## 最佳实践

### 1. 代码组织

- ✅ 使用 Composition API（Vue 3）
- ✅ 抽取可复用的逻辑到组合式函数
- ✅ 单文件组件（SFC）
- ✅ 合理拆分组件
- ✅ 使用 TypeScript

### 2. 命名规范

- ✅ 组件名：PascalCase
- ✅ 事件名：kebab-case
- ✅ Props：camelCase
- ✅ 组合式函数：useXxx

### 3. 性能优化

- ✅ 路由懒加载
- ✅ 组件异步加载
- ✅ 使用 keep-alive
- ✅ 合理使用 computed
- ✅ 避免不必要的响应式

### 4. 状态管理

- ✅ 优先使用组件内部状态
- ✅ 跨组件共享使用 Provide/Inject
- ✅ 全局状态使用 Pinia
- ✅ 避免过度使用状态管理

### 5. 代码质量

- ✅ 使用 ESLint
- ✅ 使用 Prettier
- ✅ 编写单元测试
- ✅ 使用 Git 版本控制
- ✅ 代码审查

## 总结

Vue 是一个渐进式、易学易用的前端框架，掌握 Vue 需要：

1. **理解响应式原理**：Object.defineProperty 和 Proxy
2. **掌握组件系统**：通信方式、插槽、动态组件
3. **熟悉生命周期**：各个钩子的执行时机
4. **掌握 API**：Options API 和 Composition API
5. **状态管理**：Vuex 和 Pinia
6. **路由管理**：Vue Router
7. **性能优化**：组件、响应式、渲染优化
8. **最佳实践**：代码组织、命名规范、工程化

持续学习，保持对新特性的关注，多实践项目！
