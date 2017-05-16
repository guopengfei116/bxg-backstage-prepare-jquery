define(['header', 'aside', 'util', 'nprogress', 'jquery_form', 'jquery'], function(ud, ud, util, nprogress, ud, $) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
	
	/**
	 * 修改密码：
	 * 1、监听表单submit事件
	 * 2、事件发生时比较新密码和确认密码是否一致
	 * 3、一致则利用表单插件转ajax修改密码
	 * 4、密码修改成功触发退出按钮的点击事件，退出登陆
	 * */
	$('.repass form').on('submit', function(e) {
		e.preventDefault();
		
		// 密码相等，提交表单，成功点击退出按钮
		if($('#password').val() === $('#okPassword').val()) {
			$(this).ajaxSubmit(function() {
				$('.logout').trigger('click');
			});
		}else {
			alert('新密码和确定密码不一致！！');
		}
		
		return false;
	});
	
	// 销毁网站加载进度条
	nprogress.done();
});
