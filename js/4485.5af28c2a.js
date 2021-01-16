(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4485],{4485:n=>{n.exports='### title\n\n判断一个 9x9 的数独是否有效。只需要根据以下规则, 验证已经填入的数字是否有效即可。\n\n1.数字 1-9 在每一行只能出现一次。\n2.数字 1-9 在每一列只能出现一次。\n3.数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。\n\n[题目链接](https://leetcode-cn.com/problems/valid-sudoku/description/)\n\n示例 1:\n\n```\n输入:\n[\n  ["5","3",".",".","7",".",".",".","."],\n  ["6",".",".","1","9","5",".",".","."],\n  [".","9","8",".",".",".",".","6","."],\n  ["8",".",".",".","6",".",".",".","3"],\n  ["4",".",".","8",".","3",".",".","1"],\n  ["7",".",".",".","2",".",".",".","6"],\n  [".","6",".",".",".",".","2","8","."],\n  [".",".",".","4","1","9",".",".","5"],\n  [".",".",".",".","8",".",".","7","9"]\n]\n输出: true\n```\n\n示例 2:\n\n```\n输入:\n[\n  ["8","3",".",".","7",".",".",".","."],\n  ["6",".",".","1","9","5",".",".","."],\n  [".","9","8",".",".",".",".","6","."],\n  ["8",".",".",".","6",".",".",".","3"],\n  ["4",".",".","8",".","3",".",".","1"],\n  ["7",".",".",".","2",".",".",".","6"],\n  [".","6",".",".",".",".","2","8","."],\n  [".",".",".","4","1","9",".",".","5"],\n  [".",".",".",".","8",".",".","7","9"]\n]\n输出: false\n解释: 除了第一行的第一个数字从 5 改为 8 以外, 空格内其他数字均与 示例1 相同。\n     但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。\n```\n\n说明:\n\n* 一个有效的数独（部分已被填充）不一定是可解的\n* 只需要根据以上规则, 验证已经填入的数字是否有效即可\n* 给定数独序列只包含数字 1-9 和字符 \'.\'\n* 给定数独永远是 9x9 形式的\n\n### analyze\n\n依次遍历二维数组, 对 3 种情况分别进行校验。\n\n```js\n/**\n * @param {character[][]} board\n * @return {boolean}\n */\nvar isValidSudoku = function (board) {\n  const set = new Set()\n  for (let x = 0; x < 9; x++) {\n    for (let y = 0; y < 9; y++) {\n      const num = board[x][y]\n      if (num !== \'.\') {\n        if (set.has(`row ${x} ${num}`)\n          || set.has(`col ${y} ${num}`)\n          || set.has(`block ${Math.floor(x / 3)} ${Math.floor(y / 3)} ${num}`)\n        ) {\n          return false\n        } else {\n          set.add(`row ${x} ${num}`)\n          set.add(`col ${y} ${num}`)\n          set.add(`block ${Math.floor(x / 3)} ${Math.floor(y / 3)} ${num}`)\n        }\n      }\n    }\n  }\n  return true\n};\n```'}}]);