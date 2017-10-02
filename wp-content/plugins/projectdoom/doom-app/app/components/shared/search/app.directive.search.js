/**
* @public
*
*
* @App Dependencies [xhr, utils, memcache, routes, sessionservice, domReady]

* General-purpose Event binding. Bind any event not natively supported by Angular
* Pass an object with keynames for events to ui-event
* Allows $event object and $params object to be passed
*
* @example <input ui-event="{ focus : 'counter++', blur : 'someCallback()' }">
* @example <input ui-event="{ myCustomEvent : 'myEventHandler($event, $params)'}">
*
* @param ui-event {string|object literal} The event to bind to as a string or a hash of events with their callbacks
*
* @return Angular.module.appDirectiveSearch
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

	require("app-xhr");
	require("app-utils");
	require("app-retailer");
	require("app-product");
	require("app-faq");
	require("app-package");
	require("app-insect");
	require("angular-progress");
  require("angular-material");

	// Load dependent modules
	var appDirectiveSearch,
				appConfig		= JSON.parse(require("text!../../app/app.config.json")),
        domReady 		= require("domReady"),
        isMobile 		= require("isMobile"),
				angular 		= require("angular");

	//
	var Application = Application || {};
	Application.Directives = {};

	Application.Directives.uiSearch = function () {

		return {
			restrict: 		'AE',
			transclude: 	true, // pass entire template?
			templateUrl: 	appConfig.general.path+'/app/components/shared/search/search.php',
			scope: {

	    },
			link: function (scope, element, attrs, controller) {

        scope.in = false;
        /************************************
        *	Search Button click event
        ************************************/
        var actionBtn = element.find('button');
        actionBtn.on('click', function($event){
          // $event.target.removeClass('lnr-magnifier');
          // $event.target.addClass('lnr-cross');
          scope.isOpen = !scope.isOpen;
          scope.$digest();
        });
        scope.$watch('isOpen', function(){
          if (scope.isOpen) {
						document.body.classList.add('super-search-open');
            element.addClass('open');
            scope.in = true;
          } else {
						document.body.classList.remove('super-search-open');
            element.removeClass('open');
            scope.in = true;
          }
          setTimeout(function(){
            scope.in = false;
          }, 1000)
        });
			},
			controller:  	[ '$scope', '$http', '$q', '$route', '$location', '$timeout',	'$mdSidenav', '$log', '$filter', 'transformRequestAsFormPost', 'Utils', 'ngProgress', 'searchManager', 'retailersManager', 'productsManager', 'insectsManager', 'packagesManager', function ( $scope, $http, $q, $route, $location, $timeout, $mdSidenav, $log, $filter, transformRequestAsFormPost, Utils, ngProgress, searchManager, retailersManager, productsManager, insectsManager, packagesManager ) {
        $scope.isOpen = false;

			}],
      // controllerAs: 'vm',
		};

	};

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectiveSearch = appDirectiveSearch || angular.module( 'appDirectiveSearch', [ 'appUtils', 'appXHR', 'ngMaterial', 'ngProgress' ] );

		appDirectiveSearch
			.directive( Application.Directives );


	});

	exports.appDirectiveSearch = appDirectiveSearch;
});
