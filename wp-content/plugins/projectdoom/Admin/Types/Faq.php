<?php // FAQ Post Type

function post_type_faq() {

#-----------------------------------------------------------------
#
#	FAQ Post Type(s)
#
#-----------------------------------------------------------------

	register_post_type('faq', array(
		'labels' 				=> array('name' => __('FAQs'), 'singular_label' => __('FAQ'), 'add_new_item' => __('Add FAQ'), 'search_items' => __('Search FAQs'),'edit_item' => __('Edit FAQ')),
		'public' 				=> true,
		'exclude_from_search' 	=> false,
		'show_ui' 				=> true,
		'show_in_nav_menus' 	=> true,
		'_builtin' 				=> false,
		'_edit_link' 			=> 'post.php?post=%d',
		'capability_type' 		=> 'post',
		'hierarchical' 			=> false,
		'rewrite' 				=> array("slug" => "faq"),
		'menu_position' 		=> 20,
		'with_front' 			=> false,
		//'menu_icon' 			=> get_bloginfo('template_directory').'/inc/images/people.png',
		'supports' 				=> array('title', 'excerpt', 'thumbnail', 'editor')
	));


#-----------------------------------------------------------------
#
#	Custom Taxonomy
#
#-----------------------------------------------------------------
  register_taxonomy('faq_categories', array('show_in_nav_menus' => false, 'hierarchical' => true, 'labels' => array('name' => __('FAQ Categories'), 'singular_label' => __('FAQ Category'), 'add_new_item' => __('Add New FAQ Category'), 'search_items' => __('Search FAQ Categories')), 'rewrite' => array('slug' => 'faq-categories')));


}

?>
