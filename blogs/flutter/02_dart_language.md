---
title: dart 语法
layout: doc
---
# dart 语法
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>dart</el-tag>
  <el-tag>flutter</el-tag>
</div>

`dart` 是开发 `fulter` 的基础语言, 语法和 `java` 类似，但是更加简洁。
## 创建类
::: code-group
```java [java]
public class Preson {
  private String name;
  private int age;
  
  public Preson(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String getName() { return name; }

  public int getAge() { return age; }

  public int addAge(int age) {
    return this.age + age;
  }
}
```
```dart [dart]
class Preson {
  String _name;
  int _age;

  public Preson(this._name, this._age);

  String get name => _name;
  int get age {
    return _age;
  };
  int addAge(int age) {
    return _age + age;
  }
}
:::

* `dart` 中没有 `public` 和 `private` 关键字，所以需要使用 `_` 来表示私有变量。

