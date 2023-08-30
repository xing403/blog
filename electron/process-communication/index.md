---
title: 主进程与渲染进程通信
layout: doc
---
# 主进程与渲染进程通信
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>electron</el-tag>
  <el-tag>vue</el-tag>
  <el-tag>vite</el-tag>
</div>

## ipcMain
> 从主进程到渲染进程的异步通信。主进程：程序执行的入口。
> 当应用启动时，Node.js 运行主进程，主进程通过 BrowserWindow 创建页面。

## ipcRenderer
> 从渲染进程到主进程的异步通信。渲染进程：页面渲染的进程。
> 渲染进程是页面，页面中的 js 代码通过 ipcRenderer 向主进程通信。

## 主进程向渲染进程发送消息
### 创建 BrowserWindow
```ts
const win = new BrowserWindow({
  width: 1200,
  height: 800,
});
win.webContents.send('main-to-render','hello render') // BrowserWindow 从主进程发送消息到渲染进程
```
### 渲染进程监听消息通道
```ts
ipcRenderer.on('main-to-render',(event,arg) => {
  console.log(arg) // hello render
})
```

## 渲染进程向主进程发送消息
### 主进程创建通道监听
```ts
ipcMain.on('set-title', (event, title) {
  const webContents = event.sender //当前的 BrowserWindow 对象
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
})
```
### 使用 `contextBridge` 暴露API到渲染进程
```ts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})
```
### *.vue *.js *.ts 执行方法
```ts
window.electronAPI.setTitle('page title')
```
## 渲染进程向主进程发送消息等待主进程回应（双向）
### 主进程定义通道监听，并返回结果
```ts
async function handleTwoSend(renderData: any) {
  // 处理渲染进程的数据
  return 'main process finish'
}
```
### 主进程监听通道，执行监听方法
```ts
ipcMain.handle('twoSend', handleTwoSend)
```
### 渲染进程向主进程发送消息
> 渲染进程通过 `ipcRenderer.invoke` 将消息发送给主进程
> 使用 `contextBridge` 暴露API到渲染进程以供使用
```ts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  twoSend: () => ipcRenderer.invoke('twoSend')
})
```
### 文件中调用
```ts
window.electronAPI.twoSend().then(res => {
  console.log(res)
})
```

