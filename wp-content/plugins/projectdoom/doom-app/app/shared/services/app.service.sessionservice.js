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

		factory.currentUser = { 
			'firstVisit'	: '',
			'lastVisit'		: '',
			'firstTime'		: '',
			'sessionID'		: '',
			'lastCheck'		: '',
			'ip'			: '',
			'geo'			: ''
		};
		factory.sessionStart 		= false;

		/**
		 * @public
		 * 
		 * Start Current User Session
		 *
		 *
		 * @return {Object.Promise } [description]
		 **/
		
		factory.checkSession = function () {

			var deferred 	= $q.defer(),
				_self 		= this;

			if( _self.sessionStart === true ) {

				_self.returningVisitor().then( function(riri) {

						// RETURN
						_self.currentUser.firstVisit 	= riri;
						_self.currentUser.firstTime 	= false;
						_self.currentUser.lastVisit 	= Date.now();

						deferred.resolve(_self.currentUser);

					}, function(erriri){

						// NOOB
						_self.start().then( function(sessdb) {
	
								deferred.resolve(sessdb);

							}, function(errdb) {

								deferred.reject(errdb);

							}
						);
								
					}
				);

			} else {

				_self.returningVisitor().then( function(riri) {

						MemCache.dataGet( 'doomSession', 'sessionstorage' ).then(function(sessdata) {

								_self.currentUser 				= sessdata;
								_self.currentUser.firstVisit 	= riri;
								_self.currentUser.firstTime 	= false;
								_self.currentUser.lastVisit = Date.now();

								deferred.resolve(_self.currentUser);

							}, function(error) {

								// NOOB
								_self.start().then( function(sessdb) {

										//console.log('usersession:', sessdb);
										sessdb.firstVisit 	= riri;
										sessdb.firstTime 	= true;

										deferred.resolve(sessdb);

									}, function(errdb) {

										deferred.reject(errdb);

									}
								);
							}
						);

					}, function(erriri){

						console.log('new visitor?');

						MemCache.dataGet( 'doomSession', 'sessionstorage' ).then(function(sessdata) {

								console.log('Nope!');

								_self.currentUser 				= sessdata;
								_self.currentUser.firstTime 	= false;
								
								deferred.resolve(_self.currentUser);

							}, function(error) {

								console.log('Yurp!');

								// NOOB
								_self.start().then( function(sessdb) {

										MemCache.dataStore( 'doom-mis-visit', ''+sessdb.firstVisit+'', 'localstorage' ).then( function(newssession) {

												deferred.resolve(sessdb);					
											
											}, function(e) {
											
												deferred.reject( e );
											}
										);
							
									}, function(errdb) {

										deferred.reject(errdb);

									}
								);
							}
						);

					}
				);

			}

			return deferred.promise;
		}
				
		/**
		 * @public
		 * 
		 * Start Current User Session
		 *
		 *
		 * @return {Object.Promise } [description]
		 **/
		
		factory.start = function () {
		
			//Utils._strict( [ Object ], arguments );

			var deferred 	= $q.defer(),
				_self 		= this;

			_self.currentUser.firstTime 	= true;
			_self.currentUser.firstVisit 	= Date.now();
			_self.currentUser.lastVisit 	= Date.now();

			_self.update( _self.currentUser ).then( function(results) {

					_self.sessionStart == true;

					deferred.resolve(results);

				}, function(err) {

					deferred.reject(err);
				}
			);

			return deferred.promise;
		
		}

		/**
		 * @public
		 * 
		 * Start Current User Session
		 *
		 *
		 * @return {Object.Promise } [description]
		 **/
		
		factory.returningVisitor = function () {

			var deferred 	= $q.defer(),
				_self 		= this;

			MemCache.dataGet( 'doom-mis-visit', 'localstorage' ).then(function(sessdata) {

					deferred.resolve(sessdata);

				}, function(errsess) {

					deferred.reject( errsess );

				}
			);
			
			return deferred.promise;

		}

		/**
		 * @public
		 * 
		 * Update Current User Session
		 *
		 *
		 * @return {} [description]
		 **/
		factory.update = function ( details ) {

			Utils._strict( [ Object ], arguments );

			var deferred 	= $q.defer(),
				_self 		= this;

			//_self.currentUser.lastVisit = Date.now();

			MemCache.dataStore( 'doomSession', details, 'sessionstorage' ).then( function(memdb) {
		
					deferred.resolve(memdb);

					//_self.sessionStart = true;

					//console.log('Session Updated:', memdb);
				
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
		
					//console.info('Kicking this bastard out!');
					_self.currentUser 		= {};
					_self.sessionStart 		= false;
		
					//MemCache.dataRemove( 'currentUser', 'sessionstorage' ).then( function(){

					deferred.resolve();
		
				}, function(e) {
		
					deferred.reject(e);
		
				}
			);
		
			return deferred.promise;		
		
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