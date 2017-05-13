/**
 * bootstrap是普通模块，也没有对外暴露任何全局变量，所以我们这里接收到的值为undefined，
 * 
 * jquery是ADM模块，我们这里可以接收到正常jQuery对外暴露的方法，
 * 
 * jquery_form是AMD模块，所以不需要配置shim项的依赖，
 * 但是该模块是jquery插件，所有的方法都放置到了jquery上，
 * 所以该插件没有对外暴露任何全局变量，收到的值为undefined。
 * 
 * jquery_cookie是AMD模块，所以不需要配置shim项的依赖吗，
 * 但是该模块是jquery插件，所有的方法都放置到了jquery上，
 * 所以该插件没有对外暴露任何全局变量，收到的值为undefined。
 * */
define(['bootstrap', 'jquery', 'jquery_form', 'jquery_cookie', 'nprogress', 'util']
/**
 * 这里的形参用来接收模块的输出，
 * 但是需要注意它们是按照顺序接收输出值的，
 * 同时这些形参的名字可以任意起。
 */
, function(ud, $, ud, ud, nprogress, util) {
	
	// 配置网站进度条
	nprogress.start();
	$(function() {
		nprogress.done();
	});
	
	// 配置ajax请求的loading
	util.loading();

	// 监听form表单的提交事件，转为ajax请求，请求成功，那么跳转首页
	$('#login-form').ajaxForm({

		/**
		 * 登陆成功后，服务器会返回该用户的信息，
		 * 我们把它存储到cookie，供其他页面使用。
		 * */
		success: function(data) {
			$.cookie('userInfo', JSON.stringify(data.result), {path: '/'});
			location.href = '/';
		},
		error: function() {
			alert('登陆失败！！！');
		}
	});
	
	// 登陆状态检测
	if($.cookie('PHPSESSID')) {
		location.href = '/';
	}
	
	
});
