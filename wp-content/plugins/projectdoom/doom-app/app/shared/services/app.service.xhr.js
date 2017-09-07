/**
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

	// Load dependent modules
	var appXHR,
		domReady 		= require("domReady"),
		angular 		= require("angular");

	// 
	var Application = Application || {};
	Application.Factorys = {};
	
	/*
	 * Define Application-Wide XHR Injectors
	 * ------------------------------------------------*/
	Application.Factorys.sessionInjector = [ '$injector', '$q', 'Utils', function ( $injector, $q, Utils ) {
		
		var factory = {};
		
				factory.request = function ( config ) {
		
					//Utils._strict( [ Object ], arguments );
					//
					//var SessionService = $injector.get('SessionService');
		
					config.requestTimestamp = new Date().getTime();
		
					if( config.batchUpload === true ) {
						return config;
					}
		
					if( angular.isDefined(config) && config.method == "POST" ) {
						 
						 config.responseType = 'application/json';
						 config.withCredentials = true;
						//config.headers['x-session-token'] 	= angular.element('#security').val();
						//config.headers['X_REQUESTED_WITH'] 	= 'xmlhttprequest';
						config.headers['Content-Type'] 		= 'application/x-www-form-urlencoded; charset=UTF-8';
		
						//console.log('request config:', config);
		
					}
		
					return config;
		
					//console.log('request config:', config);
		
					//if( angular.isDefined(config) && config.method == "POST" ) {
						/** /
						SessionService.getSession( function(err, data) {
		
							if( err === false ) {
		
								//config.headers['x-session-token'] 		= 'user-session-authenticated';
								//config.headers['X_REQUESTED_WITH'] 		= 'xmlhttprequest';
								//config.headers['security'] 				= 'security';
								//config.headers['_wp_http_referer'] 		= '_wp_http_referer';
								//config.headers['Content-Type'] 		= 'application/x-www-form-urlencoded; charset=UTF-8';
		
								//return config;
								return $q.resolve(config);
		
							} else {
		
								// Session has expired (client-side)
								return $q.reject( 'sessionExpired' );
		
							}
		
						});
						/**/
		
					//}		
				
				}
		
				factory.requestError = function( rejectReason ) {
		
					if ( rejectReason === 'requestRejector' ) {
						
						// Recover the request
						return {
							transformRequest: [],
							transformResponse: [],
							method: 'POST',
							url: Application.Application.Constants.constant.general.api,
							headers: {
								'X_REQUESTED_WITH'	: 'xmlhttprequest',
								'Content-Type'		: 'application/x-www-form-urlencoded; charset=UTF-8'
							}
						};
		
					} else if ( rejectReason === 'sessionExpired' ) {
		
						//console.info('client side session expired');
		
						return $q.reject('client-side session expired');
					
					} else {
					
						return $q.reject(rejectReason);
					
					}
		
				}
		
				factory.response = function ( response ) {
		
					//Utils._strict( [ Object ], arguments );
		
					response.config.responseTimestamp = new Date().getTime();
		
					//console.log('response time:', ( config.responseTimestamp - config.requestTimestamp) / 1000 );
					
					return response;
		
				}
		
				factory.responseError = function ( response ) {
		
					//Utils._strict( [ Object ], arguments );
		
					// Session has expired (server-side)
					if ( response.status == 419 ){
		
						//var SessionService = $injector.get('SessionService');
						//var $http = $injector.get('$http');
						var deferred = $q.defer();
		
						// Create a new session (recover the session)
						// We use login method that logs the user in using the current credentials and
						// returns a promise
						//SessionService.login().then(deferred.resolve, deferred.reject);
		
						// When the session recovered, make the same backend call again and chain the request
						return deferred.promise.then(function() {
							return;//$http(response.config);
						});
		
					}
		
					return $q.reject(response);
		
				}
		
		return factory;
		
	}]
		
	Application.Factorys.transformRequestAsFormPost = [ 'Utils', function ( Utils ) {
		
		var factory = {};
		
				factory.transformRequest = function ( data, getHeaders ) {
		
					var headers = getHeaders();
		
					//headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
		
					return( $param( data ) );
					//return Utils._serialize(data);
				
				}
		
				function $param( obj ) {
		
					if ( ! angular.isObject( obj) ) { 
						return( ( obj== null ) ? "" : obj.toString() ); 
					}
		
					var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
		
					for( name in obj ) {
		
						value = obj[name];
			
						if( value instanceof Array ) {
		
							for( i in value ) {
		
								subValue = value[i];
								fullSubName = name + '[' + i + ']';
								innerObj = {};
								innerObj[fullSubName] = subValue;
								query += $param(innerObj) + '&';
							
							}
		
						} else if( value instanceof Object ) {
		
							for( subName in value ) {
		
								subValue = value[subName];
								fullSubName = name + '[' + subName + ']';
								innerObj = {};
								innerObj[fullSubName] = subValue;
								query += $param(innerObj) + '&';
							
							}
						
						} else if( value !== undefined && value !== null ){
		
							query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
		
						}
		
					}
		
					return query.length ? query.substr(0, query.length - 1) : query;
		
				}
		
		return factory;
		
	}]

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appXHR = appXHR || angular.module( 'appXHR', [ 'appUtils' ] );

		appXHR
			.config( [ '$httpProvider', function ( $httpProvider ) {
			
				// initialise interceptors			  	
				$httpProvider.interceptors.push('sessionInjector');
			
							
			}])
			.factory( Application.Factorys );


	});
		
	exports.Application = Application;
});