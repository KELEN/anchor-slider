(function($) {
	'use strict'

	/**
	 *  <nav class="fixed-nav">
	 *		<ul id="menu">
	 *			<li data-target="resume1">个人简介</li>
				<li data-target="resume2">工作经验</li>
				<li data-target="resume3">个人技能</li>
	 *		</ul>
	 *	</nav>
	 * 	<div class="resume-wrapper">
			<div class="section resume1"><div>
			<div class="section resume2"><div>
			<div class="section resume3"><div>
		</div>
	 * 
	 * @param {Object} selector
	 * @param {Object} options
	 */

	$.fn.anchorSlider = function(selector, options) {

		var AS = $.fn.anchorSlider;

		var $container; // 包裹所有描点的元素
		var $body = $('html body');
		var currentIndex = 0; // 当前的位置
		var sectionHeights = []; // 每个段落的高度
		var canScroll = true; // 能否滚动

		if (typeof selector == 'string') {
			$container = $(selector);
		} else if (typeof selector == 'object') {
			$container = selector;
		}

		// 选项
		options = $.extend({
			allFullPage: false, // 所有页面满屏
			firstFullPage: true, // 首页满屏
			fullPageIndex: [], // 设置满屏的下标
			speed: 500, // 滚动的时间
			enableMouseWheelScrolling: true, // 允许鼠标滚轮滚动

			loop: true,
			autoScroll: false,
			autoScrollTime: 3000,

			// 描点字符串
			anchorClassName: 'section', // 没一个段落对应的class
			anchors: [], // 描点字符串

			// 相应事件
			afterSlideLoad: null,
		}, options);

		init();

		/**
		 *	初始化 
		 *  1. 先初始化样式
		 *  2. 初始化布局
		 *  3. 初始化事件
		 */
		function init() {
			initStyle();
			initLayout();
			initEvent();
		}

		/**
		 *	窗口大小改变时候重新布局 
		 */
		$(window).resize(function() {
			init();
		});

		/**
		 *	初始化样式 
		 */
		function initStyle() {
			$('html, body').css({
				height: '100%',
				overflow: 'hidden',
				margin: 0
			});
			$container.addClass('as-container');
		}

		/**
		 *	初始化事件 
		 */
		function initEvent() {

			sectionHeights = [];
			// 对每个a标签定义一个点击事件
			for (var i = 0; i < options.anchors.length; i++) {
				// 设置每一页的顶部，这要对当前页面大于窗口时候插入高度，防止超过屏幕高度溢出看不到
				var $pageEle = $('.' + options.anchors[i]);

				sectionHeights.push($pageEle.position().top);

				if ($pageEle.height() > $(window).height()) {
					sectionHeights.push($pageEle.position().top + $pageEle.height() - $(window).height());
				}

				$('.' + options.anchors[i]).addClass('as-section');

				$('ul li[data-target="' + options.anchors[i] + '"]').click(function(e) {
					e.preventDefault();
					var anchor = $(this).attr('data-target');
					var top = $('.' + anchor).position().top;
					scrollToDest(top);
				});
			}

			if (options.enableMouseWheelScrolling) {
				addmouseWheelHandler();
			} else {
				removemouseWheelHandler();
			}

			if (options.autoScroll) {
				setAutoScroll();
			}
		}

		/**
		 *	初始化布局 
		 */
		function initLayout() {
			if (options.firstFullPage) {
				setFullPage($container.find('.' + options.anchorClassName).eq(0));
			}
			if (options.allFullPage) {
				for (var i = 0; i < options.anchors.length; i++) {
					setFullPage($container.find('.' + options.anchorClassName).eq(i));
				}
			}
			for (var i = 0; i < options.fullPageIndex.length; i++) {
				setFullPage($container.find('.' + options.anchorClassName).eq(options.fullPageIndex[i]))
			}
		}

		/**
		 *	设置自动滚动 
		 */
		function setAutoScroll() {
			var timer = setInterval(function() {
				AS.scrollNext();
			}, options.autoScrollTime);
		}


		/**
		 *	滚动回调函数 
		 * @param {Object} index
		 */
		function afterSlideLoaded(index) {
			$.isFunction(options.afterSlideLoad) && options.afterSlideLoad(index);
		}

		/**
		 *	滚动到指定位置 
		 * @param {Object} top
		 */
		function scrollToDest(top) {
			canScroll = false;
            $container.css({
                transform: 'translate3D(0, ' + -top +'px, 0)',
                '-webkit-transform': 'translate3D(0, ' + -top +'px, 0)',
                '-moz-transform': 'translate3D(0, ' + -top +'px, 0)',
                '-o-transform': 'translate3D(0, ' + -top +'px, 0)',
            });
            setTimeout(function() {
                currentIndex = findIndex(sectionHeights, Math.abs(parseInt(top)));
                afterSlideLoaded(currentIndex);
                canScroll = true;
            }, 500);
		}

		/*
		 * 	设置满屏
		 */
		function setFullPage(ele) {
			var windowHeight = $(window).height();
			ele.css({
				width: '100%',
				height: windowHeight
			});
		}

        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(callback){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();


        /**
		 *	添加鼠标滚动事件 
		 */
		function addmouseWheelHandler() {

			var prefix = '';
			var _addEventListener;

			if (window.addEventListener) {
				_addEventListener = "addEventListener";
			} else {
				_addEventListener = "attachEvent";
				prefix = 'on';
			}

			// 监听可用的滚动事件
			var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
				document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
				'DOMMouseScroll';

			if (support == 'DOMMouseScroll') {
				document[_addEventListener](prefix + 'MozMousePixelScroll', mouseWheelHandler, false);
			} else {
				document[_addEventListener](prefix + support, mouseWheelHandler, false);
			}

		}

		/**
		 *	移除鼠标滚轮事件 
		 */
		function removemouseWheelHandler() {
			if (document.addEventListener) {
				document.removeEventListener('mousewheel', mouseWheelHandler, false); //IE9, Chrome, Safari, Oper
				document.removeEventListener('wheel', mouseWheelHandler, false); //Firefox
				document.removeEventListener('MozMousePixelScroll', mouseWheelHandler, false); //old Firefox
			} else {
				document.detachEvent('onmousewheel', mouseWheelHandler); //IE 6/7/8
			}
		}

		/**
		 *	 查找数组的下标 
		 * @param {Object} arr
		 * @param {Object} val
		 */
		function findIndex(arr, val) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == val) {
					return i;
				}
			}
			return -1;
		}


		/**
		 *	鼠标滚动处理 
		 * @param {Object} e
		 */
		function mouseWheelHandler(event) {
			event = event || window.event;
			var delta;
			if (event.wheelDelta) {
				// IE 或者 opera
				delta = event.wheelDelta;
			} else if (event.deltaY) {
				// w3c
				delta = -event.deltaY;
			}
			if (delta > 0) {
				// 向上滚动
				AS.scrollPrev();
			} else {
				// 向下滚动
				AS.scrollNext();
			}
		}

		//IE < 10 pollify for requestAnimationFrame
		window.requestAnimFrame = function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback) {
					callback()
				}
		}();

		/**************************************
		 * 	以下为外部方法调用 
		 *  eg: $.fn.anchorSlider.scrollTo(from, to);
		 **************************************/

		/**
		 *	滚动到指定的位置
		 *  @param {Object} dest
		 *  参数为数字时候滚动到top为dest的值
		 *  参数为字符串时候滚动到指定元素的位置
		 */
		AS.scrollTo = function(dest) {
			if (typeof dest == 'number') {
				scrollToDest(top);
			} else if (typeof dest == 'string') {
				var top = $(dest).position().top;
				scrollToDest(top);
			}
		}

		/**	
		 *	滚动到上一个页面 
		 */
		AS.scrollPrev = function() {
			if (canScroll && currentIndex > 0) {
				currentIndex -= 1;
				scrollToDest(sectionHeights[currentIndex % sectionHeights.length]);
			}
		}

		AS.scrollNext = function() {
			if (canScroll) {
				if (options.loop) {
					currentIndex += 1;
					scrollToDest(sectionHeights[currentIndex % sectionHeights.length]);
				} else if (currentIndex < sectionHeights.length - 1) {
					currentIndex += 1;
					scrollToDest(sectionHeights[currentIndex]);
				}
			}
		}

	}

})(jQuery);