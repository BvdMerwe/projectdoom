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
* @return Angular.module.appDirectiveConfigurator
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
	var appDirectiveConfigurator,
				appConfig		= JSON.parse(require("text!../../app/app.config.json")),
        domReady 		= require("domReady"),
        isMobile 		= require("isMobile"),
				angular 		= require("angular");

	//
	var Application = Application || {};
	Application.Directives = {};

	Application.Directives.uiConfigurator = function () {

		return {
			restrict: 		'AE',
			transclude: 	false, // pass entire template?
			templateUrl: 	appConfig.general.path+'/app/components/shared/configurator/configurator.php',
			scope: {
        //attribute params
				//paramName:'@paramname',
	    },
			link: function (scope, element, attrs, controller) {
        scope.config.pest = attrs.pest;
        // for (var i = 0; i < scope.insects; i++) {
        //   if (attrs.pest == scope.insects[i].post_name) {
        //     scope.insects[i].selected = 'selected';
        //     break;
        //   }
        // }
        scope.$on("$routeChangeSuccess", function(ev, to){
          scope.config.pest = to.params.ID;
          var insects = scope.insects;
          for (var i = 0; i < insects.length; i++) {
            insects[i].selected = '';
            if (typeof scope.config.pest == "string" && scope.config.pest.toLowerCase() == insects[i].post_name.toLowerCase()) {
              insects[i].selected = 'selected';
              scope.config.pest = insects[i];
            }
          }
          scope.insects = insects;
          
          scope.init();        
        });

			},
			controller:  	[ '$scope', '$sce', '$filter', '$http', '$q', '$route', '$location', '$timeout',	'$mdSidenav', '$mdDialog', '$log', 'transformRequestAsFormPost', 'Utils', 'ngProgress', 'insectsManager','productsManager', 'AnalyticsEvents', function ( $scope, $sce, $filter, $http, $q, $route, $location, $timeout, $mdSidenav, $mdDialog, $log, transformRequestAsFormPost, Utils, ngProgress, insectsManager, productsManager, AnalyticsEvents ) {

        $scope.config = {
          pest: "",
          duration: 1,
          amount: 1,
          location: [],
        };
        $scope.result = {
          product: {},
          stats: [],
          infestation: false
        };
        $scope.state = 1;
        $scope.breadcrumbState = 1;
        $scope.step1State = "active";
        $scope.step2State = "";
        $scope.step3State = "";
        $scope.finalPage = "";

        // $scope.$watch('breadcrumbState', function() {
        //   $scope.setState($scope.breadcrumbState);
        // });
        //
        // $scope.$watch('state', function() {
        //   $scope.breadcrumbState = $scope.state;
        // });

        $scope.next = function (pest, event){
          $scope.state++;
          $scope.breadcrumbState++;
          if (pest != undefined) {
            $scope.config.pest = pest;
          }
          if ($scope.step1State == 'active') {
            $scope.step1State = 'inactive';
            $scope.step2State = 'active';
            if (angular.isDefined(event)) {
              AnalyticsEvents.send("Configurator", "interaction", "insect_changed", ""+$scope.config.pest.post_name);
            }
            $location.path('/insects/'+$scope.config.pest.post_name);
          } else if ($scope.step2State == 'active') {
            AnalyticsEvents.send("Configurator", "interaction", "set", "frequency");
            $scope.step2State = 'inactive';
            $scope.step3State = 'active';
          } else if ($scope.step3State == 'active') {
            // $scope.step3State = 'inactive';
            // step2State = 'active';
            if ($scope.config.location.length < 1) {
              
              //alert("Please select at least one location");
              $scope.state--;
              $scope.breadcrumbState--;
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(true)
                  .textContent("Please select at least one location")
                  .ariaLabel('Configurator validation result')
              );

            } else {
              AnalyticsEvents.send("Configurator", "interaction", "set", "location");
              $scope.result = $scope.evaluate($scope.config);
              $scope.showStat($scope.result.stats[0]);
              console.log($scope.config);
              console.log($scope.result);
              console.log($scope.products);
              /*
              $scope.config = {
                pest: "",
                duration: 1,
                amount: 1,
                location: [],
              };
              */
              AnalyticsEvents.send("Configurator", "input", "pest", $scope.config.pest.post_name);
              AnalyticsEvents.send("Configurator", "input", "duration", $scope.config.duration);
              AnalyticsEvents.send("Configurator", "input", "amount", $scope.config.amount);
              AnalyticsEvents.send("Configurator", "input", "location", $scope.config.location);

              var possibleSolution = [];
              //filter the products to match insect
              for (var i = 0; i < $scope.products.length; i++) { //foreach product
                var prod = $scope.products[i];
                prod.score = 0;
                var prodCats = [];
                var prodCatsStr = [];
                //flatten all categories
                for (var c = 0; prod.product_categories != undefined &&
                                c < prod.product_categories.length; c++) {
                  prodCats.push(prod.product_categories[c].term_id);
                  prodCatsStr.push(prod.product_categories[c].slug);
                }
                for (c = 0; prod.product_categories != undefined &&
                            c < prod.insect_categories.length; c++) {
                  prodCats.push(prod.insect_categories[c].term_id);
                  prodCatsStr.push(prod.insect_categories[c].slug);
                }
                //compare insect categories to product categories
                // for (var ic = 0; ic < $scope.config.pest.insect_categories.length; ic++) {
                //   var iCat = $scope.config.pest.insect_categories[ic].term_id;
                //   if (prodCats.includes(iCat)) {
                //     prod.score++;
                //   }
                //   if (prodCatsStr.includes($scope.config.pest.post_name)) {
                //     prod.score++;
                //   }
                // }

                if ($scope.result.infestation) {
                  if (prodCatsStr.includes("infestation")) {
                    prod.score += 0.5;
                  }
                } else {
                  if (prodCatsStr.includes("single")) {
                    // prod.score += 0.1;
                  }
                }
                if ($scope.config.location.includes("outside")) {
                  if (prodCatsStr.includes("outdoors")) {
                    prod.score += 0.1;
                  }
                } else {
                  if (prodCatsStr.includes("indoors")) {
                    // prod.score += 0.1;
                  }
                }
                // if (prod.score > 0) {
                  possibleSolution.push(prod);
                  // console.log(prod.post_name, prod.score);
                // }
              }
              //get product with highest score
              var highscore = -1000;
              var solution;
              for (var x = 0; x < possibleSolution.length; x++) {
                if (possibleSolution[x].score > highscore) {
                  highscore = possibleSolution[x].score;
                  solution = possibleSolution[x];
                }
              }
              // console.log(possibleSolution);
              // console.log(solution.post_name, solution.score);
              $scope.result.product = solution;

              /*
              $scope.result = {
                product: {},
                stats: [],
                infestation: false
              };
              */
              AnalyticsEvents.send("Configurator", "output", "product", $scope.result.product.post_name);
              // AnalyticsEvents.send("Configurator", "output", "infestation", $scope.result.infestation);

              $scope.finalPage = "active";
              $scope.step1State = "";
              $scope.step2State = "";
              $scope.step3State = "";
            }
          }
        }
        $scope.prev = function (){
          $scope.state--;
          $scope.breadcrumbState--;
          if ($scope.step1State == 'active') {

          } else if ($scope.step2State == 'active') {
            $scope.step2State = '';
            $scope.step1State = 'active';
          } else if ($scope.step3State == 'active') {
            $scope.step3State = '';
            $scope.step2State = 'active';
          }
        }
        $scope.setState = function (state){
          $scope.state = state;
          $scope.breadcrumbState = state;
          AnalyticsEvents.send("Configurator", "state", "state_changed", "step_"+state);
          switch (state) {
            case 1:
              if ($scope.config.pest == "") {
                break;
              }
              $scope.step1State = 'active';
              $scope.step2State = '';
              $scope.step3State = '';
              $scope.finalPage = '';
              break;
            case 2:
              if ($scope.config.pest == "") {
                break;
              }
              $scope.step1State = 'inactive';
              $scope.step2State = 'active';
              $scope.step3State = '';
              $scope.finalPage = '';
              break;
            case 3:
              if ($scope.config.pest == "") {
                break;
              }
              $scope.step1State = 'inactive';
              $scope.step2State = 'inactive';
              $scope.step3State = 'active';
              $scope.finalPage = '';
              $scope.scrollTo("#makethemstop");
              break;
            case 4:
              if ($scope.config.location.length < 1) {
                $scope.breadcrumbState = 3;
                break;
              }
              $scope.step1State = '';
              $scope.step2State = '';
              $scope.step3State = '';
              $scope.finalPage = 'active';

          }
        }
        $scope.setLocation = function (location) {
          var index = $scope.config.location.indexOf(location);
          if (location == 'everywhere' && $scope.config.location.length == 5) {
            $scope.config.location = [];
          } else if (index < 0) {
            if (location == 'everywhere') {
              $scope.config.location = ["bathroom", "living", "kitchen", "outside", "bedroom"];
            } else {
              $scope.config.location.push(location);
            }
          } else {
            $scope.config.location.splice(index, 1);
          }
        }
        var requestObjProducts = {
          method: 'GET',
          type: 'product'
        };

        productsManager.getProducts(requestObjProducts).then(function(result){
          productsManager.filterProductsByPest([{slug: $scope.config.pest}], result).then(function(data){
            var products = data;
            $scope.products = products;
          }, function(err){
            console.log("Fek", err);
          });
        });

        var requestObjInsect = {
          method: 'GET',
          type: 'insect'
        };
        $scope.insects = [];

        insectsManager.getInsects(requestObjInsect).then(function(data){
          var insects = data;
          for (var i = 0; i < insects.length; i++) {
            insects[i].selected = '';
            if ($scope.config.pest.toLowerCase() == insects[i].post_name.toLowerCase()) {
              insects[i].selected = 'selected';
              $scope.config.pest = insects[i];
              $scope.next();
              break;
            }
          }
          $scope.insects = insects;
        }, function(err){
          console.log("Fek", err);
        });

        $scope.evaluate = function (config) {
          // console.clear();
          // console.log("inputs",$scope.config);
          // if ($scope.result.pest == $scope.pest) {
          //   return $scope.result;
          // }
/** /

          Get product from pest type
          Determine solution by infestation or not

          //assumptions
          //Amount
          1 (few) = 1 to 3
          3 (many) = 6 to 10

          //Time
          1 (day) = as many as seen
          2 (week) = 2.3 times as many as seen
          3 (month) = 10 times as many as seen
          also affects data point coefficient in days

          //location
          1 place = not a problem (as many as seen)
          2 places = slight problem (twice as many as seen)
          >2 places = Infestation (10 times as many as seen)

          Main Calculation
          (amountCoefficient * (avg Of Time and Location Coefficients)) * (dataPoint * days) = resultedAmount

          ///////////////////////////////////////*/
          //set values to int
          if (typeof config.duration == "string") config.duration = parseInt(config.duration);
          if (typeof config.amount == "string") config.amount = parseInt(config.amount);
          var pest = config.pest;
          var dataPoints = {
            eggs: parseFloat(pest.doom_insect_egg),
            blood: parseFloat(pest.doom_insect_sucks),
            molts: parseFloat(pest.doom_insect_molt),
            vomits: parseFloat(pest.doom_insect_vomit),
            poops: parseFloat(pest.doom_insect_poop)
          }
          var statCopy = {
            eggs: pest.doom_insect_egg_copy,
            blood: pest.doom_insect_sucks_copy,
            molts: pest.doom_insect_molt_copy,
            vomits: pest.doom_insect_vomit_copy,
            poops: pest.doom_insect_poop_copy
          }

          var amountCoefficient = 0;
          switch (config.amount) {
            case 1:
              amountCoefficient = Utils.getRandomInt(2, 3);
              break;
            case 2:
              amountCoefficient = Utils.getRandomInt(6, 10);
              break;
          }

          var timeCoefficent = 0;
          var days = 0;
          switch (config.duration) {
            case 1:
              // amountCoefficient *= 1;
              timeCoefficent = 1;
              days = 1;
              break;
            case 2:
              // amountCoefficient *= 2;
              timeCoefficent = 2.3;
              days = 7;
              break;
            case 3:
              // amountCoefficient *= 10;
              timeCoefficent = 10;
              days = 30;
              break;
            case 4:
              // amountCoefficient *= 10;
              timeCoefficent = 100;
              days = 360;
              break;
          }

          var locationCoefficient = 0;
          //if outside
          switch (config.location.length) {
            case 1:
              locationCoefficient = 1;
              break;
            case 2:
              locationCoefficient = Utils.getRandomInt(2, 3);
              break;
            case 3:
              locationCoefficient = Utils.getRandomInt(4, 5);
              break;
            case 4:
              locationCoefficient = Utils.getRandomInt(6, 8);
              break;
            default:
              locationCoefficient = Utils.getRandomInt(9, 10);
              break;
          }

          //Main calc
          var infestation = false;
          var timeLocationAvg = (timeCoefficent + locationCoefficient) / 2;
          var projectedAmount = amountCoefficient * (timeLocationAvg);
          if (projectedAmount > 10 || config.location.length > 3) {
            infestation = true;
          }
          var results = [];
          for (var key in dataPoints){
            if (typeof dataPoints[key] !== 'function') {
              if (!isNaN(dataPoints[key]) && dataPoints[key] != undefined ) {
                var resultedAmount = Math.floor(projectedAmount * (dataPoints[key] * days));
                if (resultedAmount > 1) {  
                  var copy = statCopy[key];
                  results.push({
                    type: key,
                    copy: copy,
                    stat: resultedAmount
                  });
                }
                // results[key]= resultedAmount;
              }
            }
          }
          return {
            pest: pest,
            product: {},
            days: days,
            stats: results,
            infestation: infestation
          };
          // console.log("pest",config.pest.post_name);
          // console.log("days",days);
          // console.log("locations",config.location.length);
          // console.log("probable amount",amountCoefficient);
          // console.log("location coefficient",locationCoefficient);
          // console.log("time coefficient",timeCoefficent);
          // console.log("time and location projected amount",projectedAmount);
          // console.log(results);
/**/
        }

        $scope.showStat = function (stat) {
          stat.formatted = $scope.outputCopy(stat);
          $scope.selectedStat = stat;

          if( $scope.finalPage == "active" ) {
            //console.log('.icon-' + stat.type);

            var allStats =  document.querySelectorAll('.stat-selector .icon' );

            for (var index = 0; index < allStats.length; index++) {
                
                var element = allStats[index];

                if( element.classList.contains('active') ) {
                  element.classList.remove('active');
                  break;
                }

            }
            if (stat.type != 'molts') {
              document.querySelector('.stat-selector .icon-' + stat.type ).classList.toggle('active');
            } else {
              document.querySelector('.stat-selector .icon-' + $scope.config.pest.post_name ).classList.toggle('active');
            }

          }

        }

        $scope.outputCopy = function (stat) {
          var copy = stat.copy;
          if (stat.copy != undefined && stat.copy.indexOf("#STAT#") >= 0) {
            // var number = Utils.numberWithCommas(stat.stat);
            copy = copy.replace("#STAT#", "<br/><span class='stat'>"+$filter('shortNumber')(stat.stat)+"</span><br/>");
          }
          if (copy != undefined && copy.indexOf("#TIME#") >= 0) {
            var time = "";
            switch ($scope.result.days) {
              case 1:
                time = "few days";
                break;
              case 7:
                time = "week";
                break;
              case 30:
                time = "month";
                break;
              case 360:
                time = "year";
                break;
            }
            copy = copy.replace("#TIME#", time);
          }
          // return $sce.trustAsHtml("<br/><span class='stat'>"+$filter('shortNumber')(stat.stat) +" "+ stat.type+"</span><br/>");
          return $sce.trustAsHtml(copy);
        }
        
        $scope.goto = function (path) {
          $scope.scrollToTop();
          $location.path(path);
        }
        $scope.scrollTo = function(id) {
          // AnalyticsEvents.send($route.current.$$route.action, "scroll_to_button", "clicked", id);
          Utils._strict( [ String ], arguments );
            // console.log(document.querySelector(id));
          var to = document.querySelector(id).offsetTop;
          // Utils.scrollTo(document,to, 300);
          // window.scrollTo(0, to)
          Utils.scrollWithEase(to);
        }
        
        $scope.scrollToTop = function() {
          Utils.scrollWithEase(0);
        }

        $scope.init = function() {
          productsManager.getProducts({method: 'GET',type: 'product'}).then(function(result){
            productsManager.filterProductsByPest([{slug: $scope.config.pest.post_name}], result).then(function(data){
              var products = data;
              $scope.products = products;
            }, function(err){
              console.log("Fek", err);
            });
          });
        }
			}],
      // controllerAs: 'vm',
		};

	};

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectiveConfigurator = appDirectiveConfigurator || angular.module( 'appDirectiveConfigurator', [ 'appUtils', 'appXHR', 'ngMaterial', 'ngProgress', 'appAnalyticsEvents' ] );

		appDirectiveConfigurator
			.directive( Application.Directives );


	});

	exports.appDirectiveConfigurator = appDirectiveConfigurator;
});
