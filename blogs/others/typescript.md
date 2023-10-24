---
title: TypeScript
layout: doc
---
# TypeScript
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>ts</el-tag>
  <el-tag>TypeScript</el-tag>
</div>

## TypeScript 与JavaScript的区别

TypeScript （TS）是JavaScript（JS） 的一个超集（即：JavaScript所拥有的TypeScript同样拥有），TypeScript 在 JavaScript基础上进行了类型的支持，使开发更高效

TypeScript是静态类型的编程语言，JavaScript是动态类型编程语言

* 静态类型：在编译期进行类型检查
* 动态类型：在执行期进行类型检查
* 编译和执行的顺序：先编译再运行

因此typeScript相对于JavaScript更早发现代码的问题

## 安装TypeScript

由于node.js/浏览器仅认识js，需要将TS转译成JS代码，使代码能执行

~~~shell
npm install -g typescript

# 检查是否安装成功 由于typescript提供tsc命令
tsc -v
~~~

> *问题*: 由于控制台认为tsc命令不是个安全的命令，需要执行一管理员身份运行

![987153907.png](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/ts/987153907.png)



修改：

* 以管理员身份运行 PowerShell
* 输入 ` set-ExecutionPolicy RemoteSigned`
* 输入是或者Y 即可

### 创建目录（自己命名）

*尽量用英文命名*

在目录下面创建`hello.ts`并写入

~~~typescript
console.log("hello TypeScript")
~~~

> 编译 tsc hello.ts

在同级目录下会自动生成一个hello.js 的文件
![1997145011.png](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/ts/1997145011.png)

> 运行 node hello.js

