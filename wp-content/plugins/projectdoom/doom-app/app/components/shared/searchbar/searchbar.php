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

<div layout="column" class="searchbar-container">
  <div layout="column" class="search-bar">
    <md-autocomplete
          md-selected-item="selectedItem"
          md-search-text-change="searchTextChange(searchText)"
          md-search-text="searchText"
          md-selected-item-change="selectedItemChange(item)"
          md-items="item in querySearch(searchText)"
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
  <div class="search-results">
    <!-- <div layout="column" class="result" data-ng-repeat="result in results">
      <span>{{result.post_title}}</span>
      <span>{{result.post_content}}</span>
    </div> -->
    <md-list layout-padding class="search-results">
        <md-list-item class="md-3-line result" ng-repeat="result in results">
            <img ng-src="{{result.image}}" class="md-avatar" >
            <div class="md-list-item-text">
              <h3>{{result.post_title}}</h3>
              <p>
                {{result.post_content | limitTo:130}}...
              </p>
            </div>
        </md-list-item>
      </md-list>
  </div>
</div>
