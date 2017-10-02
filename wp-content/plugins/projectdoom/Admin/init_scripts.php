<?php
#------------------------------------------------
# Remove default scripts
#------------------------------------------------
add_action('wp_enqueue_scripts', 'remove_script');

function remove_script(){
    // wp_dequeue_script( 'wp-emoji-release.min.js' );
}

function doom_footer_inline_js_ini () {

	global $post, $is_IE;
  if ( check_user_role('administrator') )
    { ?>

      <script id="theSource" type="text/javascript" data-main="<?php echo plugins_url('../doom-app/assets/js/init', __FILE__);?>" src="<?php echo plugins_url('../doom-app/assets/libs/require.min.js', __FILE__);?>"></script>

      <?php
    } else { ?>

      <script id="theSource" type="text/javascript" data-main="<?php echo plugins_url('../doom-app/assets/js/init', __FILE__);?>" src="<?php echo plugins_url('../doom-app/assets/libs/require.min.js', __FILE__);?>"></script>

      <?php
    };

}
add_action( 'wp_footer', 'doom_footer_inline_js_ini');


#------------------------------------------------
# Reegister CSS files
#------------------------------------------------
add_action( 'wp_enqueue_scripts', 'register_plugin_styles' );

/**
 * Register style sheet.
 */
function register_plugin_styles() {
	wp_register_style( 'material', "https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css" );
	wp_register_style( 'app', plugins_url( '../doom-app/assets/css/app.css', __FILE__ ) );
	wp_register_style( 'customStyle', plugins_url( '../doom-app/assets/css/custom.min.css', __FILE__ ) );
  wp_register_style( 'icons', plugins_url( '../doom-app/assets/libs/LinearIcons/style.css', __FILE__ ) );
  wp_register_style( 'material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons' );
  wp_register_style( 'montserrat-fonts', 'https://fonts.googleapis.com/css?family=Montserrat:300,700' );
  

	wp_enqueue_style( 'material' );
	wp_enqueue_style( 'app' );
	wp_enqueue_style( 'customStyle' );
  wp_enqueue_style( 'icons' );
  wp_enqueue_style( 'material-icons' );
  wp_enqueue_style( 'montserrat-fonts' );
  
}
#------------------------------------------------
# Remove emojis
#------------------------------------------------
function disable_emojis() {
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
}
add_action( 'init', 'disable_emojis' );

/**
* Filter function used to remove the tinymce emoji plugin.
*
* @param array $plugins
* @return array Difference betwen the two arrays
*/
function disable_emojis_tinymce( $plugins ) {
if ( is_array( $plugins ) ) {
return array_diff( $plugins, array( 'wpemoji' ) );
} else {
return array();
}
}

/**
* Remove emoji CDN hostname from DNS prefetching hints.
*
* @param array $urls URLs to print for resource hints.
* @param string $relation_type The relation type the URLs are printed for.
* @return array Difference betwen the two arrays.
*/
function disable_emojis_remove_dns_prefetch( $urls, $relation_type ) {
if ( 'dns-prefetch' == $relation_type ) {
/** This filter is documented in wp-includes/formatting.php */
$emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );

$urls = array_diff( $urls, array( $emoji_svg_url ) );
}

return $urls;
}
?>
