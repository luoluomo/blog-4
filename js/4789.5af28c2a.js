(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4789],{64789:n=>{n.exports='### setState 回调替代方案\n\n在脚手架中发现 setState 禁用了回调的使用。因为目前发现使用 setState 第二个参数的场景是想用 setState 更新状态后的值。\n\n```js\nclass App extenes React.Component {\n  countName = () => {\n    if (this.state.name === "xxx") {\n      this.setState({\n        count: this.state.count + 1\n      })\n    }\n  }\n\n  handle = name => {\n    this.setState(\n      {\n        name\n      },\n      this.countName\n    )\n  }\n}\n```\n\n回调的方式会造成多余一次渲染, 可改为`传参`的方式代替回调的方式。\n\n```js\nclass App extenes React.Component {\n  countName = (name) => {\n    if (name === "xxx") {\n      this.setState({ // 2\n        count: this.state.count + 1\n      })\n    }\n  }\n\n  handle = name => {\n    this.countName(name)\n    this.setState({\n      name\n    })\n  }\n}\n```'}}]);