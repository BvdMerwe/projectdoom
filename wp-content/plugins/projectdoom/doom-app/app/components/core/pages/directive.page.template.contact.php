<?php
/**
* Displays Contact Page Content
*
* @package WordPress
* @subpackage Twenty_Seventeen
* @since 1.0
* @version 1.0
*/
?>
		
			
        
<div class="animate-page-switch-container" layout-fill>

    <!-- [HERO SECTION] -->
    <div layout="row" flex-order="2" flex-order-gt-sm="1">
        <div flex="grow" class="">
            <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
            <p flex="100"  class="page-content-copy">{{pageContent.post_content}}</p>
        </div>
    </div>
    <br/>
    <br/>
    <!-- [/HERO SECTION] -->


    <!-- [BODY SECTION] -->

    <div flex="grow" layout-fill  flex-order="1" flex-order-gt-sm="2">

        <div data-ui-form-contact layout-fill flex="100 md-whiteframe-7dp"></div>
                        
    </div>

    <!-- [/BODY SECTION] -->

    <!--<div data-ng-transclude flex="100" ></div>-->

</div>
			
		