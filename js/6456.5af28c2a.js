(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6456],{66456:n=>{n.exports="### Code Spliting\n\n在 16.6 版本之前，`code-spliting` 通常是由第三方库来完成的，比如 [react-loadble](https://github.com/jamiebuilds/react-loadable)(核心思路为: 高阶组件 + webpack dynamic import), 在 16.6 版本中提供了 `Suspense` 和 `lazy` 这两个钩子, 因此在之后的版本中便可以使用其来实现 `Code Spliting`。\n\n> 目前阶段, 服务端渲染中的 `code-spliting` 还是得使用 `react-loadable`, 可查阅 [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy), 暂时先不探讨原因。\n\n`Code Spliting` 在 `React` 中的使用方法是在 `Suspense` 组件中使用 `<LazyComponent>` 组件:\n\n```js\nimport { Suspense, lazy } from 'react'\n\nconst DemoA = lazy(() => import('./demo/a'))\nconst DemoB = lazy(() => import('./demo/b'))\n\n<Suspense>\n  <NavLink to=\"/demoA\">DemoA</NavLink>\n  <NavLink to=\"/demoB\">DemoB</NavLink>\n\n  <Router>\n    <DemoA path=\"/demoA\" />\n    <DemoB path=\"/demoB\" />\n  </Router>\n</Suspense>\n```\n\n源码中 `lazy` 将传入的参数封装成一个 `LazyComponent`\n\n```js\nfunction lazy(ctor) {\n  return {\n    $$typeof: REACT_LAZY_TYPE, // 相关类型\n    _ctor: ctor,\n    _status: -1,   // dynamic import 的状态\n    _result: null, // 存放加载文件的资源\n  };\n}\n```\n\n观察 [readLazyComponentType](https://github.com/MuYunyun/react/blob/29b7b775f2ecf878eaf605be959d959030598b07/packages/react-reconciler/src/ReactFiberLazyComponent.js#L30-L87) 后可以发现 `dynamic import` 本身类似 `Promise` 的执行机制, 也具有 `Pending`、`Resolved`、`Rejected` 三种状态, 这就比较好理解为什么 `LazyComponent` 组件需要放在 `Suspense` 中执行了(`Suspense` 中提供了相关的捕获机制, 下文会进行模拟实现`), 相关源码如下:\n\n```js\nfunction readLazyComponentType(lazyComponent) {\n  const status = lazyComponent._status;\n  const result = lazyComponent._result;\n  switch (status) {\n    case Resolved: { // Resolve 时，呈现相应资源\n      const Component = result;\n      return Component;\n    }\n    case Rejected: { // Rejected 时，throw 相应 error\n      const error = result;\n      throw error;\n    }\n    case Pending: {  // Pending 时, throw 相应 thenable\n      const thenable = result;\n      throw thenable;\n    }\n    default: { // 第一次执行走这里\n      lazyComponent._status = Pending;\n      const ctor = lazyComponent._ctor;\n      const thenable = ctor(); // 可以看到和 Promise 类似的机制\n      thenable.then(\n        moduleObject => {\n          if (lazyComponent._status === Pending) {\n            const defaultExport = moduleObject.default;\n            lazyComponent._status = Resolved;\n            lazyComponent._result = defaultExport;\n          }\n        },\n        error => {\n          if (lazyComponent._status === Pending) {\n            lazyComponent._status = Rejected;\n            lazyComponent._result = error;\n          }\n        },\n      );\n      // Handle synchronous thenables.\n      switch (lazyComponent._status) {\n        case Resolved:\n          return lazyComponent._result;\n        case Rejected:\n          throw lazyComponent._result;\n      }\n      lazyComponent._result = thenable;\n      throw thenable;\n    }\n  }\n}\n```\n\n### Async Data Fetching\n\n为了解决获取的数据在不同时刻进行展现的问题(在 [suspenseDemo](https://github.com/demos-platform/suspenseDemo) 中有相应演示), `Suspense` 给出了解决方案。\n\n下面放两段代码，可以从中直观地感受在 `Suspense` 中使用 `Async Data Fetching` 带来的便利。\n\n* 一般进行数据获取的代码如下:\n\n```js\nexport default class Demo extends Component {\n  state = {\n    data: null,\n  };\n\n  componentDidMount() {\n    fetchAPI(`/api/demo/${this.props.id}`).then((data) => {\n      this.setState({ data });\n    });\n  }\n\n  render() {\n    const { data } = this.state;\n\n    if (data == null) {\n      return <Spinner />;\n    }\n\n    const { name } = data;\n\n    return (\n      <div>{name}</div>\n    );\n  }\n}\n```\n\n* 在 `Suspense` 中进行数据获取的代码如下:\n\n```js\nconst resource = unstable_createResource((id) => {\n  return fetchAPI(`/api/demo`)\n})\n\nfunction Demo {\n  const data = resource.read(this.props.id)\n\n  const { name } = data;\n\n  return (\n    <div>{name}</div>\n  );\n}\n```\n\n可以看到在 `Suspense` 中进行数据获取的代码量相比正常的进行数据获取的代码少了将近一半！少了哪些地方呢?\n\n* 减少了 `loading` 状态的维护(在最外层的 Suspense 中统一维护子组件的 loading)\n* 减少了不必要的生命周期的书写\n\n### 总结: 如何在 Suspense 中使用 Data Fetching\n\n当前 `Suspense` 的使用分为三个部分:\n\n第一步: 用 `Suspens` 组件包裹子组件\n\n```js\nimport { Suspense } from 'react'\n\n<Suspense fallback={<Loading />}>\n  <ChildComponent>\n</Suspense>\n```\n\n第二步: 在子组件中使用 `unstable_createResource`:\n\n```js\nimport { unstable_createResource } from 'react-cache'\n\nconst resource = unstable_createResource((id) => {\n  return fetch(`/demo/${id}`)\n})\n```\n\n第三步: 在 `Component` 中使用第一步创建的 `resource`:\n\n```js\nconst data = resource.read('demo')\n```\n\n### 相关思路解读\n\n来看下源码中 `unstable_createResource` 的部分会比较清晰:\n\n```js\nexport function unstable_createResource(fetch, maybeHashInput) {\n  const resource = {\n    read(input) {\n      ...\n      const result = accessResult(resource, fetch, input, key);\n      switch (result.status) {\n        case Pending: {\n          const suspender = result.value;\n          throw suspender;\n        }\n        case Resolved: {\n          const value = result.value;\n          return value;\n        }\n        case Rejected: {\n          const error = result.value;\n          throw error;\n        }\n        default:\n          // Should be unreachable\n          return (undefined: any);\n      }\n    },\n  };\n  return resource;\n}\n```\n\n结合该部分源码, 进行如下推测:\n\n1. 第一次请求没有缓存, 子组件 `throw` 一个 `thenable` 对象, `Suspense` 组件内的 `componentDidCatch` 捕获之, 此时展示 `Loading` 组件;\n2. 当 `Promise` 态的对象变为完成态后, 页面刷新此时 `resource.read()` 获取到相应完成态的值;\n3. 之后如果相同参数的请求, 则走 `LRU` 缓存算法, 跳过 `Loading` 组件返回结果(缓存算法见后记);\n\n官方作者是说法如下:\n\n![](http://with.muyunyun.cn/22849313e0b8b19e833df9a9a59a8546.jpg-400)\n\n所以说法大致相同, 下面实现一个简单版的 `Suspense`:\n\n```jsx\nclass Suspense extends React.Component {\n  state = {\n    promise: null\n  }\n\n  componentDidCatch(e) {\n    if (e instanceof Promise) {\n      this.setState({\n        promise: e\n      }, () => {\n        e.then(() => {\n          this.setState({\n            promise: null\n          })\n        })\n      })\n    }\n  }\n\n  render() {\n    const { fallback, children } = this.props\n    const { promise } = this.state\n    return <>\n      { promise ? fallback : children }\n    </>\n  }\n}\n```\n\n进行如下调用\n\n```jsx\n<Suspense fallback={<div>loading...</div>}>\n  <PromiseThrower />\n</Suspense>\n\nlet cache = \"\";\nlet returnData = cache;\nconst fetch = () =>\n  new Promise(resolve => {\n    setTimeout(() => {\n      resolve(\"数据加载完毕\");\n    }, 2000);\n  });\n\nclass PromiseThrower extends React.Component {\n  getData = () => {\n    const getData = fetch();\n\n    getData.then(data => {\n      returnData = data;\n    });\n    if (returnData === cache) {\n      throw getData;\n    }\n    return returnData;\n  };\n\n  render() {\n    return <>{this.getData()}</>;\n  }\n}\n```\n\n![](http://with.muyunyun.cn/90586c1edf33c7d143f2a3ec59667ab4.gif)\n\n效果调试可以点击[这里](https://codesandbox.io/s/1zy82mm0j4), 在 `16.6` 版本之后, `componentDidCatch` 只能捕获 `commit phase` 的异常。所以在 `16.6` 版本之后实现的 `<PromiseThrower>` 又有一些差异(即将 `throw thenable` 移到 `componentDidMount` 中进行)。\n\n### ConcurrentMode + Suspense\n\n当网速足够快, 数据立马就获取到了，此时页面存在的 `Loading` 按钮就显得有些多余了。(在 [suspenseDemo](https://github.com/demos-platform/suspenseDemo) 中有相应演示), `Suspense` 在 `Concurrent Mode` 下给出了相应的解决方案, 其提供了 `maxDuration` 参数。用法如下:\n\n```js\n<Suspense maxDuration={500} fallback={<Loading />}>\n  ...\n</Suspense>\n```\n\n该 Demo 的效果为当获取数据的时间大于(是否包含等于还没确认) 500 毫秒, 显示自定义的 `<Loading />` 组件, 当获取数据的时间小于 500 毫秒, 略过 `<Loading>` 组件直接展示用户的数据。[相关源码](https://github.com/MuYunyun/react/blob/29b7b775f2ecf878eaf605be959d959030598b07/packages/react-reconciler/src/ReactFiberUnwindWork.js#L232-L242)。\n\n需要注意的是 `maxDuration` 属性只有在 `Concurrent Mode` 下才生效, 可参考[源码中的注释](https://github.com/MuYunyun/react/blob/29b7b775f2ecf878eaf605be959d959030598b07/packages/react-reconciler/src/ReactFiberUnwindWork.js#L270-L277)。在 Sync 模式下, `maxDuration` 始终为 0。\n\n### 后记: 缓存算法\n\n* `LRU` 算法: `Least Recently Used` 最近最少使用算法(根据时间);\n* `LFU` 算法: `Least Frequently Used` 最近最少使用算法(根据次数);\n\n> [漫画：什么是 LRU 算法](https://juejin.im/post/5c0392656fb9a049fb4366fa)\n\n若数据的长度限定是 `3`, 访问顺序为 `set(2,2),set(1,1),get(2),get(1),get(2),set(3,3),set(4,4)`, 则根据 `LRU` 算法删除的是 `(1, 1)`, 根据 `LFU` 算法删除的是 `(3, 3)`。\n\n`react-cache` 采用的是 `LRU` 算法。\n\n### 相关资料\n\n* [suspenseDemo](https://github.com/demos-platform/suspenseDemo): 文字相关案例都集成在该 demo 中\n* [Releasing Suspense](https://github.com/facebook/react/issues/13206): `Suspense` 开发进度\n* [the suspense is killing redux](https://medium.com/@ryanflorence/the-suspense-is-killing-redux-e888f9692430)\n"}}]);