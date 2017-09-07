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
    //require("jquery"),
	require("bindonce");
	//require("fancybox");
	//require("scrollReveal");
	require("angular-gmaps");
	require("angular-aria");
	require("angular-route");
	require("angular-animate");
	require("angular-filter");
	require("angular-progress");
	require("angular-material");
	require("angular-messages");
	//require("angular-accordion");

	// Load dependent modules
	var appinterface,
		imagesLoaded 	= require("imagesloaded"),
		classie			= require("classie"),
		isMobile 		= require("isMobile"),
		Utilities		= require("Utils"),
		domReady 		= require("domReady"),
		angular 		= require("angular");

	//
	var Application = Application || {};
	Application.Constants = {};
	Application.Services = {};
	Application.Controllers = {};
	Application.Factorys = {};
	Application.Filters = {};
	Application.Directives = {};

	Date.prototype.addDays = function(days) {
	    var dat = new Date(this.valueOf());
		dat.setDate(dat.getDate() + days);
		return dat;
	};

	// This script is released to the public domain and may be used, modified and
	// distributed without restrictions. Attribution not necessary but appreciated.
	// Source: http://weeknumber.net/how-to/javascript

	// Returns the ISO week of the date.
	Date.prototype.getWeek = function() {
		var date = new Date(this.getTime());
		date.setHours(0, 0, 0, 0);
		// Thursday in current week decides the year.
		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
		// January 4 is always in week 1.
		var week1 = new Date(date.getFullYear(), 0, 4);
		// Adjust to Thursday in week 1 and count number of weeks from date to week1.
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	};

	/* EXTEND ARRAY OBJ for IE8 < */
	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(needle) {
			var lenny = this.length;
			for(var i = 0; i < lenny; i++) {
				if(this[i] === needle) {
					return i;
				}
			}
			return -1;
		};
	}
	// Array Remove - By John Resig (MIT Licensed)
	if(!Array.prototype.remove) {
		Array.prototype.remove = function(from, to) {
			var rest = this.slice((to || from) + 1 || this.length);
			this.length = from < 0 ? this.length + from : from;
			return this.push.apply(this, rest);
		};
	}

	Application.Constants.constant = {

			'general': {
				Appname: 		"PRJDM",
				Version: 		'0.0.1',
				//api: 			window.global_url + '/wp-admin/admin-ajax.php',
				api: 			'https://wp.bernardus.co.za/wp-json/doom/v1/',
				path: 			'wp-content/plugins/projectdoom/doom-app/' //remove harcoded path

			}

	};

	/**
	 * @Constructor
	 *
	 * Creates a Date-Month-Year object. If parameters are blank on initialisation; returns currentobject based on current date;
	 *
	 * @param {String.day} [Optional]
	 * @param {String.month} [Optional]
	 * @param {String.year} [Optional]
	 *
	 * @return {Object} []
	 *
	**/
    Application.WorkingDate = function ( day, month, year ) {

		var _self = this,
			Datum = new Date();

		switch( arguments.length ) {

			case 1:

				_self._strict( [ String ], arguments );

				_self.currentDate 	= day;
				_self.currentMonth 	= Datum.getMonth();
				_self.currentYear 	= Datum.getFullYear();

				break;

			case 2:

				_self._strict( [ String, String ], arguments );

				_self.currentDate 	= day;
				_self.currentMonth 	= month;
				_self.currentYear 	= Datum.getFullYear();

				break;

			case 3:

				_self._strict( [ String, String, String ], arguments );

				_self.currentMonth = day;
				_self.currentDate = month;
				_self.currentYear  = year;

				break;

			default:

				return _self.ini( Datum );

				//break;

		}

		return _self.returnDate();

    };

	Application.WorkingDate.prototype =  {

    	currentMonth 	: '',
    	currentDate 	: '',
    	currentYear 	: '',


        /**
         * initiate and return current date;
         *
         * @param Object.el
         * @param String.eventName
         * @param Function.handler
         *
         * @return null
         */

    	ini 			: function( Datum ) {

    		this._strict( [ Date ], arguments );

    		this.currentDate 	= Datum.getDate();
    		this.currentMonth 	= Datum.getMonth();
			this.currentYear 	= Datum.getFullYear();

			return this.returnDate();

    	},

    	returnDate 		: function() {

    		var _self = this;

    		return {
    			'day'	: _self._returnDay(),
    			'month'	: _self._returnMonth(),
    			'year'	: _self.currentYear
    		};

    	},

		_returnDay 		: function() {

    		var day,
    			_self = this;

		    if ( _self.currentMonth == 1 && _self.currentDate >= 28 ){

				if ( (_self.currentYear%100!==0) && (_self.currentYear%4===0) || (_self.currentYear%400===0) ) {

					day = 29;

				} else {

					day = 28;

				}

			} else {

				if ( _self.currentDate < 10 ) {

					day = '0' + _self.currentDate;

				} else {

					day = _self.currentDate;
				}

			}

			//console.log('returned day:', day, _self.currentDate);

			return day;

		},

		_returnMonth 	: function() {

    		var month;

    		month = this.currentMonth + 1;

			if ( month < 10 ) {

				month = '0' + month;

			}

			return month;

		},

		_strict 		: function ( types, args ) {

            // Make sure that the number of types and args matches
            if ( types.length != args.length ) {
                // If they do not, throw a useful exception
                throw "Invalid number of arguments. Expected " + types.length + ", received " + args.length + " instead.";
            }
            // Go through each of the arguments and check their types
            for ( var i = 0; i < args.length; i++ ) {
                if ( args[i].constructor != types[i] ) {
                    throw "Invalid argument type. Expected " + types[i].name + ", received " + args[i].constructor.name + " instead.";
                }
            }

        }

    };

	var workingDate = new Application.WorkingDate();

	/* -----------------------------------------------
	 *
	 * Define Application-Wide Model Classes
	 *
	 * @note: NO LOGIC JUST C(R)UD of 1 Instance
	 *
	 * ----------------------------------------------- */
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
		 * @return {Product.Object}
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

	Application.Factorys.FAQ = [ '$q', '$filter', '$http', 'transformRequestAsFormPost', 'Utils', 'formValidation', function ( $q, $filter, $http, transformRequestAsFormPost, Utils, formValidation ) {

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

				MemCache.dataStore( 'dmapp-products', _self._collection_products, 'localforage' ).then( function() {

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

				} else {

					//console.info('card holders object cache');
					deferred.resolve( _self._collection_products );

				}

				return deferred.promise;

			},
			flush: function() {

				var _self 		= this,
					deferred	= $q.defer();

				MemCache.dataRemove( 'dmapp-products', 'localforage' ).then( function(){

							_self._collection_projects.length = 0;

							deferred.resolve();

						}, function(err) {

							_self._collection_projects.length = 0;

							deferred.reject( 'An Error Occurred Removing Projects from memory. Please Contact Administrator.' );

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
					url: Application.Constants.constant.general.api + obj.type,
					transformRequest: transformRequestAsFormPost
								/** /
								params: {
									action: 'ajax_contact'
								},

								data: {
									'firstName'			:	results[0],
									'lastName' 			:	results[1],
									'contact'			:	results[2],
									'email'				:	results[3],
									'msg'				:	results[4],
									'veryNB'			: 	document.getElementById('contact-veryNB').value,
									'security'			: 	document.getElementById('security').value,
									'_wp_http_referer'	: 	form.querySelector('input[name="_wp_http_referer"]').value
								}
								/**/
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

				MemCache.dataStore( 'dmapp-insects', _self._collection_insects, 'localforage' ).then( function() {

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

				} else {

					//console.info('card holders object cache');
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
					url: Application.Constants.constant.general.api + obj.type,
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

		return insectsManager;

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

				MemCache.dataStore( 'dmapp-retailers', _self._collection_retailers, 'localforage' ).then( function() {

						deferred.resolve( _self._collection_retailers );

					}, function(e){

						deferred.reject( e );

					}
				);

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
					url: Application.Constants.constant.general.api + obj.type,
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
					url: Application.Constants.constant.general.api + obj.type,
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

				MemCache.dataStore( 'dmapp-pages', _self._collection_pages, 'localforage' ).then( function() {

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

				} else {

					//console.info('card holders object cache');
					deferred.resolve( _self._collection_pages );

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
			_loadAllPages: function( obj ) {

				Utils._strict( [ Object ], arguments );

				var deferred = $q.defer();

				$http({
					method: obj.method,
					url: Application.Constants.constant.general.api + obj.type,
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

    /*
	 * Defines application-wide key value pairs
	 * ------------------------------------------------*/
	Application.Controllers.mapsController =  [ '$window', '$scope', '$compile', '$http', '$q', 'Utils', 'NavigatorGeolocation', 'GeoCoder', 'StreetView', function ( $window, $scope, $compile, $http, $q, Utils, NavigatorGeolocation, GeoCoder, StreetView  ) {

		$scope.ambetec_address = false;

		var gmap;

		$scope.$on('mapInitialized', function(event, map) {

			//console.log('map initialised', map);

			var addresses = [];

			addresses.push({
				title 	: "Maduka Mining & Engineering",
				address : "110 Mandela Street, Witbank, 1035",
				lat 	: "",
				long 	: ""
			});

			gmap = map;

			angular.forEach( addresses, function(val, key) {

				_geoIT ( val.address, val.title, function(e) {

					if( e === false ) {

						console.error( 'no gps (' + val.title + '): ', e );

					} else {

						//map.setCenter(e);

						_plot( e, val.address, val.title );

					}

				});

			});

			/** /
			_geoIT ( address, title, function(e) {

				if( e === false ) {

					console.error( 'no gps:', e );

				} else {

					map.setCenter(e);

					gmap = map;

					_plot( e, address, title );

				}

			});
			/**/

		});

		/**
	     * Geocode Address to Latitude & Longitude
	     *
	     * @param String.addr 		 Physical Address
	     * @param String.addrTitle	 Location Title
	     *
	     * @return null
	     */
		function _geoIT ( addr, addrTitle, callback ) {

			Utils._strict( [ String, String, Function ], arguments );

			//var geocoder = new google.maps.Geocoder();
			//var deferred = $q.defer();
			var geocoder = new google.maps.Geocoder();
			//var _self = this;

			geocoder.geocode({
					'address' : addr
				},
				function( results, status) {

					if ( status == google.maps.GeocoderStatus.OK ) {

						//_self.map.setCenter(results[0].geometry.location);

						callback( results[0].geometry.location);

						//deferred.resolve( results[0].geometry.location );

						//_self.plot( results[0].geometry.location, addr, addrTitle );

					} else {

						callback (false);
						//deferred.reject( 'Geocoder failed due to: '+ status );
					}
			});

			//return deferred.promise;

		}

		/**
	     * Geocode Address to Latitude & Longitude
	     *
	     * @param Object.latlng	 LatLong Coordinates
	     * @param String.addr 		 Physical Address
	     * @param String.addrTitle	 Location Title
	     *
	     * @return Null
	     */
		function  _plot ( latlng, addr, addrTitle ) {

	    	//Utils._strict( [ Object, String, String ], arguments );

	    	if ( window.google == null || window.google == undefined ) {

				console.error('google not defined...yet...?');

				return;

			} else {

				var _self = this;

	    		var marker = new google.maps.Marker({
						map: gmap,//_self.map,
						position: latlng,
						animation: google.maps.Animation.DROP,
						title: addrTitle
				});

				var infowindow = new google.maps.InfoWindow({
								content:
									'<h3 class="tc uppercase">' + addrTitle + '</h3>' +
									'<p>' + addr + '</p>'
				});

				//console.log( 'jus plotted:', addrTitle, latlng );

				//infowindow.open( gmap, marker );

				google.maps.event.addListener( marker, 'click', function() {
					infowindow.open( gmap, marker );
				});

	    	}

		}

		function _calcRoute ( from, to ) {

			var directionsService = new google.maps.DirectionsService();

			var request = {
				origin:from,
				destination:to,
				travelMode: google.maps.TravelMode.DRIVING,
				unitSystem: google.maps.UnitSystem.METRIC,
				region: 'za'
			};
			directionsService.route(request, function(result, status) {

				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
				};
			})

		}

	}]

	/*
	 * Define Application-Wide Services
	 * ------------------------------------------------*/
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

	Application.Services.MemCache = [ '$http', 'transformRequestAsFormPost', '$q', '$filter', 'Utils', function ( $http, transformRequestAsFormPost, $q, $filter, Utils ) {

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

	Application.Factorys.Utils = function () {

		var factory =  new Utilities.Utils();

		return factory;

	}

	Application.Services.formValidation = [ '$q', 'Utils', function ( $q, Utils ) {

		var factory = this;

		this._validateBool = function ( data ) {

			Utils._strict( [ Boolean ], arguments );

			var deferred = $q.defer();

			deferred.resolve( data );

			return deferred.promise;

	    }

	    /**
	     *
	     *
	     * @param String
	     *
	     * @return String
	     */
	    this._validateMessage = function ( message ) {

	    	//Utils._strict( [ String ], arguments );

	    	var deferred = $q.defer();

			if( !angular.isDefined(message) || message == '' ) {

				deferred.reject( 'Please enter a message.' );

			} else {

				message = Utils.trim(message);

				if( message.length < 3 || message.length > 400 ) {

					deferred.reject( 'Please enter a valid message' );

				} else {

					deferred.resolve( message );

				}

			}

			return deferred.promise;

	    }

		/**
	     *
	     *
	     * @param String
	     *
	     * @return Object
	     */
		this._validateDate = function ( date ) {

			Utils._strict( [ String ], arguments );

			var deferred = $q.defer(),
				months = ['01','02','03','04','05','06','07','08','09','10','11','12'],
				NewDate = date.split(/\s*\-\s*/g); // YYYY-MM-DD

			if( !angular.isDefined(date) || date == '' ) {

	    		deferred.reject( 'Please enter a date.' );

	    	} else {

				if( Utils.isDate(date) === false ) {

					deferred.reject( 'Please enter a valid Date ( YYYY-MM-DD )' );

				} else {

					if( NewDate.length == 3 ) {

						console.log('dates:', date, NewDate);

						if( Utils.isDate( NewDate[0] ) === false || NewDate[0].length !== 4 ) {

							deferred.reject( 'Please enter a valid year.' );

						}

						if ( NewDate[1] > 12 || NewDate[1] < 1 ) {

							deferred.reject( 'Please enter a valid month' );

						}

							switch( NewDate[1] ) {

								case '02':

									if ( NewDate[2] > 28 ) {

										deferred.reject( 'Please enter a valid day of the month.' );

									} else {

										deferred.resolve( date );

									}

									break;

								case '04':
								case '06':
								case '09':
								case '11':

									if ( NewDate[2] > 30 ) {

										deferred.reject( 'Please enter a valid day of the month.' );

									} else {

										deferred.resolve( date );

									}

									break;

								case '01':
								case '03':
								case '05':
								case '07':
								case '08':
								case '10':
								case '12':

									if ( NewDate[2] > 31 ) {

										deferred.reject( 'Please enter a valid day of the month.' );

									} else {

										deferred.resolve( date );

									}

									break;

								default:

									break;
							}

					} else {

						deferred.reject( 'Please enter a valid Date format ( YYYY-MM-DD )' );

					}

				}

			}

			return deferred.promise;

		}

		/**
	     *
	     *
	     * @param String
	     *
	     * @return Object
	     */
		this._validateYear = function ( year ) {

			//Utils._strict( [ Number ], arguments );

			var deferred = $q.defer();

			if( !angular.isDefined(year) || year == '' ) {

	    		deferred.reject( 'Please select a year.' );

	    	} else {

				if( Utils.testint(year) === true ){//&& year.length == 4 ){

					deferred.resolve( year );

				} else {

					deferred.reject( 'Please enter a valid Year [' + year + '].' );

				}

			}

			return deferred.promise;

		}

		this._validateTime = function ( time ) {

			Utils._strict( [ String ], arguments );

			var deferred = $q.defer(),
				validFormat = (time.search(/^\d{2}:\d{2}:\d{2}$/) != -1) && (time.substr(0,2) >= 0 && time.substr(0,2) <= 24) && (time.substr(3,2) >= 0 && time.substr(3,2) <= 59) && (time.substr(6,2) >= 0 && time.substr(6,2) <= 59);

			if( time.search(/^\d{2}:\d{2}:\d{2}$/) != -1 ) {

				deferred.reject( 'Please ensure you\'ve used the following 24 HR Format: ( hh:mm:ss )' );
			/** /
			} else if( (time.substr(0,2) >= 0 && time.substr(0,2) <= 23) && (time.substr(3,2) >= 0 && time.substr(3,2) <= 59) && (time.substr(6,2) >= 0 && time.substr(6,2) <= 59) ) {

				deferred.reject( 'Please enter a valid Time in 24 HR Format: ( hh:mm:ss )' );
			/**/
			} else {

				deferred.resolve( time );
			}

			return deferred.promise;

		}

		/**
	     *
	     *
	     * @param String
	     *
	     * @return Object
	     */

		return factory;

	}]

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

	/*
	 * Define Form Directives
	 * ------------------------------------------------*/
	Application.Directives.uiHeader = function () {

		return {
			restrict: 		'AE',
			transclude: 	true, // pass entire template?
			//templateUrl: 	'htmlContent/global/header.html',
			templateUrl: 	window.global_templateUrl + '/template-parts/header/header.php'
			//controller:  	Application.Controllers.dashboardController
		};

	};

	Application.Directives.uiFooter = function () {

		return {
			restrict: 		'AE',
			transclude: 	true, // pass entire template?
			templateUrl: 	'htmlContent/global/colophon.html'
		};

	};

	Application.Directives.uiNavigation = function () {

		return {
			restrict: 		'AE',
			controller:  	[ '$scope', '$http', '$q', '$route', '$location', '$timeout', '$mdSidenav', '$log', 'transformRequestAsFormPost', 'Utils', 'ngProgress', function ( $scope, $http, $q, $route, $location, $timeout, $mdSidenav, $log, transformRequestAsFormPost, Utils, ngProgress ) {

				/** /
				$scope.$on( '$routeChangeSuccess', function(event, current) {
					$scope.currentLink = getCurrentLinkFromRoute(current);
				});
				/**/
				$scope.toggleLeft 	= buildDelayedToggler('left');

				$scope.goto = function ( page ) {

					Utils._strict( [ String ], arguments );

					console.log( 'open page:', page );

					switch( page ) {

						case 'home':

							$location.path('/');

							break;

						case 'about':

							$location.path('/about');

							break;

						case 'legal':

							$location.path('/legal');

							break;

						case 'products':

							$location.path('/products');

							break;

						case 'faq':

							$location.path('/faq');

							break;

						case 'contact':

							$location.path('/contact');

							break;

						default:

							$location.path('/404');

							throw 'Biaytch!';

							break;

					}

				};

				$scope.close = function () {
					// Component lookup should always be available since we are not using `ng-if`
					$mdSidenav('left').close()
					  .then(function () {
						$log.debug("close LEFT is done");
					  });
				};

				/**
				 * Supplies a function that will continue to operate until the
				 * time is up.
				 */
				function debounce(func, wait, context) {
					var timer;
					return function debounced() {
						var context = $scope,
							args = Array.prototype.slice.call(arguments);
						$timeout.cancel(timer);
						timer = $timeout(function() {
							timer = undefined;
							func.apply(context, args);
						}, wait || 10);
					};
	  			}

				/**
				 * Build handler to open/close a SideNav; when animation finishes
				 * report completion in console
				 */
				function buildDelayedToggler(navID) {
					return debounce(function() {
						// Component lookup should always be available since we are not using `ng-if`
						$mdSidenav(navID)
							.toggle()
							.then(function () {
							$log.debug("toggle " + navID + " is done");
							});
					}, 200);
				}

				//console.log('waddup from navigation');

			}]
		};

	};

	Application.Directives.uiAppActivity = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			templateUrl: 	window.global_templateUrl + '/template-parts/activities/home.php',
			controller:  	[ '$rootScope', '$scope', '$http', '$q', '$route', '$timeout', 'transformRequestAsFormPost', 'Utils', 'insectsManager', 'ngProgress', function ( $rootScope, $scope, $http, $q, $route, $timeout, transformRequestAsFormPost, Utils, insectsManager, ngProgress ) {


				var inputMsgTimeout,
					inputValidationTimeout;

				$scope.$on( '$destroy', function(evt, data) {

					inputMsgTimeout  = null;
					inputValidationTimeout  = null;

				});

				/** /
				$rootScope.$on( "projects", function( type, data ){

					console.log('PROJECTS MANAGER LISTENER:', data );

						switch(data.type) {

							case 'new':

								//$scope.projects.push(data.data);

								break;

							case 'remove':

								//$scope.projects.push(data.data);

								break;

						}

				});
				/***/

				$scope.$on( "$routeChangeSuccess", function( ev, to, toParams, from, fromParams ){

					//console.log(ev, to, toParams, from, fromParams);

					//console.log( 'App interface ready...', $scope );

					$scope.renderPath = $rootScope.renderPath;

					//console.log('App interface ready...', $route.current.locals.app_data );

					if( angular.isDefined($route.current.locals.app_data) ) {

						dataInitialise('taxonomy').then( function(results){

								console.log('App interface ready...', $route.current.locals.app_data, results );

							}, function(error) {

								console.error(error);
							}
						);

					}

				});

				$scope.$on( 'data-filter', function(evt, data) {

					console.log('Table Templates filter[' + data.type + ']',  data );

					var new_array = [];

					switch( data.type ) {

						case 'occupation':

							var index = filter_param_occupation.indexOf(data.data);

							if( index == -1 ) {

								filter_param_occupation.push(data.data);

							} else {

								filter_param_occupation.splice(index, 1);

							}

							break;

						case 'department':

							var index = filter_param_department.indexOf(data.data);

							if( index == -1) {

								filter_param_department.push(data.data);

							} else {

								filter_param_department.splice(index, 1);

							}

							break;

					}

					for (var i = 0; i < $route.current.locals.hse_data.equipment.length; i++) {

						if( angular.isDefined($route.current.locals.hse_data.equipment[i]) ) {

							var errors = [];

							if( filter_param_occupation.length == 0 ) {} else {

													if( $route.current.locals.hse_data.equipment[i].occupations !== null ) {

														var error_microStation = [];

														for (var j = 0; j < filter_param_occupation.length; j++) {

															if( angular.isDefined($route.current.locals.hse_data.equipment[i].occupations[j]) ) {

																if( $route.current.locals.hse_data.equipment[i].occupations[j].occupationID == filter_param_occupation[j] ) {

																	//console.log('nailed!', new_array);
																	//new_array.push($route.current.locals.hse_data.equipment[i]);

																	error_microStation.push(false);

																	break;

																} else {
																	//console.log('not nailed');
																	error_microStation.push(true);

																}

															}

														};

														if( error_microStation.indexOf(false) == -1 ) {

															errors.push(true);

														} else {

															errors.push(false);

														}

													} else {

														errors.push(true);
													}

							}

							if( filter_param_department.length == 0 ) {} else {

								if( $route.current.locals.hse_data.equipment[i].departmentID !== null ) {

										var error_microStation = [];

										for (var j = 0; j < filter_param_department.length; j++) {

											if( $route.current.locals.hse_data.equipment[i].departmentID == filter_param_department[j] ) {

												//console.log('nailed!', new_array);
												//new_array.push($route.current.locals.hse_data.equipment[i]);

												error_microStation.push(false);

												break;

											} else {
												//console.log('not nailed');
												error_microStation.push(true);

											}

										}

										if( error_microStation.indexOf(false) == -1 ) {

											errors.push(true);

										} else {

											errors.push(false);

										}

									} else {

										errors.push(true);
									}

								}

							var index = errors.indexOf(true);

							if( index == -1 ) {

								new_array.push($route.current.locals.hse_data.equipment[i]);

							}

						}

					}

					var timeDone = new Date().getTime();

					console.log('filtration time:', ( timeDone - data.time) / 1000, new_array, {
						'occupation': filter_param_occupation,
						'department': filter_param_department
					});

					if( filter_param_department.length == 0 && filter_param_occupation.length == 0 ) {

						//reset data
						$scope.hse_equipment = $route.current.locals.hse_data.equipment;

					} else {

						$scope.hse_equipment =  $filter('unique')( new_array, 'ID' ); //$filter('pick')( $route.current.locals.hse_data.equipment, 'cardNumber == ' + cardNumber + '' )[0];

					}

					$scope.$digest();

				});

				/**
				 * @private
				 *
				 *
				 *
				 * @param {String.err}
				 * @param {String.msg}
				 *
				 * @return {null}
				 *
				 **/
				function _formFeedBack ( err, msg ) {

					Utils._strict( [ Boolean, String ], arguments );

					if( err ) {

						if ( inputMsgTimeout ) $timeout.cancel( inputMsgTimeout );

							$scope.formError = true;
							$scope.formMsg = true;

							$scope.formErrorMsg = msg;

							inputMsgTimeout = $timeout( function() {

								$scope.formError = false;
								$scope.formMsg = false;
								$scope.formErrorMsg = '';

								$timeout.cancel( inputMsgTimeout );

							}, 8000); // delay 8s

					} else {

						$scope.formError = false;
						$scope.formMsg = true;

						$scope.formErrorMsg = msg;

					}

				}

				function dataInitialise( type ) {

					Utils._strict( [ String ], arguments );

					var request 	= '',
						deferred 	= $q.defer();

					switch( type ) {

						case 'faq':
						case 'taxonomy':

							request = type;

							break;

						default:

							throw '!?!#$';

							break;
					}

					$http({
						method: 'GET',
						url: Application.Constants.constant.general.api + request,
						transformRequest: transformRequestAsFormPost
					})
					.success( function(data, status) {

						deferred.resolve( data );

					})
					.error( function(data, status) {

						console.error("dataInitialise Request failed:", data);

						deferred.reject( data );

					});

					return deferred.promise;

				}

			}]
		}

	}

	/*
	 * Define UI Elements
	 * ------------------------------------------------*/
	Application.Directives.uiPreloader = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			template: 		'<div data-ng-transclude></div>',
			link: 			function( scope, element, attrs ) {

				//console.log('Cheif', element[0]);

				function fadeout() {

					//console.info('Fading out...', element[0]);

					var anti_fousc = element[0].style;

					anti_fousc.opacity = 1;
					(function fade(){
						(anti_fousc.opacity-=.1)<0.2?_openUp():setTimeout(fade,20);
					})();

				};

				function _openUp() {

					var anti_fousc = element[0].style;

					anti_fousc.display="none";

					//window.sr = new scrollReveal( srDefaults );
				}

				domReady( function () {

					fadeout();

				});

			}
		}

	}

	Application.Directives.uiScrollTop = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			template: 		'<div data-ng-transclude></div>',
			link: 			function( scope, element, attrs ) {

				//console.log('TouchInput:', element);

				var header_height 	= document.getElementById('branding');

				element[0].style.display = 'none';

				var cleanUp = function () {

					removEvent( element[0], 'click' );

					header_height = null;

				};

				function addEvent( element, eventName, callback ) {

					if ( element.addEventListener ) {

						element.addEventListener(eventName, callback, false)

					} else {

						element.attachEvent( 'on' + eventName, callback, false);
					}

				}

				function removEvent( element, eventName, callback ) {

					if ( element.removeEventListener ) {

						element.removeEventListener(eventName, callback, false)

					} else {

						element.removeEvent( 'on' + eventName, callback, false);
					}

				}

				function toShowOrNot() {

					//topOfpage var ini
					var y = window.pageYOffset;

					if( header_height == null ) {
						return;
					}

					if ( y > header_height.offsetHeight ) {

						element[0].style.display = '';

					} else {

						element[0].style.display = 'none';

					}

					return false;

				}

				if( isMobile.any() ){} else {

					addEvent( element[0], 'click', function(e) {

						e.preventDefault();

						scope.scrollToTop( window.document.body );

						return false;

					});

					if ( window.addEventListener ) {

						window.addEventListener( 'scroll', function(e) {

							toShowOrNot();

						});

					} else {

						window.attachEvent( 'onScroll', function(e){

							toShowOrNot();

						});

					}

				}

				scope.$on( '$destroy', cleanUp );

			},
			controller:  	[ '$scope', 'Utils', function ( $scope, Utils ) {

				/**
				 * @public
				 *
				 * Scroll to top of element
				 **/
				$scope.scrollToTop = function( element ) {

					Utils.scrollTo( element, 0, 150 );

					//Utils.scrollTo( window.document.body, 0, 150 );

				};

			}]
		}

	}

	/** /
	Application.Directives.uiFancybox = function () {

		return {
			restrict: 		'AE',
			scope: 			{},
			transclude: 	true,
			template: 		'<div data-ng-transclude></div>',
			link: 			function( scope, element, attrs ) {

				//console.log('Cheif', element[0]);

				var openEffect 		= attrs.openEffect,
					closeEffect 	= attrs.closeEffect;

				domReady( function () {

					 $( element[0] ).fancybox({
						padding 	: 0,
						openEffect 	: openEffect,
						openSpeed  	: 650,
						closeEffect : closeEffect,
						closeSpeed  : 550,
				    });

				});

			}
		}

	}
	/**/

	/*
	 * Define Application-Wide Filters
	 * ------------------------------------------------*/
	Application.Filters.dateFilter = [ 'Utils', function ( Utils ) {

		return function ( objects, key, start_date, end_date ) {

			if ( typeof(objects) === 'undefined' || typeof(key) === 'undefined' ) {
				return 0;
			}

			//console.log( 'filtering:', objects.length );

			var filtered_list = [],
				toadd;

			for ( var i = 0, fillA = objects.length; i < fillA; i++ ) {

				switch( key ) {

					case 'registration_date':

						toadd = Utils.DatesInRange( objects[i].registration_date, start_date, end_date );

						break;

					case 'date_created':

						toadd = Utils.DatesInRange( objects[i].date_created, start_date, end_date );

						break;

					case 'updated_at':

						toadd = Utils.DatesInRange( objects[i].updated_at, start_date, end_date );

						break;

					case 'datetime':

						toadd = Utils.DatesInRange( objects[i].datetime, start_date, end_date );

						break;

					case 'activity_date':

						toadd = Utils.DatesInRange( objects[i].date, start_date, end_date );

						break;

					default:

						toadd = NaN;

						break;

				}

				if( toadd === true ) {

					filtered_list.push( objects[i] );

				} else if( toadd == NaN ) {

					throw "illegal dates: " + start_date + " & " + end_date;
				}
				/** /
				var two_days_ago = new Date().getTime() - 2*24*60*60*1000;
				var last_modified = new Date(objects[i].date_created).getTime();

				var startD 	= Utils.convertDate(start_date),
					endD 	= Utils.convertDate(end_date);

				if ( two_days_ago <= last_modified ) {

					filtered_list.push( objects[i] );
				}/**/
			}

			//console.log( 'filtered date_Range:', filtered_list, filtered_list.length );

			return filtered_list;
		}

	}];

	Application.Filters.dateFormat = [ '$filter', 'Utils', function ( $filter, Utils ) {

		return function ( input ) {

			if( input == null ){
				return "";
			}

  			var _date = $filter('date')( new Date(input), 'yyyy MM dd' );

  			return _date.toUpperCase();

		}

	}];

	Application.Filters.timeFormat = [ '$filter', 'Utils', function ( $filter, Utils ) {

		return function ( input ) {

			if( input == null ){
				return "";
			}

  			var _date = $filter('date')( new Date(input), 'HH:mm:ss' );

  			return _date.toUpperCase();

		}

	}];

	Application.Filters.datetimeFormat = [ '$filter', 'Utils', function ( $filter, Utils ) {

		return function ( input ) {

			if( input == null ){
				return "";
			}

  			var _date = $filter('date')( new Date(input), 'yyyy MM dd HH:mm:ss' );

  			return _date.toUpperCase();

		}

	}];

	Application.Filters.sumByKey = function () {

	 	return function( data, key ) {

			if ( typeof(data) === 'undefined' || typeof(key) === 'undefined' ) {
				return 0;
			}

			var sum = 0;
			for ( var i = data.length - 1; i >= 0; i-- ) {

				if( data[i][key] === false || data[i][key] == null ) {} else {
					sum += parseInt( data[i][key] );
				}
			}

			return sum;
		}

	}

	Application.Filters.padByZero = function () {

		return function( data ) {

			if ( data ) {

				var intLeng = data.length;

				if( intLeng < 2 ) {
					return  '0' + data;
				} else {
					return data;
				}

			} else {
				return '00';
			}
		};

	}

	Application.Filters.trunk8 = function () {

		return function( text, length ) {

			if( typeof(text) === 'undefined' || text == null ) {
				return;
			}

			if ( text ) {

				var txtLeng = text.length;

				if( txtLeng > length ) {
					return text.slice(0, length);
				} else {
					return text;
				}

			} else {
				return text;
			}
		};

	}

	domReady( function () {

		/*
		 * UI MODULE
		 */
		appinterface = appinterface || angular.module( 'appinterface', [ 'ngRoute', 'ngProgress', 'ngMap', 'ngAnimate', 'ngMaterial' ] );

		appinterface
			.config( [ '$httpProvider', '$locationProvider', '$routeProvider', '$mdThemingProvider', function ( $httpProvider, $locationProvider, $routeProvider, $mdThemingProvider ) {

				// initialise interceptors
				$httpProvider.interceptors.push('sessionInjector');

				/*** /
				paginationTemplateProvider.setPath('htmlContent/global/dirPagination.tpl.html');

				// Pop-up Dialog Defaults
				ngDialogProvider.setDefaults({
					className: 'ngdialog-theme-default',
					plain: false,
					showClose: true,
					closeByDocument: true,
					closeByEscape: true
				});
				/**/

				$locationProvider
					.html5Mode( false )
					.hashPrefix('!#');

				$mdThemingProvider.theme('altTheme')
					.primaryPalette('pink', {
						'default': '400', // by default use shade 400 from the pink palette for primary intentions
						'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
						'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
						'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
					})
					// If you specify less than all of the keys, it will inherit from the
					// default shades
					.accentPalette('purple', {
						'default': '200' // use shade 200 for default, and keep all other shades the same
					});

				// START ROUTES
				$routeProvider
					.when(
						'/',
						{
							action: 	'home',
							resolve: {
								app_data: [ '$q', 'insectsManager', 'productsManager', 'retailersManager', 'packagesManager', function( $q, insectsManager, productsManager, retailersManager, packagesManager ) {

									//Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

									return $q.all([
										insectsManager.getInsects({
											'type': 'insect',
											'method': 'GET'
										}),
										productsManager.getProducts({
											'type': 'product',
											'method': 'GET'
										})
										/** /
										retailersManager.getRetailers({
											'type': 'retailer',
											'method': 'GET'
										}),
										/** /
										packagesManager.getPackages({
											'type': 'package',
											'method': 'GET'
										})
										/**/
									])
									.then( function(results){

											//Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

											//console.log('dashboard bootUp: ', results);

											return {
												insects 		: results[0],
												products 		: results[1]
												//retailers 		: results[2],
												//packages		: results[3]
											};

										}, function(e){

											//Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

											console.log('No bootUp(dashboard): ', e);

											return e;

										}
									);

								}]
							}

						}
					)
					.when(
						'/about',
						{
							action: 	'about',
							resolve: {
								app_data: [ '$q', 'pagesManager', function( $q, pagesManager ) {

								}]
							}

						}
					)
					.when(
						'/legal',
						{
							action: 	'legal',
							resolve: {
								app_data: [ '$q', 'pagesManager', function( $q, pagesManager ) {

								}]
							}

						}
					)
					.when(
						'/products',
						{
							action: 	'products',
							resolve: {
								app_data: [ '$q', 'pagesManager', function( $q, pagesManager ) {

								}]
							}

						}
					)
					.when(
						'/faq',
						{
							action: 	'faq',
							resolve: {
								app_data: [ '$q', 'pagesManager', function( $q, pagesManager ) {

								}]
							}

						}
					)
					.when(
						'/contact',
						{
							action: 	'contact',
							resolve: {
								app_data: [ '$q', 'pagesManager', function( $q, pagesManager ) {

								}]
							}

						}
					)
					.otherwise({
						action: 	'404'
					});

			}])
			.run([ '$rootScope', '$location', '$route', '$routeParams', 'MemCache', 'SessionService', 'Utils', 'ngProgress', function ( $rootScope, $location, $route, $routeParams, MemCache, SessionService, Utils, ngProgress ) {


				/**
				 * @private
				 *
				 * Route Authorization Check
				 *
				 */
				var _authorization = function ()
				{

					//Utils.toggleClass( document.getElementById('pamela-dashboard'), 'splash' );

					SessionService.getSession( function(err, results) {

						if( err === true ) {

							ngProgress.complete();

							//$rootScope.alzeihmers();

							$location.path('/login');

						} else {

							console.log('user session active:', results);

							//$location.path('/dashboard');

							_render();

							ngProgress.complete();

						}

					});

				};

				/**
				 * @private
				 *
				 * Update the rendering of the page.
				 *
				 */
				var _render = function ()
				{

					if( $route.current == undefined ) {
						return;
					}

					console.warn('routing:', $route.current.action);

					// Pull the "action" value out of the currently selected route.
					var renderAction = $route.current.action;

					if( renderAction == undefined ) {
						return;
					}

					// Also, let's update the render path so that we can start conditionally rendering parts of the page.
					var renderPath = renderAction.split( "." ),

					// Grab the IDs out of the params.
					//
					// NOTE: This will be undefined for every route except for the "appropriate" route; for the sake
					// of simplicity, I am not exerting any finer logic around it.

					// Reset the booleans used to set the class for the navigation.
					isHome 					= ( renderPath[ 0 ] == "dashboard" ),
					isAbout 				= ( renderPath[ 0 ] == "about" ),
					isLegal 				= ( renderPath[ 0 ] == "legal" ),
					isFAQ 					= ( renderPath[ 0 ] == "faq" ),
					isContact 				= ( renderPath[ 0 ] == "contact" ),
					isProducts				= ( renderPath[ 0 ] == "products" ),
					isInsects				= ( renderPath[ 0 ] == "insects" ),
					isConfigurator			= ( renderPath[ 0 ] == "configurator" );

					if( isProducts ) {

						var isProductPage		= ( renderPath[ 1 ] == "product-page" );

						$rootScope.isProductPage 	= isProductPage;

					}

					if( isInsects ) {

						var isInsectPage		= ( renderPath[ 1 ] == "insect-page" );

						$rootScope.isInsectPage 	= isInsectPage;

					}

					// Store the values in the model.
					$rootScope.renderAction 	= renderAction;
					$rootScope.renderPath 		= renderPath;

					$rootScope.isHome 			= isHome;
					$rootScope.isAbout 			= isAbout;
					$rootScope.isLegal 			= isLegal;
					$rootScope.isFAQ 			= isFAQ;
					$rootScope.isContact 		= isContact;
					$rootScope.isProducts 		= isProducts;
					$rootScope.isInsects		= isInsects;
					$rootScope.isConfigurator	= isConfigurator;
					$rootScope.isProductPage	= isProductPage;
					$rootScope.isInsectPage		= isInsectPage;

					// update body classes
					_updateBodyClass();

				};

				/**
				 * @private
				 *
				 * Update bodyClasses
				 *
				 */
				var _updateBodyClass = function() {

					var MainWindowTitle = "DOOM Presents...What's your Pest Problem?";

					_resetBodyClass();

					if( $rootScope.isProducts === true ) {

						if( $rootScope.isProductPage ) {

							window.document.title = 'Product Info - ' + MainWindowTitle;

							window.document.body.classList.add('page-product-single');

						} else {

							window.document.title = 'Products - ' + MainWindowTitle;

						}

						window.document.body.classList.add('page-products');

					} else if( $rootScope.isInsects === true ) {

						if( $rootScope.isInsectPage ) {

							window.document.title = 'Insect Info - ' + MainWindowTitle;

							window.document.body.classList.add('page-insect-single');

						} else {

							window.document.title = 'Insects - ' + MainWindowTitle;

						}

						window.document.body.classList.add('page-insects');

					} else if( $rootScope.isAbout === true ) {

						window.document.title = 'About - ' + MainWindowTitle;;

						window.document.body.classList.add('page-about');

					} else if( $rootScope.isLegal === true ) {

						window.document.title = 'Legal - ' + MainWindowTitle;;

						window.document.body.classList.add('page-legal');

					} else if( $rootScope.isFAQ === true ) {

						window.document.title = 'Frequently Asked Questions - ' + MainWindowTitle;;

						window.document.body.classList.add('page-faq');

					} else if( $rootScope.isContact === true ) {

						window.document.title = 'Contact us - ' + MainWindowTitle;;

						window.document.body.classList.add('page-contact-us');

					} else if( $rootScope.isHome === true ) {

						window.document.title = MainWindowTitle;

						window.document.body.classList.add('page-app-home');

					} else if( $rootScope.isConfigurator === true ) {

						window.document.title = 'Configurator - ' + MainWindowTitle;

						window.document.body.classList.add('page-configurator');

					}

				};

				/**
				 * @private
				 *
				 * Reset bodyClasses
				 *
				 */
				var _resetBodyClass = function () {

					window.document.body.setAttribute( 'class', 'page ui-fontSize-default ui-lang-en' );

				};

				$rootScope.alzeihmers = function() {

					//MemCache.resetData('app-data');

					//clientsManager.flush();
					//projectsManager.flush();
					//tasksManager.flush();
					//adsManager.flush();
					//templatesManager.flush();
					//panelsManager.flush();
					//componentsManager.flush();

				};

				$rootScope.$on( "$routeChangeStart", function( ev, to, toParams, from, fromParams ){

					ngProgress.start();

					//console.log('leaving route: ', from, to );

					//Utils.toggleClass( document.getElementById('pamela-dashboard'), 'splash' );

				});

				$rootScope.$on( '$routeChangeSuccess', function ( ev, to, toParams, from, fromParams ) {

					//console.log('success route: ', to );

					//_authorization();

					_resetBodyClass();

					_render();

					ngProgress.complete();

				});

				$rootScope.$on( '$routeChangeError', function ( ev, to, toParams, from, fromParams ) {

					console.log('Shiyat[route]: ', ev, to, toParams, from, fromParams );

					//alert('Shoya')

					ngProgress.complete();

				});

			}])
			.controller( Application.Controllers )
			.factory( Application.Factorys )
			.service( Application.Services )
			.filter( Application.Filters )
			.directive( Application.Directives );

		// BootStrap App!
		angular.bootstrap( window.document, ['appinterface'] );

	});

	exports.Application = Application;
});
