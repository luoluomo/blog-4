(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4568],{64568:n=>{n.exports="### title\n\n给定两个大小为 m 和 n 的有序数组 nums1 和 nums2 。\n\n请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log (m+n)) 。\n\n你可以假设 nums1 和 nums2 均不为空。\n\n### Analyze\n\n```js\n/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function (nums1, nums2) {\n  let arr = nums1.concat(nums2).sort((r1, r2) => r1 - r2)\n  const length = arr.length\n  if (length % 2 === 0) {\n    return (arr[length / 2 - 1] + arr[length / 2]) / 2\n  } else {\n    return arr[(length + 1) / 2 - 1]\n  }\n}\n```"}}]);