<?php
/*
Plugin Name: Project DOOM API
Description: API and front-end Modifications for DOOM app.
Author: Hunt Lascaris
Version: 0.1a
Author URI: http://www.tbwa-africa.com/
*/

if ( ! defined( 'ABSPATH' ) ){
  echo "Look at you being sneaky. Nothing to see here.";
  exit; // Exit if accessed directly
}


#-----------------------------------------------------------------------------------*/
#	Add API routes
#-----------------------------------------------------------------------------------*/
require_once("Admin/api_routes.php");

#-----------------------------------------------------------------------------------*/
#	Add Custom Post types and meta-keys
#-----------------------------------------------------------------------------------*/
require_once("Admin/custom_post_types.php");
require_once("Admin/meta_options.php");

#-----------------------------------------------------------------------------------*/
#	Remove default WP stuff
#-----------------------------------------------------------------------------------*/

// Removes from post and pages
add_action('admin_menu','remove_menu_items');

function my_remove_admin_menus() {
    remove_menu_page( 'edit-comments.php' );
    	remove_menu_page('edit.php');
    	// remove_menu_page('edit.php?post_type=page');
    	remove_menu_page('themes.php');
}
//Removes comments
add_action('init', 'remove_comment_support', 100);

function remove_comment_support() {
    remove_post_type_support( 'post', 'comments' );
    remove_post_type_support( 'page', 'comments' );
}
// Removes from admin bar
function mytheme_admin_bar_render() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}
add_action( 'wp_before_admin_bar_render', 'mytheme_admin_bar_render' );

#-----------------------------------------------------------------------------------*/
#	Initialise JS
#-----------------------------------------------------------------------------------*/
require_once("Admin/init_scripts.php");

#-----------------------------------------------------------------------------------*/
#	Register new templates
#-----------------------------------------------------------------------------------*/
add_filter( 'template_include', 'home_page_template', 99 );

function home_page_template( $template ) {

	if ( is_front_page()  ) {
		$new_template = str_replace(get_site_url()."/",'',plugins_url('doom-app/index.php', __FILE__));
		if ( '' != $new_template ) {
			return $new_template;
		}
	} else if ( get_footer() ) {
    $new_template = locate_template(plugins_url('doom-app/footer.php', __FILE__));
		if ( '' != $new_template ) {
			return $new_template;
		}
  }
	return $template;
}

// add_action('wp', function(){
//     // Allow viewing of home/front_page
//     if(is_home() or is_front_page() ) return;
//     wp_redirect(get_site_url().'/#!#/404/', 302);
//     die;
// });
#-----------------------------------------------------------------------------------*/
# Custom Functions
#-----------------------------------------------------------------------------------*/
#	Checks if a particular user has a role.
#	Returns true if a match was found.
#
#	@param string $role Role name.
#	@param int $user_id (Optional) The ID of a user. Defaults to the current user.
#
#	@return bool
#
#-----------------------------------------------------------------
function check_user_role( $role, $user_id = null ) {

	if ( is_numeric( $user_id ) )
		$user = get_userdata( $user_id );
	else
		$user = wp_get_current_user();

	if ( empty( $user ) )
		return false;

	return in_array( $role, (array) $user->roles );
}
?>
