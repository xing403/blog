---
title: Notification 发送通知
layout: doc
---
# Notification 发送通知
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>electron</el-tag>
  <el-tag>vue</el-tag>
  <el-tag>vite</el-tag>
  <el-tag>notification</el-tag>
</div>

* 前提请先了解主进程与渲染进程通信

## 主进程中定义接受通知的函数
> 通过监听渲染进程发送到的通知消息展示需要通知的信息
```ts
ipcMain.handle('notification', (_event, title, body) => {
  new Notification({
    title,
    body,
  }).show()
})
```
> Windows 10默认通知时间为 `5s`
## 渲染进程定义发送函数，并暴露给页面文件使用
```ts
// 定义发送给主进程的函数
export const sendNotification = (title: string, body: string) => ipcRenderer.invoke('notification', title, body)
// 使用`contextBridge.exposeInMainWorld` 暴露 sendNotification 函数
```
## 页面中使用
```ts
// UtilsTools 渲染进程中暴露的实例名称（自定义），包括暴露的 sendNotification 方法
window.UtilsTools.sendNotification('title', `${count.value}`)
```

<el-alert show-icon type="info" effect="dark" :closable="false">
  <template #title>
    <div>这里使用的是主进程与渲染进程双向通信，可在通知后或者点击通知后执行操作返回给渲染进程，以便以他操作</div>
  </template>
</el-alert>

