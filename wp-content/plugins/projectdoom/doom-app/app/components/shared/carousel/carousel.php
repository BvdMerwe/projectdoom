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

<div layout="column" class="carousel-container">
	<div class="controls" ng-if="itemLength > 0">
		<span class="carousel-control left lnr lnr-chevron-left" ng-click="goLeft($event)"></span>
		<span class="carousel-control right lnr lnr-chevron-right" ng-click="goRight($event)"></span>
	</div>
	<div class="carousel">
		<div class="list" style="height:{{maxHeight}};width:1000%;width:calc(({{maxWidth}} * {{itemLength}}) + ({{gutter}} * {{itemLength -1}}));">
			<div class="item" style="width:{{maxWidth}}" data-ng-repeat="item in items">
				<div>
					<div class="bg-box" style="max-height:calc({{maxHeight}} - 85px);">
						<!-- <div class="bg-image" style="height:calc({{maxHeight}} - 85px);background: url('{{item.image}}') center bottom no-repeat; background-size: contain;"></div> -->
						<img class="image" src="{{item.image}}"/>
					</div>
					<div class="carousel-item-name" ng-if="displayName">{{item.post_title}}</div>
					<div class="cta" ng-if="needsCta">
						<button ng-click="goto(contentType, item.post_name)">View&nbsp;More</button>
					</div>
				</div>
			</div>
		</div>
</div>
</div>
