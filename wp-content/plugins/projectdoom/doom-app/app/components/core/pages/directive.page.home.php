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
<div layout="row" class="animate-page-switch-container" data-ng-switch="renderPath[0]">
	<div layout="row" class="animate-page-switch" layout-xs="column" data-ng-switch-when="home">
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
			<md-content layout-padding="" layout-fill="" layout="row" layout-align="center center" style="padding:50px 100px">
				<h1>404</h1>
				<h2>OOPS!</h2>
				<h3>IT LOOKS LIKE YOU FOUND A DEAD LINK</h3>
				<!-- <div data-ui-randomstat duration="500"></div> -->
			</md-content>
		</div>
	</div>
</div>
</div>
<md-content layout-padding="" layout-fill="" layout="row" layout-align="center center" style="padding:50px 100px">
	<div data-ui-randomstat duration="500"></div>
	<div data-ui-randomstat timer="true" duration="10"></div>

	<!-- <div data-ui-randomstat duration="500"></div> -->
</md-content>
<!-- <md-content layout-padding="" layout-fill="" layout="row" layout-align="center center" style="padding:50px 100px">
	<div data-ui-configurator layout-fill flex pest="fly"></div>
</md-content> -->
<!-- <md-content layout-padding="" layout-fill="" layout="row" layout-align="center center" style="padding:50px 100px">
	<div data-ui-carousel
		single="true"
		needsCta="true"
		displayName="true"
		contentType="product"
		gutter="10px"
		maxAmount="10"
		maxHeight="300px"
		maxwidth="150px"></div>
</md-content> -->
	<!-- <div flex>Hello world</div>
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
	</div> -->


<div data-ui-footer id="footer"></div>
