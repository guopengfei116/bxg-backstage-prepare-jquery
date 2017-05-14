define(['bootstrap', 'jquery', 'aside', 'header', 'util'], 
function(ud, $, ud, ud, util) {

	// 检测登陆状态
	util.checkLoginStatus();
	
	// loading
	util.loading();
});
