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
* @return Angular.module.appDirectiveFooter
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
	require("app-page");
	require("angular-progress");
  require("angular-material");

	// Load dependent modules
	var appDirectiveFooter,
				appConfig		= JSON.parse(require("text!../../app/app.config.json")),
        domReady 		= require("domReady"),
        isMobile 		= require("isMobile"),
				angular 		= require("angular");

	//
	var Application = Application || {};
	Application.Directives = {};

	Application.Directives.uiFooter = function () {

		return {
			restrict: 		'AE',
			transclude: 	false, // pass entire template?
			templateUrl: 	appConfig.general.path+'/app/components/shared/footer/footer.php',
			scope: {
        //attribute params
				//paramName:'@paramname',
	    },
			link: function (scope, element, attrs, controller) {
        scope.open = function(page){
          // scope.static = '';
          // scope.current = '';
          // console.log("Showing footer page", page.post_name);
          // scope.current = page;
          
          switch (page) {
            case 'faq':
            case 'contact':
            case 'about':
            case 'legal':
              angular.element(element[0].querySelector("#footer")).addClass('open');
              break;
            default:
            angular.element(element[0].querySelector("#footer")).removeClass('open');
              return;
          }
        };
        // scope.openStatic = function(page){

        //   scope.static = '';
        //   scope.current = '';
        //   switch (page) {
        //     case 'faq':
        //       scope.static = 'faq';
        //       break;
        //     case 'contact':
        //       scope.static = 'contact';
        //       break;
        //     default:
        //       return;
        //   }
        //   element.addClass('open');
        // }
        scope.close = function() {
          console.log("Hiding footer page");
          element.removeClass('open');
        }

			},
			controller:  	[ '$rootScope', '$scope', '$sce', '$http', '$q', '$route', '$location', '$timeout',	'$mdSidenav', '$log', 'transformRequestAsFormPost', 'Utils', 'ngProgress', 'pagesManager', function ( $rootScope, $scope, $sce, $http, $q, $route, $location, $timeout, $mdSidenav, $log, transformRequestAsFormPost, Utils, ngProgress, pagesManager ) {
        var requestObj = {
          method: "GET",
          type: 'page'
        };
        $scope.pages = [];
        //get results from cache
        // $scope.items = $route.current.locals.app_data[$scope.contentType];
        //if no cache check request type
        //get curent action
        // $scope.currRoute = $route.current.$$route.action;
        // pagesManager.getPages(requestObj).then(function(data){
        //   $scope.pages = data;
        //   for (var i = 0; i < $scope.pages.length; i++) {
        //     $scope.pages[i].post_content = $sce.trustAsHtml($scope.pages[i].post_content);
        //   }
        //   if ($scope.currRoute) {
        //     $scope.goPage($scope.currRoute);
        //   }
        // }, function(err){
        //   console.log("Fek", err);
        // });
        $scope.setPage = function(page){
          $location.path("/"+page);
          // console.log("navigate to ",page);
        }

        $scope.$on( "$routeChangeStart", function(){
          $scope.close();
				});

        $scope.$on( "$routeChangeSuccess", function( ev, to, toParams, from, fromParams ){
          $scope.renderPath = $rootScope.renderPath;
          $scope.open(to.$$route.action);
				});
        // $scope.goPage = function (pageName) {
        //   $scope.close();
        //   switch (pageName) {
        //     case 'faq':
        //       $scope.openStatic(pageName);
        //       return;
        //     case 'contact':
        //       $scope.openStatic(pageName);
        //       return;
        //   }
        //   for (var i = 0; i < $scope.pages.length; i++) {
        //     if ($scope.pages[i].post_name == pageName) {
        //       $scope.open($scope.pages[i]);
        //       return;
        //     }
        //   }
        //   $scope.close();
        // }
			}],
      // controllerAs: 'vm',
		};

	};

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectiveFooter = appDirectiveFooter || angular.module( 'appDirectiveFooter', [ 'appUtils', 'appXHR', 'ngMaterial', 'ngProgress' ] );

		appDirectiveFooter
			.directive( Application.Directives );


	});

	exports.appDirectiveFooter = appDirectiveFooter;
});