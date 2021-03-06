<?php
/**
 * Main Display Page for app
 *
 * @package WordPress
 * @subpackage doom
 * @since 1.0
 * @version 1.0
 */
?>
<?php get_header(); ?>
        <!--[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
		<![endif]-->

		<div data-ui-preloader></div>

        <div flex data-ui-app-activity class="app-dashboard" layout="column" layout-align=""></div>

<?php get_footer(); ?>
