---
title: 浏览器 IndexDB 的使用
layout: doc
tags: [browser, indexDB]
---

```ts
const { log } = console

class IndexedDB {
  db?: IDBDatabase
  tableName?: string

  init() {
    // 根据数据库名和版本连接数据库
    const request = indexedDB.open(dbConfig.database, dbConfig.databaseVersion)
    return new Promise((resolve, reject) => {
      // 数据库连接成功回调
      request.onsuccess = (event: any) => {
        this.db = event.target.result
        resolve(true)
        log('db is ready')
      }
      // 数据库版本升级回调
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result
        // 更新表明
        for (const tableName in dbConfig.tableNames) {
          const table = dbConfig.tableNames[tableName]
          // 如果表不存在
          if (!db.objectStoreNames.contains(tableName)) {
            const store = db.createObjectStore(tableName, table)
            log(`[${tableName}] table is created`)
            // 创建索引
            if (table.index) {
              for (const index of table.index) {
                store.createIndex(index.key, index.field, { unique: index.unique ?? false })
                log(`[${tableName}] [create index] ${index.key}`)
              }
            }
          }
        }
        log('db is upgraded')
      }
      // 数据库连接错误
      request.onerror = (event: any) => {
        reject(event.target.error)
      }
    })
  }
  // 链式查询设置查询表名
  table(name: string) {
    this.tableName = name
    return this
  }

  transaction(name: string, mode: IDBTransactionMode = 'readonly') {
    return this.db!.transaction(name, mode)
  }
  // 插入数据
  insert(entity: any) {
    return new Promise((resolve, reject) => {
      const transaction = this.transaction(this.tableName!, 'readwrite')
      const store = transaction.objectStore(this.tableName!)

      const logicDelete = this.getLogicDelete()
      if (logicDelete)
        entity[logicDelete.field] = logicDelete.undeleted

      const request = store.add(entity)
      request.onsuccess = (res) => {
        log(`[${this.tableName}] [insert] success`, res, request)
        resolve(request)
      }
      request.onerror = (err) => {
        log(`[${this.tableName}] [insert] error`, err)
        reject(request)
      }
    })
  }
  // 根据Id 查询数据
  selectById(key: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.transaction(this.tableName!, 'readonly')
      const objectStore = transaction.objectStore(this.tableName!)
      const request = objectStore.get(key)
      request.onsuccess = () => {
        const logicDelete = this.getLogicDelete()
        if (logicDelete && request.result[logicDelete.field] === logicDelete.undeleted)
          resolve(request.result)
        else
          resolve(null)
      }
      request.onerror = () => reject(request.error)
    })
  }
  // 自定义查询内容查询数据
  select(wrapper?: Record<string, any>): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.transaction(this.tableName!, 'readonly')
      const store = transaction.objectStore(this.tableName!)
      const request = store.openCursor()
      request.onerror = () => reject(request.error)
      const data: any = []
      request.onsuccess = (event: any) => {
        let cursor = event.target.result
        if (cursor) {
          const logicDelete = this.getLogicDelete()
          if (logicDelete && cursor.value[logicDelete.field] === logicDelete.deleted)
            return cursor.continue()
          if (wrapper) {
            const keys = Object.keys(wrapper)
            const values = Object.values(wrapper)
            const isMatch = keys.every((key, index) => cursor.value[key] === values[index])
            if (!isMatch)
              return cursor.continue()
          }
          data.push(cursor.value)
          cursor = cursor.continue()
        }
        else {
          resolve(data)
        }
      }
    })
  }
  // 查询全部数据
  selectAll() {
    return new Promise((resolve, reject) => {
      const transaction = this.transaction(this.tableName!, 'readonly')
      const objectStore = transaction.objectStore(this.tableName!)
      const request = objectStore.getAll()
      request.onsuccess = () => {
        const data: any = []
        log(`[select all] [${this.tableName}]`, request.result)
        request.result.forEach((item: any) => {
          const logicDelete = this.getLogicDelete()
          if (logicDelete && item[logicDelete.field] === logicDelete.undeleted)
            data.push(item)
        })
        resolve(data)
      }
      request.onerror = () => reject(request.error)
    })
  }
  // 更新数据
  update(entity: any) {
    return new Promise((resolve, reject) => {
      const transaction = this.transaction(this.tableName!, 'readwrite')
      const objectStore = transaction.objectStore(this.tableName!)

      const logicDelete = this.getLogicDelete()
      if (logicDelete)
        entity[logicDelete.field] = logicDelete.undeleted

      const request = objectStore.put(entity)
      request.onsuccess = () => {
        log(`[${this.tableName}] [update] success`, request)
        resolve(request.result)
      }
      request.onerror = () => {
        log(`[${this.tableName}] [update] error`, request)
        reject(request.error)
      }
    })
  }
  // 删除数据
  deleteById(key: number) {
    return new Promise((resolve, reject) => {
      const transaction = this.transaction(this.tableName!, 'readwrite')
      const objectStore = transaction.objectStore(this.tableName!)
      log(`[${this.tableName}] [delete] ${key}`)
      this.selectById(key).then((data) => {
        const logicDelete = this.getLogicDelete()
        if (!data)
          return reject(new Error(`[${this.tableName}] [delete] ${key} not found`))

        if (logicDelete && data[logicDelete.field] === logicDelete.undeleted) {
          this.update(data).then(() => {
            resolve(data)
          })
        }
        else {
          const request = objectStore.delete(key)
          request.onsuccess = () => {
            log(`[${this.tableName}] [delete] success`, request)
            resolve(request.result)
          }
          request.onerror = () => {
            log(`[${this.tableName}] [delete] error`, request)
            reject(request.error)
          }
        }
      })
    })
  }

  getLogicDelete() {
    const logicDelete = {
      field: 'delFlag',
      deleted: 1,
      undeleted: 0,
    }
    if (!dbConfig.logicDelete)
      return null

    if (typeof dbConfig.logicDelete === 'boolean')
      return logicDelete

    if (dbConfig.logicDelete.enable)
      return dbConfig.logicDelete

    return null
  }

  insertOrUpdateById(entity: any) {
    return new Promise((resolve, reject) => {
      const id = entity[this.getTableId()]
      const req = id ? this.update(entity) : this.insert(entity)
      req.then(res => resolve(res)).catch(err => reject(err))
    })
  }

  insertOrUpdate(entity: any, wrapper?: Record<string, any>) {
    return new Promise((resolve, reject) => {
      const tableId = this.getTableId()
      this.select(wrapper).then((data) => {
        let req = null
        if (data.length > 0) {
          req = Promise.all(data.map((item) => {
            entity[tableId] = item[tableId]
            return this.update(entity)
          }))
        }
        else { req = this.insert(entity) }

        req.then(res => resolve(res)).catch(err => reject(err))
      })
    })
  }

  getTableId() {
    return dbConfig.tableNames[this.tableName!].keyPath
  }
}

export default IndexedDB
```
## 这里是配置
```ts
const config: DBConfig = {
  database: 'database_name',
  databaseVersion: 1, // 数据库版本：每次更新内容后都需要更改版本号必须比之前大
  logicDelete: {
    enable: true, // 是否启用逻辑删除
    field: 'delFlag', // 删除标志
    deleted: 1, // 已删除
    undeleted: 0, // 未删除
  },
  tableNames: { // 一些数据表，用表明作为key
    table_name: { 
      keyPath: 'id', // 主键
      autoIncrement: true, // 自增
      index: [{ //其他索引
        key: 'delFlagIndex',
        field: 'delFlag',
        unique: false,
      }],
    },
  },
}

export default config
```
