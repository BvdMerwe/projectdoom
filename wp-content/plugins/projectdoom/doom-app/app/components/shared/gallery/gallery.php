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
			<md-content flex="100" class="">
                
                <md-toolbar class="md-hue-1 toolbar-filter" data-ng-if="showFilter == 'true'">
                    <div class="md-toolbar-tools" layout-align="start start" style="border-bottom:2px solid #14A774;">
                        
                        
                        <md-button 
                            md-no-ink
                            class="md-primary md-hue-2 btn-filter" 
                            aria-label="" 
                            data-filter-id="{{value.term_id}}"
                            data-ng-click="filter($event, value.term_id)"
                            data-ng-if="value.name == 'Flying' || value.name == 'Crawling'"
                            data-ng-repeat="(key, value) in insectFilterCategories">
                                {{value.name}}
                        </md-button>
                        <md-button 
                            class="md-primary md-hue-3 btn-filter active-filter" 
                            aria-label=""
                            data-filter-id="all"
                            data-ng-click="filter( $event, 'all' )">
                                ALL
                        </md-button>

                    </div>
                </md-toolbar>

                <div data-ng-transclude flex="100"></div>

                <!--
                <md-toolbar class="md-hue-1 toolbar-filter">
                    <div class="md-toolbar-tools" layout-align="space-around start" style="border:none;">
                        
                        <md-button 
                            class="md-primary md-hue-3 btn-filter" 
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
                -->
                <!-- md-row-height-gt-md="1:1" md-row-height="2:2" md-row-height-gt-md="1:2" md-row-height="1:2" | orderBy : 'post_title'-->
                <md-grid-list
                layout-align="start start"
                class="md-primary md-hue-1 gallery-directive-grid"
                md-cols-xs="1" md-cols-sm="{{gridItemsMobile}}" md-cols-md="{{gridItemsDesktop}}" md-cols-gt-md="{{gridItemsDesktopWide}}"
                md-row-height-gt-md="3:4" md-row-height="3:4"
                sm-gutter="20px" md-gutter="15px" md-gutter-gt-sm="8px" >
        
                    <md-grid-tile class="green"
                        layout-align="center start"
                        data-term-id="{{value.post_title}"
                        data-insectType-id="{{value.post_title}}"
                        data-product-id="{{value.post_title}"
                        data-productType-id="{{value.post_title}"
                        md-rowspan="1" md-colspan="1" md-colspan-sm="1" md-colspan-xs="1"
                        data-ng-repeat="(key, value) in gridItems track by $index  ">

                        <md-card class="gallery-card" >
                            <?php /** /?>
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
                            <img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption" />
                            <?php /**/?>
                            <img data-ng-click="showImage()" data-ng-if="!value.image" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption" />
                            <img data-ng-click="showImage()" data-ng-if="value.image" data-ng-src="value.image" class="md-card-image" alt="image caption" />
                            <?php /** /?>
                            <!-- -->
                            <md-card-title data-ng-if="isWidget == 'false'">
                                <md-card-title-text>
                                <span class="md-headline">{{value.post_title}}</span>
                                <span class="md-subhead">Card subheader</span>
                                </md-card-title-text>
                            </md-card-title>
                            <!-- -->
                            <?php /**/?>
                            
                            <md-card-content>
                                <p style="text-align:center;color:#14A774;font-size:14px;font-weight:bold;">
                                    <span class="">{{value.post_title}}</span><!--{{value.post_content | trunk8:100}}-->
                                </p>
                            </md-card-content>
                            <md-card-actions layout="row" layout-align="center center">
                                <md-button data-ng-click="goTo(value.post_name)" class="md-primary md-raised md-cornered md-hue-1 primary-cta">VIEW MORE</md-button>
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

                

            </md-content>

        </div>   
	</div>
