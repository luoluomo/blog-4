(self.webpackChunkblog=self.webpackChunkblog||[]).push([[9961],{99961:n=>{n.exports='### 样式相关\n\n1. elt.style\n\n* 优点: 能使用 api 或者直接改写 style 内的样式\n* 缺点: 只能针对内嵌样式\n\n2. window.getComputedStyle(elt[, pseudoElt])\n\n* 优点: 支持内联样式\\外联样式\n* 缺点: 只能进行只读操作, 不支持 IE\n\n3. elt.getBoundingClientRect()\n\n> 在设置了 width 的前提下, 在标准盒模型下(box-sizing: content-box) margin 不算入其中, padding 算入其中;\n\n* 能获得位置相关信息\n\n### 操作已存在的 dom 元素\n\n这个点藏得比较深, 如果 `appendChild/insertBefore` 操作已经存在的 dom, 则原来的 dom 会移除。(只有一份实例)。\n\n```html\n<form>\n  <select id="select1">\n    <option>1</option>\n  </select>\n  <select id="select2">\n    <option>2</option>\n  </select>\n</form>\n<script>\n  var select2 = document.getElementById(\'select2\')\n  select2.appendChild(select1.options[0])\n<\/script>\n```\n\n如上 demo 中, `select1` 的 option 就会被转移到 `select2` 下'}}]);