将会运行 hello.js 的代码
![3346233448.png](https://raw.githubusercontent.com/xing403/images-repo/main/assets/images/ts/3346233448.png)


## 简化运行ts 命令

由于执行 ts代码需要先执行 tsc 再执行node 分为两步，为了方便将这两步合并

> 安装 ts-node 包

~~~shell
npm install -g ts-node
~~~

> 运行时

~~~shell
ts-node hello.ts
~~~

*注意*：在内部将ts转化为js代码， 但没有生成js文件，直接运行了这个转化的js代码，并不是单纯的将两步合并起来

## TypeScript常用类型

### TS类型提示

JS中有类型number/string 但在并不会检查是否发生变化，因此会导致问题的出现，而且编译器不会进行提示

TS会进行代码错误提示

### TS类型注解

~~~typescript
// let 变量名:变量类型 = 变量值
let age: number = 20
~~~

### TS基础类型

| 原始类型 | 对象类型 |
| -- | ------------------------------------------- |
| `number`,`string`,`boolean`,`null`,`undefined`,`symbol` | `Object(数组，对象，函数)` |

| TS中增加 | 
| --- |
| 联合类型，`自定义类型（类型别名）`，`接口`，`元组`，`字面量类型`，`枚举`，`void`，`any`等 |


~~~typescript
// 简单类型
let age: number = 20;
let name: string = "张三";
let sex: boolean = true;
//...
// 复杂
let family: string[] = ["爸爸", "妈妈"] // 定义一个字符串类型的数组
let family: Array(string) = ["爸爸", "妈妈"] // 定义一个字符串类型的数组
// 联合类型
let data: (number | string)[] = [12, "李四", "王五"]//定义一个字符串或者是数值类型的数组
// 注意：| 的优先级没有[] 高，因此(number | string)[] 和 number | string[]是两种结果
// 类型别名 ~type 名称 = 类型~
type NumberOrString = number | string
let data: NumberOrString = 12
let data2: NumberOrString = "12"
// 函数类型
function add(num1: number, num2: number): number{
    return num1 + num2;
}
// 表达式类型
const add = (num1: number, num2: number): number => {
    return num1 + num2;
}
// void 类型表示该函数没有返回值
// 可选参数，注意：可选参数只能出现在必选参数的后面
function slice(str: string, start:number, end?:number): string {}
// 接口：interface 接口名{}
interface Person {
    name :string
    age: number
}
let P:Person = {name:"张三", age:18}
~~~

### type 和 interface 的区别

* type是个类型赋值，因此在定义时需要用 = 进行赋值，可以对任意类型进行别名
* interface 是个类 不需要用=，只能对对象使用，其他类型不能使用，接口中可以使用继承

#### 接口继承

~~~tsx
interface Point2D {x: number,y: number};
interface Point3D extends Point2D {z: number}
~~~

### 元组

由于数组的不定长的原因，在某些场景下虽然数组能满足要求，但不适用，例如定位经纬度等，因此需要有定长的数组来实现。元组：一种特殊的数组，知道数组中的元素个数，以及特定索引对应的类型

~~~tsx
let Position: [number, number] = [39, 144]
// 元组中只能出现两元素，并且两个都是number类型
~~~

### TS中类型推论

能推导出当前变量或对象的类型或者拥有的属性，即可省略类型注解

* 在变量值初始化时
* 在函数返回值时
* 类型检查机制依旧存在

## TS类型断言

在操作DOM时获取标签，但默认是获取的对象所有用的类型均为HTMLElement 所包含的属性为所有标签的公共属性，某些特殊的属性针对特殊标签并没有，因此使用断言获取指定类型的标签，例如：

~~~html
<a href="http://ilstudy.vip" id=“BlogUrl”>星如雨博客</a>
~~~

~~~tsx
let BlogUrl = document.getElementById("BlogUrl");// 获取的类型是HTMLElement
// 使用 BlogUrl.href 的时候会报错
// 使用断言
let BlogUrl = document.getElementById("BlogUrl") as HTMLAnchorElement;
// 再次使用 BlogUrl.href正常
//另一种写法， 不建议这种写法 会和 react 语法冲突
let BlogUrl = <HTMLAnchorElement>document.getElementById("BlogUrl");
~~~

> 控制台查看指定元素的类型\$0, 使用 console.dir(\$0) 手动查看当前元素具体类型，在列表的最后

### 字面量类型变量

使用const关键字

~~~tsx
let str1 = "123"		// 类型为string
const str2 = "123"		// 类型为"123"
// const 是将值直接作为了类型，const声明的为常量，值不能发生改变
// 使用场景，一般与联合类型使用，确定某些值，中进行选择
~~~

### 枚举类型

是字面量类型和联合类型共同的结果，枚举类型=字面量类型+联合累心

~~~tsx
enum Direction{Up,Down,Left,Right};
let dir: "Up" | "Down" | "Left" | "Right";
// 访问枚举成员
Direction.Up;
//...
//枚举成员的值
默认是从0开始1，2，3，....自增的关系
enum Direction{Up = 10,Down,Left,Right};//从10开始11，12，13，....自增的关系
//字符串类型的枚举
enum Direction{Up= "Up",Down = "Down",Left = "Left",Right = "Right"};//字符串类型没有默认自增长
~~~

### any类型

any类型取消所有的变量类型判断，变成为任意类型，代码也不会给予相应的提示，失去TS的代码类型检查功能，容易出现错误。

对于刚命名的 变量没有给类型，并且没有初始值时，此时的类型为any类型

### typeof 

1. 获取变量的类型
2. 代码上下文使用，类似于别名变量类型：利用类型推论，自动识别变量类型

## TS中Class关键字

~~~tsx
class Person{
    // 属性或方法
}
let p = new Person()
~~~

### class 构造函数

~~~tsx
class Person{
    // 构造函数没有返回值
    constructor(/*变量*/){
        // this.变量名 ；访问该类中的属性和方法
    }
}
~~~

### class 继承

> extends js中代码继承父类，公共属性使用继承，父级是 class类型

属性与方法的继承，重写

> implements 实现接口 TS中特有，父级是interface类型

属性与方法的继承、实现

### class 修饰符

| 修饰符    | 等级                                               |
| --------- | -------------------------------------------------- |
| public    | 公共的（所有位置均可访问），默认修饰符             |
| protected | 受保护的（类内和子类中可用，实例对象无法使用）     |
| private   | 私有的（当前类中可见，实例化对象和子类中不能使用） |

### readonly 关键字

只能在构造函数中修改被readonly修饰的属性，其他地方无法修改被readonly修饰的属性的属性值，被readonly修饰的属性可以有默认属性值

readonly只能修饰属性，不能修饰方法

## TS类型兼容性

> 两种类型系统

* 结构化类型系统（Structural Type System）
* 标明类型系统（Nominal Type System）

TS中采用的是结构化类型系统：类型检查关注的是值所具有的属性，即是两个对象所具有的相同的属性以及属性类型，则认为他们是相同类型的，对于对象来讲y对象所具有的属性，包含x所具有的属性，在x中都有，则说明x兼容y（属性多的可以赋值给属性少的）

~~~tsx
class point{x:nuumber,y:number}
class point2D{x:nuumber,y:number}
class point3D{x:nuumber,y:number，z:number}
// pint类与point2D类只有类名不同，但具有相同的属性，则认为point和point2D是相同的属性以及属性类型是否相同
let p1:point = new point2D();
let p2:point = new point3D();
//向上兼容
~~~

### 接口兼容性

interface和class 相似，并且可以相互兼容

### 函数兼容性

函数：参数个数，参数类型，函数返回值

* 参数个数兼容：参数少的可以赋值给参数多的
* 参数类型兼容：相同位置的参数进行兼容，原始类型或对象类型（对象为参数兼容）
* 返回值兼容：返回值类型相同的相互兼容，返回值为对象的参照对象属性个数兼容
