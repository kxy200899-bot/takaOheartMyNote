---
title: CHM1001 期中复习笔记
---

# CHM1001 期中复习笔记

::: tip 打印版 PDF
[打开 / 下载这份笔记的 PDF](/pdfs/chm1001mid.pdf) —— A4 排版，适合打印和发给同学。
:::

> 整理自两页手写复习稿：文字全部改成打印体并重新分节，**分子轨道图、相图、相变图、Born–Haber 循环保留手绘原稿**，方便和记忆里的画面直接对应。

## 速览

| 模块 | 必须会的东西 |
| --- | --- |
| 原子结构 | 光子能量、Bohr 模型、四个量子数、电子排布、周期律 |
| 成键 | Lewis 结构、形式电荷、共振、键能、晶格能 |
| 分子形状 | VSEPR、杂化、孤对电子的影响、极性 |
| 分子间作用力 | 色散 / 偶极–偶极 / 氢键 / 离子–偶极 |
| 气体 | 理想气体方程、分压、KMT、Graham 定律、van der Waals |
| 相变 | 相图、三态变化、吸热与放热 |

## 1. 光的能量与 Bohr 模型

### 光子能量

$$
E = h\nu = \frac{hc}{\lambda}, \qquad h = 6.626 \times 10^{-34}\ \mathrm{J \cdot s}
$$

这就是**光电效应**：光的能量是一份一份的，频率必须超过阈值才能打出电子。

### 电磁波谱

按波长从短到长（能量从高到低）：γ 射线 → X 射线 → 紫外 → 可见光 → 红外 → 微波 → 无线电波。

可见光大约在 $400\ \mathrm{nm}$ 到 $700\ \mathrm{nm}$ 之间。

### Bohr 模型的三条假设

1. 电子只能在某些**特定轨道**上运动，在这些轨道上不辐射能量。
2. 每条轨道有**确定的能量**。
3. 电子在轨道之间跃迁时，吸收或放出**能量差**：

$$
\Delta E = E_{\text{高}} - E_{\text{低}} = h\nu
$$

### 局限

- 只对**氢原子**（以及类氢离子）成立。
- 把电子当成绕核的经典粒子，没有考虑波动性。

### 保留下来的重要思想

- 电子的能量是**离散**的，不能取任意值。
- 光谱来自电子在能级之间的跃迁。

### 发射与吸收

| 过程 | 方向 | 能量 |
| --- | --- | --- |
| 发射 emission | 高能级 → 低能级 | 放出光子 |
| 吸收 absorption | 低能级 → 高能级 | 吸收光子 |

能级越低，相邻能级之间的间隔越大（$E_n \propto -1/n^2$），所以 $n=1 \leftrightarrow 2$ 的跃迁能量最大。

### 里德堡公式

$$
\frac{1}{\lambda} = R_H\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right), \qquad R_H \approx 1.097 \times 10^{7}\ \mathrm{m^{-1}}
$$

### de Broglie 与不确定原理

$$
\lambda = \frac{h}{mv}, \qquad \Delta x\,\Delta p \ge \frac{h}{4\pi}
$$

## 2. 量子数与轨道

### 四个量子数

| 符号 | 名称 | 取值 | 物理意义 |
| --- | --- | --- | --- |
| $n$ | 主量子数 | $1, 2, 3, \dots$ | 电子层，决定能量 |
| $l$ | 角量子数 | $0 \le l \le n-1$ | 轨道形状（s、p、d、f） |
| $m_l$ | 磁量子数 | $-l \le m_l \le l$ | 轨道的空间取向 |
| $m_s$ | 自旋量子数 | $+\tfrac{1}{2}$ 或 $-\tfrac{1}{2}$ | 电子自旋方向 |

### 各层轨道数

| $n$ | $l$ | 亚层 | $m_l$ | 亚层轨道数 | 该层轨道总数 |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 1s | 0 | 1 | 1 |
| 2 | 0 | 2s | 0 | 1 | 4 |
| 2 | 1 | 2p | −1, 0, +1 | 3 | |
| 3 | 0 | 3s | 0 | 1 | 9 |
| 3 | 1 | 3p | −1, 0, +1 | 3 | |
| 3 | 2 | 3d | −2 … +2 | 5 | |
| 4 | 0–3 | 4s, 4p, 4d, 4f | — | 1, 3, 5, 7 | 16 |

