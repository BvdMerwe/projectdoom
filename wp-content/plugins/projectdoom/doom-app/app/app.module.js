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

	//require("app-directives-shared-header");
	require("app-directives-preloader");
	require("app-directives-scrolltotop");
	require("app-directives-navigation");
	require("app-directives-carousel");
	require("app-directives-searchbar");
	require("app-directives-search");
	require("app-directives-footer");

	require("app-page-directives");
	//require("app-directives-shared-footer");

	// Load dependent modules
    var appDoom,
        domReady 		= require("domReady"),
		angular 		= require("angular");

	domReady( function () {

		/*
		 * UI MODULE
		 */
		appDoom = appDoom || angular.module( 'appDoom', [ 'appRoutes', 'appPageService', 'appInsectService', 'appProductService', 'appPackageService', 'appRetailerService', 'appFAQService', 'appSearchService', 'appDirectivePageHome', 'appDirectiveNavigation', 'appDirectiveCarousel', 'appDirectiveSearchBar', 'appDirectiveSearch', 'appDirectiveFooter', 'appDirectivePreloader', 'appDirectiveScrollToTop' ] );

		// BootStrap App!
		angular.bootstrap( window.document, ['appDoom'] );

	});

	exports.appDoom = appDoom;
});
