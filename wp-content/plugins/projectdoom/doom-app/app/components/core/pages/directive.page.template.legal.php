<?php
/**
* Displays Legal Page Content
*
* @package WordPress
* @subpackage Twenty_Seventeen
* @since 1.0
* @version 1.0
*/
?>
		
			
        
<div layout="column" class="animate-page-switch-container" flex="100">
<div style="max-width: 800px; margin: 0 auto;text-align: justify;">
    <!-- [HERO SECTION] -->
    <div layout="row">
        <div flex="grow" class="">
            <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
            
        </div>
    </div>
    <!-- [/HERO SECTION] -->


    <!-- [BODY SECTION] -->

    <div flex="grow" class=" page-content-copy">

        <p flex="100" ng-bind-html="pageContent.post_content | trustAsHtml"></p>
                        
    </div>

    <!-- [/BODY SECTION] -->

    <!--<div data-ng-transclude flex="100" ></div>-->

</div>
			

</div>