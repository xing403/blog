---
title: uniApp 使用本地缓存
layout: doc
---
# Base64 utils文件
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>uniapp</el-tag>
  <el-tag>storage</el-tag>
</div>

## 在util 创建一个storage 目录 并在该目录下创建 storage.js
```javascript
/**
 * 判断字符串是否是json字符串
 * @param {string} str 
 */
const isJsonString = str => {
  try {
    const toObj = JSON.parse(str);
    if (toObj && typeof toObj === 'object') {
      return true
    }
  } catch {}
  return false
}
/**
 * 设置缓存
 * @param {string} name 
 * @param {string | Array } value 
 */
export function set(name, value) {
  if (value && typeof value == 'object') { //设置json缓存数据
    uni.setStorageSync(name, JSON.stringify(value));
  } else { //设置缓存数据
    uni.setStorageSync(name, value);
  }
}
/**
 * 获取缓存
 * @param {string} name 
 */
export function get(name) { //获取缓存数据
  var data = uni.getStorageSync(name);
  if (data) {
    if (isJsonString(data)) { //json字符串转对象
      return JSON.parse(data);
    }
    return data;
  }
  return null;
}
/**
 * 移除缓存
 * @param {string} name 
 */
export function remove(name) { // 清除某项缓存
  uni.removeStorageSync(name);
}
/**
 * 清空缓存
 */
export function clear() { // 清空缓存
  uni.clearStorageSync();
}
module.exports = {
  set,
  get,
  remove,
  clear
}

```
