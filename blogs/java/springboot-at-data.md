---
title: \@Data 注解
layout: doc
---
# @Data 注解
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>java</el-tag>
  <el-tag>springboot</el-tag>
</div>

## 使用的依赖
```xml
<!--        lombok-->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```
如果我们有一个 Person 类代码里面一般会写成这样
```java
public class Person {
    private String id;
    private String name;
    private List<String> hobbies;
    private String[] family;

    @Override
    public String toString() {
        return "Person{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", hobbies=" + hobbies +
                ", family=" + Arrays.toString(family) +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getHobbies() {
        return hobbies;
    }

    public void setHobbies(List<String> hobbies) {
        this.hobbies = hobbies;
    }

    public String[] getFamily() {
        return family;
    }

    public void setFamily(String[] family) {
        this.family = family;
    }
}
```
里面有太多的set和get方法，在代码阅读的时候就不太友好，为了方便我们，可以使用 `@Data` 默认就会有get、set、toString方法
```java
@Data
public class Person {
    private String id;
    private String name;
    private List<String> hobbies;
    private String[] family;
}
```
> 虽然在使用个的时候IDEA 依然会报错说使用的类没有set或get方法，但仍然可以运行，不会抛出异常
