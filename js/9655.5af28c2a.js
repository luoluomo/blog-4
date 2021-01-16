(self.webpackChunkblog=self.webpackChunkblog||[]).push([[9655],{19655:n=>{n.exports="### 代理模式\n\n情景: 小明追女生 A\n\n* 非代理模式: 小明 =花=> 女生A\n* 代理模式: 小明 =花=> 让女生A的好友B帮忙 =花=> 女生A\n\n### 代理模式的特点\n\n* 代理对象和本体对象具有一致的接口, 对使用者友好\n\n代理模式的种类有很多, 在 JS 中最常用的为虚拟代理和缓存代理。\n\n#### 虚拟代理实现图片预加载\n\n下面这段代码运用代理模式来实现图片预加载, 可以看到通过代理模式巧妙地将创建图片与预加载逻辑分离, 并且在未来如果不需要预加载, 只要改成请求本体代替请求代理对象就行。\n\n```js\nconst myImage = (function() {\n  const imgNode = document.createElement('img')\n  document.body.appendChild(imgNode)\n  return {\n    setSrc: function(src) {\n      imgNode.src = src\n    }\n  }\n})()\n\nconst proxyImage = (function() {\n  const img = new Image()\n  img.onload = function() { // http 图片加载完毕后才会执行\n    myImage.setSrc(this.src)\n  }\n  return {\n    setSrc: function(src) {\n      myImage.setSrc('loading.jpg') // 本地 loading 图片\n      img.src = src\n    }\n  }\n})()\n\nproxyImage.setSrc('http://loaded.jpg')\n```\n\n#### 缓存代理实现乘积计算\n\n```js\nconst mult = function() {\n  let a = 1\n  for (let i = 0, l; l = arguments[i++];) {\n    a = a * l\n  }\n  return a\n}\n\nconst proxyMult = (function() {\n  const cache = {}\n  return function() {\n    const tag = Array.prototype.join.call(arguments, ',')\n    if (cache[tag]) {\n      return cache[tag]\n    }\n    cache[tag] = mult.apply(this, arguments)\n    return cache[tag]\n  }\n})()\n\nproxyMult(1, 2, 3, 4) // 24\n```\n\n### 小 tip\n\n在开发时候不要先去猜测是否需要使用代理模式, 如果发现直接使用某个对象不方便时, 再来优化不迟。"}}]);