<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- 부트스트랩 include -->
<%-- <%@include file="/WEB-INF/views/header.jsp" %> --%>

<!DOCTYPE html>
<html lang="ko"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="whois">
	<link rel="shortcut icon" href="">
    <title>Insert title here</title>
    
    <!-- Google-Fonts -->
	<link href="resources/file/css" rel="stylesheet" type="text/css">
	<link href="resources/file/css(1)" rel="stylesheet" type="text/css">
	<!-- Bootstrap core CSS -->
	<link href="resources/file/bootstrap.min.css" rel="stylesheet">
	<!-- Owl-carousel CSS -->
	<link href="resources/file/owl.carousel.css" rel="stylesheet">
	<link href="resources/file/owl.theme.css" rel="stylesheet">
	<!--external css-->
	<link href="resources/file/simple-line-icons.css" rel="stylesheet">
	<link href="resources/file/font-awesome.min.css" rel="stylesheet">
	<!--popups css-->
	<link href="resources/file/magnific-popup.css" rel="stylesheet" type="text/css">

			<!-- user common css -->
	<link href="resources/file/style.css" rel="stylesheet">
	<!-- /user common css -->
	
	<!-- Custom styles for this template -->
	<!-- <link href="/images/basic_resp/css/style.css?v=201510200000" rel="stylesheet"> -->
	<link href="resources/file/custom.css" rel="stylesheet">
	<link href="resources/file/YTPlayer.css" rel="stylesheet" type="text/css">

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 tooltipss and media queries -->
	<!--[if lt IE 9]>
	<script src="/common/images/js/html5shiv.js?v=201510200000"></script>
	<script src="/common/images/js/respond.min.js?v=201510200000"></script>
	<![endif]-->

	<link href="resources/file/common.css"  type="text/css" rel="stylesheet">
	<link href="resources/file/jquery.theme.css" type="text/css" rel="stylesheet">
	<script type="text/javascript" src="resources/file/sky.rama.js"></script>
	<script type="text/javascript" src="resources/file/jquery.v1.9.1.min.js"></script>
	<script type="text/javascript" src="resources/file/jquery-migrate-1.3.0.min.js"></script>
	<script type="text/javascript" src="resources/file/jquery.i18n.properties-min-1.0.9.js"></script>
	<script type="text/javascript" src="resources/file/saved_resource"></script>
	<script type="text/javascript" src="resources/file/durian.common.js"></script><script type="text/javascript" src="resources/file/mod.gallery.js"></script><script type="text/javascript" src="resources/file/mod.smscounsel.js"></script>
	<script type="text/javascript" src="resources/file/jquery-ui.custom.min.js"></script>
	<script type="text/javascript" src="resources/file/jquery.blockUI.js"></script>
</head>
	