每个轨道最多放 2 个电子，所以第 $n$ 层最多容纳 $2n^2$ 个电子：第 4 层最多 $2 \times 4^2 = 32$ 个。

### 轨道形状

- **s**：球形。
- **p**：哑铃形，三个方向 $p_x$、$p_y$、$p_z$，$p_x$ 沿 $x$ 轴。
- **d**：四个花瓣（多数），共 5 个取向。

### 电子排布三原则

1. **能量最低原理**：先填能量低的轨道。
2. **泡利不相容原理**：同一轨道最多两个电子，自旋相反。
3. **洪特规则**：等价轨道先各占一个，自旋平行，再成对。

电子按 $1s \to 2s \to 2p \to 3s \to 3p \to 4s \to 3d \to 4p$ 的顺序填充。

例：

$$
\mathrm{Fe}:\ [\mathrm{Ar}]\,3d^6 4s^2
\qquad
\mathrm{Fe^{3+}}:\ [\mathrm{Ar}]\,3d^5
$$

## 3. 有效核电荷与周期律

### 有效核电荷

$$
Z_{\text{eff}} = Z - S
$$

$S$ 是屏蔽常数。Slater 规则把电子分组：

$$
(1s)(2s,2p)(3s,3p)(3d)(4s,4p)(4d)(4f)
$$

- 同组电子（不算目标电子自己）：$0.35$（1s 组为 $0.30$）
- 相邻内层 $(n-1)$：$0.85$
- 更内层：$1.00$

定性判断时：本层算 0，内层算 1。

### 周期趋势

| 性质 | 同周期（左 → 右） | 同主族（上 → 下） |
| --- | --- | --- |
| 原子半径 | 减小 | 增大 |
| 电离能 | 增大 | 减小 |
| 电负性 | 增大 | 减小 |
| 金属性 | 减弱 | 增强 |

**金属性最强**在周期表左下角，**非金属性最强**在右上角。

### 几个定义的区分

- **电离能**：气态原子失去一个电子所需能量

$$
\mathrm{X}(g) \to \mathrm{X^+}(g) + e^-, \qquad \Delta H > 0
$$

- **电子亲和能**：气态原子得到一个电子放出的能量

$$
\mathrm{X}(g) + e^- \to \mathrm{X^-}(g)
$$

- **晶格能**：气态离子结合成 1 mol 离子晶体放出的能量

$$
\mathrm{M^+}(g) + \mathrm{X^-}(g) \to \mathrm{MX}(s)
$$

影响晶格能的两个因素：**电荷越大、半径越小，晶格能越大**。

### 等电子体与过渡金属

- 等电子体（isoelectronic series）电子数相同，半径随核电荷增加而减小，如 $\mathrm{N^{3-}} > \mathrm{O^{2-}} > \mathrm{F^-} > \mathrm{Na^+} > \mathrm{Mg^{2+}}$。
- 同周期过渡金属的差别主要在 **d 电子数**。
- 卤素与碱金属形成盐：$\mathrm{NaX}$，$X = \mathrm{F, Cl, Br, I}$。

## 4. Lewis 结构、共振与键能

### 八隅体规则的例外

1. **奇数电子**：$\mathrm{NO}$、$\mathrm{NO_2}$，中心原子价电子数为奇数。
2. **不足八隅体**：$\mathrm{BeCl_2}$（4e⁻）、$\mathrm{BF_3}$（6e⁻）。
3. **超过八隅体**（中心原子在第 3 周期及以后）：$\mathrm{PCl_5}$（10e⁻）、$\mathrm{SF_6}$（12e⁻）、$\mathrm{IF_5}$。

### 形式电荷

$$
\text{形式电荷} = \text{价电子数} - \text{非键电子数} - \frac{1}{2}\text{键电子数}
$$

即：价电子数 − 孤对电子数 − 键数。

