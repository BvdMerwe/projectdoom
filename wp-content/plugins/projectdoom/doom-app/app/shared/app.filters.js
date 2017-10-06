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
    var appFilters,
        domReady 		= require("domReady"),
		angular 		= require("angular");

	// 
	var Application = Application || {};
    Application.Filters = {};
    
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

	Application.Filters.trustAsHtml = ['$sce',function ($sce) {

		return function( data ) {
			return $sce.trustAsHtml(data);
		};

	}];

	Application.Filters.numberWithCommas = ['$sce',function ($sce) {

		return function( data ) {
			
			var parts = data.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		};

	}];

	Application.Filters.shortNumber = function () {

		return function( num, digits ) {

			digits = typeof digits !== 'undefined' ? digits : 0;

			var si = [
				{ value: 1E18, symbol: "E" },
				{ value: 1E15, symbol: "P" },
				{ value: 1E12, symbol: "T" },
				{ value: 1E9,  symbol: "B" },
				{ value: 1E6,  symbol: "M" },
				{ value: 1E3,  symbol: "k" }
			  ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
			  for (i = 0; i < si.length; i++) {
				if (num >= si[i].value) {
				  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
				}
			  }
			  return num.toFixed(digits).replace(rx, "$1");
		};

	};
	
	domReady( function () {

		/*
		 * APP MODULE
		 */
		appFilters = appFilters || angular.module( 'appFilters', [ 'appUtils', 'angular.filter' ] );

        appFilters
            .filter( Application.Filters );


	});
		
	exports.Application = Application;
});