<?php

require_once("Classes/DataGetter.php");
require_once("Classes/Errors.php");

global $wpdb;
#-----------------------------------------------------------------------------------*/
#	Test REST
#-----------------------------------------------------------------------------------*/

/**
 * Get a page from a slug
 *.
 * @return Page Object,  * or null if none.
 */
function getPage( $data ) {
  $result = DataGetter::getPage($data->get_param("slug"));
  if ( empty( $result ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($result);
}
/**
 * Get all the products
 *.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getProducts( ) {
  $posts = DataGetter::getObjects("product");
  if ( empty( $posts ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($posts);
}

/**
 * Get the product by ID!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getProduct( $data ) {
  $posts = DataGetter::getObject("product",$data->get_param("id"));
  if ( empty( $posts ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($posts);
}

/**
 * Search for the product!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function searchProduct( $data ) {
  $q = $data->get_param("q");

  if (empty($q) || strlen($q) < 3) {
    return Errors::getError("invalid_input");
  }
  $result = DataGetter::searchPosts($q, 'product');
  if ( empty( $result ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($result);
}

/**
 * Get all the insects
 *.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getInsects( ) {
  $posts = DataGetter::getObjects("insect");
  if ( empty( $posts ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($posts);
}

/**
 * Get the insect by ID!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getInsect( $data ) {
  $posts = DataGetter::getObject("insect",$data->get_param("id"));
  if ( empty( $posts ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($posts);
}

/**
 * Search for the Insect!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function searchInsect( $data ) {
  $q = $data->get_param("q");

  if (empty($q) || strlen($q) < 3) {
    return Errors::getError("invalid_input");
  }
  $result = DataGetter::searchPosts($q, 'insect');
  if ( empty( $result ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($result);
}

/**
 * Get all the retailers
 *.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getRetailers( ) {
  $posts = DataGetter::getObjects("retailer");
  if ( empty( $posts ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($posts);
}

/**
 * Get the retailer by ID!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getRetailer( $data ) {
  $posts = DataGetter::getObject("retailer",$data->get_param("id"));
  if ( empty( $posts ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($posts);
}

/**
 * Get all the packages
 *.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getPackages( ) {
  $posts = DataGetter::getObjects("package");
  if ( empty( $posts ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($posts);
}

/**
 * Get the retailer by ID!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getPackage( $data ) {
  $posts = DataGetter::getObject("package",$data->get_param("id"));
  if ( empty( $posts ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($posts);
}



/**
 * Get the products in all taxonomies!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getTaxonomies( $data ) {
  $taxonomies = DataGetter::getTaxonomies();
  if ( empty( $taxonomies ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($taxonomies);
}

/**
 * Get the products in a taxonomy!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getTaxonomy( $data ) {
  $taxonomies = DataGetter::getTaxonomy($data->get_param("name"));
  // return $data->get_param("slug");
  if ( empty( $taxonomies ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($taxonomies);
}


/**
 * Get the products in all taxonomies!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getTerms( $data ) {
  $q = $data->get_param("q");

  if (!preg_match('/(\w+(,\w+)*)?/',$q)) {
      return Errors::getError("invalid_input");
  }
  $terms = DataGetter::getTerms($q);
  if ( empty( $terms ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($terms);
}

/**
 * Get the products in a taxonomy!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getTerm( $data ) {
  $terms = DataGetter::getTerm($data->get_param("slug"));
  // return $data->get_param("slug");
  if ( empty( $terms ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($terms);
}

function searchPosts( $data ) {
  $q = $data->get_param("q");

  if (empty($q) || strlen($q) < 3) {
    return Errors::getError("invalid_input");
  }
  $result = DataGetter::searchPosts($q);
  if ( empty( $result ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($result);
}

function all( $data ) {
  $q = '%%';


  $result = DataGetter::searchPosts($q);
  if ( empty( $result ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($result);
}

function getFaqs( $data ) {
  $result = DataGetter::getFaqs();
  if ( empty( $result ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($result);
}

function getFaq( $data ) {
  $result = DataGetter::getFaq($data->get_param("id"));
  if ( empty( $result ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($result);
}

function searchFaq( $data ) {
  $q = $data->get_param("q");

  if (empty($q) || strlen($q) < 3) {
    return Errors::getError("invalid_input");
  }
  $result = DataGetter::searchPosts($q, 'faq');
  if ( empty( $result ) ) {
    return Errors::getError("no_result");
  }
  return new WP_REST_Response($result);
}

add_action( 'rest_api_init', function () {
  $version = "1";
  $namespace = "doom/v".$version;
  //search
  register_rest_route( "$namespace", '/all', array(
    'methods' => 'GET',
    'callback' => 'all'
  ) );
  //search
  register_rest_route( "$namespace", '/search', array(
    'methods' => 'GET',
    'callback' => 'searchPosts',
    'args' => array(
      'query' => array(
        'description' => 'An alphanumeric identifier for the object. Called as /search/q=',
        'type' => 'text',
        'validate_callback' => 'esc_html'
      ))
  ) );
  //Page
  register_rest_route( "$namespace", '/page/(?P<slug>[\w-]+)', array(
    'methods' => 'GET',
    'callback' => 'getPage',
    'args' => array(
      'query' => array(
        'description' => 'An alphanumeric identifier for the object.',
        'type' => 'text',
        'validate_callback' => 'esc_html'
      ))
  ) );
  //products
  register_rest_route( "$namespace", '/product', array(
    'methods' => 'GET',
    'callback' => 'getProducts',
  ) );
  register_rest_route( "$namespace", '/product/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'getProduct',
    'args' => array(
      'id' => array(
        'description' => 'A numeric identifier for the object.',
        'type' => 'int',
        'validate_callback' => 'is_numeric'
      ))
  ) );
  register_rest_route( "$namespace", '/product/search', array(
    'methods' => 'GET',
    'callback' => 'searchProduct',
    'args' => array(
      'query' => array(
        'description' => 'An alphanumeric identifier for the object. Called as /faq/search/q=',
        'type' => 'text',
        'validate_callback' => 'esc_html'
      ))
  ) );
  //insects
  register_rest_route( "$namespace", '/insect', array(
    'methods' => 'GET',
    'callback' => 'getInsects',
  ) );
  register_rest_route( "$namespace", '/insect/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'getInsect',
    'args' => array(
      'id' => array(
        'description' => 'A numeric identifier for the object.',
        'type' => 'int',
        'validate_callback' => 'is_numeric'
      ))
  ) );
  register_rest_route( "$namespace", '/insect/search', array(
    'methods' => 'GET',
    'callback' => 'searchInsect',
    'args' => array(
      'query' => array(
        'description' => 'An alphanumeric identifier for the object. Called as /faq/search/q=',
        'type' => 'text',
        'validate_callback' => 'esc_html'
      ))
  ) );
  //retailers
  register_rest_route( "$namespace", '/retailer', array(
    'methods' => 'GET',
    'callback' => 'getRetailers',
  ) );
  register_rest_route( "$namespace", '/retailer/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'getRetailer',
    'args' => array(
      'id' => array(
        'description' => 'A numeric identifier for the object.',
        'type' => 'int',
        'validate_callback' => 'is_numeric'
      ))
  ) );
  //packages
  register_rest_route( "$namespace", '/package', array(
    'methods' => 'GET',
    'callback' => 'getPackages',
  ) );
  register_rest_route( "$namespace", '/package/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'getPackage',
    'args' => array(
      'id' => array(
        'description' => 'A numeric identifier for the object.',
        'type' => 'int',
        'validate_callback' => 'is_numeric'
      ))
  ) );
  //taxonomies
  register_rest_route( "$namespace", '/taxonomy', array(
    'methods' => 'GET',
    'callback' => 'getTaxonomies'
  ) );
  register_rest_route( "$namespace", '/taxonomy/(?P<name>[\w-]+)', array(
    'methods' => 'GET',
    'callback' => 'getTaxonomy',
    'args' => array(
      'name' => array(
        'description' => 'An alphanumeric identifier for the object.',
        'type' => 'text',
        'validate_callback' => 'esc_html'
      ))
  ) );
  //terms
  register_rest_route( "$namespace", '/term', array(
    'methods' => 'GET',
    'callback' => 'getTerms',
    'args' => array(
      'names' => array(
        'description' => 'Comma seperated alphanumeric identifiers for the object. Called as /term/q=',
        'type' => 'text',
        'validate_callback' => 'esc_html'
      ))
  ) );
  register_rest_route( "$namespace", '/term/(?P<slug>[\w-]+)', array(
    'methods' => 'GET',
    'callback' => 'getTerm',
    'args' => array(
      'slug' => array(
        'description' => 'An alphanumeric identifier for the object.',
        'type' => 'text',
        'validate_callback' => 'esc_html'
      ))
  ) );
  //FAQ
  register_rest_route( "$namespace", '/faq', array(
    'methods' => 'GET',
    'callback' => 'getFaqs'
  ) );
  register_rest_route( "$namespace", '/faq/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'getFaq',
    'args' => array(
      'id' => array(
        'description' => 'A numeric identifier for the object.',
        'type' => 'int',
        'validate_callback' => 'is_numeric'
      ))
  ) );
  register_rest_route( "$namespace", '/faq/search', array(
    'methods' => 'GET',
    'callback' => 'searchFaq',
    'args' => array(
      'query' => array(
        'description' => 'An alphanumeric identifier for the object. Called as /faq/search/q=',
        'type' => 'text',
        'validate_callback' => 'esc_html'
      ))
  ) );
} );

/*
*==========================
* Test Generic functions
*==========================
*/
/**
 * Get all the Objects!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getObjects( $data ) {
  $posts = DataGetter::getObjects($data->get_param("object"));
  if ( empty( $posts ) ) {
    return new WP_Error( 'doom_no_object', 'Invalid object', array( 'status' => 404 ) );
  }
  return $posts;
}

/**
 * Get all the Object by ID!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function getObject( $data ) {
  $posts = DataGetter::getObject($data->get_param("object"));
  if ( empty( $posts ) ) {
    return new WP_Error( 'doom_no_object', 'Invalid object', array( 'status' => 404 ) );
  }
  return $posts;
}
?>
