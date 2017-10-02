<?php // Custom Post Types

require_once("Types/Insect.php");
require_once("Types/Product.php");
require_once("Types/Retailer.php");
require_once("Types/Package.php");
require_once("Types/Faq.php");

function post_type_doom() {

  //call custom post types
  post_type_insect();
  post_type_product();
  post_type_retailer();
  post_type_package();
  post_type_faq();


	register_taxonomy('season', array('insect','product'), array('show_in_nav_menus' => false, 'hierarchical' => true, 'labels' => array('name' => __('Seasons'), 'singular_label' => __('Season'), 'add_new_item' => __('Add New Season'), 'search_items' => __('Search Seasons')), 'rewrite' => array('slug' => 'season')));
  register_taxonomy('insect_categories', array('insect','product'), array('show_in_nav_menus' => true, 'hierarchical' => true, 'labels' => array('name' => __('Insect Categories'), 'singular_label' => __('Insect Category'), 'add_new_item' => __('Add New Insect Category'), 'search_items' => __('Search Insect Categories')), 'rewrite' => array('slug' => 'insect-type')));


	//GETTING FEAT. IMAGEs
	function fids_get_featured_image($postID) {
		$post_thumbnail_id = get_post_thumbnail_id($postID);
		if ($post_thumbnail_id) {
			$post_thumbnail_img = wp_get_attachment_image_src($post_thumbnail_id, 'small-square-thumb', true);
			return $post_thumbnail_img[0];
		}
	}
}
add_action('init', 'post_type_doom');

#-----------------------------------------------------------------
#
#	CUSTOM TAX FILTER FOR CUSTOM POST TYPES
#
#-----------------------------------------------------------------
function my_restrict_manage_posts() {
    global $typenow;
    $args=array( 'public' => true, '_builtin' => false );
    $post_types = get_post_types($args);
    if ( in_array($typenow, $post_types) ) {
    $filters = get_object_taxonomies($typenow);
        foreach ($filters as $tax_slug) {
            $tax_obj = get_taxonomy($tax_slug);
            wp_dropdown_categories(array(
                'show_option_all' => __('Show All '.$tax_obj->label ),
                'taxonomy' => $tax_slug,
                'name' => $tax_obj->name,
                'orderby' => 'term_order',
                'selected' => $_GET[$tax_obj->query_var],
                'hierarchical' => $tax_obj->hierarchical,
                'show_count' => false,
                'hide_empty' => true
            ));
        }
    }
}
function my_convert_restrict($query) {
    global $pagenow;
    global $typenow;
    if ($pagenow=='edit.php') {
        $filters = get_object_taxonomies($typenow);
        foreach ($filters as $tax_slug) {
            $var = &$query->query_vars[$tax_slug];
            if ( isset($var) ) {
                $term = get_term_by('id',$var,$tax_slug);
                $var = $term->slug;
            }
        }
    }
}
add_action('restrict_manage_posts', 'my_restrict_manage_posts' );
add_filter('parse_query','my_convert_restrict');

?>
