define(['header', 'aside', 'util', 'nprogress', 'template'], function(ud, ud, util, nprogress, template) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
	
	/**
	 * 讲师列表渲染：
	 * 1、请求讲师列表数据
	 * 2、请求成功后使用template编译页面中编写好的模版
	 * 3、把模版放入指定页面中的位置
	 * */
	template.helper('age', function(tplValue){
		
		// 如果没有值，则返回空字符串
		if(!tplValue){
			return '';
		}
		var birthdayY = tplValue.slice(0, 4);  // 截取出生年份
		var currentY = new Date().getFullYear(); // 当前年份
		return currentY - birthdayY;
	});
	$.get('/v6/teacher', function(data) {
		// data.result的值为数组时，我们直接把data传入模版
		$('#tc-list-table').append(template('tc-list-tpl', data));
	});
	
	// 销毁网站加载进度条
	nprogress.done();
});
