<?php // Product Post Type

function post_type_product() {

#-----------------------------------------------------------------
#
#	Insect Post Type(s)
#
#-----------------------------------------------------------------
	register_post_type('product', array(
		'labels' 				=> array('name' => __('Products'), 'singular_label' => __('Product'), 'add_new_item' => __('Add Product'), 'search_items' => __('Search Products'),'edit_item' => __('Edit Product')),
		'public' 				=> true,
		'exclude_from_search' 	=> false,
		'show_ui' 				=> true,
		'show_in_nav_menus' 	=> true,
		'_builtin' 				=> false,
		'_edit_link' 			=> 'post.php?post=%d',
		'capability_type' 		=> 'post',
		'hierarchical' 			=> false,
		'rewrite' 				=> array("slug" => "product"),
		'menu_position' 		=> 20,
		'with_front' 			=> true,
		'supports' 				=> array('title', 'excerpt', 'thumbnail', 'editor'),
		//'menu_icon' 			=> get_bloginfo('template_directory').'/inc/images/products-icon.png',
		'has_archive' 			=> true
	));


#-----------------------------------------------------------------
#
#	Custom Taxonomy
#
#-----------------------------------------------------------------
  register_taxonomy('product_categories', 'product', array('show_in_nav_menus' => true, 'hierarchical' => true, 'labels' => array('name' => __('Product Categories'), 'singular_label' => __('Category'), 'add_new_item' => __('Add New Product Category'), 'search_items' => __('Search Product Categories')), 'rewrite' => array('slug' => 'product-categories')));
  register_taxonomy('product_types', 'product', array('show_in_nav_menus' => true, 'hierarchical' => true, 'labels' => array('name' => __('Product Type'), 'singular_label' => __('Type'), 'add_new_item' => __('Add New Product Type'), 'search_items' => __('Search Product Types')), 'rewrite' => array('slug' => 'product-categories')));

#-----------------------------------------------------------------
#
#	Custom Post Type Admin Layout
#
#-----------------------------------------------------------------
  /*************************** Products Page Layout ***************************/
  add_filter("manage_edit-product_columns", "product_edit_columns");
  add_action("manage_posts_custom_column",  "product_custom_columns");
  function product_edit_columns( $columns ){

      $columns = array(
        "cb" => "<input type=\"checkbox\" />",
        "title" => "Title",
        "product_desc" => "Description",
        "product_categories" => "Categories",
        "product_types" => "Type",
        "product_image" => "thumbnail",
        "date" => "Date"
      );

      return $columns;
  }

  function product_custom_columns( $column ){

      global $post;

      switch ( $column ) {

        case "product_desc":
          echo the_excerpt();
          break;
        case "product_categories":
          echo get_the_term_list( $post->ID, 'product_categories', '', ', ', '' );
          break;
        case "product_types":
          echo get_the_term_list( $post->ID, 'product_types', '', ', ', '' );
          break;
        case "product_image":
          // SHOW THE FEATURED IMAGE
          $post_featured_image = fids_get_featured_image( $post->ID );

          echo '<img style="max-height: 200px;max-width:180px" src="' . $post_featured_image . '" />';

          break;
      }
  }
  #-----------------------------------------------------------------
  # PRODUCT META OPTIONS
  #-----------------------------------------------------------------
  function doom_product_meta_boxes() {

  	$meta_boxes = array(

		  
	'caption_position' => array('name' => 'caption_position', 'type' => 'open', 'title' => __('Product Details', 'doom')),
  		// 'format_settings' => array('name' => 'format_settings', 'type' => 'open', 'title' => __('', 'doom')),

  		// 'doom_product-status' => array( 'name' => 'doom_product-status', 'title' => __('Product Availability', 'doom'), 'desc' => 'Choose the option that describes the availability of this product', 'options' => array('in stock', 'out of stock'), 'type' => 'select'),

  		// array('type' => 'divider'),

  		// 'doom_product-price' => array( 'name' => 'doom_product-price', 'title' => __('Product Price', 'doom'), 'desc' => 'price in ZAR per item', 'type' => 'text'),

  		// 'doom_product-discount' => array( 'name' => 'doom_product-discount', 'title' => __('Product Discount', 'doom'), 'desc' => 'discount in %', 'type' => 'text'),

  		// 'doom_product-internal_code' => array( 'name' => 'doom_product-internal_code', 'title' => __('Internal Reference Code', 'doom'), 'desc' => 'eg SKU', 'type' => 'text'),
  		'doom_product_more_info' => array( 'name' => 'doom_product_more_info', 'title' => __('More info', 'doom'), 'desc' => 'e.g - Indoors/Outdoors', 'type' => 'richtext'),
  		'doom_product_ideal_for' => array( 'name' => 'doom_product_ideal_for', 'title' => __('Ideal for', 'doom'), 'desc' => 'e.g - Special info about product', 'type' => 'richtext'),
  		'doom_product_benefits' => array( 'name' => 'doom_product_benefits', 'title' => __('Benefits', 'doom'), 'desc' => 'e.g - Long-lasting effect', 'type' => 'richtext'),
  		'doom_product_directions' => array( 'name' => 'doom_product_directions', 'title' => __('Directions', 'doom'), 'desc' => 'e.g -Use only as directed', 'type' => 'richtext'),
  		'doom_product_storage_disposal' => array( 'name' => 'doom_product_storage_disposal', 'title' => __('Storage and disposal', 'doom'), 'desc' => 'e.g - Store in a cool, dry place', 'type' => 'richtext'),
  		'doom_product_precautions' => array( 'name' => 'doom_product_precautions', 'title' => __('Precautions', 'doom'), 'desc' => 'e.g - Avoid excessive inhalation', 'type' => 'richtext'),
		  
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

  	return apply_filters( 'doom_product_meta_boxes', $meta_boxes );
  }
  function product_meta_boxes() {
  	global $post;
  	$meta_boxes = doom_product_meta_boxes(); ?>

  	<?php echo '<link rel="stylesheet" href="'.get_bloginfo('template_url').'/inc/css/meta.css" type="text/css" media="screen" />'; ?>
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
