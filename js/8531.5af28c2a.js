(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8531],{48531:n=>{n.exports="### 核心原则\n\n以简为美，简约至上。\n\n> 可以当成一门新语言来学\n\n### String\n\n* `SCSS` 的属性应该使用单引号;\n* 但有一些特殊的属性 (比如 `sans-serif/initial`) 无须使用引号, 例子如下:\n\n```SCSS\n$font-type: sans-serif\n```\n\n### Number\n\n* `0` 作为长度时后面不应该带有单位;\n* 给数字添加单位应该使用乘法, 例子如下:\n\n```SCSS\n$value: 42\n\n// yep\n$length: $value * 1px\n\n// nope\n$length: $value + 1px\n```\n\n* 数字间计算需要带上括号, 例子如下:\n\n```SCSS\n// yep\n.foo {\n  width: (100% / 3);\n}\n```\n\n### 嵌套选择器\n\n```SCSS\n.foo {\n  .bar {\n    &:hover {\n      color: red\n    }\n  }\n}\n```\n\n生成 `css` 为:\n\n```css\n.foo .bar:hover {\n  color: red;\n}\n```\n\n```SCSS\n.foo {\n  &-bar {\n    color: red;\n  }\n}\n```\n\n生成 `css` 为:\n\n```css\n.foo-bar {\n  color: red;\n}\n```\n\n### 混合宏\n\n在 `SCSS` 中提供函数的支持\n\n```SCSS\n@mixin dummy($a, $b, $c) {\n  // ...\n}\n\n@include dummy(true, 1, 'pdd')\n```\n\n### 条件语句\n\n```scss\n@if ($support-legacy) {\n  // ..\n} @else {\n  // ..\n}\n```\n\n### 循环\n\n一般使用 `each`\n\n```scss\n@each $key, $value in $map {\n  // ...\n}\n```\n\n结合伪类可以使用 `for`\n\n```scss\n@for $i from 0 through 10 {\n  .foo:nth-of-type(#{$i}) {\n    // ...\n  }\n}\n```\n\n### 继承\n\n```scss\n.demo1 {}\n\n.demo {\n  @extend .demo1\n}\n```\n\n### 参考文献\n\n* [sassguidelines](https://sass-guidelin.es/)\n* [sassguidelines 中文文档](https://sass-guidelin.es/zh)\n\n\n"}}]);