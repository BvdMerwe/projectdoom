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
	require("angular-gmaps");

	// Load dependent modules
	var appDirectivePageHome,
		appConfig		= JSON.parse(require("text!../../app/app.config.json")),
		domReady 		= require("domReady"),
		angular 		= require("angular");

	//
	var Application = Application || {};
	Application.Directives = {};
	Application.Controllers = {};

	

	Application.Controllers.pagesController =  [ '$rootScope', '$scope', '$http', '$q', '$route', '$filter', '$location', '$timeout', 'transformRequestAsFormPost', 'Utils', 'MemCache', 'productsManager', 'insectsManager', function ( $rootScope, $scope, $http, $q, $route, $filter, $location, $timeout, transformRequestAsFormPost, Utils, MemCache, productsManager, insectsManager ) {

		var inputMsgTimeout,
		inputValidationTimeout;

		$scope.currentInsect;

		$scope.pageContent = {};
		$scope.productsPageFilter = '';
		$scope.productsPageInsectFilter = '';

		$scope.$on( '$destroy', function(evt, data) {

			inputMsgTimeout  = null;
			inputValidationTimeout  = null;

		});

		$scope.$on( "$routeChangeStart", function( ev, to, toParams, from, fromParams ){
			
			$scope.pageContent = {};
			$scope.productsPageFilter = '';
			$scope.productsPageInsectFilter = '';
			
		});

		$scope.goto = function (path) {
			$scope.scrollToTop();
			$location.path(path);
		}

		$scope.viewProfile = function (path) {

			Utils._strict( [ String ], arguments );

			$location.path( '/profile/' + path );

		}

		$scope.browseBycategory = function (type, taxonomy) {

			Utils._strict( [ String, String ], arguments );

			$location.path( '/' + type + '/category/' + taxonomy );

		}

		$scope.browseBycategoryInsect = function (type, taxonomy, insect) {

			Utils._strict( [ String, String, String ], arguments );

			$location.path( '/' + type + '/category/' + taxonomy + '/' + insect );

		}

		$scope.scrollTo = function(id) {

			Utils._strict( [ String ], arguments );
				// console.log(document.querySelector(id));
			var to = document.querySelector(id).offsetTop;
			// Utils.scrollTo(document,to, 300);
			window.scrollTo(0, to);
		}

		$scope.scrollToTop = function() {
			window.scrollTo('body', 0);
		}

		/***/
		$scope.$on( "$routeChangeSuccess", function( ev, to, toParams, from, fromParams ){
			if (to.$$route.action == "home") {
				// var pests = $route.current.locals.app_data.insects;
				// var rand = Utils.getRandomInt(0,pests.length-1);
				// $location.path("/insects/"+pests[rand].post_name);
			}
			
			_ini();

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

			//console.log( 'open next product page:', $scope.currentInsect, $scope.pageContent );

			//$location.path( '/products/' + $scope.pageContent.post_name );
			
		};

		$scope.prevProduct = function () {

			getCurrentPrevProduct();

			//console.log( 'open prev product page:', $scope.currentInsect );

			//$location.path( '/products/' + $scope.pageContent.post_name );

			//$location.path( '/insects/' + page );

		};

		$scope.filterProducts = function( category ) {

			Utils._strict( [ String ], arguments );

			if( $rootScope.isProductPage === true && angular.isDefined($route.current.locals.app_data) ) {
				
				productsManager.getByProductType( category ).then(function(results){

						//console.log('filtered product list:', results );
								
						$location.path( '/products/' + results[0].post_name );

					}, function(err){

					}
				);

			} else if( ($rootScope.isProducts === true || $rootScope.isProductCategory === true || $rootScope.isProductCategoryInsect === true) && angular.isDefined($route.current.locals.app_data) ) {

				console.log('Products Filter', category);

				if( category == "all") {

					$location.path( '/products' );

				} else {

					$location.path( '/products/category/' + category );

				}

			}

		}

		$scope.setProfileLocation = function( location ) {

			Utils._strict( [ String ], arguments );

			//var loky = document.querySelector( '.map-container location-' + location );
			//Utls.toggleClass( document.getElementById(location), 'active' );

			var elem = document.getElementById('location-' + location);

			if( elem ) {
				angular.element( document.getElementById('location-' + location) ).addClass('active');
				angular.element( document.getElementById(location) ).addClass('true');
			}

			//angular.element( document.getElementById('location-' + location) ).addClass('active');

		}

		$scope.removeProfileLocation = function( location ) {

			Utils._strict( [ String ], arguments );

			//var loky = document.querySelector( '.map-container location-' + location );
			//Utls.toggleClass( document.getElementById(location), 'active' );

			//angular.element( document.getElementById('location-' + location) ).removeClass('active');

			var elem = document.getElementById('location-' + location);

			if( elem ) {
				angular.element( document.getElementById('location-' + location) ).removeClass('active');
				angular.element( document.getElementById(location) ).removeClass('true');
			}

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

				//var array = $route.current.locals.app_data.products;

				var ProductCount = 0;
				var i;
				var stop = false;

				// get current product type;
				var i;
				for ( i in $scope.pageContent.product_types ) {

					if( angular.isDefined( $scope.pageContent.product_types[parseInt(i)] ) ) {

						productsManager.getByProductType( $scope.pageContent.product_types[parseInt(i)].slug ).then(function(results){

								//console.log('filtered list:', results );
								
								for (var index = 0; index < results.length; index++) {
									var element = results[index];
				
									if( element.post_name == $route.current.pathParams.ID  ) {
				
										if( angular.isDefined( results[index + 1]) ) {
				
											$scope.pageContent = results[index + 1];
				
											//console.log('current(new) insect:', $scope.pageContent);
				
										} else if( angular.isDefined( results[0]) ) {
				
											$scope.pageContent = results[0];

											
				
											//console.log('reset product:', $scope.pageContent);
				
										}

										$location.path( '/products/' + $scope.pageContent.post_name );
				
										break;
				
									}
									
								}

							}, function(err){

							}
						);
					}

				}

			}

		}

		function getCurrentPrevProduct() {

			if( angular.isDefined( $route.current.locals.app_data.products ) ) {

				var ProductCount = 0;
				var i;
				var stop = false;

				// get current product type;
				var i;
				for ( i in $scope.pageContent.product_types ) {

					if( angular.isDefined( $scope.pageContent.product_types[parseInt(i)] ) ) {

						productsManager.getByProductType( $scope.pageContent.product_types[parseInt(i)].slug ).then(function(results){

								//console.log('filtered list:', results );
								
								for (var index = 0; index < results.length; index++) {
									var element = results[index];
				
									if( element.post_name == $route.current.pathParams.ID  ) {
				
										if( angular.isDefined( results[index - 1]) ) {
				
											$scope.pageContent = results[index - 1];
				
											//console.log('current:prev(new) insect:', $scope.pageContent);

											
				
										} else if( angular.isDefined( results[0]) ) {
				
											$scope.pageContent = results[0];
				
											//console.log('last product:', $scope.pageContent);
				
										}
				
										break;
				
									}

									$location.path( '/products/' + $scope.pageContent.post_name );
									
								}

							}, function(err){

							}
						);
					}

				}


				/** /
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
				/**/

			}

		}
		
		function getPageContent( cola ) {

			Utils._strict( [ Array ], arguments );

			for (var index = 0; index < cola.length; index++) {
				
				if( $rootScope.isProductPage || $rootScope.isProfilePage ) {

					if( cola[index].post_name == $route.current.pathParams.ID ) {

						//console.log('Yo!', cola[index]);
						
						return cola[index];

					}

				} else if( $rootScope.isProducts && $route.current.pathParams.ID ) {

					if( cola[index].post_name == 'products' ) {

						//console.warn('category filter this bitch:', $route.current.pathParams.ID,  $route.current.pathParams.TYPE);

						return cola[index];

					}

					/*** /
					if( $route.current.pathParams.TYPE ) {

						if( cola[index].post_name == 'products' ) {

							console.warn('category+insect filter theis bitch', $route.current.pathParams.ID,  $route.current.pathParams.TYPE);
							
							return cola[index];

						}

					} else {

						if( cola[index].post_name == 'products' ) {

							//console.log('Yo!', cola[index]);

							console.warn('category filter theis bitch');
							
							return cola[index];

						}
					
					}
					/**/

				} else if( $rootScope.isProducts ) {

					if( cola[index].post_name == 'products' ) {

						//console.log('products!', cola[index]);
							
						return cola[index];

					} else {
						//console.log('nope!', cola[index]);
					}
				/**/
				} else if( $rootScope.isInsectPage ) {

					if( cola[index].post_name == $route.current.pathParams.ID ) {

						//console.log('Yo!', cola[index]);
						
						return cola[index];

					}/***/

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

		function _updateInsectClasses() {


			/** /
			var domElems = document.querySelectorAll('.product-insects li');

			if( angular.isDefined(domElems) && domElems.length > 0 ) {

				for (var key in $scope.pageContent.product_categories) {
					if ($scope.pageContent.product_categories.hasOwnProperty(key)) {
						var element = $scope.pageContent.product_categories[key];
						var domElem = document.querySelectorAll('.product-insects li.icon-insect-' + element.slug );
						console.log('domElem:', domElem );
					}
				}

			} else {
				console.error('domElems:', domElems);
			}/**/

			$scope.pageContent.insect_ant = false;
			$scope.pageContent.insect_fly = false;
			$scope.pageContent.insect_flea = false;
			$scope.pageContent.insect_fishmoth = false;
			$scope.pageContent.insect_mosquito = false;
			$scope.pageContent.insect_cockroach = false;

			for (var key in $scope.pageContent.product_categories) {
				if ($scope.pageContent.product_categories.hasOwnProperty(key)) {
					
					var element = $scope.pageContent.product_categories[key];
					
					switch( element.slug ) {

						case 'ant':

							$scope.pageContent.insect_ant = true;

							break;
						
						case 'fly':

							$scope.pageContent.insect_fly = true;

							break;
						
						case 'flea':

							$scope.pageContent.insect_flea = true;

							break;

						case 'fishmoth':

							$scope.pageContent.insect_fishmoth = true;

							break;
						
						case 'mosquito':

							$scope.pageContent.insect_mosquito = true;

							break;

						case 'cockroach':

							$scope.pageContent.insect_cockroach = true;

							break;

						
					}

				}
			}

			for (var key in $scope.pageContent.product_types) {
				if ($scope.pageContent.product_categories.hasOwnProperty(key)) {
					
					var element = $scope.pageContent.product_types[key];
					
					$scope.pageContent.product_type = element.slug;

				}
			}

		}

		function _ini() {

			//$rootScope.productsPageFilter = $route.current.pathParams.ID;

			if( angular.isDefined($route.current.locals.app_data) ) {

				if( $rootScope.isProductPage ) {

					$scope.productsPageFilter = $route.current.pathParams.ID;

					//console.log('productsPageFilter', $scope.productsPageFilter);

					$scope.pageContent = getPageContent( $route.current.locals.app_data.products ); //$route.current.locals.app_data.pagecontent[0];
					
					_updateInsectClasses();

				} else if( $rootScope.isProducts ) {

					if( $route.current.pathParams.TYPE ) {

						//$scope.productsPageFilter = $route.current.pathParams.ID;
						$scope.productsPageInsectFilter = $route.current.pathParams.TYPE;
					}
					if( $route.current.pathParams.ID ) {

						$scope.productsPageFilter = $route.current.pathParams.ID;

					}

					$scope.pageContent = getPageContent( $route.current.locals.app_data.pagecontent );

					console.warn('products page', $scope.productsPageFilter, $scope.productsPageInsectFilter, getPageContent( $route.current.locals.app_data.pagecontent ));

				} else if( $rootScope.isInsectPage || $rootScope.isProfilePage ) {

					$scope.currentInsect = $route.current.pathParams.ID;

					$scope.pageContent = getPageContent( $route.current.locals.app_data.insects ); //$route.current.locals.app_data.pagecontent[0];

				} else {

					$scope.pageContent = getPageContent( $route.current.locals.app_data.pagecontent ); //$route.current.locals.app_data.pagecontent[0];

				}

				//$scope.pageContent = getPageContent( $route.current.locals.app_data.pagecontent ); //$route.current.locals.app_data.pagecontent[0];

				//console.log('Activity Data: ', $scope.pageContent );

				console.log('Activity Data: ', $route.current.locals.app_data, $scope.pageContent, $route.current.pathParams );
					
					
			} else {

				throw '$route.current.locals.app_data undefined!';
			}

		}

		_ini();

		console.info('Page Controller Ready.');

	}];

	Application.Directives.uiGoogleMap = function () {

		return {
			restrict: 		'AE',
			//scope: 			{},
			transclude: 	true,
			//templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.home.php',
			/**/
			controller:  	[ '$window', '$scope', '$compile', '$http', '$q', 'Utils', 'NavigatorGeolocation', 'GeoCoder', 'StreetView', function ( $window, $scope, $compile, $http, $q, Utils, NavigatorGeolocation, GeoCoder, StreetView  ) {

				var gmap;

				$scope.$on('mapInitialized', function(event, map) {

					console.log('map initialised', map);

					var addresses = [];

					addresses.push({
						title 	: "Tiger Brands Limited",
						address : "310 William Nicol Drive, Bryanston, 2021",
						lat 	: "",
						long 	: ""
					});

					gmap = map;

					angular.forEach( addresses, function(val, key) {

						_geoIT ( val.address, val.title, function(e) {

							if( e === false ) {
							
								console.error( 'no gps (' + val.title + '): ', e );
							
							} else {
								
								//map.setCenter(e);		
								
								//console.log( ' gps (' + val.title + '): ', e );

								_plot( e, val.address, val.title );

							}

						});

					});

					/** /
					_geoIT ( address, title, function(e) {

						if( e === false ) {
						
							console.error( 'no gps:', e );
						
						} else {
							
							map.setCenter(e);

							gmap = map;

							_plot( e, address, title );

						}

					});
					/**/
			
				});

				/**
				 * Geocode Address to Latitude & Longitude
				 *
				 * @param String.addr 		 Physical Address
				 * @param String.addrTitle	 Location Title
				 * 
				 * @return null
				 */
				function _geoIT ( addr, addrTitle, callback ) {

					Utils._strict( [ String, String, Function ], arguments );

					//var geocoder = new google.maps.Geocoder();
					//var deferred = $q.defer();
					var geocoder = new google.maps.Geocoder();
					//var _self = this;

					geocoder.geocode({ 
							'address' : addr
						},
						function( results, status) {					
													
							if ( status == google.maps.GeocoderStatus.OK ) {
												
								//_self.map.setCenter(results[0].geometry.location);

								callback( results[0].geometry.location);

								//deferred.resolve( results[0].geometry.location );

								//_self.plot( results[0].geometry.location, addr, addrTitle );
												
							} else {

								callback (false);
								//deferred.reject( 'Geocoder failed due to: '+ status );
							}
					});

					//return deferred.promise;

				}

				/**
				 * Geocode Address to Latitude & Longitude
				 *
				 * @param Object.latlng	 LatLong Coordinates
				 * @param String.addr 		 Physical Address
				 * @param String.addrTitle	 Location Title
				 * 
				 * @return Null
				 */
				function  _plot ( latlng, addr, addrTitle ) {

					//Utils._strict( [ Object, String, String ], arguments );

					if ( window.google == null || window.google == undefined ) {

						console.error('google not defined...yet...?');

						return;

					} else {

						var _self = this;

						var marker = new google.maps.Marker({
								map: gmap,//_self.map,
								position: latlng,
								animation: google.maps.Animation.DROP,
								title: addrTitle
						});

						var infowindow = new google.maps.InfoWindow({
										content: 
											'<h3 class="tc uppercase">' + addrTitle + '</h3>' +
											'<p>' + addr + '</p>'
						});

						//console.log( 'jus plotted:', addrTitle, latlng );
						
						infowindow.open( gmap, marker );

						google.maps.event.addListener( marker, 'click', function() {
							infowindow.open( gmap, marker );
						});

					}

				}
				/*** /
				function _calcRoute ( from, to ) {

					var directionsService = new google.maps.DirectionsService();

					var request = {
						origin:from,
						destination:to,
						travelMode: google.maps.TravelMode.DRIVING,
						unitSystem: google.maps.UnitSystem.METRIC,
						region: 'za'
					};
					directionsService.route(request, function(result, status) {

						if (status == google.maps.DirectionsStatus.OK) {
							directionsDisplay.setDirections(result);
						};
					})
				
				}/***/

			}]
			/**/
		}

	};

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
					// var pests = $route.current.locals.app_data.insects;
					// var rand = Utils.getRandomInt(0,pests.length-1);
					// $location.path("/insects/"+pests[rand].post_name);
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

	/**/
	Application.Directives.uiAppPageProfile = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			controller:		Application.Controllers.pagesController,
			templateUrl: 	appConfig.general.path+'app/components/core/pages/directive.page.template.profile.php'
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
			//scope: 			{},
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
		appDirectivePageHome = appDirectivePageHome || angular.module( 'appDirectivePageHome', [ 'ngMap', 'appUtils', 'appFilters', 'appXHR', 'appMemCache', 'appSessionService', 'ngRoute', 'ngMaterial' ] );

		appDirectivePageHome
			.controller( Application.Controllers )
			.directive( Application.Directives );


	});

	exports.appDirectivePageHome = appDirectivePageHome;
});
