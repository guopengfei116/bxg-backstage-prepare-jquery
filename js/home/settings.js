define(['header', 'aside', 'util', 'nprogress', 'template', 'jquery_form', 'jquery_region', 'jquery_datepicker', 'jquery_datepicker_CN', 'jquery_uploadify', 'jquery', 'ckeditor'], function(ud, ud, util, nprogress, template, ud, ud, ud, ud, ud, $, ckeditor) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
	
	// 该变量用来存储富文本编辑器实例供全局使用
	var edit = null;
	
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
		initCkeditor();
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
			
			// 在提交数据之前，把富文本框的内容更新到textarea中以提交
			edit.updateElement();
			
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
			swf: '/lib/jquery-uploadify/uploadify.swf',  // flash选取文件的脚本
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
	
	/**
	 * 初始化富文本编辑器
	 * */
	function initCkeditor() {
		// 该富文本编辑器提供一个replace方法，把textarea替换。
		// 第二个参数为一个对象，可以进行配置。
		// 对象有一个toolbarGroups配置 ，用来指定编辑器的功能列表。
		edit = ckeditor.replace('ckeditor', {
			toolbarGroups: [
		        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		        { name: 'links' },
		        { name: 'insert' },
		        { name: 'forms' },
		        { name: 'tools' },
		        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] }
		    ]
		});
	}
	
	// 销毁网站加载进度条
	nprogress.done();
});
