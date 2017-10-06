    <div layout="column" layout-fill class="animate-page-switch-container" flex="100" data-ng-switch="renderPath[1]">
        <?php /** /?>
        <div layout="column" layout-fill layout-align="center center" class="animate-page-switch md-accent" flex="100" data-ng-switch-when="single">
            
            <div layout="column" layout-md="column" layout-align="center center">
                <img data-ng-click="showImage()" flex="100" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="md-card-image super-bug-image" alt="" style="position:relative;left:0;" />
                <div class="insect-controller-buttons">
                    <button class="icon-chevron-left" data-ui-hero-insect data-nav-direction="back" data-ng-click="prevInsect()"></button>
                    <button class="icon-chevron-right" data-ui-hero-insect data-nav-direction="forward" data-ng-click="nextInsect()"></button>
                </div>
            </div>
            
            <div layout="row" layout-md="column" layout-align="center start" style="position:relative;top:-100px;">
                <div layout="column" flex="50" flex-md="100">
                    <div class="profile-box">
                        <br /><br />
                        <h3 flex="100" class="page-title" style="">About me</h3>
                        <p flex="100" class="page-description">{{pageContent.doom_insect_about}}</p>
                        <br /><br />
                    </div>
                    <div class="profile-box" style="padding-left:0;padding-right:0;padding-bottom:0;">
                        <br /><br />
                        <h3 flex="100" class="page-title" style="padding-left:40px;padding-rigt:40px;">I Check in at</h3>
                        <p flex="100" class="page-description" style="padding-left:40px;padding-rigt:40px;">{{pageContent.doom_insect_lives_in}}</p>
                        <br /><br />
                        <div class="map-container" style="position:relative;" flex>
                            <img class="map" src="wp-content/plugins/projectdoom/doom-app/assets/img/MAP.svg" alt="map"/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 665.75 475">
                                <!-- <defs><style>.cls-1{fill:#fff;stroke:#231f20;stroke-width:5px;}.cls-10,.cls-2{font-size:12px;font-family:MyriadPro-Regular, Myriad Pro;}.cls-3{letter-spacing:0em;}.cls-4{letter-spacing:0em;}.cls-5{letter-spacing:-0.01em;}.cls-6{letter-spacing:0em;}.cls-7{letter-spacing:-0.01em;}.cls-8{letter-spacing:0.01em;}.cls-9{letter-spacing:-0.01em;}.cls-10{letter-spacing:-0.03em;}.cls-11{letter-spacing:0em;}</style></defs> -->
                                <g id="bedroom" ng-click="setLocation('bedroom')" class="area {{config.location.indexOf('bedroom') > -1}}">
                                    <rect class="cls-1" x="2.5" y="2.5" width="195" height="299"/>
                                    <path class="pin" d="M101,220.3c-6.8-12.1-13.4-23.4-19.5-35c-4.5-8.5-1.8-19.5,5.7-25.7c7.6-6.4,18.7-6.7,26.6-0.8
                                        c8.1,6,11.4,16.5,7.1,25.6c-4.2,8.9-9.4,17.3-14.1,25.9C105,213.4,103.1,216.5,101,220.3z M89.1,176.2c0,6.5,5.3,11.9,11.6,11.9
                                        c6.6,0.1,12.1-5.2,12.2-11.8c0.1-6.6-5.4-12.3-11.9-12.2C94.4,164.2,89.1,169.6,89.1,176.2C89.1,176.2,89.1,176.2,89.1,176.2z"/>
                                </g>
                                <g id="bathroom" ng-click="setLocation('bathroom')" class="area {{config.location.indexOf('bathroom') > -1}}">
                                    <rect class="cls-1" x="197.5" y="2.5" width="159" height="197"/>
                                    <path class="pin" d="M264.9,97.8c-6.8-12.1-13.4-23.4-19.5-35c-4.5-8.5-1.8-19.5,5.7-25.7c7.6-6.4,18.7-6.7,26.6-0.8
                                        c8.1,6,11.4,16.5,7.1,25.6c-4.2,8.9-9.4,17.3-14.1,25.9C268.9,90.9,267.1,94,264.9,97.8z M253,53.7c0,6.5,5.3,11.9,11.6,11.9
                                        c6.6,0.1,12.1-5.2,12.2-11.8c0.1-6.6-5.4-12.3-11.9-12.2C258.4,41.7,253,47.1,253,53.7C253,53.7,253,53.7,253,53.7z"/>
                                </g>
                                <g id="kitchen" ng-click="setLocation('kitchen')" class="area {{config.location.indexOf('kitchen') > -1}}">
                                    <polygon class="cls-1" points="663.25 2.5 663.25 272.5 507.5 272.5 507.5 199.5 356.5 199.5 356.5 156.5 356.5 2.5 663.25 2.5"/>
                                    <path class="pin" d="M569.2,80.7c-6.8-12.1-13.4-23.4-19.5-35c-4.5-8.5-1.8-19.5,5.7-25.7c7.6-6.4,18.7-6.7,26.6-0.8
                                        c8.1,6,11.4,16.5,7.1,25.6c-4.2,8.9-9.4,17.3-14.1,25.9C573.2,73.8,571.4,77,569.2,80.7z M557.4,36.7c0,6.5,5.3,11.9,11.6,11.9
                                        c6.6,0.1,12.1-5.2,12.2-11.8c0.1-6.6-5.4-12.3-11.9-12.2C562.7,24.6,557.3,30,557.4,36.7C557.4,36.7,557.4,36.7,557.4,36.7z"/>
                                </g>
                                <g id="living" ng-click="setLocation('living')" class="area {{config.location.indexOf('living') > -1}}">
                                    <polygon class="cls-1" points="663.25 472.5 663.25 272.5 507.5 272.5 507.5 199.5 356.5 199.5 356.5 472.5 663.25 472.5"/>
                                    <path class="pin" d="M553.8,394.8c-6.8-12.1-13.4-23.4-19.5-35c-4.5-8.5-1.8-19.5,5.7-25.7c7.6-6.4,18.7-6.7,26.6-0.8
                                        c8.1,6,11.4,16.5,7.1,25.6c-4.2,8.9-9.4,17.3-14.1,25.9C557.8,387.9,556,391,553.8,394.8z M542,350.7c0,6.5,5.3,11.9,11.6,11.9
                                        c6.6,0.1,12.1-5.2,12.2-11.8c0.1-6.6-5.4-12.3-11.9-12.2C547.3,338.7,541.9,344.1,542,350.7C542,350.7,542,350.7,542,350.7z"/>
                                </g>
                                <g id="outside" ng-click="setLocation('outside')" class="area {{config.location.indexOf('outside') > -1}}">
                                    <polygon class="cls-1" points="2.5 472.5 2.5 301.5 197.5 301.5 197.5 199.5 356.5 199.5 356.5 472.5 2.5 472.5"/>
                                    <path class="pin" d="M94.5,400.1c-6.8-12.1-13.4-23.4-19.5-35c-4.5-8.5-1.8-19.5,5.7-25.7c7.6-6.4,18.7-6.7,26.6-0.8
                                        c8.1,6,11.4,16.5,7.1,25.6c-4.2,8.9-9.4,17.3-14.1,25.9C98.5,393.2,96.6,396.3,94.5,400.1z M82.6,356.1c0,6.5,5.3,11.9,11.6,11.9
                                        c6.6,0.1,12.1-5.2,12.2-11.8c0.1-6.6-5.4-12.3-11.9-12.2C88,344,82.6,349.4,82.6,356.1C82.6,356.1,82.6,356.1,82.6,356.1z"/>
                                </g>
                            </svg>
                        </div>
                    </div>

                </div>
                <div layout="column" flex="40" flex-offset="10" flex-md="100" flex-md-offset="0" layout-align-md="center center" layout-align="center start">
                    <div class="profile-box">
                        <br /><br />
                        <h3 flex="100" class="page-title" style="">Interests / hobbies</h3>
                        <p flex="100" class="page-description">{{pageContent.doom_insect_hobbies}}</p>
                        <br /><br />
                    </div>
                    <div class=""> 
                        <h3 flex="100" class="carousel-title" style="margin-bottom:0;">Most vulnerable when</h3>
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
            </div>

        </div>
        <?php/**/?>

       <!-- INSECT SLIDER -->
        <div layout="column" layout-fill class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-default >
            
            <?php /**/?>
            <div layout="row" layout-md="column" layout-align="center start" layout-align-md="center center" class="super-hero-bg" md-swipe-left="prevInsect()" md-swipe-right="nextInsect()">
                <div flex="50" flex-md="100" flex-md="100" style="margin-top: -49px;">
                    <!--<div class="super-bug-image-bg" style="background-image:url('{{pageContent.image}}');"></div>-->
                    <img data-ng-click="showImage()" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="md-card-image super-bug-image" alt="image caption" />
                </div>
                
                <div flex="40" flex-offset="10" flex-md="100" class="" layout-align="center start" layout-align-md="center start">
                    <div data-ng-switch="pageContent.post_name">
                        <div data-ng-switch-when="flea">
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}s</strong> can suck</p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}-->15 times<sup>*</sup></h1>
                            <p flex="100" class="page-description">their bodyweight in blood a day. Their fave drinking spot is covered in fur and answers to the name, Scruffles.</p>
                        </div>
                        <div data-ng-switch-when="cockroach">
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}es</strong> can go</p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}><br /-->1 week<sup>*</sup></h1>
                            <p flex="100" class="page-description">without a head. That means a headless hedonistic roach could be making its way up your pj’s while you sleep tonight.</p>
                        </div>
                        <div data-ng-switch-when="ant">
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}s</strong> vomit every</p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}<br /-->second<sup>*</sup></h1>
                            <p flex="100" style="max-width:90%;" class="page-description">That includes the ones currently hijacking the sandwich in your skaftin. </p>
                        </div>
                        <div data-ng-switch-when="fly"> 
                            <p flex="100" class="page-description"><strong><!--{{pageContent.post_title}}-->Flies</strong> poop once every </p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}<br /-->10 seconds<sup>*</sup></h1>
                            <p flex="100" class="page-description">while feeding. Good to know for next time you spot a fly snacking on your Sunday seven colours.</p>
                        </div>
                        <div data-ng-switch-when="mosquito">
                            <p flex="100" class="page-description">Only female <strong>{{pageContent.post_title}}s</strong> bite and they can lay up to </p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}<br /-->150 eggs<sup>*</sup></h1>
                            <p flex="100" class="page-description">at a time. They’re particularly fond of pungent odours, like your smelly feet. </p>
                        </div> 
                        <div data-ng-switch-when="fishmoth">
                            <p flex="100" class="page-description">The <strong>{{pageContent.post_title}}s</strong> eating holes through the private bits of your underwear are laying</p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}<br /-->2.5 eggs<sup>*</sup></h1>
                            <p flex="100" class="page-description">a day, in your home.</p>
                        </div>
                        
                    </div>
                    <!-- <br /><br /> -->
                    <md-button ng-click="scrollTo('#makethemstop')" class="md-primary primary-cta fill-width" style="padding:10px 45px;font-size:30px;margin: 44px 0;">Make Them Stop</md-button>
                    <!-- <br /><br /> -->
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
                
            <?php /** /?>
             <!-- 
            <div layout="row" layout-md="column" layout-align="start start">
                <img data-ng-click="showImage()" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="md-card-image super-bug-image" alt="image caption" />
                <div flex="40" flex-md="100" class="">
                    
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
            -->
            <?php /**/?>
            <div layout="row" layout-md="column" layout-align="space-between start" layout-align-md="center center" style="position:relative;top:-100px;">
                <!-- PEST LINKS -->
                <div layout="column" flex="50" flex-md="100" layout-align-md="center center">
                    <h3 flex="100" class="page-title" style="">{{pageContent.post_title}}</h3>
                    <p flex="100" class="page-description">{{pageContent.post_content}}</p>
                    <div class="insect-buttons-cta" flex="100" layout="row" layout-align="space-between stretch" layout-align-md="space-between stretch">
                        <div class="flex">
                            <md-button class="md-primary primary-tag" data-ng-click="viewProfile(pageContent.post_name)">
                                <span class="icon "><i class="icon-{{pageContent.post_name}}"></i></span>
                                {{pageContent.post_title}}<br />Profile
                            </md-button>
                        </div>
                        <div class="flex">
                           
                            <md-button class="md-primary primary-tag" data-ng-click="browseBycategory( 'products', pageContent.insect_categories[0].slug)">
                                <span class="icon icon-"><i class="icon-zap"></i></span>
                                {{pageContent.post_title}}<br />Killers
                            </md-button>

                        </div>
                        <!-- <div class="flex">
                            
                            <md-button class="md-primary primary-tag" data-ng-click="goto('/insects/pageContent.post_title')">
                                <span class="icon "><i class="icon-hand"></i></span>
                                {{pageContent.post_title}}<br />Prevention
                            </md-button>
                        </div> -->
                    </div>
                    
                </div>
                <!-- RELATED PRODU|CTS -->
                <div layout="column" layout-fill flex="40" flex-offset="10" flex-md="100" layout-align="start start" layout-align-md="center center">
                    <h3 flex="100" class="page-title">Products</h3>
                    <div layout="row" layout-fill>
                    <div data-ui-carousel
                        single          = "true"
                        cta             = "true"
                        maxHeight       = "550px"
                        maxWidth        = "200px"
                        gutter          = "175px"
                        displayName     = "true"
                        insectType      = ""
                        productType     = "spray"
                        showFilter      = "true"
                        filterBy        = "product_types"
                        contentType="product"></div>
                </div>
                </div>
            </div>

            <!-- CONFIGURATOR -->
            <div layout="column" layout-md="column" layout-align="start start" layout-align-md="center center">
                <!-- <br /><br /> -->
                <h3 id="makethemstop" flex="100" class="page-title" style="">Make Them Stop</h3>
                <p flex="100" class="page-description" style="margin-bottom:0;">Get the right {{pageContent.post_name}} killer for your {{pageContent.post_name}} problem.</p>
                <!-- <br /><br /> -->
            </div>
            <div layout="row" layout-md="column" layout-align="center center">

                <div data-ui-configurator style="" pest="{{pageContent.post_name}}" flex="100"></div>

            </div>
            <!-- CONFIGURATOR -->
            
        </div>
        <!-- INSECT SLIDER -->

    </div>