---
order: 1
title: PageRank 与线性代数
---

# PageRank：用线性代数给网页排序

> Google 最早的排序算法。它的核心不是爬虫，而是一个矩阵的特征向量。

## 1. 把网页看成一个有向图

把每个网页看成一个节点，网页 $j$ 上的链接指向网页 $i$，就画一条有向边 $j \to i$。

设网页总数为 $n$，邻接矩阵 $A$ 定义为

$$
A_{ij} =
\begin{cases}
1, & j \text{ 有链接指向 } i \\
0, & \text{否则}
\end{cases}
$$

网页 $j$ 的出度是 $d_j = \sum_{i=1}^{n} A_{ij}$。

## 2. 随机游走与转移矩阵

假设一个“随机冲浪者”每次在当前页面上等概率地点一条出链。定义**转移矩阵** $M$：

$$
M_{ij} = \frac{A_{ij}}{d_j} \qquad (d_j > 0)
$$

$M$ 的每一列加起来都是 $1$，这样的矩阵叫**列随机矩阵**（column-stochastic matrix）。

设 $\pi_k$ 是第 $k$ 步时冲浪者停留在各页面的概率分布，那么

$$
\pi_{k+1} = M \pi_k
$$

## 3. 平稳分布就是特征向量

如果分布不再变化，即 $\pi_{k+1} = \pi_k$，就有

$$
M \pi = \pi
$$

也就是说，$\pi$ 是 $M$ 对应于**特征值 $1$** 的特征向量，归一化后就是 PageRank 向量。

这里有两个问题需要回答：

1. 特征值 $1$ 一定存在吗？—— 是的。列随机矩阵每列和为 $1$，因此 $M$ 一定以 $1$ 为特征值（$M^\mathsf{T}$ 有特征向量 $\mathbf{1}$）。
2. 平稳分布唯一吗？—— 不一定。如果图不连通，或者有页面没有出链（悬挂节点），平稳分布可能不唯一，甚至迭代会衰减到 $0$。

## 4. 阻尼因子与 Google 矩阵

真实的网页图并不满足“强连通”，所以 PageRank 引入一个随机跳转：冲浪者以概率 $\alpha$ 点链接，以概率 $1-\alpha$ 随机跳到任意一个页面（通常 $\alpha = 0.85$）。

这时的转移矩阵叫 **Google 矩阵**：

$$
G = \alpha M + \frac{1-\alpha}{n}\,\mathbf{1}\mathbf{1}^\mathsf{T}
$$

其中 $\mathbf{1}$ 是全 $1$ 列向量。

$G$ 的每一列仍然和为 $1$，而且每个元素都严格大于 $0$。由 Perron–Frobenius 定理，$G$ 存在唯一的平稳分布 $\pi > 0$，满足

$$
\pi = G\pi
$$

展开就是

$$
\pi = \alpha M \pi + \frac{1-\alpha}{n}\mathbf{1}
$$

移项得到一个**线性方程组**：

$$
\left(I - \alpha M\right)\pi = \frac{1-\alpha}{n}\mathbf{1}
$$

因为 $M$ 的特征值满足 $|\lambda| \le 1$，所以 $I - \alpha M$ 的特征值都不小于 $1-\alpha > 0$，矩阵可逆，方程组有唯一解。

## 5. 三页的例子

三个网页：$A$ 链接到 $B$、$C$；$B$ 链接到 $C$；$C$ 链接到 $A$。

$$
M =
\begin{bmatrix}
0 & 0 & 1\\
\frac{1}{2} & 0 & 0\\
\frac{1}{2} & 1 & 0
\end{bmatrix}
$$

**不加阻尼**（$\alpha = 1$）时解 $M\pi = \pi$：

$$
\pi = \begin{bmatrix} 0.4 \\ 0.2 \\ 0.4 \end{bmatrix}
$$

**加阻尼**（$\alpha = 0.85$）时解 $(I-\alpha M)\pi = \frac{1-\alpha}{n}\mathbf{1}$：

$$
\pi \approx \begin{bmatrix} 0.3878 \\ 0.2148 \\ 0.3974 \end{bmatrix}
$$

| 页面 | $\alpha = 1$ | $\alpha = 0.85$ |
| --- | --- | --- |
| $A$ | 0.4 | 0.3878 |
| $B$ | 0.2 | 0.2148 |
| $C$ | 0.4 | 0.3974 |

阻尼把分布往均匀方向拉了一点：没有任何页面能独占全部权重。

## 6. 实际怎么算：幂迭代

网页数量上亿，不可能求逆。实际用的是**幂迭代**（power iteration），反复乘 $G$ 直到收敛：

```python
import numpy as np

def pagerank(M, alpha=0.85, tol=1e-10, max_iter=200):
    n = M.shape[0]
    pi = np.ones(n) / n
    for _ in range(max_iter):
        new = alpha * M @ pi + (1 - alpha) / n
        if np.linalg.norm(new - pi, 1) < tol:
            return new
        pi = new
    return pi
```

收敛速度由 $G$ 的第二大特征值决定，大约是 $\alpha \lambda_2$。$\alpha$ 越接近 $1$，结果越贴近原始链接结构，但收敛也越慢；这就是为什么常取 $0.85$。

## 7. 和线性代数课程的联系

| 课堂概念 | 在 PageRank 里的角色 |
| --- | --- |
| 特征值与特征向量 | PageRank 向量是 $G$ 关于 $\lambda = 1$ 的特征向量 |
| 线性方程组 | 解 $(I-\alpha M)\pi = \frac{1-\alpha}{n}\mathbf{1}$ |
| 马尔可夫链 | $M$ 是转移矩阵，$\pi$ 是平稳分布 |
| 幂法 | 求主特征向量的数值方法，即幂迭代 |
| 稀疏矩阵 | 真实网页图极稀疏，只能迭代，不能求逆 |

::: tip 一句话总结
PageRank 就是“求 Google 矩阵主特征向量”这件事，排序只是它的应用。
:::

## 8. 悬挂节点

没有出链的页面（$d_j = 0$）会让 $M$ 的第 $j$ 列全为 $0$，不再是随机矩阵。常见处理是把这一列替换成 $\frac{1}{n}\mathbf{1}$，相当于从这个页面随机跳到任意页面。
