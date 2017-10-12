<?php // FAQ Post Type

function post_type_insect() {

#-----------------------------------------------------------------
#
#	Insect Post Type(s)
#
#-----------------------------------------------------------------

register_post_type('insect', array(
  'labels' => array('name' => __('Insects'), 'singular_label' => __('Insect'), 'add_new_item' => __('Add Insect'), 'search_items' => __('Search Insects'),'edit_item' => __('Edit Insect')),
  'public' => true,
  'exclude_from_search' => false,
  'show_ui' => true,
  'show_in_nav_menus' => false,
  '_builtin' => false,
  '_edit_link' => 'post.php?post=%d',
  'capability_type' => 'post',
  'hierarchical' => false,
  'rewrite' => array("slug" => "insect"),
  'menu_position' => 20,
  'with_front' => true,
  'supports' => array('title', 'editor', 'excerpt', 'thumbnail'),
  'menu_icon' => get_bloginfo('template_directory').'/inc/images/showcase-icon.png',
  'has_archive' => true
));


#-----------------------------------------------------------------
#
#	Custom Taxonomy
#
#-----------------------------------------------------------------
	register_taxonomy('regions', 'insect', array('show_in_nav_menus' => false, 'hierarchical' => true, 'labels' => array('name' => __('Regions'), 'singular_label' => __('Region'), 'add_new_item' => __('Add New Region'), 'search_items' => __('Search Regions')), 'rewrite' => array('slug' => 'region')));

	register_taxonomy('locations', 'insect', array('show_in_nav_menus' => false, 'hierarchical' => true, 'labels' => array('name' => __('Locations'), 'singular_label' => __('Location'), 'add_new_item' => __('Add New Location'), 'search_items' => __('Search Locations')), 'rewrite' => array('slug' => 'location')));
#-----------------------------------------------------------------
#
#	Custom Post Type Admin Layout
#
#-----------------------------------------------------------------
/*************************** Insects Page Layout ***************************/
add_filter("manage_edit-insect_columns", "insect_edit_columns");
add_action("manage_posts_custom_column",  "insect_custom_columns");

function insect_edit_columns($columns){
    $columns = array(
      "cb" => "<input type=\"checkbox\" />",
      "title" => "Title",
      "insect_desc" => "Description",
      "insect_categories" => "Categories",
      "insect_image" => "thumbnail",
      "date" => "Date"
    );

    return $columns;
}

function insect_custom_columns($column){
    global $post;

    switch ($column) {
      case "insect_desc":
        echo the_excerpt();
        break;
      case "insect_categories":
        echo get_the_term_list($post->ID, 'insect_categories', '', ', ', '');
        break;
      case "insect_image":
        // SHOW THE FEATURED IMAGE
        $post_featured_image = fids_get_featured_image($post->ID);

        echo '<img style="max-height: 200px;max-width:180px" src="' . $post_featured_image . '" />';

        break;
    }
}

#-----------------------------------------------------------------
# INSECT META OPTIONS
#-----------------------------------------------------------------
  function doom_insect_meta_boxes() {

  	$meta_boxes = array(
  	'caption_position' => array('name' => 'caption_position', 'type' => 'open', 'title' => __('Insect Profile Details', 'doom')),

		'doom_insect_about' => array( 'name' => 'doom_insect_about', 'title' => __('A bit about me', 'doom'), 'desc' => 'Profile page about copy', 'std' => '', 'type' => 'richtext'),
		'doom_insect_lives_in' => array( 'name' => 'doom_insect_lives_in', 'title' => __('I live in', 'doom'), 'desc' => 'Profile page where the fly lives copy', 'std' => '', 'type' => 'richtext'),
		'doom_insect_best_known' => array( 'name' => 'doom_insect_best_known', 'title' => __('I\'m best known for', 'doom'), 'desc' => 'Best know for copy', 'std' => '', 'type' => 'richtext'),
		'doom_insect_hobbies' => array( 'name' => 'doom_insect_hobbies', 'title' => __('Interests/hobbies', 'doom'), 'desc' => 'Interests/hobbies copy', 'std' => '', 'type' => 'richtext'),
		array('type' => 'divider'),

	  
	array('type' => 'close'),
	array('type' => 'open', 'title' => __('Insect Configurator Details', 'doom'), 'desc' => 'Text that goes into the Solution Configurator'),
	// 'caption_position' => array('name' => 'caption_position', 'type' => 'open', 'title' => __('Insect Configurator Details', 'doom')),
		'doom_insect_config_description' => array( 'name' => 'doom_insect_config_description', 'title' => __('Short Description', 'doom'), 'desc' => 'Configurator insect copy', 'std' => '', 'type' => 'textarea'),
		// array('type' => 'divider'),
		  
  		'doom_insect_egg' => array( 'name' => 'doom_insect_egg', 'title' => __('Eggs per day', 'doom'), 'desc' => 'Amount of eggs layed per day', 'std' => '', 'type' => 'text_small'),
  		'doom_insect_egg_copy' => array( 'name' => 'doom_insect_egg_copy', 'title' => __('Copy', 'doom'), 'desc' => 'Copy to accompany above stat. Use #STAT# to delimit where the stat should be. E.g, This has happened in your house #STAT# times.', 'std' => '', 'type' => 'textarea'),
		//   array('type' => 'divider'),

  		'doom_insect_molt' => array( 'name' => 'doom_insect_molt', 'title' => __('Molts per day', 'doom'), 'desc' => 'Times the pest molts per day', 'std' => '', 'type' => 'text_small'),
  		'doom_insect_molt_copy' => array( 'name' => 'doom_insect_molt_copy', 'title' => __('Copy', 'doom'), 'desc' => 'Copy to accompany above stat', 'std' => '', 'type' => 'textarea'),
		//   array('type' => 'divider'),

  		'doom_insect_mate' => array( 'name' => 'doom_insect_mate', 'title' => __('Mate per day', 'doom'), 'desc' => 'Times the pest mates per day', 'type' => 'text_small'),
  		'doom_insect_mate_copy' => array( 'name' => 'doom_insect_mate_copy', 'title' => __('Copy', 'doom'), 'desc' => 'Copy to accompany above stat', 'type' => 'textarea'),
		//   array('type' => 'divider'),

  		'doom_insect_life' => array( 'name' => 'doom_insect_life', 'title' => __('Life span', 'doom'), 'desc' => 'How long the pest lives', 'std' => '', 'type' => 'text_small'),
  		'doom_insect_life_copy' => array( 'name' => 'doom_insect_life_copy', 'title' => __('Copy', 'doom'), 'desc' => 'Copy to accompany above stat', 'std' => '', 'type' => 'textarea'),
		//   array('type' => 'divider'),

  		'doom_insect_poop' => array( 'name' => 'doom_insect_poop', 'title' => __('Poops per day', 'doom'), 'desc' => 'Times the pest poops per day', 'std' => '', 'type' => 'text_small'),
  		'doom_insect_poop_copy' => array( 'name' => 'doom_insect_poop_copy', 'title' => __('Copy', 'doom'), 'desc' => 'Copy to accompany above stat', 'std' => '', 'type' => 'textarea'),
		//   array('type' => 'divider'),

  		'doom_insect_vomit' => array( 'name' => 'doom_insect_vomit', 'title' => __('Vomits per day', 'doom'), 'desc' => 'Times the pest vomits per day', 'type' => 'text_small'),
  		'doom_insect_vomit_copy' => array( 'name' => 'doom_insect_vomit_copy', 'title' => __('Copy', 'doom'), 'desc' => 'Copy to accompany above stat', 'type' => 'textarea'),
		//   array('type' => 'divider'),

      'doom_insect_sucks' => array( 'name' => 'doom_insect_sucks', 'title' => __('Blood sucks per day', 'doom'), 'desc' => 'Times the pest sucks blood per day', 'type' => 'text_small'),
      'doom_insect_sucks_copy' => array( 'name' => 'doom_insect_sucks_copy', 'title' => __('Copy', 'doom'), 'desc' => 'Copy to accompany above stat', 'type' => 'textarea'),
	  array('type' => 'divider'),


  		//'doom_thumbnail_align' => array( 'name' => 'doom_thumbnail_align', 'title' => __('Featured Image alignment', 'doom'), 'desc' => 'Choose your Featured Image alignment.', 'options' => array('center top', 'center bottom', 'center center'), 'type' => 'select'),
  
	array('type' => 'close'),
	array('type' => 'open', 'title' => __('Social Media Copy', 'doom'), 'desc' => ''),

		'doom_social_media_title' => array( 'name' => 'doom_social_media_title', 'title' => __('Title', 'doom'), 'desc' => 'Title for Social Media', 'std' => '', 'type' => 'text_small'),
		'doom_social_media_description' => array( 'name' => 'doom_social_media_description', 'title' => __('Description', 'doom'), 'desc' => 'Description for Social Media', 'std' => '', 'type' => 'textarea'),
		array('type' => 'divider'),
	  
	array('type' => 'close'),
	array('type' => 'open', 'title' => __('SEO Meta Details', 'doom'), 'desc' => ''),
	
		'doom_meta_keywords' => array( 'name' => 'doom_meta_keywords', 'title' => __('Keywords', 'doom'), 'desc' => 'Keywords for SEO', 'std' => '', 'type' => 'textarea'),
		'doom_meta_description' => array( 'name' => 'doom_meta_description', 'title' => __('Description', 'doom'), 'desc' => 'Description for SEO', 'std' => '', 'type' => 'textarea'),
		array('type' => 'divider'),
	  
	array('type' => 'close'),

  	array('type' => 'clear'),

  	);

  	return apply_filters( 'doom_insect_meta_boxes', $meta_boxes );
  }
  function insect_meta_boxes() {
  	global $post;
  	$meta_boxes = doom_insect_meta_boxes(); ?>

  	<?php echo '<link rel="stylesheet" href="'.get_bloginfo('template_url').'/inc/css/slide-meta.css" type="text/css" media="screen" />'; ?>
  	<?php echo '<link rel="stylesheet" href="'.get_bloginfo('template_url').'/inc/css/admin.css" type="text/css" media="screen" />'; ?>

  	<?php foreach ( $meta_boxes as $meta ) :
  		$value = get_post_meta( $post->ID, $meta['name'], true );
  		if ( $meta['type'] == 'text' )
  			get_meta_text( $meta, $value );
  		if ( $meta['type'] == 'text_small' )
  			get_meta_text_small( $meta, $value );
		elseif ( $meta['type'] == 'richtext' ) 
			get_meta_richtext($meta, $value);
  		elseif ( $meta['type'] == 'textarea' )
  			get_meta_textarea( $meta, $value );
  		elseif ( $meta['type'] == 'select' )
  			get_meta_select( $meta, $value );
  		elseif ( $meta['type'] == 'select_page' )
  			get_meta_select_page( $meta, $value );
  		elseif ( $meta['type'] == 'checkbox' )
  			get_meta_checkbox( $meta, $value );
  		elseif ( $meta['type'] == 'open' )
  			get_meta_open( $meta, $value );
  		elseif ( $meta['type'] == 'close' )
  			get_meta_close( $meta, $value );
  		elseif ( $meta['type'] == 'divider' )
  			get_meta_divider( $meta, $value );
  		elseif ( $meta['type'] == 'clear' )
  			get_meta_clear( $meta, $value );
  	endforeach; ?>

  	<?php
  }


}

?>
