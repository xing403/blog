---
title: QT SQLite 实现增删改查
layout: doc
---
# QT SQLite 实现增删改查
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>QT</el-tag>
  <el-tag>SQLite</el-tag>
  <el-tag>嵌入式</el-tag>
</div>


## 在工程文件下使用sqlite

::: tip
找到文件 `*.pro` 加入`QT+=sql`
:::


## 初始化页面设计
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/202203072208291.png)
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/202203072208291.png)
![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220615175358.png)
## 写代码
### 连接数据库的头文件书写
```cpp
#ifndef CONNECTION_H
#define CONNECTION_H

#include <QSqlDatabase>
#include <QMessageBox>
#include <QSqlQuery>

static bool CreateConnectDatabase(){
  QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE");
  db.setDatabaseName("test.db");
  if( !db.open() ) {
    QMessageBox box;
    box.setText("open database fail");
    return false;
  }
  QSqlQuery query;
  query.exec("create table SQLite(id integer primary key, name varchar(20) )");
  return true;
}

#endif
```
### 3.2 主函数调用
```cpp
#include <QtGui/QApplication>
#include "mainwindow.h"
#include "connection.h"

int main(int argc, char *argv[])
{
  QApplication a(argc, argv);
  if(! CreateConnectDatabase() ){
    return false;
  }
  MainWindow w;
  w.show();
  return a.exec();
}
```
### 3.3 窗口头文件定义槽函数
```cpp
private slots:
  void on_lineEdit_1_textChanged(QString value);
  void on_lineEdit_2_textChanged(QString value);
  void on_Button_1_clicked();
  void on_Button_2_clicked();
  void on_Button_3_clicked();
  void on_Button_4_clicked();
  void on_Button_5_clicked();
```
### 3.4 实现槽函数
```cpp
void MainWindow::on_lineEdit_1_textChanged(QString value){
  idValue = value;
}
void MainWindow::on_lineEdit_2_textChanged(QString value){
  nameValue = value;
}
// show
void MainWindow::on_Button_1_clicked(){
  QSqlQuery query;
  query.exec("select id,name from SQLite");
  QStandardItemModel *model = new QStandardItemModel;
  this->ui->tableView->setModel(model);
  model->setHorizontalHeaderItem(0, new QStandardItem("id"));
  model->setHorizontalHeaderItem(1, new QStandardItem("name"));
  int i = 0;
  while( query.next() ){

    ui->label->setText("select ok");
    model->setItem(i, 0, new QStandardItem( query.value(0).toString() ) );
    model->setItem(i, 1, new QStandardItem( query.value(1).toString() ) );
    i += 1;
  }
}


void MainWindow::on_Button_2_clicked(){
  if(idValue == "" || nameValue == ""){
    ui->label->setText("id or name is none");
  }else{
    QSqlQuery query;
    query.exec("select id from SQLite where id='" + idValue + "'");
    if(! query.next()){
      query.exec("insert into SQLite(id, name) values( " + idValue + ",'" + nameValue + "')");
      ui->label->setText("insert id=" + QString(idValue) +" success");
      ui->lineEdit_1->setText("");
      ui->lineEdit_2->setText("");
    }else{
      ui->label->setText("insert existed");
    }
  }
}
void MainWindow::on_Button_3_clicked(){
  if(idValue == "" || nameValue == ""){
    ui->label->setText("id or name is none");
  }else{
    QSqlQuery query;
    query.exec("select id from SQLite where id='" + idValue + "'");
    if( query.next()){
      query.exec("update SQLite set name = '" + nameValue + "' where id=" + idValue );
      ui->label->setText("update id=" + QString(idValue) +" success");
      ui->lineEdit_1->setText("");
      ui->lineEdit_2->setText("");
    }else{
      ui->label->setText("update not existed");
    }
  }
}
void MainWindow::on_Button_4_clicked(){
  QSqlQuery query;
  query.exec("delete from SQLite");
  ui->label->setText("delete ok");

}

void MainWindow::on_Button_5_clicked(){
   qApp->quit();
}
```
## 4 运行
> 此时没有任何数据

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220615180319.png)

> 插入数据 1 123

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220615180442.png)

> 查询数据

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220615180535.png)

> 更新数据 1 456

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220615181024.png)

> 删除数据(删除所有数据)

![](https://raw.githubusercontent.com/xing403/images-repo/main/assets/website/20220615180721.png)
