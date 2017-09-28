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
        scope.open = function(pageId){
          // scope.current =
          console.log("Showing footer page ", pageId);
          for (var i = 0; i < scope.pages.length; i++) {
            if (scope.pages[i].ID == pageId) {
              scope.current = scope.pages[i];
              // scope.setPage(scope.pages[i]);
              element.addClass('open');
              break;
            }
          }
        };
        scope.close = function() {
          console.log("Hiding footer page");
          element.removeClass('open');
        }
			},
			controller:  	[ '$scope', '$http', '$q', '$route', '$location', '$timeout',	'$mdSidenav', '$log', 'transformRequestAsFormPost', 'Utils', 'ngProgress', 'pagesManager', function ( $scope, $http, $q, $route, $location, $timeout, $mdSidenav, $log, transformRequestAsFormPost, Utils, ngProgress, pagesManager ) {
        var requestObj = {
          method: "GET",
          type: 'page'
        };
        //get results from cache
        // $scope.items = $route.current.locals.app_data[$scope.contentType];
        //if no cache check request type
        pagesManager.getPages(requestObj).then(function(data){
          $scope.pages = data;
        }, function(err){
          console.log("Fek", err);
        });

        $scope.setPage = function(page){
          $location.path("/"+page);
          // console.log("navigate to ",page);
        }

        $scope.$on( "$routeChangeSuccess", function( ev, to, toParams, from, fromParams ){
          console.log(to.$$route.action);
          var pageName = to.$$route.action;
          for (var i = 0; i < $scope.pages.length; i++) {
            if ($scope.pages[i].post_name == pageName) {
              $scope.open($scope.pages[i].ID);
              return;
            }
          }
          $scope.close();

				});

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
