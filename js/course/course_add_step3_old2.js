define(['header', 'aside', 'util', 'nprogress', 'bootstrap', 'jquery_form', 'jquery', 'template'], function(ud, ud, util, nprogress, ud, ud, $, template) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': [],
		'getSearch': ['cs_id']
	});
	
	/**
	 * 课时管理列表数据回显
	 * */
	var cs_id = returns.getSearch;
	$.get('/v6/course/lesson', { cs_id: cs_id }, function(data){
		$('.steps').html(template('steps3-tpl', data.result));
	});

	
	/**
	 * 课时模态框有个特点，
	 * 1、添加课时与编辑课时共享：
	 * 共同使用一个模版
	 * 2、但是编辑课时需要数据回显：
	 * 在编辑按钮中添加ct-id自定义属性，点击时获取该id请求数据渲染模版，
	 * 如果是添加课时，则直接渲染一个空对象即可。
	 * 3、添加课时与编辑课时提交数据的接口不一样
	 * 可以在渲染模版时，传入的data数据中，添加一个action回显数据，
	 * 在form表单中的action属性使用即可。
	 * */

	/**
	 * 点击指定课时的编辑按钮，弹出模态框，进行数据回显
	 * */
	$(document).on('click', '.btn-ct-edit', function() {
		var ct_id = $(this).attr('data-ct-id');
		$.get('/v6/course/chapter/edit', { ct_id: ct_id }, function(data){
			data.result.action = '/v6/course/chapter/modify';
			$('#chapterModal').html(template('ct-tpl', data.result));
		});
	});
	
	/**
	 * 点击添加课时按钮，弹出模态框，进行数据回显
	 * */
	$(document).on('click', '.btn-ct-add', function() {
		$('#chapterModal').html(template('ct-tpl', { action: '/v6/course/chapter/add' }));
	});

	/**
	 * 编辑课时与添加课时
	 * */
	$(document).on('click', '#btn-submit', function(e) {
		var ct_id = $(this).attr('data-ct-id');
		$('#ct-form').ajaxSubmit({
			data: {
				ct_id: ct_id,  // 编辑课时的时候需要（后端需要知道你编辑的是那个课时）
				ct_cs_id: cs_id,  // 添加课时的时候需要（后端需要知道你创建的新课时是属于那个课程的）
				ct_is_free: $('#checkbox-is-free').prop('checked')? 1: 0
			},
			success: function() {
				//$('#chapterModal').modal('hide');
				// 不建议这样，最好获取页面中的元素替换值
				location.reload();
			}
		});
	});
	
	// 销毁网站加载进度条
	nprogress.done();
});
