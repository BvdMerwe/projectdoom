<?php
/**
 * Displays for app configurator
 *
 * @package WordPress
 * @subpackage doom
 * @since 1.0
 * @version 1.0
 */

?>

<div layout="column" class="config-container" layout id="configurator" flex='100'>
  <div class="config-head" ng-if="!finalPage">
    <!--
  	<h2>Make them stop</h2>
    <p>Get the right {{config.pest.post_title}} killer for you</p>
    -->
    <div class="breadcrumbs">
      <md-slider flex class="md-primary configurator-progress" md-discrete data-ng-model="breadcrumbState" step="1" min="1" max="4" aria-label="state-slider" ng-change="setState(breadcrumbState)"></md-slider>
    </div>
  </div>
  <div class="configurator-steps">
    
    <div class="step-1 {{step1State}} {{step3State}}">
      
      <div class="content" layout="column" layout-fill>
        <div class="content" layout="row">
          <h3 class="carousel-title" flex="100" style="text-align:center;margin:1em auto;">Select your bug</h3>
        </div>
        <div class="content-inner" layout="row" layout-align="start center" layout-align-gt-sm="space-around center">
          <div class="insect-selector {{insect.selected}}" data-ng-repeat="insect in insects">
            <div class="thumbnail">
              <i class="icon-{{insect.post_name}}"></i>
            </div>
            <div class="name">
              <h3>{{insect.post_title}}</h3>
            </div>
            <div class="desc">
              <p>{{insect.doom_insect_config_description}}</p>
            </div>
            <div class="start-button">
              <md-button data-ng-click="next(insect)" class="primary-cta">NEXT STEP</md-button>
            </div>
          </div>
        </div>
      </div>
      <div class="revert" data-ng-click="setState(1)">
        <a>
          <span class="number">1</span>
          <span>Different Pest</span>
        </a>
      </div>
    </div>
    <div class="step-2 {{step2State}}" flex="100" layout="row" style="padding: 0 45px;">
      <br />
      <div flex="100" class="content" layout="row" layout-wrap layout-align="center center">
          <div flex="100">
            <h3 class="green-bold">How long have they been bugging you for?</h3>
            <md-slider-container layout="row" layout-align="space-between center">
              <span flex="15"></span>
              <md-slider flex="70" class="md-primary configurator-progress" md-discrete data-ng-model="config.duration" step="1" min="1" max="4" aria-label="duration"></md-slider>
              <span flex="15"></span>
            </md-slider-container>
            <div layout="row" layout-align="space-between center">
              <span flex="25">A&nbsp;day&nbsp;+</span>
              <span flex="25">A&nbsp;week&nbsp;+</span>
              <span flex="25">A&nbsp;month&nbsp;+</span>
              <span flex="25">More&nbsp;than&nbsp;a&nbsp;year</span>
            </div>
          </div>
          <div flex="100">
            <h3 class="green-bold">How many bugs did you see?</h3>
            <md-slider-container layout="row" layout-align="space-between center">
              <span flex="15">A few</span>
              <md-slider flex="70" class="md-primary configurator-progress" md-discrete data-ng-model="config.amount" step="1" min="1" max="2" aria-label="amount"></md-slider>
              <span flex="15">A lot</span>
            </md-slider-container>
            <md-button data-ng-click="next()" class="primary-cta">NEXT STEP</md-button>
          </div>
        
      </div>
      <div class="revert" data-ng-click="setState(2)">
        <a>
          <span class="number">2</span>
          <span>FREQUENCY</span>
        </a>
      </div>
    </div>
    <div class="step-3 {{step3State}}" layout-fill layout="column" layout-align="center center">
      
      <div class="content" layout-fill layout="column" layout-gt-sm="row" layout-align="space-between center">
        <div class="map-container" flex>
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
        <div class="text" flex>
          <h3 class="green-bold">Where have the goggas invaded?</h3>
          <p>Drop pin on location or select an option below</p>
          <md-select ng-model="config.location" multiple aria-label="locations">
              <md-option ng-value="'bedroom'">Bedroom</md-option>
              <md-option ng-value="'bathroom'">Bathroom</md-option>
              <md-option ng-value="'kitchen'">Kitchen</md-option>
              <md-option ng-value="'living'">Living Room</md-option>
              <md-option ng-value="'outside'">Outside</md-option>
          </md-select>
          <md-button data-ng-click="next()" class="primary-cta">Continue</md-button>
        </div>
      </div>
    </div>
    <div class="final {{finalPage}}">
      <div class="final-backbutton" ng-click="setState(3)">
        <span class="icon-chevron-left"></span>
      </div>
      <div class="final-container" layout="row" layout-fill layout-align="center start" layout-wrap>
        <div class="stats-container" flex="100" flex-gt-sm="33">
          <h3 class="page-title">In your home</h3>
          <p ng-bind-html="selectedStat.formatted"></p>
          <div class="stat-controls">
            <div class="stat-selector" ng-click="showStat(stat)" ng-repeat="stat in result.stats">
              <!-- <i class="icon lnr lnr-{{stat.type}}"></i> -->
              <i class="icon icon-{{stat.type == 'molts' ? result.pest.post_name : stat.type}}" data-ng-class="{active: $first == true}"></i>
              <span>{{stat.type}}</span>
            </div>
          </div>
        </div>
        <div class="product-container" flex="19" flex-gt-sm="33">
          <div class="product" layout="row" layout-fill layout-align="center end">
            <img ng-src="{{result.product.image}}" alt="{{result.product.post_name}}" />
          </div>
        </div>
        <div class="solution-container" flex="80" flex-offset="1" flex-gt-sm="33" flex-offset-gt-sm="0">
          <h3 class="page-title">Your results and solution</h3>
          <p class="page-description">{{result.product.post_content}}</p>
          <div class="">
            <md-button class="primary-cta fill-width" data-ng-click="goto('/products/'+result.product.post_name)">View more</md-button>
            <!-- <br/>
            <br/> -->
            <!-- <md-button class="primary-cta fill-width">Where can I get it?</md-button> -->
          </div>
          <!--
          <p>
            <small>*Please note that the insect stats and data provided would vary depending on circumstance, time, season, weather, or any other variance that could affect this information.</small>
          </p>
          -->
        </div>
        <div class="" layout="column" layout-align="center center">
          <p>
            <small>*Please note that the insect stats and data provided would vary depending on circumstance, time, season, weather, or any other variance that could affect this information.</small>
          </p>
        </div>
      </div>
      
      <!--
      <div class="retailers" flex="100">
        <h2>Where to buy</h2>
        <div data-ui-carousel retailers="result.product.retailers" contentType="retailer" maxAmount="10" maxHeight="100px" maxwidth="150px"></div>
      </div>
      -->
    </div>
  </div>
</div>
