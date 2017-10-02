/**
* @public
* 
* 
* @App Dependencies [xhr, utils, memcache, sessionservice, formvalidation]
*
* @return Angular.module.appInsectService
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
	require("text");
    require("app-xhr");
    require("app-utils");
	require("app-memcache");
    require("app-sessionservice");
    require("app-formvalidation");

	// Load dependent modules
	var appInsectService,
		appConfig		= require("text!../../app/app.config.json"),
		domReady 		= require("domReady"),
		angular 		= require("angular");

	//appConfig = JSON.parse(JSON.stringify(appConfig));

	appConfig = JSON.parse(appConfig);

	//console.log(JSON.parse(appConfig));
	// 
	var Application = Application || {};
	Application.Factorys = {};
	
	Application.Factorys.Insect = [ '$q', '$filter', '$http', 'transformRequestAsFormPost', 'Utils', 'formValidation', function ( $q, $filter, $http, transformRequestAsFormPost, Utils, formValidation ) {
		
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
		 * Initialise Data / Properties for Insect Instance
		 * 
		 * @param {Number.id}
		 *
		 * @return {Insect.Object}
		 * 
		 **/
		function Insect( properties ) {
					
			Utils._strict( [ Object ], arguments );
		
			angular.extend( this, properties );
		
		}
		
		/**
		 * @static assigned to class
		 *
		 * Create and Return a new Insect Instance
		 *
		 * @note: Instance ('this') is not available in static context
		 * 
		 * @param {Object}
		 * 
		 * @return {Insect.Object}
		 * 
		 **/
		Insect.build = function ( data ) {
		
			Utils._strict( [ Object ], arguments );
		
			if( Utils._isObjEmpty(data) === true ) {
		
				defaultProperties.ID = Math.uuid();
				defaultProperties.dateCreated 	= '@' + Math.round((new Date()).getTime()/1000);
				defaultProperties.lastUpdated 	= '@' + Math.round((new Date()).getTime()/1000);
		
				return new Product( defaultProperties );
		
			} else {
		
				if( angular.isDefined(data.uID) && data.uID !== "" ) {} else {
						 
					data.uID = Math.uuid();
						 
				}
		
				return new Product( data );
		
			
			}
		
		}
				 
		/**
		 * Return the constructor function
		 * */
		return Insect;
		
	}]

	Application.Factorys.insectsManager = [ '$http', 'transformRequestAsFormPost', '$q', '$filter', 'Utils', 'MemCache', 'Insect', 'SessionService', function ( $http, transformRequestAsFormPost, $q, $filter, Utils, MemCache, Insect, SessionService ) {
		
		var insectsManager = {
		
			_collection_insects: [],
			_retrieveInstance: function(  data ) {
		
				Utils._strict( [ Object ], arguments );
		
				return Insect.build( data );
		
			},
			saveCollection: function() {
		
				var _self 		= this;
				var deferred 	= $q.defer();

				console.info('saving insect data');
		
				MemCache.dataStore( 'dmapp-insects', _self._collection_insects, 'localstorage' ).then( function() {

						console.log('insect data stored');
		
						deferred.resolve( _self._collection_insects );
		
					}, function(e){
		
						deferred.reject( e );
		
					}
				);
		
				return deferred.promise;
		
			},
			getInsects: function( obj ) {

				Utils._strict( [ Object ], arguments );
		
				var _self 		= this,
					deferred 	= $q.defer();
		
				if( Utils._isObjEmpty(_self._collection_insects) || _self._collection_insects.length == 0 ) {

					/**/
					MemCache.dataGet( 'dmapp-insects', 'localstorage' ).then( function( results ) {

							console.log('[INSECTS]from localstorage:');

							_self._collection_insects.length = 0;
						
							_self._collection_insects = results;
						
							deferred.resolve( results );
						
						}, function(e){
							
							_self._loadAllInsects( obj ).then( function(data) {

								//console.warn('insects fecthed');
		
								if( !angular.isDefined(data) ) {
				
									//deferred.reject( 'ADs data undefined from _loadAllInsects()' );
									deferred.resolve([]);
				
								} else {
				
									_self._collection_insects.length = 0;
				
									//var dataLen = data.length;
				
									_self._collection_insects = data;

									deferred.resolve( data );

									/** /
									_self.saveCollection().then( function(saveddb) {
										
											deferred.resolve( saveddb );
										
										}, function(erroer) {
										
											deferred.reject( erroer );

										}
									);
									/**/
				
									//deferred.resolve( _self._collection_insects );
				
								}
				
								}, function(err) {
					
									deferred.reject( err );
					
								}
							);
						
							//deferred.reject( e );
						
						}
					);
					
					/** /
					_self._loadAllInsects( obj ).then( function(data) {
		
						if( !angular.isDefined(data) ) {
		
							//deferred.reject( 'ADs data undefined from _loadAllInsects()' );
							deferred.resolve([]);
		
						} else {
		
							_self._collection_insects.length = 0;
		
							//var dataLen = data.length;
		
							_self._collection_insects = data;
		
							deferred.resolve( _self._collection_insects );
		
						}
		
						}, function(err) {
			
							deferred.reject( err );
			
						}
					);
					/**/
		
				} else {
		
					console.info('insects object cache');
					deferred.resolve( _self._collection_insects );
		
				}
		
				return deferred.promise;
		
			},
			flush: function() {
		
				var _self 		= this,
					deferred	= $q.defer();
		
				MemCache.dataRemove( 'dmapp-products', 'localforage' ).then( function(){
		
							_self._collection_insects.length = 0;
		
							deferred.resolve();
		
						}, function(err) {
		
							_self._collection_insects.length = 0;
		
							deferred.reject( 'An Error Occurred Removing Insects from memory. Please Contact Administrator.' );
		
					}
		
				);
		
				return deferred.promise;
		
			},
			/**
			 * @private Get data for all insects
			 * 
			 * @param {Object.obj}
			 *
			 * @return {Promise.Object}
			 * 
			 **/
			_loadAllInsects: function( obj ) {
		
				Utils._strict( [ Object ], arguments );
				
				var deferred = $q.defer();
				
				$http({
					method: obj.method, 
					url: appConfig.general.api + obj.type,
					transformRequest: transformRequestAsFormPost
				})
				.success( function(data, status) {

					console.log("Request insect:", data);
				
					deferred.resolve( data );
				
				})
				.error( function(data, status) {
				
					console.error("Request failed:", data);
				
					deferred.reject( data );
										
				});
							
				return deferred.promise;
		
			}
		
		};
		
		return insectsManager;
		
	}]

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appInsectService = appInsectService || angular.module( 'appInsectService', [ 'appUtils', 'appXHR', 'appMemCache', 'appSessionService', 'appFormvalidation' ] );

		appInsectService
			.factory( Application.Factorys );

		console.log('Insect Service Booted.');

	});
		
	exports.appInsectService = appInsectService;
});