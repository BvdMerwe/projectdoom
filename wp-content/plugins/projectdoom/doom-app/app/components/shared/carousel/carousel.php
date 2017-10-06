<?php
/**
 * Displays for app carousel
 *
 * @package WordPress
 * @subpackage doom
 * @since 1.0
 * @version 1.0
 */

?>
<md-toolbar class="md-hue-1 toolbar-filter" data-ng-if="showFilter">
	<div class="md-toolbar-tools" layout-align="start start" style="border-bottom:2px solid #14A774;">
		<md-button 
			class="md-primary md-hue-3 btn-filter active-filter" 
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
			data-ng-if="contentType == 'insect'"
			data-ng-if="value.name == 'Flying' || value.name == 'Crawling'"
			data-ng-repeat="(key, value) in insectFilterCategories">
				{{value.name}}
		</md-button>
		<md-button 
			md-no-ink
			class="md-primary md-hue-2 btn-filter" 
			aria-label="" 
			data-filter-id="{{value.term_id}}"
			data-ng-click="filter($event, value.term_id)"
			data-ng-if="contentType == 'product'"
			data-ng-repeat="(key, value) in filterCategories">
				{{value.name}}
		</md-button>
	</div>
</md-toolbar>
<div ng-transclude></div>
<div layout="column" class="carousel-container" style="display: {{isSingle ? 'inline-block' : 'block'}};">
	<div class="controls" ng-if="itemLength > 0">
		<span class="carousel-control left icon-chevron-left" ng-click="goLeft($event)"></span>
		<span class="carousel-control right icon-chevron-right" ng-click="goRight($event)"></span>
	</div>
	<div class="carousel">
		<div class="list" style="<?php //height:{{maxHeight}};?>width:1000%;width:calc(({{maxWidth}} * {{itemLength}}) + ({{gutter}} * {{itemLength -1}}));">
			<div class="item" style="width:{{maxWidth}}" data-ng-repeat="item in items">
				<div>
					<div class="bg-box" style="max-height:calc({{maxHeight}} - 85px);">
						<!-- <div class="bg-image" style="height:calc({{maxHeight}} - 85px);background: url('{{item.image}}') center bottom no-repeat; background-size: contain;"></div> -->
						<img class="image" ng-src="{{item.image}}" style="max-height:calc({{maxHeight}} - 85px)" ng-click="goto(contentType, item.post_name)" />
					</div>
					<div class="carousel-item-name" ng-if="displayName">{{item.post_title}}</div>
					<div class="cta" ng-if="cta">
						<md-button class="primary-cta fill-width" ng-click="goto(contentType, item.post_name)">View&nbsp;More</md-button class="primary-cta">
					</div>
				</div>
			</div>
		</div>
</div>
</div>
