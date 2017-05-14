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
	
	/**
	 * 导航下拉列表：
	 * 1、获取拥有下拉列表的a标签绑定点击事件
	 * 2、事件触发时获取对应的ul标签让它显示变隐藏，隐藏变显示
	 * */
	$('.slide-down').on('click', function() {
		$(this).next().slideToggle();
	});
	
	/**
	 * 导航焦点定位：
	 * 1、对于页面路径与href不对应的项使用一个对象统一配置
	 * 2、获取网站当前的路径
	 * 3、以网站路径为key，去配置对象中找对应的href，找到即使用，未找到就把pathname当做href使用。
	 * 4、获取页面中所有导航的a标签，删除active类名
	 * 5、然后以对应的路径为href属性选择器，获取页面中对应的a标签，然后给他添加active类名即可
	 * */
	
	// 对象左边的key对应网站的pathname，右边的值对应导航中a标签的href属性值
	var pathnameToHref = {
		'/': '/index.html',
		'/html/home/settings.html': '/index.html',
		'/html/home/repass.html': '/index.html',
		'/html/user/profile.html': '/html/user/list.html',
		'/html/teacher/add.html': '/html/teacher/list.html',
		'/html/teacher/edit.html': '/html/teacher/list.html'
	};
	var pathname = location.pathname;
	var href = pathnameToHref[pathname]? pathnameToHref[pathname]: pathname;
	$('.aside a').removeClass('active')
		.filter('[href="' + href + '"]').addClass('active');
});
