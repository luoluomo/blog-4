(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3650],{53650:n=>{n.exports="### 23.Merge k Sorted Lists\n\nMerge k `sorted linked lists` and return it as `one sorted list`. Analyze and describe its complexity.\n\nExample:\n\n```js\nInput:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nOutput: 1->1->2->3->4->4->5->6\n```\n\n### Analyze\n\n思路一: 分治算法。可以将合并 k 个排序队列转换为合并 2 个排序队列。\n\n图例解释:\n\n```js\n   cur\ndummyNode -> 1 -> 4 -> 5\n\ncomparedCur\n    2       -> 6\n```\n\n```js\n/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n *     this.val = val;\n *     this.next = null;\n * }\n */\n/**\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nvar mergeKLists = function(lists) {\n  let result = lists[0] || null\n\n  for (let i = 1; i < lists.length; i++) {\n    const compareList = lists[i]\n    result = mergeTwoLists(result, compareList)\n  }\n  return result\n}\n\nvar mergeTwoLists = function(curList, compareList) {\n  const dummyNode = new ListNode(0)\n  dummyNode.next = curList\n  let cur = dummyNode\n  let comparedCur = compareList\n\n  while (cur.next && comparedCur) {\n    if (cur.next.val > comparedCur.val) {\n      let nextComparedCur = comparedCur.next\n      comparedCur.next = cur.next\n      cur.next = comparedCur\n      comparedCur = nextComparedCur\n    }\n    cur = cur.next\n  }\n  if (comparedCur) {\n    cur.next = comparedCur\n  }\n\n  return dummyNode.next\n}\n```\n\n思路二: 优先队列\n\n* 将数组中的队列加入进优先队列(基于最小堆);\n* 如果当前优先队列不为空:\n  * 取出当前`优先队列顶部队列元素`(最小值), 拼接到`输出队列`中;\n  * 同时在优先队列插入取出的顶部队列元素的下一个值;\n\n由于在 JavaScrit 中没有封装好的优先队列, 在此先进行封装`优先队列函数`(最小堆)。\n\n```js\nvar len\n\n/**\n * to build min heapify from bottom to top;\n * the last subscript's parent subscript is Math.floor((len - 1) / 2)\n */\nvar buildMinHeapify = function(arr) {\n  len = arr.length\n\n  for (let i = Math.floor((len - 1) / 2); i >= 0; i--) {\n    siftDown(arr, i)\n  }\n  return arr\n}\n\n/**\n * Insert a value into heap. It's an operation called sift up.\n */\nvar enqueue = function(arr, value) {\n  arr.splice(len, 0, value)\n  len++\n  siftUp()\n}\n\n/**\n * to keep min heap, it's an operation called sift up.\n */\nvar siftUp = function() {\n  let enqueueValSubscript = len - 1\n  let parent = Math.floor(enqueueValSubscript / 2)\n  while (parent > 0 && arr[parent] > arr[enqueueValSubscript]) {\n    swap(arr, parent, enqueueValSubscript)\n    enqueueValSubscript = parent\n    parent = Math.floor(enqueueValSubscript / 2)\n  }\n}\n\n/*\n * to pick the smallest or the biggest element from the heap and return it;\n * Then t'll swap the endest element with the first element, and then keep the\n * heap length reduce one. If so, only do once sift down operation in the first element to keep heapify.\n */\nvar dequeue = function() {\n  const maxValue = arr[0]\n  swap(arr, len - 1, 0)\n  len--\n  siftDown(arr, 0)\n  return maxValue\n}\n\n/**\n * to keep min heap, it's an operation called sift down.\n */\nvar siftDown = function(arr, i) {\n  const left = 2 * i + 1\n  const right = 2 * i + 2\n  let minSubscript = i\n\n  if (left < len && arr[left] < arr[minSubscript]) {\n    minSubscript = left\n  }\n\n  if (right < len && arr[right] < arr[minSubscript]) {\n    minSubscript = right\n  }\n\n  if (minSubscript !== i) {\n    swap(arr, minSubscript, i)\n    siftDown(arr, minSubscript)\n  }\n}\n\n// swap two value in arr\nvar swap = function(arr, pointOne, pointTwo) {\n  const tmp = arr[pointOne]\n  arr[pointOne] = arr[pointTwo]\n  arr[pointTwo] = tmp\n}\n```\n\nTest case one:\n\n```js\ninput: var arr = [5, 2, 7, 3, 1, 8, 4]\n\n           8\n        ↙     ↘\n     3          7\n  ↙    ↘      ↙   ↘\n2        1  5       4\n\nbuildMinHeapify(arr) // [1, 2, 4, 3, 5, 8, 7]\n\n           1                                           1\n        ↙     ↘          enqueue(arr, 6)            ↙     ↘\n     2          4        ---------------\x3e         2          4\n  ↙    ↘      ↙   ↘                            ↙    ↘      ↙   ↘\n3        5  8       7                        3        5  8        7\n                                           ↙\n                                         6\n\n                                     2\n        return 1                  ↙     ↘\n        dequeue()               3         4\n    ----------------\x3e        ↙    ↘     ↙   ↘\n                           6       5   8      7\n```\n\n在 JavaScript 中使用优先队列成本相对较高, 暂时不考虑。"}}]);