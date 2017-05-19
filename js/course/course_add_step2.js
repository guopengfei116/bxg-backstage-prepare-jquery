define(['header', 'aside', 'util', 'nprogress', 'jquery_uploadify', 'jquery_Jcrop', 'jquery', 'template'], function(ud, ud, util, nprogress, ud, ud, $, template) {

	// util返回每一个方法的返回值，想用那个用那个，不用拉到
	var returns = util({
		'checkLoginStatus': [],
		'loading': [],
		'getSearch': ['cs_id']
	});
	
	// 该变量用来存储图片裁剪插件实例，供全局使用
	var J = null;
	
	/**
	 * 课程图片数据回显
	 * */
	var cs_id = returns.getSearch;
	$.get('/v6/course/picture', { cs_id: cs_id }, function(data){
		$('.steps').html(template('steps2-tpl', data.result));
		initUploadify();
	});
	
	/**
	 * 初始化图片上传插件
	 * */
	function initUploadify() {
		$('#uploadify').uploadify({
			swf: '/lib/jquery-uploadify/uploadify.swf',  // flash选取文件的脚本
			uploader: '/v6/jquery-uploader/cover', // 接口
			fileObjName: 'cs_cover_original', // 相当于表单的name属性
			formData: {                      // 除了文件额外提交的数据
				cs_id: cs_id
			},
			buttonText: '上传图片',
			buttonClass: 'btn btn-success btn-sm btn-uploadify',
			height: 30,
			width: 80,
			itemTemplate: '<i></i>',  
			onUploadSuccess: function(file, data) {
				try {
					var data = JSON.parse(data);
					$('.preview img').attr('src', data.result.path);
					$('.thumb img').attr('src', data.result.path);
					// 
				}catch(e){}
			}
		});
	}
	
	/**
	 * 初始化图片裁剪插件
	 * */
	$(document).on('click', '#Jcrop', function() {
		$('.preview img').Jcrop({
			aspectRatio: 2,                    // 设置选取图片的宽高比
			setSelect: [ 0, 0, 300, 150 ],     // 设置默认的选区
			bgColor: 'skyblue',
			minSize: [300, 150],               // 限制选取图片的最小宽高
			boxWidth: $('.preview').width()    // 限制裁剪区域的最大宽高
//			edge: {
//				n: 10,
//				s: -20,
//				e: -10,
//				w: 10
//			}
		}, function() {
			// 插件初始化完毕后，会执行这个回调，这个回调中的this为插件实例，
			// 该插件还提供了一个方法用来获取实例$('.preview img').Jcrop('api')
			// 不过这个方法步一定能够得到实例(因为你调用的时候插件可能还没初始化好)
			J = this;
			
			// 创建裁剪预览框
			J.initComponent('Thumbnailer', { width: $('.thumb').width(), height: $('.thumb').height() });
			// 把预览框添加到指定元素中
			$('.thumb').empty().append($('.jcrop-thumb'));
		});
	});
	
	// 保存按钮
	$(document).on('click', '#save', function() {
		var result = J.getSelection();
		$.post('/v6/course/update/picture', {
			cs_id: cs_id,
			x: result.x,
			y: result.y,
			w: result.w,
			h: result.h
		}, function() {
			location.href = '/html/course/course_add_step3.html?cs_id=' + cs_id;
		});
	});
	
	// 销毁网站加载进度条
	nprogress.done();
});