好的 Lewis 结构中，形式电荷越接近 0 越好；有电荷时，负电荷应落在电负性更大的原子上。

### 共振结构

同一分子可以画出多个只差电子对位置的 Lewis 结构，真实结构是它们的**共振杂化体**。

常见例子：$\mathrm{CO_3^{2-}}$、$\mathrm{O_3}$、$\mathrm{NO_2^-}$、$\mathrm{NO_3^-}$、$\mathrm{SO_3}$、$\mathrm{CH_3COO^-}$、$\mathrm{HCOO^-}$、$\mathrm{C_6H_5^-}$ 类。

> 只有单键的分子没有共振（例如 $\mathrm{CH_4}$、$\mathrm{H_2O}$）。

### 键能

- 断键**吸收**能量，成键**放出**能量。
- 反应热：

$$
\Delta H = \sum \text{断键能} - \sum \text{成键能}
$$

结果小于 0 为放热，大于 0 为吸热。

### 晶格能与 Born–Haber 循环

晶格能不能直接测量，要用 Born–Haber 循环把它拆成可测的几步：

<figure class="hand-figure">
  <img src="/figures/chm1001mid/born-haber.png" alt="手绘 Born-Haber 循环" loading="lazy">
  <figcaption>手绘原稿 · NaCl 的 Born–Haber 循环：升华、电离、解离、电子亲和、晶格能</figcaption>
</figure>

$$
\Delta H_f = \Delta H_{\text{sub}} + I_1 + \tfrac{1}{2}D_{\mathrm{Cl_2}} + \mathrm{EA} + U
$$

其中 $U$ 是晶格能（负值）。

## 5. 分子轨道（MO）理论

价键理论（VBT）把共价键看成原子轨道的重叠，能解释分子的形状，但解释不了 $\mathrm{O_2}$ 的顺磁性和分子的激发态，所以需要分子轨道理论。

原子轨道线性组合成分子轨道：

- 同号叠加 → **成键轨道**（bonding），能量更低。
- 异号叠加 → **反键轨道**（antibonding），能量更高，记作 $\sigma^*$、$\pi^*$。

电子先填成键轨道，键级为

$$
\text{键级} = \frac{N_{\text{成键}} - N_{\text{反键}}}{2}
$$

键级越大，键越短、越强；键级为 0 说明这个分子不能稳定存在。

- 所有电子都成对 → **抗磁性**（diamagnetic）。
- 有未成对电子 → **顺磁性**（paramagnetic）。

### 第二周期双原子分子的 MO 顺序

| 分子 | 能级顺序 |
| --- | --- |
| $\mathrm{O_2}$、$\mathrm{F_2}$ | $\sigma_{2s} < \sigma^*_{2s} < \sigma_{2p} < \pi_{2p} < \pi^*_{2p} < \sigma^*_{2p}$ |
| $\mathrm{B_2}$、$\mathrm{C_2}$、$\mathrm{N_2}$ | $\sigma_{2s} < \sigma^*_{2s} < \pi_{2p} < \sigma_{2p} < \pi^*_{2p} < \sigma^*_{2p}$ |

$\mathrm{B_2}$、$\mathrm{C_2}$、$\mathrm{N_2}$ 的 $\sigma_{2p}$ 被推到 $\pi_{2p}$ 之上，这是 s–p 混杂造成的。

<figure class="hand-figure">
  <img src="/figures/chm1001mid/mo-diagram.png" alt="手绘分子轨道能级图" loading="lazy">
  <figcaption>手绘原稿 · 分子轨道能级图：B<sub>2</sub>、C<sub>2</sub>、N<sub>2</sub> 与 O<sub>2</sub>、F<sub>2</sub> 的 σ<sub>2p</sub> / π<sub>2p</sub> 顺序不同</figcaption>
</figure>

### 键级与磁性

| 分子 | 价电子数 | 成键电子 | 反键电子 | 键级 | 磁性 |
| --- | --- | --- | --- | --- | --- |
| $\mathrm{N_2}$ | 10 | 8 | 2 | 3 | 抗磁性 |
| $\mathrm{O_2}$ | 12 | 8 | 4 | 2 | 顺磁性 |
| $\mathrm{F_2}$ | 14 | 8 | 6 | 1 | 抗磁性 |

