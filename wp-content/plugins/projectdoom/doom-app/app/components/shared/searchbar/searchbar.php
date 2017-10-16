<?php
/**
 * Displays for app search bar
 *
 * @package WordPress
 * @subpackage doom
 * @since 1.0
 * @version 1.0
 */

?>

<div layout="column" class="searchbar-container" layout-fill>
  <div class="search-bar">
    <md-autocomplete
          flex="100"
          md-selected-item="selectedItem"
          md-search-text-change="searchTextChange(searchText)"
          md-search-text="searchText"
          md-selected-item-change="selectedItemChange(item)"
          md-items="item in results"
          md-item-text="item.post_title"
          md-min-length="3"
          md-delay="200"
          placeholder="{{placeholder}}">
        <md-item-template>
          <span md-highlight-text="searchText" md-highlight-flags="^i">{{item.post_title}}</span>
        </md-item-template>
        <md-not-found>
          Press enter to search.
        </md-not-found>
      </md-autocomplete>
    <!-- <span class="icon lnr lnr-magnifier"></span> -->
  </div>
  <md-content class="search-results">
    <!-- <div layout="column" class="result" data-ng-repeat="result in results">
      <span>{{result.post_title}}</span>
      <span>{{result.post_content}}</span>
    </div> -->
    <md-list class="search-results">
      <ang-accordion one-at-a-time="true" icon-position="right" close-icon-class="icon-chevron-right" open-icon-class="icon-chevron-down">  
        <md-list-item class="md-3-line result" ng-repeat="result in results">
          <div ng-click="navigate(result.post_type, result.post_name)" layout="row" flex="100" class="search-result" ng-if="result.post_type !== 'faq'">
            <img ng-if="result.image" ng-src="{{result.image}}" class="md-avatar" >
            <div class="md-list-item-text">
              <h3>{{result.post_title}}</h3>
              <p>
                {{result.post_content | limitTo:130}}...
              </p>
            </div>
          </div>
          <collapsible-item title="{{result.post_title}}" ng-if="result.post_type == 'faq'">
            <div>
              <p ng-bind-html="result.post_content | trustAsHtml"></p>
            </div>
          </collapsible-item>
        </md-list-item>

      </ang-accordion>  
    </md-list>
</md-content>
</div>
