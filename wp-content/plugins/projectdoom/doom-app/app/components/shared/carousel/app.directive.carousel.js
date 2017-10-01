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
define( function ( require, exports, module ) {

    'use strict';

	require("app-xhr");
	require("app-utils");
	require("app-retailer");
	require("app-product");
	require("angular-progress");
  require("angular-material");

	// Load dependent modules
	var appDirectiveCarousel,
				appConfig		= JSON.parse(require("text!../../app/app.config.json")),
        domReady 		= require("domReady"),
        isMobile 		= require("isMobile"),
				angular 		= require("angular");

	//
	var Application = Application || {};
	Application.Directives = {};

	Application.Directives.uiCarousel = function () {

		return {
			restrict: 		'AE',
			transclude: 	false, // pass entire template?
			templateUrl: 	appConfig.general.path+'/app/components/shared/carousel/carousel.php',
			scope: {
				// items: '=?itemList',
				// itemLength: '=?listLength'
				contentType:'@contenttype',
				maxAmount:'@maxamount',
				contentType:'@contenttype',
				maxHeight:'@maxheight',
				maxWidth:'@maxwidth',
				needsCta:'=needscta',
				displayName:'=displayname',
				isSingle:'=single',
				gutter:'@gutter',
	    },
			link: function (scope, element, attrs, controller) {
					// scope.contentType = attrs.contenttype;
					// scope.maxAmount = attrs.maxamount;
					// scope.maxHeight = scope.maxWidth = "100px";
					// if (attrs.maxheight) {scope.maxHeight = attrs.maxheight;}
					// if (attrs.maxwidth) {scope.maxWidth = attrs.maxwidth;}

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

					controller.updateCarousel(thisElem);
					/************************************
					*	functions
					************************************/
					// scope.scrollContainer = element[0].getElementsByClassName('carousel');
					var amount = parseInt(scope.maxWidth.slice(0, -2));
          var gutter = + parseInt(scope.gutter.slice(0, -2));
					var elem;
					scope.goLeft = function ($event) {
            move(-1,$event);
					}
					scope.goRight = function ($event) {
            move(1,$event);
					}
          function move(direction,$event) {
  						elem = $event.target.parentElement.parentElement.querySelector('.carousel');
              var to = elem.scrollLeft+(((amount) + gutter)*direction);
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
              setTimeout(function(){
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
						} catch(e) {
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

				    $timeout(function () {
				        element.scrollLeft = element.scrollLeft + perTick;
				        if (element.scrollLeft == to) return;
				        horizontalScrollTo(element, to, duration - 10);
				    }, 10);

					}

					//show and hide arrows if outer size > inner size
					var $window = window;
					scope.width = $window.innerWidth;
          function onResize(){
              // uncomment for only fire when $window.innerWidth change
              if (scope.width !== $window.innerWidth)
              {
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
          function onScroll($event){
            // console.log(container.scrollLeft % (amount + gutter));
            if (scope.moving) {
              return;
            }
            if (Math.abs(container.scrollLeft - direction) > 5) {
              direction = container.scrollLeft;
              console.log("too fast");
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
              setTimeout(function(){
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
			},
			controller:  	[ '$scope', '$http', '$q', '$route', '$location', '$timeout',	'$mdSidenav', '$log', 'transformRequestAsFormPost', 'Utils', 'ngProgress', 'retailersManager', 'productsManager', 'insectsManager', 'packagesManager', function ( $scope, $http, $q, $route, $location, $timeout, $mdSidenav, $log, transformRequestAsFormPost, Utils, ngProgress, retailersManager, productsManager, insectsManager, packagesManager ) {
					//init data
					$scope.itemLength = 0;
          // $scope.needsCta = false;
          // $scope.displayName = false;
          // $scope.isSingle = false;
					//Get data
					this.updateCarousel = function(thisElem) {

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
									productsManager.getProducts(requestObj).then($scope.success, $scope.error);
									break;
								case 'package':
									packagesManager.getPackages(requestObj).then($scope.success, $scope.error);
									break;
								case 'retailer':
									retailersManager.getRetailers(requestObj).then($scope.success, $scope.error);
									break;
								default:
									throw("Sheeeeeeit");
							}
						}

						// $scope.managerGet(requestObj).then(success, error);
					}

					$scope.success = function(data) {
						$scope.items = data;
						$scope.itemLength = data.length;
						// $scope.$digest();
						$timeout(function(){
							$scope.$broadcast("items-loaded");
						}, 100);
						// console.log(data);
					}
					$scope.error = function(error){
						console.log("Fek");
					}

					$scope.$on('items-loaded', function(){
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
						}
					})
			}],
      // controllerAs: 'vm',
		};

	};

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectiveCarousel = appDirectiveCarousel || angular.module( 'appDirectiveCarousel', [ 'appUtils', 'appXHR', 'ngMaterial', 'ngProgress' ] );

		appDirectiveCarousel
			.directive( Application.Directives );


	});

	exports.appDirectiveCarousel = appDirectiveCarousel;
});
