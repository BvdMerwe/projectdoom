/**
* @public
*
*
* @App Dependencies [xhr, utils, memcache, routes, sessionservice, domReady]

* General-purpose Event binding. Bind any event not natively supported by Angular
* Pass an object with keynames for events to ui-event
* Allows $event object and $params object to be passed
*
* @example <div data-ui-gallery content-type="" content-filter=""->
* @example <input ui-event="{ myCustomEvent : 'myEventHandler($event, $params)'}">
*
* @param content-type {string} Type of content type to display (Product|Insect|Retailer|Package)
* @param content-filter {boolean} Type of content type to display (Product|Insect|Retailer|Package)
*
* @return Angular.module.appDirectiveFormContact
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
        require("angular-progress");
        require("angular-material");

        require("app-routes");
        require("app-filters");
        require("app-memcache");
        require("app-insect");
        require("app-product");
        require("app-package");
        require("app-retailer");
        
		require("app-sessionservice");
		require("app-formvalidation");
        
        // Load dependent modules
        var appDirectiveFormContact,
            appConfig		= JSON.parse(require("text!../../app/app.config.json")),
            domReady 		= require("domReady"),
            isMobile 		= require("isMobile"),
            angular 		= require("angular");
    
        //
        var Application = Application || {};
        Application.Directives = {};
    
        Application.Directives.uiFormContact = function () {
    
            return {
                restrict: 		'AE',
                //scope:          {},
                transclude: 	true, // pass entire template?d
                templateUrl: 	appConfig.general.path + 'app/components/shared/contactform/contactform.php',
                link:           function(scope, element, attr) {
                    
                    //element
                    var elem = element[0];

                    //console.log( 'Contact Form attributes:', attr, elem ); 
					scope.isWidget          = attr.iswidget;
					
                    var cleanUp = function () {
                        
                        //removEvent( element[0], 'click' );
                        
                    };

                    domReady( function () {

                        //var filterToolBarBtns = elem.querySelectorAll('.toolbar-filter button');
                        
                        //console.log('filterToolBarBtns:', filterToolBarBtns);

                    });
                        
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

					scope.$on( '$destroy', cleanUp );
					
					scope.reset( elem );

                },
                controller:  	[ '$scope', '$http', '$q', '$route', '$location', '$timeout', '$log', '$filter', 'transformRequestAsFormPost', 'Utils', 'formValidation', 'ngProgress', 'insectsManager', 'productsManager', 'retailersManager', 'packagesManager', '$mdDialog', function ( $scope, $http, $q, $route, $location, $timeout, $log, $filter, transformRequestAsFormPost, Utils, formValidation, ngProgress, insectsManager, productsManager, retailersManager, packagesManager, $mdDialog ) {
    
                    
                    //Gallery Parameters
					$scope.isWidget;
					
					/**/
					$scope.formInputs = {
						'firstName':	'',
						'emailAddress':	'',
						'phone':		'',
						'company':		'',
						'message':		''
					}
					/**/

                    var inputMsgTimeout,
					inputValidationTimeout;

					$scope.validating 	= false;
					$scope.formError 	= false;
					$scope.formErrorMsg = false;
					$scope.formMsg 		= false;
					$scope.formSaving 	= false;
					
					$scope.submitForm = function () {

						ngProgress.start();

						console.log('saving form', $scope.formInputs);

						try {

							$q.all([
								formValidation._validateName( $scope.formInputs.firstName ),
								formValidation._validateEmail( $scope.formInputs.emailAddress ),
								formValidation._validatePhone( $scope.formInputs.phone ),
								formValidation._validateCompanyName( $scope.formInputs.company ),
								formValidation._validateMessage( $scope.formInputs.message )
							])
							.then( function(results) {

									$scope.formMsg 		= true;
									$scope.formError 	= false;
									$scope.formErrorMsg = "Sending Message...Please Be Patient.";

									var form = document.getElementById('formContact');

									//console.log('form results', results);

									/**/
									$http({
										method: 'POST', 
										url: appConfig.general.api,
										transformRequest: transformRequestAsFormPost,
										params: {
												action: 'ajax_contact'
										},
										data: {
											'firstName'			:	results[0],
											'lastName' 			:	results[1],
											'contact'			:	results[2],
											'email'				:	results[3],
											'msg'				:	results[4]
											//'veryNB'			: 	document.getElementById('contact-veryNB').value,
											//'security'			: 	document.getElementById('security').value, 
											//'_wp_http_referer'	: 	form.querySelector('input[name="_wp_http_referer"]').value
										}
									})
									.success( function(data, status) {

										if ( data.error === true ) {

											//_formFeedBack ( true, data.message );

											//Utils.fadeIn( form );

										} else {

											//console.log(data);

											//_formFeedBack ( false, data.message );

											//form.reset();
										
										}

										$mdDialog.show(
											$mdDialog.alert()
											  .clickOutsideToClose(true)
											  .textContent(e)
											  .ariaLabel('Your message was sent successfully.')
											  
										);

										form.reset();

										ngProgress.complete();		
										
									})
									.error( function(data, status) {

										ngProgress.complete();	
												
										//_formFeedBack ( true, data.message );

										console.error("Request failed:", data);

										$mdDialog.show(
											$mdDialog.alert()
											  //.parent(angular.element(document.querySelector('#popupContainer')))
											  .clickOutsideToClose(true)
											  //.title('This is an alert title')
											  .textContent('Sending your message failed.  Please contact the administrator.')
											  .ariaLabel('Contact Form validation message')
											  //.ok('Got it!')
											  //.targetEvent(ev)
										  );

										//Utils.fadeIn( form );
												
									});
									/**/

								}, function(e){

									ngProgress.complete();

									console.log('form failure', e);

									$mdDialog.show(
										$mdDialog.alert()
										  //.parent(angular.element(document.querySelector('#popupContainer')))
										  .clickOutsideToClose(true)
										  //.title('This is an alert title')
										  .textContent(e)
										  .ariaLabel('Contact Form validation message')
										  //.ok('Got it!')
										  //.targetEvent(ev)
									  );

									//_formFeedBack ( true, e );

								}
							);
							
						} catch( e ) {

							ngProgress.complete();

							console.log( "validation error:", e );

							//_formFeedBack ( true, e );
						
						}
						
					}

					/**
					 * @public
					 * 
					 * Reset form fields
					 *
					 * @param {Object.DOMElem}
					 *
					 * @return {null}
					 * 
					 **/
					$scope.reset = function(form) {

						if (form) {
							//form.$setPristine(); 
							//form.$setUntouched();
						}

						$scope.formInputs = {
							'firstName':	'',
							'emailAddress':	'',
							'phone':		'',
							'company':		'',
							'message':		''
						}

					};

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

					//console.warn('siyabagena!');
    
                }]
            };
    
        }; 
    
        domReady( function () {
    
            /*
             * APP MODULE
             */
            appDirectiveFormContact = appDirectiveFormContact || angular.module( 'appDirectiveFormContact', [ 'appUtils', 'appXHR', 'appFilters', 'ngMaterial', 'ngProgress', 'appInsectService', 'appProductService', 'appPackageService', 'appRetailerService' ] );
    
            appDirectiveFormContact
                .directive( Application.Directives );
    
    
        });
    
        exports.appDirectiveFormContact = appDirectiveFormContact;
    });
    