> For AI agents: the complete documentation index is available at /rspress/llms.txt, the full documentation bundle is available at /rspress/llms-full.txt.

# 01. 专属标注与元数据（Rspress v2 派生版）

不同静态网站生成器对“提示框 / 标注（Callouts / Admonitions）”和页面元数据的语法约定存在显著分歧。本文件由原始 GFM 母版派生适配至 **Rspress v2 (`2.1.4`)**。

## 1. Frontmatter 元数据与 MDX 3 编译机制

Rspress v2 底层采用标准 Unified + MDX 3 编译管线（配合 Rust Rspack 极速打包），在保持宽松 YAML Frontmatter 的同时遵循 MDX 3 JSX 语法边界：

- **当前页标题字段**：`title: "01. 专属标注与元数据"`
- **页面摘要字段**：`description: "..."`（同时支持 `overview`、`pageType`、`outline` 等页面级控制项）
- **派生观察点**：与 Docusaurus v3 类似，MDX 3 会将正文中未包裹反引号的裸 `<id>` 或 `{expr}` 视作 JSX 语法；但在提示框方面，Rspress 内核同时兼容三冒号容器与 GitHub 原生警报。

## 2. 标准提示语义块（Rspress Container Directives）

Rspress 原生支持 `:::note`、`:::tip`、`:::info`、`:::warning`、`:::danger`、`:::details` 容器语法，支持通过 `{title="..."}` 或紧随其后的标题声明自定义标题：

:::note
默认信息提示块：静态站点对比平台的每个子模块均独立维护 `main`（源码）与 `page`（构建产物）双分支，互不污染提交历史。
:::

:::tip\{title="性能优化建议"}
在派生到三冒号体系时，Rspress 支持 `:::tip{title="性能优化建议"}` 属性语法或空格自定义标题，同时兼容内部行内代码与加粗排版。
:::

:::warning\{title="版本边界注意"}
注意区分各派系关键字命名——Rspress、Docusaurus v3、VitePress 与 VuePress 均支持 `warning`，Starlight 使用 `caution`，Docsify 传统语法则使用 `!>`。
:::

:::danger\{title="不可逆分支覆盖警告"}
自动化流水线在向 `page` 分支推送构建产物时会启用 `force_orphan: true`，切勿在 `page` 分支直接手工修改代码！
:::

## 3. 可折叠详情容器（原生 HTML `<details>`）

标准 CommonMark / GFM 使用原生 `<details>` 与 `<summary>` 标签实现折叠，Rspress 同样支持原样渲染并解析内部空行后的 Markdown 与公式：

<details>
<summary>点击展开查看 Rspress 容器与折叠语法源码结构</summary>

```markdown
:::tip{title="性能优化建议"}
Rspress 同时支持三冒号容器与标准 GitHub Alerts 语法。
:::
```

除了代码块，折叠容器内同样支持列表、表格与数学公式 $f(x) = x^2 + 1$。

</details>

## 4. GitHub 风格引用警报（GFM Alerts）跨框架直通测试

以下三段在**所有派生子模块中均保持一字不改**，用于测试：如果不做任何方言改写、直接把母版 `.md` 丢进目标生成器，哪些框架能原样渲染，哪些会退化为普通引用文本：

> \[!NOTE]
> 这是一段标准的 GitHub Flavored Markdown `[!NOTE]` 警报文本，用于检验各生成器对母版语法的零改造直通能力。

> \[!IMPORTANT]
> 跨平台迁移 Markdown 文档时，是否原生兼容 `> [!IMPORTANT]` 与 `> [!WARNING]` 直接决定了母版文档的派生改造成本。

> \[!CAUTION]
> 若目标生成器未内置 GFM Alert 解析器（如 VuePress v1、Starlight 默认配置、Docsify v4 旧插件），上方标记会退化为普通引用块并原样露出 `[!CAUTION]` 字符串。
