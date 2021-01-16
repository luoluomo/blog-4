(self.webpackChunkblog=self.webpackChunkblog||[]).push([[1747],{81747:n=>{n.exports='### 背景与边框\n\n以下为与背景与边框相关比较有用的属性。\n\n* `background-origin`: 属性值有 `border-box/padding-box/content-box`。默认为 `padding-box`。\n* `background-clip`: The background-clip CSS property sets whether an element\'s background extends underneath its border box, padding box, or content box. 属性值有 `border-box/padding-box/content-box`。默认值为 `border-box`。\n\n#### 图片自适应\n\n```css\n.demo {\n  width: 200px;\n  height: 100px;\n  background-size: cover;\n}\n```\n\n#### 半透明边框\n\n```html\n<style>\n  body {\n    background: black;\n  }\n  .translucent-border {\n    width: 100px;\n    height: 100px;\n    border: 10px solid rgba(255, 255, 255, .5);\n    background: white;\n    background-clip: padding-box; /* 这个属性能让背景和边框分离 */\n  }\n</style>\n<body>\n  <div class="translucent-border"></div>\n</body>\n```\n\n效果图\n\n![](http://with.muyunyun.cn/8e59c47dabc2eef7eb923b25811d1e44.jpg-200)\n\n[半透明边框](https://codepen.io/MuYunyun/pen/vPyOpB)\n\n#### 多重边框\n\n* 方案一: `box-shadow`\n\n```css\n.demo {\n  background: white;\n  box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink;\n}\n```\n\n* 方案二: `outline`\n\n> It seemd no way to set radius with outline.\n\n```css\n.demo {\n  background: white;\n  border: 10px solid #655;\n  outline: 5px solid deeppink;\n}\n```\n\n![](http://with.muyunyun.cn/622ab7417df7af16671522a3849690b7.jpg-200)\n\n#### 背景定位\n\n* 偏移量与容器内边距相同\n[background-origin 属性用法](http://play.csssecrets.io/background-origin)\n\n* 使用 `calc`:\n[calc 使用](http://dabblet.com/gist/b5fcb42d055427ab6c1a)\n\n```css\n.demo {\n  background-position: calc(100% - 20px) calc(100% - 10px) /* calc 里面的 -、+ 前后要各加个空格 */\n}\n```\n\n- [ ] 阅读到边框内圆角\n\n'}}]);