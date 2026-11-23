---
title: "04. 目录结构与路由取舍"
description: "实测 Rspress v2 的 root: 'docs' 单层隔离与各层级 _meta.json 就近编排机制。"
---

# 04. 目录结构与路由取舍（Rspress `_meta.json` 模式）

本章节基于母版 `docs/04-directory/` 多级嵌套子目录 `nested/`，实测 **Rspress v2** 最具代表性的 **`_meta.json` 就近目录声明流派**：

1. **`root: 'docs'` 单层内容隔离**：工程根目录 `README.md`、`rspress.config.ts` 与 `docs/` 正文完全隔离，静态资源统一放置在 `docs/public/` 下。
2. **分层级 `_meta.json` 就近编排**：无需在中央配置文件里维护冗长的全站嵌套侧边栏，只需在 `docs/_meta.json`、`docs/04-directory/_meta.json` 与 `docs/04-directory/nested/_meta.json` 中就近声明当前目录的文件顺序与中文折叠分组标题（如 `"label": "嵌套子目录实测 (_meta.json)"`）。
3. **相对路径互链完好**：Rspress 原生解析相对路径 Markdown 链接（如 `./nested/01-order-and-url.md`），兼顾本地编辑器点击跳转与线上路由自动转换。

## 嵌套子文档实测入口

- [进入子文档 A：排序前缀与 URL 纯净度权衡](./nested/01-order-and-url.md)
- [进入子文档 B：多级子目录与侧边栏同步机制](./nested/02-sidebar-sync.md)
