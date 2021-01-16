(self.webpackChunkblog=self.webpackChunkblog||[]).push([[9543],{59543:n=>{n.exports="### Title\n\nGiven a sorted linked list, delete all duplicates such that each element appear only once.\n\nExample 1:\n\n```js\nInput: 1->1->2\nOutput: 1->2\n```\n\nExample 2:\n\n```js\nInput: 1->1->2->3->3\nOutput: 1->2->3\n```\n\n### Analyze\n\n该题思路比较直接, 使用 cur, next 两个指针表示当前值和下一值, 若 cur 指针的值与 next 指针的值相等, 则将 next 指针往后移动一位即可。\n\n```js\ncur   next\n 1  ->  1  ->  2  ->  3  ->  3\n\ncur          next\n 1  ->  1  ->  2  ->  3  ->  3\n```\n\n```js\n/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n *     this.val = val;\n *     this.next = null;\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar deleteDuplicates = function(head) {\n  const listNode = new ListNode(0)\n  listNode.next = head\n  let cur = listNode.next\n  while (cur) {\n    let next = cur.next\n    while (next && next.val === cur.val) {\n      next = next.next\n    }\n    cur.next = next\n    cur = cur.next\n  }\n  return listNode.next\n}\n```\n\n### Same Type Question\n\n2、86、328、445"}}]);