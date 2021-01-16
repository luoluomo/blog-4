(self.webpackChunkblog=self.webpackChunkblog||[]).push([[9869],{19869:n=>{n.exports="### Contains Duplicate III\n\nGiven an array of integers, find out whether there are `two distinct indices` i and j in the array such that the absolute difference between nums[i] and nums[j] is at most t and the absolute difference between i and j is at most k.\n\nExample 1:\n\n```js\nInput: nums = [1,2,3,1], k = 3, t = 0\nOutput: true\n```\n\nExample 2:\n\n```js\nInput: nums = [1,0,1,1], k = 1, t = 2\nOutput: true\n```\n\nExample 3:\n\n```js\nInput: nums = [1,5,9,1,5,9], k = 2, t = 3\nOutput: false\n```\n\n### Analyze\n\n思路: 参照官方题解该题可以使用桶排序的思想来设置查找表的 key - value。比较好理解的一个例子: 小敏生日在 3 月份, 她想知道是否有其他同学生日和她在 30 天以内, 假设每个月有 30 天, 那么只要找 2 月份和 4 月份两个月生日的同学就行了, 转化到该题目即 key 只要保留一个 value 就行。\n\n> 桶排序的思想: 将数据根据归类划分到若干个区域, 然后对该些区域分别进行排序;\n\n此题综合了滑动窗口、查找表、桶排序的知识, 需要二刷。\n\n```js\n| i - j | ≤ k\n| nums[i] - nums[j] | ≤ t\n```\n\n* 此外需要考虑边界值\n  * k <= 0、 t <= 0\n\n```js\n/**\n * @param {number[]} nums\n * @param {number} k\n * @param {number} t\n * @return {boolean}\n */\nvar containsNearbyAlmostDuplicate = function(nums, k, t) {\n  if (k < 0 || t < 0) return false\n  const getKey = (value) => {\n    return Math.floor(value / (t + 1))\n  }\n\n  const map = new Map()\n\n  let l = 0\n  while (l < nums.length) {\n    const key = getKey(nums[l])\n\n    if (map.has(key)) {\n      return true\n    } else if (map.has(key + 1) || map.has(key - 1)) {\n      if (map.get(key + 1) - nums[l] <= t) { return true }\n      if (nums[l] - map.get(key - 1) <= t) { return true }\n    }\n\n    map.set(key, nums[l])\n\n    if (l >= k) {\n      map.delete(getKey(nums[l - k]))\n    }\n\n    l++\n  }\n\n  return false\n}\n```\n\n### Sister Title\n\n217、219"}}]);