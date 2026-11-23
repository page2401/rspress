# page2401/rspress

独立静态站点对比子模块 —— **Rspress v2 (`2.1.4`)**。

- **线上预览地址**：`https://page.2401.xyz/rspress/`
- **对比总站地址**：`https://page.2401.xyz/`
- **分支模型**：
  - `main`：仅保存纯工程源码与适配版 `*.md` 基准文档（挂载为主仓库 `sites/rspress` 子模块）
  - `page`：由 GitHub Actions 自动构建并强制覆盖的纯静态产物孤儿分支（供 GitHub Pages 发布）

## 精确锁定依赖版本

- `@rspress/core`: `2.1.4`
- `rspress-plugin-katex`: `1.0.1`
- `rspress-plugin-mermaid`: `2.0.0`
- `katex`: `0.19.1`
- `mermaid`: `12.3.0`
- `react` / `react-dom`: `19.3.1`

## 本地开发与独立部署

```bash
npm install
npm run dev      # 本地开发预览
npm run build    # 构建至 doc_build/ (默认 base: /rspress/)

# 如需部署到独立根域名：
BASE_PATH=/ npm run build
```
