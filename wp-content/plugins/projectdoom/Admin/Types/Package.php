<?php // Packages Post Type

function post_type_package() {

#-----------------------------------------------------------------
#
#	Package Post Type(s)
#
#-----------------------------------------------------------------

	register_post_type('package', array(
		'labels' 				=> array('name' => __('Packages'), 'singular_label' => __('Package'), 'add_new_item' => __('Add Package'), 'search_items' => __('Search Packages'),'edit_item' => __('Edit Package')),
		'public' 				=> true,
		'exclude_from_search' 	=> false,
		'show_ui' 				=> true,
		'show_in_nav_menus' 	=> true,
		'_builtin' 				=> false,
		'_edit_link' 			=> 'post.php?post=%d',
		'capability_type' 		=> 'post',
		'hierarchical' 			=> false,
		'rewrite' 				=> array("slug" => "package"),
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
  register_taxonomy('package_categories', 'retailer', array('show_in_nav_menus' => true, 'hierarchical' => true, 'labels' => array('name' => __('Package Categories'), 'singular_label' => __('Package Category'), 'add_new_item' => __('Add New Package Category'), 'search_items' => __('Search Package Categories')), 'rewrite' => array('slug' => 'package-categories')));

#-----------------------------------------------------------------
#
#	Custom Post Type Admin Layout
#
#-----------------------------------------------------------------

  /*************************** Packages Page Layout ***************************/
  add_filter("manage_edit-package_columns", "package_edit_columns");
  add_action("manage_posts_custom_column",  "package_custom_columns");

  function package_edit_columns($columns){
      $columns = array(
        "cb" => "<input type=\"checkbox\" />",
        "title" => "Title",
        "package_desc" => "Description",
        "package_categories" => "Categories",
        "package_image" => "thumbnail",
        "date" => "Date"
      );

      return $columns;
  }

  function package_custom_columns($column){
      global $post;

      switch ($column) {
        case "package_desc":
            the_excerpt();
          break;
        case "package_categories":
          echo get_the_term_list($post->ID, 'package_categories', '', ', ', '');
          break;
        case "package_image":
          // SHOW THE FEATURED IMAGE
          $post_featured_image = fids_get_featured_image($post->ID);

          echo '<img src="' . $post_featured_image . '" />';

          break;
      }
  }
#-----------------------------------------------------------------
# PACKAGE META OPTIONS
#-----------------------------------------------------------------
  function doom_package_meta_boxes() {

  	$meta_boxes = array(

  		'service_details' => array('name' => 'service_details', 'type' => 'open', 'title' => __('Event Details', 'doom')),

  		'doom_service-client' => array( 'name' => 'doom_service-client', 'title' => __('Client / Event Title', 'doom'), 'desc' => 'Name of the Client.', 'type' => 'text'),

  		array('type' => 'close'),

  		'format_settings' => array('name' => 'format_settings', 'type' => 'open', 'title' => __('Format Settings', 'doom')),

  		'doom_service-date-start' => array( 'name' => 'doom_service-date-start', 'title' => __('Event Start Date', 'doom'), 'desc' => '', 'type' => 'text'),

  		'doom_service-date-start-2' => array( 'name' => 'doom_service-date-start-2', 'title' => __('Event Date 2', 'doom'), 'desc' => '', 'type' => 'text'),

  		'doom_service-date-start-3' => array( 'name' => 'doom_service-date-start-3', 'title' => __('Event Date 3', 'doom'), 'desc' => '', 'type' => 'text'),

  		array('type' => 'divider'),

  		'doom_service-province' => array( 'name' => 'doom_service-province', 'title' => __('Province / State / Region', 'doom'), 'desc' => 'Choose the option that describes the job\'s location.', 'options' => array('Eastern Cape', 'Free State','Gauteng', 'KwaZulu-Natal', 'Mpumalanga', 'North West', 'Northern Cape', 'Polokwane', 'Western Cape'), 'type' => 'select'),

  		'doom_service-address' => array( 'name' => 'doom_service-address', 'title' => __('Physical Address', 'doom'), 'desc' => 'Physical address of Module Event.', 'type' => 'text'),

  		'doom_service-postal_code' => array( 'name' => 'doom_service-postal_code', 'title' => __('Postal Code', 'doom'), 'desc' => '', 'type' => 'text'),

  		'doom_service-city' => array( 'name' => 'doom_service-city', 'title' => __('City', 'doom'), 'desc' => '', 'type' => 'text'),

  		'doom_service-venue_name' => array( 'name' => 'doom_service-venue_name', 'title' => __('Venue name', 'doom'), 'desc' => '', 'type' => 'text'),

  	array('type' => 'close'),

  	array('type' => 'clear'),

  	);

  	return apply_filters( 'doom_package_meta_boxes', $meta_boxes );
  }
  function package_meta_boxes() {
  	global $post;
  	$meta_boxes = doom_package_meta_boxes(); ?>

  	<?php echo '<link rel="stylesheet" href="'.get_bloginfo('template_url').'/inc/css/meta.css" type="text/css" media="screen" />'; ?>

  	<?php foreach ( $meta_boxes as $meta ) :
  		$value = get_post_meta( $post->ID, $meta['name'], true );
  		if ( $meta['type'] == 'text' )
  			get_meta_text( $meta, $value );
  		if ( $meta['type'] == 'text_small' )
  			get_meta_text_small( $meta, $value );
  		elseif ( $meta['type'] == 'textarea' )
  			get_meta_textarea( $meta, $value );
  		elseif ( $meta['type'] == 'select' )
  			get_meta_select( $meta, $value );
  		elseif ( $meta['type'] == 'select_sidebar' )
  			get_meta_select_sidebar( $meta, $value );
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
