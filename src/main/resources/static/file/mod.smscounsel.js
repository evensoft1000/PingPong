/**************************************************
*
* @whoisBuilder
*
* - title: mod.smscounsel(myth2x@whois.co.kr)
* - required: Durian.common, jQuery, jQuery.UI
* - last modify: 2012-04-30
* 
**************************************************/


try{
	if('undefined' != typeof __SUB_SITE_LANG_TYPE__){
		load_i18n("mod.smscounsel", __SUB_SITE_LANG_TYPE__);
	}else{
		load_i18n("mod.smscounsel", 'ko');
	}
	
}catch(e){}


if ( jQuery.type(mod) != 'object' ) {
	var mod = {};
}

mod.smscounsel = {

	init : function(options) {

		var options = options;

		jQuery(window).ready(function(){
			mod.smscounsel.callBack(options);
		});
	}, 

	callBack : function(options) {	

		var defaultVal = {			
			objID: 'modSMSCounsel',
			msgMxLen: 1000,
			msgSuccess: i18n('lang.mod.smscounsel.accept_application_normally:상담신청이 정상적으로 접수되었습니다.<br />고객님께서 접수해주신 내용은 담당자가 확인하여 메일 또는 유선을 통해 답변 드리겠습니다.')
		};

		var opt = jQuery.extend(defaultVal, options);		
		
		var fieldCheck = function(field, numCheck) {

			if( !jQuery(field, opt.obj).size() ) return true;
		
			if(!jQuery(field, opt.obj).val()) {

				var text = jQuery(field, opt.obj).attr('filedText');

				Durian.alertCloseFocusObject = jQuery(field, opt.obj);
				Durian.alert('"'+text+'" ' + i18n('lang.mod.smscounsel.input:을(를) 입력해 주세요.'));			
				return false;
			} else {
				
					if(numCheck && isNaN(jQuery(field, opt.obj).val())){
						Durian.alertCloseFocusObject = jQuery(field, opt.obj);
						Durian.alert(i18n('lang.mod.smscounsel.enable_to_input_number:숫자만 입력 가능합니다.'));
						return false;
					} else {
						return true;
					}
			}
		};

		var agreeCheck = function (){

			var rd = jQuery(".modSMSCounsel_agree", opt.obj);
			if(!rd.size()){
				return true;
			}

			var _rd = rd.get()[0];
			if(true == _rd.checked){
				return true;
			}else{
				Durian.alert(i18n('lang.mod.smscounsel.agree_to_collect_privacy:개인정보수집에 동의해 주십시오.'));
				return false;
			}
		}

		var getByte = function (value){

			if(!value) return 0;
				
			var byteTotal = 0;
			for (var i=0; i<value.length; i++) {
				if (value.charCodeAt(i) >= 128) {
					byteTotal += 2;
				} else {
					byteTotal++;
				}
			}
			return byteTotal;
		};

		var cutStr = function(str, len) {
			var s = 0;
			for (var i=0; i<str.length; i++) {
				s += (str.charCodeAt(i) > 128) ? 2 : 1;
				if (s > len) return str.substring(0,i) + '';
			}        
			return str;
		};	 

		var msgLenCheck = function() {

			if( getByte(jQuery('.modSMSCounsel_content', opt.obj).val()) > opt.msgMxLen ) {
				var text = jQuery('.modSMSCounsel_content, opt.obj').attr('filedText');
				Durian.alertCloseFocusObject = jQuery('.modSMSCounsel_content', opt.obj);
				Durian.alert('"'+text+'" '+ i18n('lang.mod.smscounsel.hangul:을(를) 한글') +' '+(Math.round(opt.msgMxLen/2))+ i18n('lang.mod.smscounsel.english:자, 영문') + ' '+opt.msgMxLen+ i18n('lang.mod.smscounsel.input_within:자 이내로 입력해 주세요.'));
				return false;
			} else {
				return true;
			}
		};

		var resetField = function() {

			jQuery('.modSMSCounsel_content', opt.obj).val('');
			jQuery('.modSMSCounsel_phone2', opt.obj).val('');
			jQuery('.modSMSCounsel_phone3', opt.obj).val('');
			jQuery('.modSMSCounsel_content_len', opt.obj).html('0/'+opt.msgMxLen);

			if(jQuery(".modSMSCounsel_disagree", opt.obj).size() > 0){
				jQuery(".modSMSCounsel_disagree", opt.obj).get()[0].checked = true;
			}

		};

		var bindField = function() {
			jQuery('.modSMSCounsel_submit', opt.obj).click(formSubmit);
			jQuery('.modSMSCounsel_content', opt.obj).keyup(function() {
				if( !msgLenCheck() ) {
					jQuery('.modSMSCounsel_content', opt.obj).html(cutStr(jQuery('.modSMSCounsel_content', opt.obj).val(), opt.msgMxLen));			
				}

				jQuery('.modSMSCounsel_content_len', opt.obj).html(getByte(jQuery(this).val())+'/'+opt.msgMxLen);		
			});

			jQuery('.modSMSCounsel_phone2', opt.obj).keyup(function() {
				if( jQuery('.modSMSCounsel_phone2', opt.obj).val().length == 4 ) {
					jQuery('.modSMSCounsel_phone3', opt.obj).focus();
				}
			});
		};

		var formSubmit = function() {
			
			if( !fieldCheck('.modSMSCounsel_name') 			
				|| !fieldCheck('.modSMSCounsel_phone1') 
				|| !fieldCheck('.modSMSCounsel_phone2', true) 
				|| !fieldCheck('.modSMSCounsel_phone3', true) 
				|| !fieldCheck('.modSMSCounsel_content') 
				|| !msgLenCheck()
				|| !agreeCheck()
			) {
				return;
			}

			if(typeof opt.loadingNoneUse == 'undefined') Durian.loadingSmallWhite(opt.obj);

			var postDataMap = {
				'name':'.modSMSCounsel_name',
				'phone1':'.modSMSCounsel_phone1',
				'phone2':'.modSMSCounsel_phone2',
				'phone3':'.modSMSCounsel_phone3',
				'content':'.modSMSCounsel_content'
			};

			var postData = {};
			
			jQuery.each(postDataMap, function(key, val) {
				if( jQuery(val, opt.obj).val() ) {
					postData[key] = jQuery(val, opt.obj).val();		
				}
			});

			jQuery.ajax({  
				url: "?act=common.sms_counsel_act", 
				type: "POST", 
				data: postData,  
				dataType: "html",
				success: function(data) {
					if(typeof opt.loadingNoneUse == 'undefined') Durian.loadingClose(opt.obj);

					if( data == '0' ) {
						Durian.alert(opt.msgSuccess);
						resetField();
					} else {
						Durian.alert(i18n('lang.mod.smscounsel.error_occurred:오류가 발생되었습니다.') + ' ('+data+')');
					}
					
				},
				complete: function() {
					//alert('complete');
				},
				error: function() {
					alert(i18n('lang.mod.smscounsel.network_error_occurred:통신 오류가 발생하였습니다.'));					
				}
			});
		};

		/***************************************************************************************
		* PROCESS
		***************************************************************************************/		
		opt.obj = jQuery('#'+opt.objID);

		resetField();
		bindField();
		/***************************************************************************************/		
	}
}