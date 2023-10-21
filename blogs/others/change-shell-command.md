---
title: powershell命令简写
layout: doc
---
# powershell命令简写
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>powershell</el-tag>
  <el-tag>tools</el-tag>
</div>

## Windows安装powershell
[中文官网地址下载](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.3)
## 配置文件
获取powershell 的配置文件路径 ` echo $profile`
+ PowerShell 5 (Windows PowerShell): `C:\Users\USERNAME\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`
+ PowerShell 7: `C:\Users\USERNAME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`
+ VSCode:  `C:\Users\USERNAME\Documents\PowerShell\Microsoft.VSCode_profile.ps1`

## 设置别名(无参数)
在配置文件中加入格式:
```shell
function Alias {
	# shell 命令
}
```
==可以是多条命令，一条命令一行==
> 例如:chestnut:
 
开发vue 中使用命令 `pnpm run dev`  每次都要打这么长很麻烦 使用 `d` 代替 `pnpm run dev` 
> 如下写法

```shell
function d {
	pnpm run dev
}
function s {
	pnpm run serve
}
```
## 设置别名(有参数)
```shell
function Alias($param) {
	# shell 命令
}
```
> 例如git 提交仓库 拉取仓库

```shell
function gp($commit_content) {
	git add .
	git commit -m $commit_content
	git push origin dev
}
function gc($pr) {
	git clone $pr
}
```


