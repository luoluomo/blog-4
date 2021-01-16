(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4150],{14150:n=>{n.exports="### 108. Convert Sorted Array to Binary Search Tree\n\nGiven an array where elements are sorted in ascending order, convert it to a `height balanced BST`.\n\nFor this problem, a height-balanced binary tree is defined as a binary tree in which the `depth of the two subtrees of every node never differ by more than 1`.\n\nExample:\n\nGiven the sorted array: [-10,-3,0,5,9],\nOne possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:\n\n```js\n       0\n     /   \\\n   -3     9\n   /     /\n -10    5\n```\n\n### Analyze\n\n递归解题, 题目中`高度平衡即当前节点的左右子节点的深度不超过 1` 要稍微理解下。\n\n* 当数组为奇数时比如 [0, 1, 2], 此时取中间数 1 为根节点, 0 和 2 分别为其左右子节点, 此时满足高度平衡的条件。\n* 当数组为偶数时比如 [0, 1], 此时取中间数 1 为根节点, 0 为其左右子节点, 此时满足高度平衡的条件。\n\n```js\n/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\n/**\n * @param {number[]} nums\n * @return {TreeNode}\n */\nvar sortedArrayToBST = function(nums) {\n  if (nums.length === 0) return null\n  const mid = Math.floor(nums.length / 2)\n  const result = new TreeNode(nums[mid])\n  const left = nums.slice(0, mid)\n  const right = nums.slice(mid + 1, nums.length)\n  result.left = sortedArrayToBST(left)\n  result.right = sortedArrayToBST(right)\n  return result\n};\n\nfunction TreeNode(val) {\n  this.val = val;\n  this.left = this.right = null;\n}\n```"}}]);