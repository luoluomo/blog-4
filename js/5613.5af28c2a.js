(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5613],{55613:n=>{n.exports="### React Logo 与 Hooks\n\n![](http://with.muyunyun.cn/ddbdcec2fc39ba350fc74647f4fad6f5.jpg-300)\n\nReact 的 logo 是一个原子图案, 原子组成了物质的表现。类似的, React 就像原子般构成了页面的表现; 而 Hooks 就如夸克, 其更接近 React 本质的样子, 但是直到 4 年后的今天才被真正设计出来。 —— Dan in React Conf(2018)\n\n### WHY HOOKS?\n\n* `多个组件间逻辑复用`: 在 Class 中使用 React 不能将带有 state 的逻辑给单独抽离成 function, 其只能通过嵌套组件的方式来解决多个组件间逻辑复用的问题, 基于嵌套组件的思想存在 [HOC](https://github.com/MuYunyun/blog/blob/master/React/从0到1实现React/8.HOC探索.md) 与 `render props` 两种设计模式。但是这两种设计模式是否存在缺陷呢?\n  * 嵌套地狱, 当嵌套层级过多后, 数据源的追溯会变得十分困难, 导致定位 bug 不容易; (hoc、render props)\n  * 性能, 额外的组件实例需要存在额外的开销; (Hoc、Render props)\n  * 命名重复性, 在一个组件中同时使用多个 hoc, 不排除这些 hoc 里的方法存在命名冲突的问题; (hoc)\n* `单个组件中的逻辑复用`: Class 中的生命周期 `componentDidMount`、`componentDidUpdate` 甚至 `componentWillUnMount` 中的大多数逻辑基本是类似的, 必须拆散在不同生命周期中维护相同的逻辑对使用者是不友好的, 这样也造成了冗余的组件代码量。\n* Class 的其它一些问题: 书写 Class 组件时需要大量样板代码, 用户通常会对 Class 中 Constructor 的 bind 以及 this 的使用感到困惑(Todo: 举例); 当 Class 与 TypeScript 结合一起使用时, 需要对 defaultValue 做额外声明处理; 此外 React Team 表示 Class 在机器编译优化方面也不是很理想。\n  * [Vue: Update: the Class API proposal is being dropped.](https://github.com/vuejs/rfcs/pull/17#issuecomment-494242121)\n\n------- 2020.07.19 -------\n\n* 组件重构\n* React Hooks 的常见陷阱\n  * 闭包陷阱, (useInterval, useFetch)\n  * Hooks 规则陷阱(见花媛最新聊天记录), eslint-hooks 插件\n* Hooks 不能做到?\n  * Matrix 组件\n\n* [https://zhuanlan.zhihu.com/p/103150605], 分享一篇流畅风趣的 hooks 文章, 文风风趣不错, 可以借鉴。\n\n---------- more ---------\n\n### useState 返回的值为什么是数组而非对象?\n\n原因是数组的解构比对象更加方便, 可以观察以下两种数据结构解构的差异。\n\n返回数组时, 可以直接解构成任意名字。\n\n```js\n[name, setName] = useState('路飞')\n[age, setAge] = useState(12)\n```\n\n返回对象时, 却需要多一层的命名。\n\n```js\n{value: name, setValue: setName} = useState('路飞')\n{value: name, setValue: setName} = useState(12)\n```\n\n### Hooks 传递的设计\n\nHooks 是否可以设计成在组件中通过函数传参来使用? 比如进行如下调用?\n\n```js\nconst SomeContext = require('./SomeContext)\n\nfunction Example({ someProp }, hooks) {\n  const contextValue = hooks.useContext(SomeContext)\n  return <div>{someProp}{contextValue}</div>\n}\n```\n\n使用传递的劣势是会出现冗余的传递。(可以联想 Context 解决了什么)\n\n### Hooks 与 Class 中调用 setState 有不同的表现差异么?\n\nHooks 中的 setState 与 Class 中最大区别在于 Hooks 不会对多次 setState 进行合并操作。如果要执行合并操作, 可执行如下操作:\n\n```js\nsetState(prevState => {\n  return { ...prevState, ...updateValues }\n})\n```\n\n此外可以对 class 与 Hooks 之间 `setState` 是异步还是同步的表现进行对比, 可以先对以下 4 种情形 render 输出的个数进行观察分析:\n\nclass 中的 setState:\n\n```js\nexport default class App extends React.Component {\n  state = {\n    name: '路飞',\n    old: 12,\n    gender: 'boy'\n  }\n\n  // 情形 ①: class 中异步调用 setState\n  componentDidMount() {\n    this.setState({\n      name: '娜美'\n    })\n    this.setState({\n      old: 13\n    })\n    this.setState({\n      gender: 'girl'\n    })\n  }\n\n  // 情形 ②: class 中同步调用 setState\n  componentDidMount() {\n    setTimeout(() => {\n      this.setState({\n        name: '娜美'\n      })\n      this.setState({\n        old: 13\n      })\n      this.setState({\n        gender: 'girl'\n      })\n    })\n  }\n\n  render() {\n    console.log('render')\n    const { name, old, gender } = this.state\n    return (\n      <>{name}{old}{gender}</>\n    )\n  }\n}\n```\n\nHooks 中的 setState\n\n```js\nexport default function() {\n  const [name, setName] = useState('路飞')\n  const [old, setOld] = useState('12')\n  const [gender, setGender] = useState('boy')\n\n  // 情形③: Hooks 中异步调用 setState\n  useEffect(() => {\n    setName('娜美')\n    setOld('13')\n    setGender('girl')\n  }, [])\n\n  // 情形④: Hooks 中同步调用 setState\n  useEffect(() => {\n    setTimeout(() => {\n      setName('娜美')\n      setOld('13')\n      setGender('girl')\n    }, 0)\n  }, [])\n\n  console.log('render')\n  return (\n    <>{name}{old}{gender}</>\n  )\n}\n```\n\n情形①、情形②、情形③、情形④ 中 render 输出的次数分别是 2, 4, 2, 4。可以看出在 React 中使用 class 写法和 hooks 写法是一一对应的。此外 `setState 的执行是异步还是同步取决于其执行环境`。\n\n### 如何在 Hooks 中模拟 setState 的第二个参数\n\n场景: 在使用类模式的 React 中有时会使用 setState 的第二个参数来完成某些异步回调操作(比如接口请求), 在 Hooks 中如何对齐类模式中的这种用法呢?\n\n使用 useRef 来控制一个标志符;\n\n> 具体见 [issue](https://github.com/facebook/react/issues/14174#issuecomment-437551476)\n\n### Hooks 中 useEffect 的执行时间是否与 componentDidMount/componentDidUpdate 相同\n\n在 [timing-of-effects](https://reactjs.org/docs/hooks-reference.html#timing-of-effects) 中有提到 `useEffect` 的执行时机是在浏览器下一次 layout 与 paint 之后, 与之相对的 `useLayoutEffect` 的执行时机是在浏览器下一次 layout 与 paint 之前(同 `componentDidMount`/`componentDidUpdate`)。\n\n> useLayoutEffect 适用的场景为在 class 模式下在 componentDidMount/componentDidUpdate 中对样式进行调整的场景;\n\n> [this-benchmark-is-indeed-flawed](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f): 此文用数据比较了 useEffect 与 componentDidMount/componentDidUpdate 的执行时机。\n\n### Hooks 中模拟仅调用 componentDidUpdate 而不调用 componentDidMount\n\n思路: 借助 `useRef` 跳过头一次的执行。\n\n```js\nfunction Demo() {\n  const mounted = React.useRef(false)\n\n  React.useEffect(() => {\n    if (!mounted.current) {\n      mounted.current = true\n    } else {\n      // do something mock componentDidUpdate\n    }\n  })\n}\n```\n\n### Hooks 中如何获取先前的 props 以及 state\n\nReact 官方在未来很可能会提供一个 `usePrevious` 的 hooks 来获取之前的 props 以及 state。\n\n`usePrevious` 的核心思想是用 ref 来存储先前的值。\n\n```js\nfunction usePrevous(value) {\n  const ref = useRef()\n  useEffect(() => {\n    ref.current = value\n  })\n  return ref.current\n}\n```\n\n### Hooks 中如何调用实例上的方法\n\n在 Hooks 中使用 useRef() 等价于在 Class 中使用 this.something。\n\n```js\n/* in a function */\nconst X = useRef()\nX.current // can read or write\n\n/* in a Class */\nthis.X    // can read or write\n```\n\n> [Is there something like instance variables](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)\n\n### Hooks 中 getDerivedStateFromProps 的替代方案\n\n在 [React 暗器百解](https://github.com/MuYunyun/blog/blob/master/React/React暗器百解.md) 中提到了 `getDerivedStateFromProps` 是一种反模式, 但是极少数情况还是用得到该钩子, Hooks 没有该 api, 那其如何达到 getDerivedStateFromProps 的效果呢?\n\n```js\nfunction ScrollView({row}) {\n  const [isScrollingDown, setISScrollingDown] = setState(false)\n  const [prevRow, setPrevRow] = setState(null)\n\n  // 核心是创建一个 prevRow state 与函数调用方传进来的 row 进行比较\n  if (row !== prevRow) {\n    setISScrollingDown(prevRow !== null && row > prevRow)\n    setPrevRow(row)\n  }\n\n  return `Scrolling down ${isScrollingDown}`\n}\n```\n\n### Hooks 中 forceUpdate 的替代方案\n\n可以使用 `useReducer` 来 hack `forceUpdate`, 但是尽量避免 forceUpdate 的使用。\n\n```js\nconst useForceUpdate = () => {\n  return useReducer(x => x + 1, 0)[1]\n}\n\nfunction handleClick() {\n  const forceUpdate = useForceUpdate()\n  forceUpdate()\n}\n```\n\n### Hooks 中 shouldComponentUpdate 的替代方案\n\n在 Hooks 中可以使用 `useMemo` 来作为 `shouldComponentUpdate` 的替代方案, 但 `useMemo` 只对 props 进行浅比较。\n\n```js\nReact.useMemo((props) => {\n  // your component\n})\n```\n\n#### useMemo 与 useCallback 的区别\n\n```js\nuseMemo(() => <component />) 等价于 useCallback(<component />)\n```\n\n* useCallback: 一般用于缓存函数\n* useMemo: 一般用于缓存组件\n\n### 是否能使用 React Hooks 替代 Redux\n\n在 React 16.8 版本之后, 针对`不是特别复杂`的业务场景, 可以使用 React 提供的 `useContext`、`useReducer` 实现自定义简化版的 redux, 可见 [todoList](https://github.com/MuYunyun/todoList) 中的运用。核心代码如下:\n\n```js\nimport React, { createContext, useContext, useReducer } from \"react\"\n\n// 创建 StoreContext\nconst StoreContext = createContext()\n\n// 构建 Provider 容器层\nexport const StoreProvider = ({reducer, initialState, children}) => {\n  return (\n    <StoreContext.Provider value={useReducer(reducer, initialState)}>\n      {children}\n    </StoreContext.Provider>\n  )\n}\n\n// 在子组件中调用 useStoreContext, 从而取得 Provider 中的 value\nexport const useStoreContext = () => useContext(StoreContext)\n```\n\n但是针对特别复杂的场景目前不建议使用此模式, 因为 context 的机制会有性能问题。具体原因可见 [react-redux v7 回退到订阅的原因](https://github.com/reduxjs/react-redux/issues/1177)\n\n#### 依赖列表中移除函数是否是安全的?\n\n通常来说依赖列表中移除函数是不安全的。观察如下 demo\n\n```js\nconst { useState, useEffect } = React\n\nfunction Example({ someProp }) {\n  function doSomething() {\n    console.log(someProp) // 这里只输出 1, 点击按钮的 2 并没有输出。\n  }\n\n  useEffect(\n    () => {\n      doSomething()\n    },\n    [] // 🔴 这是不安全的, 因为在 doSomething 函数中使用了 someProps 属性\n  )\n\n  return <div>example</div>\n}\n\nexport default function() {\n  const [value, setValue] = useState(1)\n  return (\n    <>\n      <Example someProp={value} />\n      <Button onClick={() => setValue(2)}>button</Button>\n    </>\n  )\n}\n```\n\n在该 demo 中, 点击 button 按钮, 并没有打印出 2。解决上述问题有两种方法。\n\n方法一: 将函数放入 `useEffect` 中, 同时将相关属性放入依赖项中。因为在依赖中改变的相关属性一目了然, 所以这也是首推的做法。\n\n```js\nfunction Example({ someProp }) {\n  useEffect(\n    () => {\n      function doSomething() {\n        console.log(someProp)\n      }\n      doSomething()\n    },\n    [someProps] // 相关属性改变一目了然\n  )\n\n  return <div>example</div>\n}\n```\n\n方法二: 把函数加入依赖列表中\n\n```js\nfunction Example({ someProp }) {\n  function doSomething() {\n    console.log(someProp)\n  }\n\n  useEffect(\n    () => {\n      doSomething()\n    },\n    [doSomething]\n  )\n\n  return <div>example</div>\n}\n```\n\n方案二基本上不会单独使用, 它一般结合 `useCallback` 一起使用来处理某些函数计算量较大的函数。\n\n```js\nfunction Example({ someProp }) {\n  const doSomething = useCallback(() => {\n    console.log(someProp)\n  }, [someProp])\n\n  useEffect(\n    doSomething(),\n    [doSomething]\n  )\n\n  return <div>example</div>\n}\n```\n\n#### 如何避免重复创建昂贵的对象\n\n* 方法一: 使用 `useState` 的懒初始化, 用法如下\n\n```js\nconst [value, setValue] = useState(() => createExpensiveObj)\n```\n\n> 见 [lazy-initial-state](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state);\n\n* 方法二: 使用自定义 useRef 函数\n\n```js\nfunction Image(props) {\n  const ref = useRef(null)\n\n  function getExpensiveObj() {\n    if (ref.current === null) {\n      ref.current = ExpensiveObj\n    }\n\n    return ref.current\n  }\n\n  // if need ExpensiveObj, call getExpensiveObj()\n}\n```\n\n### 竞态\n\n关于竞态(race condition) 的解决方法:\n\n方案一: 提供一个标志符, 在 `clean effect` 阶段中将其置空。代码如下:\n\n```js\nfunction Article({ id }) {\n  const [article, setArticle] = useState(null);\n\n  useEffect(() => {\n    let didCancel = false;\n\n    async function fetchData() {\n      const article = await API.fetchArticle(id);\n      if (!didCancel) {\n        setArticle(article);\n      }\n    }\n\n    fetchData();\n\n    return () => {\n      didCancel = true;\n    };\n  }, [id]);\n\n  // ...\n}\n```\n\n方案二: 使用 Suspense: Suspense 的机制能做到 `render as fetch`。见 [solving-race-conditions-with-suspense](https://reactjs.org/docs/concurrent-mode-suspense.html#solving-race-conditions-with-suspense)\n\n### 相关资料\n\n* [Hooks RFCS](https://github.com/reactjs/rfcs/pull/68#issuecomment-439314884)\n* [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)\n* [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)\n* [Vue Function-based API RFC](https://zhuanlan.zhihu.com/p/68477600)\n"}}]);