define(['header', 'aside', 'util', 'nprogress', 'jquery', 'template'], function(ud, ud, util, nprogress, $, template) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': [],
		'getSearch': ['cs_id']
	});
	
	/**
	 * 课程基本信息数据回显
	 * */
	var cs_id = returns.getSearch;
	$.get('/v6/course/basic', { cs_id: cs_id }, function(data){
		$('.steps').html(template('steps1-tpl', data.result));
	});
	
	// 销毁网站加载进度条
	nprogress.done();
});
