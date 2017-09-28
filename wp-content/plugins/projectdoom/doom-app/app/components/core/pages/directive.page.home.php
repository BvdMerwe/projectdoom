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
		<div layout="row" layout-fill layout-xs="column" flex="100">
			<md-content class="md-padding" flex="100">
				<div layout="column" class="animate-page-switch-container" data-ng-switch="renderPath[0]" flex="100">

					<div layout="row" class="animate-page-switch" layout-xs="column" flex="100" data-ng-switch-when="home">
						
						<!-- HOMR PAGE TEMPLATE HERE -->
						<div flex="100"><h1>Home</h1></div>
						
					</div>

					<div layout="row" class="animate-page-switch" layout-xs="column" flex="100" data-ng-switch-when="about">
						
						<!-- ABOUT PAGE TEMPLATE HERE -->
						<div flex="100"><h1>About</h1></div>

						<div data-ui-navigation></div>

						<div data-ui-app-page-content page-name="about" page-columns="2" ></div>

						<div data-ui-footer></div>
						
					</div>

					<div layout="row" class="animate-page-switch" layout-xs="column" flex="100" data-ng-switch-when="legal">
						
						<!-- LEGAL TEMPLATE HERE -->	
						<div flex="100"><h1>Legal</h1></div>

						<div data-ui-navigation></div>

						<div data-ui-app-page-content page-name="legal" page-columns="1" ></div>

						<div data-ui-footer></div>
						
					</div>

					<div layout="row" class="animate-page-switch" layout-xs="column" flex="100" data-ng-switch-when="products">
						
						<!-- GALLERY PAGE TEMPLATE HERE -->
						<div data-ui-app-page-content page-name="products" page-columns="1" >

							<div data-ui-gallery 
								flex="100"
								isWidget        = "true"
								showTitle       = "true"
								showSubheader   = "true" 
								showDescription = "true"
								showButton      = "true"
								contentType     = "product"  
								sortBy="ASC" orderBy="post_title" 
								gridItemsDesktopWide="6" gridItemsDesktop="4" gridItemsMobile="2"></div>

						</div>
						
					</div> 

					<div layout="row" class="animate-page-switch" layout-xs="column" flex="100" data-ng-switch-when="faq">
						
						<!-- FAQ PAGE TEMPLATE HERE -->
						<div flex="100"><h1>FAQ</h1></div>

						<div data-ui-app-page-content page-name="faq" page-columns="1" ></div>
						
					</div>

					<div layout="row" class="animate-page-switch" layout-xs="column" flex="100" data-ng-switch-when="contact">
						<h1 flex="100">Contact</h1>
						<br /><br />
					</div>

					<div layout="row" class="animate-page-switch" layout-xs="column" flex="100" data-ng-switch-when="contact">
						
						
						<!-- CONTACT PAGE TEMPLATE HERE -->

						<div data-ui-navigation></div>

						<div data-ui-app-page-content page-name="contact" page-columns="1" >
							<div data-ui-form-contact flex="100"></div>
						</div>

						<div data-ui-footer></div>
						
					</div>
					
					<div layout="row" class="animate-page-switch" layout-xs="column" flex="100" data-ng-switch-default>
						<!-- 404 PAGE TEMPLATE HERE -->
						<div data-ui-404 flex="100">
							<h1 flex="100">404</h1>
							<h2>OOPS!</h2>
							<h3>IT LOOKS LIKE YOU FOUND A DEAD LINK</h3>
						</div>		
					</div>

				</div>
			</md-content>
		</div>