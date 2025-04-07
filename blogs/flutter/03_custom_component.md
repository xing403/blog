---
title: 自定义组件
layout: doc
tags: [flutter, component, android]
---

## 前言
项目依赖使用 腾讯 `tdesign-flutter` 组件库

```dart
import 'package:flutter/material.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';
```
## 创建一个列表 和列表项 组件

::: code-group
```dart [card_list.dart]
class CardList extends StatefulWidget {
  // 标题
  final String title;
  // 列表项
  final List<Widget> children;
  // 定义当点击列表项时触发的回调
  final void Function(int index)? onTap;

  const CardList({
    this.title = '',
    required this.children,
    super.key,
    this.onTap,
  });

  @override
  State<CardList> createState() => _CardListState();
}

class _CardListState extends State<CardList> {
  final List<Widget> children = [];
  // 初始化标题 如果没有就是一个空的容器
  Widget _initTitle() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        children: [
          widget.title == "" ? Container() : TDText(widget.title),
        ],
      ),
    );
  }

  void _initChildren() {
    for (var i = 0; i < widget.children.length; i++) {
      children.add(
        InkWell(
          onTap: () => widget.onTap!(i),
          hoverColor: Colors.grey[200],
          splashColor: Colors.red[400], // 点击飞溅的颜色
          child: widget.children[i],
        ),
      );

      if (i != widget.children.length - 1) {
        children.add(const TDDivider());
      }
    }
  }

  @override
  void initState() {
    super.initState();
    _initTitle();
    _initChildren();
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      _initTitle(),
      Container(
        color: Colors.white,
        child: Column(
          children: children,
        ),
      )
    ]);
  }
}
```

```dart [card_list_item.dart]
class CardListItem extends StatefulWidget {
  /// 标题
  final String title;

  /// 右侧扩展 文本
  final String extra;

  /// 标题左侧图标
  final Widget? leading;

  /// 是否显示箭头
  final bool? isArrow;

  const CardListItem({
    super.key,
    required this.title,
    this.isArrow = true,
    this.extra = '',
    this.leading,
  });

  @override
  State<CardListItem> createState() => _CardListItemState();
}

class _CardListItemState extends State<CardListItem> {
  Widget _initTitle() {
    return Row(
      children: [
        if (widget.leading != null) widget.leading!,
        if (widget.leading != null) const SizedBox(width: 8.0),
        TDText(widget.title),
      ],
    );
  }

  Widget _initChildren() {
    return Row(children: [
      if (widget.extra != '')
        TDTag(
          widget.extra,
          isOutline: true,
        ),
      if (widget.isArrow == true) const Icon(TDIcons.chevron_right),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      // 增加左右两边空距
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Container(
        // 你可以通过这里设置高度来调整行高
        constraints: const BoxConstraints(minHeight: 56.0), // 假设你希望行高至少为 56
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _initTitle(),
            _initChildren(),
          ],
        ),
      ),
    );
  }
}

```

```dart [page.dart]
class SettingPage extends StatefulWidget {
  const SettingPage({super.key});

  @override
  State<SettingPage> createState() => _SettingPageState();
}

class _SettingPageState extends State<SettingPage> {
  void _onTapItem(int index) {
    TDToast.showText("你点击了第 $index 项", context: context);
  }

  @override
  Widget build(BuildContext context) {
    return CardList(
      title: "这是一个可选标题列表",
      onTap: _onTapItem,
      children: const [
        CardListItem(title: 'title1', extra: 'extra1'),
        CardListItem(
          title: 'title2',
          leading: Icon(TDIcons.link),
        ),
        CardListItem(
          title: 'title3',
          isArrow: false,
        ),
        CardListItem(title: 'title4'),
        CardListItem(title: 'title5'),
      ],
    );
  }
}
```
## 效果
<client-only>
<div style='display: flex;gap: 10px;'>
  <img width="50%" src="/images/screenshot/flutter/flutter_list_component01.png" alt="flutter_list_component01.png" />

  <img width="50%" src="/images/screenshot/flutter/flutter_list_component02.png" alt="flutter_list_component02.png" />

</div>
</client-only>

:::
## 参数列表
### 列表
| 名称     | 描述   | 类型           | 必填 | 默认值 |
| -------- | ------ | -------------- | ---- | ------ |
| title    | 标题   | `String`       | 否   | ''     |
| children | 列表项 | `List<Widget>` | 是   | []     |


### 列表项

| 名称    | 描述         | 类型     | 必填 | 默认值 |
| ------- | ------------ | -------- | ---- | ------ |
| title   | 标题         | `String` | 是   | ''     |
| extra   | 右侧扩展文本 | `String` | 否   | ''     |
| isArrow | 是否显示箭头 | `bool`   | 否   | true   |
| leading | 标题左侧图标 | `Widget` | 否   | null   |


## 列表事件
| 名称  | 描述           | 类型                       | 必填 | 默认值 |
| ----- | -------------- | -------------------------- | ---- | ------ |
| onTap | 点击列表项触发 | `void Function(int index)` | 否   | null   |
