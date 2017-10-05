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

						<div data-ui-app-page-home page-name="home" class="page-content" flex-xs="100" flex="100"></div>
						<div data-ui-404 flex="100" class="" style="text-align:center;">
							<br /><br /><br /><br />
							<h1 flex="100" class="page-title" style="font-size:200px;">HOME</h1> 
							<br /><br /><br /><br />
							<p class="page-title" style="font-size:50px;">...right?</p>
						</div>

					</div>

					<!-- /HOME PAGE TEMPLATE HERE -->

					<!-- ABOUT PAGE TEMPLATE HERE 
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="about">

						<div data-ui-app-page-about page-name="about" class="page-content" flex-xs="100" flex="100" style="padding-bottom:0;"></div>

					</div>
					/ABOUT PAGE TEMPLATE HERE -->

					<!-- LEGAL PAGE TEMPLATE HERE 
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="legal">

						<div data-ui-app-page-legal page-name="legal" class="page-content" flex-xs="100" flex="100"></div>

					</div>
					/LEGAL PAGE TEMPLATE HERE -->

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

					<!-- FAQ PAGE TEMPLATE HERE 
					<div layout="column" class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-when="faq">

						<div data-ui-app-page-content page-name="faq" class="page-content" flex="100" class=""></div>

					</div>
					/FAQ PAGE TEMPLATE HERE -->

					<!-- CONTACT PAGE TEMPLATE HERE
					<div layout="column" class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-when="contact">

						<div data-ui-app-page-contact page-name="contact" class="page-content" flex-xs="100" flex="100"></div>

					</div>
					/CONTACT PAGE TEMPLATE HERE -->

					<!-- DEFAULT PAGE TEMPLATE HERE -->
					<div layout="column" layout-align="center center" layout-fill class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-default>

						<!-- <div data-ui-404 flex="100" class="" style="text-align:center;">
							<br /><br /><br /><br />
							<h1 flex="100" class="page-title" style="font-size:200px;">LOADING</h1>
							<br /><br /><br /><br />
							
							<p class="page-title" style="font-size:50px;">...</p>
						</div> -->
						<div style="padding-top: 90px;">
							<ui-randomstat duration="300"></ui-randomstat>
						</div>
					</div>
					<!--/DEFAULT PAGE TEMPLATE HERE -->

				</div>
			</div>

			<?php /**/?>

			<div  data-ui-footer layout="column" layout-align="start center" flex="100" style=""></div>

		</div>