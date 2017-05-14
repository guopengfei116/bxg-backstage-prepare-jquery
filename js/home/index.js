/**
 * 页面最初先加载页面html结构，
 * 再加载页面link引入的样式，这时候页面所有的结构与样式都有了，后续只要有了bootstrap就ok了。
 * 页面先加载requirejs，
 * 然后再加载main.js，
 * 如果是首页那么根据页面pathname加载了index.js，
 * 然后index.js存在很多依赖，这些依赖项同时异步加载，他们的执行顺序是不确定的，
 * 那么现在有一个aside模块，它依赖与jquery与jquery_cookie，所以需要在aside模块编写时进行配置
 * */
define(['bootstrap', 'jquery', 'aside', 'header', 'util'], 
function(ud, $, ud, ud, util) {
	
	// 检测登陆状态
	util.checkLoginStatus();
	
});
