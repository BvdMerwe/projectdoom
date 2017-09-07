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
* @return Angular.module.appDirectiveScrollToTop
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
	var appDirectiveScrollToTop,
        domReady 		= require("domReady"),
        isMobile 		= require("isMobile"),
		angular 		= require("angular");

	// 
	var Application = Application || {};
	Application.Directives = {};
	
	Application.Directives.uiScrollTop = function () {
        
        return {
            restrict: 		'AE',
            scope: 			{},
            transclude: 	true,
            template: 		'<div data-ng-transclude></div>',
            link: 			function( scope, element, attrs ) {
        
                //console.log('TouchInput:', element);
        
                var header_height 	= document.getElementById('branding');
        
                element[0].style.display = 'none';
        
                var cleanUp = function () {
        
                    removEvent( element[0], 'click' );
        
                    header_height = null;
        
                };
        
                        function addEvent( element, eventName, callback ) {
        
                            if ( element.addEventListener ) {
        
                                element.addEventListener(eventName, callback, false)
        
                            } else {
        
                                element.attachEvent( 'on' + eventName, callback, false);
                            }
        
                        }
        
                        function removEvent( element, eventName, callback ) {
        
                            if ( element.removeEventListener ) {
        
                                element.removeEventListener(eventName, callback, false)
        
                            } else {
        
                                element.removeEvent( 'on' + eventName, callback, false);
                            }
        
                        }
        
                        function toShowOrNot() {
        
                            //topOfpage var ini					
                            var y = window.pageYOffset;
        
                            if( header_height == null ) {
                                return;
                            }
        
                            if ( y > header_height.offsetHeight ) {
        
                                element[0].style.display = '';
                                                    
                            } else {
        
                                element[0].style.display = 'none';
                            
                            }
        
                            return false;
        
                        }
                        
                if( isMobile.any() ){} else {
        
                    addEvent( element[0], 'click', function(e) {
        
                        e.preventDefault();
        
                        scope.scrollToTop( window.document.body );
        
                        return false;
        
                    });
        
                    if ( window.addEventListener ) {
                        
                        window.addEventListener( 'scroll', function(e) {
        
                            toShowOrNot();
        
                        });
                    
                    } else {
        
                        window.attachEvent( 'onScroll', function(e){
        
                            toShowOrNot();
        
                        });
        
                    }
        
                }
        
                scope.$on( '$destroy', cleanUp );
        
            },
            controller:  	[ '$scope', 'Utils', function ( $scope, Utils ) {
        
                /**
                 * @public
                 * 
                 * Scroll to top of element
                 **/
                $scope.scrollToTop = function( element ) {
        
                    Utils.scrollTo( element, 0, 150 );
        
                    //Utils.scrollTo( window.document.body, 0, 150 );
        
                };
        
            }]
        }
        
    }

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appDirectiveScrollToTop = appDirectiveScrollToTop || angular.module( 'appDirectiveScrollToTop', [ 'appUtils', 'ngMaterial' ] );

		appDirectiveScrollToTop
			.directive( Application.Directives );


	});
		
	exports.appDirectiveScrollToTop = appDirectiveScrollToTop;
});