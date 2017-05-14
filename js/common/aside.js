define(['jquery_cookie', 'jquery'], function(ud, $) {
	
	/**
	 * 导航上部用户信息展示:
	 * 1、使用插件获取本地cookie存储的用户信息，
	 * 2、但是这个用户信息数据是JSON字符串，所以需要先使用JSON.parse解析成对象再使用
	 * 3、如果用户信息中存在头像，那么进行img的src替换。否则不用管，因为在布局时就有默认头像。
	 * 4、当用户信息中存在用户名，则替换，否则使用布局时的默认值。
	 * */
	var userInfo = JSON.parse($.cookie('userInfo') || '{}');
	userInfo.tc_avatar && $('.aside .avatar img').attr('src', userInfo.tc_avatar);
	userInfo.tc_name && $('.aside h4').text(userInfo.tc_name);
});
