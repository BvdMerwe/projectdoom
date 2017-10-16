<div layout="column" layout-fill class="page-profile-container" flex="100" data-ng-switch="renderPath[1]">
        
        <div layout="column" layout-fill layout-align="center center" class="animate-page-switch md-accent" flex="100" data-ng-switch-default>
            
            <div layout="column" layout-md="column" layout-align="center center">
                <img data-ng-click="showImage()" flex="100" data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="md-card-image super-bug-image" alt="" style="position:relative;left:0;" />
                <div class="insect-controller-buttons">
                    <button class="icon-chevron-left-thin" data-ui-hero-insect data-nav-direction="back" data-ng-click="prevInsect()"></button>
                    <button class="icon-chevron-right-thin" data-ui-hero-insect data-nav-direction="forward" data-ng-click="nextInsect()"></button>
                </div>
            </div>
            
            <div layout="row" layout-md="column" layout-align="center start" class="insect-profile-content-holder">
                <div layout="column" flex="100" flex-md="100">
                    <div class="profile-box" layout-fill>
                        <h3 flex="100" class="page-title no-margin"><i class="icon-speech"></i> About me</h3>
                        <br />
                        <p flex="100" class="page-description no-margin">{{pageContent.doom_insect_about}}</p>
                    </div>
                    <div class="profile-box" layout-fill style="padding-left:0;padding-right:0;padding-bottom:0;">
                        <h3 flex="100" class="page-title no-margin" style="padding:0 40px;"><i class="icon-pin"></i>&nbsp;&nbsp;I Check in at</h3>
                        <br />
                        <div class="map-container" style="position:relative;" flex>
                            <img class="map" src="wp-content/plugins/projectdoom/doom-app/assets/img/MAP.svg" alt="map"/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 665.75 475">
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
                                <p flex="100" id="location-kitchen" class="page-description location-kitchen" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; In your sugar and Mrs Balls bottle.</p>
                                <p flex="100" id="location-bedroom" class="page-description location-bedroom" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; Under your bed for our weekly ‘Breakfast in Bed’ get-together.</p>
                                <p flex="100" id="location-living" class="page-description location-living" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; Under the couch in your lounge for a game of pool with some mates.</p>
                            </div>
                            <div class="profile-pin-descriptions" flex data-ng-switch-when="cockroach">
                                <p flex="100" id="location-bedroom" class="page-description location-bedroom" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; On your face while you’re asleep.</p>
                                <p flex="100" id="location-kitchen" class="page-description location-kitchen" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; In your spice rack with my boys.</p>
                                <p flex="100" id="location-living" class="page-description location-living" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; In your lounge for our weekly ‘Netflix & Chill’ Fridays. The popcorn is always amazing.</p>
                            </div>
                            <div class="profile-pin-descriptions" flex data-ng-switch-when="fly">
                                <p flex="100" id="location-bathroom" class="page-description location-bathroom" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; Sweet love between the bristles of your toothbrush.</p>
                                <p flex="100" id="location-kitchen" class="page-description location-kitchen" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; Family lunch in your kitchen bin.</p>
                                <p flex="100" id="location-living" class="page-description location-living" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; On your glass of juice. I just forgot what side I sat on.</p>
                            </div>
                            <div class="profile-pin-descriptions" flex data-ng-switch-when="flea">
                                <p flex="100" id="location-outside" class="page-description location-outside" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; On your pets back for a chill session.</p>
                                <p flex="100" id="location-living" class="page-description location-living" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; On the carpet to see some old friends.</p>
                                <p flex="100" id="location-outside" class="page-description location-outside" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; Back on your pet where I live.</p>
                            </div>
                            <div class="profile-pin-descriptions" flex data-ng-switch-when="fishmoth">
                                <p flex="100" id="location-living" class="page-description location-living" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; 60’s Theme party in your bookshelf with my crew.</p>
                                <p flex="100" id="location-kitchen" class="page-description location-kitchen" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; Dinner date with a milf in your basin last week.</p>
                                <p flex="100" id="location-bedroom" class="page-description location-bedroom" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>&nbsp; Booked the presidential suite in your sock-drawer with the milf.</p>
                            </div>
                            <div class="profile-pin-descriptions" flex data-ng-switch-when="mosquito">
                                <p flex="100" class="page-description" style="padding-left:40px;padding-right:40px;"><i class="icon-pin"></i>On someone’s legs. Smelly feet drive me crazy.</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div layout="column" flex="100" flex-md="100" layout-align-md="center center" layout-align="center start">
                    <div class="profile-box" layout-fill>
                        <h3 flex="100" class="page-title no-margin"><i class="icon-speech"></i> Interests / hobbies</h3>
                        <br />
                        <p flex="100" class="page-description no-margin">{{pageContent.doom_insect_hobbies}}</p>
                    </div>
                    <div class="profile-box" layout-fill>
                        <h3 flex="100" class="page-title no-margin"><i class="icon-speech"></i> I'm best known for</h3>
                        <br />
                        <p flex="100" class="page-description no-margin">{{pageContent.doom_insect_best_known}}</p>
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
        <!--
         <div class="insect-controller-buttons">
            <button class="icon-chevron-left" data-ui-hero-insect data-nav-direction="back" data-ng-click="prevInsect()"></button>
            <button class="icon-chevron-right" data-ui-hero-insect data-nav-direction="forward" data-ng-click="nextInsect()"></button>
        </div>
        -->
    </div>