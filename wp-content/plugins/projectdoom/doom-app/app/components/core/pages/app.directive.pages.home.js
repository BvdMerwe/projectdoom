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
* @return Angular.module.appPageService
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
	require("app-filters");
    require("app-memcache");
	require("app-routes");
	require("angular-route");
    require("angular-material");
    require("app-sessionservice");

	// Load dependent modules
	var appDirectivePageHome,
		appConfig		= JSON.parse(require("text!../../app/app.config.json")),
		domReady 		= require("domReady"),
		angular 		= require("angular");

	//
	var Application = Application || {};
	Application.Directives = {};
	Application.Controllers = {};

	Application.Controllers.pagesController =  [ '$rootScope', '$scope', '$http', '$q', '$route', '$location', '$timeout', 'transformRequestAsFormPost', 'Utils', 'MemCache', function ( $rootScope, $scope, $http, $q, $route, $location, $timeout, transformRequestAsFormPost, Utils, MemCache ) {

		var inputMsgTimeout,
		inputValidationTimeout;

		$scope.currentInsect;

		$scope.pageContent = {};

		$scope.$on( '$destroy', function(evt, data) {

			inputMsgTimeout  = null;
			inputValidationTimeout  = null;

		});

		$scope.$on( "$routeChangeStart", function( ev, to, toParams, from, fromParams ){
			
			$scope.pageContent = {};
			
		});

		$scope.goto = function (path) {
			$location.path(path);
		}

		$scope.scrollTo = function(id) {
				// console.log(document.querySelector(id));
			var to = document.querySelector(id).offsetTop;
			// Utils.scrollTo(document,to, 300);
			window.scrollTo(0, to)
		}

		/***/
		$scope.$on( "$routeChangeSuccess", function( ev, to, toParams, from, fromParams ){
			if (to.$$route.action == "home") {
				var pests = $route.current.locals.app_data.insects;
				var rand = Utils.getRandomInt(0,pests.length-1);
				$location.path("/insects/"+pests[rand].post_name);
			}
			//console.log(ev, to, toParams, from, fromParams);

			//$scope.currentInsect = {};

			_ini();

			//console.log( 'App interface ready...', $scope );

			//$scope.renderPath = $rootScope.renderPath;

			//console.log('App interface ready...', $route.current.locals.app_data );
			/*** /
			if( angular.isDefined($route.current.locals.app_data) ) {

				dataInitialise('taxonomy').then( function(results){

						console.log('Activity Data: ', $route.current.locals.app_data, results );

						$scope.pageContent = results[0];

					}, function(error) {

						console.error(error);
					}
				);
			}/**/

		});
		/***/

		$scope.nextInsect = function () {

			//var currentSect = getCurrentNextInsect();

			getCurrentNextInsect();

			console.log( 'open next insect page:', $scope.currentInsect );

			$location.path( '/insects/' + $scope.pageContent.post_name );
			
		};

		$scope.prevInsect = function () {

			getCurrentPrevInsect();

			console.log( 'open prev insect page:', $scope.currentInsect );

			$location.path( '/insects/' + $scope.pageContent.post_name );

			//$location.path( '/insects/' + page );

		};

		$scope.nextProduct = function () {

			//var currentSect = getCurrentNextInsect();

			getCurrentNextProduct();

			console.log( 'open next product page:', $scope.currentInsect );

			$location.path( '/products/' + $scope.pageContent.post_name );
			
		};

		$scope.prevProduct = function () {

			getCurrentPrevProduct();

			console.log( 'open prev product page:', $scope.currentInsect );

			$location.path( '/products/' + $scope.pageContent.post_name );

			//$location.path( '/insects/' + page );

		};

		$scope.filterProducts = function( category ) {

			Utils._strict( [ String ], arguments );

			console.log( 'open filtered product page:', $scope.currentInsect );

			$location.path( '/products/' + category );

		}

		function getCurrentNextInsect() {

			if( angular.isDefined( $route.current.locals.app_data.insects ) ) {

				var array = $route.current.locals.app_data.insects;
				
				for (var index = 0; index < array.length; index++) {
					var element = array[index];

					if( element.post_name == $route.current.pathParams.ID  ) {

						if( angular.isDefined( array[index + 1]) ) {

							$scope.pageContent = array[index + 1];

							console.log('next insect:', $scope.pageContent);

						} else if( angular.isDefined( array[0]) ) {

							$scope.pageContent = array[0];

							console.log('reset insect:', $scope.pageContent);

						}

						break;

					}
					
				}

			}

		}

		function getCurrentPrevInsect() {

			if( angular.isDefined( $route.current.locals.app_data.insects ) ) {

				var array = $route.current.locals.app_data.insects;
				
				for (var index = 0; index < array.length; index++) {
					var element = array[index];

					if( element.post_name == $route.current.pathParams.ID  ) {

						if( angular.isDefined( array[index - 1]) ) {

							$scope.pageContent = array[index - 1];

							console.log('prev insect:', $scope.pageContent);

						} else if( angular.isDefined( array[(index.length) - 1]) ) {

							$scope.pageContent = array[(index.length) - 1];

							console.log('last insect:', $scope.pageContent);

						}

						break;

					}
					
				}

			}

		}

		function getCurrentNextProduct() {

			if( angular.isDefined( $route.current.locals.app_data.products ) ) {

				var array = $route.current.locals.app_data.products;
				
				for (var index = 0; index < array.length; index++) {
					var element = array[index];

					if( element.post_name == $route.current.pathParams.ID  ) {

						if( angular.isDefined( array[index + 1]) ) {

							$scope.pageContent = array[index + 1];

							console.log('next product:', $scope.pageContent);

						} else if( angular.isDefined( array[0]) ) {

							$scope.pageContent = array[0];

							console.log('reset product:', $scope.pageContent);

						}

						break;

					}
					
				}

			}

		}

		function getCurrentPrevProduct() {

			if( angular.isDefined( $route.current.locals.app_data.products ) ) {

				var array = $route.current.locals.app_data.products;
				
				for (var index = 0; index < array.length; index++) {
					var element = array[index];

					if( element.post_name == $route.current.pathParams.ID  ) {

						if( angular.isDefined( array[index - 1]) ) {

							$scope.pageContent = array[index - 1];

							console.log('prev product:', $scope.pageContent);

						} else if( angular.isDefined( array[(index.length) - 1]) ) {

							$scope.pageContent = array[(index.length) - 1];

							console.log('last product:', $scope.pageContent);

						}

						break;

					}
					
				}

			}

		}

		function dataInitialise( type ) {

			Utils._strict( [ String ], arguments );

			var request 	= '',
				deferred 	= $q.defer();

			switch( type ) {

				case 'faq':
				case 'taxonomy':

					request = type;

					break;

				default:

					throw '!?!#$';

					break;
			}

			$http({
				method: 'GET',
				url: appConfig.general.api + request,
				transformRequest: transformRequestAsFormPost
			})
			.success( function(data, status) {

				deferred.resolve( data );

			})
			.error( function(data, status) {

				console.error("dataInitialise Request failed:", data);

				deferred.reject( data );

			});

			return deferred.promise;

		}

		function getPageContent( cola ) {

			Utils._strict( [ Array ], arguments );

			for (var index = 0; index < cola.length; index++) {
				
				if( $rootScope.isProductPage || $rootScope.isInsectPage ) {

					if( cola[index].post_name == $route.current.pathParams.ID ) {
						
						return cola[index];

					}

				} else {

					if( cola[index].post_name == $route.current.$$route.action ) {
						
						return cola[index];
						//$scope.pageContent =cola[index];
						//console.log('Activity Data: ', $scope.pageContent );
						//break;
					}

				}
				
			}

		}

		function _ini() {

			if( angular.isDefined($route.current.locals.app_data) ) {

				
				//MemCache.dataTaxonomy().then( function(results){

					console.log('Activity Data: ', $route.current.locals.app_data, $scope.pageContent, $route.current.pathParams.ID );

						if( $rootScope.isProductPage ) {

							$scope.pageContent = getPageContent( $route.current.locals.app_data.products ); //$route.current.locals.app_data.pagecontent[0];

						} else if( $rootScope.isInsectPage ) {

							$scope.currentInsect = $route.current.pathParams.ID;

							$scope.pageContent = getPageContent( $route.current.locals.app_data.insects ); //$route.current.locals.app_data.pagecontent[0];

						} else {

							$scope.pageContent = getPageContent( $route.current.locals.app_data.pagecontent ); //$route.current.locals.app_data.pagecontent[0];

						}

						//$scope.pageContent = getPageContent( $route.current.locals.app_data.pagecontent ); //$route.current.locals.app_data.pagecontent[0];

						//console.log('Activity Data: ', $scope.pageContent );

						//console.log('Activity Data: ', $route.current.locals.app_data, $scope.pageContent, $route.current.pathParams.ID );
					
					/** * /
					}, function(error) {

						console.error(error);
					}
					

				);
				/***/
			}

		}

		_ini();

		console.info('Page Controller Ready.');

	}];

	Application.Directives.uiCollapser = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			template: 		'<div data-ng-transclude></div>',
			link: 			function( scope, element, attrs ) {

				var link = element[0];

				var targetCollapse,
					parentRef,
					parentElem;
				

				function toggleClasses() {

					targetCollapse 	= link.getAttribute('data-target');
					parentRef 		= link.getAttribute('data-parent');
					parentElem 		= document.querySelector(parentRef);

					var currentOpenTab 	= parentElem.querySelector('.collapse.in');

					if( currentOpenTab == null ) {

						var tobeOpenedTab = parentElem.querySelector(targetCollapse);

						if( currentOpenTab === tobeOpenedTab ) {} else {

							tobeOpenedTab.classList.add('in');

						}

					} else {

						currentOpenTab.classList.remove('in');

						// ADD IN TO THE RIGHT ONE

						var tobeOpenedTab = parentElem.querySelector(targetCollapse);

						if( currentOpenTab === tobeOpenedTab ) {} else {

							tobeOpenedTab.classList.add('in');

						}

					}

				};

				/** /
				function _theRightOne() {

					targetCollapse 	= link.getAttribute('data-target');
					parentRef 		= link.getAttribute('data-parent');
					parentElem 		= document.querySelector(parentRef);

					var currentOpenTab 	= parentElem.querySelector('.collapse.in');

					var tobeOpenedTab = parentElem.querySelector(targetCollapse);

					if( currentOpenTab === tobeOpenedTab ) {} else {

						tobeOpenedTab.classList.add('in');

					}

				};/**/

				domReady( function () {

					link.addEventListener( 'click', function(evt) {

						toggleClasses();

					})

				});

			}
		}

	};

	Application.Directives.uiHeroInsect = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			template: 		'<div data-ng-transclude></div>',
			controller:		Application.Controllers.pagesController,
			link: 			function( scope, element, attrs ) {

				var link = element[0];

				var targetCollapse,
					parentRef,
					parentElem;
				

				function toggleClasses() {

					targetCollapse 	= link.getAttribute('data-target');
					parentRef 		= link.getAttribute('data-parent');
					parentElem 		= document.querySelector(parentRef);

					var currentOpenTab 	= parentElem.querySelector('.collapse.in');

					if( currentOpenTab == null ) {

						var tobeOpenedTab = parentElem.querySelector(targetCollapse);

						if( currentOpenTab === tobeOpenedTab ) {} else {

							tobeOpenedTab.classList.add('in');

						}

					} else {

						currentOpenTab.classList.remove('in');

						// ADD IN TO THE RIGHT ONE

						var tobeOpenedTab = parentElem.querySelector(targetCollapse);

						if( currentOpenTab === tobeOpenedTab ) {} else {

							tobeOpenedTab.classList.add('in');

						}

					}

				};

				

				domReady( function () {

					link.addEventListener( 'click', function(evt) {

						//toggleClasses();

					})

				});

			}
		}

	};

	Application.Directives.uiAppActivity = function () {

		return {
			restrict: 		'AE',
			//scope: 			{},
			transclude: 	true,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.home.php',
			/**/
			controller:  	[ '$location', '$rootScope', '$scope', '$http', '$q', '$route', '$timeout', 'transformRequestAsFormPost', 'Utils', function ( $location, $rootScope, $scope, $http, $q, $route, $timeout, transformRequestAsFormPost, Utils ) {

				var inputMsgTimeout,
					inputValidationTimeout;

				//$scope.pageContent = {};
				$scope.sendTestEvent = function (event, data) {
					$rootScope.$broadcast('$testEvent', event);
				}
				$scope.$on( '$destroy', function(evt, data) {
		
					inputMsgTimeout  = null;
					inputValidationTimeout  = null;
		
				});
				$scope.$on( '$destroy', function(evt, data) {

					inputMsgTimeout  = null;
					inputValidationTimeout  = null;

				});
				if ($location.$$path == "/" && angular.isDefined($route.current.locals)) {
					var pests = $route.current.locals.app_data.insects;
					var rand = Utils.getRandomInt(0,pests.length-1);
					$location.path("/insects/"+pests[rand].post_name);
				}
				

				/** /
				$rootScope.$on( "projects", function( type, data ){

					console.log('PROJECTS MANAGER LISTENER:', data );

						switch(data.type) {

							case 'new':

								//$scope.projects.push(data.data);

								break;

							case 'remove':

								//$scope.projects.push(data.data);

								break;

						}

				});
				/***/

				$scope.$on( "$routeChangeSuccess", function( ev, to, toParams, from, fromParams ){

					//console.log(ev, to, toParams, from, fromParams);

					//console.log( 'App interface ready...', $scope );

					$scope.renderPath = $rootScope.renderPath;

					//console.log('App interface ready...', $route.current.locals.app_data );
					/** * /
					if( angular.isDefined($route.current.locals.app_data) ) {

						dataInitialise('taxonomy').then( function(results){

								console.log('Activity Data: ', $route.current.locals.app_data, results );

								$scope.pageContent = results[0];

							}, function(error) {

								console.error(error);
							}
						);
					}/**/

				});

				$scope.$on( 'data-filter', function(evt, data) {

					console.log('Table Templates filter[' + data.type + ']',  data );

					var new_array = [];

					switch( data.type ) {

						case 'occupation':

							var index = filter_param_occupation.indexOf(data.data);

							if( index == -1 ) {

								filter_param_occupation.push(data.data);

							} else {

								filter_param_occupation.splice(index, 1);

							}

							break;

						case 'department':

							var index = filter_param_department.indexOf(data.data);

							if( index == -1) {

								filter_param_department.push(data.data);

							} else {

								filter_param_department.splice(index, 1);

							}

							break;

					}

					for (var i = 0; i < $route.current.locals.hse_data.equipment.length; i++) {

						if( angular.isDefined($route.current.locals.hse_data.equipment[i]) ) {

							var errors = [];

							if( filter_param_occupation.length == 0 ) {} else {

													if( $route.current.locals.hse_data.equipment[i].occupations !== null ) {

														var error_microStation = [];

														for (var j = 0; j < filter_param_occupation.length; j++) {

															if( angular.isDefined($route.current.locals.hse_data.equipment[i].occupations[j]) ) {

																if( $route.current.locals.hse_data.equipment[i].occupations[j].occupationID == filter_param_occupation[j] ) {

																	//console.log('nailed!', new_array);
																	//new_array.push($route.current.locals.hse_data.equipment[i]);

																	error_microStation.push(false);

																	break;

																} else {
																	//console.log('not nailed');
																	error_microStation.push(true);

																}

															}

														};

														if( error_microStation.indexOf(false) == -1 ) {

															errors.push(true);

														} else {

															errors.push(false);

														}

													} else {

														errors.push(true);
													}

							}

							if( filter_param_department.length == 0 ) {} else {

								if( $route.current.locals.hse_data.equipment[i].departmentID !== null ) {

										var error_microStation = [];

										for (var j = 0; j < filter_param_department.length; j++) {

											if( $route.current.locals.hse_data.equipment[i].departmentID == filter_param_department[j] ) {

												//console.log('nailed!', new_array);
												//new_array.push($route.current.locals.hse_data.equipment[i]);

												error_microStation.push(false);

												break;

											} else {
												//console.log('not nailed');
												error_microStation.push(true);

											}

										}

										if( error_microStation.indexOf(false) == -1 ) {

											errors.push(true);

										} else {

											errors.push(false);

										}

									} else {

										errors.push(true);
									}

								}

							var index = errors.indexOf(true);

							if( index == -1 ) {

								new_array.push($route.current.locals.hse_data.equipment[i]);

							}

						}

					}

					var timeDone = new Date().getTime();

					console.log('filtration time:', ( timeDone - data.time) / 1000, new_array, {
						'occupation': filter_param_occupation,
						'department': filter_param_department
					});

					if( filter_param_department.length == 0 && filter_param_occupation.length == 0 ) {

						//reset data
						$scope.hse_equipment = $route.current.locals.hse_data.equipment;

					} else {

						$scope.hse_equipment =  $filter('unique')( new_array, 'ID' ); //$filter('pick')( $route.current.locals.hse_data.equipment, 'cardNumber == ' + cardNumber + '' )[0];

					}

					$scope.$digest();

				});

				/**
				 * @private
				 *
				 *
				 *
				 * @param {String.err}
				 * @param {String.msg}
				 *
				 * @return {null}
				 *
				 **/
				function _formFeedBack ( err, msg ) {

					Utils._strict( [ Boolean, String ], arguments );

					if( err ) {

						if ( inputMsgTimeout ) $timeout.cancel( inputMsgTimeout );

							$scope.formError = true;
							$scope.formMsg = true;

							$scope.formErrorMsg = msg;

							inputMsgTimeout = $timeout( function() {

								$scope.formError = false;
								$scope.formMsg = false;
								$scope.formErrorMsg = '';

								$timeout.cancel( inputMsgTimeout );

							}, 8000); // delay 8s

					} else {

						$scope.formError = false;
						$scope.formMsg = true;

						$scope.formErrorMsg = msg;

					}

				}

				function dataInitialise( type ) {

					Utils._strict( [ String ], arguments );

					var request 	= '',
						deferred 	= $q.defer();

					switch( type ) {

						case 'faq':
						case 'taxonomy':

							request = type;

							break;

						default:

							throw '!?!#$';

							break;
					}

					$http({
						method: 'GET',
						url: appConfig.general.api + request,
						transformRequest: transformRequestAsFormPost
					})
					.success( function(data, status) {

						deferred.resolve( data );

					})
					.error( function(data, status) {

						console.error("dataInitialise Request failed:", data);

						deferred.reject( data );

					});

					return deferred.promise;

				}

				console.info('Activity Directive loaded.');

			}]
			/**/
		}

	};

	Application.Directives.uiAppPageProducts = function () {

		return {
			restrict: 		'AE',
			//scope: 			{},
			transclude: 	true,
			controller:		Application.Controllers.pagesController,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.products.php'
		}
	};

	/** /
	Application.Directives.uiAppPageProductsSingle = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			controller:		Application.Controllers.pagesController,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.products.single.php'
		}
	};
	/**/

	Application.Directives.uiAppPageInsects = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			controller:		Application.Controllers.pagesController,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.insects.php'
		}
	};

	/** /
	Application.Directives.uiAppPageInsectsSingle = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			controller:		Application.Controllers.pagesController,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.insects.single.php'
		}
	};
	/**/

	Application.Directives.uiAppPageAbout = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			controller:		Application.Controllers.pagesController,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.about.php'
		}
	};

	Application.Directives.uiAppPageLegal = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			controller:		Application.Controllers.pagesController,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.legal.php'
		}
	};
	
	Application.Directives.uiAppPageFaq = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			controller:		Application.Controllers.pagesController,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.faq.php'
		}
	};

	Application.Directives.uiAppPageContact = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			controller:		Application.Controllers.pagesController,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.contact.php'
		}
	};

	Application.Directives.uiAppPage404 = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			controller:		Application.Controllers.pagesController,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.404.php'
		}
	};

	Application.Directives.uiAppPageContent = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.content.php',
			controller:  	[ '$rootScope', '$scope', '$http', '$q', '$route', '$timeout', 'transformRequestAsFormPost', 'Utils', 'pagesManager', function ( $rootScope, $scope, $http, $q, $route, $timeout, transformRequestAsFormPost, Utils, pagesManager ) {

				var inputMsgTimeout,
					inputValidationTimeout;

				$scope.pageContent = {};

				$scope.$on( '$destroy', function(evt, data) {

					inputMsgTimeout  = null;
					inputValidationTimeout  = null;

				});

				/** /
				$rootScope.$on( "projects", function( type, data ){

					console.log('PROJECTS MANAGER LISTENER:', data );

						switch(data.type) {

							case 'new':

								//$scope.projects.push(data.data);

								break;

							case 'remove':

								//$scope.projects.push(data.data);

								break;

						}

				});
				/***/

				$scope.$on( 'data-filter', function(evt, data) {

					console.log('Table Templates filter[' + data.type + ']',  data );

					var new_array = [];

					switch( data.type ) {

						case 'occupation':

							var index = filter_param_occupation.indexOf(data.data);

							if( index == -1 ) {

								filter_param_occupation.push(data.data);

							} else {

								filter_param_occupation.splice(index, 1);

							}

							break;

						case 'department':

							var index = filter_param_department.indexOf(data.data);

							if( index == -1) {

								filter_param_department.push(data.data);

							} else {

								filter_param_department.splice(index, 1);

							}

							break;

					}

					for (var i = 0; i < $route.current.locals.hse_data.equipment.length; i++) {

						if( angular.isDefined($route.current.locals.hse_data.equipment[i]) ) {

							var errors = [];

							if( filter_param_occupation.length == 0 ) {} else {

													if( $route.current.locals.hse_data.equipment[i].occupations !== null ) {

														var error_microStation = [];

														for (var j = 0; j < filter_param_occupation.length; j++) {

															if( angular.isDefined($route.current.locals.hse_data.equipment[i].occupations[j]) ) {

																if( $route.current.locals.hse_data.equipment[i].occupations[j].occupationID == filter_param_occupation[j] ) {

																	//console.log('nailed!', new_array);
																	//new_array.push($route.current.locals.hse_data.equipment[i]);

																	error_microStation.push(false);

																	break;

																} else {
																	//console.log('not nailed');
																	error_microStation.push(true);

																}

															}

														};

														if( error_microStation.indexOf(false) == -1 ) {

															errors.push(true);

														} else {

															errors.push(false);

														}

													} else {

														errors.push(true);
													}

							}

							if( filter_param_department.length == 0 ) {} else {

								if( $route.current.locals.hse_data.equipment[i].departmentID !== null ) {

										var error_microStation = [];

										for (var j = 0; j < filter_param_department.length; j++) {

											if( $route.current.locals.hse_data.equipment[i].departmentID == filter_param_department[j] ) {

												//console.log('nailed!', new_array);
												//new_array.push($route.current.locals.hse_data.equipment[i]);

												error_microStation.push(false);

												break;

											} else {
												//console.log('not nailed');
												error_microStation.push(true);

											}

										}

										if( error_microStation.indexOf(false) == -1 ) {

											errors.push(true);

										} else {

											errors.push(false);

										}

									} else {

										errors.push(true);
									}

								}

							var index = errors.indexOf(true);

							if( index == -1 ) {

								new_array.push($route.current.locals.hse_data.equipment[i]);

							}

						}

					}

					var timeDone = new Date().getTime();

					console.log('filtration time:', ( timeDone - data.time) / 1000, new_array, {
						'occupation': filter_param_occupation,
						'department': filter_param_department
					});

					if( filter_param_department.length == 0 && filter_param_occupation.length == 0 ) {

						//reset data
						$scope.hse_equipment = $route.current.locals.hse_data.equipment;

					} else {

						$scope.hse_equipment =  $filter('unique')( new_array, 'ID' ); //$filter('pick')( $route.current.locals.hse_data.equipment, 'cardNumber == ' + cardNumber + '' )[0];

					}

					$scope.$digest();

				});

				/**
				 * @private
				 *
				 *
				 *
				 * @param {String.err}
				 * @param {String.msg}
				 *
				 * @return {null}
				 *
				 **/
				function _formFeedBack ( err, msg ) {

					Utils._strict( [ Boolean, String ], arguments );

					if( err ) {

						if ( inputMsgTimeout ) $timeout.cancel( inputMsgTimeout );

							$scope.formError = true;
							$scope.formMsg = true;

							$scope.formErrorMsg = msg;

							inputMsgTimeout = $timeout( function() {

								$scope.formError = false;
								$scope.formMsg = false;
								$scope.formErrorMsg = '';

								$timeout.cancel( inputMsgTimeout );

							}, 8000); // delay 8s

					} else {

						$scope.formError = false;
						$scope.formMsg = true;

						$scope.formErrorMsg = msg;

					}

				}

				function dataInitialise( type ) {

					Utils._strict( [ String ], arguments );

					var request 	= '',
						deferred 	= $q.defer();

					switch( type ) {

						case 'faq':
						case 'taxonomy':

							request = type;

							break;

						default:

							throw '!?!#$';

							break;
					}

					$http({
						method: 'GET',
						url: appConfig.general.api + request,
						transformRequest: transformRequestAsFormPost
					})
					.success( function(data, status) {

						deferred.resolve( data );

					})
					.error( function(data, status) {

						console.error("dataInitialise Request failed:", data);

						deferred.reject( data );

					});

					return deferred.promise;

				}

				if( angular.isDefined($route.current.locals.app_data) ) {

						dataInitialise('taxonomy').then( function(results){

								$scope.pageContent = $route.current.locals.app_data.pagecontent[0];

								console.log('Activity Data: ', $scope.pageContent );

								//console.log('Activity Data: ', $route.current.locals.app_data, $scope.pageContent );

							}, function(error) {

								console.error(error);
							}
						);
				}

				console.info('PageContent Directive loaded.');

			}]
		}
	};

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectivePageHome = appDirectivePageHome || angular.module( 'appDirectivePageHome', [ 'appUtils', 'appFilters', 'appXHR', 'appMemCache', 'appSessionService', 'ngRoute', 'ngMaterial' ] );

		appDirectivePageHome
			.controller( Application.Controllers )
			.directive( Application.Directives );


	});

	exports.appDirectivePageHome = appDirectivePageHome;
});
