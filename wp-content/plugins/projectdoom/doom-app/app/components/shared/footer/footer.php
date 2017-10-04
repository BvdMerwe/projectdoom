<?php
/**
 * Displays for app footer
 *
 * @package WordPress
 * @subpackage doom
 * @since 1.0
 * @version 1.0
 */

?>

<div layout="column" class="footer-container" layout-fill id="footer" layout-align="center center">
	<div layout="column" class="footer-nav"  layout-align="center center">
    <md-nav-bar
      md-selected-nav-item="currentNavItem"
      nav-bar-aria-label="navigation links"
      >
      <md-nav-item md-nav-click="setPage('about')" name="about" layout-align="end center">
          ABOUT
      </md-nav-item>
      <md-nav-item md-nav-click="setPage('legal')" name="about" layout-align="end center">
          LEGAL
      </md-nav-item>
      <md-nav-item md-nav-click="setPage('faq')" name="about" layout-align="end center">
          FAQ
      </md-nav-item>
      <md-nav-item md-nav-click="setPage('contact')" name="about" layout-align="end center">
          CONTACT
      </md-nav-item>
    </md-nav-bar>
  </div>
  <div class="footer-content" layout-fill data-ng-switch="renderPath[0]" >
    <!-- <div class="footer-control">
      <i class="lnr lnr-cross close-footer" ng-click="close()"></i>
    </div> -->
    <!-- <div ng-if="current">
      <div layout="row">
        <h1>{{current.post_title}}</h1>
      </div>
      <div layout="row">
        <p ng-bind-html="current.post_content">
        </p>
      </div>
    </div> -->

    <!-- ABOUT PAGE TEMPLATE HERE -->
    <div class="animate-page-switch md-accent" flex="100" data-ng-switch-when="about">

      <div data-ui-app-page-about page-name="about" class="page-content" flex-xs="100" flex="100"></div>

    </div>
    <!-- /ABOUT PAGE TEMPLATE HERE -->

    <!-- LEGAL PAGE TEMPLATE HERE -->
    <div class="animate-page-switch md-accent" flex="100" data-ng-switch-when="legal">

      <div data-ui-app-page-legal page-name="legal" class="page-content" flex-xs="100" flex="100"></div>

    </div>
    <!-- /LEGAL PAGE TEMPLATE HERE -->
    
    <!-- FAQ PAGE TEMPLATE HERE -->
    <div class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-when="faq">

      <div data-ui-app-page-faq page-name="faq" class="page-faq" flex="100" class="md-padding"></div>

    </div>
    <!-- /FAQ PAGE TEMPLATE HERE -->

    <!-- CONTACT PAGE TEMPLATE HERE -->
    <div class="animate-page-switch md-accent" layout-xs="column" flex="100" data-ng-switch-when="contact">

      <div data-ui-app-page-contact page-name="contact" class="page-content" flex-xs="100" layout="column" layout-align="center center"></div>

    </div>
    <!-- /CONTACT PAGE TEMPLATE HERE -->
  </div>
</div>