$\mathrm{O_2}$ 的两个未成对电子在 $\pi^*_{2p}$ 上，所以液氧能被磁铁吸住——这是 MO 理论最漂亮的成功之一。

## 6. VSEPR、杂化与分子形状

### VSEPR 的核心

**价层电子对互斥理论**（Valence Shell Electron Pair Repulsion）：中心原子周围的电子对（成键对 + 孤对）会尽量远离，使排斥最小。

**电子域**（electron domain）：电子最可能出现的一个区域。单键、双键、三键都只算**一个**电子域；一个孤对也算一个。

### 电子域几何

| 电子域数 | 几何 | 键角 |
| --- | --- | --- |
| 1 | 直线形 linear | $180°$ |
| 2 | 平面三角形 trigonal planar | $120°$ |
| 3 | 四面体 tetrahedral | $109.5°$ |
| 4 | 三角双锥 trigonal bipyramidal | $120°$ 与 $90°$ |
| 5 | 八面体 octahedral | $90°$ |

> 注意：上表的“电子域数”把孤对也算进去了，所以是电子域几何，不是分子形状。

### 孤对电子改变分子形状

孤对电子的排斥比成键电子对更强，会把键角压小：

| 电子域 | 成键对 | 孤对 | 分子形状 | 例子 |
| --- | --- | --- | --- | --- |
| 3 | 2 | 1 | 弯曲形 bent | $\mathrm{SO_2}$、$\mathrm{O_3}$ |
| 4 | 2 | 2 | 弯曲形 bent | $\mathrm{H_2O}$（$104.5°$） |
| 4 | 3 | 1 | 三角锥 trigonal pyramidal | $\mathrm{NH_3}$（$107°$） |
| 5 | 4 | 1 | 跷跷板 seesaw | $\mathrm{SF_4}$ |
| 5 | 3 | 2 | T 形 T-shaped | $\mathrm{ClF_3}$ |
| 5 | 2 | 3 | 直线形 linear | $\mathrm{XeF_2}$ |
| 6 | 5 | 1 | 四方锥 square pyramidal | $\mathrm{BrF_5}$、$\mathrm{IF_5}$ |
| 6 | 4 | 2 | 平面四方 square planar | $\mathrm{XeF_4}$ |

### 杂化

| 杂化 | 电子域 | 几何 | 例子 |
| --- | --- | --- | --- |
| sp | 2 | 直线 | $\mathrm{CO_2}$、$\mathrm{BeCl_2}$ |
| sp² | 3 | 平面三角 | $\mathrm{BF_3}$、$\mathrm{SO_3}$ |
| sp³ | 4 | 四面体 | $\mathrm{CH_4}$、$\mathrm{NH_3}$、$\mathrm{H_2O}$ |
| sp³d | 5 | 三角双锥 | $\mathrm{PCl_5}$ |
| sp³d² | 6 | 八面体 | $\mathrm{SF_6}$ |

### 两个常考计算

**例 1：$\mathrm{ICl_4^-}$ 的孤对数**

$$
\text{孤对} = \frac{7 + 1 - 4}{2} = 2, \qquad \text{成键对} = 4
$$

电子域 6，分子形状为**平面四方**。

**例 2：判断极性**

- $\mathrm{CO_2}$ 直线形，两个 $\mathrm{C=O}$ 键的偶极方向相反、大小相等，**互相抵消** → 非极性。
- $\mathrm{CH_4}$ 四面体，四个键偶极对称抵消 → 非极性。
- $\mathrm{H_2O}$ 弯曲形，偶极不能抵消 → 极性。

### π 键与 p 轨道

π 键由两个 p 轨道**肩并肩**重叠形成；σ 键是头碰头重叠。

## 7. 分子间作用力

从强到弱：**离子–偶极 > 氢键 > 偶极–偶极 > 色散力**。

判断顺序（先问三个问题）：

