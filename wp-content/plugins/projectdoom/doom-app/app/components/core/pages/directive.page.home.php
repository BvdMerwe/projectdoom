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
		<div layout="row" layout-fill layout-xs="column">
			<md-content class="md-padding">
				<div layout="column" class="animate-page-switch-container" data-ng-switch="renderPath[0]">
					<div layout="row" class="animate-page-switch" layout-xs="column" data-ng-switch-when="home">
						<div flex>Hello world</div>
					</div>
					<div layout="row" class="animate-page-switch" layout-xs="column" data-ng-switch-when="about">
						<div flex>about</div>
					</div>
					<div layout="row" class="animate-page-switch" layout-xs="column" data-ng-switch-when="legal">
						<div flex>legal</div>
					</div>
					<div layout="row" class="animate-page-switch" layout-xs="column" data-ng-switch-when="products">
						<div flex>products</div>
					</div>
					<div layout="row" class="animate-page-switch" layout-xs="column" data-ng-switch-when="faq">
						<div flex>faq</div>
					</div>
					<div layout="row" class="animate-page-switch" layout-xs="column" data-ng-switch-when="contact">
						<div flex>contact</div>
					</div>
					<div layout="row" class="animate-page-switch" layout-xs="column" data-ng-switch-default>
						<div flex data-ui-404>
							<h1>404</h1>
							<h2>OOPS!</h2>
							<h3>IT LOOKS LIKE YOU FOUND A DEAD LINK</h3>
						</div>
					</div>
				</div>
			</md-content>
		</div>


		<div layout="row" layout-wrap>
			<div class="md-padding" flex="50">
				<h2>retailers</h2>
				<div layout="column" layout-fill>
					<div data-ui-carousel contentType="retailer" maxAmount="10" maxHeight="100px" maxwidth="150px"></div>
				</div>
			</div>
			<div class="md-padding" flex="50">
				<h2>insects</h2>
				<div layout="column" layout-fill>
					<div data-ui-carousel contentType="insect" maxAmount="10" maxHeight="200px" maxwidth="150px"></div>
				</div>
			</div>
		</div>

<div data-ui-footer id="footer"></div>
