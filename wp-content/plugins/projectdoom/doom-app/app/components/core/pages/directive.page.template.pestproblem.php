                        <div flex="100" flex-gt-sm="50" class="home-copy-content" flex-order="2" flex-order-gt-sm="1"  layout="column" style="text-align:center;">
							
							<div class="" layout="column" style="text-align:center;">
								
								<h1 class="page-title" style="margin-top:50px;text-align:left;font-size:35pt;">What's Bugging you?</h1> 
								<span class="hr-divider" style=""></span>
								<p class="page-description" style="margin-bottom:30px;text-align:left;">{{pageContent.post_content}}</p>
								
							</div>
							<?php /**/ ?>
							<div class="insect-filter-categories center-content mobile-padding" style="" layout-gt-sm="row" layout-align-gt-sm="center center" >
								<md-button
									class="md-button primary-tag"
									style=""
									data-ng-click="filterInsects('flying')"
									data-ng-class="{active: pageContent.filter_type == 'flying'}">
									Flying
								</md-button>
								<md-button
									class="md-button primary-tag"
									style=""
									data-ng-click="filterInsects('crawling')"
									data-ng-class="{active: pageContent.filter_type == 'crawling'}">
									Crawling
								</md-button>
								<md-button
									class="md-button primary-tag "
									data-ng-click="filterInsects('all')"
									style=""
									data-ng-class="{active: pageContent.filter_type == 'all'}">
									All
								</md-button>
							</div> 
							<?php /**/?>
							<div class="center-content" style="width:100%;"  layout-gt-sm="row" layout-align-gt-sm="center center" style="margin:40px auto;text-align:center;">
								<ul class="product-insects home-activity" insect-type="all"> 
									<li data-ng-class="{active: pageContent.insect_cockroach == true, stat: activeInsect.post_name == 'cockroach'}" class="icon-insect-cockroach" title="Cockroaches">
										<button type="button" data-ng-disabled="!pageContent.insect_cockroach" class="md-btn" data-ng-click="whatsBuggin('cockroach')">
											<i class="icon-cockroach"></i>
											<br />
											<p>Cockroaches</p>
										</button>
									</li>
									<li data-ng-class="{active: pageContent.insect_fly == true, stat: activeInsect.post_name == 'fly'}" class="icon-insect-fly" title="Flies">
										<button type="button" data-ng-disabled="!pageContent.insect_fly" class="md-btn" data-ng-click="whatsBuggin('fly')">	
											<i class="icon-fly"></i>
											<br />
											<p>flies</p>
										</button>
									</li>
									<li data-ng-class="{active: pageContent.insect_mosquito == true, stat: activeInsect.post_name == 'mosquito'}" class="icon-insect-mosquito" title="Mosquitoes">
										<button  data-ng-disabled="!pageContent.insect_mosquito" type="button" class="md-btn"  data-ng-click="whatsBuggin('mosquito')">
											<i class="icon-mosquito"></i>
											<br />
											<p>Mosquitoes</p>
										</button>
									</li>
									<li data-ng-class="{active: pageContent.insect_ant == true, stat: activeInsect.post_name == 'ant' }" class="icon-insect-ant" title="Ants">
										<button type="button" data-ng-disabled="!pageContent.insect_ant" class="md-btn" data-ng-click="whatsBuggin('ant')">
											<i class="icon-ant"></i>
											<br />
											<p>Ants</p>
										</button>
									</li>
									<li data-ng-class="{active: pageContent.insect_fishmoth == true, stat: activeInsect.post_name == 'fishmoth'}" class="icon-insect-fishmoth" title="Fishmoths">
										<button type="button" data-ng-disabled="!pageContent.insect_fishmoth" class="md-btn" data-ng-click="whatsBuggin('fishmoth')">
											<i class="icon-fishmoth"></i>
											<br />
											<p>fishmoths</p>
										</button>
									</li>
									<li data-ng-class="{active: pageContent.insect_flea == true, stat: activeInsect.post_name == 'flea'}" class="icon-insect-flea" title="Fleas">
										<button type="button" data-ng-disabled="!pageContent.insect_flea" class="md-btn" data-ng-click="whatsBuggin('flea')">
											<i class="icon-flea"></i>
											<br />
											<p>fleas</p>
										</button>
									</li>
								</ul>
							</div>
							<div class="" layout="column">
								
								<div layout-gt-sm="row" layout-fill layout-align="center center" style="margin:50px auto;margin-bottom:0;">

                                    <ui-randomstat id="home-page-stat" ishome="true" active-insect="{{activeInsect.post_name}}" duration="3000"></ui-randomstat>
                                    <!--<ui-randomstat  layout="column" flex="100" timer="true"></ui-randomstat>-->

                                </div>
								

                            </div>
                            <div class="" layout="column" style="" layout-align="center center">
								
                                <md-button ng-click="goto(activeInsect.post_name)" class="md-primary primary-cta" style="padding:10px 45px;font-size:30px;margin: 44px 0;width:300px;">start</md-button>

							</div>

						</div>
						<div class="home-image" flex="100" flex-offset-gt-sm="10" flex-gt-sm="40" flex-order="1" flex-order-gt-sm="2" class="" style="" layout-align="center center">
							<img data-ng-src="{{activeInsect.image}}" data-ng-if="activeInsect.image" data-ng-click="" flex="100" class="super-bug-image" alt="" style="position:relative;left:0;top:0;" />
						</div>