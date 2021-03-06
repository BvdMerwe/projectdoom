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
* @return Angular.module.appDirectiveCarousel
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
define(function (require, exports, module) {

	'use strict';

	require("app-xhr");
	require("app-utils");
	require("app-retailer");
	require("app-product");
	require("angular-progress");
	require("angular-material");
	require("jlinq");

	// Load dependent modules
	var appDirectiveCarousel,
		appConfig = JSON.parse(require("text!../../app/app.config.json")),
		domReady = require("domReady"),
		isMobile = require("isMobile"),
		// jlinq = 
		angular = require("angular");

	//
	var Application = Application || {};
	Application.Directives = {};

	Application.Directives.uiCarousel = function () {

		return {
			restrict: 'AE',
			transclude: true, // pass entire template?
			templateUrl: appConfig.general.path + '/app/components/shared/carousel/carousel.php',
			scope: {
				// items: '=?itemList',
				// itemLength: '=?listLength'
				contentType: '@contenttype',
				maxAmount: '@maxamount',
				maxHeight: '@maxheight',
				maxWidth: '@maxwidth',
				cta: '=cta',
				displayName: '=displayname',
				isSingle: '=single',
				gutter: '@gutter',
				globalFilter: '=?globalfilter',
				showFilter: "=?showfilter",
				filterBy: "@filterby",
				buttonBorders: "=?buttonborders"
			},
			link: function (scope, element, attr, controller) {
				scope.contentType = attr.contenttype;
				scope.insectType = attr.insecttype;
				scope.productType = attr.producttype;

				scope.showLeft = false;
				scope.showRight = true;

				if (scope.contentType === "retailer") {
					angular.element(element).addClass("retailer-carousel");
				}
				// scope.contentType = attrs.contenttype;
				// scope.maxAmount = attrs.maxamount;
				// scope.maxHeight = scope.maxWidth = "100px";
				// if (attrs.maxheight) {scope.maxHeight = attrs.maxheight;}
				// if (attrs.maxwidth) {scope.maxWidth = attrs.maxwidth;}
				if (scope.buttonBorders === false) {
					angular.element(element).addClass("no-border");
				}
				var thisElem = scope.thisElem = element;
				var index = 0;
				scope.domItems = angular.element(element[0].querySelector('.list')).children[0];
				//console.log(scope.domItems);
				/* Add classes */
				if (!scope.cta || !scope.displayName) {
					//console.log(element);
					angular.element(element[0].querySelector('.list')).addClass('no-cta');
				}

				if (scope.isSingle) {
					angular.element(element[0]).addClass('single');
					angular.element(element[0].querySelector('.carousel')).css('width', scope.maxWidth);
				}

				scope.updateCarousel(thisElem);
				/************************************
				*	functions
				************************************/
				// scope.scrollContainer = element[0].getElementsByClassName('carousel');
				var amount = parseInt(scope.maxWidth.slice(0, -2));
				var gutter = + parseInt(scope.gutter.slice(0, -2));
				var elem;
				scope.goLeft = function ($event) {
					move(-1, $event);
				}
				scope.goRight = function ($event) {
					move(1, $event);
				}
				function move(direction, $event) {
					elem = $event.target.parentElement.parentElement.querySelector('.carousel');
					var to = elem.scrollLeft + (((amount) + gutter) * direction);
					// if (to % (amount + gutter) != 0) {
					//   console.log("nope");
					//   return;
					// }

					if (direction > 0) {
						to = Math.ceil((elem.scrollLeft + direction) / (amount + gutter)) * (amount + gutter);

					} else {
						to = Math.floor((elem.scrollLeft + direction) / (amount + gutter)) * (amount + gutter);
					}
					scope.moving = true;

					//enable and disable controls for start and end of list
					scope.showLeft = true;
					scope.showRight = true;
					// console.log(to+ elem.offsetWidth , (amount + gutter) * (scope.itemLength));
					if (to <= 1){
						scope.showLeft = false;
					} else if (to + elem.offsetWidth >= (amount + gutter) * (scope.itemLength)) {
						scope.showRight = false;
					}
					horizontalScrollTo(elem, to, 300);
					setTimeout(function () {
						scope.moving = false;
						direction = container.scrollLeft;
					}, 400);
				}
				// var childWidth = parseInt(elem.childNodes[1].innerWidth, 10);
				// var elemWidth = parseInt(elem.innerWidth, 10);
				//TODO: add to utils.js
				function horizontalScrollTo(element, to, duration) {
					to = Math.floor(to);

					if (duration < 0) return;
					try { //check for IE
						var childWidth = parseInt(window.getComputedStyle(element.childNodes[1], null).getPropertyValue('width'), 10);
						var elemWidth = parseInt(window.getComputedStyle(element, null).getPropertyValue('width'), 10);
					} catch (e) {
						var childWidth = parseInt(element.childNodes[1].currentStyle.width, 10);
						var elemWidth = parseInt(element.currentStyle.width, 10);
					}
					if (to > childWidth - elemWidth) {
						to = Math.abs(childWidth - elemWidth);
					}
					if (to < 0) {
						to = 0;
					}
					// console.log(to, " ", childWidth, " ", elemWidth);
					var difference = to - element.scrollLeft;
					var perTick = difference / duration * 10;

					setTimeout(function () {
						element.scrollLeft = element.scrollLeft + perTick;
						if (element.scrollLeft == to) return;
						horizontalScrollTo(element, to, duration - 10);
					}, 10);

				}

				//show and hide arrows if outer size > inner size
				var $window = window;
				scope.width = $window.innerWidth;
				function onResize() {
					// uncomment for only fire when $window.innerWidth change
					if (scope.width !== $window.innerWidth) {
						scope.width = $window.innerWidth;
						scope.$digest();
						var container = thisElem[0].querySelector('.carousel');
						var inner = thisElem[0].querySelector('.list');
						var controls = thisElem[0].querySelector('.controls');
						if (controls != null || controls != undefined) {
							if (parseInt(inner.offsetWidth, 10) < parseInt(container.offsetWidth, 10)) {
								controls.style.display = "none";
							} else {
								controls.style.display = "";
							}
						}
					}
				};
				var direction = 0;
				function onScroll($event) {
					// console.log(container.scrollLeft % (amount + gutter));
					if (scope.moving) {
						return;
					}
					if (Math.abs(container.scrollLeft - direction) > 1) {
						direction = container.scrollLeft;
						// console.log("too fast");
						return;
					}
					if (container.scrollLeft % (amount + gutter) != 0) {
						var totalWidth = (amount * scope.itemLength) + (gutter * (scope.itemLength - 1));
						//horizontalScrollTo nearest 0
						var to;
						if (direction < container.scrollLeft) {
							to = Math.ceil(container.scrollLeft / (amount + gutter)) * (amount + gutter);
						} else {
							to = Math.floor(container.scrollLeft / (amount + gutter)) * (amount + gutter);
						}
						elem = $event.target.parentElement.parentElement.querySelector('.carousel');

						scope.moving = true;
						horizontalScrollTo(elem, to, 300);
						setTimeout(function () {
							scope.moving = false;
							direction = container.scrollLeft;
						}, 400);
					}
				}
				function cleanUp() {
					angular.element($window).off('resize', onResize);
					angular.element(container).off('scroll', onScroll);
				}
				var container = thisElem[0].querySelector('.carousel');
				angular.element(container).on('scroll', onScroll);
				angular.element($window).on('resize', onResize);
				scope.$on('$destroy', cleanUp);

				scope.hide = function(){
					angular.element(element[0]).addClass("hide");
				}

				scope.updateTypes = function() {
					scope.contentType = attr.contenttype;
					scope.insectType = attr.insecttype;
					scope.productType = attr.producttype;
				}
			},
			controller: ['$filter', '$rootScope', '$scope', '$http', '$q', '$route', '$location', '$timeout', '$mdSidenav', '$log', '$mdDialog', 'transformRequestAsFormPost', 'Utils', 'ngProgress', 'retailersManager', 'productsManager', 'insectsManager', 'packagesManager', function ($filter, $rootScope, $scope, $http, $q, $route, $location, $timeout, $mdSidenav, $log, $mdDialog, transformRequestAsFormPost, Utils, ngProgress, retailersManager, productsManager, insectsManager, packagesManager) {
				//init data
				$scope.contentType;
				$scope.insectType;
				$scope.productType;

				// if ($scope.showFilter == undefined) {
				// 	$scope.showFilter = false;
				// }
				if ($scope.globalFilter) {
					$scope.$on('$testEvent', function (event, data) {
						$scope.insectType = data;
						$scope.updateCarousel();
					});
				}

				if ($scope.items != undefined) {
					$scope.itemLength = $scope.items.length;
				} else {
					$scope.itemLength = 0;
				}

				$scope.$on( "$routeChangeSuccess", function( ev, to, toParams, from, fromParams ){
					$scope.updateTypes();
					//console.info('new route');
					if ($scope.contentType === "retailer") {} else {
						if( ($rootScope.isInsectPage && $rootScope.isPathSlug) || $rootScope.isProfile ) {
							var currentFilter = [];
							if ($scope.insectType != undefined && $scope.insectType != "") {
								currentFilter.push({slug: $scope.insectType});
							} else {
								currentFilter.push({slug: $rootScope.lastInsect});
							}
							var initResults = $route.current.locals.app_data.products;
							// productsManager.getByProductType( $scope.productType ).then(function(initResults){
								productsManager.filterProductsByPest(currentFilter, initResults).then(function(results){
									_getUniqueCategories( results );
									_initiateLayout(results);
									$scope.filter(null, "spray");
								});
						} else {
							_initiateLayout( $route.current.locals.app_data.products );							
						}
					}
		
				});
				// $scope.cta = false;
				// $scope.displayName = false;
				// $scope.isSingle = false;
				//Get data
				$scope.updateCarousel = function (thisElem) {

					var requestObj = {
						method: "GET",
						type: $scope.contentType
					};
					//get results from cache
					// $scope.items = $route.current.locals.app_data[$scope.contentType];
					//if no cache check request type
					if ($scope.itemLength < 1) {
						switch ($scope.contentType) {
							case 'insect':
								//console.warn('The fuck dude?!?');
								insectsManager.getInsects(requestObj).then($scope.success, $scope.error);
								break;
							case 'product':
								if (angular.isDefined($route.current.locals.app_data) && $scope.productType !== "") {
									
									$scope.items = [];
									var currentFilter = [];
									if ($scope.insectType != undefined && $scope.insectType != "") {
										currentFilter.push({slug: $scope.insectType});
									} else {
										currentFilter.push({slug: $rootScope.lastInsect});
									}

									//IF is on page displaying products
									if ($rootScope.isProductPage || $rootScope.isProducts) {
										productsManager.getByProductType( $scope.productType ).then(function(initResults){
											productsManager.filterProductsByPest(currentFilter, initResults).then(function(results){
												_getUniqueCategories( results );
												_initiateLayout(results);
												// $scope.filter(null, "spray");
											});
										});
										break;
									}
									//IF is on single insect page OR insect profile page
									if ($rootScope.isInsectPage || $rootScope.isProfile) {
										var initResults = $route.current.locals.app_data.products;
										// productsManager.getByProductType( $scope.productType ).then(function(initResults){
											productsManager.filterProductsByPest(currentFilter, initResults).then(function(results){
												_getUniqueCategories( results );
												_initiateLayout(results);
												$scope.filter(null, "spray");
											});
										// });
										break;
									}

									//console.warn('scoping...', $scope.productType);
									/*REMOVED 23/10/2017* /
									var results = $route.current.locals.app_data.products;

									if( $rootScope.isProducts ) {

										loopTroop:
										for (var index = 0; index < results.length; index++) {
											var element = results[index];

											loopFull:
											for (var key in element.product_types) {
												if (element.product_types.hasOwnProperty(key)) {
													
													//var element = $scope.pageContent.product_types[key];
													if( element.product_types[key].slug.toLowerCase() == $scope.productType.toLowerCase() ) {
														
														results[index].product_type = $scope.productType;

														//console.log('nazo');
														
														break loopFull;

													}

													//console.log('nazo');
								
												}
											}
											
										}
										_getUniqueCategories( results );
										_initiateLayout(results);
									
									}

									
									/**/

									/* C|ORRECT
									var results = $route.current.locals.app_data.products;
									_getUniqueCategories( results );

									var productTypes = _returnUniqueCategories($route.current.locals.app_data.products);
									var insectTypes = _returnUniqueCategories($route.current.locals.app_data.insects);
									var final = [];
									
									for (var j = 0; j < results.length; j++) {
										for (var i = 0; i < results[j].insect_categories.length; i++) {
											if (results[j].insect_categories[i].slug == $scope.insectType) {
												final.push(results[j]);
												break;
											}
										}
									}
									
									for (var j = 0; j < results.length; j++) {
										for (var i = 0; i < results[j].product_types.length; i++) {
											if (results[j].product_types[i].slug == $scope.productType) {
												final.push(results[j]);
												break;
											}
										}
									}
									_initiateLayout(final);
									*/
									
									break;

									//console.log( 'layout data', $filter('groupBy')( $scope.gridItems, 'product_types' ) );
								} else {

									var results = $route.current.locals.app_data.products;
									/*

									for (var index = 0; index < results.length; index++) {
										var element = results[index];

										for (var key in element.product_types) {
											if (element.product_types.hasOwnProperty(key)) {
												
												//var element = $scope.pageContent.product_types[key];
												
												results[index].product_type = $scope.productType;

												console.log('nazo:', $scope.productType);
							
											}
										}
										
									}
									*/

									if( !angular.isDefined(results) ) {
										results = $route.current.locals.app_data.products;
									}

									_initiateLayout(results);
									
									_getUniqueCategories( results );
									// $scope.success(results);
									$scope.productType = "22";
								}
								// productsManager.getProducts(requestObj).then($scope.success, $scope.error);
								break;
							case 'package':
								packagesManager.getPackages(requestObj).then($scope.success, $scope.error);
								break;
							case 'retailer':
								console.info('getting retailers')
								retailersManager.getRetailers(requestObj).then($scope.success, $scope.error);
								break;
							default:
								throw ("Please provide a content type.");
						}
					} else if ($scope.items.length > 0) {
						$scope.success($scope.items);

					} else {
						$scope.error();
					}
					if ($scope.itemLength == 1){
						$scope.showLeft = false;
						$scope.showRight = false;
					}
					//console.log('Quickturn update', $scope.itemLength, $scope.contentType, $scope.productType);

					// $scope.managerGet(requestObj).then(success, error);
				}
				function _initiateLayout(results) {

					if( $rootScope.isProductPage ) {
						var activeFilter;
						var prodLength = results.length;
						var currentProduct = $filter('pick')( results, 'post_name == "' + $route.current.pathParams.ID + '"' )[0];
						/*
						if( angular.isDefined(results) ) {
							var prodLength = results.length;
							var currentProduct = $filter('pick')( results, 'post_name == "' + $route.current.pathParams.ID + '"' )[0];
						} else {
							results = $route.current.locals.app_data.products;
							var prodLength = results.length;
							var currentProduct = $filter('pick')( results, 'post_name == "' + $route.current.pathParams.ID + '"' )[0];
						}*/

					}
					
					var out = [];
					var i =0;
					loopScope:
					for ( var index in results ) {

						if( ($rootScope.isInsectPage && $rootScope.isPathSlug) || $rootScope.isProfile ) {

							//console.log( 'Finding',results[index], index, $rootScope.isPathSlug.toLowerCase() );

							// loop4:
							// for ( i in results[index].product_categories ) {

								//if( angular.isDefined(!results[index].product_categories[i].name) || angular.isDefined(!$rootScope.isPathSlug) ) {

								//	continue;
								//}

								//console.log('Finding',results[index].product_categories[i].name.toLowerCase(), $rootScope.isPathSlug.toLowerCase());

								// if( results[index].product_categories[i].name.toLowerCase() == $rootScope.isPathSlug.toLowerCase() ) {
									/** */
									for (var keyes in results[index].product_types) {
										if (results[index].product_types.hasOwnProperty(keyes)) {
											var elen = results[index].product_types[keyes];
		
											//console.log('elen', elen, currentProduct.product_type);
		
											//if( elen.slug == currentProduct.product_type ) {
		
												activeFilter = elen.term_id;
		
												out.push(results[index]);
		
											//}
											
										}
									}/**/
									//out.push(results[index]);

									//console.log( 'Got Em!', results[index] );

									// break loop4;

								// }

							// }
						
						} else if( $rootScope.isProductPage ) {
							
							//console.info('initialise carousel for Single Product Page', currentProduct);

							for (var keyes in results[index].product_types) {
								if (results[index].product_types.hasOwnProperty(keyes)) {
									var elen = results[index].product_types[keyes];

									//console.log('elen', elen, currentProduct.product_type);

									if( elen.slug == currentProduct.product_type ) {

										activeFilter = elen.term_id;

										out.push(results[index]);

									}
									
								}
							}
							/*
							var prodLength = $route.current.locals.app_data.products.length;
							var currentProduct = $filter('pick')( $route.current.locals.app_data.products, 'post_name == "' + $route.current.pathParams.ID + '"' )[0];
							
							// check if current product has the same product type as the requested filter
							bigCheck:
							for (var keyes in currentProduct.product_types) {
								//console.info('check filter relevance');
								if (currentProduct.product_types.hasOwnProperty(keyes)) {
									var productType = currentProduct.product_types[keyes];
									if( productType.term_id.toLowerCase() == key.toLowerCase() ) {
										//newItems.push(currentProduct);
										console.info('same product type...please continue');
									} else {

										// BIG ASSUMPTION: one product type per product...so why you're looping(bigCheck)?

										return;
									}
									
								}
							}
							*/

						} else if( $rootScope.isProducts ) {
							//hack 24/10
							$scope.success(results);
							return;
							//console.log('isProducts', results[index], $scope.insectType, index );
							/*REMOVED 24/10/2017* /
							
							loop4:
							for ( var index2 in results[index].product_categories ) {

								//console.log('isProducts', index, index2 );

								if( results[index].product_categories[index2].name.toLowerCase() == $scope.insectType ) {

									//console.log('isProducts', results[index], $scope.insectType, $scope.productType );

									if( results[index].product_type.toLowerCase() == $scope.productType.toLowerCase() ) {
										out.push(results[index]);
										//console.log('isProducts', results[index].post_name, results[index].product_type, $scope.insectType, $scope.productType );
									}

									break loop4;

								}

							}/**/

							//console.log('isProducts['+$scope.contentType+']', out );

							//out.push(results[index]);


						} else {

							//

							//console.log('GENERIC FINDINGS',results[index], $rootScope.isProductPage);

							out.push(results[index]);

						}
					}
					

					/** * /
					// ALL BELOW WORKS!!!
					// $scope.items = [];
					// var results = $route.current.locals.app_data.products;
					loop1:
					for (var index = 0; index < results.length; index++) {
						var taxi = $route.current.locals.app_data.taxonomy.product_types;
						//angular.forEach( $route.current.locals.app_data.taxonomy.product_types, function(val, key) {
						loop2:
						for (var indie = 0; indie < taxi.length; indie++) {
							if (angular.isDefined(taxi[indie].product)) {
								// go through the product_type products
								loop3:
								for (var indey = 0; indey < taxi[indie].product.length; indey++) {
									//break;
									// if product is 
									if (taxi[indie].product[indey].ID == results[index].ID) {
										if (taxi[indie].name.toLowerCase() == $scope.productType.toLowerCase()) {
											results[index].product_type = taxi[indie].name;
											if (results[index].image == undefined) {
												results[index].image = "https://unsplash.it/240/215";
											}

											if( $rootScope.isInsectPage && $rootScope.isPathSlug ) {
												var i =0;
												loop4:
												for ( i in results[index].insect_categories ) {

													if( results[index].insect_categories[i].name.toLowerCase() == $rootScope.isPathSlug.toLowerCase() ) {
														
														out.push(results[index]);

														console.log('Got Em!', results[index], taxi[indie]);

														break loop2;

													}

												}

											} else {

												out.push(results[index]);

											}

											//console.log('Got Em!', results[index], taxi[indie]);
										}
										//console.log('Got Em!', taxi[indie].name, $scope.productType);
										break loop2;
									}
								}
							}
						}
						//});
					}
					//$scope.gridItems = results;
					/***/
					if( $rootScope.isProductPage || $rootScope.isInsectPage || $rootScope.isProfile) {
						$timeout(function () {
							_filterBtnClasses(activeFilter);
						}, 250);						
					}

					$scope.success(out);
				}
				$scope.success = function (data) {

					if( angular.isDefined(!data) || data.length == 0 ) {

						//console.warn('No results to filter/Show[data]');
						//$scope.$broadcast("items-loaded");
						//return;
					}

					$scope.items = $filter('unique')(data);
					$scope.itemLength = $scope.items.length;
					// $scope.$digest();
					$timeout(function () {
						$scope.$broadcast("items-loaded");
					}, 100);
					// console.log(data);
				}
				$scope.error = function (error) {
					console.log("Fek");
					$scope.hide();
				}
				$scope.$on('items-loaded', function () {
					if ($scope.itemLength > 0) {
						//update controls
						var container = $scope.thisElem[0].querySelector('.carousel');
						var inner = $scope.thisElem[0].querySelector('.list');
						var controls = $scope.thisElem[0].querySelector('.controls');
						if (controls != undefined) {
							if (parseInt(inner.offsetWidth, 10) < parseInt(container.offsetWidth, 10)) {
								controls.style.display = "none";
							} else {
								controls.style.display = "";
							}
						}
					} else {
						angular.element($scope.thisElem[0]).addClass("hide");
					}
				});

				$scope.filter = function ($ev, key) {
					
					//console.log('Filtering...', key, $scope.contentType, $scope.filterBy, $ev);
					//_filterBtnClasses(key);
					
					var newItems = [];
					
					if (key == "all") {
						
						_filterBtnClasses(key);

						$scope.success($route.current.locals.app_data.products);
						return;
					} else {

						//_filterBtnClasses(key);
						if (isNaN(key)) {
							key = _getCategoryId(key);
						}
						switch ($scope.contentType) {
							case 'insect':
								for (var index = 0; index < $scope.items.length; index++) {
									//var element = $scope.gridItems[index];
									for (var index2 = 0; index2 < $scope.items[index].insect_categories.length; index2++) {
										//var element = $scope.gridItems[index].insect_categories[index2];
										if ($scope.items[index].insect_categories[index2].term_id == key || $scope.items[index].insect_categories[index2].slug == key) {
											newItems.push($scope.items[index]);
										}
									}
								}
								break;
							case 'product':
								switch ($scope.filterBy) {
									case "insect_categories":
										$scope.items = $route.current.locals.app_data.products;
										for (var index = 0; index < $scope.items.length; index++) {
											//var element = $scope.gridItems[index];
											for (var index2 = 0; index2 < $scope.items[index].insect_categories.length; index2++) {
												//var element = $scope.gridItems[index].product_categories[index2];
												if ($scope.items[index].insect_categories[index2].term_id == key || $scope.items[index].insect_categories[index2].slug == key) {
													newItems.push($scope.items[index]);
												}
											}
										}
										break;
									case "product_types":

										//get
										var fallbackItems = [];
										if( $rootScope.isProductPage) {
											
											var prodLength = $route.current.locals.app_data.products.length;
											var currentProduct = $filter('pick')( $route.current.locals.app_data.products, 'post_name == "' + $route.current.pathParams.ID + '"' )[0];
											
											// check if current product has the same product type as the requested filter
											bigCheck:
											/*
											for (var keyes in currentProduct.product_types) {
												//console.info('check filter relevance');
												if (currentProduct.product_types.hasOwnProperty(keyes)) {
													var productType = currentProduct.product_types[keyes];
													if( productType.term_id.toLowerCase() == key.toLowerCase() ) {
														//newItems.push(currentProduct);
														console.info('same product type...please continue');
													} else {

														///* BIG ASSUMPTION: one product type per product...so why you're looping(bigCheck)?
														
														$mdDialog.show(
															$mdDialog.alert()
															  .clickOutsideToClose(true)
															  .textContent( 'No Items available' )
															  .ariaLabel('carousel validation message')
														);
														

														return;
													}
													
												}
											}
											*/

											//console.info('Check the product type(category)', key, currentProduct, $route.current.pathParams.ID );

											for (var index = 0; index < prodLength; index++) {
												var productLoop = $route.current.locals.app_data.products[index];

												//console.log('checking:', productLoop.post_name);

												for (var keye in productLoop.product_types) {
													if (productLoop.product_types.hasOwnProperty(keye)) {
														var productType = productLoop.product_types[keye];

														//console.log('productType', productType.term_id, key, currentProduct.post_name, $route.current.pathParams.ID );

														if( currentProduct.post_name == productLoop.post_name ) {} else {

															if( productType.term_id == key ) {
																newItems.push(productLoop);
															}
														}
														
													}
												}
												
											}

											/*** /
											// go through active product product types
											loop1:
											for (var indexPTypes = 0; indexPTypes < currentProduct.product_types.length; indexPTypes++) {

												// go all through products
												loop2:
												for (var index = 0; index < prodLength; index++) {

													var compareProduct = $route.current.locals.app_data.products[index];

													// go through comparison products product types
													loop3:
													for (var index = 0; index < compareProduct.product_types.length; index++) {

														if ( (currentProduct.product_types[indexPTypes].term_id == compareProduct.product_types[index].term_id) ) {

															if( compareProduct.product_types[index].term_id == key ) {

																console.log('BammmmBAH!', compareProduct, key );
																newItems.push(compareProduct);

															} else {

																fallbackItems.push(compareProduct);
															}

															break loop2;

														}
													
													}

												}
											}

											if( newItems.length == 0 ) {
												newItems = fallbackItems;
											}/***/


											_filterBtnClasses(key);
											
											$scope.success(newItems);

										} else if( ($rootScope.isInsectPage && $rootScope.isPathSlug) || $rootScope.isProfile ) {

											var prodLength = $scope.items;//$route.current.locals.app_data.products.length;
											var currentProduct = $filter('pick')( $route.current.locals.app_data.products, 'post_name == "' + $route.current.pathParams.ID + '"' )[0];

											for (var index = 0; index < prodLength; index++) {
												var element = $route.current.locals.app_data.products[index];//$scope.items[index];//$route.current.locals.app_data.products[index];
									
												loop4:
												for ( var i in element.product_categories ) {
					
													//if( angular.isDefined(!element.product_categories[i].name) || angular.isDefined(!$rootScope.isPathSlug) ) {
					
													//	continue;
													//}
					
													console.log('Finding',element.product_categories[i].name.toLowerCase(), $rootScope.isPathSlug.toLowerCase());
					
													if( element.product_categories[i].name.toLowerCase() == $rootScope.isPathSlug.toLowerCase() ) {
					
														newItems.push(element);
					
														console.log( 'Got Em!', element );
					
														break loop4;
					
													}
					
												}

											}
											/*
											// check if current product has the same product type as the requested filter
											bigCheck:
											for (var keyes in currentProduct.product_types) {
												//console.info('check filter relevance');
												if (currentProduct.product_types.hasOwnProperty(keyes)) {
													var productType = currentProduct.product_types[keyes];
													if( productType.term_id.toLowerCase() == key.toLowerCase() ) {
														//newItems.push(currentProduct);
														console.info('same product type...please continue');
													} else {

														// BIG ASSUMPTION: one product type per product...so why you're looping(bigCheck)?

														$mdDialog.show(
															$mdDialog.alert()
															  .clickOutsideToClose(true)
															  .textContent( 'No Items available' )
															  .ariaLabel('carousel validation message')
														);

														return;
													}
													
												}
											}

											//console.info('Check the product type(category)', key, currentProduct, $route.current.pathParams.ID );

											for (var index = 0; index < prodLength; index++) {
												var productLoop = $route.current.locals.app_data.products[index];

												//console.log('checking:', productLoop.post_name);

												for (var keye in productLoop.product_types) {
													if (productLoop.product_types.hasOwnProperty(keye)) {
														var productType = productLoop.product_types[keye];

														//console.log('productType', productType.term_id, key, currentProduct.post_name, $route.current.pathParams.ID );

														if( currentProduct.post_name == productLoop.post_name ) {} else {

															if( productType.term_id == key ) {
																newItems.push(productLoop);
															}
														}
														
													}
												}
												
											}
											*/

											//var currentProduct = $filter('pick')( $route.current.locals.app_data.taxonomy.product_types, 'term_id == "' + $route.current.pathParams.ID + '"' )[0];
											
											productsManager.getByProductType( key ).then(function(initResults) {

												productsManager.filterProductsByPest([{slug: $rootScope.lastInsect}], initResults).then(function(results){
													
													console.warn('Guckl', results, key);
													
													if( results.length == 0 ) {
								
														$mdDialog.show(
															$mdDialog.alert()
																.clickOutsideToClose(true)
																.textContent( 'No Items available' )
																.ariaLabel('carousel validation message')
														);
								
														return;
								
														//$scope.success($route.current.locals.app_data.products);
													} else {

														newItems = results;

														_filterBtnClasses(key);
														_initiateLayout(results);
														
														// $scope.success(newItems);
													}
												});

												}, function(error) {

												}
											);
										
										} else {

											$scope.items = $route.current.locals.app_data.products;
											for (var index = 0; index < $scope.items.length; index++) {
												//var element = $scope.gridItems[index];
												for (var index2 = 0; index2 < $scope.items[index].product_types.length; index2++) {
													//var element = $scope.gridItems[index].product_categories[index2];
													if ($scope.items[index].product_types[index2].term_id == key || $scope.items[index].insect_categories[index2].slug == key) {
														//console.log('BammmmBAH!', $scope.items[index].product_types[index2].term_id, key, $scope.items[index]);
														newItems.push($scope.items[index]);

													}
												}
											}
											_filterBtnClasses(key);
										
											$scope.success(newItems);

										}

										/** /
										$scope.items = $route.current.locals.app_data.products;
										for (var index = 0; index < $scope.items.length; index++) {
											//var element = $scope.gridItems[index];
											for (var index2 = 0; index2 < $scope.items[index].product_types.length; index2++) {
												//var element = $scope.gridItems[index].product_categories[index2];
												if ($scope.items[index].product_types[index2].term_id == key) {

													//is it product categories the same:
													

													if( $rootScope.isProductPage ) {

														console.info('Check the product category', key, currentProduct, $route.current.pathParams.ID );

														/** /
														var i, indice = 0;
														for ( i in $scope.items[indice].product_categories ) {

															console.log('FilterFinding',$scope.items[indice].product_categories[i].name.toLowerCase(), $rootScope.isPathSlug.toLowerCase());

															if( $scope.items[indice].product_categories[i].name.toLowerCase() == $rootScope.isPathSlug.toLowerCase() ) {

																out.push($scope.items[indice]);

																console.log( 'GotFilterEm!', $scope.items[indice] );

																break;

															}

														}
														/*** /

													} else {
														console.log('BammmmBAH!', $scope.items[index].product_types[index2].term_id, key, $scope.items[index]);
														newItems.push($scope.items[index]);
													}

												}
											}
										}
										/**/

										break;

									default:
										$scope.items = $route.current.locals.app_data.products;
										for (var index = 0; index < $scope.items.length; index++) {
											//var element = $scope.gridItems[index];
											for (var index2 = 0; index2 < $scope.items[index].product_types.length; index2++) {
												//var element = $scope.gridItems[index].product_categories[index2];
												if ($scope.items[index].product_types[index2].term_id == key) {
													newItems.push($scope.items[index]);
												}
											}
										}
										break;
								}
								
								break;
							default:
								throw 'Invalid Content Type Active';
								break;
						}
					}
					/*
					if( newItems.length == 0 ) {

						//alert('No Items available');

						//if( $rootScope.isInsectPage && $rootScope.isPathSlug ) {
						//	_filterBtnClasses(key);
						//}

						$mdDialog.show(
							$mdDialog.alert()
							  .clickOutsideToClose(true)
							  .textContent( 'No Items available' )
							  .ariaLabel('carousel validation message')
						);

						return;

						//$scope.success($route.current.locals.app_data.products);

					} else {
					*/
					
					//}

				}

				$scope.goto = function (type, name) {
					// window.scrollTo('body', 0)
					Utils.scrollWithEase(0);
					if (angular.isDefined($scope.insectType) && $scope.insectType !== "") {
						$rootScope.lastInsect = $scope.insectType;
						console.warn("Gotta go to "+$scope.insectType+" products");
					} else if ($scope.insectType == "") {
						for (var i = 0; i < $scope.items.length; i++) {
							if (name == $scope.items[i].post_name) {
								$rootScope.lastProduct = $scope.items[i];
								$rootScope.lastInsect = "";
								break;
							}
						}
						console.warn("Gotta go to products related to "+$rootScope.lastProduct.post_name);
					}
					switch (type) {
						case 'insect':
						case 'product':
							type += 's';
							$location.path('/' + type + '/' + name);
							break;
						case 'page':
							$location.path('/' + name);
							break;
					}
				}
				/*
				function _getUniqueCategories(results) {

					$scope.filterCategories = [];

					var cats = [];
					var insects = [];
					var insectCats = [];

					switch ($scope.contentType.toLowerCase()) {

						case 'product':

							for (var index = 0; index < results.length; index++) {

								cats.push(results[index].product_categories);
								insectCats.push(results[index].insect_categories);

							}

							break;

						case 'insect':

							for (var index = 0; index < results.length; index++) {

								cats.push(results[index].insect_categories);

							}

							//cats = results.insect_categories;

							break;

						default:

							throw 'Invalid Content Type for Gallery';

							break;

					}

					/** /
					for (var index = 0; index < cats.length; index++) {
							cats =  $scope.filter('filterBy', '')(cats);
							
					}/** /

					$scope.filterCategories = $filter('flatten')(cats);
					$scope.insectFilterCategories = $filter('flatten')(insectCats);
					$scope.filterCategories = $filter('unique')($scope.filterCategories, 'term_id');
					$scope.insectFilterCategories = $filter('unique')($scope.insectFilterCategories, 'term_id');

					console.log( 'filter categories:', $scope.filterCategories, $scope.insectFilterCategories );

				}
				*/
				function _filterBtnClasses(key) {

					var filterToolBarBtns = document.body.querySelectorAll('.toolbar-filter .md-button');

					for (var index = 0; index < filterToolBarBtns.length; index++) {
						// var element = filterToolBarBtns[index];
						Utils.removeClass(filterToolBarBtns[index], 'active-filter');

					}
					var activeFilter;
					activeFilter = document.querySelector('[data-filter-id="' + parseInt(key) + '"]');
					//console.log('activeFilter:', activeFilter, key);

					Utils.addClass(activeFilter, 'active-filter');

				}
				function _getCategoryId (key) {
					for (var i = 0; i < $scope.filterCategories.length; i++) {
						if ($scope.filterCategories[i].slug == key) {
							return $scope.filterCategories[i].term_id;
						}
					}
				}
				function _getUniqueCategories(results) {

					$scope.filterCategories = [];

					var cats = [];
					var insects = [];
					var insectCats = [];

					switch ($scope.contentType.toLowerCase()) {

						case 'product':

							for (var index = 0; index < results.length; index++) {

								cats.push(results[index].product_types);
								insectCats.push(results[index].insect_categories);

							}

							break;

						case 'insect':

							for (var index = 0; index < results.length; index++) {

								cats.push(results[index].insect_categories);

							}

							//cats = results.insect_categories;

							break;

						default:

							throw 'Invalid Content Type for Gallery';

							break;

					}

					/** /
					for (var index = 0; index < cats.length; index++) {
							cats =  $scope.filter('filterBy', '')(cats);
							
					}/**/

					$scope.filterCategories = $filter('flatten')(cats);
					$scope.insectFilterCategories = $filter('flatten')(insectCats);
					$scope.filterCategories = $filter('unique')($scope.filterCategories, 'term_id');
					$scope.insectFilterCategories = $filter('unique')($scope.insectFilterCategories, 'term_id');

					//console.log( 'categories:', $scope.filterCategories, $scope.insectFilterCategories );

				}
				function _returnUniqueCategories(results) {
					var filterCategories = [];

					var cats = [];
					var insects = [];
					var insectCats = [];

					switch ($scope.contentType.toLowerCase()) {

						case 'product':

							for (var index = 0; index < results.length; index++) {

								cats.push(results[index].product_types);
								insectCats.push(results[index].insect_categories);

							}

							break;

						case 'insect':

							for (var index = 0; index < results.length; index++) {

								cats.push(results[index].insect_categories);

							}

							//cats = results.insect_categories;

							break;

						default:

							throw 'Invalid Content Type for Carousel';

							break;

					}

					/** /
					for (var index = 0; index < cats.length; index++) {
							cats =  $scope.filter('filterBy', '')(cats);
							
					}/**/

					filterCategories = $filter('flatten')(cats);
					filterCategories = $filter('unique')(filterCategories, 'term_id');

					//console.log( 'categories['+$scope.contentType.toLowerCase()+']:', $scope.filterCategories, $scope.insectFilterCategories );

					return filterCategories;

					

				}
			}],
			// controllerAs: 'vm',
		};

	};

	domReady(function () {

		/*
		 * APP MODULE
		 */
		appDirectiveCarousel = appDirectiveCarousel || angular.module('appDirectiveCarousel', ['appUtils', 'appXHR', 'ngMaterial', 'ngProgress']);

		appDirectiveCarousel
			.directive(Application.Directives);


	});

	exports.appDirectiveCarousel = appDirectiveCarousel;
});
