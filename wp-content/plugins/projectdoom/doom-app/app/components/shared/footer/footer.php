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

<div layout="column" flex="100" class="footer-container" id="footer">
	<div layout="row" class="footer-nav" flex="100" layout-align="center center">
		<md-nav-bar
		md-no-ink-bar="true"
		md-selected-nav-item="currentNavItem"
		nav-bar-aria-label="navigation links"
		flex="100" >
			<md-nav-item md-nav-click="setPage('about')" name="about">
				ABOUT
			</md-nav-item>
			<md-nav-item md-nav-click="setPage('legal')" name="legal">
				LEGAL
			</md-nav-item>
			<md-nav-item md-nav-click="setPage('faq')" name="faq">
				FAQ
			</md-nav-item>
			<md-nav-item md-nav-click="setPage('contact')" name="contact">
				CONTACT
			</md-nav-item>
		</md-nav-bar>
	</div>
  <?php /**/?>
  <div layout="column" class="footer-content" layout-fill>
    <!-- <div class="footer-control">
      <i class="lnr lnr-cross close-footer" ng-click="close()"></i>
    </div> -->
    <div ng-if="current">
      <div layout="row">
        <h1>{{current.post_title}}</h1>
      </div>
      <div layout="row">
        <p ng-bind-html="current.post_content">
        </p>
      </div>
    </div>
    <div ng-if="static === 'faq'">
      <div data-ui-faq flex="100"></div>
    </div>
    <div ng-if="static === 'contact'">
      <div data-ui-form-contact flex="100"></div>
    </div>
  </div>
  <?php /**/?>
</div>
