<?php
/**
 * Display Contact Content
 *
 * @package WordPress
 * @subpackage Doom
 * @since 1.0
 * @version 1.0
 */

?>
	<div layout="column" layout-align="center center" flex="100"> 
		<div layout="row" layout-fill layout-md="column" >

			<div class="md-padding" flex-md="100" flex="60" flex-order-xs="2" style="background-color:#ffffff;">

                <form id="formContact" name="userForm" novalidate>

                    <div layout-gt-sm="row">
                        <md-input-container class="md-block" flex-gt-sm>
                            <label for="name">Your Name</label>
                            <input
                                name="name"
                                required
                                md-maxlength="30"
                                data-ng-model="formInputs.firstName">
                            <div ng-messages="formContact.firstName.$error">
                                <div ng-message="required">Please provide us with a first name.</div>
                                <!--<div ng-message="md-maxlength">Your first name must be less than 30 characters long.</div>-->
                            </div>
                        </md-input-container>

                        <md-input-container class="md-block" flex-gt-sm>
                            <label for="email">Email Address</label>
                            <input 
                                type="email"
                                name="email"
                                required
                                
                                data-ng-model="formInputs.emailAddress"
                                minlength="10"  data-ng-pattern="/^.+@.+\..+$/" >
                            <div ng-messages="formContact.emailAddress.$error">
                                <div ng-message="required">Please provide us with an email address.</div>
                                <!--<div ng-message="md-email">Please provide us with a valid email address.</div>-->
                            </div>
                        </md-input-container>
                    </div>

                    <md-input-container md-no-float class="md-block"></md-input-container>

                    <div layout-gt-xs="row">
                        <md-input-container class="md-block" flex-gt-xs>
                            <label for="phone">Phone</label>
                            <input 
                                name="phone"
                                type="tel"
                                required
                                
                                data-ng-model="formInputs.phone"
                                minlength="10" maxlength="100">
                            <div ng-messages="formContact.phone.$error">
                                <div ng-message="required">Please provide us with a contact number.</div>
                            </div>
                        </md-input-container>

                        <md-input-container class="md-block" flex-gt-xs>
                            <label for="company">Company</label>
                            <input 
                                name="company"
                                data-ng-model="formInputs.company">
                            <div ng-messages="formContact.company.$error">
                                <div ng-message="md-maxlength">Your company name must be less than 100 characters long.</div>
                            </div>
                        </md-input-container>
                    </div>

                    <md-input-container md-no-float class="md-block"></md-input-container>

                    <md-input-container class="md-block">
                        <label for="message">Message</label>
                        <textarea 
                            name="message"
                            required
                            maxlength="255"
                            data-ng-model="formInputs.message" md-maxlength="255" 
                            rows="5" md-select-on-focus>
                        </textarea>
                    </md-input-container>

                    <md-input-container md-no-float class="md-block"></md-input-container>

                    <md-input-container class="md-block" layout-align="end center">
                        <!--<button type="button" class="md-button" data-ng-submit="save()">Send</button>-->
                        <md-button type="button" data-ng-click="submitForm()" class="primary-cta">Send</md-button>
                    </md-input-container>

                </form>

                <div data-ng-transclude></div>

            </div>
            <div class="" flex-md="100" flex="40" flex-order-xs="1" style="background-color:#7B7B7A;color:#ffffff;">
                <div data-ui-google-map
                    data-map
					zoom="10" 
					center="[-26.0752982, 28.0242038]"
					scrollwheel = "false"
					disable-default-u-i="false"
					disable-double-click-zoom="false"
					draggable="true"
					draggable-cursor="help"
					dragging-cursor="move"
					navigationControl ="true"
					keyboard-shortcuts="false"
					max-zoom="20"
					min-zoom="6"
                    tilt="45"
                    flex-order-xs="2"
                    style="color:#444;text-align:center;padding:0;"
                    map-type-id="ROADMAP"></div>
                <div class="md-padding" flex-order-xs="1">
                    <h3 style="margin-top:5px;">CONTACT INFORMATION</h3>

                    <p><i class="lnr lnr-map-marker"></i>&nbsp;&nbsp;Tiger Brands Limited,<br />3010 William Nicol Drive, Bryanston<br />2021.</p>

                    <p><i class="lnr lnr-phone"></i>&nbsp;&nbsp;0860 101 107</p>

                    <p><i class="lnr lnr-inbox"></i>&nbsp;&nbsp;<a href="mailto:tigercsd@tigerbrands.com" style="text-decoration:none;color:#fff;">tigercsd@tigerbrands.com</a></p> 
                    <br /><br />
                </div>
                
            </div>

        </div>   
	</div>
