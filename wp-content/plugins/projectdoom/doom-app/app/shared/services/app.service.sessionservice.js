/**
* @private
* 
* 
* @App Dependencies [ app-utils, angular-memcache, domReady ]
*
* @return Angular.appSessionService
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
    require("app-memcache");

	// Load dependent modules
	var appSessionService,
		domReady 		= require("domReady"),
		angular 		= require("angular");

	// 
	var Application = Application || {};
	Application.Factorys = {};
	
	Application.Factorys.RoleService = [ '$q', 'Utils', 'MemCache', function ( $q, Utils, MemCache ) {
		
		var userRoles  = [ 'newUser', 'returnUser', 'dropoffUser', 'fullUser' ],
						
		factory = {};
		
		factory.validateRole = function ( type, callback ) {
		
			Utils._strict( [ String, Function ], arguments );
		
			var _self = this;
		
			//console.log('validating role: ', type );
			//var currentUser = JSON.parse(sessionStorage.getItem( 'currentUser' ));
			_self.currentUserRole( function(err, role) {
		
				if( err ) {
		
					callback( true );
		
				} else {
		
					//console.error('welcome: ', role);
					switch ( type ) {
		
						case 'staff':
		
							var valid = userRoles.indexOf( role );
		
							break;
		
						default:
		
							var valid = -1;
		
							break;
							
					}
		
					if( valid == -1 ) {
		
						callback( true );
		
					} else {
		
						callback( false, role );
							
					}
		
				}
		
			});
		
		}
		
		factory.isRole = function ( roles, callback ) {
		
			Utils._strict( [ Array, Function ], arguments );
		
			var valid,
				_self = this,
				roleOfPromises = [],
				rolesLength = roles.length;
					/**/
		
			_self.currentUserRole( function(err, role) {
		
				if( err ) {
		
					callback( true, role );
		
				} else {
		
					valid = roles.indexOf( role );
		
					if( valid == -1 ) {
		
						callback( true, role );
		
					} else {
		
						callback( false, role );
								
					}
		
				}
		
			});
		
		}
		
		factory.currentUserRole = function ( callback ) {
		
			Utils._strict( [ Function ], arguments );
		
			var currentUser = MemCache.dataGet( 'currentUser', 'sessionstorage');
		
			currentUser.then( function(data) {
		
					//console.log('curr user: ', data.role);
			
					if( data === false || Utils._isObjEmpty(data) ) {
			
						callback( true );
			
					} else {
			
						callback( false, data.role );
			
					}
		
				}, function(err) {
		
					callback( true );
		
			});
		
		}
		
		return factory;
		
	}]

	Application.Factorys.SessionService = [ '$rootScope', '$q', 'Utils', 'MemCache', function ( $rootScope, $q, Utils, MemCache ) {
		
		var factory = {};

		factory.currentUser 		= null;
		factory.AuthenticatedUser 	= '';
				
		/**
		 * @public
		 * 
		 * Start Current User Session
		 *
		 *
		 * @return {Object.Promise } [description]
		 **/
		
		factory.start = function ( data ) {
		
			Utils._strict( [ Object ], arguments );
		
			var deferred 	= $q.defer(),
				_self 		= this;
		
			//console.log('Store user:', data);
		
			_self.currentUser = {
				'last-visit'	: '',
				'time-started'	: '',
				'sessionID'		: '',
				'lastUpdate'	: '',
				'ip'			: '',
				'geo'			: ''
			};
		
			MemCache.dataStore( 'doomSession', _self.currentUser, 'sessionstorage' ).then( function() {
		
					deferred.resolve(_self.currentUser);

		
					console.log('AuthenticatedUser Login:', _self.currentUser);
		
				}, function(e) {
		
					deferred.reject( e );
				}
			);
		
			return deferred.promise;
		
		}
		
		/**
		 * @public
		 * 
		 * End Current User Session
		 *
		 *
		 * @return {} [description]
		 **/
		factory.end = function () {
		
			var _self 		= this,
				deferred 	= $q.defer();
		
			MemCache.dataRemove( 'doomSession', 'sessionstorage' ).then( function(){
		
					console.info('Kicking this bastard out!');
		
					_self.AuthenticatedUser 	= "";
					_self.currentUser 			= null;
		
					//MemCache.dataRemove( 'currentUser', 'sessionstorage' ).then( function(){

					deferred.resolve();
		
				}, function(e) {
		
					deferred.reject(e);
		
				}
			);
		
			return deferred.promise;		
		
		}

		/**
		 * @public
		 * 
		 * Get Current User Session
		 *
		 * @return {Function.callback } [boolean, object]
		 **/
		factory.getSession = function ( callback ) {
		
			Utils._strict( [ Function ], arguments );
		
			var _self = this;
			//var deferred 	= $q.defer();
		
			MemCache.dataGet( 'doomSession', 'sessionstorage').then( function(data) {
		
					if( data === false || Utils._isObjEmpty(data) ) {
			
						callback( _self.currentUser == null );
			
					} else {
			
						_self.currentUser = data;
			
						callback( false, data );
			
					}
		
				}, function(err) {
		
					callback( _self.currentUser == null );
		
				}
			);
		
		}
		
		return factory;
			
	}]

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appSessionService = appSessionService || angular.module( 'appSessionService', [ 'appUtils', 'appMemCache' ] );

		appSessionService
			.factory( Application.Factorys );


	});
		
	exports.appSessionService = appSessionService;
});