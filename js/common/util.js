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
		},
		
		/**
		 * 获取页面search值，
		 * 如果没有传参，把所有search转为对象返回，
		 * 如果传了则返回指定key的search值。
		 * */
		getSearch: function(searchKey) {
			/**
			 * 1、预定义一个对象，用来存储所有的search
			 * 2、使用location.search获取查询字符串，去掉开头的?号
			 * 3、然后进一步使用&分隔查询字符串，得到一个数组，数组中每一个search
			 * 4、遍历数组，再使用=号分隔字符串，以第一个值为key，第二个值为val存储到对象中
			 * 5、如果传参了，返回对象中指定key的search值，否则返回整个对象。
			 * */
			var searchObj = {}, temp;
			var searchArr = location.search.slice(1).split('&');
			for(var i = 0, len = searchArr.length; i < len; i++) {
				temp = searchArr[i].split('=');
				searchObj[temp[0]] = temp[1];
			}
			
			// 如果没有传参，返回整个对象；传参返回对象中的指定值
			return searchKey == null? searchObj: searchObj[searchKey];
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
