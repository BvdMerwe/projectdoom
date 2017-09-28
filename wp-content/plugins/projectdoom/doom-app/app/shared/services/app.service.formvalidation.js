/**
* @private
* 
* 
* @App Dependencies [ app-utils, domReady ]
*
* @return Angular.appFormvalidation
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

	// Load dependent modules
    var appFormvalidation,
		domReady 		= require("domReady"),
		angular 		= require("angular");

	// 
	var Application = Application || {};
	Application.Services = {};
	
	/*
	 * 
	 * ------------------------------------------------*/
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
	    this._validateName = function ( firstName ) {
			
			//Utils._strict( [ String ], arguments );
			
			var deferred = $q.defer();
			
			if( !angular.isDefined(firstName) || firstName == '' ) {
			
				deferred.reject( 'Please enter a first name.' );
							
			} else {
			
				firstName = Utils.trim(firstName);
			
				if( firstName.length < 3 || firstName.length > 30 ) {
			
					deferred.reject( 'Please enter a valid first name.' );
			
				} else {
			
					deferred.resolve( firstName );
			
				}
			
			}
			
			return deferred.promise;
			
		}

		/**
	     * 
	     *
	     * @param String
	     * 
	     * @return String
	     */
	    this._validateEmail = function ( emailaddress ) {
			
			//Utils._strict( [ String ], arguments );
			
			var deferred = $q.defer();
			
			if( !angular.isDefined(emailaddress) || emailaddress == '' ) {
			
				deferred.reject( 'Please enter an e-mail address.' );
							
			} else {
			
				emailaddress = Utils.trim(emailaddress);
			
				if( Utils.isEmail( emailaddress ) ) {

					deferred.resolve( emailaddress );

				} else {
			
					deferred.reject( 'Please enter a valid e-mail address.' );
			
				}
			
			}
			
			return deferred.promise;
			
		}

		/**
	     * 
	     *
	     * @param String
	     * 
	     * @return String
	     */
	    this._validatePhone = function ( phoneNumber ) {
			
			//Utils._strict( [ String ], arguments );
			
			var deferred = $q.defer();
			
			if( !angular.isDefined(phoneNumber) || phoneNumber == '' ) {
			
				deferred.reject( 'Please enter a contact number.' );
							
			} else {
			
				phoneNumber = Utils.trim(phoneNumber);
			
				if( Utils.isPhone( phoneNumber ) ) {

					deferred.resolve( phoneNumber );

				} else {
			
					deferred.reject( 'Please enter a valid contact number.' );
			
				}
			
			}
			
			return deferred.promise;
			
		}

		/**
	     * 
	     *
	     * @param String
	     * 
	     * @return String
	     */
	    this._validateCompanyName = function ( companyName ) {
			
			//Utils._strict( [ String ], arguments );
			
			var deferred = $q.defer();
			
			if( !angular.isDefined(companyName) || companyName == '' ) {
			
				deferred.reject( 'Please enter a company name.' );
							
			} else {
			
				companyName = Utils.trim(companyName);
			
				if( companyName.length < 3 || companyName.length > 100 ) {

					deferred.reject( 'Please enter a valid company name.' );

				} else {

					deferred.resolve( companyName );
			
				}
			
			}
			
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

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appFormvalidation = appFormvalidation || angular.module( 'appFormvalidation', [ 'appUtils' ] );

		appFormvalidation
			.service( Application.Services );


	});
		
	exports.appFormvalidation = appFormvalidation;
});