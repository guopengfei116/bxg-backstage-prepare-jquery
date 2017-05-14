define(['jquery', 'jquery_cookie'], function($, ud) {

	/**
	 * 取出cookie存储的用户信息，
	 * 咱们存数的用户信息是一个JSON字符串，需要手动解析为js对象，
	 * 然后把数据渲染到导航左侧上部。
	 * */
	var userInfo = {};
	try {
		userInfo = JSON.parse($.cookie('userInfo'));
	}catch(e){
		console.log('userInfo解析错误');
	}
	// 在保证存在头像的请求下再设置
	userInfo.tc_avatar && $('.aside .avatar img').attr('src', userInfo.tc_avatar);
	$('.aside h4').text(userInfo.tc_name);
	
	
	// 左侧导航下来列表
	$('.slide-down').on('click', function() {
		$(this).next().slideToggle();
	});
	
	/**
	 * 左侧导航焦点定位：
	 * 1、先获取页面的pathname
	 * 2、定义一个对象，这个对象存储pathname与左侧导航对应的href属性值
	 * 3、然后我们使用页面的pathname去对象中匹配，
	 * 匹配到了就使用这个匹配到的值获取对应的a添加active_Class设置焦点，
	 * 如果没有匹配到，就直接使用该pathname获取对应a添加active_Class设置焦点。
	 * */
	var pathname = location.pathname;
	// 这个配置只配置那些无规律的
	var pathToHref = {
		'/html/user/profile.html': '/html/user/list.html',
		'/html/teacher/edit.html': '/html/teacher/list.html'
	};
	var href = pathToHref[pathname]? pathToHref[pathname]: pathname;
	$('.aside a').removeClass('active')
		.filter('[href="' + href + '"]').addClass('active');
});
