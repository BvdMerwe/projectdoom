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



    <div layout="column" layout-fill class="animate-page-switch-container" flex="100" data-ng-switch="renderPath[1]">

        <div layout="column" layout-fill class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-when="single" >
            <!-- -->
            <div layout="row" layout-md="column" >
                <div flex="grow" flex-md="100" class="md-padding">
                    <img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption" />

                    <div class="tag-group">
                        <md-button class="md-primary primary-tag">Outdoor</md-button>
                        <md-button class="md-primary primary-tag">Infestation</md-button>
                        <md-button class="md-primary primary-tag">Spray</md-button>
                        <md-button class="md-primary primary-tag">Multi-Insects</md-button>
                        <md-button class="md-primary primary-tag">Infestation</md-button>
                    </div>
                </div>
                <div flex="grow" flex-md="100" class="md-padding">
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
					
                    <h3 class="carousel-title">Similar Products</h3>
                    <br /><br />
                    <div data-ui-carousel
                        flex="100"
                        single          = "true"
                        needsCta        = "true"
                        maxHeight       = "250px"
                        maxWidth        = "250px"
                        gutter          = "10px"
                        displayName     = "true"
                        insectType      = ""
                        productType     = "spray"
                        contentType="product"></div>
                    
                </div>
                
            </div>
            <div layout="column" class="md-padding">
                <h3 class="carousel-title">Where to buy</h3>
                <div data-ui-carousel
                    flex="100"
                    single          = "false"
                    needsCta        = "false"
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

        <div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-default>

            <!-- [HERO SECTION] -->
            <div layout="row" layout-md="column" layout-align="center center">
                <div flex="60" flex-md="100" class="md-padding">
                    <div class="bg-box">
                        <!--<img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption">-->
                        <img data-ng-click="showImage()" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="products-hero-image" alt="" style="width:100%;" />
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
            
            <!--
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
            -->

            <div flex="grow">
				<h3 class="carousel-title">Ants</h3>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "ant"
                    productType     = "spray"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "ant"
                    productType     = "electric"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "ant"
                    productType     = "powder"
                    contentType="product"></div>

            </div>

            <div flex="grow">
				<h3 class="carousel-title">Cockroaches</h3>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "cockroach"
                    productType     = "spray"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "cockroach"
                    productType     = "electric"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "cockroach"
                    productType     = "powder"
                    contentType="product"></div>

            </div>

            <div flex="grow">
				<h3 class="carousel-title">Fishmoths</h3>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "fishmoth"
                    productType     = "spray"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "fishmoth"
                    productType     = "electric"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "fishmoth"
                    productType     = "powder"
                    contentType="product"></div>

            </div>

            <div flex="grow">
				<h3 class="carousel-title">Fleas</h3>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "flea"
                    productType     = "spray"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "flea"
                    productType     = "electric"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "flea"
                    productType     = "powder"
                    contentType="product"></div>

            </div>

            <div flex="grow">
				<h3 class="carousel-title">Flies</h3>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "fly"
                    productType     = "spray"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "fly"
                    productType     = "electric"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "fly"
                    productType     = "powder"
                    contentType="product"></div>

            </div>

            <div flex="grow">
				<h3 class="carousel-title">Mosquitoes</h3>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "mosquito"
                    productType     = "spray"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "mosquito"
                    productType     = "electric"
                    contentType="product"></div>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "true"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="true"
                    insectType     	= "mosquito"
                    productType     = "powder"
                    contentType="product"></div>

            </div>

            <div flex="grow">
				<h3 class="carousel-title">Where to buy</h3>
                <div data-ui-carousel
                    flex="100"
                    single = "false"
                    needsCta = "false"
                    maxHeight = "250px"
                    maxWidth = "250px"
                    gutter = "10px"
                    displayName ="false"
                    productType     = ""
                    contentType="retailer"></div>

            </div>

            <!-- [/BODY SECTION] -->

            <!--<div data-ng-transclude flex="100" ></div>-->

        </div>

    </div>
