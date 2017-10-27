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
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
    
                                                //console.log('route data-home:', results);    
    
                                                var firstVisit = new Date(results[6].firstVisit);
                                                var lastVisit = new Date(results[6].lastVisit);
                                                /*
                                                //if ($location.$$path == "/") {
                                                    var pests = results[2];
                                                    var rand = Math.floor(Math.random() * pests.length-1) + 0 ;
                                                    $location.path("/insects/"+pests[rand].post_name);
                                                // }
                                                */
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
                                    }, function(data){
                                        return deferred.promise;
                                    });
                                }] 
                            }

                        }
                    )
                    .when(
                        '/about',
                        {
                            action: 	'about',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/legal',
                        {
                            action: 	'legal',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/products',
                        {
                            action: 	'products',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
                                        return $q.all([
                                            pagesManager.getPages({
                                                'type': 'products',
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/products/:ID',
                        {
                            action: 	'products.single',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/products/category/:ID',
                        {
                            action: 	'products.filter.taxonomy',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/products/category/:ID/:TYPE',
                        {
                            action: 	'products.filter.taxonomy.insecttype',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
                                        return $q.all([
                                            pagesManager.getPages({
                                                'type': 'products',
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/profile',
                        {
                            action: 	'profile',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/insects',
                        {
                            action: 	'insects',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/insects/:ID',
                        {
                            action: 	'insects.single',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/profile/:ID',
                        {
                            action: 	'profile.single',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/faq',
                        {
                            action: 	'faq',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/faq/:ID',
                        {
                            action: 	'faq.single',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .when(
                        '/contact',
                        {
                            action: 	'contact',
                            resolve: {
                                app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                    
									return SessionService.checkExp().then(function(expired){
                                        if (expired) {
                                            MemCache.dataReset('localstorage');
                                        }
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
                                    }, function(data){
                                        return deferred.promise;
                                    });

                                }] 
                            }

                        }
                    )
                    .otherwise({
                        action: 	'404',
                        resolve: {
                            app_data: [ '$location', '$q', 'pagesManager', 'productsManager', 'insectsManager', 'retailersManager', 'faqsManager', 'MemCache', 'SessionService', function( $location, $q, pagesManager, productsManager, insectsManager, retailersManager, faqsManager, MemCache, SessionService ) {
                                
                                return SessionService.checkExp().then(function(expired){
                                    if (expired) {
                                        MemCache.dataReset('localstorage');
                                    }
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
                                            // if ($location.$$path == "/") {
                                                // var pests = results[2];
                                                // var rand = Math.floor(Math.random() * pests.length-1) + 0 ;
                                                // $location.path("/insects/"+pests[rand].post_name);
                                            // }
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
                                }, function(data){
                                    return deferred.promise;
                                });

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
                        console.error('renderAction undefined');
						return;
					}
						 
					// Also, let's update the render path so that we can start conditionally rendering parts of the page.
					var renderPath = renderAction.split( "." ),
				
					// Grab the IDs out of the params.
					// 
					// NOTE: This will be undefined for every route except for the "appropriate" route; for the sake
					// of simplicity, I am not exerting any finer logic around it.
															
					// Reset the booleans used to set the class for the navigation.
					isHome 					= ( renderPath[ 0 ] == "home" ),
					isAbout 				= ( renderPath[ 0 ] == "about" ),
					isLegal 				= ( renderPath[ 0 ] == "legal" ),
					isFAQ 					= ( renderPath[ 0 ] == "faq" ),
					isContact 				= ( renderPath[ 0 ] == "contact" ),
					isProducts				= ( renderPath[ 0 ] == "products" ),
                    isInsects				= ( renderPath[ 0 ] == "insects" ),
                    isProfile				= ( renderPath[ 0 ] == "profile" ),
                    isConfigurator			= ( renderPath[ 0 ] == "configurator" ),
                    is404                   = ( renderPath[ 0 ] == "404" );
	
					if( isProducts ) {

                        if( $route.current.pathParams.ID ) {
                            $rootScope.isPathSlug 	= $route.current.pathParams.ID;
                        }
				
                        var isProductPage		    = ( renderPath[ 1 ] == "single" );
                        var isProductCategory	    = ( renderPath[ 2 ] == "taxonomy" );
                        var isProductCategoryInsect	= ( renderPath[ 3 ] == "insecttype" );
				
                        $rootScope.isProductPage 	        = isProductPage;
                        $rootScope.isProductCategory 	    = isProductCategory;
                        $rootScope.isProductCategoryInsect 	= isProductCategoryInsect;
				
					}

					if( isInsects ) {

                        if( $route.current.pathParams.ID ) {
                            $rootScope.isPathSlug 	= $route.current.pathParams.ID;
                        }
						
                        var isInsectPage		= ( renderPath[ 1 ] == "single" );
                        var isInsectCategory		= ( renderPath[ 1 ] == "taxonomy" );
						
                        $rootScope.isInsectPage 	= isInsectPage;
                        $rootScope.isInsectCategory = isInsectCategory;
                        $rootScope.lastInsect       = $route.current.pathParams.ID;
						
                    }
                    
                    if( isProfile ) {

                        if( $route.current.pathParams.ID ) {
                            $rootScope.isPathSlug 	= $route.current.pathParams.ID;
                        }
						
                        var isProfilePage		= ( renderPath[ 1 ] == "single" );
						
                        $rootScope.isProfilePage 	= isProfilePage;
						
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
                    $rootScope.isProfile	    = isProfile;
				
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
				
					var MainWindowTitle = "MAKE THEM STOP | Fast Deadly DOOM";
				
					_resetBodyClass();
				
					if( $rootScope.isProducts === true ) {

                        if( $rootScope.isProductCategoryInsect ) {

                            window.document.title = 'Product Category - ' +  $route.current.pathParams.TYPE + ' - ' + MainWindowTitle;
                            
                            window.document.body.classList.add('page-products-taxonomy-insecttype-' + $route.current.pathParams.TYPE );

                        } else if( $rootScope.isProductCategory ) {

                            window.document.title = 'Product Category - ' + MainWindowTitle;
                            
                            window.document.body.classList.add('page-products-taxonomy');
				
						} else if( $rootScope.isProductPage ) {
				
							window.document.title = 'Product Info - ' + MainWindowTitle;
				
                            window.document.body.classList.add('page-products-single');
                            
                            if( $rootScope.isPathSlug ) {
                                window.document.body.classList.add( 'page-products-single-' + $rootScope.isPathSlug );
                            }
				
						} else {
				
							window.document.title = 'Products - ' + MainWindowTitle;
				
						}						
				
						window.document.body.classList.add('page-products');

					} else if( $rootScope.isInsects === true ) {
							
						if( $rootScope.isInsectPage ) {
							
							window.document.title = 'Insect Info - ' + MainWindowTitle;
							
                            window.document.body.classList.add('page-insects-single');
                            
                            if( $rootScope.isPathSlug ) {
                                window.document.body.classList.add( 'page-insects-single-' + $rootScope.isPathSlug );
                            }
							
						} else {
							
							window.document.title = 'Insects - ' + MainWindowTitle;
							
						}						
							
                        window.document.body.classList.add('page-insects');
                        
                    } else if( $rootScope.isProfile === true ) {
							
						if( $rootScope.isProfilePage ) {
							
							window.document.title = 'Insect Profile - ' + MainWindowTitle;
							
                            window.document.body.classList.add('page-insects-profile');
                            
                            if( $rootScope.isPathSlug ) {
                                window.document.body.classList.add( 'page-insects-profile-' + $rootScope.isPathSlug );
                            }
							
						} else {
							
							window.document.title = 'Insect Profile - ' + MainWindowTitle;
							
						}						
							
						window.document.body.classList.add('page-profile');

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
                    
                    _bodyClassBrowser();

                };

                var _bodyClassBrowser = function() {

                    /**
                     * detect IE
                     * returns version of IE or false, if browser is not Internet Explorer
                     * /

                    (function detectIE() {
                        var ua = window.navigator.userAgent;

                        var msie = ua.indexOf('MSIE ');
                        if (msie > 0) {
                            // IE 10 or older => return version number
                            var ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                            document.querySelector('body').className += ' IE';
                        }

                        var trident = ua.indexOf('Trident/');
                        if (trident > 0) {
                            // IE 11 => return version number
                            var rv = ua.indexOf('rv:');
                            var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                            document.querySelector('body').className += ' IE';
                        }

                        var edge = ua.indexOf('Edge/');
                        if (edge > 0) {
                        // IE 12 (aka Edge) => return version number
                        var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                            document.querySelector('body').className += ' IE';
                        }

                        // other browser
                        return false;
                    })();
                    */
                    

                    document.getElementsByTagName('body')[0].className+=' '+window.BrowserDetect.browser+'-'+window.BrowserDetect.version + ' ' + window.BrowserDetect.OS;

                    ///// mobile
                    window.isMobile = {
                        Android: function() {
                            return navigator.userAgent.match(/Android/i);
                        },
                        BlackBerry: function() {
                            return navigator.userAgent.match(/BlackBerry/i);
                        },
                        iOS: function() {
                            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                        },
                        Opera: function() {
                            return navigator.userAgent.match(/Opera Mini/i);
                        },
                        Windows: function() {
                            return navigator.userAgent.match(/IEMobile/i);
                        },
                        any: function() {
                            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                        }
                    };
                    /*
                    // adds mobile browser class to html tag. Special thanks to @ctcherry on github!
                    (function(){
                        var ua = navigator.userAgent.toLowerCase().replace(/\s+/,'');
                    
                        var matchers = {
                            ios: /(iphone|ipod|ipad)/,
                            ipad: /ipad/,
                            iphone: /(iphone|ipod)/,
                            android: 'android',
                            android2: 'android2',
                            android4: 'android4'
                        };
                    
                        var h = document.getElementsByTagName('body')[0];//$('html');
                    
                        for (var i in matchers) {
                            var m = matchers[i];
                            if ((typeof(m) == "string" && ua.indexOf(m) > -1) || (typeof(m) == "object" && ua.match(m))) {
                                //h.addClass(i)
                                h.className+=' '+i;

                                //document.getElementsByTagName('body')[0].className+=' '+(/(Firefox|MSIE|Chrome|Safari|Opera)[\/\s](\d+)/);
                            }
                        };
                    
                    })();
                    */
                    //try{document.getElementsByTagName('body')[0].className+=' '+(/(Firefox|MSIE|Chrome|Safari|Opera)[\/\s](\d+)/).exec(navigator.userAgent).splice(1,2).join('').toLowerCase();}catch(e){};

                }
                
                /**
				 * @private
				 * 
				 * Update bodyClasses
				 *
				 * /
				var _authorization = function() 
				{
                    
					SessionService.checkSession().then( function(sessdb) {
                            if (sessdb.lastVisit  - (Date.now() / 1000 | 0)) {
                                console.warn(new Date(sessdb.lastVisit));
                            }
                            var firstVisit = new Date(sessdb.firstVisit);
                            var lastVisit = new Date(sessdb.lastVisit);

                            console.alert('usersession:', sessdb, firstVisit.toTimeString(), lastVisit.toTimeString());

                        }, function(errdb) {

                            console.error('session error:', errdb);
                            //Math.floor(Date.now() / 1000);

                        }
                    );
					
				};
				/***/
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


                    $rootScope.renderAction 	= '';
					$rootScope.renderPath 		= '';
					
					$rootScope.isHome 			= '';
					$rootScope.isAbout 			= '';
					$rootScope.isLegal 			= '';
                    $rootScope.isFAQ 			= '';
                    $rootScope.is404		    = '';
					$rootScope.isContact 		= '';
                    $rootScope.isProducts 		= '';
                    $rootScope.isInsects		= '';
                    $rootScope.isProfile	    = '';

                    $rootScope.isProfilePage 	= '';

                    $rootScope.isProductPage 	        = '';
                    $rootScope.isProductCategory 	    = '';
                    $rootScope.isProductCategoryInsect 	= '';

                    $rootScope.isInsectPage 	= '';
                    $rootScope.isInsectCategory = '';

                    $rootScope.isPathSlug 	= '';
				
                    ngProgress.start();
                    
                    //$route.current.locals.app_data = {};
				
					//console.log('leaving route: ', from, to );
				
					//Utils.toggleClass( document.getElementById('pamela-dashboard'), 'splash' );
				
				});
								
				$rootScope.$on( '$routeChangeSuccess', function ( ev, to, toParams, from, fromParams ) {
				
					//console.log( 'success route: ', $location );
				
					// _authorization();

					_resetBodyClass();

                    _render();
                    
                    if( angular.isDefined(window.ga) ) {

                        console.log( 'Google analytics available: ', $location.path() );

                        ga('send', 'pageview', $location.path());

                    }

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