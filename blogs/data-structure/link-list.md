---
title: 单链表
layout: doc
---
# 单链表
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>data structure</el-tag>
</div>

## 定义
线性表的链式存储又称单链表，它是只通过一组任意的存储单元来存储线性表的数据元素。为建立数据元素之间的线性关系，每个链表节点除了存放元素自身的信息外，还需要存放指向其后继的指针。
```cpp
typedef struct Node{
  ElementType data;    // 数据域，存放数据
  struct Node *next;   // 指针域，存放其后继节点的地址
}LNode;
```
## 头指针和头结点的区别
不管带不带头节点，头指针始终指向链表的第一个节点，而头结点是带头结点的链表中的第一个节点，节点数据域通常不存储信息。
头结点的有点：
* 由于第一个数据节点的位置被存放在头结点的指针域中，云次在链表的第一个位置上的操作和在表的其他位置操作一致，无需进行特殊处理。
* 无论链表是否为空，其头指针都指向头结点的非空指针(空表中头结点的指针域为空)，因此空表和非空表的处理也得到了统一。

## 链表基本操作
```cpp
InitLinkList(&L);                // 初始化链表
BeforeHeader(&L, data);          // 头插法
AfterHeader(&L, data);           // 尾插法
BeforeInsert(p, data);           // p 节点之前插入
AfterInsert(p, data);            // p 节点之后插入
BeforeDelete(p, &data);          // 删除 p 节点之前节点
AfterDelete(p, &data);           // 删除 p 节点之后节点
...
```
## 特殊链表
### 双链表
### 循环链表
### 循环双链表
### 静态链表
