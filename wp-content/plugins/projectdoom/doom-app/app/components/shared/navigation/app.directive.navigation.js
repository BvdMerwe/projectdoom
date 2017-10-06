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
* @return Angular.module.appDirectiveNavigation
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
	require("angular-progress");
    require("angular-material");

	// Load dependent modules
	var appDirectiveNavigation,
		appConfig		= JSON.parse(require("text!../../app/app.config.json")),
        domReady 		= require("domReady"),
        isMobile 		= require("isMobile"),
		angular 		= require("angular");

	//
	var Application = Application || {};
	Application.Directives = {};

	Application.Directives.uiNavigation = function () {

		return {
			restrict: 		'AE',
			transclude: 	true, // pass entire template?
			templateUrl: 	appConfig.general.path+'app/components/shared/navigation/navigation.php',
			controller:  	[ '$scope', '$http', '$q', '$route', '$location', '$timeout', '$mdSidenav', '$log', 'transformRequestAsFormPost', 'Utils', 'ngProgress', function ( $scope, $http, $q, $route, $location, $timeout, $mdSidenav, $log, transformRequestAsFormPost, Utils, ngProgress ) {

				/** /
				$scope.$on( '$routeChangeSuccess', function(event, current) {
					$scope.currentLink = getCurrentLinkFromRoute(current);
				});
				/**/
				$scope.toggleLeft 	= buildDelayedToggler('left');

				$scope.goto = function ( page ) {

					Utils._strict( [ String ], arguments );

					//console.log( 'open page:', page );

					switch( page ) {

						case 'home':
							var pests = $route.current.locals.app_data.insects;
							var rand = Utils.getRandomInt(0,pests.length-1);
							$location.path("/insects/"+pests[rand].post_name);
							// $location.path('/');

							break;

						case 'insects':

							$location.path('/insects/flea');

							break;

						case 'ant':
						case 'fly':
						case 'flea':
						case 'fishmoth':
						case 'mosquito':
						case 'cockroach':

							$location.path('/insects/' + page );
							$location.path('/insects/' + page );
							$location.path('/insects/' + page );
							$location.path('/insects/' + page );
							$location.path('/insects/' + page );
							$location.path('/insects/' + page );

							break;

						case 'about':

							$location.path('/about');

							break;

						case 'legal':

							$location.path('/legal');

							break;

						case 'products':

							$location.path('/products');

							break;

						case 'products/category/flying':
						case 'products/category/crawling':

							$location.path(page);

							break;

						case 'faq':

							$location.path('/faq');

							break;

						case 'contact':

							$location.path('/contact');

							break;

						case '404':

							$location.path('/404');

							break;

						default:

							$location.path('/404');

							console.error( 'Biaytch!');

							break;

					}

					this.close();

				};

				$scope.close = function () {
					// Component lookup should always be available since we are not using `ng-if`

					document.body.classList.remove('super-menu-open');
					$mdSidenav('left').close()
					  .then(function () {
						$log.debug("close LEFT is done");
					  });
				};

				/**
				 * Supplies a function that will continue to operate until the
				 * time is up.
				 */
				function debounce(func, wait, context) {
					var timer;
					return function debounced() {
						var context = $scope,
							args = Array.prototype.slice.call(arguments);
						$timeout.cancel(timer);
						timer = $timeout(function() {
							timer = undefined;
							func.apply(context, args);
						}, wait || 10);
					};
	  			}

				/**
				 * Build handler to open/close a SideNav; when animation finishes
				 * report completion in console
				 */
				function buildDelayedToggler(navID) {
					return debounce(function() {

						document.body.classList.add('super-menu-open');
						// Component lookup should always be available since we are not using `ng-if`
						$mdSidenav(navID)
							.toggle()
							.then(function () {
							$log.debug("toggle " + navID + " is done");
							});
					}, 200);
				}

				function onScroll($event) {
					var newPos = document.body.scrollTop;
					var goingDown = false;
					if (newPos > oldPos) {
						goingDown = true;
					} else if (newPos < oldPos) {
						goingDown = false;
					}
					var a = document.body.querySelector(".nav-nav");
					var elm = angular.element(a);
					if (goingDown && newPos > 81) {
						elm.removeClass("in");
					} else {
						elm.addClass("in");
					}
					oldPos = newPos;
				}
				function cleanUp() {
					angular.element(container).off('scroll', onScroll);
				}
				var container = document;
				var oldPos = 0;
				angular.element(container).on('scroll', onScroll);
				$scope.$on('$destroy', cleanUp);

				//console.log('waddup from navigation');

				$scope.$on('$routeChangeSuccess', function(){
					$scope.close();
				});

			}]
		};

	};

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectiveNavigation = appDirectiveNavigation || angular.module( 'appDirectiveNavigation', [ 'appUtils', 'appXHR', 'ngMaterial', 'ngProgress' ] );

		appDirectiveNavigation
			.directive( Application.Directives );


	});

	exports.appDirectiveNavigation = appDirectiveNavigation;
});
