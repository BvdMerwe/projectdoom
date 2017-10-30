/**
* @public
* 
* 
* @App Dependencies [xhr, utils, memcache, sessionservice, formvalidation]
*
* @return Angular.module.appPageService
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
    require("app-memcache");
    require("app-sessionservice");
    require("app-formvalidation");

	// Load dependent modules
	var appPageService,
		appConfig		= require("text!../../app/app.config.json"),
		domReady 		= require("domReady"),
		angular 		= require("angular");

	appConfig = JSON.parse(appConfig);
	// 
	var Application = Application || {};
	Application.Factorys = {};
	
	Application.Factorys.Page = [ '$q', '$filter', '$http', 'transformRequestAsFormPost', 'Utils', 'formValidation', function ( $q, $filter, $http, transformRequestAsFormPost, Utils, formValidation ) {
		
		var defaultProperties = {
			'ID'			: '',
			'uID'			: '',
			'Name'			: '',
			'dateCreated'	: '',
			'lastUpdated'	: ''
		};
		
		/**
		 * @Constructor 
		 *
		 * Initialise Data / Properties for Page Instance
		 * 
		 * @param {Number.id}
		 *
		 * @return {Page.Object}
		 * 
		 **/
		function Page( properties ) {
					
			Utils._strict( [ Object ], arguments );
		
			angular.extend( this, properties );
		
		}
		
		/**
		 * @static assigned to class
		 *
		 * Create and Return a new Page Instance
		 *
		 * @note: Instance ('this') is not available in static context
		 * 
		 * @param {Object}
		 * 
		 * @return {Page.Object}
		 * 
		 **/
		Page.build = function ( data ) {
		
			Utils._strict( [ Object ], arguments );
		
			if( Utils._isObjEmpty(data) === true ) {
		
				defaultProperties.ID = Math.uuid();
				defaultProperties.dateCreated 	= '@' + Math.round((new Date()).getTime()/1000);
				defaultProperties.lastUpdated 	= '@' + Math.round((new Date()).getTime()/1000);
		
				return new Page( defaultProperties );
		
			} else {
		
				if( angular.isDefined(data.uID) && data.uID !== "" ) {} else {
						 
					data.uID = Math.uuid();
						 
				}
		
				return new Page( data );
		
			
			}
		
		}
				 
		/**
		 * Return the constructor function
		 * */
		return Page;
		
	}]

	Application.Factorys.pagesManager = [ '$http', 'transformRequestAsFormPost', '$q', '$filter', 'Utils', 'MemCache', 'Page', 'SessionService', function ( $http, transformRequestAsFormPost, $q, $filter, Utils, MemCache, Package, SessionService ) {
		
		var pagesManager = {
		
			_collection_pages: [],
			_retrieveInstance: function(  data ) {
		
				Utils._strict( [ Object ], arguments );
		
				return Page.build( data );
		
			},
			saveCollection: function() {
		
				var _self 		= this;
				var deferred 	= $q.defer();
		
				MemCache.dataStore( 'dmapp-pages', _self._collection_pages, 'localstorage' ).then( function() {
		
						deferred.resolve( _self._collection_pages );
		
					}, function(e){
		
						deferred.reject( e );
		
					}
				);
		
				return deferred.promise;
		
			},
			getPages: function( obj ) {

				Utils._strict( [ Object ], arguments );
		
				var _self 		= this,
					deferred 	= $q.defer(); 
		
				if( Utils._isObjEmpty(_self._collection_pages) || _self._collection_pages.length == 0 ) {
					
					/***/
					MemCache.dataGet( 'dmapp-pages', 'localstorage' ).then( function( results ) { 

							console.log('[PAGES]from localstorage:');

							//_self._collection_pages.length = 0;
						
							_self._collection_pages = results;
						
							deferred.resolve( results );
						
						}, function(e){
						
							_self._loadAllPages( obj ).then( function(data) {

								console.warn('pages fetched');
		
								if( !angular.isDefined(data) ) {
				
									deferred.resolve([]);
				
								} else {
				
									_self._collection_pages.length = 0;
				
									//var dataLen = data.length;
				
									_self._collection_pages = data;

									//deferred.resolve( data );

									/**/
									_self.saveCollection().then( function(saveddb) {
										
											deferred.resolve( saveddb );
										
										}, function(erroer) {
										
											deferred.reject( erroer );

										}
									);
									/**/
				
								}
				
								}, function(err) {
					
									deferred.reject( err );
					
								}
							);

						}
					);
					/***/

					/** /
					_self._loadAllPages( obj ).then( function(data) {
		
						if( !angular.isDefined(data) ) {
		
							//deferred.reject( 'ADs data undefined from _loadAllPages()' );
							deferred.resolve([]);
		
						} else {
		
							_self._collection_pages.length = 0;
		
							//var dataLen = data.length;
		
							_self._collection_pages = data;
		
							deferred.resolve( _self._collection_pages );
		
						}
		
						}, function(err) {
			
							deferred.reject( err );
			
						}
					);
					/**/
		
				} else {
		
					console.info('pages object cache');
					deferred.resolve( _self._collection_pages );
		
				}
		
				return deferred.promise;
		
			},
			flush: function() {
		
				var _self 		= this,
					deferred	= $q.defer();
		
				MemCache.dataRemove( 'dmapp-pages', 'localstorage' ).then( function(){
		
							_self._collection_packages.length = 0;
		
							deferred.resolve();
		
						}, function(err) {
		
							_self._collection_packages.length = 0;
		
							deferred.reject( 'An Error Occurred Removing Pages from memory. Please Contact Administrator.' );
		
					}
		
				);
		
				return deferred.promise;
		
			},
			/**
			 * @private Get data for all Pages
			 * 
			 * @param {Object.obj}
			 *
			 * @return {Promise.Object}
			 * 
			 **/
			_loadAllPages: function( obj ) {
		
				Utils._strict( [ Object ], arguments );
				
				var deferred = $q.defer();
				
				$http({
					method: obj.method, 
					url: appConfig.general.api + 'page&p=' + obj.type,
					transformRequest: transformRequestAsFormPost
				})
				.success( function(data, status) {
				
					deferred.resolve( data );
				
				})
				.error( function(data, status) {
				
					console.error("Request failed:", data);
				
					deferred.reject( data );
										
				});
							
				return deferred.promise;
		
			}
		
		};
		
		return pagesManager;
		
	}]

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appPageService = appPageService || angular.module( 'appPageService', [ 'appUtils', 'appXHR', 'appMemCache', 'appSessionService', 'appFormvalidation' ] );

		appPageService
			.factory( Application.Factorys );


	});
		
	exports.appPageService = appPageService;
});