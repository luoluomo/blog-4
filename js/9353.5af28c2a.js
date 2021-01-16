(self.webpackChunkblog=self.webpackChunkblog||[]).push([[9353],{69353:n=>{n.exports="### diff 的实现\n\n在 react 中, diff 实现的思路是将新老 virtual dom 进行比较, 将比较后的 patch（补丁）渲染到页面上, 从而实现局部刷新；本文借鉴了 [preact](https://github.com/developit/preact) 和 [simple-react](https://github.com/hujiulong/simple-react) 中的 diff 实现, 总体思路是将旧的 dom 节点和新的 virtual dom 节点进行了比较, 根据不同的比较类型（文本节点、非文本节点、自定义组件）调用相应的逻辑, 从而实现页面的局部渲染。代码总体结构如下:\n\n```js\n/**\n * 比较旧的 dom 节点和新的 virtual dom 节点:\n * @param {*} oldDom  旧的 dom 节点\n * @param {*} newVdom 新的 virtual dom 节点\n */\nfunction diff(oldDom, newVdom) {\n  ...\n  if (_.isString(newVdom)) {\n    return diffTextDom(oldDom, newVdom)   // 对比文本 dom 节点\n  }\n\n  if (oldDom.nodeName.toLowerCase() !== newVdom.nodeName) {\n    diffNotTextDom(oldDom, newVdom)       // 对比非文本 dom 节点\n  }\n\n  if (_.isFunction(newVdom.nodeName)) {\n    return diffComponent(oldDom, newVdom) // 对比自定义组件\n  }\n\n  diffAttribute(oldDom, newVdom)          // 对比属性\n\n  if (newVdom.children.length > 0) {\n    diffChild(oldDom, newVdom)            // 遍历对比子节点\n  }\n\n  return oldDom\n}\n```\n\n下面列出不同比较类型对应的逻辑实现。\n\n#### 对比文本节点\n\n首先进行较为简单的文本节点的比较, 代码如下:\n\n```js\n// 对比文本节点\nfunction diffTextDom(oldDom, newVdom) {\n  let dom = oldDom\n  if (oldDom && oldDom.nodeType === 3) {  // 如果老节点是文本节点\n    if (oldDom.textContent !== newVdom) { // 这里一个细节: textContent/innerHTML/innerText 的区别\n      oldDom.textContent = newVdom\n    }\n  } else {                                // 如果旧 dom 元素不为文本节点\n    dom = document.createTextNode(newVdom)\n    if (oldDom && oldDom.parentNode) {\n      oldDom.parentNode.replaceChild(dom, oldDom)\n    }\n  }\n  return dom\n}\n```\n\n#### 对比非文本节点\n\n对比非文本节点, 其思路为将同层级的旧节点替换为新节点, 代码如下:\n\n```js\n// 对比非文本节点\nfunction diffNotTextDom(oldDom, newVdom) {\n  const newDom = document.createElement(newVdom.nodeName);\n  [...oldDom.childNodes].map(newDom.appendChild) // 将旧节点下的元素添加到新节点下\n  if (oldDom && oldDom.parentNode) {\n    oldDom.parentNode.replaceChild(oldDom, newDom)\n  }\n}\n```\n\n#### 对比自定义组件\n\n对比自定义组件的思路为: 如果新老组件不同, 则直接将新组件替换老组件；如果新老组件相同, 则将新组件的 props 赋到老组件上, 然后再对获得新 props 前后的老组件做 diff 比较。代码如下:\n\n```js\n// 对比自定义组件\nfunction diffComponent(oldDom, newVdom) {\n  if (oldDom._component && (oldDom._component.constructor !== newVdom.nodeName)) { // 如果新老组件不同, 则直接将新组件替换老组件\n    const newDom = vdomToDom(newVdom)\n    oldDom._component.parentNode.insertBefore(newDom, oldDom._component)\n    oldDom._component.parentNode.removeChild(oldDom._component)\n  } else {\n    setProps(oldDom._component, newVdom.attributes) // 如果新老组件相同, 则将新组件的 props 赋到老组件上\n    renderComponent(oldDom._component)              // 对获得新 props 前后的老组件做 diff 比较（renderComponent 中调用了 diff）\n  }\n}\n```\n\n#### 遍历对比子节点\n\n遍历对比子节点的策略如下:\n\n1. 比较新旧 dom 元素相同层级相同位置的节点类型, 若节点类型不相等, 则直接将新节点替换掉旧节点；\n2. 给节点加上 key 属性；\n\n> 在 cpreact 的代码实现中, 1 的目的降低了空间复杂度(避免了更深层次的遍历)；2 的目的目前看来是少了一次新老类型的判断消耗。\n\n代码如下:\n\n```js\n// 对比子节点\nfunction diffChild(oldDom, newVdom) {\n  const keyed = {}\n  const children = []\n  const oldChildNodes = oldDom.childNodes\n  for (let i = 0; i < oldChildNodes.length; i++) {\n    if (oldChildNodes[i].key) {\n      keyed[oldChildNodes[i].key] = oldChildNodes[i]\n    } else { // 如果不存在 key, 则优先找到节点类型相同的元素\n      children.push(oldChildNodes[i])\n    }\n  }\n\n  let newChildNodes = newVdom.children\n  if (isArray(newVdom.children[0])) { // https://github.com/MuYunyun/cpreact/issues/9\n    newChildNodes = newVdom.children[0]\n  }\n\n  for (let i = 0; i < newChildNodes.length; i++) {\n    let child = null\n    if (keyed[newChildNodes[i].key]) {\n      child = keyed[newChildNodes[i].key]\n      keyed[newChildNodes[i].key] = undefined\n    } else { // 对应上面不存在 key 的情形\n      // 在新老节点相同位置上寻找相同类型的节点进行比较；如果不满足上述条件则直接将新节点插入；\n      if (children[i] && isSameNodeType(children[i], newChildNodes[i])) {\n        child = children[i]\n        children[i] = undefined\n      } else if (children[i] && !isSameNodeType(children[i], newChildNodes[i])) { // 不是相同类型, 直接替代掉\n        children[i].replaceWith(newChildNodes[i])\n        continue\n      }\n    }\n\n    const result = diff(child, newChildNodes[i])\n    // 如果 child 为 null\n    if (result === newChildNodes[i]) {\n      oldDom.appendChild(vdomToDom(result))\n    }\n  }\n}\n```\n\n#### 测试\n\n在生命周期的小节中, componentWillReceiveProps 方法还未跑通, 稍加修改 setProps 函数即可:\n\n```js\n/**\n * 更改属性, componentWillMount 和 componentWillReceiveProps 方法\n */\nfunction setProps(component, attributes) {\n  if (attributes) {\n    component.props = attributes // 这段逻辑对应上文自定义组件比较中新老组件相同时 setProps 的逻辑\n  }\n\n  if (component && component.base && component.componentWillReceiveProps) {\n    component.componentWillReceiveProps(component.props)\n  } else if (component && component.componentWillMount) {\n    component.componentWillMount()\n  }\n}\n```\n\n来测试下生命周期小节中最后的测试用例:\n\n* 生命周期测试\n\n![](http://with.muyunyun.cn/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%B5%8B%E8%AF%951.gif)\n\n* diff 测试\n\n![](http://with.muyunyun.cn/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9Fdiff%E6%B5%8B%E8%AF%951.gif)"}}]);