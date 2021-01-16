(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4999],{4999:n=>{n.exports='### BFC 含义\n\n块级格式化上下文(Block Formatting Context)\n\n### BFC 特性\n\n* 同一个 BFC 内元素外边距会发生重合(见案例一)\n* BFC 内可以有浮动元素(见案例二)\n* BFC 内可以分离浮动元素(见案例三)\n\n#### 案例一\n\n```html\n<style>\n  div {\n    width: 100px;\n    height: 100px;\n    background-color: red;\n    margin: 100px;\n  }\n</style>\n\n<body>\n  <div></div>\n  <div></div>\n</body>\n```\n\n![](http://with.muyunyun.cn/4e86e658780009017a22bbb025043276.jpg-300)\n\n可以看到此时两个 div 之间的间距并不是 200px, 而是 100px\n\n此时可以在父节点加上 `overflow: hidden` 使其变为 BFC 元素, 从而避免重叠。\n\n```html\n<style>\n  div {\n    overflow: hidden;\n  }\n  p {\n    width: 100px;\n    height: 100px;\n    background-color: red;\n    margin: 100px;\n  }\n</style>\n\n<body>\n  <div>\n    <p></p>\n  </div>\n  <div>\n    <p></p>\n  </div>\n</body>\n```\n\n![](http://with.muyunyun.cn/ffa04ee49e9b4d221361929324236c05.jpg-300)\n\n此时, 可以看到两个 div 之间的距离已变为期望的 200 px；\n\n#### 案例二\n\n```html\n<style>\n  .border {\n    border: 1px solid #000;\n  }\n  .content {\n    width: 100px;\n    height: 100px;\n    background-color: red;\n    float: left;\n  }\n</style>\n\n<body>\n  <div class="border">\n    <p class="content"></p>\n  </div>\n</body>\n```\n\n子节点加上 float: left 后, 其脱离了文档流, 所以只看到一条 1px 的线条, 如下:\n\n![](http://with.muyunyun.cn/6b657c7f8d985992c97269fb61bb8678.jpg-300)\n\n此时在父节点中加上 overflow: hidden 使其变为 BFC 元素从而消除浮动, 代码如下:\n\n```html\n<style>\n  .border {\n    border: 1px solid #000;\n    overflow: hidden;  // 在此处加上 overflow: hidden; 可以消除浮动\n  }\n  .content {\n    width: 100px;\n    height: 100px;\n    background-color: #ff0000;\n    float: left;\n  }\n</style>\n\n<body>\n  <div class="border">\n    <p class="content"></p>\n  </div>\n</body>\n```\n\n![](http://with.muyunyun.cn/6bde303c9e6c57a7d1ce73543d4c8dcc.jpg-300)\n\n#### 案例三\n\n```html\n<style>\n  .content1 {\n    width: 100px;\n    height: 100px;\n    background-color: red;\n    float: left;\n  }\n\n  .content2 {\n    width: 200px;\n    height: 200px;\n    background-color: green;\n  }\n</style>\n\n<body>\n  <div class="content1"></div>\n  <div class="content2"></div>\n</body>\n```\n\n相邻节点中的一个节点使用 float: left, 其脱离文档流, 从而两个 div 标签发生了重叠,\n\n![](http://with.muyunyun.cn/c7ebcfce5a7c58142fc9004a7d545852.jpg-300)\n\n此时在普通流节点上使用 overflow: hidden 使其变为 BFC 元素从而使 BFC 元素和浮动元素分离:\n\n```html\n<style>\n  .content1 {\n    width: 100px;\n    height: 100px;\n    background-color: red;\n    float: left;\n  }\n\n  .content2 {\n    width: 200px;\n    height: 200px;\n    background-color: green;\n    overflow: hidden;\n  }\n</style>\n\n<body>\n  <div class="content1"></div>\n  <div class="content2"></div>\n</body>\n```\n\n![](http://with.muyunyun.cn/cb83333e3e31f59d4946e0d3cdd2a56a.jpg-300)\n\n### 如何触发 BFC\n\n```\n* overflow: 不为 visible;\n* position: 不为 static 以及 relative;\n* float: 不为 none;\n* display: 为 inline-box、table-ceil、flex;\n```\n\n### question\n\nHere is my demo,\n\n```html\n<html lang="en">\n  <style>\n    li {\n      display: inline-block;\n      background: red;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      width: 30px\n    }\n\n    .demo {\n      width: 90px;\n    }\n\n    .clearfix {\n      overflow: visible;\n    }\n  </style>\n  <body>\n    <ul class="demo">\n      <li>testtest</li>\n      <li>testtest</li>\n      <li>testtest</li>\n      <li>testtest</li>\n      <li>testtest</li>\n      <li>testtest</li>\n    </ul>\n  </body>\n</html>\n```\n\nI\'m confused why is it, I want to use overflow: hidden and not expect the strange gap, how can I do?\n\n![](http://with.muyunyun.cn/79377b5f34efca7b6574fff146c37f56.jpg)\n\nthe solve way is to add `line-height: 0` to the class demo and add `line-height: 12px` to the tag li.\n\n> [there-is-an-strange-distance-when-using-overflow-hidden](https://stackoverflow.com/questions/60482616/there-is-an-strange-distance-when-using-overflow-hidden)'}}]);