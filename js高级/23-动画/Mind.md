### 动画库思路
- 基于target算出begin、change
- 根据interval()定时器实现动画
    - 初始时间+=间隔时间
    - 边界判断（时间超出时，设置末尾为target位置，清除计时器，return）
    - 获取元素当前位置（time/duration*change+begin）
    - 设置元素位置