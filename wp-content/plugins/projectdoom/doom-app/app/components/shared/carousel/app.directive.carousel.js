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
				contentType: '@contenttype',
				maxHeight: '@maxheight',
				maxWidth: '@maxwidth',
				needsCta: '=cta',
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
				console.log(scope.domItems);
				/* Add classes */
				if (!scope.needsCta || !scope.displayName) {
					console.log(element);
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
						if (parseInt(inner.offsetWidth, 10) < parseInt(container.offsetWidth, 10)) {
							controls.style.display = "none";
						} else {
							controls.style.display = "initial";
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
			},
			controller: ['$filter','$scope', '$http', '$q', '$route', '$location', '$timeout', '$mdSidenav', '$log', 'transformRequestAsFormPost', 'Utils', 'ngProgress', 'retailersManager', 'productsManager', 'insectsManager', 'packagesManager', function ($filter, $scope, $http, $q, $route, $location, $timeout, $mdSidenav, $log, transformRequestAsFormPost, Utils, ngProgress, retailersManager, productsManager, insectsManager, packagesManager) {
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
				// $scope.needsCta = false;
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
								insectsManager.getInsects(requestObj).then($scope.success, $scope.error);
								break;
							case 'product':
								if (angular.isDefined($route.current.locals.app_data) && angular.isDefined($scope.productType)) {
									$scope.items = [];
									var results = $route.current.locals.app_data.products;
									_getUniqueCategories( results );

									// _initiateLayout();
									/** /
									var asdf = results;
									asdf = jlinq.from(asdf)
										.equals("insect_categories", ja)
										.select();
									// asdf = jlinq.from(asdf)
									// .equals("product_types.slug", $scope.productType)
									// .select();
									console.log(asdf);

									/**/
									/**/
									var productTypes = _returnUniqueCategories($route.current.locals.app_data.products);
									var insectTypes = _returnUniqueCategories($route.current.locals.app_data.insects);
									var final = [];
									// for (var i = 0; i < productTypes.length; i++) {
									// 	if (productTypes[i].name == $scope.productType) {
												for (var j = 0; j < results.length; j++) {
													for (var i = 0; i < results[j].insect_categories.length; i++) {
														if (results[j].insect_categories[i].slug == $scope.insectType) {
															final.push(results[j]);
															break;
														}
													}
												}
									// 	}
									// }
									for (var j = 0; j < results.length; j++) {
										for (var i = 0; i < results[j].product_types.length; i++) {
											if (results[j].product_types[i].slug == $scope.productType) {
												final.push(results[j]);
												break;
											}
										}
									}
									_initiateLayout(final);
									break;

									/** /

									var taxes = $route.current.locals.app_data.taxonomy;
									//console.log('GARR[]:', $scope.insectType, $route.current.locals.app_data);
									
									// for (var index = 0; index < productTypes.length; index++) {
									// 	var element = productTypes[index];
									// }
									// go through all insect categories (Flying / Crawling)
									//loop1:
									//for (var index = 0; index < taxes.length; index++) {
									angular.forEach(taxes.insect_categories, function (val, key) {
										//var insectArray = val.insect;
										//console.log('trying['+key+']:', val );
										switch (val.name.toLowerCase()) {
											case 'flying':
											case 'crawling':
												//console.log('trying:', taxes[index].toLowerCase(), $scope.insectType );
												loop2:
												for (var indey = 0; indey < val.insect.length; indey++) {
													var element = val.insect[indey];
													if (val.insect[indey].post_name == $scope.insectType) {
														//gallaryProducts.push( array[index.product] );
														//console.log('Got Em!');
														_initiateLayout(val.product);
														break loop2;
													}
												}
												break;
											default:
												//continue;
												break;
										}
									});
									/**/
									//console.log( 'layout data', $filter('groupBy')( $scope.gridItems, 'product_types' ) );
								} else {
									$scope.success($route.current.locals.app_data.products);
								}
								// productsManager.getProducts(requestObj).then($scope.success, $scope.error);
								break;
							case 'package':
								packagesManager.getPackages(requestObj).then($scope.success, $scope.error);
								break;
							case 'retailer':
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

					// $scope.managerGet(requestObj).then(success, error);
				}
				function _initiateLayout(results) {
					// $scope.items = [];
					// var results = $route.current.locals.app_data.products;
					var out = [];
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
												results[index].image = "https://unsplash.it/65/150";
											}
											out.push(results[index]);
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
					$scope.success(out);
				}
				$scope.success = function (data) {
					$scope.items = $filter('unique')(data);
					$scope.itemLength = data.length;
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
						if (parseInt(inner.offsetWidth, 10) < parseInt(container.offsetWidth, 10)) {
							controls.style.display = "none";
						} else {
							controls.style.display = "initial";
						}
					} else {
						angular.element($scope.thisElem[0]).addClass("hide");
					}
				});

				$scope.filter = function ($ev, key) {
					console.log('Filtering...', key, $ev);
					_filterBtnClasses(key);
					var newItems = [];
					if (key == "all") {
						$scope.success($route.current.locals.app_data.products);
						return;
					} else {
						switch ($scope.contentType) {
							case 'insect':
								for (var index = 0; index < $scope.items.length; index++) {
									//var element = $scope.gridItems[index];
									for (var index2 = 0; index2 < $scope.items[index].insect_categories.length; index2++) {
										//var element = $scope.gridItems[index].insect_categories[index2];
										if ($scope.items[index].insect_categories[index2].term_id == key) {
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
												if ($scope.items[index].insect_categories[index2].term_id == key) {
													newItems.push($scope.items[index]);
												}
											}
										}
										break;
									case "product_types":
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
					$scope.success(newItems);
				}

				$scope.goto = function (type, name) {
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
							
					}/**/

					$scope.filterCategories = $filter('flatten')(cats);
					$scope.insectFilterCategories = $filter('flatten')(insectCats);
					$scope.filterCategories = $filter('unique')($scope.filterCategories, 'term_id');
					$scope.insectFilterCategories = $filter('unique')($scope.insectFilterCategories, 'term_id');

					//console.log( 'categories:', $scope.filterCategories, $scope.insectFilterCategories );

				}
				function _filterBtnClasses(key) {

					var filterToolBarBtns = document.querySelectorAll('.toolbar-filter .md-button');

					for (var index = 0; index < filterToolBarBtns.length; index++) {
						// var element = filterToolBarBtns[index];
						Utils.removeClass(filterToolBarBtns[index], 'active-filter');

					}

					var activeFilter = document.querySelector('[data-filter-id="' + key + '"]');

					console.log('activeFilter:', activeFilter);

					Utils.addClass(activeFilter, 'active-filter');

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

							throw 'Invalid Content Type for Gallery';

							break;

					}

					/** /
					for (var index = 0; index < cats.length; index++) {
							cats =  $scope.filter('filterBy', '')(cats);
							
					}/**/

					filterCategories = $filter('flatten')(cats);
					filterCategories = $filter('unique')(filterCategories, 'term_id');

					return filterCategories;

					//console.log( 'categories:', $scope.filterCategories, $scope.insectFilterCategories );

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
