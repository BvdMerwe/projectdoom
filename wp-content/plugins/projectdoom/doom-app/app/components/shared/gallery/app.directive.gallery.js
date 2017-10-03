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
* @return Angular.module.appDirectiveGallery
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
        
        // Load dependent modules
        var appDirectiveGallery,
            appConfig		= JSON.parse(require("text!../../app/app.config.json")),
            domReady 		= require("domReady"),
            isMobile 		= require("isMobile"),
            angular 		= require("angular");
    
        //
        var Application = Application || {};
        Application.Directives = {};
    
        Application.Directives.uiGallery = function () {
    
            return {
                restrict: 		'AE',
                scope:          {},
                transclude: 	true, // pass entire template?d
                templateUrl: 	appConfig.general.path + 'app/components/shared/gallery/gallery.php',
                link:           function(scope, element, attr) {
                    
                    //element
                    var elem = element[0];

                    //console.log( 'Grid attributes:', attr, elem );
                    scope.sortBy            = attr.sortby;
                    scope.orderBy           = attr.orderby;
                    scope.contentType       = attr.contenttype;
                    scope.insectType        = attr.insecttype;
                    scope.productType        = attr.producttype;
                    scope.isWidget          = attr.iswidget;
                    scope.showFilter         = attr.showfilter;
                    //scope.gridItems         = parseInt(attr.griditems);

                    //if( scope.isWidget == 'false' ) {

                        scope.gridItemsMobile   = parseInt(attr.griditemsmobile);
                        scope.gridItemsDesktop  = parseInt(attr.griditemsdesktop);
                        scope.gridItemsDesktopWide  =   parseInt(attr.griditemsdesktopwide);
                    /** /
                    } else {
                        scope.gridItemsMobile   = 2;
                        scope.gridItemsDesktop  = 2;
                        scope.gridItemsDesktopWide  = 2;
                    }
                    /**/

                    

                    scope.layout();

                    var cleanUp = function () {
                        
                        //removEvent( element[0], 'click' );
                        
                    };

                    domReady( function () {

                        //var filterToolBarBtns = elem.querySelectorAll('.toolbar-filter button');
                        
                        //console.log('filterToolBarBtns:', filterToolBarBtns);

                    });

                    /** /
                    angular.forEach( filterToolBarBtns,function(key, val) {

                        addEvent( val, 'click', function(e) {
                            
                            e.preventDefault();
                            
                            console.log('filter clicked:');
                            
                            return false;
                            
                        });
                        
                    });/**/

                        
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

                },
                controller:  	[ '$scope', '$http', '$q', '$route', '$location', '$timeout', '$log', '$filter', 'transformRequestAsFormPost', 'Utils', 'ngProgress', 'insectsManager', 'productsManager', 'retailersManager', 'packagesManager', '$mdDialog', function ( $scope, $http, $q, $route, $location, $timeout, $log, $filter, transformRequestAsFormPost, Utils, ngProgress, insectsManager, productsManager, retailersManager, packagesManager, $mdDialog ) {
    
                    
                    //Gallery Parameters
                    $scope.sortBy;
                    $scope.orderBy;
                    $scope.contentType;
                    $scope.insectType;
                    $scope.productType;
                    $scope.gridItems = [];
                    $scope.isWidget;
                    $scope.showFilter;

                    $scope.gridItemsMobile;
                    $scope.gridItemsDesktop;
                    $scope.gridItemsDesktopWide;

                    $scope.filterCategories = [];

                    $scope.customFullscreen = false;

                    
                    var productTypes = [];

                    var datad =[];
                    var products =[];
                    
                    /** /
                    $scope.showImage = function( ev, actObj ) {
                        // Appending dialog to document.body to cover sidenav in docs app
                        // Modal dialogs should fully cover application
                        // to prevent interaction outside of dialog
                        $mdDialog.show(
                          $mdDialog.alert()
                            //.parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('This is an alert title')
                            .textContent('You can specify some description text in here.')
                            .ariaLabel('Image')
                            .ok('Close')
                            .targetEvent(ev)
                        );
                    };/**/

                    $scope.showImage = _showDialog;

                    $scope.closeImgDialog = function() {
                        $mdDialog.hide();
                    };

                    $scope.goTo = function(path) {
                        
                        switch( $scope.contentType.toLowerCase() ) {
                            
                            case 'insect':

                                $location.path( '/insects/' + path );

                                break;
                            
                            case 'product':

                                $location.path( '/products/' + path );

                                break;

                            default:
                                
                                throw 'Invalid Active Content Type.';

                                break;
                        }
                    };

                    $scope.filter = function( $ev, key ) {
                        
                        //console.log( 'Filtering...', key, $ev );

                        _filterBtnClasses( key );

                        var newItems = [];

                        if( key == "all" ) {

                            _initialiseData($scope.contentType);

                        } else {

                            switch( $scope.contentType ) {

                                case 'insect':

                                    for (var index = 0; index < $scope.gridItems.length; index++) {
                                        
                                        //var element = $scope.gridItems[index];
                                        
                                        for (var index2 = 0; index2 < $scope.gridItems[index].insect_categories.length; index2++) {
                                            //var element = $scope.gridItems[index].insect_categories[index2];

                                            if( $scope.gridItems[index].insect_categories[index2].term_id == key ) {
                                                newItems.push($scope.gridItems[index]);
                                            }
                                            
                                        }
                                        
                                    }

                                    break;

                                case 'product':

                                    for (var index = 0; index < $scope.gridItems.length; index++) {
                                        
                                        //var element = $scope.gridItems[index];
                                        
                                        for (var index2 = 0; index2 < $scope.gridItems[index].product_categories.length; index2++) {
                                            
                                            //var element = $scope.gridItems[index].product_categories[index2];

                                            if( $scope.gridItems[index].product_categories[index2].term_id == key ) {
                                                newItems.push($scope.gridItems[index]);
                                            }
                                            
                                        }
                                        
                                        
                                    }

                                    break;

                                default:

                                    throw 'Invalid Content Type Active';

                                    break;
                            }

                        }

                        $scope.gridItems = newItems;
            
                    }

                    $scope.layout = function() {

                        //console.log('layout data', $scope.contentType);

                        _initialiseData($scope.contentType);

                    }

                    function _initiateLayout(results) {

                        //console.log('layout data', results);

                        if( angular.isDefined($route.current.locals.app_data) && angular.isDefined($scope.productType) ) {

                            loop1:
                            for (var index = 0; index < results.length; index++) {

                                var taxi = $route.current.locals.app_data.taxonomy.product_types;
                            
                                //angular.forEach( $route.current.locals.app_data.taxonomy.product_types, function(val, key) {
                                loop2:
                                for (var indie = 0; indie < taxi.length; indie++) {
                                   
                                    if( angular.isDefined(taxi[indie].product) ) {

                                        // go through the product_type products
                                        loop3:
                                        for (var indey = 0; indey < taxi[indie].product.length; indey++) {
                                            //break;
                                            // if product is 
                                            if( taxi[indie].product[indey].ID == results[index].ID ) {

                                        
                                                if( taxi[indie].name.toLowerCase() == $scope.productType.toLowerCase() ){
                                                    results[index].product_type = taxi[indie].name;
                                                    $scope.gridItems.push( results[index] );
                                                }

                                                //console.log('Got Em!', taxi[indie].name, $scope.productType);

                                                break loop2;

                                            }
                                        }

                                    }
                                }
                                //});
                
                            }

                            //$scope.gridItems = results;

                            console.log('layout data', $scope.gridItems);

                            //console.log( 'layout data', $filter('groupBy')( $scope.gridItems, 'product_types' ) );
                        }

                        /** * /
                        // group by product types;
                        if( angular.isDefined($route.current.locals.app_data) ) {

                            //go through each product type
                            angular.forEach( $route.current.locals.app_data.taxonomy.product_types, function(val, key) {

                                if( angular.isDefined(val.product) ) {

                                    // go through the product_type products
                                    for (var index = 0; index < val.product.length; index++) {
                                        break;
                                        // if product is 
                                       //if( val.product[index].ID == ) {

                                       //}
                                    }

                                }

                            });

                        }
                        /** */
                        //

                        //$scope.gridItems = results;

                    }

                    function _initialiseData( type ) {

                        var gellaryProducts = [];

                        //console.info('initialising data', type );

                        switch( type.toLowerCase() ) {

                            case 'insect':

                                insectsManager.getInsects({
                                        'method': 'GET',
                                        'type': type
                                    }).then( function(results){

                                        console.log('Insect Grid Data:',results);

                                        _getUniqueCategories( results );

                                        _initiateLayout(results);

                                    }, function(error) {

                                        throw error;

                                    }
                                );

                                break;

                            case 'product':
                                
                                
                                if( angular.isDefined($route.current.locals.app_data) ) {

                                    var taxes = $route.current.locals.app_data.taxonomy;

                                    //console.log('GARR[]:', $scope.insectType, $route.current.locals.app_data);

                                    for (var index = 0; index < taxes.product_categories.length; index++) {
                                        var element = taxes.product_categories[index];
                                        
                                    }

                                    // go through all insect categories (Flying / Crawling)
                                    //loop1:
                                    //for (var index = 0; index < taxes.length; index++) {
                                    
                                    angular.forEach( taxes.insect_categories, function(val, key) {
                                        
                                        
                                        //var insectArray = val.insect;

                                        //console.log('trying['+key+']:', val );

                                        switch( val.name.toLowerCase() ){

                                            case 'flying':
                                            case 'crawling':

                                                //console.log('trying:', taxes[index].toLowerCase(), $scope.insectType );

                                                loop2:
                                                for (var indey = 0; indey < val.insect.length; indey++) {
                                                    var element = val.insect[indey];

                                                    if( val.insect[indey].post_name == $scope.insectType ) {

                                                        //gallaryProducts.push( array[index.product] );

                                                        //console.log('Got Em!');

                                                        _initiateLayout(val.product);
                                                        
                                                        break loop2;

                                                    }

                                                }

                                                break;
                                            
                                            default:

                                                //continue;

                                                break;
                                        }
                                        
                                    
                                    });
                                    //}
                                    // if insect (gallery.attr) is within that category; get the products
                                    // group products by prodcuct type (after association)
                                } else {
                                    throw 'WTF:';
                                }

                                /*** /
                                $q.all([
                                        productsManager.getProducts({
                                            'type': 'product',
                                            'method': 'GET'
                                        }),
                                        insectsManager.getInsects({
                                            'type': 'insect',
                                            'method': 'GET'
                                        })
                                ])
                                .then( function(results){

                                        console.log('Product Grid Data:',results, $scope.insectType);

                                        // GROUP PRODUCTS BY FLYING & CRAWLING
                                        _getUniqueCategories( results[0] );
                                        
                                        //get insect categories of insectType
                                        for (var index = 0; index < results[1].length; index++) {
                                            if( results[1][index].post_name == $scope.insectType ) {
                                                datad = results[1][index].insect_categories;
                                                break;
                                           }
                                            
                                        }

                                        // Go through Products
                                        loop1:
                                        for (var index = 0; index < results[0].length; index++) {
                                            // go through Product Categories
                                            loop2:
                                            for (var y = 0; y < results[0][index].insect_categories.length; y++) {
                                                
                                                var element = results[0][index].insect_categories[y];
                                                loop3:
                                                //compare product categories with insect categories
                                                for (var x = 0; x < datad.length; x++) {
                                                    var element2 = datad[x];
                                                    if( element.slug == element2.slug )  {
                                                        products.push(results[0][index]);
                                                        break loop2;
                                                    }

                                                }

                                            }

                                        }

                                        //products = $filter('groupBy')( products, 'product_types' ); //$filter('pick')( adsManager._collection_ads, 'ID == ' + adID + '' )[0];

                                        //console.log('datad', datad, $filter('groupBy')( products, 'product_types' ));

                                        //console.log('datad', datad, products );
                
                                        //_initiateLayout(results[0]);
                                        _initiateLayout(products);

                                    }, function(e){

                                        //Utils.toggleClass( document.getElementById('main-dashboard'), 'splash' );

                                        console.error('No bootUp(Gallery): ', e); 

                                        return e;

                                    }
                                );
                                /***/

                                /*** /
                                productsManager.getProducts({
                                        'method': 'GET',
                                        'type': type
                                    }).then( function(results){

                                        console.log('Product Grid Data:',results);

                                        // GROUP PRODUCTS BY FLYING & CRAWLING

                                        // GROUP PRODUCTS WITHIN EACH GROUP BY INSECT KILLING (insect categories match)

                                        _getUniqueCategories( results );

                                        _initiateLayout(results);

                                    }, function(error) {

                                    }
                                );/***/

                                break;

                            default:

                                throw 'Invalid Content Type';

                                break;

                        }

                    }

                    function _getUniqueCategories( results ) {

                        $scope.filterCategories = [];

                        var cats = [];
                        var insects = [];
                        var insectCats = [];

                        switch( $scope.contentType.toLowerCase() ) {

                            case 'product':

                                for (var index = 0; index < results.length; index++) {

                                  cats.push(results[index].product_categories);
                                  insectCats.push(results[index].insect_categories);
                                
                                }

                                break;

                            case 'insect':

                                for (var index = 0; index < results.length; index++) {
                                
                                    cats.push(results[index].insect_categories);
                                                                
                                }

                                //cats = results.insect_categories;

                                break;

                            default:

                                throw 'Invalid Content Type for Gallery';
                                
                                break;

                        }

                        /** /
                        for (var index = 0; index < cats.length; index++) {
                            cats =  $scope.filter('filterBy', '')(cats);
                            
                        }/**/

                        $scope.filterCategories =  $filter('flatten')(  cats );
                        $scope.insectFilterCategories =  $filter('flatten')(  insectCats );
                        $scope.filterCategories =  $filter('unique')( $scope.filterCategories, 'term_id' );
                        $scope.insectFilterCategories =  $filter('unique')( $scope.insectFilterCategories, 'term_id' );
                    
                        //console.log( 'categories:', $scope.filterCategories, $scope.insectFilterCategories );

                    }

                    function _showDialog($event) {

                        $mdDialog.show({
                            parent: angular.element(document.body),
                            targetEvent: $event,
                            clickOutsideToClose: true,
                            escapeToClose: true,
                            //fullscreen: true,
                            //scope: $scope,// use parent scope in template
                            template:
                                '<md-dialog aria-label="List dialog">' +
                                '  <md-dialog-content>'+
                                '    <img data-ng-click="closeImgDialog()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption">'+
                                '  </md-dialog-content>' +
                                '  <md-dialog-actions>' +
                                '    <md-button data-ng-click="closeImgDialog()" class="md-primary">' +
                                '      Close' +
                                '    </md-button>' +
                                '  </md-dialog-actions>' +
                                '</md-dialog>',
                            /** /
                            locals: {
                                items: $scope.items
                            }/**/
                        });
                    
                    }

                    function _filterBtnClasses( key ) {

                        var filterToolBarBtns = document.querySelectorAll('.toolbar-filter .md-button');

                        for (var index = 0; index < filterToolBarBtns.length; index++) {
                           // var element = filterToolBarBtns[index];
                            Utils.removeClass( filterToolBarBtns[index], 'active-filter');
                            
                        }

                        var activeFilter = document.querySelector('[data-filter-id="' + key + '"]');

                        console.log('activeFilter:', activeFilter);

                        Utils.addClass( activeFilter, 'active-filter');

                    }

                    //console.log('waddup from gallery'); 
    
                }]
            };
    
        };
    
        domReady( function () {
    
            /*
             * APP MODULE
             */
            appDirectiveGallery = appDirectiveGallery || angular.module( 'appDirectiveGallery', [ 'appUtils', 'appXHR', 'appFilters', 'ngMaterial', 'ngProgress', 'appInsectService', 'appProductService', 'appPackageService', 'appRetailerService' ] );
    
            appDirectiveGallery
                .directive( Application.Directives );
    
    
        });
    
        exports.appDirectiveGallery = appDirectiveGallery;
    });
    