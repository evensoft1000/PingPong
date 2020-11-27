/**************************************************
*
* @whoisBuilder
*
* - title: mod.gallery(myth2x@whois.co.kr)
* - required: Durian.common, jQuery, jQuery.UI, jQuery.template
* - last modify: 2012-03-17
* 
**************************************************/

try{
	if('undefined' != typeof __SUB_SITE_LANG_TYPE__){
		load_i18n("mod.gallery", __SUB_SITE_LANG_TYPE__);
	}else{
		load_i18n("mod.gallery", 'ko');
	}
	
}catch(e){}



if ( jQuery.type(mod) != 'object' ) {
	var mod = {};
}

mod.gallery = {
	
	// 메인 모듈
	widgetResize: function(obj, resizeW, resizeH) {
		jQuery(document).ready(function(){

			jQuery(obj).each(function() {

				mod.gallery.reSize(this, resizeW, resizeH);

				jQuery(this).show();
			
			});
		});
	},

	show : function(options) {

		var options = options;

		jQuery(window).ready(function(){
			mod.gallery.showCallBack(options);
		});
	}, 

	debug : function(msg) {
		jQuery('#debug').html(msg+'<br>'+jQuery('#debug').html() );
	},

	reSize : function(obj, resizeW, resizeH) {
		var width	= jQuery(obj).width();
		var height= jQuery(obj).height();				
		var ratio = Math.min(resizeW/width, resizeH/height);
		
		if( width > resizeW || height > resizeH) {
			jQuery(obj).width(width * ratio);
		}
	},

	setCenter : function(baseObj, targetObj, useScroll) {

		if( useScroll ) {
			scrollLeft	= jQuery(window).scrollLeft();
			scrollTop		= jQuery(window).scrollTop();
		} else {
			scrollLeft	= 0;
			scrollTop		= 0;
		}

		var posX = (jQuery(baseObj).width() - jQuery(targetObj).width()+scrollLeft) / 2;
		var posY = (jQuery(baseObj).height() - jQuery(targetObj).height()+scrollTop) /2;

		jQuery(targetObj).css({'top':posY+'px', 'left':posX+'px'});
	},

	getJsonData : function(pcode, ccode) {

			//alert('act=gallery.page_data_ajax&pcode='+pcode+'&ccode='+ccode);

			var ajaxObj = jQuery.ajax({
				type: 'POST', 
				data: 'act=gallery.page_data_ajax&pcode='+pcode+'&ccode='+ccode, 
				url: '/',
				dataType: 'JSON',
				async: true,	
				success: function() {
					//alert('success');
				},
				complete: function() {
					//alert('complete');
				},
				error: function() {
					alert('mod.gallery: ' + i18n('lang.mod.gallery.error_occurred:오류가 발생하였습니다.'));					
				}
			});

			return ajaxObj;
	},

	showCallBack : function(options) {	

		/**************************************************
		* FUNCTION
		**************************************************/

		var init = function() {

			Durian.imageViewerClose();

			if( getisFirstLoad() ) {
				initBaseUI();
				setLoadingUI('#'+opt.objID+' .tmpWrap', '_default');
			}

			if( opt.firstTab && getisFirstLoad() ) {
				opt.ccode = opt.firstTab;
			}	

			controlLoading('all', true);
			controlBlockMsg('all', false);

			mod.gallery.getJsonData(opt.pcode, opt.ccode).success(function(data) {			

				if( getisFirstLoad() ) {
					jQuery('#'+opt.objID+' .tmpWrap').remove();
				}
				
				if (data.group && opt.tab) {					
					opt.tabCount = data.group.length;

					if( getisFirstLoad() ) {
						initTab(data.group, opt.firstTab);
					}
				}
				
				if (!data.list) {
					controlLoading('all', false);
					initVal();
					controlBlockMsg('all', i18n('lang.mod.gallery.no_gallery_data:갤러리 데이터가 없습니다.') , true);

					// isLoaded FLAG		
					jQuery('#'+opt.objID).attr('isLoaded', 'true');		

					return false;
				}			
				
				initClip(data.list);				
				initVal();
				
				controlLoading('all', false);

				// isLoaded FLAG		
				jQuery('#'+opt.objID).attr('isLoaded', 'true');						

			});
		};

		var initBaseUI = function() {

			var baseHtml = ''
			+'<div class="tmpWrap"></div>'
			+'<div class="tabAreaWrap"></div>'
			+'<div class="canvasAreaWrap">'
			+'	<div class="canvasArea"></div>'
			+'</div>'
			+'<div class="gapWrap"></div>'
			+'<div class="slideAreaWrap">'
			+'	<div class="slideBtnAreaWrap">'
			+'		<span class="slideBtnArea slideBtnAreaPrev"></span>'
			+'	</div>'
			+'	<div class="slideArea">'
			+'		<div class="slideBox">'
			+'			<div class="clipBox"></div>'
			+'		</div>'
			+'	</div>'
			+'	<div class="slideBtnAreaWrap">'
			+'		<span class="slideBtnArea slideBtnAreaNext"></span>'
			+'	</div>'
			+'</div>'
			+'<div class="bottomWrap"></div>';

			jQuery('#'+opt.objID).html('').append(baseHtml);

			jQuery('#'+opt.objID+' .tmpWrap').css({'position':'relative','width':opt.width, 'height':opt.height});
		};

		var initVal = function() {

			// common option
			initOptCommon();
			
			// type option
			if( opt.mode == 'vertical' ) {
				initOptVertical();
			} else if( opt.mode == 'horizon' ) {
				initOptHorizon();
			}			

			initUI();			
			controlPageNum();

			if( getisFirstLoad() ) {
				initEvent();
			}

			if( opt.clipTotal > 0 ) {		

				if(opt.firstClip && getisFirstLoad()) {

					if( jQuery('#'+opt.objID+' .clipBox img[dataseq='+opt.firstClip+']').size() ) {
						eventThumbClick(jQuery('#'+opt.objID+' .clipBox img[dataseq='+opt.firstClip+']'));
						setGoPageDirect(Math.ceil(jQuery('#'+opt.objID+' .clipBox img[dataseq='+opt.firstClip+']').attr('seq') / opt.clipViewCount));
					} else {
						controlBlockMsg('all', i18n('lang.mod.gallery.no_image:해당이미지를 찾을 수 없습니다.') , true);
					}
					
				} else {
					eventThumbClick(jQuery('#'+opt.objID+' .clipBox img:first'));
				}
			}

			if( opt.thisPage == 1) {
				controlButton('slide', 'prev', false);
			}

			if( opt.maxPage <= 1) {
				controlButton('slide', 'next', false);
			}

			if( opt.selectItem == 0) {
				controlButton('canvas', 'prev', false);
			}

			if( opt.clipTotal <= 1) {
				controlButton('canvas', 'next', false);
			}

		};

		var initTab = function(data, code) {
		
			jQuery("#"+options.objID+" .tabAreaWrap").empty();

			jQuery("#"+options.objID+" .tabAreaWrap").append(jQuery('<ul class="tabCtl"></ul>'));

			jQuery.each(data, function(key) {
				jQuery("#"+options.objID+" .tabAreaWrap .tabCtl").append(
					jQuery('<li code="'+this.ccode+'"><a href="#tab">'+this.name+'</a></li>')
				);
			});

			if( code ) {
				jQuery("#"+options.objID+" .tabAreaWrap ul.tabCtl li[code="+code+"]").addClass("active").show();	
			} else {
				jQuery("#"+options.objID+" .tabAreaWrap ul.tabCtl li:first, #"+options.objID+" .tabAreaWrap ul.tabCtl li:first a").addClass("active").show();
			}

			//jQuery("#"+options.objID+" .tabAreaWrap ul.tabCtl li:first, #"+options.objID+" .tabAreaWrap ul.tabCtl li:first a").addClass("active").show();
		};

		var initClip = function(data) {

			jQuery("#"+options.objID+" .clipBox").empty();

			jQuery("#"+options.objID+" .clipBox").css({
				'left':'0',
				'top': '0'
			});

			jQuery.each(data, function(key) {						
					tplClip = '<div class="clipWrap"><div class="clipArea"><span class="clip"><img src="'+this.thumbSrc+'" orgsrc="'+this.orgSrc+'" caption="'+this.captionTxt+'" dataseq="'+this.dataSeq+'" /></span></div></div>';

					jQuery(tplClip).appendTo("#"+options.objID+" .clipBox");					
			});

			jQuery("#"+opt.objID+" .clip img").hover(
				function() {								
					if( jQuery(this).attr('seq') == opt.selectItem ) return;

					jQuery(this).css('border', '1px solid '+opt.canvasThema.clipBorderColor);
				},
				function() {	
					if( jQuery(this).attr('seq') == opt.selectItem ) return;

					jQuery(this).css('border', '0px solid '+opt.canvasThema.clipBorderColor);
				}
			);

			jQuery("#"+opt.objID+" .clip img").click(function() {			
				eventThumbClick(this);
			});

		};

		var initUI = function() {

			var clipSeq = 1;
			var htmlArrow = ''
			+'<div class="canvasArrowWrap canvasArrowWrapPrev"><div class="canvasArrowArea"><div class="canvasArrow"><input type="button" arrow="prev" /></div></div></div>'
			+'<div class="canvasArrowWrap canvasArrowWrapNext"><div class="canvasArrowArea"><div class="canvasArrow"><input type="button" arrow="next" /></div></div></div>'
			+'';

			// SET SEQ
			jQuery('#'+opt.objID+' .clipBox img').each(function() {
				jQuery(this).attr('seq', clipSeq++);
				jQuery(this).attr('title', jQuery(this).attr('caption'));				

				jQuery(this).load(function(){
					mod.gallery.reSize(this, opt.clipWidth, opt.clipHeight);
				});
			});

			// HIDDEN CLIPBOX
			if( opt.mode == 'vertical' ) {
				jQuery("#"+opt.objID+" .clipBox").css({'height' : (opt.clipWrapHeight * opt.clipTotal)});
			} else if( opt.mode == 'horizon' ) {
				jQuery("#"+opt.objID+" .clipBox").css({'width' : (opt.clipWrapWidth * opt.clipTotal)});				
			}	

			// CSS FLAG		
			if( getisFirstLoad() ) {
				Durian.setHeadCss(opt.txtCss);
			}				
			
			// SLIDE ARROW BUTTON
			if( !jQuery('#'+opt.objID+' .slideBtnArea').children().is('span') ) {
				jQuery('#'+opt.objID+' .slideBtnArea.slideBtnAreaPrev').append(jQuery('<span class=\'slideBtn\'><input type=\'button\' arrow="prev" /></span>'));
				jQuery('#'+opt.objID+' .slideBtnArea.slideBtnAreaNext').append(jQuery('<span class=\'slideBtn\'><input type=\'button\' arrow="next" /></span>'));
			}

			// CAVNAS ARROW BUTTON			
			if( !jQuery('#'+opt.objID+' .canvasAreaWrap').children().is('.canvasArrowWrap') ) {
				jQuery('#'+opt.objID+' .canvasAreaWrap').append(htmlArrow);
				jQuery('#'+opt.objID+' .canvasArrowWrap').css({
					'width': opt.btnCanvasIconWidth, 
					'height': jQuery('#'+opt.objID+' .canvasAreaWrap').height()
				}).hide();

				jQuery('#'+opt.objID+' .canvasArrowWrap.canvasArrowWrapNext').css({
					'left': jQuery('#'+opt.objID+' .canvasAreaWrap').width() - opt.btnCanvasIconWidth
				});
			}
			
			// CAPTION
			if( !jQuery('#'+opt.objID+' .canvasAreaWrap').children().is('.canvasAreaCaption') && opt.caption ) {
				jQuery('#'+opt.objID+' .canvasAreaWrap').append(jQuery('<div class="canvasAreaCaption"><span class="canvasAreaCaptionTXT"></span><span class="canvasAreaCaptionBlock"></span></div>'));
				jQuery('#'+opt.objID+' .canvasAreaWrap .canvasAreaCaptionBlock').css({"opacity":opt.captionThema.opacity}); 
			}
			
			// PAGE NUM
			if( !jQuery('#'+opt.objID+' .canvasAreaWrap').children().is('.canvasAreaPageNum')  && opt.pagenum ) {
				jQuery('#'+opt.objID+' .canvasAreaWrap').append(jQuery('<div class="canvasAreaPageNum"><span class="canvasAreaPageNumTXT"></span><span class="canvasAreaPageNumBlock"></span></div>'));
				jQuery('#'+opt.objID+' .canvasAreaWrap .canvasAreaPageNumBlock').css({'opacity':opt.pageNumThema.opacity}); 
			}

			// CAVNAS ARROW BUTTON			
			jQuery('#'+opt.objID+' .tabCtl').css({
				'width': jQuery('#'+opt.objID+' .canvasAreaWrap').width() + (opt.canvasBorder)
			});

			// LOADING
			setLoadingUI('#'+opt.objID+' .canvasAreaWrap', 'T40');
			setLoadingUI('#'+opt.objID+' .slideAreaWrap', 'T16');

			// BLOCK MESSAGE
			setBlockMsgUI('#'+opt.objID);

			// UI DEFAULT SETTING
			controlButton('slide', 'prev', true);
			controlButton('slide', 'next', true);
			controlButton('canvas', 'prev', true);
			controlButton('canvas', 'next', true);

			
		};

		var initEvent = function() {

			// ADD TO CLICK EVENT LISTENER
			jQuery("#"+opt.objID+" .slideBtnAreaWrap input").click(function() {			
				eventSlideRotate(jQuery(this).attr('arrow'));	
			});

			jQuery("#"+opt.objID+" .canvasArrowWrap input").click(function() {			
				eventCanvasRotate(jQuery(this).attr('arrow'));
			});

			jQuery("#"+opt.objID+" .tabAreaWrap ul.tabCtl li").click(function() {
				eventTabClick(this, true);
			});

			// ADD TO HOVER EVENT LISTENER
			jQuery(
				"#"+opt.objID+" .slideBtnAreaWrap input,"
				+"#"+opt.objID+" .canvasArrowWrap input"
			).hover(
				function() {
					eventImgHover(this, 'Over');
				},
				function() {			
					eventImgHover(this, '');
				}			
			);
			
			jQuery("#"+opt.objID+" .canvasAreaWrap").hover(
				function() {			
					jQuery("#"+opt.objID+" .canvasArrowWrap").show();
				},
				function() {			
					jQuery("#"+opt.objID+" .canvasArrowWrap").hide();
				}			
			);

			// ADD TO MOUSEWHEEL EVENT LISTENER
			jQuery("#"+opt.objID+" .slideAreaWrap").mousewheel(function(event, delta) { 
			
				delta < 0 ? eventSlideRotate('next') : eventSlideRotate('prev');

				return false;
			});

			jQuery("#"+opt.objID+" .canvasAreaWrap").mousewheel(function(event, delta) { 
			
				delta < 0 ? eventCanvasRotate('next') : eventCanvasRotate('prev');

				return false;
			});

		};

		var initOptCommon = function() {	
			
			// thema
			opt.canvasThema		= getThemaStyle('canvas');
			opt.loadingThema	= getThemaStyle('loading');
			opt.captionThema	= getThemaStyle('caption');			
			opt.pageNumThema	= getThemaStyle('pageNum');
			opt.btnIconThema	= getThemaStyle('btnIcon');
			opt.blockMsgThema	= getThemaStyle('blockMsg');

			opt.thisPage		= 1;
			opt.selectItem	= 1;
			opt.clipTotal		= jQuery('#'+opt.objID+' .clipBox img').size();

			opt.btnIconWidth	= opt.btnIconThema[opt.mode].width;
			opt.btnIconHeight	= opt.btnIconThema[opt.mode].height;
			opt.btnIconImg		= opt.btnIconThema[opt.mode].image;

			opt.btnCanvasIconWidth	= opt.btnIconThema['canvas'].width;
			opt.btnCanvasIconHeight	= opt.btnIconThema['canvas'].height;
			opt.btnCanvasIconImg		= opt.btnIconThema['canvas'].image;

			opt.canvasBorderTopCss = opt.tabCount ? 'border-top:0;' : '';

			opt.btnIconMap = {
				'prev': '0 0',
				'next': '0 -'+(opt.btnIconHeight)+'px',

				'prevOver': '-'+(opt.btnIconWidth)+'px 0',
				'nextOver': '-'+(opt.btnIconWidth)+'px -'+(opt.btnIconHeight)+'px',

				'prevDis': '-'+(opt.btnIconWidth*2)+'px 0',
				'nextDis': '-'+(opt.btnIconWidth*2)+'px -'+(opt.btnIconHeight)+'px'
			};

			opt.btnCanvasIconMap = {
				'prev': '0 0',
				'next': '0 -'+(opt.btnCanvasIconHeight)+'px',

				'prevOver': '-'+(opt.btnCanvasIconWidth)+'px 0',
				'nextOver': '-'+(opt.btnCanvasIconWidth)+'px -'+(opt.btnCanvasIconHeight)+'px',

				'prevDis': '-'+(opt.btnCanvasIconWidth*2)+'px 0',
				'nextDis': '-'+(opt.btnCanvasIconWidth*2)+'px -'+(opt.btnCanvasIconHeight)+'px'
			};
	
			opt.txtCss= ''		
			+'#'+opt.objID+' { width: '+opt.width+'px; position:relative; ;border-spacing:0;}'		
			+'#'+opt.objID+' .bottomWrap {clear:both}'

			+'#'+opt.objID+' .tabAreaWrap {text-align:left;}'
			+'#'+opt.objID+' .tabAreaWrap ul.tabCtl {display:table; height: '+opt.tabHeight+'px; margin: 0; padding: 0; float: none; list-style: none;  border-bottom: 1px solid '+opt.canvasThema.tabBorderColor+'; padding-left:1px;}'
			+'#'+opt.objID+' .tabAreaWrap ul.tabCtl li {list-style: none; float: left; margin: 0; padding: 0;  border: 1px solid '+opt.canvasThema.tabBorderColor+'; margin-left: -1px; margin-bottom: -1px; overflow: hidden; position: relative; background: '+opt.canvasThema.tabBg+'; font-size:10px; font-family: Verdana,Arial,sans-serif; white-space: nowrap; margin-top:'+opt.tabGap+'px;}'
			+'#'+opt.objID+' .tabAreaWrap ul.tabCtl li a {line-height: '+opt.tabHeight+'px; text-decoration: none; color: '+opt.canvasThema.tabFontColor+'; display: block; font-size: 1.2em; padding: 0 7px; border: 1px solid '+opt.canvasThema.tabBgPadding+'; outline: none; float: left; }'
			+'#'+opt.objID+' .tabAreaWrap ul.tabCtl li a:hover { background: '+opt.canvasThema.tabBgHover+';}'
			+'#'+opt.objID+' .tabAreaWrap ul.tabCtl li.active { margin-top:0; margin-left:-1px; background: '+opt.canvasThema.tabBgAct+';	border-bottom: 1px solid '+opt.canvasThema.tabBgAct+'; }'
			+'#'+opt.objID+' .tabAreaWrap ul.tabCtl a.active { line-height: '+(opt.tabHeight+opt.tabGap)+'px; }'

			+'#'+opt.objID+' .slideBtnArea input {width:'+opt.btnIconWidth+'px; height:'+opt.btnIconHeight+'px; background:transparent url("'+opt.btnIconImg+'") no-repeat; cursor:pointer; border:0;}'
			
			+'#'+opt.objID+' .canvasArrowWrap {display: table; #position: absolute; position: absolute; top:0; left:0; z-index:1000;}'
			+'#'+opt.objID+' .canvasArrowArea {#position: absolute; #top: 50%; #left: 50%; display: table-cell; vertical-align: middle; text-align: center;}'
			+'#'+opt.objID+' .canvasArrow {#position: relative; #top: -50%; #left: -50%;}'
			+'#'+opt.objID+' .canvasArrow input {width:'+opt.btnCanvasIconWidth+'px; height:'+opt.btnCanvasIconHeight+'px; cursor:pointer; background:transparent url("'+opt.btnCanvasIconImg+'") no-repeat 0 0; border:0;}'

			+'#'+opt.objID+' .loadingWrap { display: table; #position: absolute; position: absolute; top:0; left:0; z-index:1000}'
			+'#'+opt.objID+' .loadingArea {#position: absolute; #top: 50%; #left: 50%; display: table-cell; vertical-align: middle; text-align: center;}'
			+'#'+opt.objID+' .loading {#position: relative; #top: -50%; #left: -50%; text-align:center; font:12px dotum; color:#FFFFFF; margin: 0px; }'

			+'#'+opt.objID+' .blockMsgWrap { display: table; #position: absolute; position: absolute; top:0; left:0; z-index:2000;}'
			+'#'+opt.objID+' .blockMsgArea {#position: absolute; #top: 50%; #left: 50%; display: table-cell; vertical-align: middle; text-align: center;}'
			+'#'+opt.objID+' .blockMsg {#position: relative; #top: -50%; #left: -50%; text-align:center; font:12px dotum; color:#FFFFFF; margin: 0px; }'
			+'';
		};

		var initOptHorizon = function() {

			opt.slideBoxWidth						= opt.width	- (opt.btnWidth*2) - (opt.slideBorder*2);
			opt.clipViewCount						= parseInt(opt.slideBoxWidth / (opt.clipWidth+(opt.clipMargin*2)), 10);
			opt.clipWrapWidth						= opt.clipWidth+(opt.clipMargin*2);
			opt.clipWrapHeight					= opt.clipHeight+(opt.clipMargin*2);
			opt.clipBoxWidth						= opt.clipViewCount * opt.clipWrapWidth;		
			opt.captionTop							= opt.canvasHeight - opt.captionHeight;
			opt.maxPage									= Math.ceil(opt.clipTotal/opt.clipViewCount);
			opt.slideAreaWrapWidth			= opt.width;
			opt.slideAreaWrapHeight			= opt.clipWrapHeight+opt.slideAreaAdd;
			opt.canvasAreaWrapWidth			= opt.width;		
			opt.btnHeight								= opt.clipWrapHeight;

			opt.canvasAreaCaptionWidth	= opt.width;

			opt.txtCss += ''								
			+'#'+opt.objID+' .canvasAreaWrap { clear:both; position: relative;  background:'+opt.canvasThema.canvasColor+'; width: '+opt.canvasAreaWrapWidth+'px; height: '+opt.canvasHeight+'px; border: '+opt.canvasBorder+'px solid '+opt.canvasThema.canvasBorderColor+'; '+opt.canvasBorderTopCss+'}'
			+'#'+opt.objID+' .canvasArea { position: relative; width: '+opt.canvasAreaWrapWidth+'px; height: '+opt.canvasHeight+'px; }'				
			+'#'+opt.objID+' .canvasArea img { position: absolute; top: 0; left: 0;}'				

			+'#'+opt.objID+' .canvasAreaCaption { position:absolute; width: '+opt.canvasAreaCaptionWidth+'px; height:'+opt.captionHeight+'px; vertical-align:middle;line-height:'+opt.captionHeight+'px; top:'+opt.captionTop+'px; left: 0; txt-align:center; }'
			+'#'+opt.objID+' .canvasAreaCaption .canvasAreaCaptionTXT { width: '+(opt.canvasAreaCaptionWidth-(opt.captionMargin*2))+'px; height:'+opt.captionHeight+'px; line-height:'+opt.captionHeight+'px; z-index:9999;position:absolute; text-align:center; color: '+opt.captionThema.font+' ;font-size:12px;	font-family: Verdana,Arial,sans-serif; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; top:0 ; left:'+opt.captionMargin+'px;}'
			+'#'+opt.objID+' .canvasAreaCaption .canvasAreaCaptionBlock { width: '+opt.canvasAreaCaptionWidth+'px; height:100%; z-index:9998; position:absolute; background:'+opt.captionThema.color+'; top:0 ; left:0; }'

			+'#'+opt.objID+' .canvasAreaPageNum { position:absolute; width: '+opt.pagenumWidth+'px; height:'+opt.pagenumHeight+'px; vertical-align:middle;line-height:'+opt.pagenumHeight+'px; top:'+opt.pagenumMargin+'px; left:'+(opt.width-opt.pagenumWidth-opt.pagenumMargin)+'px;}'
			+'#'+opt.objID+' .canvasAreaPageNum .canvasAreaPageNumTXT { width: '+opt.pagenumWidth+'px; z-index:9999;position:absolute; text-align:center; line-height:'+opt.pagenumHeight+'px; color: '+opt.pageNumThema.font+' ;font-size:12px;	font-family: Verdana,Arial,sans-serif; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; top:0; left:0;}'
			+'#'+opt.objID+' .canvasAreaPageNum .canvasAreaPageNumBlock { width: '+opt.pagenumWidth+'px; height:100%; z-index:9998; position:absolute; background:'+opt.pageNumThema.color+'; top:0; left:0;}'

			+'#'+opt.objID+' .slideAreaWrap { position: relative; float: none; width: '+opt.slideAreaWrapWidth+'px; height:'+opt.slideAreaWrapHeight+'px; background:'+opt.canvasThema.slideColor+'; border: '+opt.slideBorder+'px solid '+opt.canvasThema.slideBorderColor+';}'
			+'#'+opt.objID+' .slideArea { float:left; width: '+opt.slideBoxWidth+'px; height: '+opt.clipWrapHeight+'px;}'

			+'#'+opt.objID+' .slideBox { width: '+opt.clipBoxWidth+'px; height: '+opt.slideAreaWrapHeight+'px; position: relative; margin: 0 auto; overflow:hidden}'
			+'#'+opt.objID+' .clipBox { width: '+opt.clipBoxWidth+'px; height: '+opt.slideAreaWrapHeight+'px;line-height: '+opt.clipWrapHeight+'px; position: absolute; top: 0; left: 0;}'

			+'#'+opt.objID+' .clipBox .clipWrap { float:left; display: table; width: '+opt.clipWrapWidth+'px; height:'+opt.slideAreaWrapHeight+'px; #position: relative;}'
			+'#'+opt.objID+' .clipBox .clipArea { #position: absolute; #top: 50%; #left: 50%; display: table-cell; vertical-align: middle; text-align: center;}'
			+'#'+opt.objID+' .clipBox span {#position: relative; #top: -50%; #left: -50%;}'
			+'#'+opt.objID+' .clipBox img { cursor:pointer; vertical-align:middle; border:0; margin:0; padding:0 }'

			+'#'+opt.objID+' .slideBtnAreaWrap { float:left; display: table; width: '+opt.btnWidth+'px; height:'+opt.slideAreaWrapHeight+'px; #position: relative;}'
			+'#'+opt.objID+' .slideBtnArea {#position: absolute; #top: 50%; #left: 50%; display: table-cell; vertical-align: middle; text-align: center;}'
			+'#'+opt.objID+' .slideBtnArea span {#position: relative; #top: -50%; #left: -50%;}'
			+'#'+opt.objID+' .slideBtnArea.slideBtnAreaPrev input {background-position:'+opt.btnIconMap.next+';}'
			+'#'+opt.objID+' .slideBtnArea.slideBtnAreaNext input {background-position:'+opt.btnIconMap.next+';}'

			+'#'+opt.objID+' .gapWrap { line-height: '+opt.gapSize+'px; height: '+opt.gapSize+'px; }'

			+'#'+opt.objID+' .canvasAreaArrow {z-index:10000;top:'+(opt.captionTop+5)+'px; left:10px; position: absolute; background: ; padding:5px 10px 5px 15px; display:none}'

			+'#'+opt.objID+' .groupArea{width: '+opt.canvasAreaWrapWidth+'px; height:30px; line-height:30px; text-align:left; background:'+opt.canvasThema.canvasColor+'; border: '+opt.canvasBorder+'px solid '+opt.canvasThema.canvasBorderColor+'; padding:10px}'
			+'#'+opt.objID+' .groupArea ul, #'+ opt.objID +' li{display:inline; float:}' // li => #modGAlleryArea li 로 수정
			+'#'+opt.objID+' .groupArea li{display:inline; font-size:12px; font-family: Verdana,Arial,sans-serif;}'
			+'';

		};

		var initOptVertical = function() {
			
			opt.slideBoxHeight			= opt.canvasHeight - (opt.btnWidth*2);
			
			opt.clipWrapWidth				= opt.clipWidth + (opt.clipMargin*2);
			opt.clipWrapHeight			= opt.clipHeight + (opt.clipMargin*2);

			opt.clipViewCount				= parseInt(opt.slideBoxHeight / opt.clipWrapHeight, 10);			
			opt.clipBoxWidth				= opt.clipWrapWidth;
			opt.clipBoxHeight				= opt.clipWrapHeight * opt.clipViewCount;

			opt.slideBoxWidth				= opt.clipWrapWidth;
			
			opt.captionTop					= opt.canvasHeight - opt.captionHeight;
			opt.maxPage							= Math.ceil(opt.clipTotal/opt.clipViewCount);
			opt.slideAreaWrapWidth	= opt.clipWrapWidth+opt.slideAreaAdd;
			opt.slideAreaWrapHeight	= opt.canvasHeight;
			opt.canvasAreaWrapWidth	= opt.width - opt.slideAreaWrapWidth - (opt.canvasBorder*2)- (opt.slideBorder*2) - opt.gapSize;

			opt.txtCss += ''		
			+'#'+opt.objID+' .canvasAreaWrap { position: relative; float:left; background:'+opt.canvasThema.canvasColor+'; width: '+opt.canvasAreaWrapWidth+'px; height: '+opt.canvasHeight+'px; border: '+opt.canvasBorder+'px solid '+opt.canvasThema.canvasBorderColor+'; '+opt.canvasBorderTopCss +'}'
			+'#'+opt.objID+' .canvasArea { position: relative; width: '+opt.canvasAreaWrapWidth+'px; height: '+opt.canvasHeight+'px; }'				
			+'#'+opt.objID+' .canvasArea img { position: absolute; top: 0; left: 0;}'				

			+'#'+opt.objID+' .canvasAreaCaption { position:absolute; width: '+opt.canvasAreaWrapWidth+'px; height:'+opt.captionHeight+'px; vertical-align:middle;line-height:'+opt.captionHeight+'px; top:'+opt.captionTop+'px; left:0; }'
			+'#'+opt.objID+' .canvasAreaCaption .canvasAreaCaptionTXT { width: '+(opt.canvasAreaWrapWidth-(opt.captionMargin))+'px; height:'+opt.captionHeight+'px; vertical-align:middle;line-height:'+opt.captionHeight+'px; z-index:9999;position:absolute; text-align:center; color: '+opt.captionThema.font+' ;font-size:12px;	font-family: Verdana,Arial,sans-serif; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; top:0 ; left:'+opt.captionMargin+'px;}'
			+'#'+opt.objID+' .canvasAreaCaption .canvasAreaCaptionBlock { width:100%; height:100%; z-index:9998; position:absolute; background:'+opt.captionThema.color+'; top:0; left:0;}'

			+'#'+opt.objID+' .canvasAreaPageNum { position:absolute; width: '+opt.pagenumWidth+'px; height:'+opt.pagenumHeight+'px; vertical-align:middle;line-height:'+opt.pagenumHeight+'px; top:'+opt.pagenumMargin+'px; left:'+(opt.canvasAreaWrapWidth-opt.pagenumWidth-opt.pagenumMargin)+'px;}'
			+'#'+opt.objID+' .canvasAreaPageNum .canvasAreaPageNumTXT { width:100%; z-index:9999;position:absolute; text-align:center; color: '+opt.pageNumThema.font+' ; line-height:'+opt.pagenumHeight+'px; font-size:12px;	font-family: Verdana,Arial,sans-serif; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; top:0; left:0;}'
			+'#'+opt.objID+' .canvasAreaPageNum .canvasAreaPageNumBlock { width:100%; height:100%; z-index:9998; position:absolute; background:'+opt.pageNumThema.color+'; top:0; left:0;}'

			+'#'+opt.objID+' .slideAreaWrap { position: relative; float: left; width: '+opt.slideAreaWrapWidth+'px; height:'+opt.canvasHeight+'px; background:'+opt.canvasThema.slideColor+'; border: '+opt.slideBorder+'px solid '+opt.canvasThema.slideBorderColor+'; border-spacing:0;}'
			+'#'+opt.objID+' .slideArea { float:left; width: '+opt.slideAreaWrapWidth+'px; height: '+opt.slideBoxHeight+'px; text-align:center; }'

			+'#'+opt.objID+' .slideBox { width: '+opt.clipBoxWidth+'px; height: '+opt.clipBoxHeight+'px; position: relative; margin: 0 auto; overflow:hidden; }'
			+'#'+opt.objID+' .clipBox { width: '+opt.clipBoxWidth+'px; height: '+opt.clipBoxHeight+'px; line-height: '+opt.clipWrapHeight+'px; position: absolute; top: 0; left: 0; }'

			+'#'+opt.objID+' .clipBox .clipWrap { float:none; display: table; width: '+opt.clipWrapWidth+'px; height:'+opt.clipWrapHeight+'px; #position: relative; }'				
			+'#'+opt.objID+' .clipBox .clipArea { #position: absolute; #top: 50%; #left: 50%; display: table-cell; vertical-align: middle; text-align: center;}'
			+'#'+opt.objID+' .clipBox span {#position: relative; #top: -50%; #left: -50%;}'
			+'#'+opt.objID+' .clipBox img { cursor:pointer; vertical-align:middle; border:0; margin:0; padding:0; }'

			+'#'+opt.objID+' .slideBtnAreaWrap { display: table; width: '+opt.slideAreaWrapWidth+'px; height:'+opt.btnHeight+'px; #position: relative;}'
			+'#'+opt.objID+' .slideBtnArea {#position: absolute; #top: 50%; #left: 50%; display: table-cell; vertical-align: middle; text-align: center;}'
			+'#'+opt.objID+' .slideBtnArea span {#position: relative; #top: -50%; #left: -50%; display:inline }'
			+'#'+opt.objID+' .slideBtnArea.slideBtnAreaPrev input {background-position:'+opt.btnIconMap.next+';}'
			+'#'+opt.objID+' .slideBtnArea.slideBtnAreaNext input {background-position:'+opt.btnIconMap.next+';}'
			
			+'#'+opt.objID+' .gapWrap {width:'+opt.gapSize+'px; height: '+opt.canvasHeight+'px; float:left; }'
			
			+'#'+opt.objID+' .canvasAreaArrow {z-index:10000;top:'+(opt.captionTop+5)+'px; left:10px; position: absolute; background: ; padding:5px 10px 5px 15px; display:none}'
			+'';

		};

		var setLoadingUI = function(target, type, id) {
			
			if(type == '_default') {
				var loadingThema = getThemaStyle('loading', opt.themaDefaultStyle);
			} else {
				var loadingThema = opt.loadingThema[type];
			}

			var htmlLoadingTxt = loadingThema.useTxt ? '<br>loading' : '';

			var htmlLoading = '<div class="loadingWrap"><div class="loadingArea"><div class="loading"><img src="'+loadingThema.image+'" valign="absmiddle" />'+htmlLoadingTxt+'</div></div></div>';

			if( !jQuery(target).children().is('.loadingWrap') ) {
				
				var txtCss= ''		
				+'#'+opt.objID+' .loadingWrap { display: table; #position: absolute; position: absolute; top:0; left:0; z-index:1000}'
				+'#'+opt.objID+' .loadingArea {#position: absolute; #top: 50%; #left: 50%; display: table-cell; vertical-align: middle; text-align: center;}'
				+'#'+opt.objID+' .loading {#position: relative; #top: -50%; #left: -50%; text-align:center; font:12px dotum; color:#FFFFFF; margin: 0px; }'
				+'';

				Durian.setHeadCss(txtCss);

				jQuery(target).append(jQuery(htmlLoading));
			}

			jQuery(target+' .loadingWrap .loading').css('color', loadingThema.font);

			jQuery(target+' .loadingWrap').css({
				'width': jQuery(target).width(), 
				'height': jQuery(target).height(),
				'opacity': loadingThema.opacity,
				'top': 0,
				'background': loadingThema.color
			}).hide();
		};

		var setBlockMsgUI = function(target) {

			var html = '<div class="blockMsgWrap"><div class="blockMsgArea"><span class="blockMsg"></span></div></div>';

			if( !jQuery(target).children().is('.blockMsgWrap') ) {
				jQuery(target).append(jQuery(html));

				jQuery(target+' .blockMsgWrap .blockMsg').css('color', opt.blockMsgThema.font);

				var tabHeight = opt.tabCount > 0 ? jQuery('#'+opt.objID+' .tabAreaWrap').height() : 0;				

				jQuery(target+' .blockMsgWrap').css({
					'width': jQuery(target).width(), 
					'height': jQuery(target).height()-tabHeight,
					'opacity': opt.blockMsgThema.opacity,
					'top': (opt.tabCount > 0 ? tabHeight : 0),
					'background': opt.blockMsgThema.color
				}).hide();
			}
		};

		var setImgView = function(src, seq, caption) {			
			controlLoading('canvas', true);
			controlCaption(caption);

			opt.selectItem = parseInt(seq);

			jQuery('<img seq=\''+seq+'\' src=\''+src+'\' />').hide().load(function() {					
				setImgViewCallBack(this);				
			});
			
		};

		var setImgViewCallBack = function(obj) {
			controlLoading('canvas', false);			
			jQuery('#'+opt.objID+' .canvasArea img').hide();		
			jQuery('#'+opt.objID+' .canvasArea').append(obj);
			mod.gallery.reSize(obj, (jQuery('#'+opt.objID+' .canvasArea').width()-(opt.canvasMargin*2)), (jQuery('#'+opt.objID+' .canvasArea').height()-(opt.canvasMargin*2)));
			jQuery(obj).fadeIn();
			
			Durian.setCenter("#"+opt.objID+" .canvasArea", obj);			

			jQuery(obj).click(function() {			
					setShowViewer(this);
			}).css({'cursor':'pointer'});
		};

		var eventSlideRotate = function(type, goPage) {

			var tmpPage;
		
			if( type == 'prev' ) {
				tmpPage = opt.thisPage - 1;
			} else if( type == 'next' ) {			
				tmpPage = opt.thisPage + 1;
			} else if( type == 'direct' ) {			
				tmpPage = goPage;
			}

			if( tmpPage < 1 || tmpPage > opt.maxPage ) {
				return false;
			} else {
				opt.thisPage = tmpPage;
			}

			if( opt.mode == 'vertical' ) {
				jQuery("#"+opt.objID+" .clipBox").animate({
					top: -((opt.thisPage-1) * opt.clipBoxHeight)
				}, 500);
			} else if( opt.mode == 'horizon' ) {
				jQuery("#"+opt.objID+" .clipBox").animate({
					left: -((opt.thisPage-1) * opt.clipBoxWidth)
				}, 500);
			}
		
			controlPageNum();

			controlButton('slide', 'prev', true);
			controlButton('slide', 'next', true);

			if( opt.thisPage == 1 ) {
				controlButton('slide', 'prev', false);
				return;
			} else if( opt.maxPage <= opt.thisPage) {
				controlButton('slide', 'next', false);
				return;	
			}
		
		};

		var setShowViewer = function(obj) {
				Durian.imageViewer(jQuery(obj).attr('src'));
		};

		var setGoPage = function(page) {			
			if( opt.thisPage == page || page < 1 || page > opt.maxPage ) {
				return false;
			} else if( opt.thisPage > page ) {
				return eventSlideRotate('prev');
			} else if( opt.thisPage < page ) {
				return eventSlideRotate('next');
			}
		};

		var setGoPageDirect = function(page) {			
			if( opt.thisPage == page || page < 1 || page > opt.maxPage ) {
				return false;
			} else {
				return eventSlideRotate('direct', page);
			}
		};

		var eventTabClick = function(obj, initFlag) {

			if( initFlag == null ) {
				initFlag = true;
			}

			jQuery("#"+opt.objID+" .tabAreaWrap ul.tabCtl li, #"+opt.objID+" .tabAreaWrap ul.tabCtl a").removeClass("active");
			jQuery(obj).addClass("active");
			jQuery('a', obj).addClass("active");
			opt.ccode = jQuery(obj).attr("code");
			
			if( initFlag ) {
				init();
			}
		};

		var eventImgHover = function(obj, type) {

			typeVal = jQuery(obj).attr('arrow') + type;
			
			switch(jQuery(obj).parent().attr('class')) {
				case 'slideBtn':
					data = opt.btnIconMap[typeVal]; break;
				case 'canvasArrow':
					data = opt.btnCanvasIconMap[typeVal]; break;
				default:
					data = '';
			}

			jQuery(obj).css('background-position', data);
		};

		var eventThumbClick = function(obj) {		
			
			Durian.imageViewerClose();

			setImgView(jQuery(obj).attr('orgsrc'), jQuery(obj).attr('seq'), jQuery(obj).attr('caption'));					

			jQuery("#"+opt.objID+" .clip img").css('border', '0px solid '+opt.canvasThema.clipBorderColor);

			jQuery(obj).css('border', '2px solid '+opt.canvasThema.clipBorderColor);

			controlButton('canvas', 'prev', true);
			controlButton('canvas', 'next', true);

			if( opt.selectItem <= 1 ) {
				controlButton('canvas', 'prev', false);
				return;
			} else if( opt.clipTotal <= opt.selectItem) {
				controlButton('canvas', 'next', false);
				return;	
			}
		};

		var eventCanvasRotate = function(type) {

				var selectSeq = null;

				if( type == 'prev' ) {
					selectSeq = opt.selectItem-1;
				} else if( type == 'next' ) {
					selectSeq = opt.selectItem+1;
				}

				var selectObj = jQuery('#'+opt.objID+' .clipBox img[seq='+(selectSeq)+']');

				if( selectObj.attr('seq') ) {
					eventThumbClick(selectObj);
					setGoPage(Math.ceil(selectSeq / opt.clipViewCount));
				}
		};

		var getisFirstLoad = function() {

			if( jQuery('#'+opt.objID).attr('isLoaded') ) {				
				return false;
			} else {
				return true;
			}
		};

		var getControlArea = function(area) {
			switch(area) {
				case 'slide':
					target = ' .slideAreaWrap'; 
					break;
				case 'canvas':
					target = ' .canvasAreaWrap'; 
					break;
				case 'all':
					target = '';
					break;
				default:
					return false;
			}

			return target;
		};

		var controlLoading = function(area, flag) {

			var target = getControlArea(area);		

			if( flag ) {
				jQuery('#'+opt.objID+target+' .loadingWrap').show();
			} else {
				jQuery('#'+opt.objID+target+' .loadingWrap').hide();
			}

		};

		var controlBlockMsg = function(area, msg ,flag) {

			var target = getControlArea(area);

			if( flag ) {
				jQuery('#'+opt.objID+target+' .blockMsgWrap').show();
				jQuery('#'+opt.objID+target+' .blockMsgWrap .blockMsg').text(msg);
			} else {
				jQuery('#'+opt.objID+target+' .blockMsgWrap').hide();
			}

		};

		var controlPageNum = function() {

			var txt = opt.thisPage +'/'+ (opt.maxPage ? opt.maxPage : '1');
			
			jQuery('#'+opt.objID+' .canvasAreaWrap .canvasAreaPageNumTXT').html(opt.pageNumPrefix+txt);			
		};

		var controlCaption = function(msg) {

			if( !msg ) {
				jQuery('#'+opt.objID+' .canvasAreaCaption').hide();						
			} else {
				jQuery('#'+opt.objID+' .canvasAreaWrap .canvasAreaCaptionTXT').text(msg);			
				jQuery('#'+opt.objID+' .canvasAreaWrap .canvasAreaCaptionTXT').attr('title', msg);
				jQuery('#'+opt.objID+' .canvasAreaCaption').fadeIn();
			}
		};

		var controlButton = function(area, type, flag) {

			switch(area) {
				case 'slide':
					prev = ' .slideBtnArea.slideBtnAreaPrev input'; 
					next = ' .slideBtnArea.slideBtnAreaNext input'; 
					break;
				case 'canvas':
					prev = ' .canvasArrowWrap.canvasArrowWrapPrev input'; 
					next = ' .canvasArrowWrap.canvasArrowWrapNext input'; 
					break;
			}

			if( type == 'prev' ) {
				jObj	= jQuery("#"+opt.objID+prev);		
			} else if( type == 'next' ) {	
				jObj = jQuery("#"+opt.objID+next);
			}

			if( flag ) {
				jObj.removeAttr('disabled');
				eventImgHover(jQuery(jObj), '');
			} else {				
				jObj.attr('disabled', 'disabled');
				eventImgHover(jQuery(jObj), 'Dis');
			}
		};

		var getThemaStyle = function(type, style) {

			var typeVal, thema;

			switch(type) {
				case 'loading':
					typeVal	= 'loadingPack'; 
					thema		= opt.themaCover;
					break;
				case 'caption':
					typeVal = 'captionPack'; 
					thema		= opt.themaCanvas;
					break;
				case 'pageNum':
					typeVal = 'pageNumPack';
					thema		= opt.themaCanvas;
					break;
				case 'btnIcon':
					typeVal = 'btnIconPack';
					thema		= opt.themaCanvas;
					break;
				case 'canvas':
					typeVal = 'canvasPack';
					thema		= opt.themaCanvas;
					break;
				case 'blockMsg':
					typeVal = 'blockMsgPack';
					thema		= opt.themaCover;
					break;
				default:
					return false;
			}

			if( jQuery.isEmptyObject(opt[typeVal][thema]) ) {
				retThema = opt[typeVal][opt.themaDefault];
			} else {
				retThema = opt[typeVal][thema];
			}
			
			return style ? retThema[style] : retThema;
		};

		
	
		/**************************************************
		* VAL INIT
		**************************************************/
		var defaultVal = {			
			mode: 'horizon',
			objID: 'modGalleryArea',			
			selectItem: 0,
			pcode: '',
			ccode: '',

			width: 700,
			height: 300,
			gapSize: 3,

			tab: true,
			tabHeight: 30,
			tabCount: 0,
			tabGap: 3,

			canvasHeight: 500,
			canvasMargin: 5,
			
			canvasBorder: 1,

			caption: true,
			captionMargin: 5,
			captionHeight: 30,			
		
			pagenum: true,
			pagenumWidth: 80,
			pagenumHeight: 25,			
			pagenumMargin: 7,
			pageNumPrefix: 'page: ',
			
			slideAreaAdd: 10,
			slideBorder: 1,

			clipBorder:1,

			clipWidth : 90,
			clipHeight : 68,
			clipMargin: 5,		
						
			btnWidth: 45,		// fix val
			btnHeight: 45,	// fix val
			
			firstTab: '',
			firstClip:'',

			//---------------------------------------------------
			// # Thema
			// named: foreground + background
			//---------------------------------------------------
			themaDefault: 'white',
			themaDefaultStyle: 'T00',
			themaCanvas: 'white', // canvas, caption, page
			themaCover: 'white', // loading, msg

			canvasPack: {
				'white': {'canvasColor':'#FFFFFF', 'canvasBorderColor':'#D7D7D7', 'slideBorderColor':'#D7D7D7', 'slideColor':'#FFFFFF', 'clipBorderColor': '#ADADAD', 'tabBg':'#F2F2F2', 'tabBgHover':'#cccccc','tabBgAct':'#ffffff','tabFontColor':'#000000','tabBorderColor':'#D7D7D7', 'tabBgPadding':'#FFFFFF'},
				'black': {'canvasColor':'#000000', 'canvasBorderColor':'#4B4B4B', 'slideBorderColor':'#4B4B4B', 'slideColor':'#000000', 'clipBorderColor': '#ADADAD', 'tabBg':'#5A5A5A', 'tabBgHover':'#cccccc','tabBgAct':'#000000','tabFontColor':'#FFFFFF','tabBorderColor':'#4B4B4B', 'tabBgPadding':'#000000'}
			},

			blockMsgPack: {
				'white': {'opacity':'0.7', 'font':'#000000', 'color':'#FFFFFF'},
				'black': {'opacity':'0.7', 'font':'#FFFFFF', 'color':'#000000'}
			},

			loadingPack: {
				'white': {
					'T00': {'opacity':'1', 'font':'#000000', 'useTxt':true, 'color':'#FFFFFF', 'image': '/common/js/module/images/pre_loader3_40px.gif'},
					'T40': {'opacity':'0.6', 'font':'#000000', 'useTxt':true, 'color':'#FFFFFF', 'image': '/common/js/module/images/pre_loader3_40px.gif'},
					'T16': {'opacity':'0.6', 'font':'#000000', 'useTxt':false, 'color':'#FFFFFF', 'image': '/common/js/module/images/pre_loader3_16px.gif'}
				},
				'black': {
					'T00': {'opacity':'1', 'font':'#FFFFFF', 'useTxt':true, 'color':'#000000', 'image': '/common/js/module/images/pre_loader1_40px.gif'},
					'T40': {'opacity':'0.6', 'font':'#FFFFFF', 'useTxt':true, 'color':'#000000', 'image': '/common/js/module/images/pre_loader1_40px.gif'},
					'T16': {'opacity':'0.6', 'font':'#FFFFFF', 'useTxt':false, 'color':'#000000', 'image': '/common/js/module/images/pre_loader1_16px.gif'}
				},				
				'blueWhite': {
					'T00': {'opacity':'1', 'font':'#000000', 'useTxt':true, 'color':'#FFFFFF', 'image': '/common/js/module/images/pre_loader2_40px.gif'},
					'T40': {'opacity':'0.6', 'font':'#000000', 'useTxt':true, 'color':'#FFFFFF', 'image': '/common/js/module/images/pre_loader2_40px.gif'},
					'T16': {'opacity':'0.6', 'font':'#000000', 'useTxt':false,'color':'#FFFFFF', 'image': '/common/js/module/images/pre_loader2_16px.gif'}
				}
			},

			captionPack: {
				'white': {'opacity':'0.6', 'font':'#000000', 'color':'#FFFFFF'},
				'black': {'opacity':'0.6', 'font':'#FFFFFF', 'color':'#000000'}
			},

			pageNumPack: {
				'white': {'opacity':'0.5', 'font':'#FFFFFF', 'color':'#000000'}
			},

			btnIconPack: {			
				'white': {
					'canvas': {'width':31, 'height': 49, 'image': '/common/js/module/images/btn_arrows_canvas.png'},
					'horizon': {'width':32, 'height': 42, 'image': '/common/js/module/images/btn_arrows_horizon.png'},
					'vertical': {'width':42, 'height': 32, 'image': '/common/js/module/images/btn_arrows_vertical.png'}
				},
				'black': {
					'canvas': {'width':31, 'height': 49, 'image': '/common/js/module/images/btn_arrows_canvas_black.png'},
					'horizon': {'width':32, 'height': 42, 'image': '/common/js/module/images/btn_arrows_horizon.png'},
					'vertical': {'width':42, 'height': 32, 'image': '/common/js/module/images/btn_arrows_vertical.png'}
				}
			}
			//---------------------------------------------------
			
		};

		var opt = jQuery.extend(defaultVal, options);				
		
		/**************************************************
		* PROCESS
		**************************************************/

		init(); // init gallery	

		/**************************************************/
	}
}