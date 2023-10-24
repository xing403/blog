---
title: SpringBoot 上传与下载
layout: doc
---
# SpringBoot 上传与下载
<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>java</el-tag>
  <el-tag>springboot</el-tag>
</div>

## 使用上传和下载依赖
~~~xml
<!--    文件下载依赖-->
<dependency>
  <groupId>commons-io</groupId>
  <artifactId>commons-io</artifactId>
  <version>2.6</version>
</dependency>
~~~

## 创建 FileController 类
在controller文件夹下创建 FileController 类
> 上传

~~~java
// 进入上传文件页面
@GetMapping("/upload")
public String UpLoad(){
  return "upload";
}
// 上传文件页面
/**
 * @RequestParam 注解 : 获取请求时的参数，files是上传的参数名，即form表单 name属性
 * @Model : 页面信息
 * MultipartFile : 上传的文件 带上 [] 表示上传多个文件，若没有只能上传一个文件
 * */
@PostMapping("/uploadfile")
public String upload(@RequestParam("files") MultipartFile[] files, Model model){
  model.addAttribute("uploadStatus","上传成功");
  for (MultipartFile file : files) {
    String fileName = file.getOriginalFilename();
    // 上传 位置
    String dirPath = "F:/upload/";
    // 根据文件地址：创建一个文件对象
    File filePath = new File(dirPath);
    // 判断路径是否存在
    if(!filePath.exists()){
      filePath.mkdirs();
    }

    try {
      // 缓存的文件保存指定位置，并不是文件上传之后就直接到指定位置
      // 用户上传文件 --> 文件到服务器缓存位置 --> 缓存位置到指定保存位置
      file.transferTo(new File(dirPath + fileName));
    }catch (Exception e){
      e.printStackTrace();
      model.addAttribute("uploadStatus","上传失败");
    }
  }
  return "upload";
}
~~~
> 下载

```java
@GetMapping("/download")
public String download(){
  return "download";
}
// 下载文件 根据文件名
@GetMapping("/fileDownload")
public ResponseEntity<byte[]> fileDownload(String filename){
  System.out.println("fileDownload");
  // 文件保存路径
  String dirPath = "F:/upload/";
  File file = new File(dirPath + filename);
//    设置请求头
  HttpHeaders httpHeaders = new HttpHeaders();
  httpHeaders.setContentDispositionFormData("attachment",filename);
  httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);

  try {
//      FileUtils.readFileToByteArray：来自包org.apache.commons.io.FileUtils
    return new ResponseEntity<>(FileUtils.readFileToByteArray(file), httpHeaders, HttpStatus.OK);
  }catch (Exception e){
    e.printStackTrace();
    return new ResponseEntity<>(e.getMessage().getBytes(),HttpStatus.EXPECTATION_FAILED);
  }
}
```

> 上传页面
```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
  <meta charset="UTF-8">
  <title>上传文件</title>
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <script src="https://fastly.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
  <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  <script src="/js/jquery.min.js"></script>
</head>
<body>
<div th:if="${uploadStatus}" th:text="${uploadStatus}">上传成功</div>

<form th:action="@{/uploadfile}" method="post" enctype="multipart/form-data">
  <input type="button" value="上传文件" onclick="add()">
  <div id="file" th:value="上传文件区域"></div>
  <input type="submit" id="submit" value="上传">
</form>
<script>
  function add(){
    var innerdiv = "<div>";
    innerdiv += "<input type='file' name='files' required='required'>" +
          "<input type='button' value='删除' onclick='remove(this)'>"
    innerdiv += "</div>";
    $("#file").append(innerdiv);
    $("#submit").css("display", "block");
  }
  function remove(obj){
    $(obj).parent().remove();
    if($("#file div").length == 0){
      $("#submit").css("display","none");
    }
  }
</script>
</body>
</html>
```
## 页面布局
页面文件路径 `resources/templates`
> 下载页面
```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
  <meta charset="UTF-8">
  <title>springboot download file</title>
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <script src="https://fastly.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
  <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  <script src="/js/jquery.min.js"></script>
</head>
<body>
<div>文件下载列表：</div>
<table>
  <tr>
    <td>11.png</td>
    <td><a th:href="@{/fileDownload(filename='11.png')}">下载</a></td>
  </tr>
</table>
</body>
</html>
```


