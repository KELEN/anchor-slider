!function(e){"use strict";e.fn.anchorSlider=function(n,o){function t(){l(),a(),i()}function l(){e("html, body").css({height:"100%",overflow:"hidden",margin:0}),w.addClass("as-container")}function i(){S=[];for(var n=0;n<o.anchors.length;n++)S.push(e("."+o.anchors[n]).position().top),e("."+o.anchors[n]).addClass("as-section"),e('ul li[data-target="'+o.anchors[n]+'"]').click(function(n){n.preventDefault();var o=e(this).attr("data-target"),t=e("."+o).position().top;s(t)});o.enableMouseWheelScrolling?d():f(),o.autoScroll&&r()}function a(){if(o.firstFullPage&&u(w.find("."+o.anchorClassName).eq(0)),o.allFullPage)for(var e=0;e<o.anchors.length;e++)u(w.find("."+o.anchorClassName).eq(e));for(var e=0;e<o.fullPageIndex.length;e++)u(w.find("."+o.anchorClassName).eq(o.fullPageIndex[e]))}function r(){setInterval(function(){v.scrollNext()},o.autoScrollTime)}function c(n){e.isFunction(o.afterSlideLoad)&&o.afterSlideLoad(n)}function s(e){F=!1,w.stop().animate({top:-e},o.speed,function(){p=m(S,Math.abs(e)),c(p),F=!0})}function u(e){e.css({width:"100%",height:g})}function d(){var e,n="";window.addEventListener?e="addEventListener":(e="attachEvent",n="on");var o="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll";"DOMMouseScroll"==o?document[e](n+"MozMousePixelScroll",h,!1):document[e](n+o,h,!1)}function f(){document.addEventListener?(document.removeEventListener("mousewheel",h,!1),document.removeEventListener("wheel",h,!1),document.removeEventListener("MozMousePixelScroll",h,!1)):document.detachEvent("onmousewheel",h)}function h(e){var e=e||window.event,n=0;e.wheelDelta?n=e.wheelDelta:e.detail&&(n=-e.detail)}function m(e,n){for(var o=0;o<e.length;o++)if(e[o]==n)return o;return-1}function h(e){e=e||window.event;var n;e.wheelDelta?n=e.wheelDelta:e.detail&&(n=-e.detail),n>0?v.scrollPrev():v.scrollNext()}var w,v=e.fn.anchorSlider,g=(e("html body"),e(window).height()),p=0,S=[],F=!0;"string"==typeof n?w=e(n):"object"==typeof n&&(w=n),o=e.extend({allFullPage:!1,firstFullPage:!0,fullPageIndex:[],speed:500,enableMouseWheelScrolling:!0,loop:!0,autoScroll:!1,autoScrollTime:3e3,anchorClassName:"section",anchors:[],afterSlideLoad:null},o),t(),e(window).resize(function(){t()}),window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){e()}}(),v.scrollTo=function(n){if("number"==typeof n)s(o);else if("string"==typeof n){var o=e(n).position().top;s(o)}},v.scrollPrev=function(){F&&p>0&&(p-=1,s(S[p%S.length]))},v.scrollNext=function(){F&&(o.loop?(p+=1,s(S[p%S.length])):p<S.length-1&&(p+=1,s(S[p])))}}}(jQuery);