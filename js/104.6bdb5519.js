(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{794:function(n,a){n.exports="### Usage\n\n```js\nyarn add xx -D\n```\n\n在本地开发一个独立的包, 可以通过 `yarn link` 进行链接开发。\n\n> yarn link 的包同时会注入到 node_modules 中\n\n### 配置 yarn 全局路径\n\n* 1. `yarn global dir` 得到 /Users/mac/.config/yarn/global\n* 2. vim .zshrc\n  * 2.1 加上 export NODE_PATH=/Users/mac/.config/yarn/global/node_modules/\n* yarn add puppeteer -g\n\n### bin\n\n```js\nyarn global bin // find yarn global bin path\nnpm bin -g      // find npm global bin path\n```\n\nyarn link xx, 就是将 bin 的命令挂载到 global 上。\n\n```js\nyarn link xx\n```"}}]);