/**
* @private
* 
* 
* @App Dependencies [ utils, domReady ]
*
* @return Angular.appUtils
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

	// Load dependent modules
    var appUtils,
		Utilities 		= require("Utils"),
		domReady 		= require("domReady"),
		angular 		= require("angular");

	// 
	var Application = Application || {};
	Application.Factorys = {};
	
	/*
	 * 
	 * ------------------------------------------------*/
	Application.Factorys.Utils = function () {
        
        var factory =  new Utilities.Utils();
        
        return factory;
        
    }

	domReady( function () {

		/*
		 * APP MODULE
		 */
		appUtils = appUtils || angular.module( 'appUtils', [ ] );

		appUtils
			.factory( Application.Factorys );


	});
		
	exports.appUtils = appUtils;
});