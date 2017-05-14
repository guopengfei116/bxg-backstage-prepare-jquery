define(['jquery_cookie', 'jquery'], function(ud, $) {
	
	var util = {
		
		/**
		 * 检测登陆状态(登陆页除外)：
		 * 1、使用cookie插件判断是否存在PHPSESSID这个cookie
		 * 2、如果不存在证明还没有登陆过，那么跳转到登陆页让用户登陆
		 * */
		checkLoginStatus: function() {
			if(!$.cookie('PHPSESSID')) {
				location.href = '/html/home/login.html';
			}
		},
		
		// 请求loading
		loading: function() {
			$(document)
			.on('ajaxStart', function() {
				$('.overlay').show();
			})
			.on('ajaxStop', function() {
				$('.overlay').hide();
			});
		}
	}
	
	// 传入所有要执行的方法名，格式范例：{'checkLoginStatus': [], 'fn2': [], ...}
	return function(methods) {
		
		// 该对象接收每个方法的返回值 
		var returns = {};
		
		// 遍历所有要执行的方法依次执行，然后接收每个方法的返回值最后一起返回
		for(var key in methods) {
			// 使用同样方法名把每个方法的执行结果存储起来，最后统一返回
			// 这面还使用了apply，把每个方法的数组参数拆开依次传递。
			returns[key] = util[key].apply(util, methods[key]);
		}
		// 所有方法的返回值一起返回
		return returns;
	}
});
