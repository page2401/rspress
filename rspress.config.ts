import { defineConfig } from '@rspress/core'
import pluginKatex from 'rspress-plugin-katex'
import pluginMermaid from 'rspress-plugin-mermaid'

const rawBase = process.env.BASE_PATH || '/rspress/'
const normalizedBase = rawBase.startsWith('/') ? rawBase : `/${rawBase}`
const base = normalizedBase.endsWith('/') ? normalizedBase : `${normalizedBase}/`

function remarkBypassShikiForMath() {
  return (tree: any) => {
    const walk = (node: any) => {
      if (node.type === 'math') {
        node.data = {
          hName: 'div',
          hProperties: { className: ['math', 'math-display'] },
          hChildren: [{ type: 'text', value: node.value }],
        }
      } else if (node.type === 'inlineMath') {
        node.data = {
          hName: 'span',
          hProperties: { className: ['math', 'math-inline'] },
          hChildren: [{ type: 'text', value: node.value }],
        }
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) walk(child)
      }
    }
    walk(tree)
  }
}

export default defineConfig({
  root: 'docs',
  base,
  outDir: 'doc_build',
  title: 'Rspress v2 (2.1.4)',
  description: 'SSG Benchmark Submodule — Rspress 2.1.4 + _meta.json + KaTeX + Mermaid 12',
  lang: 'zh',
  route: {
    cleanUrls: true,
  },
  plugins: [
    pluginKatex(),
    {
      name: 'rspress-fix-shiki-math-order',
      markdown: {
        remarkPlugins: [remarkBypassShikiForMath],
      },
    },
    pluginMermaid(),
  ],
  themeConfig: {
    nav: [
      {
        text: '01. 专属标注',
        link: '/01-annotations',
      },
      {
        text: '02. 流程图',
        link: '/02-diagrams',
      },
      {
        text: '03. 数学公式',
        link: '/03-math',
      },
      {
        text: '04. 目录结构',
        link: '/04-directory/',
      },
      {
        text: '← 返回对比总站',
        link: 'https://page.2401.xyz/',
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/page2401/rspress',
      },
    ],
    footer: {
      message: 'page2401/rspress · Static Site Generator Benchmark Suite',
    },
  },
})
