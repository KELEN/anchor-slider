
## 使用方法 ##

1. include file （引入文件）

	    <!-- 引入css文件 -->
	    <link type="text/css" rel="stylesheet" href="css/anchor-slider.css" />
	    <!-- 项目依赖jquery，引入相应的jquery文件 -- >
	    <script type="text/javascript" src="js/jquery.js"></script>
	    <script type="text/javascript" src="js/jquery.anchor-slider.js"></script>

2. html structure （html结构）

		<!-- html页面按钮  -->
		<ul id="menu">
			<li data-target="resume1">个人简介</li>
			<li data-target="resume2">工作经验</li>
			<li data-target="resume3">个人技能</li>
		</ul>
		<!-- body -->
		<div class="resume-wrapper">
			<div class="section resume1"><div>
			<div class="section resume2"><div>
			<div class="section resume3"><div>
		</div>

3. initialize （初始化）

		$.fn.anchorSlider('.resume-wrapper', {
			anchors: ['resume1', 'resume2', 'resume3'],
		});

可选项

|  选项                | 说明                       | 说明     |
 ----------------- | ---------------------------- | ------------------
| firstFullPage | `首页满屏`            | false |
| allFullPage | `每一个都满屏`            | false |
| speed | `速度` | 500 |
| enableMouseWheelScrolling | `使用鼠标滚轮` |  true
| anchorClassName | `描点名` |  ‘section’
| anchors | `对应的描点名` | resume1
| afterSlideLoad | `滚动结束回调` | 参数: index 返回描点页面的下标
| loop | `循环滚动` | true
| autoScroll | `自动滚动` | false
| autoScrollTime | `自动滚动延迟` | 3000ms