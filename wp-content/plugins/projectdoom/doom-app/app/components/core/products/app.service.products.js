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

										//deferred.resolve( data );

										/***/
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
			getByProductType: function( term ) {

				Utils._strict( [ String ], arguments );
		
				var _self 		= this,
					deferred 	= $q.defer(),
					dataHolder	= [];

					//console.log('geting', term);

				_self.getProducts({
					'type': 'product',
					'method': 'GET'
				}).then( function(results){
						
						for (var index = 0; index < results.length; index++) {
							
							var element = results[index];

							var i;
							for ( i in element.product_types ) {

								//console.log('i', i);

							
								if( element.product_types[i].slug == term || element.product_types[i].term_id == term  ) {
									
									dataHolder.push(element);

								}

							}
							
						}
						
						dataHolder = _self.sortProductsByDate(dataHolder);

						deferred.resolve(dataHolder );

					},function(error){

						deferred.reject( error );

					}
				);
		
				return deferred.promise;
		
			},
			filterProductsByPest: function(pestTypes, productList) {
				Utils._strict( [ Array, Array ], arguments );
				
				var _self 		= this,
					deferred 	= $q.defer(),
					filteredList = [];

					//console.log('geting', term);
				if (productList == undefined || productList.length < 1) { //not ideal
					_self.getProducts({
						'type': 'product',
						'method': 'GET'
					}).then( function(results){
						
						deferred.resolve(results);
					}, function (e) {
						console.error(e);
						deferred.resolve(e);
					} );
				} else {
					/*
					filter objects
						level 1 - the product type
								- we will default to Spray as it is available accross all insects
						level 2 - the product variants (odourless/lavendar)
								- we will be relying of the product sorting on the backend side to deal with this
						level 3 - the PEST problem that they solve (the pest/pests that they target)
								- the next most relevant product will be one that targets only exactly the same pest
								- the most relevant after that will be that pest including one other,
								- etc
						level 4 - the severity of the pest problem (single occurrence / maintenance / infestation)
					/**/

					/* 
					foreach product
						set score to 0
						foreach pest type in product
							foreach provided pest type
								if product pest type matches provided pest type
									set toAdd to true
									negate 1 from score
								else add 1 to score
							if toAdd is true
								case single occurrence
									add 1 to score
								case maintenance
									add 2 to score
								case infestation
									add 3 to score
						if toAdd is true 
							add to new list
					endfor
					/**/

					var recievedCats = [];
					for (var iP = 0; iP < productList.length; iP++) {
						var toAdd = false;
						var productCats = [];
						productList[iP].score = 0;

						for (var iPT = 0; iPT < productList[iP].product_categories.length; iPT++) {
							for (var iT = 0; iT < pestTypes.length; iT++) {
								//check only insect types
								switch (productList[iP].product_categories[iPT].slug) {
									case "fly":
									case "cockroach":
									case "mosquito":
									case "ant":
									case "flea":
									case "fishmoth":
										if ((pestTypes[iT].term_id != undefined && productList[iP].product_categories[iPT].term_id == pestTypes[iT].term_id) || 
										(productList[iP].product_categories[iPT].slug == pestTypes[iT].slug)) {
											toAdd = true;
											productList[iP].score -= 1;
										} else {
											productList[iP].score += 1;
										}
										if (!productCats.includes(productList[iP].product_categories[iPT].slug)) {
											productCats.push(productList[iP].product_categories[iPT].slug);
										}
										if ((productList[iP].product_categories[iPT].slug == pestTypes[iT].slug) && !recievedCats.includes(pestTypes[iT].slug)) {
											recievedCats.push(pestTypes[iT].slug);
										}
										break;
								}
								//check for severity
								switch (productList[iP].product_categories[iPT].slug) {
									case "single":
										productList[iP].score += 0.1;
										break;
									case "maintenance":
										productList[iP].score += 0.2;
										break;
									case "infestation":
										productList[iP].score += 0.3;
										break;
								}
							}
						}
						if (toAdd && (productCats.length >= recievedCats.length)) {
							// filteredList.push({name: productList[iP].post_name, score: productList[iP].score});
							filteredList.push(productList[iP]);
						}

						// console.log("productCats",productCats);
						// console.log("recievedCats",recievedCats);
					}
					// console.log("filtered List",filteredList);
					var retList = _self.sortProductsByScore(filteredList);
					//MANUAL OVERRIDES - 
					//	fleas and fishmoths
					if (retList.length > 1 && recievedCats.length == 1 && (recievedCats[0] == "flea" || recievedCats[0] == "fishmoth")) {
						//find fogger and move it to front
						for (var i = 0; i < retList.length; i++) {
							if (retList[i].post_name.toLowerCase().indexOf("fogger") > -1) {
								var item = retList[i];
								retList.splice(i, 1);
								retList.splice(0, 0, item);								
							}
						}
						//OR HACK and just splice last product into first
						// retList.splice(0, 0, retList.splice(retList.length-1, 1)[0])
					}
					//	ant
					if (retList.length > 1 && recievedCats.length == 1 && (recievedCats[0] == "ant")) { 
						//find crawling defend and put it in front (Nixed because not needed)
					}
					// console.log("sorted filtered List",retList);
					deferred.resolve(retList);
				}
				return deferred.promise;
			},
			sortProductsByDate: function (array) {
				var interval = Math.floor(array.length/1.3);
				while (interval > 0) {
					for(var i=0; i+interval<array.length; i+=1) {
						if (array[i].post_date > array[i+interval].post_date) {
							var small = array[i+interval];
							array[i+interval] = array[i];
							array[i] = small;
						}
					}
					interval = Math.floor(interval/1.3);
				}
				return array;
			},
			sortProductsByScore: function (array) {
				var interval = Math.floor(array.length/1.3);
				while (interval > 0) {
					for(var i=0; i+interval<array.length; i+=1) {
						if (array[i].score > array[i+interval].score) {
							var small = array[i+interval];
							array[i+interval] = array[i];
							array[i] = small;
						} else if (array[i].score == array[i+interval].score) {
							if (array[i].post_date > array[i+interval].post_date) {
								var small = array[i+interval];
								array[i+interval] = array[i];
								array[i] = small;
							}
						}
					}
					interval = Math.floor(interval/1.3);
				}
				return array;
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
			 * @private Get data for all products
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
				
					deferred.resolve( $filter('orderBy')( data, 'ID', false ) );
				
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