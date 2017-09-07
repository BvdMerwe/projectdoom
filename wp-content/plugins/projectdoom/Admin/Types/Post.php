<?php // Post Post Type

function post_type_post() {
#-----------------------------------------------------------------
# POST META OPTIONS
#-----------------------------------------------------------------
  function doom_post_meta_boxes() {

  	$meta_boxes = array(

  	'format_settings' => array('name' => 'format_settings', 'type' => 'open', 'title' => __('Format Settings', 'doom')),

  		'doom_lightbox_type' => array( 'name' => 'doom_lightbox_type', 'title' => __('Lightbox Type', 'doom'), 'desc' => 'Choose this option to open this image in a lightbox (applies to blog, category, archives, portfolio pages etc.).', 'options' => array('Image', 'Video','Audio'), 'type' => 'select'),

  		'doom_custom_url' => array( 'name' => 'doom_custom_url', 'title' => __('Video URL', 'doom'), 'desc' => 'A video url (Youtube/Vimeo) which your image links to (used for your lightbox URL).', 'type' => 'text'),

  		'doom_thumbnail_filter' => array( 'name' => 'doom_thumbnail_filter', 'title' => __('Featured Image Filter', 'doom'), 'desc' => 'Choose your Featured Image Filter.', 'options' => array('none', 'blur', 'grayscale', 'hue','invert', 'saturate','sepia'), 'type' => 'select'),

  	array('type' => 'close'),

  	array('type' => 'clear'),

  	);

  	return apply_filters( 'doom_post_meta_boxes', $meta_boxes );
  }
  #-----------------------------------------------------------------
  # Post Meta Fields
  #-----------------------------------------------------------------
  function post_meta_boxes() {
  	global $post;
  	$meta_boxes = doom_post_meta_boxes(); ?>

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
