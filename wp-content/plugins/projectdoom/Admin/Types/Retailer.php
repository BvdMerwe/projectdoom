<?php // Retailer Post Type

function post_type_retailer() {

#-----------------------------------------------------------------
#
#	Retailer Post Type(s)
#
#-----------------------------------------------------------------
  register_post_type('retailer', array(
    'labels' 				=> array('name' => __('Retailers'), 'singular_label' => __('Retailer'), 'add_new_item' => __('Add Retailer'), 'search_items' => __('Search Retailers'),'edit_item' => __('Edit Retailer')),
    'public' 				=> true,
    'exclude_from_search' 	=> false,
    'show_ui' 				=> true,
    'show_in_nav_menus' 	=> true,
    '_builtin' 				=> false,
    '_edit_link' 			=> 'post.php?post=%d',
    'capability_type' 		=> 'post',
    'hierarchical' 			=> false,
    'rewrite' 				=> array("slug" => "retailer"),
    'menu_position' 		=> 20,
    'with_front' 			=> true,
    'supports' 				=> array('title', 'editor', 'excerpt', 'thumbnail'),
    //'menu_icon' => get_bloginfo('template_directory').'/inc/images/briefcase-icon.png',
    'has_archive' 			=> true
  ));


#-----------------------------------------------------------------
#
#	Custom Taxonomy
#
#-----------------------------------------------------------------
  register_taxonomy('retailer_categories', 'retailer', array('show_in_nav_menus' => true, 'hierarchical' => true, 'labels' => array('name' => __('Retailer Categories'), 'singular_label' => __('Retailer Category'), 'add_new_item' => __('Add New Retailer Category'), 'search_items' => __('Search Retailer Categories')), 'rewrite' => array('slug' => 'retailer-categories')));

#-----------------------------------------------------------------
#
#	Custom Post Type Admin Layout
#
#-----------------------------------------------------------------
  /*************************** Retailers Page Layout ***************************/
  add_filter("manage_edit-retailer_columns", "retailer_edit_columns");
  add_action("manage_posts_custom_column",  "retailer_custom_columns");

  function retailer_edit_columns($columns){
      $columns = array(
        "cb" => "<input type=\"checkbox\" />",
        "title" => "Title",
        "retailer_desc" => "Description",
        "retailer_categories" => "Categories",
        "retailer_image" => "thumbnail",
        "date" => "Date"
      );

      return $columns;
  }

  function retailer_custom_columns($column){
      global $post;

      switch ($column) {
        case "retailer_desc":
            the_excerpt();
          break;
        case "retailer_categories":
          echo get_the_term_list($post->ID, 'retailer_categories', '', ', ', '');
          break;
        case "retailer_image":
          // SHOW THE FEATURED IMAGE
          $post_featured_image = fids_get_featured_image($post->ID);

          echo '<img style="max-height: 200px;max-width:180px" src="' . $post_featured_image . '" />';

          break;
      }
  }
  #-----------------------------------------------------------------
  # RETAILER META OPTIONS
  #-----------------------------------------------------------------
  function doom_retailer_meta_boxes() {

  	$meta_boxes = array(

  		'portfolio_details' => array('name' => 'portfolio_details', 'type' => 'open', 'title' => __('Portfolio Details', 'doom')),

  		'doom_portfolio-client' => array( 'name' => 'doom_portfolio-client', 'title' => __('Client', 'doom'), 'desc' => 'Name of the Client.', 'type' => 'text'),

  		'doom_portfolio-project' => array( 'name' => 'doom_portfolio-project', 'title' => __('Project Title', 'doom'), 'desc' => '', 'type' => 'text'),

  		'doom_portfolio-date' => array( 'name' => 'doom_portfolio-date', 'title' => __('Completion Date', 'doom'), 'desc' => '', 'type' => 'text'),

  		array('type' => 'divider'),

  		'doom_portfolio-contact' => array( 'name' => 'doom_portfolio-contact', 'title' => __('Contact Person', 'doom'), 'desc' => '', 'type' => 'text'),

  		'doom_portfolio-contactPosition' => array( 'name' => 'doom_portfolio-contactPosition', 'title' => __('Position', 'doom'), 'desc' => '', 'type' => 'text'),

  		'doom_portfolio-contactNumber' => array( 'name' => 'doom_portfolio-contactNumber', 'title' => __('Contact Number', 'doom'), 'desc' => '', 'type' => 'text'),

  	array('type' => 'close'),

  	array('type' => 'clear'),

  	);

  	return apply_filters( 'doom_retailer_meta_boxes', $meta_boxes );
  }
  function retailer_meta_boxes() {
  	global $post;
  	$meta_boxes = doom_retailer_meta_boxes(); ?>

  	<?php echo '<link rel="stylesheet" href="'.get_bloginfo('template_url').'/inc/css/meta.css" type="text/css" media="screen" />'; ?>
  	<?php echo '<link rel="stylesheet" href="'.get_bloginfo('template_url').'/inc/css/admin.css" type="text/css" media="screen" />'; ?>

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
