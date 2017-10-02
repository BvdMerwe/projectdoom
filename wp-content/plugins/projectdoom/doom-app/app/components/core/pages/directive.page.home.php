<?php
/**
* Displays content for app front page
*
* @package WordPress
* @subpackage Twenty_Seventeen
* @since 1.0
* @version 1.0
*/
?>
		<div layout="column" layout-fill layout-xs="column" flex="100">

			<div data-ui-navigation flex="100"></div>

			<?php /**/?>

			<md-content id="main-container"  flex="100" layout-fill>

				<div layout="column" class="animate-page-switch-container" data-ng-switch="renderPath[0]" flex="100">

					<!-- HOME PAGE TEMPLATE HERE -->
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="home">

						<div data-ui-app-page-home page-name="home" class="page-content" flex-xs="100" flex="100"></div>

					</div>

					<!-- /HOME PAGE TEMPLATE HERE -->


					<!-- PRODUCTS PAGE TEMPLATE HERE -->
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="products">

						<div data-ui-app-page-products page-name="products" class="page-content" flex-xs="100" flex="100"></div>

					</div>
					<!-- /PRODUCTS PAGE TEMPLATE HERE -->

					<!-- INSECTS PAGE TEMPLATE HERE -->
					<div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="insects">

						<div data-ui-app-page-insects page-name="insects" class="page-content" flex-xs="100" flex="100"></div>

					</div>
					<!-- /INSECTS PAGE TEMPLATE HERE -->

					

					<!-- DEFAULT PAGE TEMPLATE HERE -->
					<div style="padding-top: 90px;" layout="row" layout-align="space-around start" layout-fill class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-default>

						<!-- <div data-ui-404 flex="100" class="md-padding" style="text-align:center;">
							<br /><br /><br /><br />
							<h1 flex="100" class="page-title" style="font-size:200px;">OOPS!</h1>
							<br /><br /><br /><br />
							<p class="page-title" style="font-size:50px;">IT LOOKS LIKE YOU FOUND A DEAD LINK</p>
						</div> -->
					<!-- <div layout="row" layout-align="space-between start" style="padding-top: 90px;"> -->
						<div data-ui-randomstat duration="300" duration="0"></div>
						<div data-ui-randomstat timer="true" ></div>
					<!-- </div> -->
					</div>
					<!-- /DEFAULT PAGE TEMPLATE HERE -->

				</div>
			</md-content>

			<?php /**/?>

			<div data-ui-footer flex="100"></div>

		</div>
