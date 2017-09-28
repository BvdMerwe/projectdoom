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
	<div layout="column">
		<div layout="row" layout-xs="column" >

			<md-content class="md-padding" flex-xs="100" flex="60" flex-order-xs="2">

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
                                <div ng-message="md-maxlength">Your first name must be less than 30 characters long.</div>
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
                                <div ng-message="md-email">Please provide us with a valid email address.</div>
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
                            
                            data-ng-model="formInputs.message" md-maxlength="150" 
                            rows="5" md-select-on-focus>
                        </textarea>
                    </md-input-container>

                    <md-input-container md-no-float class="md-block"></md-input-container>

                    <md-input-container class="md-block" layout-align="end center">
                        <md-button type="submit" data-ng-click="save()">Send</md-button>
                    </md-input-container>

                </form>

                <div data-ng-transclude></div>

            </md-content>
            <md-content class="md-padding" flex-xs="100" flex="40" flex-order-xs="1" style="background-color:#7B7B7A;color:#ffffff;">

                <h3>CONTACT INFORMATION</h3>

                <p><md-icon svgIcon="thumbs-up"></md-icon>Lorem ipsum dolor sit amet, consectetur.</p>

                <p><md-icon ng-style="{color: #fff;}">home</md-icon>&nbsp;011 900 2000</p>

                <p><md-icon>home</md-icon>&nbsp;Lorem@ipsum.co.za.</p> 

            </md-content>

        </div>   
	</div>
