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
		<span class="carousel-control left lnr lnr-chevron-left-circle" ng-click="goLeft($event)"></span>
		<span class="carousel-control right lnr lnr-chevron-right-circle" ng-click="goRight($event)"></span>
	</div>
	<div class="carousel">
		<md-grid-list
			md-row-height="{{maxHeight}}"
			md-gutter="12px" md-gutter-gt-sm="8px" md-cols="{{itemLength}}" style="width:1000%;width:calc({{maxWidth}} * {{itemLength}});margin: 0 auto;">
			<md-grid-tile data-ng-repeat="item in items" style="border: 1px solid #d9dadb;">
				<div class="bg-box" style="padding: 10px;">
					<div class="bg-image" style="background: url('{{item.image}}') center center no-repeat; background-size: contain;"></div>
				</div>
			</md-grid-tile>
		</md-grid-list>
</div>
</div>
