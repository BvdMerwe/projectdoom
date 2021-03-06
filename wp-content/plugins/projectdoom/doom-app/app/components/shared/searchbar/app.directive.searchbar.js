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
* @return Angular.module.appDirectiveSearchBar
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
	require("app-search");
	require("angular-progress");
  require("angular-material");
  require("jlinq");

	// Load dependent modules
	var appDirectiveSearchBar,
				appConfig		= JSON.parse(require("text!../../app/app.config.json")),
        domReady 		= require("domReady"),
        isMobile 		= require("isMobile"),
				angular 		= require("angular");

	//
	var Application = Application || {};
	Application.Directives = {};

	Application.Directives.uiSearchBar = function () {

		return {
			restrict: 		'AE',
			transclude: 	false, // pass entire template?
			templateUrl: 	appConfig.general.path+'/app/components/shared/searchbar/searchbar.php',
			scope: {
        placeholderOnly: "@placeholderonly",
        contentType: "@contenttype"
	    },
			link: function (scope, element, attrs, controller) {
					scope.placeholder = attrs.placeholder;
					scope.placeholderOnly = attrs.placeholderonly;
          // scope.contentType = attrs.contenttype;
          if (!scope.placeholderOnly) {
            // scope.searchText = scope.placeholder.replace("...", " ");
          }
          scope.states  = scope.getData;
					var thisElem = element;
					/************************************
					*	functions
					************************************/


          element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                var searchtext = element[0].querySelector('input').value;
                scope.querySearch(searchtext, true);
                // event.preventDefault();
                // var elm = element[0].querySelector('input');
                // elm.blur();
                scope.results[0] = {
                  post_title: "Searching",
                  post_content: "..."
                }
                var autoChild = document.querySelector('md-autocomplete').firstElementChild;
                var el = angular.element(autoChild);
                el.scope().$mdAutocompleteCtrl.hidden = true;
            }
          });

			},
			controller:  	[ '$scope', '$http', '$q', '$route', '$location', '$timeout',	'$mdSidenav', '$log', '$filter', 'transformRequestAsFormPost', 'Utils', 'ngProgress', 'faqsManager', 'searchManager', 'retailersManager', 'productsManager', 'insectsManager', 'packagesManager', function ( $scope, $http, $q, $route, $location, $timeout, $mdSidenav, $log, $filter, transformRequestAsFormPost, Utils, ngProgress, faqsManager, searchManager, retailersManager, productsManager, insectsManager, packagesManager ) {
					//init data
          // $scope.searchText = "";
          // $scope.$watch('searchText', function(){
          //   if ($scope.searchText.length > 3) {
          //     console.log($route.current.locals.app_data);
          //   }
          // });
          if ($scope.contentType == 'faq') {
            $scope.results = $route.current.locals.app_data.faqs;
          }
          $scope.selectedItemChange = function(item) {
            // scope.searchText += item.post_title;
          }
          $scope.searchTextChange = function(searchText) {
            var insects = $route.current.locals.app_data.insects;
            var products = $route.current.locals.app_data.products;
            var faqs = $route.current.locals.app_data.faqs;
            var stuff = insects.concat(products.concat(faqs));

            var results = $filter('filter')(stuff, searchText);
            if ($scope.contentType) {
              if ($scope.contentType != "all") {
                results = jlinq
                  .from(results)
                  .equals("post_type", $scope.contentType)
                  .select();
              } else {
                results = jlinq
                  .from(results)
                  .sort('-post_type')
                  .select();
              }
            }
            $scope.results = results;
          }
          $scope.querySearch = function(searchText, search) {
            var deferred = $q.defer();
            deferred.resolve( $scope.getData(searchText, search) );
            return $scope.results;
          }
          // $scope.$watch('results', function(){
          //   console.log($scope.results);
          // })

          $scope.getData = function(query, search) {
            var results = [];
            var deferred = $q.defer();
            if (query === "") {
              $scope.results = results;
              deferred.reject();
              return deferred;
            }
            $scope.results = results;
            if (query.indexOf($scope.placeholder.replace("...", " ")) == 0 && !search) {
              query = query.replace($scope.placeholder.replace("...", " "), "").toLowerCase()
              var cache = $route.current.locals.app_data;
              for (var i = 0; i < cache.insects.length; i++) {
                // Utils.forEach(cache.insects, function (obj) {
                //   if (query.indexOf(obj) < 0) {
                //     results.push(obj);
                //   }
                // })
                var insect = cache.insects[i];
                var faq = cache.faq[i];
                if (insect.post_title.toLowerCase().indexOf(query) == 0) {
                  results.push(insect);
                // } else if (insect.post_content.toLowerCase().indexOf(query) == 0) {
                //   results.push(insect);
                // } else if (insect.post_content.toLowerCase().indexOf(query) >= 0) {
                //   results.push(insect);
                } else if (insect.post_type.toLowerCase().indexOf(query) >= 0) {
                  results.push(insect);
                } else {
                  for (var j = 0; j < insect.insect_categories.length; j++) {
                    var cat = insect.insect_categories[j];
                    var asd = cat.name.toLowerCase().indexOf(query.toLowerCase());
                    if (cat.name.toLowerCase().indexOf(query.toLowerCase()) >= 0){
                      results.push(insect);
                    }
                  }
                }
              }
              $scope.results = jlinq.from(results).sort('post_type');
              deferred.resolve( results );
            } else if (search) {
              // if (query == "") {
                var requestObj = {
    							method: "GET",
    							type: "search&q="+query
                };
                if ($scope.contentType == "faq") {
                  requestObj.type = "faq/search/&q="+query;
                }
                searchManager.getSearch(requestObj).then(function(data){
                  $scope.results = jlinq.from(data.results).sort('-post_type').select();
                  // $scope.$digest();
                  console.log(data);
                }, function(data){
                  $scope.results[0] = {
                    post_title: "Dont get bugged out",
                    post_content: "Your search has no results to show. Try something else."
                  }
                  console.log(data);
                });
              // }
            } else {
              cache = $route.current.locals.app_data;
              //restructure cache to an array
              var rebuildCache = cache/*.pagecontent.concat(cache.products)*/;

              results = $filter('filter')(rebuildCache, query);
              $scope.results = jlinq.from(results).sort('-post_type').select();
              deferred.resolve( results );
            }
            return deferred;
          }

          $scope.navigate = function (type, name) {
            switch (type) {
              case 'insect':
              case 'product':
                type += 's';
                $location.path('/'+type+'/'+name);
                break;
              case 'page':
                $location.path('/'+name);
                break;
            }
          }
			}],
      // controllerAs: 'vm',
		};

	};

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectiveSearchBar = appDirectiveSearchBar || angular.module( 'appDirectiveSearchBar', [ 'appUtils', 'appXHR', 'ngMaterial', 'ngProgress' ] );

		appDirectiveSearchBar
			.directive( Application.Directives );


	});

	exports.appDirectiveSearchBar = appDirectiveSearchBar;
});
