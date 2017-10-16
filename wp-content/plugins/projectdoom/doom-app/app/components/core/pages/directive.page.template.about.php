<?php
/**
* Displays About Page Content
*
* @package WordPress
* @subpackage Twenty_Seventeen
* @since 1.0
* @version 1.0
*/
?>
		
			
        
<div layout="column" layout-fill class="animate-page-switch-container" flex="100" layout-fill>

    <div layout="row" layout-fill layout-align="start start" layout-align-gt-sm="center center">
        <div flex="60" layout-fill hide show-gt-sm style="text-align:center;">
            <img data-ng-click="showImage()" layout-fill data-ng-if="pageContent.image" data-ng-src="{{pageContent.image}}" class="md-card-image" alt="" style="width:auto;" />
        </div>
        <div flex="100" flex-gt-sm="40">
            <!-- [HERO SECTION] -->
            <div layout="row">
                <div flex="grow" class="">
                    <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
                </div>
            </div>
            <!-- [/HERO SECTION] -->


            <!-- [BODY SECTION] -->

            <div flex="grow" class="page-content-copy">

                <p flex="100" class="">{{pageContent.post_content}}</p>
                                
            </div>

            <!-- [/BODY SECTION] -->

            <!--<div data-ng-transclude flex="100" ></div>-->
        </div>
    </div>

</div>
			
		