(self.webpackChunkblog=self.webpackChunkblog||[]).push([[2293],{52293:n=>{n.exports='### 150.Evaluate Reverse Polish Notation\n\nEvaluate the value of an arithmetic expression in Reverse Polish Notation.\n\nValid operators are `+, -, *, /`. Each operand may be an `integer` or `another expression`.\n\nNote:\n\n* Division between two integers should truncate toward zero.\n* The given RPN expression is `always valid`. That means the expression would always evaluate to a result and there won\'t be any divide by zero operation.\n\nExample 1:\n\n```js\nInput: ["2", "1", "+", "3", "*"]\nOutput: 9\n\nExplanation: ((2 + 1) * 3) = 9\n```\n\nExample 2:\n\n```js\nInput: ["4", "13", "5", "/", "+"]\nOutput: 6\n\nExplanation: (4 + (13 / 5)) = 6\n```\n\nExample 3:\n\n```js\nInput: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]\nOutput: 22\n\nExplanation:\n  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5\n= ((10 * (6 / (12 * -11))) + 17) + 5\n= ((10 * (6 / -132)) + 17) + 5\n= ((10 * 0) + 17) + 5\n= (0 + 17) + 5\n= 17 + 5\n= 22\n```\n\n### Analyze\n\n栈的使用, 思路大致如下:\n\n1. 遇到数字推入栈;\n2. 遇到符号则从栈中取出最后两位进行数学操作;\n\n> 稍加留意的是, 需要对 / 运算进行取整操作;\n\n```js\n/**\n * @param {string[]} tokens\n * @return {number}\n */\nvar evalRPN = function(tokens) {\n  const stack = []\n  const operateTag = [\'+\', \'-\', \'*\', \'/\']\n  for (let i = 0; i < tokens.length; i++) {\n    const operateTagIndex = operateTag.indexOf(tokens[i])\n    if (operateTagIndex === -1) {\n      stack.push(tokens[i])\n    } else {\n      const y = stack.pop()\n      const x = stack.pop()\n      let result\n      if (operateTagIndex === 0) {\n        result = Number(x) + Number(y)\n      } else if (operateTagIndex === 1) {\n        result = Number(x) - Number(y)\n      } else if (operateTagIndex === 2) {\n        result = Number(x) * Number(y)\n      } else if (operateTagIndex === 3) {\n        result = parseInt((Number(x) / Number(y)), 10)\n      }\n      stack.push(result)\n    }\n  }\n  return stack[0]\n}\n```\n\n### Similar Title\n\n20、71'}}]);