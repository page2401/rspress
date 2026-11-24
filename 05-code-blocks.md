> For AI agents: the complete documentation index is available at /rspress/llms.txt, the full documentation bundle is available at /rspress/llms-full.txt.

# 05. 高阶代码块与语法高亮（Rspress v2 派生版）

技术文档中超过 40% 的篇幅由代码块构成，但标准 CommonMark / GitHub Flavored Markdown 仅定义了围栏语言标识（` ```ts `），并未定义文件名标题栏、指定行高亮、带词法着色的行级 Diff 以及多语言 Tab 切换组。本页采用 `.mdx` 后缀由原始 GFM 母版派生适配至 **Rspress v2 (`2.1.4`)**，实测其内置 **Shiki 4 + `@shikijs/transformers`** 编译管线与 `@rspress/core/theme` 标签页组件。

## 1. 代码块文件名标题栏与静态 Shiki 着色

Rspress v2 在构建期通过 `@shikijs/rehype` 与内置 `add-title` 转换器处理代码块，只需在围栏信息串声明 `title="scripts/resolve-route.ts"` 即可生成文件名顶栏、语言角标与一键复制交互：

```ts title="scripts/resolve-route.ts"
export interface RouteContext {
  basePath: string
  slug: string
  cleanUrls: boolean
}

export function formatDocRoute(ctx: RouteContext): string {
  const prefix = ctx.basePath.endsWith('/') ? ctx.basePath : `${ctx.basePath}/`
  const normalized = ctx.slug.replace(/^\/+|\/+$/g, '')
  if (!normalized || normalized === 'index') return prefix
  return ctx.cleanUrls ? `${prefix}${normalized}/` : `${prefix}${normalized}.html`
}
```

## 2. 关键行聚焦与区间高亮（`{3,7-9}`）

Rspress v2 默认启用 `transformerNotationHighlight`（`// [!code highlight]`），同时在 `@rspress/core/shiki-transformers` 中官方导出 `transformerCompatibleMetaHighlight()`：在 `rspress.config.ts` 的 `markdown.shiki.transformers` 中挂载后，即可在信息串直接使用 `{3,7-9}` 零侵入高亮纯 JSON 配置的第 `3` 行与第 `7–9` 行：

```json title="benchmark.config.json" {3,7-9}
{
  "id": "ssg-benchmark",
  "routeStyle": "clean",
  "strictZeroCdn": true,
  "markdown": {
    "mathEngine": "katex",
    "diagramEngine": "mermaid",
    "lineHighlight": true,
    "codeTransformers": ["diff", "focus"]
  }
}
```

## 3. 保留词法着色的代码增删对比（`[!code --]` / `[!code ++]`）

得益于 `@rspress/core` 默认集成 `transformerNotationDiff`，我们无需将代码块降级为无词法高亮的 `diff` 语言，直接在 `ts` 代码块中使用 `// [!code --]` 与 `// [!code ++]` 即可同时获得红绿增删背景与完整的 TypeScript 语法高亮：

```ts title="scripts/mount-subsite.ts"
export function mountSubsite(baseDir: string, subPath: string): string | null {
  const cleanRel = decodeURIComponent(subPath).replace(/\.\./g, '') // [!code --]
  return `${baseDir}/${cleanRel}` // [!code --]
  const resolvedBase = path.resolve(baseDir) // [!code ++]
  const target = path.resolve(resolvedBase, decodeURIComponent(subPath).replace(/^\/+/, '')) // [!code ++]
  return target.startsWith(`${resolvedBase}${path.sep}`) ? target : null // [!code ++]
}
```

## 4. 多语言运行时命令组（`<Tabs>` + `<Tab>`）

Rspress v2 根据文件扩展名决定 MDX 编译模式（`format: 'md' | 'mdx'`）：当需要在文档中引入 `@rspress/core/theme` 的 `<Tabs>` 与 `<Tab>` 组件时，只需将文件命名为 `.mdx` 并设置 `groupId` 即可实现跨页联动的命令切换栏：


**Node.js (package.json)**

```bash
npm ci && npm run build
```

**Deno 2 (deno.json)**

```bash
deno task build
```

**Python (requirements.txt)**

```bash
pip install -r requirements.txt && sphinx-build -b dirhtml . _build/dirhtml
```

**Ruby (Gemfile)**

```bash
bundle install && bundle exec jekyll build
```

## 5. 四大底层高亮引擎能力对照小结

| 高亮引擎代表                      | 典型采用框架                                                  | 构建期零运行时 JS           | 原生行号 / 行高亮                        | 保留词法着色的 Diff            |
| :-------------------------- | :------------------------------------------------------ | :------------------- | :-------------------------------- | :---------------------- |
| **Shiki / Expressive Code** | VitePress、Starlight、Fumadocs、Nextra、Rspress、Nuxt、Quartz | ✅ 纯静态内联样式            | ✅ `{1,3-5}` / `[!code highlight]` | ✅ `// [!code ++]`       |
| **Prism.js**                | Docusaurus、VuePress、Eleventy (plugin)、Gatsby            | ✅ 静态 Token 类名        | ✅ `{1,3-5}` / 魔法注释                | ⚠️ 需配 diff-highlight 插件 |
| **Pygments / Rouge**        | MkDocs Material、Sphinx、Pelican、Jekyll                   | ✅ Python/Ruby 编译直出   | ✅ `hl_lines` / `emphasize-lines`  | ⚠️ 仅标准 `diff` 块红绿       |
| **Chroma / Giallo / hljs**  | Hugo (Go Chroma)、Zola (Rust Giallo)、mdBook (hljs)       | ✅ (mdBook 为客户端 hljs) | ✅ Hugo/Zola 原生 `hl_lines`         | ⚠️ 仅标准 `diff` 块红绿       |
