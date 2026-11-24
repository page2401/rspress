> For AI agents: the complete documentation index is available at /rspress/llms.txt, the full documentation bundle is available at /rspress/llms-full.txt.

# Rspress v2 静态网站生成基准实测

本站点由独立仓库 [`page2401/rspress`](https://github.com/page2401/rspress) 构建，基于主仓库 `page2401.github.io/docs/` 的标准 GFM 原始母版派生适配而来，用于量化字节跳动开源的 **Rspress v2 (`2.1.4`)** 在双轨提示容器、Mermaid 12 图表、KaTeX 公式与多级 `_meta.json` 目录编排上的真实工程表现。

## 五大基准测试章节导航

| 章节路径                                              | 测试维度                  | Rspress v2 (`2.1.4`) 核心实测特征                                                                                           |
| :------------------------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| [`01. 专属标注与元数据`](/rspress/01-annotations.md)      | 专属标注与双轨语法             | 原生同时支持 `:::note` / `:::tip` / `:::warning` / `:::danger` 容器、`<details>` 以及 GitHub `> [!NOTE]` 警报语法；MDX 3 同样约束裸 `<id>` |
| [`02. 流程图与时序图`](/rspress/02-diagrams.md)          | 流程图与时序图               | 接入 `rspress-plugin-mermaid@2.0.0` + `mermaid@12.3.0`，零正文改动渲染复杂流程图与时序图                                                 |
| [`03. 数学公式排版`](/rspress/03-math.md)               | 数学公式排版                | 接入 `rspress-plugin-katex@1.0.1` + 本地打包 `katex@0.19.1` 样式与字体，构建期编译 HTML 公式结构                                           |
| [`04. 目录结构与路由取舍`](/rspress/04-directory/index.md) | 目录结构与 `_meta.json`    | `root: 'docs'` 隔离 + 各层级 `_meta.json` 就近声明章节顺序与中文分组标题                                                                  |
| [`05. 高阶代码块与语法高亮`](/rspress/05-code-blocks.md)    | Shiki 4 代码块与 `<Tabs>` | 开箱集成 `title="..."`、`{3,7-9}` 与保留词法着色的 `// [!code ++]` Diff；`.mdx` 下调用 `@rspress/core/theme` `<Tabs>`                  |

## 子模块精确锁定版本档案

| 依赖模块                     | 精确锁定版本   | 在本子站中的职责                                                 |
| :----------------------- | :------- | :------------------------------------------------------- |
| `@rspress/core`          | `2.1.4`  | 基于 Rspack / Rsbuild + React 19 + Shiki 4 的高速文档框架         |
| `rspress-plugin-katex`   | `1.0.1`  | Rspress v2 数学公式编译插件（底层基于 `remark-math` + `rehype-katex`） |
| `rspress-plugin-mermaid` | `2.0.0`  | Rspress v2 Mermaid 代码块编译与客户端渲染插件                         |
| `katex`                  | `0.19.1` | 数学排版样式表与本地打包 Webfont 字体资源                                |
| `mermaid`                | `12.3.0` | 第 12 代流程图、时序图与状态机渲染引擎                                    |
| `react` / `react-dom`    | `19.3.1` | 底层 UI 渲染运行时                                              |
