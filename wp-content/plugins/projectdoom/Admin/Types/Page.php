<?php // Page Post Type

function post_type_page() {


  #-----------------------------------------------------------------
  # PAGE META OPTIONS
  #-----------------------------------------------------------------
  function doom_page_meta_boxes() {

  	$meta_boxes = array(

  	'format_settings' => array('name' => 'format_settings', 'type' => 'open', 'title' => __('Format Settings', 'doom')),

  		'doom_thumbnail_align' => array( 'name' => 'doom_thumbnail_align', 'title' => __('Featured Image alignment', 'doom'), 'desc' => 'Choose your Featured Image alignment.', 'options' => array('center top', 'center bottom', 'center center'), 'type' => 'select'),

  		'doom_thumbnail_colour' => array( 'name' => 'doom_thumbnail_colour', 'title' => __('Background Colour', 'doom'), 'desc' => '(RGBA eg: 255,255,255,0.5)', 'std' => '', 'type' => 'text'),

  		//'doom_thumbnail_opacotu' => array( 'name' => 'doom_thumbnail_opacotu', 'title' => __('Background Colour Opacity', 'doom'), 'desc' => '(RGBA eg: 255,255,255,0.5)', 'std' => '', 'type' => 'text_small'),

  		array('type' => 'divider'),

  		'doom_page_title' => array( 'name' => 'doom_page_title', 'title' => __('Hide Page Title', 'doom'), 'desc' => 'Hide the page title.', 'type' => 'checkbox'),

  		'doom_breadcrumbs' => array( 'name' => 'doom_breadcrumbs', 'title' => __('Hide Breadcrumbs', 'doom'), 'desc' => 'Hide breadcrumbs on this page.', 'type' => 'checkbox'),

  		array('type' => 'divider'),

  		'doom_sidebar' => array( 'name' => 'doom_sidebar', 'title' => __('Sidebar', 'doom'), 'desc' => 'Choose which sidebar area to display on this page.', 'std' => 'Default Sidebar', 'type' => 'select_sidebar'),

  		'doom_layout_individual' => array( 'name' => 'doom_layout_individual', 'title' => __('Layout', 'doom'), 'desc' => 'Choose your layout style.', 'options' => array('Default', 'Sidebar Right', 'Sidebar Left', 'Fullwidth'), 'type' => 'select'),

  		'doom_content_multicolumn' => array( 'name' => 'doom_content_multicolumn', 'title' => __('Multiple Columns', 'fds_lang'), 'desc' => 'News article paper style', 'type' => 'checkbox'),

  		array('type' => 'divider'),

  		'doom_top_content' => array( 'name' => 'doom_top_content', 'title' => __('Top Content', 'doom'), 'desc' => 'Add any content, including shortcodes, that you want to insert above your main content and sidebar.', 'size' => 'large', 'type' => 'textarea'),

  	array('type' => 'close'),

  	array('type' => 'clear'),

  	);

  	return apply_filters( 'doom_page_meta_boxes', $meta_boxes );
  }
  #-----------------------------------------------------------------
  # Page Meta Fields
  #-----------------------------------------------------------------
  function page_meta_boxes() {
  	global $post;
  	$meta_boxes = doom_page_meta_boxes(); ?>

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
