<?php
/**
* Displays Products Content
*
* @package WordPress
* @subpackage Twenty_Seventeen
* @since 1.0
* @version 1.0
*/
?>



    <div layout="column" layout-fill class="animate-page-switch-container" flex="100" data-ng-switch="renderPath[1]">

        <div layout="column" layout-fill class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-when="single" >
            <!-- -->
            <div layout="row" layout-md="column" >
                <div flex="grow" flex-md="100" class="md-padding">
                    <img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption" />
<!-- 
                    <div data-ui-carousel
                        globalFilter = "false"
                        showFilter = "true"
                        filterBy="product_type"
                        single = "true"
                        needsCta = "false"
                        maxHeight = "500px"
                        maxWidth = "500px"
                        gutter = "10px"
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
                <div flex="grow" flex-md="100" class="md-padding">
                    <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
                    <span class="hr-divider"></span>
                    <p flex="100" class="page-description">{{pageContent.post_content}}</p>
                    <ul class="product-insects">
                        <li class="icon-insect-cockroach active" title="Cockroaches"></li>
                        <li class="icon-insect-fly" title="Flies"></li>
                        <li class="icon-insect-mosquito active" title="Mosquitoes"></li>
                        <li class="icon-insect-ant" title="Ants"></li>
                        <li class="icon-insect-fishmoth" title="Fishmoths"></li>
                        <li class="icon-insect-flea" title="Fleas"></li>
                    </ul>
                    <md-button class="md-primary primary-cta">Get Product Coupon</md-button>
					<br /><br />

					<ang-accordion one-at-a-time="true" icon-position="right" close-icon-class="icon-chevron-right" open-icon-class="icon-chevron-down">
						<collapsible-item title="01 Benefits">
							<div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo magna vitae risus congue, eget rutrum libero luctus. Aenean sit amet lorem at velit mollis dapibus ac consectetur elit. Suspendisse laoreet massa iaculis, mattis nisl vel, tempus magna. Proin consequat odio lacinia, faucibus mi sit amet, tincidunt est. Nullam vitae tincidunt dolor. Maecenas id sem vitae sapien bibendum venenatis. Nulla quis nisi dignissim, viverra elit a, efficitur dui. Fusce dictum vestibulum enim sed bibendum. Nam vitae tortor orci. Sed convallis ultricies enim, ut consectetur magna ultricies et.</p>
							</div>
						</collapsible-item>

						<collapsible-item title="02 Direction for use">
							<div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo magna vitae risus congue, eget rutrum libero luctus. Aenean sit amet lorem at velit mollis dapibus ac consectetur elit. Suspendisse laoreet massa iaculis, mattis nisl vel, tempus magna. Proin consequat odio lacinia, faucibus mi sit amet, tincidunt est. Nullam vitae tincidunt dolor. Maecenas id sem vitae sapien bibendum venenatis. Nulla quis nisi dignissim, viverra elit a, efficitur dui. Fusce dictum vestibulum enim sed bibendum. Nam vitae tortor orci. Sed convallis ultricies enim, ut consectetur magna ultricies et.</p>
							</div>
						</collapsible-item>

						<collapsible-item title="03 Storage &amp; Disposal">
							<div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo magna vitae risus congue, eget rutrum libero luctus. Aenean sit amet lorem at velit mollis dapibus ac consectetur elit. Suspendisse laoreet massa iaculis, mattis nisl vel, tempus magna. Proin consequat odio lacinia, faucibus mi sit amet, tincidunt est. Nullam vitae tincidunt dolor. Maecenas id sem vitae sapien bibendum venenatis. Nulla quis nisi dignissim, viverra elit a, efficitur dui. Fusce dictum vestibulum enim sed bibendum. Nam vitae tortor orci. Sed convallis ultricies enim, ut consectetur magna ultricies et.</p>
							</div>
						</collapsible-item>

						<collapsible-item title="04 Precautions">
							<div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo magna vitae risus congue, eget rutrum libero luctus. Aenean sit amet lorem at velit mollis dapibus ac consectetur elit. Suspendisse laoreet massa iaculis, mattis nisl vel, tempus magna. Proin consequat odio lacinia, faucibus mi sit amet, tincidunt est. Nullam vitae tincidunt dolor. Maecenas id sem vitae sapien bibendum venenatis. Nulla quis nisi dignissim, viverra elit a, efficitur dui. Fusce dictum vestibulum enim sed bibendum. Nam vitae tortor orci. Sed convallis ultricies enim, ut consectetur magna ultricies et.</p>
							</div>
						</collapsible-item>

					</ang-accordion>
					<?php /** /?>
                    <div class="panel-group custom-accordion" id="accordionProductSingle" role="tablist" aria-multiselectable="true" data-one-at-a-time="true">

                        <!-- GENERAL CONFIGURATION -->
                        <div class="panel panel-default">

                            <div class="panel-heading drop-shadow-bottom" role="tab" id="accordionProduct">
                                <h4 class="panel-title uppercase tl">
                                    <a
                                        data-ui-collapser
                                        role="button"
                                        data-toggle="collapse"
                                        data-parent="#accordionProductSingle"
                                        data-target="#collapsePanelBenefits"
                                        aria-expanded="false">
                                            01 Benefits<span class="icon-chevron-down fr"></span>
                                    </a>
                                </h4>
                            </div>

                            <div id="collapsePanelBenefits" class="panel-collapse collapse" role="tabpanel">

                                <div class="panel-body">

									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo magna vitae risus congue, eget rutrum libero luctus. Aenean sit amet lorem at velit mollis dapibus ac consectetur elit. Suspendisse laoreet massa iaculis, mattis nisl vel, tempus magna. Proin consequat odio lacinia, faucibus mi sit amet, tincidunt est. Nullam vitae tincidunt dolor. Maecenas id sem vitae sapien bibendum venenatis. Nulla quis nisi dignissim, viverra elit a, efficitur dui. Fusce dictum vestibulum enim sed bibendum. Nam vitae tortor orci. Sed convallis ultricies enim, ut consectetur magna ultricies et.</p>

                                </div>

                            </div>

                        </div>

                        <!-- DIRECTION FOR USE -->
                        <div class="panel panel-default">

                            <div class="panel-heading drop-shadow-bottom" role="tab" id="accordionProduct">
                                <h4 class="panel-title uppercase tl">
                                    <a
                                        data-ui-collapser
                                        role="button"
                                        data-toggle="collapse"
                                        data-parent="#accordionProductSingle"
                                        data-target="#collapseDirectionForUse"
                                        aria-expanded="false">
                                            02 Direction for use<span class="icon-chevron-down fr"></span>
                                    </a>
                                </h4>
                            </div>

                            <div id="collapseDirectionForUse" class="panel-collapse collapse" role="tabpanel">

                                <div class="panel-body">

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo magna vitae risus congue, eget rutrum libero luctus. Aenean sit amet lorem at velit mollis dapibus ac consectetur elit. Suspendisse laoreet massa iaculis, mattis nisl vel, tempus magna. Proin consequat odio lacinia, faucibus mi sit amet, tincidunt est. Nullam vitae tincidunt dolor. Maecenas id sem vitae sapien bibendum venenatis. Nulla quis nisi dignissim, viverra elit a, efficitur dui. Fusce dictum vestibulum enim sed bibendum. Nam vitae tortor orci. Sed convallis ultricies enim, ut consectetur magna ultricies et.</p>

                                </div>

                            </div>

                        </div>

                        <!-- STORAGE & DISPOSAL -->
                        <div class="panel panel-default">

                            <div class="panel-heading drop-shadow-bottom" role="tab" id="accordionProduct">
                                <h4 class="panel-title uppercase tl">
                                    <a
                                        data-ui-collapser
                                        role="button"
                                        data-toggle="collapse"
                                        data-parent="#accordionProductSingle"
                                        data-target="#collapseStorageDisposal"
                                        aria-expanded="false">
                                            03 Storage &amp; Disposal<span class="icon-chevron-down fr"></span>
                                    </a>
                                </h4>
                            </div>

                            <div id="collapseStorageDisposal" class="panel-collapse collapse" role="tabpanel">

                                <div class="panel-body">

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo magna vitae risus congue, eget rutrum libero luctus. Aenean sit amet lorem at velit mollis dapibus ac consectetur elit. Suspendisse laoreet massa iaculis, mattis nisl vel, tempus magna. Proin consequat odio lacinia, faucibus mi sit amet, tincidunt est. Nullam vitae tincidunt dolor. Maecenas id sem vitae sapien bibendum venenatis. Nulla quis nisi dignissim, viverra elit a, efficitur dui. Fusce dictum vestibulum enim sed bibendum. Nam vitae tortor orci. Sed convallis ultricies enim, ut consectetur magna ultricies et.</p>

                                </div>

                            </div>

						</div>

						<!-- PRECAUTIONS -->
                        <div class="panel panel-default">

                            <div class="panel-heading drop-shadow-bottom" role="tab" id="accordionProduct">
                                <h4 class="panel-title uppercase tl">
                                    <a
                                        data-ui-collapser
                                        role="button"
                                        data-toggle="collapse"
                                        data-parent="#accordionProductSingle"
                                        data-target="#collapsePrecautions"
                                        aria-expanded="false">
                                            04 Precautions<span class="icon-chevron-down fr"></span>
                                    </a>
                                </h4>
                            </div>

                            <div id="collapsePrecautions" class="panel-collapse collapse" role="tabpanel">

                                <div class="panel-body">

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo magna vitae risus congue, eget rutrum libero luctus. Aenean sit amet lorem at velit mollis dapibus ac consectetur elit. Suspendisse laoreet massa iaculis, mattis nisl vel, tempus magna. Proin consequat odio lacinia, faucibus mi sit amet, tincidunt est. Nullam vitae tincidunt dolor. Maecenas id sem vitae sapien bibendum venenatis. Nulla quis nisi dignissim, viverra elit a, efficitur dui. Fusce dictum vestibulum enim sed bibendum. Nam vitae tortor orci. Sed convallis ultricies enim, ut consectetur magna ultricies et.</p>

                                </div>

                            </div>

                        </div>

					</div>
					<?php /**/?>
                    <h3 class="carousel-title">Similar Products</h3>
                    <br /><br />
                    <!--
                    <div data-ui-gallery
                        flex="100"
                        isWidget        = "true"
                        showTitle       = "false"
                        showSubheader   = "false"
                        showDescription = "false"
                        showButton      = "true"
                        contentType     = "product"
                        sortBy="ASC" orderBy="post_title"
                        gridItemsDesktopWide="1" gridItemsDesktop="1" gridItemsMobile="1"></div>
                    -->
                </div>
                <!--
                <div flex="grow">

                    <div data-ui-carousel
                                flex="100"
                                isWidget        = "true"
                                showTitle       = "true"
                                showSubheader   = "true"
                                showDescription = "true"
                                showButton      = "true"
                                contentType     = "retailer"
                                sortBy="ASC" orderBy="post_title"
                                maxAmount="4" gridItemsDesktop="4" gridItemsMobile="2"></div>

                </div>
                -->
            </div>
            <div layout="column" class="md-padding">
                <h3 class="carousel-title">Where to buy</h3>
                <div data-ui-carousel
                    globalFilter = "false"
                    showFilter = "false"
                    filterBy="insect_categories"
                    single = "false"
                    needsCta = "false"
                    maxHeight = "350px"
                    maxWidth = "200px"
                    gutter = "10px"
                    displayName ="false"
                    buttonBorders="false"
                    contentType = "retailer"></div>
            </div>
            <!-- -->

        </div>

        <div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-default>

            <!-- [HERO SECTION] -->
            <div layout="row" layout-md="column" layout-align="center center">
                <div flex="60" flex-md="100" class="md-padding">
                    <div class="bg-box">
                        <!--<img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption">-->
                        <img data-ng-click="showImage()" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="md-card-image" alt="" style="width:100%;" />
                    </div>
                </div>
                <div flex="40" flex-md="100" class="md-padding">
                    <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
                    <span class="hr-divider"></span>
                    <p flex="100" class="page-description">{{pageContent.post_content}}</p>
                </div>
            </div>
            <!-- [/HERO SECTION] -->

            <!-- [BODY SECTION] -->

            <div flex="grow">
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "true"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "ant"
                    productType     = "spray"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2">
                        <h3 flex="100" class="carousel-title">Ants</h3>
                        
                </div>
                
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "ant"
                    productType     = "powder"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2"></div>

                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "ant"
                    productType     = "electric"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2"></div>
                
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "cockroach"
                    productType     = "electric"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2">
						<h3 flex="100" class="carousel-title">Cockroaches</h3>
                </div>
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "cockroach"
                    productType     = "spray"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2"></div>
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "cockroach"
                    productType     = "powder"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2"></div>

				<div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "mosquitoes"
                    productType     = "electric"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2">
						<h3 flex="100" class="carousel-title">Mosquitoes</h3>
                </div>
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "mosquitoes"
                    productType     = "powder"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2"></div>
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "mosquitoes"
                    productType     = "spray"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2"></div>
				
				<div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "flea"
                    productType     = "spray"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2">
						<h3 flex="100" class="carousel-title">Fleas</h3>
                </div>
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "flea"
                    productType     = "powder"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2"></div>
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "flea"
                    productType     = "electric"
					sortBy="ASC" orderBy="post_title"
                    gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2"></div>

				<div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "fishmoths"
                    productType     = "spray"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2">
						<h3 flex="100" class="carousel-title">Fishmoths</h3>
                </div>
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "fishmoths"
                    productType     = "powder"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2"></div>
                <div data-ui-gallery
					flex="100"
					isWidget        = "false"
					showTitle       = "true"
					showFilter      = "false"
					globalFilter    = "true"
					showSubheader   = "true"
					showDescription = "true"
					showButton      = "true"
					contentType     = "product"
                    insectType     	= "fishmoths"
                    productType     = "electric"
					sortBy="ASC" orderBy="post_title"
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2"></div>
				
            </div>

            <div flex="grow">
				<h3 class="carousel-title">Where to buy</h3>
                <div data-ui-carousel
                    flex="100"
                    isSingle = "false"
                    needsCta = "false"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="false"
                    contentType="retailer"></div>

            </div>

            <!-- [/BODY SECTION] -->

            <!--<div data-ng-transclude flex="100" ></div>-->

        </div>

    </div>
