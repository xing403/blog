---
title: 数组与字典的相互转换
layout: doc
---
# 数组与字典的相互转换
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>array2dictionary</el-tag>
  <el-tag>tools</el-tag>
</div>

## 数组或字典格式
```ts
let array = [
  { key: 'key1', value: 'value1'}
  { key: 'key2', value: 'value2'}
  { key: 'key3', value: 'value3'}
]
let dictionary = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
}

let dictionary = {
  key1: {
    value11: 'value11'
    value12: 'value12'
  },
  key2: {
    value21: 'value21',
    value22: 'value22'
  },
  key3: {
    value31: 'value31'
    value32: 'value32'
  }
}
```

## 数组转化为字典
```ts
function Arr2Dict(array, key = 'key', del_key = false) {
  return array.reduce(function (obj, item) {
    const keys = Object.keys(item)
    if (!keys.includes(key))
      throw new Error(`the key \`${key}\` not exists`)

    if (['object', 'function', 'undefined', 'symbol'].includes(typeof item[key]))
      throw new Error(`the value of key \`${key}\` typeof \`${typeof item[key]}\`, is not acceptable type`)

    if (isNaN(item[key]))
      throw new Error(`the value of key \`${key}\` is NaN, is not acceptable type`)

    if (keys.length == 1) { // do nothing
      return item
    } else if (keys.length == 2) { // transform [{key: value}]
      let value_key = keys.filter(i => i != key)[0];
      obj[item[key]] = item[value_key];
    } else {  // transform [{ key: { key1: value1, key2: value2, ...} }]
      obj[item[key]] = item;
      if (del_key) delete item[key];  // delete the value corresponding to key
    }
    return obj;
  }, {});
}
```
## 支持的键所对应的类型

|   键对应值类型  |   是否支持   |   键对应值类型   |   是否支持   |
|     :---:    |   :---:    |     :---:     |    :---:   |
|   `number`  | ​:heavy_check_mark: |     `string`    | ​:heavy_check_mark: |
|   `boolean`  | ​:heavy_check_mark: |    `function`    |    :x:    |
|   `array`   |     :x:     |    `null`     |    :x:    |
|   `undefined` |     :x:     |    `NaN`      |    :x:    |
|   `object`  |     :x:     |    `Symbol`     |    :x:    |

+ 判断方式使用 `typeof`

## 字典转化为数组
```ts
function Dict2Arr(dictionary, key = 'key', save_key = true) {
  var array = Object.keys(dictionary).map(function (name) {
    let item = dictionary[name]
    if (save_key) item[key] = name
    return item;
  });
  return array;
}
```
