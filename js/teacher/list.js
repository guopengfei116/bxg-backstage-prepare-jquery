define(['bootstrap', 'header', 'aside', 'util', 'nprogress', 'template'], function(ud, ud, ud, util, nprogress, template) {

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
	
	/*
	 * 讲师详细信息的模态框渲染：
	 * 1、给所有的查看按钮绑定点击事件，但是这些是动态动态生成的，
	 * 所以直接是获取不到的，我们需要是事件委托的方式绑定。
	 * （还有一个方式就是把代码写在渲染讲师列表代码之后，但是这样两段逻辑混在了一起，不好看，所以采取委托绑定事件）。
	 * 2、事件触发时，获取按钮上面的tc_id自定义属性
	 * 3、利用这个tc_id发送请求获取对应的讲师信息，渲染模版
	 * */
	$(document).on('click', '[href="#teacherModal"]', function() {
		var tc_id = $(this).attr('data-tc-id');
		$.get('/v6/teacher/view', { tc_id: tc_id }, function(data) {
			$('#teacherModal').html(template('teacher-modal-tpl', data.result));
		});
	});
	
	/**
	 * 注销与启用讲师：
	 * 1、给所有的注销启用按钮绑定点击事件，需要使用委托的方式
	 * 2、事件触发时，获取按钮上面的tc_id与tc_status两个自定义属性
	 * 3、利用这两个属性发送注销或启用请求
	 * 4、请求成功后，修改按钮上的tc_status自定义属性值，因为它变了；
	 * 还要修改按钮的提示文字，当时为注销提示启用，启用提示注销。
	 * */
	$(document).on('click', '.tc-status-btn', function() {
		var tc_id = $(this).attr('data-tc-id');
		var tc_status = $(this).attr('data-tc-status');
		var $that = $(this);
		
		$.post('/v6/teacher/handle', {
			tc_id: tc_id,
			tc_status: tc_status
		}, function(data) {
			// 因为服务端会返回修改后的状态，所以这里直接使用即可
			$that.attr('data-tc-status', data.result.tc_status)
				.text(data.result.tc_status == 0? '注 销': '启 用');
		});
	});
	
	// 销毁网站加载进度条
	nprogress.done();
});
