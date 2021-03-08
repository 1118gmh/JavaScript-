### css样式书写顺序

```
1. 定位属性
	position [left top right bottom]
	float overflow clear
	display [none隐藏元素不保留位置]
	visibility [hidden隐藏元素但保留位置]
	z-index 
2. 自身属性
	margin padding
	width height 
	background [颜色 图片 no-repeat position/size（大小） origin(定位区域) clip（绘制区域）] 
	background [linear-gradient()线性渐变radial-gradient()径向渐变]
	border 
	
3. 文字属性
	font [font-style font-variant font-weight font-size font-family]
	color
4. 文本属性
	text-align [center居中]
	vertical-align [middle居中]
	white-space [nowrap一行显示所有文本]
	text-overflow [ellisis文本溢出显示...]
	line-height
	text-shadow [X Y 阴影模糊半径 颜色]
	word-wrap[normal单词换行 break-word单词超出换行] 
	word-break[norma不换行 break-word单词换行 keep-all超出就韩换行] 
5. css3中新增加属性
	box-shadow
	box-radius
	box-sizing [border-box]
	opcity
	transform
```