1. **有离子吗？** 有 → 离子–偶极（如 $\mathrm{NaCl}$ 溶于水）。
2. **有极性分子吗？** 没有 → 只有色散力（$\mathrm{CH_4}$、$\mathrm{Br_2}$）。
3. **有 H 直接连在 O、N、F 上吗？** 有 → 氢键（$\mathrm{NH_3}$、$\mathrm{CH_3OH}$、$\mathrm{HF}$）；没有 → 偶极–偶极（$\mathrm{CH_3F}$、$\mathrm{HBr}$）。

色散力和偶极–偶极合称 **van der Waals 力**。

- 色散力随分子越大、电子越多而增强。
- 氢键比普通偶极作用强，但比共价键弱得多。
- 离子–偶极是离子晶体溶于极性溶剂的主要原因。

## 8. 气体

### 理想气体方程

$$
PV = nRT, \qquad R = 0.08206\ \mathrm{L \cdot atm \cdot mol^{-1} \cdot K^{-1}}
$$

### 三个实验定律

| 定律 | 条件 | 关系 |
| --- | --- | --- |
| Boyle | $T$ 恒定 | $P_1V_1 = P_2V_2$ |
| Charles | $P$ 恒定 | $\dfrac{V_1}{T_1} = \dfrac{V_2}{T_2}$（$T$ 必须用 K） |
| Avogadro | $T, P$ 恒定 | $\dfrac{V_1}{n_1} = \dfrac{V_2}{n_2}$ |

### 分压与摩尔分数

$$
P_i = X_i P_{\text{total}}, \qquad X_i = \frac{n_i}{n_{\text{total}}}
$$

例：$1.00\ \mathrm{atm}$ 的 $\mathrm{N_2}$ 取 $2.0\ \mathrm{L}$，$2.00\ \mathrm{atm}$ 的 $\mathrm{O_2}$ 取 $3.0\ \mathrm{L}$，混合后总体积 $5.0\ \mathrm{L}$：

$$
P_{\mathrm{N_2}} = \frac{1.00 \times 2.0}{5.0} = 0.40\ \mathrm{atm}
$$

$$
P_{\mathrm{O_2}} = \frac{2.00 \times 3.0}{5.0} = 1.20\ \mathrm{atm}
$$

$$
P_{\text{total}} = 0.40 + 1.20 = 1.60\ \mathrm{atm}
$$

### 气体动理论（KMT）五条假设

1. 气体由大量分子组成，做**持续无规则运动**。
2. 分子本身占的体积与容器体积相比**可以忽略**。
3. 分子间吸引力和排斥力**可以忽略**。
4. 分子平均动能与**绝对温度**成正比。
5. 碰撞中能量可以转移，但**平均动能**只由温度决定。

$$
\bar{E}_k = \frac{1}{2}m\bar{v^2} = \frac{3}{2}k_BT
$$

### 三种速率

$$
u_{\text{mp}} = \sqrt{\frac{2RT}{M}}, \qquad
u_{\text{av}} = \sqrt{\frac{8RT}{\pi M}}, \qquad
u_{\text{rms}} = \sqrt{\frac{3RT}{M}}
$$

大小顺序：

$$
u_{\text{mp}} < u_{\text{av}} < u_{\text{rms}}
$$

同温下，摩尔质量越大，速率越小。

### Graham 定律

$$
\frac{r_1}{r_2} = \sqrt{\frac{M_2}{M_1}}
$$

逸出（effusion）和扩散（diffusion）都适用。

### van der Waals 方程

理想气体忽略了分子体积和分子间作用力，修正后：

$$
\left(P + \frac{an^2}{V^2}\right)(V - nb) = nRT
$$

- $a$ 修正分子间引力；
- $b$ 修正分子自身体积。

### 标准状况

$0\ ^\circ\mathrm{C}$、$1\ \mathrm{atm}$ 下，$1\ \mathrm{mol}$ 理想气体体积约 $22.4\ \mathrm{L}$。

## 9. 相变与相图

### 水的相图

<figure class="hand-figure">
  <img src="/figures/chm1001mid/phase-diagrams.png" alt="手绘水的相图与二氧化碳相图" loading="lazy">
  <figcaption>手绘原稿 · 水与二氧化碳的相图，含三相点、临界点和固–液线斜率</figcaption>
