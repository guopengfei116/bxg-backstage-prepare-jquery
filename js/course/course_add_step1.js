define(['header', 'aside', 'util', 'nprogress', 'jquery_form', 'jquery', 'template'], function(ud, ud, util, nprogress, ud, $, template) {

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
		steps1Submit();
	});
	
	/**
	 * 课程基本信息数据提交
	 * */
	function steps1Submit() {
		$('form.basic').ajaxForm(function(data) {
			location.href = '/html/course/course_add_step2.html?cs_id=' + cs_id;
		});
	}
	
	/**
	 * 课程分类二级联动：
	 * 通过委托的方式监听顶级分类值的变化，
	 * 当发生变化时获取被选中的顶级分类ID，
	 * 然后利用这个ID发送请求获取该顶级分类下的子级分类，
	 * 然后动态生成一堆options标签进行子级分类列表的替换。
	 * */
	$(document).on('change', '#top-cg-select', function() {
		$.get('/v6/category/child', { cg_id: $(this).val() }, function(data) {
			var options = '';
			for(var i = 0, len = data.result.length; i < len; i++) {
				options += '<option value="' + data.result[i].cg_id + '">' + data.result[i].cg_name + '</option>';
			}
			$('#child-cg-select').html(options);
		});
	});
	
	// 销毁网站加载进度条
	nprogress.done();
});
