define(['header', 'aside', 'util', 'nprogress', 'jquery_form', 'jquery'], function(ud, ud, util, nprogress, ud, $) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
	
	// 表单转ajax提交，成功后跳转到讲师列表页
	$('.teacher-add form').ajaxForm(function() {
		location.href = '/html/teacher/list.html';
	});
	
	// 销毁网站加载进度条
	nprogress.done();
});
