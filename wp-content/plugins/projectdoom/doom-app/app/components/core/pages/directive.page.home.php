<?php
/**
* Displays content for app front page
*
* @package WordPress
* @subpackage doom
* @since 1.0
* @version 1.0
*/
?>
		<div layout="column" layout-fill layout-xs="column" flex="100">

			<div data-ui-navigation flex="100"></div>

			<?php /**/?>
			
			<div flex="100" class="main-container" layout-fill style="max-width: 1366px; margin: 0 auto;">

				<div layout="column" class="animate-page-switch-container" data-ng-switch="renderPath[0]" flex="100">
	
					<!-- HOME PAGE TEMPLATE HERE -->
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="home">

						<div data-ui-app-page-pest-problem page-name="home" layout="column" layout-gt-sm="row" layout-align-gt-sm="start start" flex="100" class="page-content"></div>

					</div>

					<!-- /HOME PAGE TEMPLATE HERE -->

					<!-- ABOUT PAGE TEMPLATE HERE  -->
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="about">

						<!-- <div data-ui-app-page-about page-name="about" class="page-content" flex-xs="100" flex="100" style="padding-bottom:0;"></div> -->

					</div>
					<!-- /ABOUT PAGE TEMPLATE HERE -->

					<!-- LEGAL PAGE TEMPLATE HERE  -->
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="legal">

						<!-- <div data-ui-app-page-legal page-name="legal" class="page-content" flex-xs="100" flex="100"></div> -->

					</div>
					<!-- /LEGAL PAGE TEMPLATE HERE -->

					<!-- PRODUCTS PAGE TEMPLATE HERE -->
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="products">

						<div data-ui-app-page-products page-name="products" class="page-content" flex-xs="100" flex="100" style="padding-top:0;padding-bottom:0;"></div>	

					</div>
					<!-- /PRODUCTS PAGE TEMPLATE HERE -->

					<!-- INSECTS PAGE TEMPLATE HERE -->
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="insects">

						<div data-ui-app-page-insects page-name="insects" class="page-content" flex-xs="100" flex="100"></div>	

					</div>
					<!-- /INSECTS PAGE TEMPLATE HERE -->

					<!-- INSECTS PROFILE PAGE TEMPLATE HERE -->
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="profile">

						<div data-ui-app-page-profile page-name="insects-profile" class="page-content" flex-xs="100" flex="100"></div>	

					</div>
					<!-- /INSECTS PROFILE PAGE TEMPLATE HERE -->

					<!-- FAQ PAGE TEMPLATE HERE  -->
					<div layout="column" class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-when="faq">

						<!-- <div data-ui-app-page-content page-name="faq" class="page-content" flex="100" class=""></div> -->

					</div>
					<!-- /FAQ PAGE TEMPLATE HERE -->

					<!-- CONTACT PAGE TEMPLATE HERE -->
					<div layout="column" class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-when="contact">

						<!-- <div data-ui-app-page-contact page-name="contact" class="page-content" flex-xs="100" flex="100"></div> -->

					</div>
					<!-- /CONTACT PAGE TEMPLATE HERE -->
					<!-- INSECTS PROFILE PAGE TEMPLATE HERE -->
					<div layout="column" class="animate-page-switch md-accent" layout-align="center center" flex="100" data-ng-switch-when="404">
						
						<h1 flex="100" class="page-title stat " style="margin-top:15vh;font-size:80pt;">OOPS</h1>
						<br />
						<p class="page-404-description" style="font-size:16pt;">It looks like you found a dead link</p>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="4439.617 666.506 392.744 155.322" style="max-width:500px;margin:2em auto;">
							<defs>
								<style>
								.cls-1 {
									fill: #fff;
								}
								</style>
							</defs>
							<path id="Path_312" data-name="Path 312" class="cls-1" d="M393.944,121.94c-12.888,11.192-27.133,16.28-42.734,18.654-10.175,1.7-20.349,2.035-30.524,3.052-1.017,0-2.713-1.357-3.392-2.374a67.526,67.526,0,0,1-4.07-7.461c2.713,11.87,3.731,12.888,13.566,15.262,17.975,4.748,36.29,7.122,54.943,1.7a16.513,16.513,0,0,1,4.07-.339c-6.444,4.07-19.671,7.122-30.524,5.766-12.888-1.7-25.437-4.748-38.325-6.1-5.766-.678-6.783-3.052-8.14-7.8-2.035-6.444-5.426-12.21-8.818-18.654-8.818,7.122-16.958,14.923-28.15,14.923-11.192.339-20.01-4.748-26.454-14.245-11.531,6.444-23.4,10.514-36.29,10.853-12.21.339-22.045-3.392-27.472-15.6a35.365,35.365,0,0,1-21.028,8.818c-8.14.678-15.6-.339-20.349-8.479-5.766,15.262-16.28,25.776-31.2,30.524-6.1,2.035-13.227,2.374-19.671,2.035a180.52,180.52,0,0,1-27.133-4.07,43.164,43.164,0,0,1-22.724-13.227c-2.035-2.035-5.087-2.713-7.122-4.748-12.21-10.175-18.654-23.741-18.993-39.681,0-7.8,4.409-13.566,10.853-17.636,4.409-2.713,9.5-4.748,14.923-7.461C29.35,55.465,16.462,51.056,3.235,46.647c0-.678.339-1.017.339-1.7,1.7,0,3.392-.339,4.748.339,4.748,1.357,9.157,2.374,13.566,4.409A200.762,200.762,0,0,1,42.577,60.892c3.392,2.035,6.444,4.409,11.192,4.07,2.374,0,4.748,1.017,7.461,1.7C56.483,52.752,44.273,45.63,35.455,36.133,26.637,25.619,13.41,21.889,1.2,17.48c0-.678.339-1.017.339-1.7a20.857,20.857,0,0,1,4.748.339c4.748,1.357,9.5,3.052,14.245,4.748,15.6,5.087,27.472,15.6,37.986,27.472,4.409,5.087,8.818,10.514,13.227,15.6a10.307,10.307,0,0,0,2.374,1.7c9.157,2.713,18.654,4.409,27.472,7.8,7.461,3.052,13.566,2.374,20.349-2.035,4.409-2.713,9.836-4.07,14.923-6.1-1.357-.678-3.392-1.7-5.087-2.374a14.737,14.737,0,0,1-9.5-9.5c-.678-2.035-3.052-3.731-5.087-5.087-2.713-2.035-5.766-3.392-8.818-5.087l1.017-2.035c3.052,1.357,6.1,2.374,9.5,3.731-1.357-5.087-2.374-10.175-4.07-14.923-.678-1.7-2.713-3.052-4.07-4.07C100.234,18.836,89.72,12.053,79.206,5.27A29.778,29.778,0,0,0,81.919,2.9c6.783,4.07,13.227,8.818,20.349,12.21,14.584,6.444,23.741,16.958,26.793,32.559.339,1.7,2.035,3.392,3.392,4.409,4.409,3.052,8.818,6.444,13.566,8.818,5.427,2.713,11.192,4.409,16.28,7.122,4.07,2.035,7.461,5.427,10.853,8.479,1.7,1.357,2.374,3.731,3.731,5.427,2.374,2.713,5.087,3.052,8.479,2.374,6.1-1.017,12.549-1.017,18.654-1.357a29.174,29.174,0,0,1,5.427.339c-1.357-17.636,12.549-18.654,23.4-23.4a10.158,10.158,0,0,0,5.087-4.07c7.8-12.888,15.6-26.115,27.811-35.272C274.9,13.41,285.414,7.644,294.91,1.2l2.035,2.035c-1.018,1.357-1.357,3.392-2.713,4.07-6.1,3.392-12.549,6.1-16.958,11.871-2.035,2.713-5.087,4.748-7.8,6.783-10.514,7.8-17.636,16.28-23.063,29.168C258.281,40.2,274.9,32.4,292.2,24.941a23.082,23.082,0,0,0,1.017,4.07L292.2,27.993c-6.1,4.07-12.21,8.14-18.654,11.871-2.374,1.357-4.409,3.731-6.783,4.409-10.514,4.07-15.262,13.566-22.045,21.367-4.409,5.087-6.783,12.549-14.584,14.245-1.7.339-3.731,1.017-5.427,1.357-.678,4.409,1.357,6.1,5.427,7.8,6.783,3.052,11.192,8.818,12.888,17.3,1.357-1.7,2.035-2.374,2.374-3.392a73.031,73.031,0,0,1,34.255-30.524,9.9,9.9,0,0,1,3.052-.678c7.461-.339,13.227-3.052,17.975-9.157,1.7-2.374,5.766-3.052,8.818-4.748,3.392,3.392,2.713,7.461,2.713,11.871,0,3.392,1.018,6.783,1.018,10.175,0,5.766,1.017,11.531-.339,16.619-2.035,7.461-5.766,14.584-8.818,21.367,5.766,6.1,11.871,12.888,18.315,19.332,1.7,1.357,5.087,1.017,7.8,1.017,21.028,0,41.377-3.731,59.353-15.6A15.051,15.051,0,0,0,393.944,121.94Z" transform="translate(4438.417 665.306)"/>
						</svg>

					</div>

					<!-- DEFAULT PAGE TEMPLATE HERE -->
					<div layout="column" layout-align="center center" class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-default>
						<div id="preloader" flex="100" class="ng-animate" layout="row">
							<div flex style="text-align:center;" layout="column" layout-align="center center">
								<br /><br /><br /><br />
								<ui-randomstat flex="100" layout="column" layout-align="center center" duration="1000"></ui-randomstat>
								
								<h3 flex="100">Loading...</h3>
							</div>
						</div>
					</div>
					<!--/DEFAULT PAGE TEMPLATE HERE -->

				</div>
			</div>

			<?php /**/?>

			<div  data-ui-footer layout="column" layout-align="start center" flex="100" style=""></div>

		</div>