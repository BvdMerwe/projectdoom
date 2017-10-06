<?php
/**
* Displays Products Content
*
* @package WordPress
* @subpackage doom
* @since 1.0
* @version 1.0
*/
?>



    <div layout="column" layout-fill class="" flex="100" data-ng-switch="renderPath[1]">

        <div layout="column" layout-fill class="md-accent" layout-xs="column" flex="100" data-ng-switch-when="single" >
            <!-- -->
            <div layout="row" layout-md="column" layout-align="start start" layout-align-md="center center">
                <div flex="50" flex-md="100"  class="" style=""> 
                    <div class="bg-box product-image-holder">
                        <img data-ng-click="showImage()" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="products-hero-image" alt="" style="width:100%;" />
                        <div class="product-controller-buttons">
                            <button class="icon-chevron-left" data-ui-hero-product data-nav-direction="back" data-ng-click="prevProduct()"></button>
                            <button class="icon-chevron-right" data-ui-hero-product data-nav-direction="forward" data-ng-click="nextProduct()"></button>
                        </div>
                    </div>
                    <div class="product-filter-categories">
                        <!--
                        <md-button
                            ng-repeat="productType in pageContent.product_types"
                            class="md-button primary-tag active"
                            data-ng-click="filterProducts('coil')">
                            {{productType.name}}
                        </md-button>
                        -->
                        <md-button
                            class="md-button primary-tag"
                            data-ng-click="filterProducts('spray')"
                            data-ng-class="{active: pageContent.product_type == 'Spray'}">
                            Spray
                        </md-button>
                        <md-button
                            class="md-button primary-tag "
                            data-ng-click="filterProducts('coil')"
                            data-ng-class="{active: pageContent.product_type == 'Coil'}">
                            Coil
                        </md-button>
                        <md-button
                            class="md-button primary-tag "
                            data-ng-click="filterProducts('electric')"
                            data-ng-class="{active: pageContent.product_type == 'Electric'}">
                            Electric
                        </md-button>
                        
                    </div>
                    
                    <!--<img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption" />-->
                    <!-- 
                    <div data-ui-carousel
                        globalFilter = "false"
                        showFilter = "true"
                        filterBy="product_type"
                        single = "true"
                        cta = "false"
                        maxHeight = "500px"
                        maxWidth = "500px"
                        gutter = "175px"
                        displayName ="false"
                        contentType = "product"></div> -->

                    <div class="tag-group">
                        <md-button class="md-primary primary-tag" ng-repeat="tag in pageContent.product_categories">{{tag.name}}</md-button>
                        <md-button class="md-primary primary-tag" ng-repeat="tag in pageContent.product_types">{{tag.name}}</md-button>
                        <!-- <md-button class="md-primary primary-tag">Infestation</md-button>
                        <md-button class="md-primary primary-tag">Spray</md-button>
                        <md-button class="md-primary primary-tag">Multi-Insects</md-button>
                        <md-button class="md-primary primary-tag">Infestation</md-button> -->
                    </div>
                    
                </div>
                <div flex="40" flex-offset="10" flex-offset-md="0" flex-md="100" layout-align-md="center start" class="" style="">
                    <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
                    <span class="hr-divider"></span>
                    <p flex="100" class="page-description">{{pageContent.post_content}}</p>
                    <ul class="product-insects">
                        <li data-ng-class="{active: pageContent.post_name == 'ant'}" class="icon-insect-ant" title="Ants">
                            <i class="icon-ant"></i>
                        </li>
                        <li data-ng-class="{active: pageContent.post_name == 'cockroach'}" class="icon-insect-cockroach" title="Cockroaches">
                            <i class="icon-cockroach"></i>
                        </li>
                        <li data-ng-class="{active: pageContent.post_name == 'fishmoth'}" class="icon-insect-fishmoth" title="Fishmoths">
                            <i class="icon-fishmoth"></i>
                        </li>
                        <li data-ng-class="{active: pageContent.post_name == 'flea'}" class="icon-insect-flea" title="Fleas">
                            <i class="icon-flea"></i>
                        </li>
                        <li data-ng-class="{active: pageContent.post_name == 'fly'}" class="icon-insect-fly" title="Flies">
                            <i class="icon-fly"></i>
                        </li>
                        <li data-ng-class="{active: pageContent.post_name == 'mosquito'}" class="icon-insect-mosquito" title="Mosquitoes">
                            <i class="icon-mosquito"></i>
                        </li>
                        <!--
                        <li class="icon-insect-cockroach active" title="Cockroaches"></li>
                        <li class="icon-insect-fly" title="Flies"></li>
                        <li class="icon-insect-mosquito active" title="Mosquitoes"></li>
                        <li class="icon-insect-ant" title="Ants"></li>
                        <li class="icon-insect-fishmoth" title="Fishmoths"></li>
                        <li class="icon-insect-flea" title="Fleas">
                            <i class="icon-flea"></i>
                        </li>
                        -->
                    </ul>
                    <!-- <md-button class="md-primary primary-cta">Get Product Coupon</md-button>
					<br /><br /> -->

					<ang-accordion one-at-a-time="true" icon-position="right" close-icon-class="icon-chevron-right" open-icon-class="icon-chevron-down">
						<collapsible-item title="01 Ideal For">
							<div>
								<p ng-bind-html="pageContent.doom_product_ideal_for | trustAsHtml"></p>
							</div>
                        </collapsible-item>
                        
						<collapsible-item title="02 Benefits">
							<div>
								<p ng-bind-html="pageContent.doom_product_benefits | trustAsHtml"></p>
							</div>
						</collapsible-item>

						<collapsible-item title="03 Direction for use">
							<div>
                                <p ng-bind-html="pageContent.doom_product_directions | trustAsHtml"></p>
                            </div>
						</collapsible-item>

						<collapsible-item title="04 Storage &amp; Disposal">
							<div>
                                <p ng-bind-html="pageContent.doom_product_storage_disposal | trustAsHtml"></p>
                            </div>
						</collapsible-item>

						<collapsible-item title="05 Precautions">
							<div>
                                <p ng-bind-html="pageContent.doom_product_precautions | trustAsHtml"></p>
                            </div>
						</collapsible-item>

					</ang-accordion>
					<br/>
                    <h3 class="page-title">Similar Products</h3>
                    <br />
                    <div layout="row">
                        <div data-ui-carousel
                            single          = "true"
                            cta             = "true"
                            maxHeight       = "300px"
                            maxWidth        = "250px"
                            gutter          = "10px"
                            displayName     = "true"
                            insectType      = ""
                            productType     = ""
                            showFilter      = "true"
                            filterBy        = "product_types"
                            contentType="product"></div>
                    </div>
                </div>
                
            </div>
            
            <div layout="column" class="">
                <h3 class="page-title" style="margin-bottom:0;">Where to buy</h3>
                <div data-ui-carousel
                    flex="100"
                    single          = "false"
                    buttonBorders   = "false"
                    cta             = "false"
                    maxHeight       = "250px"
                    maxWidth        = "250px"
                    gutter          = "10px"
                    displayName     = "false"
                    insectType      = ""
                    productType     = ""
                    contentType="retailer"></div>
                <!--
                <div data-ui-carousel
                    flex="100"
                    isWidget        = "true"
                    showTitle       = "true"
                    showSubheader   = "true"
                    showDescription = "true"
                    showButton      = "true"
                    contentType     = "retailer"
                    sortBy="ASC" orderBy="post_title"
                    maxAmount="4" gridItemsDesktop="4" gridItemsMobile="2"></div>-->
            </div>
            <!-- -->

        </div>

        <div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="filter" >

            <!-- [HERO SECTION]  -->
            <div layout="row" layout-md="column" layout-align="center center">
                <div flex="60" flex-md="100" class="">
                    <div class="bg-box">
                        <!--<img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption">-->
                        <img data-ng-click="showImage()" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="products-hero-image" alt="" style="width:100%;" />
                    </div>
                </div>
                <div flex="40" flex-md="100" class="" layout-align-md="center center">
                    <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
                    <span class="hr-divider"></span>
                    <p flex="100" class="page-description">{{pageContent.post_content}}</p>
                </div>
            </div>

            <div class="product-filter-categories">
                <!--
                <md-button
                    ng-repeat="productType in pageContent.product_types"
                    class="md-button primary-tag active"
                    data-ng-click="filterProducts('coil')">
                    {{productType.name}}
                </md-button>
                -->
                <md-button
                    class="md-button primary-tag"
                    data-ng-click="filterProducts('flying')"
                    data-ng-class="{active: productsPageFilter == 'flying'}">
                    Flying Insects
                </md-button>
                <md-button
                    class="md-button primary-tag "
                    data-ng-click="filterProducts('crawling')"
                    data-ng-class="{active: productsPageFilter == 'crawling'}">
                    Crawling Insects
                </md-button>
                <md-button
                    class="md-button primary-tag  "
                    data-ng-click="filterProducts('all')"
                    data-ng-class="{active: productsPageFilter == ''}">
                    All
                </md-button>
                        
            </div>
            <!-- [/HERO SECTION] -->

            <!-- [BODY SECTION] -->

            <div layout="column" layout-fill class="" flex="100" data-ng-switch="renderPath[2]">

                <div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="taxonomy">
                    
                    <?php /**/?>
                    <div flex="grow" data-ng-if="productsPageFilter == 'flying'">
                        <h3 class="page-title">Mosquitos</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "mosquito"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "mosquito"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "mosquito"
                            productType     = "powder"
                            contentType="product"></div>

                        <h3 class="page-title">Flies</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fly"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fly"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fly"
                            productType     = "powder"
                            contentType="product"></div>

                        

                    </div>

                    <div flex="grow" data-ng-if="productsPageFilter == 'crawling'">
                        <h3 class="page-title">Ants</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "ant"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "ant"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "ant"
                            productType     = "powder"
                            contentType="product"></div>

                        <h3 class="page-title">Cockroaches</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "cockroach"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "cockroach"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "cockroach"
                            productType     = "powder"
                            contentType="product"></div>
                        
                        <h3 class="page-title">Fishmoths</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fishmoth"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fishmoth"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fishmoth"
                            productType     = "powder"
                            contentType="product"></div>

                        <h3 class="page-title">Fleas</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "flea"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "flea"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "flea"
                            productType     = "powder"
                            contentType="product"></div>

                    </div>

                  
                    <?php/**/?>

                </div>

                <div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-default>
                    <div class="product-filter-categories">
                        <!--
                        <md-button
                            ng-repeat="productType in pageContent.product_types"
                            class="md-button primary-tag active"
                            data-ng-click="filterProducts('coil')">
                            {{productType.name}}
                        </md-button>
                        -->
                        <md-button
                            class="md-button primary-tag"
                            data-ng-click="filterProducts('spray')"
                            data-ng-class="{active: pageContent.product_type == 'Spray'}">
                            Spray
                        </md-button>
                        <md-button
                            class="md-button primary-tag "
                            data-ng-click="filterProducts('coil')"
                            data-ng-class="{active: pageContent.product_type == 'Coil'}">
                            Coil
                        </md-button>
                        <md-button
                            class="md-button primary-tag "
                            data-ng-click="filterProducts('electric')"
                            data-ng-class="{active: pageContent.product_type == 'Electric'}">
                            Electric
                        </md-button>
                        
                    </div>
                    <div flex="grow">
                        <h3 class="page-title">Ants</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "ant"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "ant"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "ant"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                    <div flex="grow">
                        <h3 class="page-title">Cockroaches</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "cockroach"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "cockroach"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "cockroach"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                    <div flex="grow">
                        <h3 class="page-title">Fishmoths</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fishmoth"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fishmoth"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fishmoth"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                    <div flex="grow">
                        <h3 class="page-title">Fleas</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "flea"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "flea"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "flea"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                    <div flex="grow">
                        <h3 class="page-title">Flies</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fly"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fly"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fly"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                    <div flex="grow">
                        <h3 class="page-title">Mosquitoes</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "mosquito"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "mosquito"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "mosquito"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                </div>

            </div>

            <!-- [/BODY SECTION] -->

            <!--<div data-ng-transclude flex="100" ></div>-->

        </div>
        
        <div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-default>

            <!-- [HERO SECTION]  -->
            <div layout="row" layout-md="column" layout-align="center center">
                <div flex="60" flex-md="100" class="md-padding">
                    <div class="bg-box">
                        <img data-ng-click="showImage()" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="products-hero-image" alt="" style="width:100%;" />
                    </div>
                </div>
                <div flex="40" flex-md="100" class="md-padding" layout-align-md="center center">
                    <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
                    <span class="hr-divider"></span>
                    <p flex="100" class="page-description">{{pageContent.post_content}}</p>
                </div>
            </div>
            <!-- [/HERO SECTION] -->
            <div class="product-filter-categories">
                        <!--
                        <md-button
                            ng-repeat="productType in pageContent.product_types"
                            class="md-button primary-tag active"
                            data-ng-click="filterProducts('coil')">
                            {{productType.name}}
                        </md-button>
                        -->
                        <md-button
                            class="md-button primary-tag"
                            data-ng-click="filterProducts('crawling')"
                            data-ng-class="{active: pageContent.product_type == 'crawling'}">
                            Flying Insects
                        </md-button>
                        <md-button
                            class="md-button primary-tag "
                            data-ng-click="filterProducts('flying')"
                            data-ng-class="{active: pageContent.product_type == 'flying'}">
                            Crawling Insects
                        </md-button>
                        <md-button
                            class="md-button primary-tag active "
                            data-ng-click="filterProducts('all')"
                            data-ng-class="{active: pageContent.product_type == 'all'}">
                            All
                        </md-button>
                        
            </div>

           
                    <div flex="grow">
                        <h3 class="page-title">Ants</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "ant"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "ant"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "ant"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                    <div flex="grow">
                        <h3 class="page-title">Cockroaches</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "cockroach"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "cockroach"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "cockroach"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                    <div flex="grow">
                        <h3 class="page-title">Fishmoths</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fishmoth"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fishmoth"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fishmoth"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                    <div flex="grow">
                        <h3 class="page-title">Fleas</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "flea"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "flea"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "flea"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                    <div flex="grow">
                        <h3 class="page-title">Flies</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fly"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fly"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "fly"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

                    <div flex="grow">
                        <h3 class="page-title">Mosquitoes</h3>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "mosquito"
                            productType     = "spray"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "mosquito"
                            productType     = "electric"
                            contentType="product"></div>
                        <div data-ui-carousel
                            flex="100"
                            single = "false"
                            cta = "true"
                            maxHeight = "550px"
                            maxWidth = "200px"
                            gutter = "175px"
                            displayName ="true"
                            insectType     	= "mosquito"
                            productType     = "coil"
                            contentType="product"></div>

                    </div>

        </div>
        
        <div flex="grow">
            <h3 class="page-title">Where to buy</h3>
            <div data-ui-carousel
                buttonBorders="false"
                flex="100"
                single = "false"
                cta = "false"
                maxHeight = "250px"
                maxWidth = "250px"
                gutter = "10px"
                displayName ="false"
                productType     = ""
                contentType="retailer"
                layout="column" layout-align="center center"></div>

        </div>

    </div>
