<?php
/**
* Displays Page Content Template
*
* @package WordPress
* @subpackage Twenty_Seventeen
* @since 1.0
* @version 1.0
*/
?>
		<div layout="row" layout-fill layout-xs="column" flex="100">
			<md-content class="" flex="100">
				<div layout="column" class="animate-page-switch-container" data-ng-switch="renderPath[0]" flex="100">

                    <?php // layout options based on columns, hero section etc. ?>
					
                    <!-- -->
					<div layout="row" class="animate-page-switch" layout-xs="column" flex="100" layout-wrap data-ng-switch-default>

                        <div flex="grow">
                            <h1 flex="100">{{pageContent.post_title}}</h1>
                        </div>
                        <div flex="grow">
                            <div flex="100">
                                <p>{{pageContent.post_content}}</p>
                            </div>
                        </div>
                        <div flex="grow">
                            <div data-ng-transclude flex="100" >
                               
                            </div>
                        </div>
                    
					</div>
                    <!-- --> 

				</div>
			</md-content>
		</div>