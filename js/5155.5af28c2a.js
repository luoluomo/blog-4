(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5155],{36608:n=>{n.exports='### 71.Simplify_Path\n\nGiven an absolute path for a file (Unix-style), simplify it. Or in other words, convert it to the canonical path.\n\nIn a UNIX-style file system, a period . refers to the current directory. Furthermore, a double period .. moves the directory up a level. For more information, see: Absolute path vs relative path in Linux/Unix\n\nNote that the returned canonical path must always `begin with a slash /`, and there must be `only a single slash / between two directory names`. The last directory name (if it exists) must `not end with a trailing /`. Also, the canonical path must be the shortest string representing the absolute path.\n\nExample 1:\n\nExplanation: Note that there is no trailing slash after the last directory name.\n\n```js\nInput: "/home/"\nOutput: "/home"\n```\n\nExample 2:\n\nExplanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.\n\n```js\nInput: "/../"\nOutput: "/"\n```\n\nExample 3:\n\nExplanation: In the canonical path, multiple consecutive slashes are replaced by a single one.\n\n```js\nInput: "/home//foo/"\nOutput: "/home/foo"\n```\n\nExample 4:\n\n```js\nInput: "/a/./b/../../c/"\nOutput: "/c"\n```\n\nExample 5:\n\n```js\nInput: "/a/../../b/../c//.//"\nOutput: "/c"\n```\n\nExample 6:\n\n```js\nInput: "/a//b////c/d//././/.."\nOutput: "/a/b/c"\n```\n\n### Analyze\n\n可以用栈的思想来完成解题;\n\n1. 使用 \'/\' 分割 path 为得到数组;\n2. 对以下几种情况分别处理:\n   1. 如果遇见 \'.\' 或者 \'\', 则忽略;\n   2. 如果遇见字母, 则将其推入栈的末尾;\n   3. 如果遇见 \'..\', 则从栈末尾移除一个元素;\n\n```js\n/**\n * @param {string} path\n * @return {string}\n */\nvar simplifyPath = function(path) {\n  const pathArr = path.split(\'/\')\n  const stack = []\n  for (let i = 0; i < pathArr.length; i++) {\n    if (pathArr[i] === \'..\') {\n      stack.pop()\n    } else if (pathArr[i] === \'.\' || pathArr[i] === \'\') {\n      continue\n    } else {\n      stack.push(pathArr[i])\n    }\n  }\n\n  return `/${stack.join(\'/\')}`\n}\n```\n\n### Similar Title\n\n20、150'}}]);