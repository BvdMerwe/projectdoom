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
		
			
        
<div layout="column" class="animate-page-switch-container" flex="100" layout-fill>

    <div layout="row" layout-align="center center">
        <div flex="60" style="text-align:center;">
            <img data-ng-click="showImage()" data-ng-src="https://via.placeholder.com/500" class="md-card-image" alt="image caption">
        </div>
        <div flex="40">
            <!-- [HERO SECTION] -->
            <div layout="row">
                <div flex="grow" class="md-padding">
                    <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
                </div>
            </div>
            <!-- [/HERO SECTION] -->


            <!-- [BODY SECTION] -->

            <div flex="grow" class="md-padding page-content-copy">

                <p flex="100" class="">{{pageContent.post_content}}</p>
                                
            </div>

            <!-- [/BODY SECTION] -->

            <!--<div data-ng-transclude flex="100" ></div>-->
        </div>
    </div>

</div>
			
		