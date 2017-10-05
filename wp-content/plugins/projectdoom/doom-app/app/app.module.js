/**
* @public
*
*
* @App Dependencies [ angular-aria, faqs, pages, insects, products, packages, retailers, domReady ]
*
* @return Application.object
*
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*	http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
define( function ( require, exports, module ) {

    'use strict';

    require("app-faq");
	require("app-page");
	require("app-routes");
    require("app-insect");
    require("app-product");
    require("app-package");
	require("app-retailer");
	require("app-search");
	//require("angular-gmaps");
	require("angular-material");
	require("angular-accordion");

	//require("app-directives-shared-header");
	require("app-directives-preloader");
	require("app-directives-scrolltotop");
	require("app-directives-navigation");
	require("app-directives-carousel");
	require("app-directives-searchbar");
	require("app-directives-search");

	require("app-directives-configurator");
	require("app-directives-randomstat");

	require("app-directives-gallery");
	require("app-directives-contactform");

	require("app-page-directives");

	require("app-directives-footer");
	//require("app-directives-shared-footer");

	// Load dependent modules
    var appDoom,
        domReady 		= require("domReady"),
		angular 		= require("angular");

	domReady( function () {

		/*
		 * UI MODULE
		 */
		appDoom = appDoom || angular.module( 'appDoom', [ 'ngMaterial', 'angAccordion', 'appRoutes', 'appPageService', 'appInsectService', 'appProductService', 'appPackageService', 'appRetailerService', 'appFAQService', 'appSearchService', 'appDirectivePageHome', 'appDirectiveNavigation', 'appDirectiveCarousel', 'appDirectiveGallery', 'appDirectiveSearchBar', 'appDirectiveSearch', 'appDirectiveFormContact', 'appDirectivePreloader', 'appDirectiveScrollToTop', 'appDirectiveConfigurator', 'appDirectiveRandomstat', 'appDirectiveFooter' ] );

		appDoom.config( [ '$mdThemingProvider', function ( $mdThemingProvider ) {

				//$mdThemingProvider.theme('default');
				/*** /
				//$mdThemingProvider.theme('doomgreen');

				$mdThemingProvider.definePalette('doomgreen', {
					'50': 'e3f4ee',
					'100': 'b9e5d5',
					'200': '8ad3ba',
					'300': '5bc19e',
					'400': '37b489',
					'500': '14a774',
					'600': '129f6c',
					'700': '0e9661',
					'800': '0b8c57',
					'900': '067c44',
					'A100': 'aaffd2',
					'A200': '77ffb7',
					'A400': '44ff9c',
					'A700': '2bff8f',
					'contrastDefaultColor': 'light',
					'contrastDarkColors': [
					  '50',
					  '100',
					  '200',
					  '300',
					  '400',
					  'A100',
					  'A200',
					  'A400',
					  'A700'
					],
					'contrastLightColors': [
					  '500',
					  '600',
					  '700',
					  '800',
					  '900'
					]
				});

				$mdThemingProvider.definePalette('doomorange', {
					'50': 'ffeae2',
					'100': 'ffcbb6',
					'200': 'ffa885',
					'300': 'ff8554',
					'400': 'ff6b30',
					'500': 'ff510b',
					'600': 'ff4a0a',
					'700': 'ff4008',
					'800': 'ff3706',
					'900': 'ff2703',
					'A100': 'ffffff',
					'A200': 'fff3f2',
					'A400': 'ffc6bf',
					'A700': 'ffaea6',
					'contrastDefaultColor': 'light',
					'contrastDarkColors': [
					  '50',
					  '100',
					  '200',
					  '300',
					  '400',
					  'A100',
					  'A200',
					  'A400',
					  'A700'
					],
					'contrastLightColors': [
					  '500',
					  '600',
					  '700',
					  '800',
					  '900'
					]
				});
				/**/

				//$mdThemingProvider.theme('green');
				//$mdThemingProvider.setDefaultTheme('doomgreen');
				//$mdThemingProvider.theme('doomgreen');
				// $mdThemingProvider.setDefaultTheme('none');
				$mdThemingProvider.disableTheming();
				
				/** /
				.dark-primary-color    { background: #388E3C; }
				.default-primary-color { background: #4CAF50; }
				.light-primary-color   { background: #C8E6C9; }
				.text-primary-color    { color: #FFFFFF; }
				.accent-color          { background: #8BC34A; }
				.primary-text-color    { color: #212121; }
				.secondary-text-color  { color: #757575; }
				.divider-color         { border-color: #BDBDBD; }
				/**/

				/*** /
				$mdThemingProvider.definePalette('doomPalette', {
					'default': '#388E3C',
					'hue-1': '#4CAF50', 
					'hue-2': '#C8E6C9',
					'hue-3': '#8BC34A' 
				});
				/** /

				$mdThemingProvider.accentPalette('doomPalette', {
					'default': '#8BC34A'
					
				});
				/**/
			
			}
		]);
		// BootStrap App!
		angular.bootstrap( window.document, ['appDoom'] );

	});

	exports.appDoom = appDoom;
});
