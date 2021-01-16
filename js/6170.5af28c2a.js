(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6170],{96170:n=>{n.exports='### css 是什么\n\n`css(cascading style sheet)` 层叠样式表。\n\n### 盒模型\n\n* 标准模型(默认)\n* IE 模型\n\n由 `box-sizing` 属性来控制\n\n* content-box(默认)\n* border-box\n\n> 它们的核心区别是是否将 border 以及 padding 算入 content 的 width 中(前提是设置了 width 下)。\n\n### 超过行内容显示省略号\n\n```css\n.demo {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n```\n\n### verticle-align\n\n* verticle-align: top\n\n> [行高与基线](https://blog.csdn.net/lulujiajiawenwen/article/details/8245201)\n\n### 样式表\n\n* 内联样式表\n\n```css\n.font {\n  color: red\n}\n\n<div class="font">hello, cpreact</div>\n```\n\n* 外联样式表\n\n```css\n<link rel="stylesheet" href="">\n```\n\n### 边框\n\n* 圆角效果 `border-radius`\n\n```css\n.demo {\n  border-radios:100px/10px  (水平100，垂直10)\n}\n```\n\n* 阴影 `box-shadow`: X 轴偏移量 Y 轴偏移量 [阴影模糊半径] [阴影扩展半径] [阴影颜色] [投影方式];（阴影模糊半径：只能是正值；阴影扩展半径：可以是正负值）（自带边框）\n\n> 外阴影 x 和 y(正值)出现在右下；内阴影 x 和 y(正值)出现在左上;\n\n### input 的宽度 —— 并不是给元素设置 display:block 就会自动填充父元素宽度。input 就是个例外，其默认宽度取决于 size 特性的值。\n\n![](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f6fef0a871?imageslim)\n\n### object-fit\n\nIt\'s a css property that can be eaqual to the background-size, it has five types:\n\n* fill: default\n* contain\n* cover: used in imagePicker\n* none\n* scale-down: if the image\'s size is imaller than box, it\'ll keep the image\'s size, otherwise it\'ll equal to contain. You can look for it [here](https://codepen.io/chrisnager/pen/XJgJqN)\n\n### style 里的样式过长该怎么办\n\n* 第一步: `$0.innerText`;\n* 第二步: 点击 `Show more(221 kB)`;'}}]);