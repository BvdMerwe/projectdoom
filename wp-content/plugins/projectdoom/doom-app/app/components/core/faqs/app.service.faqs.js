/**
* @public
* 
* 
* @App Dependencies [xhr, utils, memcache, sessionservice, formvalidation]
*
* @return Angular.module.appFAQService
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
	var appFAQService,
		appConfig		= require("text!../../app/app.config.json"),
		domReady 		= require("domReady"),
		angular 		= require("angular");

	appConfig = JSON.parse(appConfig);
	// 
	var Application = Application || {};
	Application.Factorys = {};
	
	Application.Factorys.FAQ = [ '$q', '$filter', '$http', 'transformRequestAsFormPost', 'Utils', 'formValidation', function ( $q, $filter, $http, transformRequestAsFormPost, Utils, formValidation ) {
		
		var defaultProperties = {
			'ID'			: '',
			'uID'			: '',
			'dateCreated'	: '',
			'lastUpdated'	: ''
		};
		
		/**
		 * @Constructor 
		 *
		 * Initialise Data / Properties for FAQ Instance
		 * 
		 * @param {Number.id}
		 *
		 * @return {FAQ.Object}
		 * 
		 **/
		function FAQ( properties ) {
					
			Utils._strict( [ Object ], arguments );
		
			angular.extend( this, properties );
		
		}
		
		/**
		 * @static assigned to class
		 *
		 * Create and Return a new FAQ Instance
		 *
		 * @note: Instance ('this') is not available in static context
		 * 
		 * @param {Object}
		 * 
		 * @return {FAQ.Object}
		 * 
		 **/
		FAQ.build = function ( data ) {
		
			Utils._strict( [ Object ], arguments );
		
			if( Utils._isObjEmpty(data) === true ) {
		
				defaultProperties.ID = Math.uuid();
				defaultProperties.dateCreated 	= '@' + Math.round((new Date()).getTime()/1000);
				defaultProperties.lastUpdated 	= '@' + Math.round((new Date()).getTime()/1000);
		
				return new FAQ( defaultProperties );
		
			} else {
		
				if( angular.isDefined(data.uID) && data.uID !== "" ) {} else {
						 
					data.uID = Math.uuid();
						 
				}
		
				return new FAQ( data );
		
			
			}
		
		}
				 
		/**
		 * Return the constructor function
		 * */
		return FAQ;
		
	}]

	Application.Factorys.faqsManager = [ '$http', 'transformRequestAsFormPost', '$q', '$filter', 'Utils', 'MemCache', 'FAQ', 'SessionService', function ( $http, transformRequestAsFormPost, $q, $filter, Utils, MemCache, FAQ, SessionService ) {
		
		var faqsManager = {
		
			_collection_faqs: [],
			_retrieveInstance: function(  data ) {
		
				Utils._strict( [ Object ], arguments );
		
				return FAQ.build( data );
		
			},
			saveCollection: function() {
		
				var _self 		= this;
				var deferred 	= $q.defer();
		
				MemCache.dataStore( 'dmapp-faqs', _self._collection_faqs, 'localstorage' ).then( function() {
		
						deferred.resolve( _self._collection_faqs );
		
					}, function(e){
		
						deferred.reject( e );
		
					}
				);
		
				return deferred.promise;
		
			},
			getFAQs: function( obj ) {

				Utils._strict( [ Object ], arguments );
		
				var _self 		= this,
					deferred 	= $q.defer();
		
				if( Utils._isObjEmpty(_self._collection_faqs) || _self._collection_faqs.length == 0 ) {
					
					MemCache.dataGet( 'dmapp-faqs', 'localstorage' ).then( function( results ) {

							console.log('[FAQS]from localstorage:');
		
							_self._collection_faqs.length = 0;

							_self._collection_faqs = results;
				
							deferred.resolve( results );
			
						}, function(e){

							_self._loadAllFAQs( obj ).then( function(data) {

									if( !angular.isDefined(data) ) {
					
										deferred.resolve([]);
					
									} else {

										_self._collection_faqs.length = 0;
					
										//var dataLen = data.length;
					
										_self._collection_faqs = data;

										deferred.resolve( data );

										/** /
										_self.saveCollection().then( function(saveddb) {

												//console.warn('faqs saved', saveddb);

												deferred.resolve( saveddb );

											}, function(erroer) {

												console.error('faqs save erroer', erroer);

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

					/** /
					_self._loadAllFAQs( obj ).then( function(data) {
		
						if( !angular.isDefined(data) ) {
		
							//deferred.reject( 'ADs data undefined from _loadAllFAQs()' );
							deferred.resolve([]);
		
						} else {
		
							_self._collection_faqs.length = 0;
		
							//var dataLen = data.length;
		
							_self._collection_faqs = data;
		
							deferred.resolve( _self._collection_faqs );
		
						}
		
						}, function(err) {
			
							deferred.reject( err );
			
						}
					);
					/**/
		
				} else {
		
					console.info('FAQs object cache');
					deferred.resolve( _self._collection_faqs );
		
				}
		
				return deferred.promise;
		
			},
			flush: function() {
		
				var _self 		= this,
					deferred	= $q.defer();
		
				MemCache.dataRemove( 'dmapp-faqs', 'localstorage' ).then( function(){
		
							_self._collection_faqs.length = 0;
		
							deferred.resolve();
		
						}, function(err) {
		
							_self._collection_faqs.length = 0;
		
							deferred.reject( 'An Error Occurred Removing FAQs from memory. Please Contact Administrator.' );
		
					}
		
				);
		
				return deferred.promise;
		
			},
			/**
			 * @private Get data for all FAQs
			 * 
			 * @param {Object.obj}
			 *
			 * @return {Promise.Object}
			 * 
			 **/
			_loadAllFAQs: function( obj ) {
		
				Utils._strict( [ Object ], arguments );
				
				var deferred = $q.defer();
				
				$http({
					method: obj.method, 
					url: appConfig.general.api + obj.type,
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
		
		return faqsManager;
		
	}]

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appFAQService = appFAQService || angular.module( 'appFAQService', [ 'appUtils', 'appXHR', 'appMemCache', 'appSessionService', 'appFormvalidation' ] );

		appFAQService
			.factory( Application.Factorys );


		console.info('FAQ Service Booted.');

	});
		
	exports.appFAQService = appFAQService;
});