<body data-spy="scroll" data-offset="80">

	<!-- Preloader -->
	<div class="animationload" style="display: none;">
		<div class="loader" style="display: none;">&nbsp;</div>
	</div> 
	<!-- End Preloader -->

	<!--[[AREA_TOP_START]]-->
	<nav class="navbar navbar-default navbar-main navbar-fixed-top navbar-custom small">
		<div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<!--L_SITE_LOGO[[[--><!-- Image Upload Logo -->
				<div id="L_SITE_LOGO">
						<h4>
						<a href="http://www.evensoft.com/"> 
						<!--<img src="./evensoft/logo.jpg" border="0"> -->
						<p>KTTF 탁구 레이팅</p>
			            </a>
					</h4>
				</div>


			<!-- Text Logo -->
			<!-- <a class="navbar-brand" href="/"><h1>LOGO TYPE</h1></a> --><!--L_SITE_LOGO]]]-->
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<!--L_TOP_MENU[[[-->
				<div class="navbar-right">
				    <!--L_TOP_GNB[[[-->
				    <ul class="login-bar">
						<li><a href="">HOME</a></li>
						<li><a href="./file/login.html">LOGIN</a></li>
						<!-- <li><a href="/?act=shop.guest_auth">ORDERLIST</a></li> -->
					</ul>
					<!--L_TOP_GNB]]]-->
					
    				<ul class="nav navbar-nav">
						<li class="dropdown">
							<a href="./file/sub02.html" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">레이팅 제도</a>
							<ul class="dropdown-menu dropdown-menu-hover">
								<li><a href="./file/sub02.html">부수별 첫 레이팅 점수표</a></li>
								<li><a href="./file/sub01.html">레이팅 점수표</a></li>
							</ul>
						</li>
						<li class="dropdown">
							<a href="./file/sub20.html" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">대회정보</a>
							<ul class="dropdown-menu dropdown-menu-hover">
								<li><a href="./file/sub20.html">대회목록</a></li>
					            <li><a href="./file/sub21.html">대회등록</a></li>
								<li><a href="./file/sub22.html">분류체계등록</a></li>
								<li><a href="./file/sub23.html">대진표등록</a></li>
								<li><a href="./file/sub24.html">경기결과등록</a></li>
							</ul>
						</li>
						<li class="dropdown">
							<a href="./file/sub10.html" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">대회참가자</a>
							<ul class="dropdown-menu dropdown-menu-hover">
							    <li><a href="./file/sub10.html">대회코드</a></li>
								<li><a href="./file/sub11.html">대회참가신청</a></li>
								<li><a href="./file/sub12.html">참가자 목록</a></li>
								<li><a href="./file/sub13.html">신청서첨부파일</a></li>
								<li><a href="./file/sub14.html">대진표</a></li>
								<li><a href="./file/sub15.html">레이팅 점수(랭킹)</a></li>
							</ul>
						</li>
						<li class="dropdown">
							<a href="./file/sub08.html" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">시스템공통</a>
							<ul class="dropdown-menu dropdown-menu-hover">
							    <li><a href="./file/sub08.html">권한관리</a></li>
								<li><a href="./file/sub06.html">권한별메뉴관리</a></li>
								<li><a href="./file/sub07.html">승인권한위임</a></li>
							</ul>
						</li>
				    </ul>
				</div>
			<!--L_TOP_MENU]]]-->
				</div><!-- /.navbar-collapse -->
		</div><!-- /.container -->
	</nav>
		
	<!-- /HOME -->
	<!--L_MAIN_IMAGE[[[-->
	<section id="home">
		<div class="home-section">
			<div class="container slidero">
				<div class="row">
					<div class="col-md-12">
					    <img src="resources/filejs/main.jpg" border="0"> 
						<p class="intro-title">대한민국 탁구 대회 <br></p>
						<p class="intro-text">정성과 최선의 노력을 다할 것을 약속드립니다.</p>
						<div class="btn-bar">
						</div>
					</div> <!-- /col -->
				</div> <!-- /row -->
			</div> <!-- /container -->
		</div>
	</section><!--L_MAIN_IMAGE]]]-->
	
	<!-- /End HOME -->
	<!--[[AREA_TOP_END]]-->

	<!--[[AREA_BODY_START]]-->
	<section class="whois-main-contents-area">
		<!--BODY[[[-->
		<div class="container">
			<div class="row">
				<div class="whois-main-contents-area-box">
					<div class="whois-main-contents-area-box-inner">
					    <a href="http://www.evensoft.com/sub05.html"><h5>레이팅 제도 +</h5></a>
		                <ul class="extract-wrap extract-board">
							<li class="extract-article">
								<a href="" title="부수별 첫 레이팅 점수표">
									<div class="extract-content">
										<div class="extract-title ellipsis">부수별 첫 레이팅 점수표</div><span class="extract-title-arrow"></span>
									</div>
								</a>
							</li>
							<li class="extract-article">
								<a href="" title="레이팅 점수표">
									<div class="extract-content">
										<div class="extract-title ellipsis">레이팅 점수표</div><span class="extract-title-arrow"></span>
									</div>
								</a>
							</li>
			           </ul>
				   </div>
			   </div>
		<div class="whois-main-contents-area-box whois-main-contents-area-box-left-margin">
			<div class="whois-main-contents-area-box-inner">
				<!--L_BBS_EXTRACT[[[-->
				<script src="resources/file/jquery.dotdotdot.min.js" type="text/javascript"></script>
				
				<style>
					.extract-article {
						border-top: 1px solid #e1e1e1;
						padding: 10px 0;
						transition: 0.3s background linear;
					}
					.extract-article:first-child {
						border:0;
						padding: 0 0 10px 0;
					}
					.extract-article .extract-content {
						line-height: 24px;
					}
					.extract-article .extract-content .extract-date {
						color: #acacac;
					}
					
					.extract-webzine .extract-article .extract-thumb {
						position:relative;
						text-align: center;
						vertical-align:center;
						border:1px solid #eee;
					}
				
					.extract-webzine .extract-article .extract-thumb img {
						max-height: 100%;
						max-width: 100%;
						width: auto;
						height: auto;
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto;
					}
				
					.extract-webzine .extract-article .extract-content {
						font-size:13px;
					}
					.extract-webzine .extract-article .extract-content .extract-title {
						font-weight: bold;
						font-size:14px;
						padding: 2px 0;
					}
					
					.extract-board .extract-article .extract-content .extract-title {
						display: inline-block;
						font-weight: normal;
						vertical-align: middle;
						width: 95%;
					}
					.extract-board .extract-article .extract-content .extract-title-arrow {
						display: inline-block;
						vertical-align: middle;
						width: 5%;
					}
					
					.ellipsis { 
						overflow: hidden; 
						text-overflow: ellipsis; 
						white-space: nowrap; 
					}
				
					@media (max-width: 767px) {
						.extract-webzine .extract-article .extract-thumb {
							height: 200px;
						}
						.extract-webzine .extract-article .extract-content .extract-title{
							padding: 2% 0;
						}
					}
					@media (min-width: 768px) {
						.extract-webzine .extract-article {
							box-sizing: content-box;
							height: 100px;
							position: relative;
						}
						.extract-webzine .extract-article .extract-thumb {
							bottom: 10px;
							left: 0;
							position: absolute;
						}
						.extract-webzine .extract-article .extract-content {
							height: 100%;
							margin-left: 115px;
							overflow: hidden;
							width: calc(100% - 115px);
						}
						.extract-webzine .extract-article .extract-thumb {
							width: 100px;
							height: 100px;
						}
					}	
				</style>
	
				<!-- 일반 게시판 형식으로 출력한다. -->
				<a href=""><h5>대회소식 +</h5></a>
				<ul class="extract-wrap extract-board">
												<li class="extract-article">
								<a href="" title="디비전리그">
									<div class="extract-content">
										<div class="extract-title ellipsis">디비전리그</div><span class="extract-title-arrow">＞</span>
										<div class="extract-date">2020.10.17 </div>
									</div>
								</a>
							</li>
							<li class="extract-article">
								<a href="" title="동작구청장배 탁구">
									<div class="extract-content">
										<div class="extract-title ellipsis">동작구청장배 탁구</div><span class="extract-title-arrow">＞</span>
										<div class="extract-date">2019.10.01 </div>
									</div>
								</a>
							</li>
							<li class="extract-article">
								<a href="" title="동작구청장배 탁구">
									<div class="extract-content">
										<div class="extract-title ellipsis">서초구청장배 탁구</div><span class="extract-title-arrow">＞</span>
										<div class="extract-date">2019.11.07 </div>
									</div>
								</a>
							</li>
				</ul>
<!--L_BBS_EXTRACT]]]-->
			</div>
		</div>
		<div class="whois-main-contents-area-box whois-main-contents-area-box-left-margin">
			<div class="whois-main-contents-area-box-inner">
                <a href="http://www.evensoft.com/sub02.html"><h5>고객센터 +</h5></a>
				<ul class="whois-main-contents-area-box-customer list-unstyled">
					<li><div class="whois-main-contents-area-box-customer-text">Address : (21666)서울특별시 동작구 동작대로 29길&nbsp;</div></li>
					<li><div class="whois-main-contents-area-box-customer-text">Email : <a href="jicheon@gmail.com">jicheon@gmail.com</a></div></li>
					<li><div class="whois-main-contents-area-box-customer-text">Tel : <a href="tel:02-8744-8724">010-8744-8724</a></div></li>
				</ul>
			</div>	
		</div>	
	</div>
</div><!--BODY]]]-->
		</section>
		<!--[[AREA_BODY_END]]-->

		<!--[[AREA_BOTTOM_START]]-->
		<footer class="footer text-center">
			<!--L_FOOTER[[[--><!-- Footer-copyright -->
<div class="footer-area">
	<p class="footer-info">
		서울특별시 동작구 동작대로29길<span> ｜ </span>
        이븐소프트 천지형<span> ｜ </span>
		Email : jichoun@gmail.com<span> ｜ </span>
		Tel : 010-8744-8724
	</p>
	<p>Copyright ⓒ EVENSOFT(이븐소포트) All rights reserved.</p>
</div><!--L_FOOTER]]]-->
		</footer>
		<!--[[AREA_BOTTOM_END]]-->

		<!-- Back to top -->
		<a href="http://www.evensoft.com/main.html" class="back-to-top" style="display: inline;"> <i> ＾</i> </a>

		<!-- SmoothScroll -->
		<script src="resources/file/SmoothScroll.js"></script>
		<!-- owl-carousel -->
		<script src="resources/file/owl.carousel.js"></script>
		<script type="text/javascript" src="resources/filejs/owl.carousel.js(1)"></script>
		 <!-- Video -->
		<script src="resources/file/jquery.mb.YTPlayer.js"></script>
		<!-- Counter-up -->
		<script src="resources/file/waypoints.min.js" type="text/javascript"></script>
		<!--popup js-->
		<script src="resources/file/jquery.magnific-popup.min.js" type="text/javascript"></script>
		<!-- Parallax -->
		<script src="resources/file/jquery.stellar.min.js"></script>
		<script type="text/javascript"> <!-- cross browser -->
		window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/60)}}());
		</script>
		<!-- Typed -->
		<script src="resources/file/typed.js" type="text/javascript"></script>
		<!-- Custom -->
		<script src="resources/file/app.js" type="text/javascript"></script>
	
<script type="text/javascript"> var isMain = true; </script><div style="display:none;"><</div></body></html>