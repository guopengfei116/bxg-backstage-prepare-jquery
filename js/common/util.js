define(['jquery', 'jquery_cookie'], function($, ud) {
	
	return {
		
		// 其他页面的登陆检测公共，如果发现未登陆，那么跳转到登陆页
		checkLoginStatus: function() {
			if(!$.cookie('PHPSESSID')) {
				location.href = '/html/home/login.html';
			}
		},
		
		// 启用页面的ajax请求loading效果
		loading: function() {
			$(document).on('ajaxStart', function() {
				$('.overlay').show();
			}).on('ajaxStop', function() {
				$('.overlay').hide();
			});
		}
	}
});
