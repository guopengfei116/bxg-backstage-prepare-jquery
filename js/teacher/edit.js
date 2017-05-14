define(['header', 'aside', 'util', 'nprogress', 'jquery_form', 'jquery', 'template'], function(ud, ud, util, nprogress, ud, $, template) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': [],
		'getSearch': ['tc_id']
	});
	
	/**
	 * 先请求讲师当前信息进行数据回显，
	 * 然后使用表单提交插件把表单转ajax方法修改讲师信息。
	 * */
	var tcId = returns.getSearch;
	$.get('/v6/teacher/edit', { tc_id: tcId }, function(data) {
		$('.teacher-add').append(template('tc-edit-tpl', data.result));
		
		// 修改讲师信息，修改成功后跳转到列表页
		$('.teacher-add form').ajaxForm({
			// 这里的data不会复写表单的数据，是在表单数据基础上进行新增
			data: { tc_id: tcId },  
			// 成功回调
			success: function() {
				location.href = '/html/teacher/list.html';
			}
		});
	});
	
	// 销毁网站加载进度条
	nprogress.done();
});
