    <div layout="column" layout-fill class="animate-page-switch-container" flex="100" data-ng-switch="renderPath[1]">
       

       <!-- INSECT SLIDER -->
        <div layout="column" layout-fill class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-default >
            
            <?php /**/?>
            <div layout-gt-sm="row" layout="column" layout-align="center center" layout-align-gt-sm="center start" class="super-hero-bg" <?php //md-swipe-left="prevInsect()" md-swipe-right="nextInsect()" ?>>
                <div flex-gt-sm="50" class="single-insect-image-holder" flex="100" style="margin-top: -49px;">
                    <!--<div class="super-bug-image-bg" style="background-image:url('{{pageContent.image}}');"></div>-->
                    <img data-ng-click="showImage()" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="md-card-image super-bug-image" alt="image caption" />
                </div>
                
                <div class="super-hero-fact-holder" flex="100" flex-offset-gt-sm="10" flex-gt-sm="40" class="" layout-align="center start" layout-align-gt-sm="center start">
                    <div data-ng-switch="pageContent.post_name">
                        <div data-ng-switch-when="flea" class="insect-fact">
                            <h1 flex="100" class="page-title main"><br/>FLEAS</h1>
                            <span class="hr-divider" style="margin: 1em 0; width: 96px;"></span>
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}s</strong> can suck</p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}-->15 times<sup>*</sup></h1>
                            <p flex="100" class="page-description">their bodyweight in blood a day. Their fave drinking spot is covered in fur and answers to the name, Scruffles.</p>
                        </div>
                        <div data-ng-switch-when="cockroach" class="insect-fact">
                            <h1 flex="100" class="page-title main">Cock<br/>roaches</h1>
                            <span class="hr-divider" style="margin: 1em 0; width: 96px;"></span>
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}es</strong> can go</p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}><br /-->1 week<sup>*</sup></h1>
                            <p flex="100" class="page-description">without a head. That means a headless hedonistic roach could be making its way up your PJs while you sleep tonight.</p>
                        </div>
                        <div data-ng-switch-when="ant" class="insect-fact">
                            <h1 flex="100" class="page-title main"><br/>Ants</h1>
                            <span class="hr-divider" style="margin: 1em 0; width: 96px;"></span>
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}s</strong> vomit every</p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}<br /-->second<sup>*</sup></h1>
                            <p flex="100" style="max-width:90%;" class="page-description">That includes the ones currently hijacking the sandwich in your skaftin. </p>
                        </div>
                        <div data-ng-switch-when="fly" class="insect-fact"> 
                            <h1 flex="100" class="page-title main"><br/>Flies</h1>
                            <span class="hr-divider" style="margin: 1em 0; width: 96px;"></span>
                            <p flex="100" class="page-description"><strong><!--{{pageContent.post_title}}-->Flies</strong> poop once every </p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}<br /-->10 seconds<sup>*</sup></h1>
                            <p flex="100" class="page-description">while feeding. Good to know for next time you spot a fly snacking on your Sunday seven colours.</p>
                        </div>
                        <div data-ng-switch-when="mosquito" class="insect-fact">
                            <h1 flex="100" class="page-title main">Mos<br/>quitoes</h1>
                            <span class="hr-divider" style="margin: 1em 0; width: 96px;"></span>
                            <p flex="100" class="page-description"><strong>{{pageContent.post_title}}s</strong> can lay up to </p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}<br /-->150 eggs<sup>*</sup></h1>
                            <p flex="100" class="page-description">at a time. Only females bite, and they’re particularly fond of pungent odours, like your smelly feet. </p>
                        </div> 
                        <div data-ng-switch-when="fishmoth" class="insect-fact">
                            <h1 flex="100" class="page-title main">Fish<br/>moths</h1>
                            <span class="hr-divider" style="margin: 1em 0; width: 96px;"></span>
                            <p flex="100" class="page-description">The <strong>{{pageContent.post_title}}s</strong> eating holes through the private bits of your underwear are laying</p>
                            <h1 flex="100" class="page-title stat" style="color:#000;"><!--{{pageContent.doom_insect_egg}}<br /-->2.5 eggs<sup>*</sup></h1>
                            <p flex="100" class="page-description">a day, in your home.</p>
                        </div>
                        
                    </div>
                    <!-- <br /><br /> -->
                    <p flex="100" class="page-description">Click here to get the right {{pageContent.post_title}} Solution for you.</p>
                    <md-button ng-click="scrollTo('#makethemstop')" class="md-primary primary-cta main">Make Them Stop</md-button>
                    <!-- <br /><br /> -->
                    
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
                    <button class="icon-chevron-left-thin" data-ui-hero-insect data-nav-direction="back" data-ng-click="prevInsect()"></button>
                    <button class="icon-chevron-right-thin" data-ui-hero-insect data-nav-direction="forward" data-ng-click="nextInsect()"></button>
                </div>
            </div>
                
            <div layout-gt-sm="row" layout="column" layout-align="space-between start" layout-align-gt-sm="center center" style="position:relative;top:-100px;">
                <!-- PEST LINKS -->
                <div layout="column" layout-gt-sm="column" flex-gt-sm="50" flex="100" layout-align="center center" layout-align-gt-sm="start start">
                    <h3 flex="100" class="page-title" style="">{{pageContent.post_title}}</h3>
                    <p flex="100" class="page-description">{{pageContent.post_content}}</p>
                    <div class="insect-buttons-cta" layout="column" layout-align="start start" flex="100" layout-gt-sm="row" layout-align-gt-sm="space-between stretch">
                        <div flex-gt-sm flex="100" class="fill-width">
                            <md-button class="md-primary primary-tag" data-ng-click="viewProfile(pageContent.post_name)">
                                <span class="icon "><i class="icon-{{pageContent.post_name}}"></i></span>
                                {{pageContent.post_title}}<br />Profile
                            </md-button>
                        </div>
                        <div flex-gt-sm flex="100" class="fill-width">
                           
                            <md-button class="md-primary primary-tag" data-ng-click="browseBycategoryInsect( 'products', pageContent.insect_categories[0].slug, pageContent.post_name)">
                                <span class="icon icon-"><i class="icon-zap"></i></span>
                                {{pageContent.post_title}}<br />Solutions
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
                <div layout="column" flex-gt-sm="40" flex-offset-gt-sm="10" flex="100" layout-align-gt-sm="start start" layout-align="center center">
                    <h3 flex="100" class="page-title">Products</h3>
                    <div layout="row" flex="100">
                        <div flex="100" 
                            data-ui-carousel
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
            <div layout="column" layout-align-gt-sm="start start" layout-align="center center">
                <!-- <br /><br /> -->
                <h3 id="makethemstop" flex="100" class="page-title" style="">Make Them Stop</h3>
                <p flex="100" class="page-description" style="margin-bottom:0;">Get the right {{pageContent.post_name}} Solution for your {{pageContent.post_name}} problem.</p>
                <!-- <br /><br /> -->
            </div>
            <div layout-gt-sm="row" layout="column" layout-align="center center">

                <div data-ui-configurator style="" pest="{{pageContent.post_name}}" flex="100"></div>

            </div>
            <!-- CONFIGURATOR -->
            
        </div>
        <!-- INSECT SLIDER -->

    </div>