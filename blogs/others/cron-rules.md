---
title: cron 规则
layout: doc
tags: ['cron']
---
<script setup>
const table1 = [{
  name: '秒',
  value: '0~59的整数',
  symbol: ', - * /',
}, {
  name: '分',
  value: '0~59的整数',
  symbol: ', - * /',
}, {
  name: '小时',
  value: '0~23的整数',
  symbol: ', - * /',
}, {
  name: '日期',
  value: '1~31的整数(根据当月判断)',
  symbol: ', - * ? / L W C',
}, {
  name: '月份',
  value: '1~12的整数 或者 JAN-DEC(1为JAN)',
  symbol: ', - * /',
}, {
  name: '星期',
  value: '1~7的整数 或者 SUN-SAT(1=SUN)',
  symbol: ', - * ? / L C #',
}, {
  name: '年(可选)',
  value: '1970~2099的整数',
  symbol: ', - * /',
}]
const desc_symbol = [{
  label: '*',
  value: '表示匹配该域的任意值',
}, {
  label: '?',
  value: '表示未说明的值，即不关心它为何值',
}, {
  label: '-',
  value: '表示一个指定的范围',
}, {
  label: '/',
  value: '表示起始时间开始触发，然后每隔固定时间触发一次（符号前表示开始时间，符号后表示每次递增的值）',
}, {
  label: ',',
  value: '表示列出枚举值（指定数个值）',
}, {
  label: 'L',
  value: '表示最后, 只能出现在DayofWeek和DayofMonth域',
}, {
  label: 'W',
  value: '表示有效工作日(周一到周五),只能出现在DayofMonth域, 系统将在离指定日期的最近的有效工作日触发事件',
}, {
  label: 'LW',
  value: '表示在某个月最后一个工作日，即最后一个星期五',
}, {
  label: '#',
  value: '用于确定每个月第几个星期几, 只能出现在DayofWeek域',
}, {
  label: 'C',
  value: '指和calendar联系后计算过的值',
}]
</script>

## cron 表达式
Cron表达式是以5或6个空格隔开, 将内容分为6或7个域, 每一个域代表一个日期时间的格式

### Cron的格式

::: raw
<el-space fill w-full my-1>
  <div>从左到右 (用空格隔开) : 秒 分 小时 月份中的日期 月份 星期中的日期 [年份]</div>
  <el-alert show-icon title="年份为可选" type="info" :closable="false" />
</el-space>

<el-table :data="table1" stripe border w-full>
  <el-table-column prop="name" label="名称" />
  <el-table-column prop="value" label="允许的数值" />
  <el-table-column prop="symbol" label="允许的符号" />
</el-table>
:::

### 符号含义

::: raw
<el-descriptions border :column="1">
  <el-descriptions-item v-for="item, index in desc_symbol" :key="index" :label="item.label">
    {{ item.value }}
  </el-descriptions-item>
</el-descriptions>
:::

## cron 举例

### 每隔10秒执行一次

```js
let cron = '*/10 * * * * ?'
```
### 每隔1分钟执行一次
```js
let cron = '0 */1 * * * ?'
```
### 每天23点执行一次
```js
let cron = '0 0 23 * * ?'
```

### 每隔一小时30分钟执行一次

<el-alert show-icon title="请注意" type="warning" :closable="false" />

当你直接定时一下格式时，看似每隔90分钟执行一次，其实并不是，而是60分钟执行一次，因为分钟的最大先限度60
```js
let cron1 = '0 */90 * * * ?'
```
<el-alert show-icon title="正确的方式如下" type="success" :closable="false" />
需要多个表达式的组合进行执行
```js
let cron1 = '0 30 */3 * * ?'  // 每隔三小时的30分钟执行一次
let cron2 = '0 0 */3 * * ?' // 每隔三小时的0分钟执行一次
// 表达式执行1 开始时间：00:00:00 
// 依次执行时间 01:30:00, 04:30:00 07:30:00 ...
// 表达式2执行: 00:00:00, 03:00:00, 06:00:00 ...
```

### 每个月1号和15号执行一次
```js
let cron = '0 0 0 1,15 * ?'
```
### 每个月的1号和15号和6号的12点执行一次
```js
let cron = '0 0 12 1,15,6 * ?'
```
### 周一到周五执行
```js
let cron = '0 0 0 * * 1-5'
```
### 每月的最后一天执行
```js
let cron = '0 0 0 L * ?'
```
### 每个月的最后一个星期五执行
```js
let cron = '0 0 0 LW * ?'
```