</figure>

水的固–液线斜率**为负**：压强增大，熔点反而降低。

| 物质 | 三相点 | 临界点 |
| --- | --- | --- |
| $\mathrm{H_2O}$ | $0.0098\ ^\circ\mathrm{C}$，$0.006\ \mathrm{atm}$ | $374\ ^\circ\mathrm{C}$，$217.7\ \mathrm{atm}$ |
| $\mathrm{CO_2}$ | $-57\ ^\circ\mathrm{C}$，$5.11\ \mathrm{atm}$ | $31\ ^\circ\mathrm{C}$，$73\ \mathrm{atm}$ |

$\mathrm{CO_2}$ 在 $1\ \mathrm{atm}$ 下不能以液态存在，会直接升华；临界点以上是**超临界流体**。

### 三态变化

<figure class="hand-figure">
  <img src="/figures/chm1001mid/phase-changes.png" alt="手绘相变关系图" loading="lazy">
  <figcaption>手绘原稿 · 气、液、固三态之间的六种相变（黑色吸热，红色放热）</figcaption>
</figure>

| 过程 | 方向 | 吸 / 放热 |
| --- | --- | --- |
| 熔化 melting / fusion | 固 → 液 | 吸热 |
| 凝固 freezing | 液 → 固 | 放热 |
| 汽化 vaporization | 液 → 气 | 吸热 |
| 冷凝 condensation | 气 → 液 | 放热 |
| 升华 sublimation | 固 → 气 | 吸热 |
| 沉积 deposition | 气 → 固 | 放热 |

### 相变热

$$
Q = n\,\Delta H_{\text{vap}} \quad\text{或}\quad Q = n\,\Delta H_{\text{fus}}
$$

升温过程：

$$
q = mc\,\Delta T
$$

其中 $c$ 是比热容（$\mathrm{J \cdot g^{-1} \cdot K^{-1}}$）。

## 10. 公式速查

| 公式 | 含义 |
| --- | --- |
| $E = h\nu = hc/\lambda$ | 光子能量 |
| $1/\lambda = R_H(1/n_1^2 - 1/n_2^2)$ | 氢原子光谱 |
| $\lambda = h/(mv)$ | de Broglie 波长 |
| $\Delta x \Delta p \ge h/4\pi$ | 不确定原理 |
| $Z_{\text{eff}} = Z - S$ | 有效核电荷 |
| $PV = nRT$ | 理想气体 |
| $P_i = X_i P_{\text{total}}$ | 分压 |
| $u_{\text{rms}} = \sqrt{3RT/M}$ | 均方根速率 |
| $r_1/r_2 = \sqrt{M_2/M_1}$ | Graham 定律 |
| $\Delta H = \sum E_{\text{断}} - \sum E_{\text{成}}$ | 反应热 |
| $q = mc\Delta T$ | 显热 |
| $Q = n\Delta H_{\text{vap}}$ | 潜热 |

## 11. 手写稿里的零散问答

- $\mathrm{CO_2}$ 为什么是直线形？—— 直线形让两个键偶极正好抵消。
- π 键怎么形成？—— 两个 p 轨道肩并肩重叠。
- $\mathrm{SO_3}$ 的 Lewis 结构？—— 三个 $\mathrm{S=O}$ 双键，S 周围 6 对电子（超八隅体）。
- $E = hc/\lambda$ 里 $h$ 和 $c$ 是什么？—— 普朗克常数与光速。
- p 轨道什么形状？—— 哑铃形。
- 第 4 层最多几个电子？—— $2 \times 4^2 = 32$。
- 洪特规则说什么？—— 等价轨道先单占、自旋平行，再配对。
- 金属氧化物、非金属氧化物溶于水显什么性？—— 金属氧化物显碱性，非金属氧化物显酸性，$\mathrm{Al_2O_3}$ 两性。
- 碱金属、卤素分别以什么形式存在？—— 卤素是双原子分子，稀有气体是单原子气体；金属是金属晶体，盐是离子晶体。
