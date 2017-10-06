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
		
			
        
<div layout="column" class="animate-page-switch-container" flex="100">

    <!-- [HERO SECTION] -->
    <div layout="row">
        <div flex="grow" class="">
            <h1 flex="100" class="page-title">{{pageContent.post_title}}</h1>
            <p flex="100"  class="page-content-copy">{{pageContent.post_content}}</p>
        </div>
    </div>
    <!-- [/HERO SECTION] -->


    <!-- [BODY SECTION] -->

    <div flex="grow">

        <div data-ui-form-contact flex="100 md-whiteframe-7dp"></div>
                        
    </div>

    <!-- [/BODY SECTION] -->

    <!--<div data-ng-transclude flex="100" ></div>-->

</div>
			
		