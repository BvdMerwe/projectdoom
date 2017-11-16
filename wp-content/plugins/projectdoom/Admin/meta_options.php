<?php // Meta Options

add_action( 'admin_menu', 'doom_create_meta_box' );
add_action( 'save_post', 'doom_save_meta_data' );

function doom_create_meta_box() {
	global $theme_name;

	add_meta_box('page-meta-boxes', __('Page Settings', 'doom'), 'page_meta_boxes', 'page', 'normal', 'high');

	add_meta_box('post-meta-boxes', __('Post Settings', 'doom'), 'post_meta_boxes', 'post', 'normal', 'high');
	add_meta_box('page-meta-boxes', __('Page Settings', 'doom'), 'page_meta_boxes', 'post', 'normal', 'high');

	//add_meta_box('page-meta-boxes', __('Page Settings', 'doom'), 'page_meta_boxes', 'insect', 'normal', 'high');
	add_meta_box('insect-meta-boxes', __('Insect Details', 'doom'), 'insect_meta_boxes', 'insect', 'normal', 'high');
	add_meta_box('insect-side-profile', __('Side Profile', 'doom'), 'insect_side_profile', 'insect', 'normal', 'high');
	add_meta_box('product-meta-boxes', __('Product Details', 'doom'), 'product_meta_boxes', 'product', 'normal', 'high');

}

