<?php
/**
 * Display Gallery Content
 *
 * @package WordPress
 * @subpackage Doom
 * @since 1.0
 * @version 1.0
 */

?>
	<div layout="column">
		<div layout="row" layout-xs="column" >
			<md-content class="md-padding" flex="100">

                <md-toolbar class="md-hue-1 macdaddy-radius toolbar-filter">
                    <div class="md-toolbar-tools" layout-align="space-around center" style="border:none;">
                        
                        <md-button 
                            class="md-primary md-raised md-hue-3 btn-filter" 
                            aria-label=""
                            data-filter-id="all"
                            data-ng-click="filter( $event, 'all' )">
                                ALL
                        </md-button>
                        <md-button 
                            md-no-ink
                            class="md-primary md-hue-2 btn-filter" 
                            aria-label="" 
                            data-filter-id="{{value.term_id}}"
                            data-ng-click="filter($event, value.term_id)"
                            data-ng-repeat="(key, value) in filterCategories">
                                {{value.name}}
                        </md-button>

                    </div>
                </md-toolbar>

                <md-grid-list
                class="md-primary md-hue-1 gallery-directive-grid"
                md-cols-xs="1" md-cols-sm="{{gridItemsMobile}}" md-cols-md="{{gridItemsDesktop}}" md-cols-gt-md="{{gridItemsDesktopWide}}"
                md-row-height-gt-md="1:1" md-row-height="2:2"
                sm-gutter="20px" md-gutter="15px" md-gutter-gt-sm="8px" >
        
                    <md-grid-tile class="green"
                        data-term-id="{{value.post_title}"
                        md-rowspan="3" md-colspan="{{gridItemsMobile}}" md-colspan-sm="1" md-colspan-xs="1"
                        data-ng-repeat="(key, value) in gridItems | orderBy : 'post_title' ">

                        <md-card class="gallery-card" >
                            <!-- -->
                            <md-card-header data-ng-if="isWidget == 'true'">
                                <!--
                                <md-card-avatar>
                                    img class="md-user-avatar" src="avatar.png">
                                </md-card-avatar>
                                -->
                                <md-card-header-text>
                                    <span class="md-title">{{value.post_title}}</span>
                                    <span class="md-subhead"><span>Sub header</span></span>
                                </md-card-header-text>
                            </md-card-header>
                            <!-- -->
                            <img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption">
                            <!-- -->
                            <md-card-title data-ng-if="isWidget == 'false'">
                                <md-card-title-text>
                                <span class="md-headline">{{value.post_title}}</span>
                                <span class="md-subhead">Card subheader</span>
                                </md-card-title-text>
                            </md-card-title>
                            <!-- -->
                            
                            <md-card-content>
                                <p>
                                {{value.post_content | trunk8:100}}
                                </p>
                            </md-card-content>
                            <md-card-actions layout="row" layout-align="center center">
                                <md-button data-ng-click="goTo(value.post_name)" class="md-primary md-raised md-cornered md-hue-1 btn-cta">VIEW MORE</md-button>
                                <!--
                                <md-card-icon-actions>
                                    <md-button class="md-icon-button" aria-label="icon">
                                        <md-icon md-svg-icon="icon"></md-icon>
                                    </md-button>
                                </md-card-icon-actions>
                                -->
                            </md-card-actions>
                        </md-card>
                        
                    </md-grid-tile>
                
                </md-grid-list>

                <div data-ng-transclude></div>

            </md-content>

        </div>   
	</div>
