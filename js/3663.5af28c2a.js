(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3663],{23663:n=>{n.exports="### React.Children.map\n\n```js\nfunction Parent(props) {\n  // React.Children.map 会对第二个函数输出的值进行铺平操作\n  console.log(React.Children.map(props.children, r => [[r], r]));\n  return React.Children.map(props.children, r => [[r], r]);\n}\n\nfunction App() {\n  return (\n    <Parent>\n      <div>React.Children.map</div>\n    </Parent>\n  );\n}\n```\n\n> [React.Children.map](https://codesandbox.io/s/4r08jvpk9w)\n\n### React.Children.map 源码流程图\n\n`React.Children.map` 的源码中有两个递归, 一个是针对 `React.Children` 的递归, 另外个是针对 React.Children.map 传入的第二个参数, 如果其返回的是数组则会再次递归, 目的是对数组中的数据进行铺平。\n\n![](https://github.com/MuYunyun/blog/blob/master/React/image/%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/React.Children.map.png)\n"}}]);