function get_meta_open( $args = array(), $value = false ) {
extract( $args ); ?>

	<div class="meta-group">

	<h3><?php echo $title; ?></h3>
	<div class="group-desc"><?php echo $desc; ?></div><div class="clear"></div>
	<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />


<?php } function get_meta_close( $args = array(), $value = false ) {
extract( $args ); ?>

	</div><div class="clear"></div>
	<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />


<?php } function get_meta_divider( $args = array(), $value = false ) {
extract( $args ); ?>

	<div class="divider"></div>
	<hr/>
	<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />


<?php } function get_meta_clear( $args = array(), $value = false ) {
extract( $args ); ?>

	<div class="clear"></div>
	<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />


<?php } function get_meta_text( $args = array(), $value = false ) {
extract( $args ); global $post; ?>

	<div class="meta-box">
		<strong><?php echo $title; ?></strong>
		<br/><input type="text" name="<?php echo $name; ?>" id="<?php echo $name; ?>" value="<?php echo esc_html( $value, 1 ); ?>" size="30" tabindex="30" <?php if($extras == "getimage" OR $extras == "getvideo") { ?>class="uploadbutton"<?php } ?> />
		<div class="meta-desc"><?php echo $desc; ?></div>
		<?php if($extras == "getimage") { ?><a href="media-upload.php?post_id=<?php echo $post->ID; ?>&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=790" id="add_image" class="thickbox button" title='Add an Image' onclick="return false;">Get Image</a><?php } elseif($extras == "getvideo") { ?><a href="media-upload.php?post_id=<?php echo $post->ID; ?>&amp;type=video&amp;TB_iframe=true&amp;width=640&amp;height=790" id="add_video" class="thickbox button" title='Add a Video' onclick="return false;">Get Video</a><?php } ?>
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />
	</div>


<?php } function get_meta_text_small( $args = array(), $value = false ) {
extract( $args ); ?>

	<div class="meta-box">
		<strong><?php echo $title; ?></strong>
		<div class="meta-desc"><?php echo $desc; ?></div>
		<br/><input type="text" name="<?php echo $name; ?>" id="<?php echo $name; ?>" value="<?php if(esc_html( $value, 1 )) { echo esc_html( $value, 1 ); } else { echo esc_html( $std, 1 ); } ?>" size="30" tabindex="30" class="small-textbox" />
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />
	</div>


<?php } function get_meta_select( $args = array(), $value = false ) {
extract( $args ); ?>

	<div class="meta-box">
		<strong><?php echo $title; ?></strong>
		<div class="meta-desc"><?php echo $desc; ?></div>
		<br/><select name="<?php echo $name; ?>" id="<?php echo $name; ?>">
		<?php foreach ( $options as $option ) : ?>
			<option <?php if(htmlentities($value, ENT_QUOTES) == $option) echo ' selected="selected"'; ?>>
				<?php echo $option; ?>
			</option>
		<?php endforeach; ?>
		</select>
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />
	</div>


<?php } function get_meta_select_sidebar( $args = array(), $value = false ) {
extract( $args );
global $post, $wp_registered_sidebars; ?>

	<div class="meta-box">
		<strong><?php echo $title; ?></strong><br/>
		<select name="<?php echo $name; ?>" id="<?php echo $name; ?>">
			<?php $sidebars = $wp_registered_sidebars;
			if(is_array($sidebars) && !empty($sidebars)){ foreach($sidebars as $sidebar){ if($selected_sidebar[$i] == $sidebar['name']){ ?>
				<option value="<?php echo $sidebar['name']; ?>"<?php if($value == $sidebar['name']) { echo ' selected="selected"'; } ?>><?php echo $sidebar['name']; ?></option>
			<?php }else{ ?>
				<option value="<?php echo $sidebar['name']; ?>"<?php if($value == $sidebar['name']) { echo ' selected="selected"'; } ?>><?php echo $sidebar['name']; ?></option>
			<?php }}} ?>
		</select>
		<div class="meta-desc"><?php echo $desc; ?></div>
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />
	</div>

<?php } function get_meta_select_page( $args = array(), $value = false ) {

extract( $args );
global $post;
?>

	<div class="meta-box">
		<strong><?php echo $title; ?></strong><br/>
		<select name="<?php echo $name; ?>" id="<?php echo $name; ?>">

			<?php	// Pull all the pages into an array
			$options_pages = array();
			$options_pages_obj = get_pages('sort_column=post_parent,menu_order');

			if( is_array($options_pages_obj) && !empty($options_pages_obj) ){

				$options_pages[''] = 'Select a page:';

				foreach( $options_pages_obj as $page ){

					$options_pages[$page->ID] = $page->post_title;

					if( $selected_page[$i] == get_page_link( $page->ID ) ){ ?>
						<option value="<?php echo get_page_link( $page->ID ); ?>"<?php if( $value == get_page_link( $page->ID ) ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>
			<?php } else { ?>
				<option value="<?php echo get_page_link( $page->ID ); ?>"<?php if( $value == get_page_link( $page->ID ) ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>
			<?php }}} ?>
		</select>
		<div class="meta-desc"><?php echo $desc; ?></div>
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />
	</div>

<?php } function get_meta_select_emodule( $args = array(), $value = false ) {

extract( $args );
global $post;
?>

	<div class="meta-box">
		<strong><?php echo $title; ?></strong><br/>
		<select name="<?php echo $name; ?>" id="<?php echo $name; ?>">

			<option><?php _e('Choose an E-Module...','doom');?></option>
			<?php
			$options_pages = array();
			$options_pages_obj = get_posts('post_type=emodule&posts_per_page=-1&orderby=title');

			if( is_array($options_pages_obj) && !empty($options_pages_obj) ){

				$options_pages[''] = 'Choose an E-Module...';

				foreach( $options_pages_obj as $page ){

					$options_pages[$page->ID] = $page->post_title;
					$page_ID = $page->ID;

					if( $selected_page[$i] == $page->ID ){ ?>

						<option value="<?php echo $page->ID; ?>"<?php if( $value == $page->ID ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>

					<?php
					} else { ?>

						<option value="<?php echo $page->ID; ?>" <?php if( $value == $page->ID ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>
			<?php }}} ?>
		</select>
		<div class="meta-desc"><?php echo $desc; ?></div>
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />
	</div>


<?php } function get_meta_select_venue( $args = array(), $value = false ) {

extract( $args );
global $post;
?>

	<div class="meta-box">
		<strong><?php echo $title; ?></strong><br/>
		<select name="<?php echo $name; ?>" id="<?php echo $name; ?>">

			<option value=""><?php _e('Choose venue...','doom');?></option>

			<?php	// Pull all the pages into an array
			$options_pages = array();
			$options_pages_obj = get_posts('post_type=module_venue');

			if( is_array($options_pages_obj) && !empty($options_pages_obj) ){

				$options_pages[''] = 'Select a venue:';

				foreach( $options_pages_obj as $page ){

					//setup_postdata($page);

					$options_pages[$page->ID] = $page->post_title;
					$page_ID = $page->ID;

					if ( get_the_terms($page->ID, 'module_venue_location') ) {

					}

					if( $selected_page[$i] == $page->ID ){ ?>

						<option value="<?php echo $page->ID; ?>"<?php if( $value == $page->ID ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>

					<?php
					} else { ?>

						<option value="<?php echo $page->ID; ?>" data-venue-link="<?php echo get_page_link( $page->ID ); ?>"<?php if( $value == $page->ID ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>
			<?php }}} ?>
		</select>
		<div class="meta-desc"><?php echo $desc; ?></div>
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />
	</div>

<?php } function get_meta_exam_q( $args = array(), $value = false ) {
extract( $args ); global $post;

	$how_many_values = count($value);
	//print_r($args);
	//print_r($value);
	//echo $value;
	?>

	<div class="dyna_control">
		<input id="btnAdd" type="button" value="Add Question" class="button button-primary uploadbutton" />
		<input id="btnDel" type="button" value="Remove Question" class="button button-primary uploadbutton" />
	</div>
	<?php /**/?>
		<div class="meta-box dyno_text_field" id="dyno_text_field-1">
			<br />
			<strong><?php echo $title; ?></strong>
			<br/>
			<?php
			if( is_array($value) ){
				$counter = 0;
				while ( $counter < $how_many_values ) {

					if ($counter ==0) {?>

                        <textarea type="text" name="<?php echo $name; ?>[]" id="<?php echo $name; ?>"></textarea>

                        <select class="waypnt" name="<?php echo $name; ?>[]" id="<?php echo $name; ?>">

							<?php	// Pull all the pages into an array
							$options_pages = array();
							//$options_pages_obj = get_pages('sort_column=post_parent,menu_order');
							$options_pages_obj = get_posts('post_type=interroute&posts_per_page=-1&orderby=title&order=asc');

							if( is_array($options_pages_obj) && !empty($options_pages_obj) ){

								$options_pages[''] = 'Select a Route:';

								foreach( $options_pages_obj as $page ){

									$options_pages[$page->ID] = $page->post_title; //echo $page->ID;

									if( $selected_page[$i] == $page->ID ){ ?>
										<option value="<?php echo $page->ID; ?>"<?php if( $value[$counter]['doom_route-waypoints'] == $page->ID ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>
			<?php } else { ?>
										<option value="<?php echo $page->ID; ?>"<?php if( $value[$counter]['doom_route-waypoints'] == $page->ID ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>

									<?php }}} ?>
							</select>

                	<?php } else {?>

                        <select class="waypnt" name="<?php echo $name; ?>[]" id="<?php echo $name; ?>-<?php echo $counter;?>">

							<?php	// Pull all the pages into an array
							$options_pages = array();
							//$options_pages_obj = get_pages('sort_column=post_parent,menu_order');
							$options_pages_obj = get_posts('post_type=interroute&posts_per_page=-1&orderby=title&order=asc');

							if( is_array($options_pages_obj) && !empty($options_pages_obj) ){

								$options_pages[''] = 'Select a Route:';

								foreach( $options_pages_obj as $page ){

									$options_pages[$page->ID] = $page->post_title; //echo $page->ID;

									if( $selected_page[$i] == $page->ID ){ ?>
										<option value="<?php echo $page->ID; ?>"<?php if( $value[$counter]['doom_route-waypoints'] == $page->ID ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>
			<?php } else { ?>
										<option value="<?php echo $page->ID; ?>"<?php if( $value[$counter]['doom_route-waypoints'] == $page->ID ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>

									<?php }}} ?>
						</select>

					<?php } ?>
				<?php
					$counter++;
				}
			} else {?>
				<br />
				<textarea type="text" name="<?php echo $name; ?>[]" id="<?php echo $name; ?>" placeholder="Question"></textarea>

				<select class="waypnt" name="<?php echo $name; ?>[]" id="<?php echo $name; ?>">

					<?php	// Pull all the pages into an array
					$options_pages = array();
					//$options_pages_obj = get_pages('sort_column=post_parent,menu_order');
					$options_pages_obj = get_posts('post_type=interroute&posts_per_page=-1&orderby=title&order=asc');

					if( is_array($options_pages_obj) && !empty($options_pages_obj) ){

						$options_pages[''] = 'Select a Route:';

						foreach( $options_pages_obj as $page ){

							$options_pages[$page->ID] = $page->post_title; //echo $page->ID;

							if( $selected_page[$i] == $page->ID ){ ?>
								<option value="<?php echo $page->ID; ?>"<?php if( $value == $page->ID ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>
			<?php } else { ?>
								<option value="<?php echo $page->ID; ?>"<?php if( $value == $page->ID ) { echo ' selected="selected"'; } ?>><?php echo $page->post_title; ?></option>

						<?php }}} ?>
				</select>
			<?php } ?>
			<div class="meta-desc"><?php echo $desc; ?></div>
			<input class="waypnt_nonce" type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />
		</div>
		<?php /**/ ?>

<?php } function get_meta_textarea( $args = array(), $value = false ) {
extract( $args ); ?>

	<div class="meta-box <?php if($size == "large") { ?>meta-box-large<?php } ?>">
		<strong><?php echo $title; ?></strong>
		<div class="meta-desc"><?php echo $desc; ?></div>
		<br/><textarea name="<?php echo $name; ?>" id="<?php echo $name; ?>" cols="60" rows="4" tabindex="30"><?php echo esc_html( $value, 1 ); ?></textarea>
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />
	</div>


<?php } function get_meta_checkbox( $args = array(), $value = false ) {
extract( $args ); ?>

	<div class="meta-box">
		<strong><?php echo $title; ?></strong>
		<?php if( esc_html($value, 1 ) ){ $checked = "checked=\"checked\""; } else { if ( $std === "true" ){ $checked = "checked=\"checked\""; } else { $checked = ""; } } ?>
		<input type="checkbox" name="<?php echo $name; ?>" id="<?php echo $name; ?>" value="false" <?php echo $checked; ?> />
		<div class="meta-desc"><?php echo $desc; ?></div>
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" /></p>
	</div>


<?php } function get_meta_richtext( $args = array(), $value = false ) {
extract( $args ); ?>
	<div class="meta-box">
		<strong><?php echo $title;?></strong>
		<div class="meta-desc"><?php echo $desc; ?></div>
		<?php wp_editor( $value, $name, array(
			'wpautop'       => true,
			'media_buttons' => false,
			'textarea_name' => $name,
			'textarea_rows' => 10,
			'teeny'         => false
		) ); ?>
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>" />
		<br/>
		<br/>
		<hr/>
	</div>
<?php }

function doom_save_meta_data( $post_id ) {
	global $post;

	if ( 'page' == $_POST['post_type'] )
		$meta_boxes = array_merge( doom_page_meta_boxes() );
	elseif ( 'post' == $_POST['post_type'] )
		$meta_boxes = array_merge( doom_post_meta_boxes() /*, doom_page_meta_boxes() */);
	elseif ( 'product' == $_POST['post_type'] )
		$meta_boxes = array_merge( doom_product_meta_boxes() /*, doom_page_meta_boxes() */);
	elseif ( 'retailer' == $_POST['post_type'] )
		$meta_boxes = array_merge( doom_retailer_meta_boxes() /*, doom_page_meta_boxes() */);
	elseif ( 'package' == $_POST['post_type'] )
$meta_boxes = array_merge( doom_package_meta_boxes() /*, doom_page_meta_boxes() */);
	else
		$meta_boxes = array_merge( doom_insect_meta_boxes() );

	foreach ( $meta_boxes as $meta_box ) :

		if ( !wp_verify_nonce( $_POST[$meta_box['name'] . '_noncename'], plugin_basename( __FILE__ ) ) )
			return $post_id;

		if ( 'page' == $_POST['post_type'] && !current_user_can( 'edit_page', $post_id ) )
			return $post_id;

		elseif ( 'post' == $_POST['post_type'] && !current_user_can( 'edit_post', $post_id ) )
			return $post_id;

		elseif ( 'insect' == $_POST['post_type'] && !current_user_can( 'edit_post', $post_id ) )
			return $post_id;

		elseif ( 'product' == $_POST['post_type'] && !current_user_can( 'edit_post', $post_id ) )
			return $post_id;

		elseif ( 'retailer' == $_POST['post_type'] && !current_user_can( 'edit_post', $post_id ) )
			return $post_id;

		elseif ( 'package' == $_POST['post_type'] && !current_user_can( 'edit_post', $post_id ) )
			return $post_id;

		$data = stripslashes( $_POST[$meta_box['name']] );

		if ( get_post_meta( $post_id, $meta_box['name'] ) == '' )
			add_post_meta( $post_id, $meta_box['name'], $data, true );

		elseif ( $data != get_post_meta( $post_id, $meta_box['name'], true ) )
			update_post_meta( $post_id, $meta_box['name'], $data );

		elseif ( $data == '' )
			delete_post_meta( $post_id, $meta_box['name'], get_post_meta( $post_id, $meta_box['name'], true ) );

	endforeach;
}?>
