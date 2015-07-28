function detectionDevice(){
	if(/android|linux|bb10|blackberry/i.test(navigator.userAgent.toLowerCase())){
		return 'android';
	}else if(/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())){
		return 'ios';
	}
	return 'other'; 
}

function readyDetectionDevice(){
	if(detectionDevice() == 'ios'){
		$(".list-download .android").hide();
		$(".list-download .ios h3").hide();
	}
	if(detectionDevice() == 'android'){
		$(".list-download .ios").hide();
		$(".list-download .android h3").hide();
	}
}

function readyDetectionDeviceDetail(){
	if(detectionDevice() == 'ios'){
		$(".iinfo .android").hide();
		$(".dl-version .android").hide();
	}else{
		$(".iinfo .ios").hide();
		$(".dl-version .ios").hide();
	}
}

function createTabs(){
	$('.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})
}

function boxDownload(){
	$('.download').click(function(){
		$('.list-download').removeClass('active');
		$(this).next('.list-download').toggleClass("active");
		$('.fullpage').addClass("zactive");
	});
	$('.fullpage').click(function(){
		$(this).removeClass("zactive");
		$('.list-download').removeClass('active');
		$('.download').unbind('mouseenter mouseleave');
	});
	$(document).scroll(function() {
		$('.list-download').removeClass('active');
		$('.fullpage').removeClass('zactive');
		$('.download').unbind('mouseenter mouseleave');
	})
}

function showDownloadLink(){
	$('.btn_dl').click(function(){
		
		$(this).toggleClass("active");
		$(this).parent().parent().next('.link_dl').toggleClass("active");
	});
	
	
	$('.btn_info').click(function(){
		$(this).toggleClass("active");
		$(this).next('.discount-content').toggleClass("active");
	});
}

function backToTop($height){
	$('body,html').animate({scrollTop:$height},100);	
}
function scollTextbox(){
	$("#ewrap :text, #ewrap :password").on('focus', function(){
		$('html,body').animate({
			scrollTop: $(this).offset().top-70},'fast');
	});
}

function menu(){
	var sidebar = $('#menu');
    var toggle = $('#toggle');
    var back = $('#toggle_back');
    var fullpage = $('.fullpage');
    var body = $('body');

    toggle.click(function() {
        showSidebar();
    });

    back.click(function() {
        hideSidebar();
    });

	fullpage.click(function() {
        hideSidebar();
    });

    function showSidebar() {
        sidebar.show();
        back.show();
        body.css('overflow', 'hidden');
		fullpage.show();
    }

    function hideSidebar() {
		sidebar.hide();
		back.hide();
		body.css('overflow', 'auto');
		fullpage.hide();
    }

}
function menuAction(){
	$("#menu .parent").click(function(){
		$(this).toggleClass("on");
		$(this).next(".sub").toggleClass("on");
		event.preventDefault();
	});

	$('.fullpage').click(function(){
		$("#menu .parent").next(".sub").removeClass("on");
	});
}

function gup(name) {
	url = location.href;
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}

function remove_hash(){
	if (window.location.hash == '#_=_' || window.location.hash == '#') {
		window.location.hash = '';
		history.pushState('', document.title, window.location.pathname);
	}
}

function show_tab(){
	if (window.location.hash != '' && window.location.hash == '#laylink') {
		$('.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$("#atab-3").addClass('current');
		$(".tab-content#tab-3").addClass('current');
	}
}
