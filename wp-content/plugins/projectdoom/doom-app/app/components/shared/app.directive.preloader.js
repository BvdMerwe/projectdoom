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
* @return Angular.module.appDirectivePreloader
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
    
	require("app-utils");
    require("angular-material");

	// Load dependent modules
	var appDirectivePreloader,
		domReady 		= require("domReady"),
		angular 		= require("angular");

	// 
	var Application = Application || {};
	Application.Directives = {};
	
	Application.Directives.uiPreloader = function () {
        
        return {
            restrict: 		'AE',
            scope: 			{},
            transclude: 	true,
            template: 		'<div data-ng-transclude></div>',
            link: 			function( scope, element, attrs ) {
        
                //console.log('Cheif', element[0]);
        
                function fadeout() {
        
                    //console.info('Fading out...', element[0]);
        
                    var anti_fousc = element[0].style;
                    
                    anti_fousc.opacity = 1;
                    (function fade(){
                        (anti_fousc.opacity-=.1)<0.2?_openUp():setTimeout(fade,20);
                    })();
        
                };
        
                function _openUp() {
        
                    var anti_fousc = element[0].style;
        
                    anti_fousc.display="none";
        
                    //window.sr = new scrollReveal( srDefaults );
                }
        
                domReady( function () {
        
                    fadeout();
        
                });
        
            }
        }
        
    }

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectivePreloader = appDirectivePreloader || angular.module( 'appDirectivePreloader', [ 'appUtils', 'ngMaterial' ] );

		appDirectivePreloader
			.directive( Application.Directives );


	});
		
	exports.appDirectivePreloader = appDirectivePreloader;
});