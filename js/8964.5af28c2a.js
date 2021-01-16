(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8964],{8964:n=>{n.exports="### 复合组件(Compound Component)\n\n#### 使用 static 来复合组件\n\n优点如下:\n\n* 结构更加清晰\n\n```jsx\nclass Toggle extends React.Component {\n  static On = ({on, children}) => on ? children : null\n  static Off = ({on, children}) => on ? null : children\n  static Button = ({on, toggle}) => <Switch on={on} onClick={toggle} />\n\n  state = {on: false}\n  toggle = () =>\n    this.setState(\n      ({on}) => ({on: !on}),\n      () => this.props.onToggle(this.state.on),\n    )\n  render() {\n    return React.Children.map(this.props.children, reactElement => {\n      return React.cloneElement(reactElement, {\n        on: this.state.on,\n        toggle: this.toggle,\n      })\n    })\n  }\n}\n\n// 使用这种设计模式来复合组件, 可以看到组件的使用十分清晰\n<Toggle onToggle={() => console.log('onToggle')}>\n  <Toggle.On>The button is on</Toggle.On>\n  <Toggle.Off>The button is off</Toggle.Off>\n  <Toggle.Button />\n</Toggle>\n```\n\n### 资料\n\n* [advanced-react-patterns-v2](https://github.com/demos-platform/advanced-react-patterns-v2/blob/master/src/exercises/02.js)\n\n"}}]);