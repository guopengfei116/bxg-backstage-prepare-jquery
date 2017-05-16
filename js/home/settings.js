define(['header', 'aside', 'util', 'nprogress', 'template', 'jquery_form', 'jquery_region', 'jquery_datepicker', 'jquery_datepicker_CN', 'jquery_uploadify', 'jquery'], function(ud, ud, util, nprogress, template, ud, ud, ud, ud, ud, $) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
	
	/**
	 * 个人中心详细信息回显：
	 * 1、请求接口
	 * 2、渲染模版
	 * */
	$.get('/v6/teacher/profile', function(data) {
		$('.teacher-profile').html(template('tc-settings-tpl', data.result));
		profileSubmit();
		initPCD();
		initDatepicker();
		initUploadify();
	});
	
	/**
	 * 个人中心表单提交转ajax:
	 * 注意：因为表单是动态渲染上去的，所以必须等待渲染完毕才能获取到它
	 * */
	function profileSubmit() {
		
		// 因为在表单提交前获取页面省级数据拼出hometown，所以不能使用这个方法了，不灵活
		/*$('.teacher-profile form').ajaxForm(function() {
			location.reload();
		});*/
		
		$('.teacher-profile form').on('submit', function(e) {
			
			// 阻止表单默认的提交行为
			e.preventDefault();
			
			$(this).ajaxSubmit({
				data: {
					tc_hometown: $('#p').find(':selected').text() + '|' + $('#c').find(':selected').text() + '|' + $('#d').find(':selected').text(),
					tc_province: $('#p').val(),
					tc_city: $('#c').val(),
					tc_district: $('#d').val()
				},
				success: function() {
					location.reload();
				}
			});
			
			// 为了兼容老版本IE
			return false;
		});
	}
	
	/**
	 * 初始化省市县三级联动
	 * */
	function initPCD() {
		$('#tc-region').region({
			url: '/lib/jquery-region/region.json'
		});
	}
	
	/**
	 * 初始化日期插件
	 * */
	function initDatepicker() {
		$('input[name="tc_birthday"]').datepicker({
			language: 'zh-CN',   // 中文配置，需要引入对应的语言包
			format: 'yyyy-mm-dd',
			startDate: new Date('1950-01-01'),
			endDate: new Date('1999-01-01')
		});
		$('input[name="tc_join_date"]').datepicker({
			language: 'zh-CN',   // 中文配置，需要引入对应的语言包
			format: 'yyyy-mm-dd',
			startDate: new Date('2009-01-01'),
			endDate: new Date()
		});
	}
	
	/**
	 * 初始化文件上传插件
	 * */
	function initUploadify() {
		$('#upfile').uploadify({
			swf: '/lib/uploadify/uploadify.swf',  // flash选取文件的脚本
			uploader: '/v6/uploader/avatar', // 接口
			fileObjName: 'tc_avatar', // 相当于表单的name属性
			buttonText: '',
			fileTypeExts: '*.png; *.jpg',
			height: $('.preview').height(),
			onUploadSuccess: function(file, data) {
				// 这里的data不像jquery那样给你自动解析好了，需要手动解析
				try{
					$('#avatar').attr('src', JSON.parse(data).result.path);
				}catch(e) {
					console.log(data);
				}
			}
		});
	}
	
	// 销毁网站加载进度条
	nprogress.done();
});
