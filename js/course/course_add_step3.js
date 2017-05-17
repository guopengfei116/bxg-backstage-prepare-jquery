define(['header', 'aside', 'util', 'nprogress', 'bootstrap', 'jquery_form', 'jquery', 'template'], function(ud, ud, util, nprogress, ud, ud, $, template) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': [],
		'getSearch': ['cs_id']
	});

	/**
	 * 渲染课时列表
	 * */
	var cs_id = returns.getSearch;
	$.get('/v6/course/lesson', { cs_id: cs_id }, function(data){
		$('.steps').html(template('steps3-tpl', data.result));
	});
	
	/*
	 * 课时添加按钮与编辑按钮：
	 * 1、点击按钮的时候获取按钮上的自定义属性ct-id
	 * 2、如果有这个ct-id那么证明是编辑，请求接口获取数据，没有则不用请求接口了
	 * 3、如果是编辑，那么在回显的数据中添加一个action为'/v6/course/chapter/modify'
	 * 4、如果是添加，那么在回显的数据中添加一个action为'/v6/course/chapter/add'
	 * 5、使用模版引擎进行模态框的渲染
 	 * */
 	$(document).on('click', '.btn-ct-edit, .btn-ct-add', function() {
 		var ct_id = $(this).attr('data-ct-id');
 		// 如果有id就是编辑，需要请求接口进行数据回显
 		if(ct_id) {
 			$.get('/v6/course/chapter/edit', { ct_id: ct_id }, function(data) {
 				data.result.action = '/v6/course/chapter/modify';
 				$('#chapterModal').html(template('ct-tpl', data.result));
 			});
 		}
 		// 添加不需要请求接口回显数据
 		else {
 			$('#chapterModal').html(template('ct-tpl', { action: '/v6/course/chapter/add' }));
 		}
 	});
 	
 	/**
 	 * 添加课时与编辑课时共享的表单提交
 	 * */
 	// 因为提交按钮写到了form表单的外面，所以不能监听到表单的submit事件，
 	// 需要单独监听按钮的点击事件，点击后使用插件提交表单。
 	$(document).on('click', '#btn-submit', function() {

 		// 因为这里的this为按钮，所以表单得需要通过选择器获取了
 		$('#ct-form').ajaxSubmit({
 			data: {
 				
 				// 这个id在编辑进行数据回显时添加到了按钮上
 				// 编辑课时需要的值（后端用它来确定你编辑的是哪一个课时）
 				ct_id: $(this).attr('data-ct-id'),
 				
 				// 这个id就是页面search上的cs_id,我们添加的课时都是给这个课程添加的
 				// 添加课时需要的值（后端用它来确定创建的课时属于那个课程）
 				ct_cs_id: cs_id, 
 				
 				// 选中值为1，不中为0
 				ct_is_free: $('#checkbox-is-free').prop('checked')? 1: 0
 			},
 			success: function() {
 				location.reload();
 			}
 		});
 	});

	// 销毁网站加载进度条
	nprogress.done();
});
