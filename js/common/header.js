define(['jquery'], function($) {
	
	// 点击退出按钮，发送请求，成功后跳转到登陆页
	$('.logout').on('click', function() {
		$.ajax({
			url: '/v6/logout',
			type: 'post',
			success: function() {
				location.href = '/html/home/login.html';
			}
		});
	});
});
