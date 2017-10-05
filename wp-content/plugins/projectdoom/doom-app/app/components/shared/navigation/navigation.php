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
				style="position: fixed;width:100%;height:100%;top:0;left:0;padding-top:10%;">
				<!--
				<div layout-padding layout="column" style="z-index:9;">
					<md-button data-ng-click="close()" class="md-primary close" style="color:#ffffff;">
					</md-button>
				</div>-->
				<div flex="100" layout-padding layout="row" layout-align="center start" style="padding:50px 100px">

					<!-- <div flex="70" layout-fill>
						<p>The <strong>fishmoths</strong> mutilating<br />the backside of your<br />undergarments are laying<span style="font-size:100px;"><br />2.5<br />EGGS<br /></span>a day in your home.</p>
					</div> -->
					<!-- <div data-ui-randomstat ></div> -->
					<div data-ui-randomstat duration="300" ></div>
					
					
					<div flex="30" layout-fill>
						<ul class="sm-padding">
							<li>
								<a href="javascript:;" title="" data-ng-click="goto('about')" name="about">About</a>
							</li>
							<li>
								<a href="javascript:;" title="" data-ng-click="goto('legal')" name="legal">Legal</a>
							</li>
							<li>
								<a href="javascript:;" title="" data-ng-click="goto('products')" name="products">Products</a>
								<ul>
									<li><a href="javascript:;" title="" data-ng-click="goto('products')" name="products">Flying Insects</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('products')" name="products">Crawling Insects</a></li>
								</ul>
							</li>
							<li>
								<a href="javascript:;" title="" data-ng-click="goto('insects')" name="insects">Pests</a>
								<ul>
									<li><a href="javascript:;" title="" data-ng-click="goto('ant')" name="insects-ants">Ants</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('cockroach')" name="insects-cockroaches">Cockroaches</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('fly')" name="insects-flies">Flies</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('mosquitoes')" name="insects-mosquitoes">Mosquitoes</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('flea')" name="insects-fleas">Fleas</a></li>
									<li><a href="javascript:;" title="" data-ng-click="goto('fishmoths')" name="insects-fishmoths">Fishmoths</a></li>
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
	<div layout="column" class="md-primary">
		<div layout="row" layout-xs="column" flex-xs="100">

			<div class="md-padding" flex="10" style="text-align:center;background-color:#14A774;z-index:99;max-width: 86px !important;">
				<md-button ng-click="toggleLeft()"
					class="md-primary md-icon-button hamburger-menu" aria-label="Site Menu">
					<md-icon style="padding-top:10px;">
							<span style=""></span>
							<span style=""></span>
							
					</md-icon>
				</md-button>
				<md-button data-ng-click="close()" class="md-primary close" style="color:#ffffff;"></md-button>
      		</div>

			<div class="md-padding" flex="80" flex-offset="5" layout="row" layout-align="center center" style="z-index:99;">
				<md-nav-bar 
					class="primary-navigation"
					md-selected-nav-item="currentNavItem"
					nav-bar-aria-label="navigation links">

						<md-nav-item hide-xs md-nav-click="goto('insects')" name="insects">
							PESTS
						</md-nav-item>
						<md-nav-item md-nav-click="goto('home')" name="home" style="z-index:9;">
							<img data-ng-src="https://www.tbwa-cdn.co.za/projectdoom/logo.png" class="" style="width:80px;" alt="DOOM" />
						</md-nav-item>
						<md-nav-item hide-xs md-nav-click="goto('products')" name="products">
							PRODUCTS
						</md-nav-item>

				</md-nav-bar>
				<div data-ng-transclude>
					
				</div>
            </div>
            <div class="md-padding" flex="10" layout="row" layout-align="end center">
				<div data-ui-search id="search-takeover"></div>
            </div>
        </div>
	</div>
