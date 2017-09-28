/**
* @public
*
*
* @App Dependencies [xhr, utils, memcache, sessionservice, formvalidation]
*
* @return Angular.module.appRetailerService
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
	var appRetailerService,
		appConfig		= require("text!../../app/app.config.json"),
		domReady 		= require("domReady"),
		angular 		= require("angular");

	appConfig = JSON.parse(appConfig);
	//
	var Application = Application || {};
	Application.Factorys = {};

	Application.Factorys.Retailer = [ '$q', '$filter', '$http', 'transformRequestAsFormPost', 'Utils', 'formValidation', function ( $q, $filter, $http, transformRequestAsFormPost, Utils, formValidation ) {

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
		 * Initialise Data / Properties for Retailer Instance
		 *
		 * @param {Number.id}
		 *
		 * @return {Retailer.Object}
		 *
		 **/
		function Retailer( properties ) {

			Utils._strict( [ Object ], arguments );

			angular.extend( this, properties );

		}

		/**
		 * @static assigned to class
		 *
		 * Create and Return a new Retailer Instance
		 *
		 * @note: Instance ('this') is not available in static context
		 *
		 * @param {Object}
		 *
		 * @return {Retailer.Object}
		 *
		 **/
		Retailer.build = function ( data ) {

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
		return Retailer;

	}]

	Application.Factorys.retailersManager = [ '$http', 'transformRequestAsFormPost', '$q', '$filter', 'Utils', 'MemCache', 'Retailer', 'SessionService', function ( $http, transformRequestAsFormPost, $q, $filter, Utils, MemCache, Retailer, SessionService ) {

		var retailersManager = {

			_collection_retailers: [],
			_retrieveInstance: function(  data ) {

				Utils._strict( [ Object ], arguments );

				return Retailer.build( data );

			},
			saveCollection: function() {

				var _self 		= this;
				var deferred 	= $q.defer();

				// MemCache.dataStore( 'dmapp-retailers', _self._collection_retailers, 'localforage' ).then( function() {
        //
				// 		deferred.resolve( _self._collection_retailers );
        //
				// 	}, function(e){
        //
				// 		deferred.reject( e );
        //
				// 	}
				// );

				return deferred.promise;

			},
			getRetailers: function( obj ) {

				Utils._strict( [ Object ], arguments );

				var _self 		= this,
					deferred 	= $q.defer();
          if( Utils._isObjEmpty(_self._collection_retailers) || _self._collection_retailers.length == 0 ) {

            _self._loadAllRetailers( obj ).then( function(data) {

              if( !angular.isDefined(data) ) {

                //deferred.reject( 'ADs data undefined from _loadAllRetailers()' );
                deferred.resolve([]);

              } else {

                _self._collection_retailers.length = 0;

                //var dataLen = data.length;

                _self._collection_retailers = data;

                deferred.resolve( _self._collection_retailers );

              }

              }, function(err) {

                deferred.reject( err );

              }
            );

          } else {

            //console.info('card holders object cache');
            deferred.resolve( _self._collection_retailers );

          }

				/*_self._collection_retailers = MemCache.dataGet('dmapp-retailers', 'localforage').then(function(data){
					_self._collection_retailers = data;
					if( Utils._isObjEmpty(_self._collection_retailers) || _self._collection_retailers.length == 0 ) {

						_self._loadAllRetailers( obj ).then( function(data) {

							if( !angular.isDefined(data) ) {

								//deferred.reject( 'ADs data undefined from _loadAllRetailers()' );
								_self.saveCollection();
								deferred.resolve([]);

							} else {

								_self._collection_retailers.length = 0;

								//var dataLen = data.length;

								_self._collection_retailers = data;
								_self.saveCollection();

								deferred.resolve( _self._collection_retailers );

							}

							}, function(err) {

								deferred.reject( err );

							}
						);

					} else {

						//console.info('card holders object cache');
						deferred.resolve( _self._collection_retailers );

					}

				}, function(err){
					return deferred.reject( err );
				});*/

				return deferred.promise;
			},
			flush: function() {

				var _self 		= this,
					deferred	= $q.defer();

				MemCache.dataRemove( 'dmapp-retailers', 'localforage' ).then( function(){

							_self._collection_insects.length = 0;

							deferred.resolve();

						}, function(err) {

							_self._collection_insects.length = 0;

							deferred.reject( 'An Error Occurred Removing Retailers from memory. Please Contact Administrator.' );

					}

				);

				return deferred.promise;

			},
			/**
			 * @private Get data for all Retailer
			 *
			 * @param {Object.obj}
			 *
			 * @return {Promise.Object}
			 *
			 **/
			_loadAllRetailers: function( obj ) {

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

		return retailersManager;

	}]

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appRetailerService = appRetailerService || angular.module( 'appRetailerService', [ 'appUtils', 'appXHR', 'appMemCache', 'appSessionService', 'appFormvalidation' ] );

		appRetailerService
			.factory( Application.Factorys );

		console.info('Retailers Service Booted.');

	});

	exports.appRetailerService = appRetailerService;
});
