define(['header', 'aside', 'util', 'nprogress', 'jquery_form', 'jquery'], function(ud, ud, util, nprogress, ud, $) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
	
	/**
	 * 创建课程
	 * */
	$('form').ajaxForm(function() {
		location.href = '/html/course/course_add_step1.html';
	});
	
	// 销毁网站加载进度条
	nprogress.done();
});
