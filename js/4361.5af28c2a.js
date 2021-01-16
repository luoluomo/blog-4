(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4361],{84361:n=>{n.exports="### 20.Valid_Parentheses\n\nGiven a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n\nNote that an empty string is also considered valid.\n\nExample 1:\n\n```js\nInput: \"()\"\nOutput: true\n```\n\nExample 2:\n\n```js\nInput: \"()[]{}\"\nOutput: true\n```\n\nExample 3:\n\n```js\nInput: \"(]\"\nOutput: false\n```\n\nExample 4:\n\n```js\nInput: \"([)]\"\nOutput: false\n```\n\nExample 5:\n\n```js\nInput: \"{[]}\"\nOutput: true\n```\n\n### analyze\n\n考察栈的使用。\n\n```js\n/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function (s) {\n  const obj = {\n    '(': ')',\n    '{': '}',\n    '[': ']',\n  }\n  const cacheArr = []\n  for (let i = 0; i < s.length; i++) {\n    if (Object.keys(obj).includes(s[i])) {\n      cacheArr.push(s[i])\n    } else {\n      const pick = cacheArr.pop()\n      if (obj[pick] !== s[i]) {\n        return false\n      }\n    }\n  }\n\n  return cacheArr.length === 0\n}\n```\n\n### Similar Title\n\n* 71、150"}}]);