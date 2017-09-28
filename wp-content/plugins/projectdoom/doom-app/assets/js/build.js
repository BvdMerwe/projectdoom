({
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
		// APP DIRECTIVES
		"app-directives-preloader": '../../app/components/shared/app.directive.preloader',
		"app-directives-scrolltotop": '../../app/components/shared/app.directive.scrolltotop',
		"app-directives-navigation": '../../app/components/shared/navigation/app.directive.navigation',
		"app-directives-gallery": 	'../../app/components/shared/gallery/app.directive.gallery',
		// 3rd Party
		'isMobile': 				'../libs/isMobile',
		'classie': 					'../libs/classie',
		"localforage": 				'../libs/localforage.min',
		"modernizr": 				'../libs/modernizr',
		"Utils": 					'../libs/Utils',
		"domReady": 				'../libs/domready',
		"classie": 					'../libs/classie',
		'imagesloaded': 			'../libs/imagesloaded.pkgd.min'
	},
	out: '../../app/app.production.min.js',
	name: 'app',
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
		'bindonce': {
			deps: ["angular"]
		}
	},
    wrap: true,
	waitSeconds: 10,
	priority: [
		"modernizr"
	]
})