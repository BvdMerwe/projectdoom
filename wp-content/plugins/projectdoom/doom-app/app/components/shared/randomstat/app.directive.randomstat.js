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
* @return Angular.module.appDirectiveRandomstat
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

	// Load dependent modules
	var appDirectiveRandomstat,
				appConfig		= JSON.parse(require("text!../../app/app.config.json")),
        domReady 		= require("domReady"),
        isMobile 		= require("isMobile"),
				angular 		= require("angular");

	//
	var Application = Application || {};
	Application.Directives = {};

	Application.Directives.uiRandomstat = function () {

		return {
			restrict: 		'AE',
			transclude: 	false, // pass entire template?
			templateUrl: 	appConfig.general.path+'/app/components/shared/randomstat/randomstat.php',
			scope: {
        timer: "@",
        duration: "=?"
	    },
			link: function (scope, element, attrs, controller) {

			},
			controller:  	[ '$scope', '$http', '$q', '$route', '$location', '$timeout',	'$interval',	'$mdSidenav', '$log', 'transformRequestAsFormPost', 'Utils', 'insectsManager', function ( $scope, $http, $q, $route, $location, $timeout, $interval, $mdSidenav, $log, transformRequestAsFormPost, Utils, insectsManager ) {
        if ($scope.duration == undefined) {
          $scope.duration = 1500;
        }
        $scope.stats = [
          {
            insect: "ant",
            stats: [
              // { name: "eggs", stat: 0, firstPart: "lay", secondPart: "eggs", pastFirst: "layed", pastSecond: "eggs"},
              // { name: "poops", stat: -300, firstPart: "poop", secondPart: "times", pastFirst: "pooped", pastSecond: "times"},
              { name: "vomit", stat: 86400, firstPart: "vomit", secondPart: "times", pastFirst: "vomited", pastSecond: "times"},
            ]
          },
          {
            insect: "cockroach",
            stats: [
              { name: "eggs", stat: 2.35, firstPart: "lay", secondPart: "eggs", pastFirst: "layed", pastSecond: "eggs"},
              // { name: "poops", stat: -30, firstPart: "poop", secondPart: "times", pastFirst: "pooped", pastSecond: "times"},
              { name: "molt", stat: 0.09, firstPart: "molt", secondPart: "times", pastFirst: "molted", pastSecond: "times"},
            ]
          },
          {
            insect: "fishmoth",
            stats: [
              { name: "eggs", stat: 2.5, firstPart: "lay", secondPart: "eggs", pastFirst: "layed", pastSecond: "eggs"},
              // { name: "poops", stat: -120, firstPart: "poop", secondPart: "times", pastFirst: "pooped", pastSecond: "times"},
              { name: "molt", stat: 0.02, firstPart: "molt", secondPart: "times", pastFirst: "molted", pastSecond: "times"},
            ]
          },
          {
            insect: "flea",
            stats: [
              { name: "eggs", stat: 50, firstPart: "lay", secondPart: "eggs", pastFirst: "layed", pastSecond: "eggs"},
              { name: "poops", stat: 288, firstPart: "poop", secondPart: "times", pastFirst: "pooped", pastSecond: "times"},
              { name: "sucks", stat: 15, firstPart: "suck blood", secondPart: "times", pastFirst: "sucked blood", pastSecond: "times"},
            ]
          },
          {
            insect: "fly",
            stats: [
              { name: "eggs", stat: 71.42, firstPart: "lay", secondPart: "eggs", pastFirst: "layed", pastSecond: "eggs"},
              { name: "poops", stat: 86400, firstPart: "poop", secondPart: "times", pastFirst: "pooped", pastSecond: "times"},
              { name: "vomit", stat: 86400, firstPart: "vomit", secondPart: "times", pastFirst: "vomited", pastSecond: "times"},
            ]
          },
          {
            insect: "mosquito",
            stats: [
              { name: "eggs", stat: 10, firstPart: "lay", secondPart: "eggs", pastFirst: "layed", pastSecond: "eggs"},
              // { name: "poops", stat: 0, firstPart: "poop", secondPart: "times", pastFirst: "pooped", pastSecond: "times"},
              { name: "sucks", stat: 1, firstPart: "suck blood", secondPart: "times", pastFirst: "sucked blood", pastSecond: "times"},
            ]
          }
        ];
        $scope.randStat = Utils.getRandomInt(0, 2);
        $scope.show = [];
        $scope.dynamic = {
          amount: 1
        };
        var lastTime = new Date();
        var now = new Date();
        // lastTime.setHours(now.getHours() - (2));
        var timePassed = (now.getTime() - lastTime.getTime()) / 1000;

        $scope.init = function(){
          if ($scope.timer) {
            $scope.show = $scope.show.concat($scope.stats);
            startTimer(timePassed, $scope.duration);
          } else {
            var randIndex = Utils.getRandomInt(0, $scope.stats.length-1);
            var randDays = Utils.getRandomInt(10, 28);
            // var randDays = timePassed / 86400;
            var stat = $scope.stats[randIndex];
            for (var i = 0; i < stat.stats.length; i++) {
              stat.time = randDays;
              stat.stats[i].stat *= randDays;
              stat.stats[i].dummy = 0;
              stat.stats[i].show = "0";
            }
            $scope.show.push(stat);
            $scope.randStat = Utils.getRandomInt(0, stat.stats.length-1);
            numberClimb(stat.stats[$scope.randStat].stat, $scope.duration);
          }

          function numberClimb(to, duration) {
            var difference = to - stat.stats[$scope.randStat].dummy;
            var perTick = difference / duration * 10;
            $timeout(function () {
                stat.stats[$scope.randStat].dummy = stat.stats[$scope.randStat].dummy + perTick;
                stat.stats[$scope.randStat].show = Utils.numberWithCommas(Math.round(stat.stats[$scope.randStat].dummy));
                if (stat.stats[$scope.randStat].dummy == to) return;
                numberClimb(to, duration - 10);
            }, 10);
          }
        }
        var timer_1;
        function startTimer(startTime , updateSpeed) {

          startTime   = typeof startTime !== 'undefined' ? startTime : 0;
          updateSpeed = typeof updateSpeed !== 'undefined' ? updateSpeed : 0;

          var count = 0,
              second = updateSpeed / 1000,
              // seconds = updateSpeed / 10,
              secondsPerDay = 86400;
          
          count = startTime / second;
          $scope.time = 0;
          timer_1 = new timer();
          timer_1.start(function(){
            $scope.timeCoefficient = count * (second / secondsPerDay);
            for (var x = 0; x < $scope.show.length; x++) {
              for (var i = 0; i < $scope.show[x].stats.length; i++) {
                $scope.show[x].time = count;
                $scope.show[x].stats[i].dummy = 0;
                $scope.show[x].stats[i].show = Utils.numberWithCommas((($scope.show[x].stats[i].stat * $scope.timeCoefficient) * $scope.dynamic.amount).toFixed(2));
              }
            }
            count += 1;
            $scope.time = Utils.toDHMS(count * second);
            // $scope.time = Utils.toHHMMSS(count * second);
          }, updateSpeed, false);
        }
        function timer() //https://github.com/Atticweb/smart-interval
        {
          var timer = {
              running: false,
              iv: 1000,
              timeout: false,
              cb : function(){},
              start : function(cb,iv,sd){
                  var elm = this;
                  clearInterval(this.timeout);
                  this.running = true;
                  if(cb) this.cb = cb;
                  if(iv) this.iv = iv;
                  if(sd) elm.execute(elm);
                  this.timeout = $timeout(function(){elm.execute(elm)}, this.iv);
              },
              execute : function(e){
                  if(!e.running) return false;
                  e.cb();
                  e.start();
              },
              stop : function(){
                  this.running = false;
              },
              set_interval : function(iv){
                  $timeout.cancel(this.timeout);
                  this.start(false, iv);
              }
          };
          return timer;
        }
        // $scope.$on('$routeChangeSuccess', function (){
          $scope.init();
        // });
			}],
      // controllerAs: 'vm',
		};

	};

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectiveRandomstat = appDirectiveRandomstat || angular.module( 'appDirectiveRandomstat', [ 'appUtils', 'appXHR', 'ngMaterial', 'ngProgress' ] );

		appDirectiveRandomstat
			.directive( Application.Directives );


	});

	exports.appDirectiveRandomstat = appDirectiveRandomstat;
});
