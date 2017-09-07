/**
* @public
* 
* 
* @App Dependencies [xhr, utils, memcache, sessionservice, formvalidation]
*
* @return Angular.module.appPackageService
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
	var appPackageService,
		appConfig		= require("text!../../app/app.config.json"),
		domReady 		= require("domReady"),
		angular 		= require("angular");

	appConfig = JSON.parse(appConfig);
	// 
	var Application = Application || {};
	Application.Factorys = {};
	
	Application.Factorys.Package = [ '$q', '$filter', '$http', 'transformRequestAsFormPost', 'Utils', 'formValidation', function ( $q, $filter, $http, transformRequestAsFormPost, Utils, formValidation ) {
		
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
		 * Initialise Data / Properties for Package Instance
		 * 
		 * @param {Number.id}
		 *
		 * @return {Package.Object}
		 * 
		 **/
		function Package( properties ) {
					
			Utils._strict( [ Object ], arguments );
		
			angular.extend( this, properties );
		
		}
		
		/**
		 * @static assigned to class
		 *
		 * Create and Return a new Package Instance
		 *
		 * @note: Instance ('this') is not available in static context
		 * 
		 * @param {Object}
		 * 
		 * @return {Package.Object}
		 * 
		 **/
		Package.build = function ( data ) {
		
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
		return Package;
		
	}]

	Application.Factorys.packagesManager = [ '$http', 'transformRequestAsFormPost', '$q', '$filter', 'Utils', 'MemCache', 'Package', 'SessionService', function ( $http, transformRequestAsFormPost, $q, $filter, Utils, MemCache, Package, SessionService ) {
		
		var packagesManager = {
		
			_collection_packages: [],
			_retrieveInstance: function(  data ) {
		
				Utils._strict( [ Object ], arguments );
		
				return Retailer.build( data );
		
			},
			saveCollection: function() {
		
				var _self 		= this;
				var deferred 	= $q.defer();
		
				MemCache.dataStore( 'dmapp-retailers', _self._collection_packages, 'localforage' ).then( function() {
		
						deferred.resolve( _self._collection_packages );
		
					}, function(e){
		
						deferred.reject( e );
		
					}
				);
		
				return deferred.promise;
		
			},
			getPackages: function( obj ) {

				Utils._strict( [ Object ], arguments );
		
				var _self 		= this,
					deferred 	= $q.defer();
		
				if( Utils._isObjEmpty(_self._collection_packages) || _self._collection_packages.length == 0 ) {
		
					_self._loadAllPackages( obj ).then( function(data) {
		
						if( !angular.isDefined(data) ) {
		
							//deferred.reject( 'ADs data undefined from _loadAllPackages()' );
							deferred.resolve([]);
		
						} else {
		
							_self._collection_packages.length = 0;
		
							//var dataLen = data.length;
		
							_self._collection_packages = data;
		
							deferred.resolve( _self._collection_packages );
		
						}
		
						}, function(err) {
			
							deferred.reject( err );
			
						}
					);
		
				} else {
		
					//console.info('card holders object cache');
					deferred.resolve( _self._collection_packages );
		
				}
		
				return deferred.promise;
		
			},
			flush: function() {
		
				var _self 		= this,
					deferred	= $q.defer();
		
				MemCache.dataRemove( 'dmapp-packages', 'localforage' ).then( function(){
		
							_self._collection_packages.length = 0;
		
							deferred.resolve();
		
						}, function(err) {
		
							_self._collection_packages.length = 0;
		
							deferred.reject( 'An Error Occurred Removing Packages from memory. Please Contact Administrator.' );
		
					}
		
				);
		
				return deferred.promise;
		
			},
			/**
			 * @private Get data for all Packages
			 * 
			 * @param {Object.obj}
			 *
			 * @return {Promise.Object}
			 * 
			 **/
			_loadAllPackages: function( obj ) {
		
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
		
		return packagesManager;
		
	}]

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appPackageService = appPackageService || angular.module( 'appPackageService', [ 'appUtils', 'appXHR', 'appMemCache', 'appSessionService', 'appFormvalidation' ] );

		appPackageService
			.factory( Application.Factorys );

		console.info('Packages Service Booted.');

	});
		
	exports.appPackageService = appPackageService;
});