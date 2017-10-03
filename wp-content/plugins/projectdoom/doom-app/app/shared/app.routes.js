/**
* @private
* 
* 
* @App Dependencies [ angular-route, angular-progress, angular, domReady ]
*
* @return Angular.appRoutes
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

	require("angular-route");
	require("angular-progress");

	// Load dependent modules
    var appRoutes,
        domReady 		= require("domReady"),
		angular 		= require("angular");
 
	var Application = Application || {};
	
	domReady( function () {

		/*
		 * APP MODULE
		 */
		appRoutes = appRoutes || angular.module( 'appRoutes', [ 'ngRoute', 'ngProgress' ] );

		appRoutes
			.config( [ '$routeProvider', '$locationProvider', function ( $routeProvider, $locationProvider ) {

				$locationProvider
					.html5Mode( false )
					.hashPrefix('!#');
                    
                // START ROUTES
				$routeProvider
                    .when(
                        '/',
                        {
                            action: 	'home',
                            resolve: {
                                app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return $q.all([
                                        pagesManager.getPages({
                                            'type': 'home',
                                            'method': 'GET'
                                        }),
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        }),
                                        faqsManager.getFAQs({
                                            'type': 'faq',
                                            'method': 'GET'
                                        }),
                                        retailersManager.getRetailers({
                                            'type': 'retailer',
                                            'method': 'GET'
                                        }),
                                        MemCache.dataTaxonomy(),
                                        SessionService.checkSession()
                                    ])
                                    .then( function(results){

                                            //console.log('route data-products:', results);   

                                            var firstVisit = new Date(results[6].firstVisit);
                                            var lastVisit = new Date(results[6].lastVisit);
                
                                            //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());
 
                                            return {
                                                faqs 	    : results[3],
                                                insects 	: results[2],
                                                products 	: results[1],
                                                pagecontent : results[0],
                                                retailers   : results[4],
                                                taxonomy    : results[5],
                                                session     : results[6]
                                            }; 

                                        }, function(e){

                                            //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                            console.error('No bootUp(products): ', e); 

                                            return e;

                                        }
                                    );

                                }] 
                            }

                        }
                    )
                    .when(
                        '/about',
                        {
                            action: 	'about',
                            resolve: {
                                app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return $q.all([
                                        pagesManager.getPages({
                                            'type': 'home',
                                            'method': 'GET'
                                        }),
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        }),
                                        faqsManager.getFAQs({
                                            'type': 'faq',
                                            'method': 'GET'
                                        }),
                                        retailersManager.getRetailers({
                                            'type': 'retailer',
                                            'method': 'GET'
                                        }),
                                        MemCache.dataTaxonomy(),
                                        SessionService.checkSession()
                                    ])
                                    .then( function(results){

                                            //console.log('route data-products:', results);   

                                            var firstVisit = new Date(results[6].firstVisit);
                                            var lastVisit = new Date(results[6].lastVisit);
                
                                            //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());
 
                                            return {
                                                faqs 	    : results[3],
                                                insects 	: results[2],
                                                products 	: results[1],
                                                pagecontent : results[0],
                                                retailers   : results[4],
                                                taxonomy    : results[5],
                                                session     : results[6]
                                            }; 

                                        }, function(e){

                                            //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                            console.error('No bootUp(products): ', e); 

                                            return e;

                                        }
                                    );

                                }] 
                            }

                        }
                    )
                    .when(
                        '/legal',
                        {
                            action: 	'legal',
                            resolve: {
                                app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return $q.all([
                                        pagesManager.getPages({
                                            'type': 'home',
                                            'method': 'GET'
                                        }),
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        }),
                                        faqsManager.getFAQs({
                                            'type': 'faq',
                                            'method': 'GET'
                                        }),
                                        retailersManager.getRetailers({
                                            'type': 'retailer',
                                            'method': 'GET'
                                        }),
                                        MemCache.dataTaxonomy(),
                                        SessionService.checkSession()
                                    ])
                                    .then( function(results){

                                            //console.log('route data-products:', results);   

                                            var firstVisit = new Date(results[6].firstVisit);
                                            var lastVisit = new Date(results[6].lastVisit);
                
                                            //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());
 
                                            return {
                                                faqs 	    : results[3],
                                                insects 	: results[2],
                                                products 	: results[1],
                                                pagecontent : results[0],
                                                retailers   : results[4],
                                                taxonomy    : results[5],
                                                session     : results[6]
                                            }; 

                                        }, function(e){

                                            //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                            console.error('No bootUp(products): ', e); 

                                            return e;

                                        }
                                    );

                                }] 
                            }

                        }
                    )
                    .when(
                        '/products',
                        {
                            action: 	'products',
                            resolve: {
                                app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return $q.all([
                                        pagesManager.getPages({
                                            'type': 'home',
                                            'method': 'GET'
                                        }),
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        }),
                                        faqsManager.getFAQs({
                                            'type': 'faq',
                                            'method': 'GET'
                                        }),
                                        retailersManager.getRetailers({
                                            'type': 'retailer',
                                            'method': 'GET'
                                        }),
                                        MemCache.dataTaxonomy(),
                                        SessionService.checkSession()
                                    ])
                                    .then( function(results){

                                            //console.log('route data-products:', results);   

                                            var firstVisit = new Date(results[6].firstVisit);
                                            var lastVisit = new Date(results[6].lastVisit);
                
                                            //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());
 
                                            return {
                                                faqs 	    : results[3],
                                                insects 	: results[2],
                                                products 	: results[1],
                                                pagecontent : results[0],
                                                retailers   : results[4],
                                                taxonomy    : results[5],
                                                session     : results[6]
                                            }; 

                                        }, function(e){

                                            //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                            console.error('No bootUp(products): ', e); 

                                            return e;

                                        }
                                    );

                                }] 
                            }

                        }
                    )
                    .when(
                        '/products/:ID',
                        {
                            action: 	'products.single',
                            resolve: {
                                app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return $q.all([
                                        pagesManager.getPages({
                                            'type': 'home',
                                            'method': 'GET'
                                        }),
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        }),
                                        faqsManager.getFAQs({
                                            'type': 'faq',
                                            'method': 'GET'
                                        }),
                                        retailersManager.getRetailers({
                                            'type': 'retailer',
                                            'method': 'GET'
                                        }),
                                        MemCache.dataTaxonomy(),
                                        SessionService.checkSession()
                                    ])
                                    .then( function(results){

                                            //console.log('route data-products:', results);   

                                            var firstVisit = new Date(results[6].firstVisit);
                                            var lastVisit = new Date(results[6].lastVisit);
                
                                            //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());
 
                                            return {
                                                faqs 	    : results[3],
                                                insects 	: results[2],
                                                products 	: results[1],
                                                pagecontent : results[0],
                                                retailers   : results[4],
                                                taxonomy    : results[5],
                                                session     : results[6]
                                            }; 

                                        }, function(e){

                                            //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                            console.error('No bootUp(products): ', e); 

                                            return e;

                                        }
                                    );

                                }] 
                            }

                        }
                    )
                    .when(
                        '/insects',
                        {
                            action: 	'insects',
                            resolve: {
                                app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return $q.all([
                                        pagesManager.getPages({
                                            'type': 'home',
                                            'method': 'GET'
                                        }),
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        }),
                                        faqsManager.getFAQs({
                                            'type': 'faq',
                                            'method': 'GET'
                                        }),
                                        retailersManager.getRetailers({
                                            'type': 'retailer',
                                            'method': 'GET'
                                        }),
                                        MemCache.dataTaxonomy(),
                                        SessionService.checkSession()
                                    ])
                                    .then( function(results){

                                            //console.log('route data-products:', results);   

                                            var firstVisit = new Date(results[6].firstVisit);
                                            var lastVisit = new Date(results[6].lastVisit);
                
                                            //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());
 
                                            return {
                                                faqs 	    : results[3],
                                                insects 	: results[2],
                                                products 	: results[1],
                                                pagecontent : results[0],
                                                retailers   : results[4],
                                                taxonomy    : results[5],
                                                session     : results[6]
                                            }; 

                                        }, function(e){

                                            //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                            console.error('No bootUp(products): ', e); 

                                            return e;

                                        }
                                    );

                                }] 
                            }

                        }
                    )
                    .when(
                        '/insects/:ID',
                        {
                            action: 	'insects.single',
                            resolve: {
                                app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return $q.all([
                                        pagesManager.getPages({
                                            'type': 'home',
                                            'method': 'GET'
                                        }),
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        }),
                                        faqsManager.getFAQs({
                                            'type': 'faq',
                                            'method': 'GET'
                                        }),
                                        retailersManager.getRetailers({
                                            'type': 'retailer',
                                            'method': 'GET'
                                        }),
                                        MemCache.dataTaxonomy(),
                                        SessionService.checkSession()
                                    ])
                                    .then( function(results){

                                            //console.log('route data-products:', results);   

                                            var firstVisit = new Date(results[6].firstVisit);
                                            var lastVisit = new Date(results[6].lastVisit);
                
                                            //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());
 
                                            return {
                                                faqs 	    : results[3],
                                                insects 	: results[2],
                                                products 	: results[1],
                                                pagecontent : results[0],
                                                retailers   : results[4],
                                                taxonomy    : results[5],
                                                session     : results[6]
                                            }; 

                                        }, function(e){

                                            //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                            console.error('No bootUp(products): ', e); 

                                            return e;

                                        }
                                    );

                                }] 
                            }

                        }
                    )
                    .when(
                        '/faq',
                        {
                            action: 	'faq',
                            resolve: {
                                app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return $q.all([
                                        pagesManager.getPages({
                                            'type': 'home',
                                            'method': 'GET'
                                        }),
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        }),
                                        faqsManager.getFAQs({
                                            'type': 'faq',
                                            'method': 'GET'
                                        }),
                                        retailersManager.getRetailers({
                                            'type': 'retailer',
                                            'method': 'GET'
                                        }),
                                        MemCache.dataTaxonomy(),
                                        SessionService.checkSession()
                                    ])
                                    .then( function(results){

                                            //console.log('route data-products:', results);   

                                            var firstVisit = new Date(results[6].firstVisit);
                                            var lastVisit = new Date(results[6].lastVisit);
                
                                            //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());
 
                                            return {
                                                faqs 	    : results[3],
                                                insects 	: results[2],
                                                products 	: results[1],
                                                pagecontent : results[0],
                                                retailers   : results[4],
                                                taxonomy    : results[5],
                                                session     : results[6]
                                            }; 

                                        }, function(e){

                                            //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                            console.error('No bootUp(products): ', e); 

                                            return e;

                                        }
                                    );

                                }] 
                            }

                        }
                    )
                    .when(
                        '/faq/:ID',
                        {
                            action: 	'faq.single',
                            resolve: {
                                app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return $q.all([
                                        pagesManager.getPages({
                                            'type': 'home',
                                            'method': 'GET'
                                        }),
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        }),
                                        faqsManager.getFAQs({
                                            'type': 'faq',
                                            'method': 'GET'
                                        }),
                                        retailersManager.getRetailers({
                                            'type': 'retailer',
                                            'method': 'GET'
                                        }),
                                        MemCache.dataTaxonomy(),
                                        SessionService.checkSession()
                                    ])
                                    .then( function(results){

                                            //console.log('route data-products:', results);   

                                            var firstVisit = new Date(results[6].firstVisit);
                                            var lastVisit = new Date(results[6].lastVisit);
                
                                            //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());
 
                                            return {
                                                faqs 	    : results[3],
                                                insects 	: results[2],
                                                products 	: results[1],
                                                pagecontent : results[0],
                                                retailers   : results[4],
                                                taxonomy    : results[5],
                                                session     : results[6]
                                            }; 

                                        }, function(e){

                                            //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                            console.error('No bootUp(products): ', e); 

                                            return e;

                                        }
                                    );

                                }] 
                            }

                        }
                    )
                    .when(
                        '/contact',
                        {
                            action: 	'contact',
                            resolve: {
                                app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return $q.all([
                                        pagesManager.getPages({
                                            'type': 'home',
                                            'method': 'GET'
                                        }),
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        }),
                                        faqsManager.getFAQs({
                                            'type': 'faq',
                                            'method': 'GET'
                                        }),
                                        retailersManager.getRetailers({
                                            'type': 'retailer',
                                            'method': 'GET'
                                        }),
                                        MemCache.dataTaxonomy(),
                                        SessionService.checkSession()
                                    ])
                                    .then( function(results){

                                            //console.log('route data-products:', results);   

                                            var firstVisit = new Date(results[6].firstVisit);
                                            var lastVisit = new Date(results[6].lastVisit);
                
                                            //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());
 
                                            return {
                                                faqs 	    : results[3],
                                                insects 	: results[2],
                                                products 	: results[1],
                                                pagecontent : results[0],
                                                retailers   : results[4],
                                                taxonomy    : results[5],
                                                session     : results[6]
                                            }; 

                                        }, function(e){

                                            //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                            console.error('No bootUp(products): ', e); 

                                            return e;

                                        }
                                    );

                                }] 
                            }

                        }
                    )
                    .otherwise({
                        action: 	'404',
                        resolve: {
                            app_data: [ '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                
                                return $q.all([
                                    pagesManager.getPages({
                                        'type': 'home',
                                        'method': 'GET'
                                    }),
                                    productsManager.getProducts({
                                        'type': 'product',
                                        'method': 'GET'
                                    }),
                                    insectsManager.getInsects({
                                        'type': 'insect',
                                        'method': 'GET'
                                    }),
                                    faqsManager.getFAQs({
                                        'type': 'faq',
                                        'method': 'GET'
                                    }),
                                    retailersManager.getRetailers({
                                        'type': 'retailer',
                                        'method': 'GET'
                                    }),
                                    MemCache.dataTaxonomy(),
                                    SessionService.checkSession()
                                ])
                                .then( function(results){

                                        //console.log('route data-products:', results);   

                                        var firstVisit = new Date(results[6].firstVisit);
                                        var lastVisit = new Date(results[6].lastVisit);
            
                                        //console.log('usersession:', results[6], firstVisit.toTimeString(), lastVisit.toTimeString());

                                        return {
                                            faqs 	    : results[3],
                                            insects 	: results[2],
                                            products 	: results[1],
                                            pagecontent : results[0],
                                            retailers   : results[4],
                                            taxonomy    : results[5],
                                            session     : results[6]
                                        }; 

                                    }, function(e){

                                        //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                        console.error('No bootUp(products): ', e); 

                                        return e;

                                    }
                                );

                            }] 
                        }
                    });	
				
			}])
			.run([ '$rootScope', '$location', '$route', '$routeParams', 'ngProgress', 'SessionService', function ( $rootScope, $location, $route, $routeParams, ngProgress, SessionService ) {

				
				/**
				 * @private
				 * 
				 * Update the rendering of the page.
				 *
				 */
				var _render = function () 
				{
				
					if( $route.current == undefined ) {
						return;
					}
				
					console.warn('routing:', $route.current.action);
				
					// Pull the "action" value out of the currently selected route.
					var renderAction = $route.current.action;
				
					if( renderAction == undefined ) {
						return;
					}
						 
					// Also, let's update the render path so that we can start conditionally rendering parts of the page.
					var renderPath = renderAction.split( "." ),
				
					// Grab the IDs out of the params.
					// 
					// NOTE: This will be undefined for every route except for the "appropriate" route; for the sake
					// of simplicity, I am not exerting any finer logic around it.
															
					// Reset the booleans used to set the class for the navigation.
					isHome 					= ( renderPath[ 0 ] == "dashboard" ),
					isAbout 				= ( renderPath[ 0 ] == "about" ),
					isLegal 				= ( renderPath[ 0 ] == "legal" ),
					isFAQ 					= ( renderPath[ 0 ] == "faq" ),
					isContact 				= ( renderPath[ 0 ] == "contact" ),
					isProducts				= ( renderPath[ 0 ] == "products" ),
					isInsects				= ( renderPath[ 0 ] == "insects" ),
                    isConfigurator			= ( renderPath[ 0 ] == "configurator" ),
                    is404                   = ( renderPath[ 0 ] == "404" );
	
					if( isProducts ) {
				
						var isProductPage		= ( renderPath[ 1 ] == "single" );
				
						$rootScope.isProductPage 	= isProductPage;
				
					}

					if( isInsects ) {
						
						var isInsectPage		= ( renderPath[ 1 ] == "single" );
						
						$rootScope.isInsectPage 	= isInsectPage;
						
					}
				
					// Store the values in the model.
					$rootScope.renderAction 	= renderAction;
					$rootScope.renderPath 		= renderPath;
					
					$rootScope.isHome 			= isHome;
					$rootScope.isAbout 			= isAbout;
					$rootScope.isLegal 			= isLegal;
                    $rootScope.isFAQ 			= isFAQ;
                    $rootScope.is404		    = is404;
					$rootScope.isContact 		= isContact;
					$rootScope.isProducts 		= isProducts;
					$rootScope.isInsects		= isInsects;
					$rootScope.isConfigurator	= isConfigurator;
					$rootScope.isProductPage	= isProductPage;
					$rootScope.isInsectPage		= isInsectPage;
				
					// update body classes
					_updateBodyClass();
						 
				};
				
				/**
				 * @private
				 * 
				 * Update bodyClasses
				 *
				 */
				var _updateBodyClass = function() 
				{
				
					var MainWindowTitle = "DOOM Presents...What's your Pest Problem? Make it stop.";
				
					_resetBodyClass();
				
					if( $rootScope.isProducts === true ) {
				
						if( $rootScope.isProductPage ) {
				
							window.document.title = 'Product Info - ' + MainWindowTitle;
				
							window.document.body.classList.add('page-products-single');
				
						} else {
				
							window.document.title = 'Products - ' + MainWindowTitle;
				
						}						
				
						window.document.body.classList.add('page-products');

					} else if( $rootScope.isInsects === true ) {
							
						if( $rootScope.isInsectPage ) {
							
							window.document.title = 'Insect Info - ' + MainWindowTitle;
							
							window.document.body.classList.add('page-insects-single');
							
						} else {
							
							window.document.title = 'Insects - ' + MainWindowTitle;
							
						}						
							
						window.document.body.classList.add('page-insects');

					} else if( $rootScope.isAbout === true ) {
						
						window.document.title = 'About - ' + MainWindowTitle;;
						
						window.document.body.classList.add('page-about');

					} else if( $rootScope.isLegal === true ) {
						
						window.document.title = 'Legal - ' + MainWindowTitle;;
						
						window.document.body.classList.add('page-legal');

					} else if( $rootScope.isFAQ === true ) {
						
						window.document.title = 'Frequently Asked Questions - ' + MainWindowTitle;;
						
						window.document.body.classList.add('page-faq');

					} else if( $rootScope.isContact === true ) {
						
						window.document.title = 'Contact us - ' + MainWindowTitle;;
						
						window.document.body.classList.add('page-contact');

					} else if( $rootScope.isHome === true ) {
				
						window.document.title = MainWindowTitle;
				
						window.document.body.classList.add('page-app-home');
				
					} else if( $rootScope.isConfigurator === true ) {
				
						window.document.title = 'Configurator - ' + MainWindowTitle;
				
						window.document.body.classList.add('page-configurator');
				
					} else if( $rootScope.is404 === true ) {
                        
                        window.document.title = '404 - ' + MainWindowTitle;
                        
                        window.document.body.classList.add('page-404');
                        
                    }
					
                };
                
                /**
				 * @private
				 * 
				 * Update bodyClasses
				 *
				 */
				var _authorization = function() 
				{
                    
					SessionService.checkSession().then( function(sessdb) {

                            var firstVisit = new Date(sessdb.firstVisit);
                            var lastVisit = new Date(sessdb.lastVisit);

                            console.log('usersession:', sessdb, firstVisit.toTimeString(), lastVisit.toTimeString());

                        }, function(errdb) {

                            console.error('session error:', errdb);
                            //Math.floor(Date.now() / 1000);

                        }
                    );
					
				};
				
				/**
				 * @private
				 * 
				 * Reset bodyClasses
				 *
				 */
				var _resetBodyClass = function () 
				{
				
					window.document.body.setAttribute( 'class', 'page ui-fontSize-default ui-lang-en' );
				
				};
				
				$rootScope.$on( "$routeChangeStart", function( ev, to, toParams, from, fromParams ){
				
                    ngProgress.start();
                    
                    //$route.current.locals.app_data = {};
				
					//console.log('leaving route: ', from, to );
				
					//Utils.toggleClass( document.getElementById('pamela-dashboard'), 'splash' );
				
				});
								
				$rootScope.$on( '$routeChangeSuccess', function ( ev, to, toParams, from, fromParams ) {
				
					//console.log('success route: ', to , toParams);
				
					//_authorization();

					_resetBodyClass();

					_render();

					ngProgress.complete();

				});
				
				$rootScope.$on( '$routeChangeError', function ( ev, to, toParams, from, fromParams ) {
				
					console.log('Shiyat[route]: ', ev, to, toParams, from, fromParams );
									
					//alert('Shoya')
				
					//ngProgress.complete();
				
				});
				
			}]);

	});
		
	exports.appRoutes = appRoutes;
});