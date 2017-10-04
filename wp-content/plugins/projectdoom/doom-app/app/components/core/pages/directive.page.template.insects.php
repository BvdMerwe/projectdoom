<div layout="column" layout-fill class="animate-page-switch-container" flex="100" data-ng-switch="renderPath[1]">
        
        <div layout="column" layout-fill class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-default>
            <!-- <img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption" /> -->
            <img data-ng-click="showImage()" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="md-card-image super-bug-image" alt="image caption" />
            <div layout="row" layout-md="column" layout-align="end center">

                <div flex="40" flex-md="100" class="md-padding">
                    <!--
                    <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
                    <span class="hr-divider"></span>
                    <p flex="100" class="page-description">{{pageContent.post_content}}</p>
                    -->
                    <div data-ng-switch="pageContent.post_name">
                        <div data-ng-switch-when="flea">
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}s</strong> suck</p>
                            <h1 flex="100" class="page-title" style="color:#000;">{{pageContent.doom_insect_egg}} times a day<sup>*</sup></h1>
                            <p flex="100" class="page-description">their bodyweight in blood a day. Their fave drinking spot is covered in fur and answers to the name, Scruffles.</p>
                        </div>
                        <div data-ng-switch-when="cockroach">
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}es</strong> can go 4 weeks without food</p>
                            <h1 flex="100" class="page-title" style="color:#000;">{{pageContent.doom_insect_egg}}<br />one week<sup>*</sup></h1>
                            <p flex="100" class="page-description">without a head. That means a headless hedonistic roach could be making its way up your pj’s while you sleep tonight.</p>
                        </div>
                        <div data-ng-switch-when="ant">
                            <p flex="100" class="page-description">The <strong>{{pageContent.post_title}}s</strong> hijacking the food in your skaftin are vomiting</p>
                            <h1 flex="100" class="page-title" style="color:#000;">{{pageContent.doom_insect_egg}}<br />every second*</h1>
                            <p flex="100" class="page-description">on your sandwich as they discuss the heist..</p>
                        </div>
                        <div data-ng-switch-when="fly"> 
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}s</strong> can go 4 weeks without food</p>
                            <h1 flex="100" class="page-title" style="color:#000;">{{pageContent.doom_insect_egg}}<br />seconds<sup>*</sup></h1>
                            <p flex="100" class="page-description">while feeding. So if the fly on your Sunday seven colours was ‘only there’ for 40 seconds...</p>
                        </div>
                        <div data-ng-switch-when="mosquito">
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}</strong> lay</p>
                            <h1 flex="100" class="page-title" style="color:#000;">{{pageContent.doom_insect_egg}}<br />eggs<sup>*</sup></h1>
                            <p flex="100" class="page-description">at a time, after biting. Only females bite, and they have a fragrant fetish for smelly feet. .</p>
                        </div> 
                        <div data-ng-switch-when="fishmoth">
                            <p flex="100" class="page-description">The <strong>{{pageContent.post_title}}</strong> eating holes<br />through the private bits of<br />your underwear are laying<br /></p>
                            <h1 flex="100" class="page-title" style="color:#000;">{{pageContent.doom_insect_egg}}<br />eggs a day<sup>*</sup></h1>
                            <p flex="100" class="page-description">in your home.</p>
                        </div>
                        
                    </div>
                    
                    <br /><br />
                    <md-button ng-click="scrollTo('#makethemstop')" class="md-primary primary-cta" style="padding:10px 45px;font-size:30px;margin:0;">Make Them Stop</md-button>
                    <br /><br />
                    <p flex="100" class="page-description">Get the right {{pageContent.post_title}} Killer for you.</p>
                    <ul class="insect-insects">
                        <li data-ng-click="goto('/insects/cockroach')" data-ng-class="{active: pageContent.post_name == 'cockroach'}" class="icon-insect-cockroach" title="Cockroaches">
                            <i class="icon-cockroach"></i>
                        </li>
                        <li data-ng-click="goto('/insects/fly')" data-ng-class="{active: pageContent.post_name == 'fly'}" class="icon-insect-fly" title="Flies">
                            <i class="icon-fly"></i>
                        </li>
                        <li data-ng-click="goto('/insects/mosquito')" data-ng-class="{active: pageContent.post_name == 'mosquito'}" class="icon-insect-mosquito" title="Mosquitoes">
                            <i class="icon-mosquito"></i>
                        </li>
                        <li data-ng-click="goto('/insects/ant')" data-ng-class="{active: pageContent.post_name == 'ant'}" class="icon-insect-ant" title="Ants">
                            <i class="icon-ant"></i>
                        </li>
                        <li data-ng-click="goto('/insects/fishmoth')" data-ng-class="{active: pageContent.post_name == 'fishmoth'}" class="icon-insect-fishmoth" title="Fishmoths">
                            <i class="icon-fishmoth"></i>
                        </li>
                        <li data-ng-click="goto('/insects/flea')" data-ng-class="{active: pageContent.post_name == 'flea'}" class="icon-insect-flea" title="Fleas">
                            <i class="icon-flea"></i>
                        </li>
                    </ul>
                    
                </div>
                <div class="insect-controller-buttons">
                    <button class="icon-chevron-left" data-ui-hero-insect data-nav-direction="back" data-ng-click="prevInsect()"></button>
                    <button class="icon-chevron-right" data-ui-hero-insect data-nav-direction="forward" data-ng-click="nextInsect()"></button>
                </div>
            </div>
            <div layout="row" layout-md="column" layout-align="center start">
                <div layout="column" flex="60" layout-padding>
                    <br /><br />
                    <h3 flex="100" class="page-title" style="font-size:40px;">{{pageContent.post_title}}</h3>
                    <p flex="100" class="page-description">{{pageContent.post_content}}</p>
                    <br /><br />
                    <div class="tag-group insect-buttons-cta" layout="row" layout-align="space-between stretch">
                        <div class="flex">
                            <md-button class="md-primary primary-tag" data-ng-click="goTo('/insects/pageContent.post_title')">
                                <span class="icon "><i class="icon-{{pageContent.post_name}}"></i></span>
                                {{pageContent.post_title}}<br />Profile
                            </md-button>
                        </div>
                        <div class="flex">
                           
                            <md-button class="md-primary primary-tag" data-ng-click="goTo('/products/pageContent.post_title')">
                                <span class="icon icon-"><i class="icon-zap"></i></span>
                                {{pageContent.post_title}}<br />Killers
                            </md-button>

                        </div>
                        <!-- <div class="flex">
                            
                            <md-button class="md-primary primary-tag" data-ng-click="goTo('/insects/pageContent.post_title')">
                                <span class="icon "><i class="icon-hand"></i></span>
                                {{pageContent.post_title}}<br />Prevention
                            </md-button>
                        </div> -->
                    </div>
                    
                </div>
                <div layout="column" flex="40" layout-align="start start">
                    <h3 flex="100" class="carousel-title">Products</h3>
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

            <div layout="column" layout-md="column" layout-align="start start">
                <br /><br />
                <h3 id="makethemstop" flex="100" class="page-title" style="font-size:40px;">Make Them Stop</h3>
                <p flex="100" class="page-description" style="margin-bottom:0;">Get the right {{pageContent.post_title}} Killer for you</p>
                <br /><br />
            </div>
            <div layout="row" layout-md="column" layout-align="center center">

                <div data-ui-configurator style="" pest="{{pageContent.post_name}}" flex="100"></div>

            </div>
        </div>

        <div layout="column" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="single">

            <!-- [HERO SECTION] -->
            <div layout="row" layout-md="column" >
                <div flex="grow" flex-md="100" class="md-padding">
                    <img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption">
                </div>
                <div flex="grow" flex-md="100" class="md-padding">
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
					insectType     	= "coackroach"  
					sortBy="ASC" orderBy="post_title" 
					gridItemsDesktopWide="3" gridItemsDesktop="3" gridItemsMobile="2">
						<h3 flex="100" class="carousel-title">Cockroaches</h3>
				</div>

            </div>

            <!-- [/BODY SECTION] -->

            <!--<div data-ng-transclude flex="100" ></div>-->

        </div>

    </div>