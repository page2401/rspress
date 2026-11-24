> For AI agents: the complete documentation index is available at /rspress/llms.txt, the full documentation bundle is available at /rspress/llms-full.txt.

# 03. 数学公式排版（Rspress KaTeX 基准）

本页正文算例 100% 保持与母版一致的 `$...$` 行内定界符与 `$$...$$` 块级定界符，通过 `rspress-plugin-katex@1.0.1` 在构建期编译为 KaTeX HTML 结构，并通过 `globalStyles` 本地打包 `katex@0.19.1` 样式与字体资源，彻底消除外部 CDN 依赖。

## 1. 行内公式与中英文混排基线对齐

考察重点：行内公式在中文字号下的缩放比例、上下标是否撑乱行高，以及分数与根号在行内的紧凑度。

- 质能方程 $E = mc^2$ 与欧拉恒等式 $e^\{i\pi} + 1 = 0$ 嵌入在连续中文段落中的视觉基线表现。
- 归并排序的平均时间复杂度为 $\mathcal\{O}(n \log n)$，而空间复杂度为 $\Theta(n)$；当输入规模满足 $n \ge 2^\{16}$ 时，常数因子差异显著。
- 贝叶斯条件概率公式行内排印：$P(A \mid B) = \frac\{P(B \mid A),P(A)}\{P(B)}$，以及带根号的欧氏距离 $d(\mathbf\{x}, \mathbf\{y}) = \sqrt\{\sum\_\{i=1}^\{n}(x_i - y_i)^2}$。

## 2. 多行等式对齐推导（`aligned` 环境）

测试 `\begin{aligned} ... \end{aligned}` 多行对齐、积分算子与括号自动缩放 `\left( ... \right)`：

$$
\begin\{aligned}
I^2 &= \left( \int\_\{-\infty}^\{+\infty} e^\{-x^2},\mathrm\{d}x \right) \left( \int\_\{-\infty}^\{+\infty} e^\{-y^2},\mathrm\{d}y \right) \\
&= \iint\_\{\mathbb\{R}^2} e^\{-(x^2 + y^2)},\mathrm\{d}x,\mathrm\{d}y \\
&= \int\_\{0}^\{2\pi} \int\_\{0}^\{+\infty} e^\{-r^2} r,\mathrm\{d}r,\mathrm\{d}\theta \\
&= 2\pi \cdot \left\[ -\frac\{1}\{2} e^\{-r^2} \right]\_\{0}^\{+\infty} = \pi \implies I = \sqrt\{\pi}
\end\{aligned}
$$

## 3. 矩阵运算与注意力机制（`bmatrix` 环境）

测试缩放点积注意力公式及矩阵乘法排版：

$$
\mathrm\{Attention}(Q, K, V) = \mathrm\{softmax}!\left(\frac\{QK^\top}\{\sqrt\{d_k}}\right)V
$$

$$
\mathbf\{J}\_\{\mathbf\{f}}(\mathbf\{x}) =
\begin\{bmatrix}
\dfrac\{\partial f_1}\{\partial x_1} & \dfrac\{\partial f_1}\{\partial x_2} & \cdots & \dfrac\{\partial f_1}\{\partial x_n} \\\[6pt]
\dfrac\{\partial f_2}\{\partial x_1} & \dfrac\{\partial f_2}\{\partial x_2} & \cdots & \dfrac\{\partial f_2}\{\partial x_n} \\\[4pt]
\vdots & \vdots & \ddots & \vdots \\\[4pt]
\dfrac\{\partial f_m}\{\partial x_1} & \dfrac\{\partial f_m}\{\partial x_2} & \cdots & \dfrac\{\partial f_m}\{\partial x_n}
\end\{bmatrix}
$$

## 4. 分段函数与优化目标（`cases` 环境）

测试 Huber Loss 分段函数与花括号对齐：

$$
\mathcal\{L}\_\{\delta}(y, \hat\{y}) =
\begin\{cases}
\dfrac\{1}\{2}(y - \hat\{y})^2, & \text\{if } |y - \hat\{y}| \le \delta, \\\[8pt]
\delta \cdot \left(|y - \hat\{y}| - \dfrac\{1}\{2}\delta\right), & \text\{otherwise.}
\end\{cases}
$$

## 5. 字面量美元符号 `\$` 转义边界测试

在启用 `$...$` 行内数学公式后，同一段落出现两个价格数字（例如基础套餐 $29/月 与专业版 $99/月）时，若未正确转义 `\$` 会把中间的中文误解析为斜体公式；而在反引号代码片段中编写环境变量 `$HOME` 或 `awk '{print $1}'` 则应原样保留，无需反斜杠转义。
