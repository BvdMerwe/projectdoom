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

<div layout="column" class="randomstat">
  <div ng-if="show.length == 1 && ishome == 'true'">
    <p style="max-width: 100%" ng-repeat="s in show">
      Every {{s.time}} days, <strong>a single {{s.insect}}</strong> can {{s.stats[randStat].firstPart}} up to <span style="text-transform:uppercase;font-weight:bolder;">{{s.stats[randStat].show  | shortNumber}} {{s.stats[randStat].secondPart}}</span> in your home.
    </p>
  </div>
  <div ng-if="show.length && !ishome">
    <p style="max-width: 500px" ng-repeat="s in show">
      Every {{s.time}} days, <strong>a single {{s.insect}}</strong> can {{s.stats[randStat].firstPart}} up to<br/>
      <span style="text-transform:uppercase;font-size: 6.625em; line-height: 1em;font-weight:bolder;">{{s.stats[randStat].show  | shortNumber}}<br/>
        {{s.stats[randStat].secondPart}}</span><br/>
      in your home.
    </p>
  </div>
  <div class="" ng-if="show.length > 1 && !ishome">
    <!--
    <h1>Since you first visited</h1>
    <p>{{time}} ago</p>
    -->
    <md-slider flex class="md-primary" md-discrete data-ng-model="dynamic.amount" step="1" min="1" max="1000" aria-label="slider"></md-slider>
    
    <div ng-repeat="s in show">
      <p style="max-width: 100%;">
        <strong>{{dynamic.amount}} {{s.insect}}</strong> will have {{s.stats[randStat].pastFirst}} up to
        <span style="text-transform:uppercase;font-size: 1.125em; line-height: 1em;font-weight:bolder;">{{s.stats[randStat].show  | shortNumber}}
          </span>{{s.stats[randStat].pastSecond}}
        in your home.
      </p>
    </div>

  </div>
</div>
