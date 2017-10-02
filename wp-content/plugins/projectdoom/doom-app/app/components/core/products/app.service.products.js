/**
* @public
* 
* 
* @App Dependencies [xhr, utils, memcache, sessionservice, formvalidation]
*
* @return Application.Factorys
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
	var appProductService,
		appConfig		= require("text!../../app/app.config.json"),
		domReady 		= require("domReady"),
		angular 		= require("angular");
	
	appConfig = JSON.parse(appConfig);
	// 
	var Application = Application || {};
	Application.Factorys = {};
	
	Application.Factorys.Product = [ '$q', '$filter', '$http', 'transformRequestAsFormPost', 'Utils', 'formValidation', function ( $q, $filter, $http, transformRequestAsFormPost, Utils, formValidation ) {
		
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
		 * Initialise Data / Properties for Product Instance
		 * 
		 * @param {Number.id}
		 *
		 * @return {Product.Object}
		 * 
		 **/
		function Product( properties ) {
					
			Utils._strict( [ Object ], arguments );
		
			angular.extend( this, properties );
		
		}
		
		/**
		 * @static assigned to class
		 *
		 * Create and Return a new Product Instance
		 *
		 * @note: Instance ('this') is not available in static context
		 * 
		 * @param {Object}
		 * 
		 * @return {Product.Object}
		 * 
		 **/
		Product.build = function ( data ) {
		
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
		return Product;
		
	}]

	Application.Factorys.productsManager = [ '$http', 'transformRequestAsFormPost', '$q', '$filter', 'Utils', 'MemCache', 'Product', 'SessionService', function ( $http, transformRequestAsFormPost, $q, $filter, Utils, MemCache, Product, SessionService ) {
		
		var productsManager = {
		
			_collection_products: [],
			_retrieveInstance: function(  data ) {
		
				Utils._strict( [ Object ], arguments );
		
				return Project.build( data );
		
			},
			saveCollection: function() {
		
				var _self 		= this;
				var deferred 	= $q.defer();
		
				MemCache.dataStore( 'dmapp-products', _self._collection_products, 'localstorage' ).then( function() {
		
						deferred.resolve( _self._collection_products );
		
					}, function(e){
		
						deferred.reject( e );
		
					}
				);
		
				return deferred.promise;
		
			},
			getProducts: function( obj ) {

				Utils._strict( [ Object ], arguments );
		
				var _self 		= this,
					deferred 	= $q.defer();
		
				if( Utils._isObjEmpty(_self._collection_products) || _self._collection_products.length == 0 ) {

					/***/
					MemCache.dataGet( 'dmapp-products', 'localstorage' ).then( function( results ) {

							console.log('[PRODUCTS]from localstorage:');
		
							_self._collection_products.length = 0;

							_self._collection_products = results;
				
							deferred.resolve( results );
			
						}, function(e){


							_self._loadAllProducts( obj ).then( function(data) {

									if( !angular.isDefined(data) ) {
					
										//deferred.reject( 'ADs data undefined from _loadAllProducts()' );
										deferred.resolve([]);
					
									} else {

										_self._collection_products.length = 0;
					
										//var dataLen = data.length;
					
										_self._collection_products = data;

										deferred.resolve( data );

										/*** /
										_self.saveCollection().then( function(saveddb) {

												//console.warn('products saved', saveddb);

												deferred.resolve( saveddb );

											}, function(erroer) {

												deferred.reject( erroer );
												
											}
										);/***/
										
					
										//deferred.resolve( _self._collection_products );
					
									}
									
								}, function(err) {
					
									deferred.reject( err );
					
								}
							);
							//deferred.reject( e );
			
						}
					);
					
					/** /
					_self._loadAllProducts( obj ).then( function(data) {
		
						if( !angular.isDefined(data) ) {
		
							//deferred.reject( 'ADs data undefined from _loadAllProducts()' );
							deferred.resolve([]);
		
						} else {
		
							_self._collection_products.length = 0;
		
							//var dataLen = data.length;
		
							_self._collection_products = data;
		
							deferred.resolve( _self._collection_products );
		
						}
		
						}, function(err) {
			
							deferred.reject( err );
			
						}
					);
					/**/
		
				} else {
		
					console.info('products object cache');
					deferred.resolve( _self._collection_products );
		
				}
		
				return deferred.promise;
		
			},
			flush: function() {
		
				var _self 		= this,
					deferred	= $q.defer();
		
				MemCache.dataRemove( 'dmapp-products', 'localstorage' ).then( function(){
		
							_self._collection_projects.length = 0;
		
							deferred.resolve();
		
						}, function(err) {
		
							_self._collection_projects.length = 0;
		
							deferred.reject( 'An Error Occurred Removing Products from memory. Please Contact Administrator.' );
		
					}
		
				);
		
				return deferred.promise;
		
			},
			/**
			 * @private Get data for all projects
			 * 
			 * @param {Object.obj}
			 *
			 * @return {Promise.Object}
			 * 
			 **/
			_loadAllProducts: function( obj ) {
		
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
		
		return productsManager;
		
	}]

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appProductService = appProductService || angular.module( 'appProductService', [ 'appUtils', 'appXHR', 'appMemCache', 'appSessionService', 'appFormvalidation' ] );

		appProductService
			.factory( Application.Factorys );

		console.info('Products Service Booted.');

	});
		
	exports.appProductService = appProductService;
});