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

	Application.Directives.uiAppActivity = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.home.php',
			/**/
			controller:  	[ '$rootScope', '$scope', '$http', '$q', '$route', '$timeout', 'transformRequestAsFormPost', 'Utils', function ( $rootScope, $scope, $http, $q, $route, $timeout, transformRequestAsFormPost, Utils ) {

				var inputMsgTimeout,
					inputValidationTimeout;

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

				$scope.$on( "$routeChangeSuccess", function( ev, to, toParams, from, fromParams ){

					//console.log(ev, to, toParams, from, fromParams);

					//console.log( 'App interface ready...', $scope );

					$scope.renderPath = $rootScope.renderPath;

					//console.log('App interface ready...', $route.current.locals.app_data );

					if( angular.isDefined($route.current.locals.app_data) ) {

						dataInitialise('taxonomy').then( function(results){

								console.log('Acivity Data: ', $route.current.locals.app_data, results );

							}, function(error) {

								console.error(error);
							}
						);

					}

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

				console.info('Acivity Directive loaded.');

			}]
			/**/
		}

	}

	Application.Directives.uiAppPageContent = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.content.php',
			controller:  	[ '$rootScope', '$scope', '$http', '$q', '$route', '$timeout', 'transformRequestAsFormPost', 'Utils', function ( $rootScope, $scope, $http, $q, $route, $timeout, transformRequestAsFormPost, Utils ) {

				var inputMsgTimeout,
					inputValidationTimeout;

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

				$scope.$on( "$routeChangeSuccess", function( ev, to, toParams, from, fromParams ){

					//console.log(ev, to, toParams, from, fromParams);

					//console.log( 'App interface ready...', $scope );

					$scope.renderPath = $rootScope.renderPath;

					//console.log('App interface ready...', $route.current.locals.app_data );

					if( angular.isDefined($route.current.locals.app_data) ) {

						dataInitialise('taxonomy').then( function(results){

								console.log('Acivity Data: ', $route.current.locals.app_data, results );

							}, function(error) {

								console.error(error);
							}
						);

					}

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

				console.info('Acivity Directive loaded.');

			}]
		}
	}

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectivePageHome = appDirectivePageHome || angular.module( 'appDirectivePageHome', [ 'appUtils', 'appFilters', 'appXHR', 'appMemCache', 'appSessionService', 'ngRoute', 'ngMaterial' ] );

		appDirectivePageHome
			.directive( Application.Directives );


	});

	exports.appDirectivePageHome = appDirectivePageHome;
});
