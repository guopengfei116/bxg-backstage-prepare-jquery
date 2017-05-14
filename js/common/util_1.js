define(['jquery_cookie', 'jquery'], function(ud, $) {
	
	
	return {
		
		/**
		 * 检测登陆状态(登陆页除外)：
		 * 1、使用cookie插件判断是否存在PHPSESSID这个cookie
		 * 2、如果不存在证明还没有登陆过，那么跳转到登陆页让用户登陆
		 * */
		checkLoginStatus: function() {
			if(!$.cookie('PHPSESSID')) {
				location.href = '/html/home/login.html';
			}
			return this;
		},
		
		fn2: function() {
			console.log('util fn2');
			return this;
		},
		
		fn3: function() {
			console.log('util fn3');
			return this;
		},
		
		add: function(a, b) {
			return a + b;
		}
	}
});
