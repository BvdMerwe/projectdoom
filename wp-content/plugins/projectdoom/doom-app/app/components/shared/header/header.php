<?php
/**
 * Displays for app navigation
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>
	<div layout="column">
		<div layout="row" layout-xs="column" >
			<md-content data-ui-navigation class="" flex="50">
                <md-sidenav
                    class="md-sidenav-left"
                    md-component-id="left"
                    md-is-locked-open="$mdMedia('gt-md')"
                    md-whiteframe="4"
                    style="position: fixed;width:100%;height:100%;top:0;left:0;">

                    <md-toolbar class="md-theme-indigo">
                        <h1 class="md-toolbar-tools">SITEMAP</h1>
                    </md-toolbar>
                    <md-content layout-padding>
                        <md-button ng-click="close()" class="md-primary" hide-gt-md>
                        Close
                        </md-button>
                        <p hide show-gt-md>
                        This sidenav is locked open on your device. To go back to the default behavior,
                        narrow your display.
                        </p>
                    </md-content>

                </md-sidenav>
                
				<md-button ng-click="toggleLeft()"
                class="md-primary md-icon-button md-theme-indigo" aria-label="Site Menu" hide-gt-md>
                    <md-icon style="padding-top:5px;">
                        <span style="position:relative;height:2px;display: block;width:20px;background-color:#444;margin-bottom:2px;"></span>
                        <span style="position:relative;height:2px;display: block;width:20px;background-color:#444;margin-bottom:2px;"></span>
                        <span style="position:relative;height:2px;display: block;width:20px;background-color:#444;margin-bottom:2px;"></span>
                    </md-icon>
                </md-button>
               <h3 style="display:inline-block;" data-ng-click="goto('home')">
                    DOOM PRESENTS...
                </h3>
            </md-content>
		
			<md-content data-ui-navigation class="" flex="50">
                <md-nav-bar
				    md-selected-nav-item="currentNavItem"
				    nav-bar-aria-label="navigation links">

                    <md-nav-item md-nav-click="goto('about')" name="about">
                        ABOUT
                    </md-nav-item>
                    <md-nav-item md-nav-click="goto('legal')" name="legal">
                        LEGAL
                    </md-nav-item>
                    <md-nav-item md-nav-click="goto('products')" name="products">
                        PRODUCTS
                    </md-nav-item>
                    <md-nav-item md-nav-click="goto('faq')" name="faq">
                        FAQ
                    </md-nav-item>
                    <md-nav-item md-nav-click="goto('contact')" name="contact">
                        CONTACT
                    </md-nav-item>
                    <!-- these require actual routing with ui-router or ng-route, so they
                    won't work in the demo
                    <md-nav-item md-nav-href="#page4" name="page5">Page Four</md-nav-item>
                    <md-nav-item md-nav-sref="app.page5" name="page4">Page Five</md-nav-item>
                    You can also add options for the <code>ui-sref-opts</code> attribute.
                    <md-nav-item md-nav-sref="page6" sref-opts="{reload:true, notify:true}">
                        Page Six
                    </md-nav-item>
                    -->
				</md-nav-bar>
            </md-content>
        </div>   
	</div>
