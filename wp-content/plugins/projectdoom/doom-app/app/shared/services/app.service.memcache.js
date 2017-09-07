/**
* @private
* 
* 
* @App Dependencies [ app-utils, angular-filter, domReady ]
*
* @return Angular.appMemCache
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
    require("angular-filter");

	// Load dependent modules
	var appMemCache,
		domReady 		= require("domReady"),
		angular 		= require("angular");

	// 
	var Application = Application || {};
	Application.Services = {};
	
	/*
	 * 
	 * ------------------------------------------------*/
	Application.Services.MemCache = [ '$http', '$q', '$filter', 'Utils', function ( $http, $q, $filter, Utils ) {
		
		var factory = this;

		/**
		 * @public
		 * 
		 * 
		 * @param {String.type} [Optional]
		 *
		 * @return null
		 * 
		 **/
		this.dataReset = function ( type ) {
		
			switch( type ) {
		
				default:
		
					var deferred = $q.defer();
		
					deferred.reject('Please specify to a key to reset UI data.');
		
					//console.error('Please specify to a key to reset UI data.');
		
					return deferred.promise;
		
					break;
					
			}
		
		}
		
		/**
		 * @private
		 * 
		 * SET LOCALSTORAGE
		 * 
		 * @param {String.key}
		 * @param {Object.data}
		 * @param {String.type}
		 * @param {Function.callback}
		 *
		 **/
		this.dataStore = function ( key, data, type ) {
		
			var deferred = $q.defer();
		
			if( angular.isArray(data) ) {
		
				Utils._strict( [ String, Array, String ], arguments );
		
				var jsoniData = JSON.stringify(data);
		
			} else if( angular.isObject(data) ) {
		
				Utils._strict( [ String, Object, String ], arguments );
		
				var jsoniData = angular.toJson(data);//JSON.stringify(data);
		
			} else if( !angular.isDefined(data) ) {
		
				console.error('undefined storage MemCache Data:', key, type );
		
				deferred.reject( data );
		
				return deferred.promise;
		
			} else {
		
				Utils._strict( [ String, String, String ], arguments );
		
				var jsoniData = data;
			}	
		
			try {
		
				//localStorage.setItem( LStoKey, JSON.stringify(Application.Constants.constant) );
						
				switch( type ) {
		
					case 'localstorage':
		
						window.localStorage.setItem( key, sjcl.encrypt('', jsoniData) );
		
						//console.log('localStorage saved:', key, sjcl.decrypt( '', window.localStorage.getItem( key ) ) );
		
						deferred.resolve();
		
					break;
		
					case 'sessionstorage':
		
						window.sessionStorage.setItem( key, sjcl.encrypt('', jsoniData) );
		
						//console.log('sessionStorage saved:', key, sjcl.decrypt( '', window.sessionStorage.getItem( key ) ) );
		
						deferred.resolve();
		
						break;
		
					case 'localforage':
		
						//console.log('foraging', jsoniData);
		
						localforage
							.setItem( key, sjcl.encrypt('', jsoniData) )
							//.setItem( key, jsoniData )
							.then( function(){
		
									//console.log('foraged', key, sjcl.encrypt('', jsoniData));
									//	console.log('foraged', key, jsoniData);
		
									deferred.resolve();
		
								}, function(error){
		
									//console.log('foraging failed', error);
		
									deferred.reject( error );
		
								}
							);
		
						break;
		
					default:
		
						deferred.reject( 'Storage type not specified.' );
		
						break;
		
				}
												
			} catch( e ) {
		
				// some other error ?? perhaps  localStorage not supported...FallBack?
				deferred.reject( e );
					
			}
		
			return deferred.promise;
		
		}
		
		/**
		 * @private
		 * 
		 * DELETE LOCALSTORAGE
		 * 
		 * @param {String.key}
		 * @param {String.type}
		 * @param {Function.callback}
		 *
		 **/
		this.dataRemove = function ( key, type ) {
		
			Utils._strict( [ String, String ], arguments );
		
			var deferred = $q.defer();
		
			try {
		
						switch( type ) {
		
							case 'localstorage':
		
								window.localStorage.removeItem( key );
		
								deferred.resolve();
		
								break;
		
							case 'sessionstorage':
		
								window.sessionStorage.removeItem( key );
		
								deferred.resolve();
		
								break;
		
							case 'localforage':
		
								localforage.removeItem( key, function(){
		
									console.log( key + ' removed!');
		
									deferred.resolve();
		
								});
		
								break;
		
							case 'localDisk':
		
								_removeFile( data, key ).then( function(db){
		
										deferred.resolve( db );
		
									}, function(e) {
		
										deferred.reject( e );
		
									}
		
								);
		
								break;
		
							default:
		
								deferred.reject( "Storage type not specified" );
		
								break;
		
						}
		
			} catch( e ) {
		
				// some other error ?? perhaps  localStorage not supported...FallBack?
				deferred.reject( e );
					
			}
		
			return deferred.promise;
		
		}
		
		/**
		 * @private
		 * 
		 * RETURN LOCALSTORAGE DATA
		 * 
		 * @param {String.key}
		 * @param {String.type}
		 * @param {Function.callback}
		 *
		 **/
		this.dataGet = function ( key, type ) {
		
			Utils._strict( [ String, String ], arguments );
		
			var data = null,
				deferred = $q.defer();
		
			try {
		
				switch( type ) {
		
							case 'localstorage':
		
								if( window.localStorage.getItem( key ) == null ) {
		
									deferred.reject( type + " " + key + " Storage null." );
		
								} else {
		
									deferred.resolve( JSON.parse( sjcl.decrypt( '', window.localStorage.getItem( key ) ) ) );
		
								}
		
								break;
		
							case 'sessionstorage':
		
								//data = sessionStorage.getItem( key );
		
								data = sjcl.decrypt( '', window.sessionStorage.getItem( key ) );
		
								deferred.resolve( JSON.parse( data ) );
		
								break;
		
							case 'localforage':
		
								localforage.getItem( key, function(e, db){
		
									//if( e === null && (db !== null) ) {
									if( e === null ) {
		
										//data = sjcl.decrypt( '', db );
		
										//console.log('localforage results['+key+']: ', e, JSON.parse( db ));
		
										//console.error(type + " " + key + " Storage null.", e, db); 
		
										//deferred.reject( type + " " + key + " Storage null." );
		
										if( db === null ) {
		
											deferred.resolve( [] );
		
										} else {
		
											deferred.resolve( JSON.parse( sjcl.decrypt( '', db ) ) );
		
										}
		
									} else {
		
										//data = sjcl.decrypt( '', e );
		
										//console.log( 'jus got ' + key + ' from ' + type, JSON.parse( data ) );
										
										//deferred.resolve( JSON.parse( data ) );
		
										console.error(type + " " + key + " Storage null.", e, db); 
		
										deferred.reject( e );
		
									}
		
								});
		
								break;
		
							default:
		
								deferred.reject( "Storage type not specified" );
		
								break;
		
				}
								
			} catch( e ) {
		
				// some other error ?? perhaps  localStorage not supported...FallBack?
				deferred.reject( e );
					
			};
		
			return deferred.promise;
		
		}
		
		return factory;
			
	}]

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appMemCache = appMemCache || angular.module( 'appMemCache', [ 'appUtils' ] );

		appMemCache
			.service( Application.Services );


	});
		
	exports.appMemCache = appMemCache;
});