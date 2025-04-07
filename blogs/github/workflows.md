---
title: GitHub Actions
layout: doc
tags: [github, tools, automation]
---

## 概述
GitHub Actions 是一种持续集成和持续交付 (CI/CD) 平台，可用于自动执行生成、测试和部署管道。 您可以创建工作流程来构建和测试存储库的每个拉取请求，或将合并的拉取请求部署到生产环境。

## GitHub Actions 的组件
配置 GitHub Actions 工作流，使其在存储库中发生事件（例如打开拉取请求或创建问题）时触发 。 工作流包含一个或多个可按顺序或并行运行的作业。 每个作业都将在其自己的虚拟机运行器中或在容器中运行，并具有一个或多个步骤，用于运行定义的脚本或运行动作。动作是一个可重用的扩展，可简化工作流 。
![](https://docs.github.com/assets/cb-25535/mw-1440/images/help/actions/overview-actions-simple.webp)

## 工作流
工作流程是一个可配置的自动化过程，它将运行一个或多个作业。 工作流程由签入到存储库的 YAML 文件定义，并在存储库中的事件触发时运行，也可以手动触发，或按定义的时间表触发。

## 使用工作流
```yaml
# 定义工作流名称(自定义，非必须)
name: test-github-action
# 工作流触发事件(https://docs.github.com/zh/actions/using-workflows/events-that-trigger-workflows)
on: [push]
# 定义所有的作业项
jobs:
  # 定义作业项的 id(自定义)
  test-github-action:
    # 定义作业项的 名称(自定义)
    name: test-github-action
    # 指定运行所需要的虚拟机环境(必填)
    runs-on: ubuntu-latest
    # 指定每个 Job 的运行步骤，可以包含一个或多个步骤。每个步骤都可以指定以下三个字段。
      # name：步骤名称。
      # run：该步骤运行的命令或者 action。
      # env：该步骤所需的环境变量。
    steps:
    - name: Print `hello world`
      env:
        HELLO: hello
        WORLD: world
      run: echo $HELLO $WORLD
```
## 使用github-workflows
1. 将编辑完成的 `.github/workflows/*.yaml` 提交到 github
2. 提交后，github 会自动触发 workflow 运行
3. 运行完成后，可以在 Actions 页面查看运行结果
![result](/images/screenshot/workflows-test.png)
