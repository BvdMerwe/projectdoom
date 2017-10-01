/**
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
require.config({
	//urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		"text":						'../libs/text/text',
		"angular":					'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min',
		"angular-animate":			'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min',
		"angular-route": 			'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min',
		'angular-aria':				'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min',
		'angular-messages':			'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min',
		'angular-material':			'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min',
		//ANGULAR PLUGINS
		"angular-gmaps": 			'../libs/plugins/angular/ng-map.min',
		"angular-filter":			'../libs/plugins/angular/angular-filter.min',
		"angular-progress": 		'../libs/plugins/angular/ngProgress.min',
		"bindonce": 				'../libs/plugins/angular/bindonce.min',
		//APP FILES
		"app": 						'../../app/app.module',
		"app-routes": 				'../../app/shared/app.routes',
		"app-filters": 				'../../app/shared/app.filters',
		"app-xhr": 					'../../app/shared/services/app.service.xhr',
		"app-utils": 				'../../app/shared/services/app.service.utils',
		"app-formvalidation":		'../../app/shared/services/app.service.formvalidation',
		"app-memcache": 			'../../app/shared/services/app.service.memcache',
		"app-sessionservice": 		'../../app/shared/services/app.service.sessionservice',
		"app-faq": 					'../../app/components/core/faqs/app.service.faqs',
		"app-page": 				'../../app/components/core/pages/app.service.pages',
		"app-page-directives": 		'../../app/components/core/pages/app.directive.pages.home',
		"app-insect": 				'../../app/components/core/insects/app.service.insects',
		"app-product": 				'../../app/components/core/products/app.service.products',
		"app-package": 				'../../app/components/core/packages/app.service.packages',
		"app-retailer": 			'../../app/components/core/retailers/app.service.retailers',
		"app-search": 			'../../app/components/shared/search/app.service.search',
		// APP DIRECTIVES
		"app-directives-preloader": '../../app/components/shared/app.directive.preloader',
		"app-directives-scrolltotop": '../../app/components/shared/app.directive.scrolltotop',
		"app-directives-navigation": '../../app/components/shared/navigation/app.directive.navigation',
		"app-directives-gallery": 	'../../app/components/shared/gallery/app.directive.gallery',
		"app-directives-contactform": 	'../../app/components/shared/contactform/app.directive.contactform',
		"app-directives-carousel": '../../app/components/shared/carousel/app.directive.carousel',
		"app-directives-searchbar": '../../app/components/shared/searchbar/app.directive.searchbar',
		"app-directives-search": '../../app/components/shared/search/app.directive.search',
		"app-directives-footer": '../../app/components/shared/footer/app.directive.footer',
		"app-directives-configurator": '../../app/components/shared/configurator/app.directive.configurator',
		"app-directives-randomstat": '../../app/components/shared/randomstat/app.directive.randomstat',
		// 3rd Party
		'isMobile': 				'../libs/isMobile',
		'classie': 					'../libs/classie',
		"localforage": 				'../libs/localforage.min',
		"modernizr": 				'../libs/modernizr',
		"sjcl": 				'../libs/sjcl',
		"Utils": 					'../libs/Utils',
		"domReady": 				'../libs/domready',
		"classie": 					'../libs/classie',
		'imagesloaded': 			'../libs/imagesloaded.pkgd.min'
	},
    shim: {
		'modernizr': {
			exports: 'Modernizr'
		},
		'app': {
			deps: ["modernizr", "isMobile"]
		},
		'Utils': {
        	//deps: ["sjcl"],
			exports: 'Utils'
		},
		'imagesloaded': {
			exports: 'imagesLoaded'
		},
        // angular
		'angular': {
			exports: 'angular'
		},
		'angular-animate': {
			deps: ["angular"]
        },
		'angular-gmaps': {
			deps: ["angular"]
		},
		'angular-filter': {
			deps: ["angular"]
		},
		'angular-progress': {
			deps: ["angular"]
		},
		'angular-route': {
			deps: ["angular"]
		},
		'angular-aria': {
			deps: ["angular"]
		},
		'angular-messages': {
			deps: ["angular"]
		},
		'angular-material': {
			deps: ["angular", "angular-messages", "angular-aria", "angular-animate"]
		},
		'app-directives-gallery': {
			deps: ["angular-material"]
		},
		'bindonce': {
			deps: ["angular"]
		}
	},
	waitSeconds: 10,
	priority: [
		"modernizr"
	]
});

/*-------------------------------------------------------------------------------------------------------------------------------*
 *
 *   ~:: BOOTSTRAP ::~
 *
 * init is the root of the app codebase. *
 *
 *-------------------------------------------------------------------------------------------------------------------------------*/
define( function ( require, exports, module ) {

	"use strict";

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

    // Load dependent non-module scripts
	require("app");
//Temporarily disabling this for dev TODO: Re-enable
	// if ( window.addEventListener ) {
	//
	// 	window.document.body.addEventListener("contextmenu", function (e) {
	//
	// 		e.preventDefault();
	//
	// 	});
	//
	// }

	/* ================================================
	@note 	Avoid `console` errors in browsers
			that lack a console.
	/* =============================================== */
	( function() {
		var method;
		var noop = function noop() {};
		var methods = [
			'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'
		];
		var length = methods.length;
		var console = (window.console = window.console || {});

		while (length--) {
			method = methods[length];

			// Only stub undefined methods.
			if (!console[method]) {
				console[method] = noop;
			}
		}

	}() );

});
