;(function($){	
	//壹帮帮导航栏nav模块

	var $navLi = $('.nav li');    //导航栏li对象
	var $navChildren = $('.navChildren');   //navChildren对象
	var $navBar = $navChildren.find('.navChildren-title');  //navChildren-title 对象
	var $navBarChild = $navChildren.find('.navChildren-list ul li');   //navChildren-list ul li对象
	var $navBg = $navChildren.find('.navChildren-bg');  //navChildren-bg对象
	var $footer = $('.bang .footer');   //footer对象

	var navIndex =0;

	//定义objBnag对象，用于获取导航栏每一模块的class值
	var objBang = {
				"0":"bangHome",
				"1":"bangIntro",
				"2":"bangService",
				"3":"bangApp",
				"4":"bangHelp",
				"5":"bangShop"
			}

	var objNav = {
				"0":"home",
				"1":"introduce",
				"2":"service",
				"3":"app",
				"4":"help",
				"5":"shop"
			}
	//导航栏鼠标悬停效果实现
	$navLi.hover(function(event){
		//鼠标放上去效果实现
		$navChildren.show();
		navIndex = $(this).index();
		$(this)
			.find('a >img')
			.attr({
				src:"img/nav_dark_gray_"+ objNav[navIndex] +".png"
			});
		$navChildren
					.find('.navChildren-groups >li')
					.eq(navIndex).show()
					.siblings('li').hide();
	},function(event){
		//鼠标移除效果实现
		$(this)
			.find('a >img')
			.attr({
				src:"img/nav_light_gray_"+ objNav[navIndex] +".png"
			});
		$navChildren.hover(function(event){
			$(this).show();
		},function(event){
			$(this).hide();
		}).hide();
	});

	//导航栏菜单悬浮效果实现
	var color1 = new Array("blue","white");
	var color2 = new Array("#1EB9EE","#fff");

	$navBar.hover(function(event){
		navHover(this,navIndex,color1[0],color2[0]);
	},function(event){
		navHover(this,navIndex,color1[1],color2[1]);
	});

	function navHover(e,index,color1,color2){
		$(e)
			.find('img')
			.attr({
				src:"img/nav_light_"+ color1 +"_"+ objNav[index] +".png"
			})
			.siblings('span')
			.css({
				color:color2
			});
	}

	//导航栏菜单点击效果实现
	$navBar.on('click',function(event){
		$('body').scrollTop(0);
		$('.'+objBang[navIndex])
								.show()
								.siblings().hide();
		$navChildren.hide();

		//序列号为0、1、3、5的菜单显示页面footer模块
		if(navIndex == 0 || navIndex == 1 || navIndex == 3 || navIndex == 5){
			$footer.show();
		}

		//壹帮帮产品服务bangService和帮助中心bangHelp
		if(objBang[navIndex] == "bangService" || objBang[navIndex] == "bangHelp"){
			var Flag = $('.'+ objBang[navIndex]).find('.mainChild').hasClass('change');
			//判断class="mainChild"的div是否含class="change",如果true,执行下面步骤
			if(Flag == true){
				$('.'+ objBang[navIndex])
					.find('.mainChild')
					.removeClass('change newChange')
					.siblings('.expand').hide()
					.parent().siblings().show();
			}
		}

		if(objBang[navIndex] == "bangHelp"){
			$('.'+ objBang[navIndex])
				.find('.mainChild')
				.find('.turnOver').hide();
		}

		if(objBang[navIndex] == "bangShop"){
			window.location="http://www.1bpcafe.com/";
		}
		
	});

	//导航栏子菜单点击效果实现
	$navBarChild.on('click',function(event){
		$('body').scrollTop(0);
		var navIndex_ = $(this).index();  //获取么一个子菜单的序列号
		//根据序列号显示所对应的内容
		$('.'+ objBang[navIndex])
		.show()
		.find('>div').eq(navIndex_)
		.find('.mainChild').addClass('change')
		.siblings('.expand').show()
		.parent().show()
		.siblings().hide()
		.parent().siblings().hide();
		
		if(objBang[navIndex] == "bangHelp"){
			$('.'+ objBang[navIndex])
				.find('.mainChild').addClass('newChange')
				.find('.turnOver').show();
		}

		$footer.show();  //页面footer显示
		$navChildren.hide();  //导航栏隐藏
	});

	$navBg.on('click',function(event){
		$(this)
			.parent().hide();
	})


	//首页bangHome模块
	
	var $bangHome = $('.bangHome');   //bangHome对象 
	var $homeBtn = $bangHome.find('.appPlatform .paltform-btn');   //paltform-btn对象
	var $appMoreList = $bangHome.find('.app .appMore-groups .appMoreList');    //appMoreList对象
	var $appMoreListBtn = $bangHome.find('.exampleList .video-play');   //video-play对象
	var $appMoreListexample = $bangHome.find('.exampleList .example-pics');   //example-pics对象
	var $appVideo = $bangHome.find('.exampleList .videoContent');   //videoContent对象
	var v_index = 0;

	//paltform-btn按钮实现
	$homeBtn.on('click',function(event){
		$('body').scrollTop(0);
		$bangApp.show();    //bangApp页面显示
		$(this).parents('.bangHome').hide();   //bangHome页面隐藏
	});

	//appMore-groups点击实现
	$appMoreList.on('click',function(event){
		$('body').scrollTop(0);
		var a_index = $(this).index();   //获取appMoreList对象的序列号
		$bangApp.show();    //bangApp页面显示
		$(this)
			.parents('.bangHome').hide();   //bangHome页面隐藏
		$bangAppLi
			.eq(a_index).addClass('active')
			.siblings().removeClass('active');  //导航栏样式设置
		$bangAppBody
			.eq(a_index).addClass('active')
			.siblings().removeClass('active');   //导航栏内容样式设置
		//调用appMoreList函数
		appMoreList(a_index);
	});

	//视频点击实现
	$appMoreListBtn.on('click',function(event){
		$(this)
			.hide()
			.siblings('.example-pics').hide()
			.siblings('.videoContent').show();
		var video = $(this).siblings('.videoContent');
		video[0].play();
	})

	$appMoreListexample.on('click',function(event){
		$(this)
			.hide()
			.siblings('.video-play').hide()
			.siblings('.videoContent').show();
		var video = $(this).siblings('.videoContent');
		video[0].play();
	})

	$appVideo.on('click',function(event){
		v_index++;
		if(v_index == 1){
			$(this)[0].pause();
		}else if(v_index == 2){
			$(this)[0].play();
			v_index = 0;
		}
	})

	//壹帮帮首页介绍图片轮播效果实现
	var $flow = $('.flow-groups .flow');
	var $flowList = $flow.find('.flowList');

	$flowList.on('click',function(event){
		var f_index = $(this).index();
		if(f_index == 0){
			var scroll_h = $bangService.find('.introMore').height();
			$bangIntro.show();
			$(this)
				.parents('.bangHome').hide();
		}else if(f_index == 1){
			$bangService.show();
			$(this)
				.parents('.bangHome').hide();
			$footer.hide();
		}
	})


	//复制第一个li
	//var $copy = $flow.find('li:first').clone();
	//将复制的内容张贴到最后一个li后面
	//$flow.append($copy).find('li:last').addClass('last');
	//获取li的个数
	var index = $flow.find('li').length;

	//轮播标示
	var $flowRound = $('.flowRound');   //flowRound对象
	var $roundLi = $flowRound.find('li');   // flowRound li对象
	
	//flowRound li鼠标悬浮页面左右滑动效果实现
	$roundLi.hover(function(event){
		event.preventDefault();
		var r_index = $(this).index();   //获取flowRound li的序列号
		//获取li的宽度
		var $flowList = $flow.find('li').width();
		$(this)
			.addClass('active')
			.siblings()
			.removeClass('active');
		//flow的动态样式
		$flow.stop().animate({
			left:-r_index * $flowList
		},500);
		
	});


	//APP帮轮播效果模块
	var $appMore_groups = $('.appMore-groups');   //appMore-groups对象
	var $appMore_bm = $('.appMore-bm');   //appMore-bm对象
	var $btn = $appMore_bm.find('>img');   //appMore-bm img对象
	var ind = 0;   //点击次数

	//APP帮左右切换按钮效果实现
	$btn.on('click',function(event){
		var $w_app = $('.app').width();   //获取app的宽度
		var $w_appMore = $('.appMore').width();  //获取appMore的宽度
		ind ++; 
		if(ind % 2 != 0){
			$appMore_groups.stop().animate({
				left: -($w_appMore - $w_app)
			},500);
			$(this)
				.attr({
					src:"img/index_app_btn_left.png"
				});
			$(this)
				.siblings('ul')
				.find('li').last().addClass('active')
				.siblings().removeClass('active');
		}else{
			$appMore_groups.stop().animate({
				left: '0'
			},500);
			$(this)
				.attr({
					src:"img/index_app_btn_right.png"
				});
			$(this)
				.siblings('ul')
				.find('li').first().addClass('active')
				.siblings().removeClass('active');
		}
	});

	//产品介绍页bangIntro模块
	//产品简介模块
	var $bangIntro = $('.bangIntro');   //bangIntro对象
	var $introMoreBtn = $bangIntro.find('.more-groups .moreCon .moreCon-link');  //more-groups对象
	var $nav_intro = $('.introDetails-title li');   //introDetails-title li对象
	var $nav_line = $('.line-groups');   //line-groups对象
	var $content_intro = $('.introDetails-content');   //introDetails-content对象

	//壹帮帮产品介绍bangIntro中了解更多按钮点击效果实现
	$introMoreBtn.on('click',function(event){
		var intro_index = $(this).parents('.more-groups').index();   //获取more-groups序列号
		$(this)
			.parents('.more-groups')
			.parent()
			.siblings().find('.introDetails-title >li')
			.eq(intro_index)
			.addClass('active')
			.siblings()
			.removeClass('active');
		if(intro_index == 0){
			$(this)
				.parents('.introMore')
				.siblings('.introDetails')
				.find('.introDetails-bg')
				.attr({
					src:"img/introduce_bg_image3-02.png"
				});
		}else if(intro_index == 1){
			$(this)
				.parents('.introMore')
				.siblings('.introDetails')
				.find('.introDetails-bg')
				.attr({
					src:"img/jieshao_bg_image4-02-01.png"
				});
		}
		//调用introActive函数
		introActive(intro_index);
	});


	$nav_intro.on('click',function(event){
		var index = $(this).index();   //introDetails  introDetails-title li的序列号
		$(this)
			.addClass('active')
			.siblings()
			.removeClass('active');

		if(index == 0){
			$(this)
				.parents('.introDetailsCon')
				.siblings('.introDetails-bg')
				.attr({
					src:"img/introduce_bg_image3-02.png"
				});
		}else if(index == 1){
			$(this)
				.parents('.introDetailsCon')
				.siblings('.introDetails-bg')
				.attr({
					src:"img/jieshao_bg_image4-02-01.png"
				});
		}
		//调用introActive函数
		introActive(index);
	});

	//控制introDetails-content li的内容切换
	function introActive(index){
		if(index == 0){
			$nav_line.animate({
				left: '0'
			},500);

			$content_intro.animate({
				left: '0'
			},500);
		}else if(index == 1){
			$nav_line.animate({
				left: '50%'
			},500);

			$content_intro.animate({
				left: '-100%'
			},500);
		}
	}




	//产品服务页bangService and 帮助中心页bangHelp模块
	var $bangService = $('.bangService');
	var $business = $('.business');   //business对象
	var $businessBtn = $business.find('.introConMore');   //introConMore对象
	var $operation = $('.operation');   //operation对象
	var $operationBtn = $operation.find('.introConMore');   //introConMore对象
	var $advisory = $('.advisory');    //advisory对象
	var $advisoryBtn = $advisory.find('.introConMore');    //introConMore对象
	var $help = $('.help');    //help对象
	var $helpBtn = $help.find('.introConMore');    //introConMore对象
	var wHeight = $('body').height() / 2;

	//了解更多按钮的实现
	$businessBtn
		.parents('.businessMain')
		.css({
			height:wHeight
		});
	$operationBtn
		.parents('.operationMain')
		.css({
			height:wHeight
		});
	$advisoryBtn
		.parents('.advisoryMain')
		.css({
			height:wHeight
		});
	$helpBtn
		.parents('.helpMain')
		.css({
			height:wHeight
		});
	$businessBtn.on('click',function(event){
		event.preventDefault();
		$('body').scrollTop(0);
		moreBtn(this);
	});

	$operationBtn.on('click',function(event){
		event.preventDefault();
		$('body').scrollTop(0);
		moreBtn(this);
	});

	$advisoryBtn.on('click',function(event){
		event.preventDefault();
		$('body').scrollTop(0);
		moreBtn(this);
		$advisory.find('.advisoryMain').addClass('newChange').find('.turnOver').show();
	});

	$helpBtn.on('click',function(event){
		event.preventDefault();
		$('body').scrollTop(0);
		moreBtn(this);
		$help.find('.helpMain').addClass('newChange').find('.turnOver').show();
	});
	

	function moreBtn(e){
		$(e)
			.parents('.mainChild').addClass('change')
			.siblings().show()
			.parent()
			.siblings().hide();
		$footer.show();
	}


	//壹棒棒APP页bangApp模块
	var $bangApp = $('.bangApp');  //bangApp对象
	var $bangAppExpand = $bangApp.find('.bangAppExpand');  //bangAppExpand对象
	var $bangAppLi = $bangAppExpand.find('.bangAppContent-title ul li');  //bangAppContent-title ul li对象
	var $triangle = $bangAppExpand.find('.triangle');  //triangle对象
	var $bangAppBody = $bangAppExpand.find('.bangAppContent-bodyBg .bangAppBody-groups');  //bangAppContent-bodyBg .bangAppBody-groups对象
	var $playSample1 = $bangAppExpand.find('.videoPlay-top .video-play-sample');   //videoPlay-top video-play-sample对象
	var $playSample2 = $bangAppExpand.find('.videoPlay-bottom .video-play-sample');   //videoPlay-bottom video-play-sample对象
	var $playBtn1 = $bangAppExpand.find('.videoPlay-top .video-play-btn');   //videoPlay-top video-play-btn对象
	var $playBtn2 = $bangAppExpand.find('.videoPlay-bottom .video-play-btn');   //videoPlay-bottom video-play-btn对象
	var $detailsBtn = $bangAppBody.find('.list-type ul li');   //list-type ul li对象
	var $videoPlay1 = $bangAppExpand.find('.videoPlay-top .videoContent');  //videoPlay-top videoContent对象
	var $videoPlay2 = $bangAppExpand.find('.videoPlay-bottom .videoContent');  //videoPlay-bottom videoContent对象
	var p_index_1 = 0;
	var p_index_2 = 0;

	var $formBtn = $bangApp.find('#recriContent-left .recruLeft-btn');

	$formBtn.on('click',function(e){
		e.preventDefault();
		var Flag_1 = false;
		var companyName = $('#companyName');
		var phone = $('#phone');
		var jobName = $('#jobName');
		var persons = $('#persons');
		var description = $('#description');
		if(companyName.val() != "" && phone.val() != "" && jobName.val() != "" && persons.val() != "" && description.val() != ""){
			Flag_1 = true;
		}else{
			alert("信息填写不能为空！");
		}
		
		if(Flag_1){
			$.ajax({
				type:"post",
				url:"http://192.168.2.129:21000/api/jobs",
				data:$('#recriContent-left').serialize(),
				success:function(data){
					if(data.status == "0"){
						alert(data.message);
					}else if(data.status == "1"){
						alert(data.message);
					}
					console.log(data.message)
				},
				error:function(data){
					alert("信息提交失败，请重新确认信息无误！！");
				}
			});
		}
	})


	//壹帮帮APP导航栏效果

	$bangAppLi.on('click',function(event){
		event.preventDefault();
		var index = $(this).index();   //获取每一个li的序列号
		$(this)
			.addClass('active')
			.siblings().removeClass('active');  //导航栏样式设置
		$bangAppBody
			.eq(index).addClass('active')
			.siblings().removeClass('active');   //导航栏内容样式设置
		appMoreList(index);
		
	});

	function appMoreList(index){
		var liWidth = $bangAppLi.width();   //时时获取li导航栏的宽度
		//三角指示的设置
		var triangleLeft = (liWidth / 2 - 10) + index * (liWidth + 34);  //自定义三角标示的left值

		//三角标示的css样式
		$triangle.css({
			"left": triangleLeft
		});
	}

	//壹帮帮APP点击查看详情
	$detailsBtn.on('click',function(event){
		var de_index = $(this).index();
		$(this)
			.parents('.list-type')
			.siblings('.list-tips-groups').show()
			.find('.list-tips').eq(de_index).show()
			.siblings().hide()
			.parents('.detailsContent-list').addClass('noneBom')
			.siblings().removeClass('noneBom')
			.find('.list-tips-groups').hide()
			.find('.list-tips').hide();
	})

	//壹帮帮App视频教学点击实现
	$playBtn1.on('click',function(event){
		$(this)
			.parent().hide()
			.siblings('.video-play-sample').hide()
			.siblings('.videoContent').show()
			.parent()
			.css({
				"background":"black",
				"height":"auto"
			});
		var video = $(this).parent().siblings('.videoContent');
		video[0].play();
	})
	$playSample1.on('click',function(event){
		$(this)
			.hide()
			.siblings('.videoPlay-info').hide()
			.siblings('.videoContent').show()
			.parent()
			.css({
				"background":"black",
				"height":"auto"
			});
		var video = $(this).siblings('.videoContent');
		video[0].play();
	})

	$videoPlay1.on('click',function(event){
		p_index_1++;
		if(p_index_1 == 1){
			$(this)[0].pause();
		}else if(p_index_1 == 2){
			$(this)[0].play();
			p_index_1 = 0;
		}
	})

	$playBtn2.on('click',function(event){
		$(this)
			.parent().hide()
			.siblings('.video-play-sample').hide()
			.siblings('.videoContent').show()
			.parent()
			.css({
				"background":"black",
				"height":"auto"
			});
		var video = $(this).parent().siblings('.videoContent');
		video[0].play();
	})

	$playSample2.on('click',function(event){
		$(this)
			.hide()
			.siblings('.videoPlay-info').hide()
			.siblings('.videoContent').show()
			.parent()
			.css({
				"background":"black",
				"height":"auto"
			});
		var video = $(this).siblings('.videoContent');
		video[0].play();
	})

	$videoPlay2.on('click',function(event){
		p_index_2++;
		if(p_index_2 == 1){
			$(this)[0].pause();
		}else if(p_index_2 == 2){
			$(this)[0].play();
			p_index_2 = 0;
		}
	})

})(jQuery);

