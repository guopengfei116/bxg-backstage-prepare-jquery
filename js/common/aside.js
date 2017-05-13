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
});
