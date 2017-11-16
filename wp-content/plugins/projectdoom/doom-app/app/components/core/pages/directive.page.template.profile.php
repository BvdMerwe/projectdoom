<div layout="column" layout-fill class="page-profile-container" flex="100" data-ng-switch="renderPath[1]">
        
        <div layout="column" layout-fill layout-align="center center" class="animate-page-switch md-accent" flex="100" data-ng-switch-default>
            
            <div layout-gt-sm="row" layout="column" layout-align="center center" layout-align-gt-sm="center start" class="super-hero-bg">
                <div flex="100" flex-gt-sm="100" class="single-insect-image-holder flex-gt-sm-50 flex-100">
                    <img data-ng-click="showImage()" flex="100" data-ng-animate-swap="pageContent.side_image" data-ng-src="{{pageContent.side_image}}" class="md-card-image super-bug-image" alt="" />
                </div>
                <!-- <img data-ng-click="showImage()" flex="100" data-ng-animate-swap="pageContent.side_image" data-ng-src="{{pageContent.side_image}}" class="md-card-image super-bug-image" alt="" /> -->
                <div flex="100" flex-gt-sm="100" flex-offset-gt-sm="5" class="super-hero-fact-holder" layout-align="center center" layout-align-gt-sm="center start">
                    <!-- <div data-ng-switch="pageContent.post_name"> -->
                        <div data-ng-animate-swap="pageContent.side_image" class="insect-fact">
                            <h1 flex="100" class="page-title main">{{pageContent.post_title}}</h1>
                            <p ng-bind-html="selectedStat.formatted"></p>
                            <div class="stat-controls">
                                <div class="stat-selector" ng-click="showStat(stat)" ng-repeat="stat in result.stats">
                                <!-- <i class="icon lnr lnr-{{stat.type}}"></i> -->
                                <i class="icon icon-{{stat.type == 'molts' ? result.pest.post_name : stat.type}}" data-ng-class="{active: $first == true}"></i>
                                <span>{{stat.type}}</span>
                                </div>
                            </div>
                        </div>                        
                    <!-- </div> -->
                </div>
                <div class="insect-controller-buttons">
                    <button class="icon-chevron-left-thin" data-ui-hero-insect data-nav-direction="back" data-ng-click="prevInsect()"></button>
                    <button class="icon-chevron-right-thin" data-ui-hero-insect data-nav-direction="forward" data-ng-click="nextInsect()"></button>
                </div>
            </div>
            
            <div style="position: relative">
                <div data-ng-animate-swap="pageContent.side_image" layout-gt-sm="row" layout="column" layout-align="center start" class="insect-profile-content-holder">
                    <div layout="column" flex="100" flex-gt-sm="100">
                        <div class="profile-box" layout-fill>
                            <span class="profile-box-header">
                                <i class="icon-{{pageContent.post_name}} profile-box-icon"></i>
                                <h3 flex="100" class="page-title no-margin">About me</h3> 
                            </span>
                            <br />
                            <p flex="100" class="page-description no-margin">{{pageContent.doom_insect_about}}</p>
                        </div>
                        <div class="profile-box" layout-fill style="padding-left:0;padding-right:0;padding-bottom:0;">
                            <span class="profile-box-header" style="padding:0 0 0 1.625em;">
                                <i class="icon-pin profile-box-icon"></i>
                                <h3 flex="100" class="page-title no-margin">I Check in at</h3>
                            </span>
                            <br />
                            <div class="map-container" style="position:relative;" flex>
                                <img class="map" src="wp-content/plugins/projectdoom/doom-app/assets/img/MAP.svg" alt="map"/>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 665.75 475" >
                                    <!-- <defs><style>.cls-1{fill:#fff;stroke:#231f20;stroke-width:5px;}.cls-10,.cls-2{font-size:12px;font-family:MyriadPro-Regular, Myriad Pro;}.cls-3{letter-spacing:0em;}.cls-4{letter-spacing:0em;}.cls-5{letter-spacing:-0.01em;}.cls-6{letter-spacing:0em;}.cls-7{letter-spacing:-0.01em;}.cls-8{letter-spacing:0.01em;}.cls-9{letter-spacing:-0.01em;}.cls-10{letter-spacing:-0.03em;}.cls-11{letter-spacing:0em;}</style></defs> -->
                                    <g id="bedroom" ng-mouseover="setProfileLocation('bedroom')" ng-mouseleave="removeProfileLocation('bedroom')" class="area {{config.location.indexOf('bedroom') > -1}}">
                                        <rect class="cls-1" x="2.5" y="2.5" width="195" height="299"/>
                                        <path class="pin"  d="M101,220.3c-6.8-12.1-13.4-23.4-19.5-35c-4.5-8.5-1.8-19.5,5.7-25.7c7.6-6.4,18.7-6.7,26.6-0.8
                                            c8.1,6,11.4,16.5,7.1,25.6c-4.2,8.9-9.4,17.3-14.1,25.9C105,213.4,103.1,216.5,101,220.3z M89.1,176.2c0,6.5,5.3,11.9,11.6,11.9
                                            c6.6,0.1,12.1-5.2,12.2-11.8c0.1-6.6-5.4-12.3-11.9-12.2C94.4,164.2,89.1,169.6,89.1,176.2C89.1,176.2,89.1,176.2,89.1,176.2z"/>
                                    </g>
                                    <g id="bathroom" ng-mouseover="setProfileLocation('bathroom')" ng-mouseleave="removeProfileLocation('bathroom')"  class="area {{config.location.indexOf('bathroom') > -1}}">
                                        <rect class="cls-1" x="197.5" y="2.5" width="159" height="197"/>
                                        <path class="pin" d="M264.9,97.8c-6.8-12.1-13.4-23.4-19.5-35c-4.5-8.5-1.8-19.5,5.7-25.7c7.6-6.4,18.7-6.7,26.6-0.8
                                            c8.1,6,11.4,16.5,7.1,25.6c-4.2,8.9-9.4,17.3-14.1,25.9C268.9,90.9,267.1,94,264.9,97.8z M253,53.7c0,6.5,5.3,11.9,11.6,11.9
                                            c6.6,0.1,12.1-5.2,12.2-11.8c0.1-6.6-5.4-12.3-11.9-12.2C258.4,41.7,253,47.1,253,53.7C253,53.7,253,53.7,253,53.7z"/>
                                    </g>
                                    <g id="kitchen" ng-mouseover="setProfileLocation('kitchen')" ng-mouseleave="removeProfileLocation('kitchen')" class="area {{config.location.indexOf('kitchen') > -1}}">
                                        <polygon class="cls-1" points="663.25 2.5 663.25 272.5 507.5 272.5 507.5 199.5 356.5 199.5 356.5 156.5 356.5 2.5 663.25 2.5"/>
                                        <path class="pin" d="M569.2,80.7c-6.8-12.1-13.4-23.4-19.5-35c-4.5-8.5-1.8-19.5,5.7-25.7c7.6-6.4,18.7-6.7,26.6-0.8
                                            c8.1,6,11.4,16.5,7.1,25.6c-4.2,8.9-9.4,17.3-14.1,25.9C573.2,73.8,571.4,77,569.2,80.7z M557.4,36.7c0,6.5,5.3,11.9,11.6,11.9
                                            c6.6,0.1,12.1-5.2,12.2-11.8c0.1-6.6-5.4-12.3-11.9-12.2C562.7,24.6,557.3,30,557.4,36.7C557.4,36.7,557.4,36.7,557.4,36.7z"/>
                                    </g>
                                    <g id="living" ng-mouseover="setProfileLocation('living')" ng-mouseleave="removeProfileLocation('living')" class="area {{config.location.indexOf('living') > -1}}">
                                        <polygon class="cls-1" points="663.25 472.5 663.25 272.5 507.5 272.5 507.5 199.5 356.5 199.5 356.5 472.5 663.25 472.5"/>
                                        <path class="pin" d="M553.8,394.8c-6.8-12.1-13.4-23.4-19.5-35c-4.5-8.5-1.8-19.5,5.7-25.7c7.6-6.4,18.7-6.7,26.6-0.8
                                            c8.1,6,11.4,16.5,7.1,25.6c-4.2,8.9-9.4,17.3-14.1,25.9C557.8,387.9,556,391,553.8,394.8z M542,350.7c0,6.5,5.3,11.9,11.6,11.9
                                            c6.6,0.1,12.1-5.2,12.2-11.8c0.1-6.6-5.4-12.3-11.9-12.2C547.3,338.7,541.9,344.1,542,350.7C542,350.7,542,350.7,542,350.7z"/>
                                    </g>
                                    <g id="outside" ng-mouseover="setProfileLocation('outside')" ng-mouseleave="removeProfileLocation('outside')" class="area {{config.location.indexOf('outside') > -1}}">
                                        <polygon class="cls-1" points="2.5 472.5 2.5 301.5 197.5 301.5 197.5 199.5 356.5 199.5 356.5 472.5 2.5 472.5"/>
                                        <path class="pin" d="M94.5,400.1c-6.8-12.1-13.4-23.4-19.5-35c-4.5-8.5-1.8-19.5,5.7-25.7c7.6-6.4,18.7-6.7,26.6-0.8
                                            c8.1,6,11.4,16.5,7.1,25.6c-4.2,8.9-9.4,17.3-14.1,25.9C98.5,393.2,96.6,396.3,94.5,400.1z M82.6,356.1c0,6.5,5.3,11.9,11.6,11.9
                                            c6.6,0.1,12.1-5.2,12.2-11.8c0.1-6.6-5.4-12.3-11.9-12.2C88,344,82.6,349.4,82.6,356.1C82.6,356.1,82.6,356.1,82.6,356.1z"/>
                                    </g>
                                </svg>
                            </div>
                            <div class="map-container" style="position:relative;" flex layout="column" data-ng-switch="pageContent.post_name">
                                <div class="profile-pin-descriptions" flex data-ng-switch-when="ant">
                                    <p ng-mouseover="setProfileLocation('kitchen')" ng-mouseleave="removeProfileLocation('kitchen')" flex="100" id="location-kitchen" class="page-description location-kitchen" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>In your sugar and Mrs Balls bottle.</p>
                                    <p ng-mouseover="setProfileLocation('bedroom')" ng-mouseleave="removeProfileLocation('bedroom')"  flex="100" id="location-bedroom" class="page-description location-bedroom" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>Under your bed for our weekly ‘Breakfast in Bed’ get-together.</p>
                                    <p ng-mouseover="setProfileLocation('living')" ng-mouseleave="removeProfileLocation('living')"  flex="100" id="location-living" class="page-description location-living" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>Under the couch in your lounge for a game of pool with some mates.</p>
                                </div>
                                <div class="profile-pin-descriptions" flex data-ng-switch-when="cockroach">
                                    <p ng-mouseover="setProfileLocation('bedroom')" ng-mouseleave="removeProfileLocation('bedroom')"  flex="100" id="location-bedroom" class="page-description location-bedroom" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>On your face while you’re asleep.</p>
                                    <p ng-mouseover="setProfileLocation('kitchen')" ng-mouseleave="removeProfileLocation('kitchen')"  flex="100" id="location-kitchen" class="page-description location-kitchen" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>In your spice rack with my boys.</p>
                                    <p ng-mouseover="setProfileLocation('living')" ng-mouseleave="removeProfileLocation('living')"  flex="100" id="location-living" class="page-description location-living" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>In your lounge for our weekly ‘Netflix &amp; Chill’ Fridays. The popcorn is always amazing.</p>
                                </div>
                                <div class="profile-pin-descriptions" flex data-ng-switch-when="fly">
                                    <p ng-mouseover="setProfileLocation('bathroom')" ng-mouseleave="removeProfileLocation('bathroom')"  flex="100" id="location-bathroom" class="page-description location-bathroom" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>Sweet love between the bristles of your toothbrush.</p>
                                    <p ng-mouseover="setProfileLocation('kitchen')" ng-mouseleave="removeProfileLocation('kitchen')"  flex="100" id="location-kitchen" class="page-description location-kitchen" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>Family lunch in your kitchen bin.</p>
                                    <p ng-mouseover="setProfileLocation('living')" ng-mouseleave="removeProfileLocation('living')"  flex="100" id="location-living" class="page-description location-living" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>On your glass of juice. I just forgot what side I sat on.</p>
                                </div>
                                <div class="profile-pin-descriptions" flex data-ng-switch-when="flea">
                                    <p ng-mouseover="setProfileLocation('outside')" ng-mouseleave="removeProfileLocation('outside')"  flex="100" id="location-outside" class="page-description location-outside" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>On your pets back for a chill session.</p>
                                    <p ng-mouseover="setProfileLocation('living')" ng-mouseleave="removeProfileLocation('living')"  flex="100" id="location-living" class="page-description location-living" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>On the carpet to see some old friends.</p>
                                    <p ng-mouseover="setProfileLocation('outside')" ng-mouseleave="removeProfileLocation('outside')"  flex="100" id="location-outside" class="page-description location-outside" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>Back on your pet where I live.</p>
                                </div>
                                <div class="profile-pin-descriptions" flex data-ng-switch-when="fishmoth">
                                    <p ng-mouseover="setProfileLocation('living')" ng-mouseleave="removeProfileLocation('living')"  flex="100" id="location-living" class="page-description location-living" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>60’s Theme party in your bookshelf with my crew.</p>
                                    <p ng-mouseover="setProfileLocation('kitchen')" ng-mouseleave="removeProfileLocation('kitchen')"  flex="100" id="location-kitchen" class="page-description location-kitchen" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>Dinner date with a milf in your basin last week.</p>
                                    <p ng-mouseover="setProfileLocation('bedroom')" ng-mouseleave="removeProfileLocation('bedroom')"  flex="100" id="location-bedroom" class="page-description location-bedroom" layout="row" layout-align="start center" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>Booked the presidential suite in your sock-drawer with the milf.</p>
                                </div>
                                <div class="profile-pin-descriptions" flex data-ng-switch-when="mosquito">
                                    <p ng-mouseover="setProfileLocation('bedroom')" ng-mouseleave="removeProfileLocation('bedroom')"  flex="100" id="location-bedroom" class="page-description location-bedroom" layout="row" layout-align="start center"  style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>On someone’s legs. Smelly feet drive me crazy.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div layout="column" flex="100" flex-gt-sm="100" flex-offset-gt-sm="5" layout-align="center center" layout-align-gt-sm="center start">
                        <div class="profile-box" layout-fill>
                            <span class="profile-box-header">
                                <i class="icon-speech profile-box-icon"></i>
                                <h3 class="page-title no-margin">Interests / hobbies</h3>
                            </span>
                            <br />
                            <p flex="100" class="page-description no-margin">{{pageContent.doom_insect_hobbies}}</p>
                        </div>
                        <div class="profile-box" layout-fill>
                            <span class="profile-box-header">
                                <i class="icon-star profile-box-icon"></i> 
                                <h3 flex="100" class="page-title no-margin">I'm best known for</h3>
                            </span>
                            <br />
                            <p flex="100" class="page-description no-margin">{{pageContent.doom_insect_best_known}}</p>
                        </div>
                        <div class=""> 
                            <h3 flex="100" class="carousel-title" style="margin-bottom:0;">Most vulnerable when</h3>
                            <div layout="row" layout-align="center center" layout-align-gt-sm="start start">
                            <div data-ui-carousel
                                single          = "true"
                                cta             = "true"
                                maxHeight       = "300px"
                                maxWidth        = "250px"
                                gutter          = "10px"
                                displayName     = "true"
                                insectType      = "{{pageContent.post_name}}"
                                productType     = "spray"
                                showFilter      = "true"
                                filterBy        = "product_types"
                                contentType="product"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
        <!--
         <div class="insect-controller-buttons">
            <button class="icon-chevron-left" data-ui-hero-insect data-nav-direction="back" data-ng-click="prevInsect()"></button>
            <button class="icon-chevron-right" data-ui-hero-insect data-nav-direction="forward" data-ng-click="nextInsect()"></button>
        </div>
        -->
</div>