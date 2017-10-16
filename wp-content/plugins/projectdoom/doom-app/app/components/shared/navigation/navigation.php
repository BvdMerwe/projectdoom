<?php
/**
 * Displays for app navigation
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>

	<div data-ng-transclude>
	<!-- md-is-locked-open="$mdMedia('gt-md')" -->
		<md-sidenav
				layout-fill
				class="md-sidenav-left super-menu"
				md-component-id="left"
				md-whiteframe="4"
				layout="row"
				layout-align="space-between start"
				style="position: fixed;width:100%;height:100%;top:0;left:0;padding:80px 0 40px;">
				<!--
				<div layout="column" style="z-index:9;">
					<md-button data-ng-click="close()" class="md-primary close" style="color:#ffffff;">
					</md-button>
				</div>-->
				<div flex="100" layout="row" layout-fill layout-align="space-around start" class="side-nav-container">

					<!-- <div flex="70" layout-fill>
						<p>The <strong>fishmoths</strong> mutilating<br />the backside of your<br />undergarments are laying<span style="font-size:100px;"><br />2.5<br />EGGS<br /></span>a day in your home.</p>
					</div> -->
					<!-- <div data-ui-randomstat ></div> -->
					<div hide-xs data-ui-randomstat duration="300" ></div>
					
					
					<div flex="100" flex-gt-sm="30" layout-fill>
						<ul class="sm-padding mobi-menu-list">
							<li>
								<a href="javascript:;" title="" data-ng-click="goto('about')" name="about">About</a>
							</li>
							<li> 
								<a href="javascript:;" title="" data-ng-click="goto('legal')" name="legal">Legal</a>
							</li>
							<li>
								<a href="javascript:;" title="" data-ng-click="goto('products')" name="products">Products</a>
								<ul>
									<li><a href="javascript:;" title="" data-ng-click="goto('products/category/flying')" name="products">Flying Insects</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('products/category/crawling')" name="products">Crawling Insects</a></li>
								</ul>
							</li>
							<li>
								<a href="javascript:;" title="" data-ng-click="goto('insects')" name="insects">Pests</a>
								<ul>
									<li><a href="javascript:;" title="" data-ng-click="goto('ant')" name="insects-ants">Ants</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('cockroach')" name="insects-cockroaches">Cockroaches</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('fly')" name="insects-flies">Flies</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('mosquito')" name="insects-mosquitoes">Mosquitoes</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('flea')" name="insects-fleas">Fleas</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('fishmoth')" name="insects-fishmoths">Fishmoths</a></li>
								</ul>
							</li>
							<li>
								<a href="javascript:;" title="" data-ng-click="goto('faq')" name="faq">FAQ</a>
							</li>
							<li>
								<a href="javascript:;" title="" data-ng-click="goto('contact')" name="contact">Contact</a>
							</li>
						</ul>

					</div>
				</div>

		</md-sidenav>
	</div>
	<div layout="column" class="nav-nav in clear md-primary">
		<div layout="row" layout-align="space-between center" flex-xs="100">

			<div class="md-padding" style="text-align:center;background-color:#00833D;width: 80px;height: 80px;">
				<md-button ng-click="toggleLeft()" aria-label="Open Menu"
					class="md-primary md-icon-button hamburger-menu" aria-label="Site Menu">
					<md-icon style="padding-top:10px;">
							<span style=""></span>
							<span style=""></span>
							
					</md-icon>
				</md-button>
				<md-button aria-label="Close Menu" data-ng-click="close()" class="md-primary close" style="color:#ffffff;"></md-button>
      		</div>

			<div class="md-padding" layout="row" layout-align="center center" style="z-index:99;">
				<md-nav-bar 
					class="primary-navigation"
					md-selected-nav-item="currentNavItem"
					nav-bar-aria-label="navigation links">

						<md-nav-item hide-xs md-nav-click="goto('pests')" name="insects" aria-label="Insects">
							PESTS
						</md-nav-item>
						<md-nav-item md-nav-click="" md-no-ink-bar="true" disabled="true" name="home" style="z-index:9;" aria-label="DOOM Home">
							<img data-ng-src="https://www.tbwa-cdn.co.za/projectdoom/logo.png" class="" style="width:80px;" alt="DOOM" />
						</md-nav-item>
						<md-nav-item hide-xs md-nav-click="goto('products')" name="products" aria-label="Products">
							PRODUCTS
						</md-nav-item>

				</md-nav-bar>
				<div data-ng-transclude>
					
				</div>
            </div>
            <div class="md-padding" layout="row" layout-align="center center" style="width:80px;height80px;">
				<div data-ui-search id="search-takeover" layout-fill></div>
            </div>
        </div>
	</div>
