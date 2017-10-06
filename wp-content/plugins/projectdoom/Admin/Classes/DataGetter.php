<?php

/**
 *
 */
class DataGetter
{

  const POST_GETS = "ID, post_content, post_title, post_type, post_name, post_date";
  const TERM_GETS = "term_id, name, slug";
  const TAX_GETS = "t.name, tt.term_id, taxonomy, term_taxonomy_id, description";
  const O_TAX_GETS = "tt.term_id, taxonomy, tt.term_taxonomy_id, description";
  const O_TERM_GETS = "t.term_id, t.name, t.slug";
  // const FAQ_GETS = "";

  function __construct($arg)
  {
    # code...
  }
  //get "static" pages
  static function getPages() {
    global $wpdb;
    $gets = DataGetter::POST_GETS;
    $sql = "SELECT $gets FROM $wpdb->posts WHERE post_type LIKE 'page' AND post_status LIKE 'publish'";
    $posts = $wpdb->get_results($sql);
    $posts = json_decode(json_encode($posts), true);
    return DataGetter::buildObject($posts);

  }
  //get "static" page by slug
  static function getPage($slug) {
    global $wpdb;
    $gets = DataGetter::POST_GETS;
    $sql = "SELECT $gets FROM $wpdb->posts WHERE post_type LIKE 'page' AND post_status LIKE 'publish' AND post_name = %s";
    $posts = $wpdb->get_results($wpdb->prepare($sql,$slug));
    $posts = json_decode(json_encode($posts), true);
    return DataGetter::buildObject($posts);

  }
//queries by post type - insect/product/package/retailer
   static function postAll($post) {
     global $wpdb;
     $gets = DataGetter::POST_GETS;
    return "SELECT $gets FROM $wpdb->posts
            WHERE post_type LIKE '$post'
            AND post_status LIKE 'publish'";
  }

  static function postId($post) {
    global $wpdb;
    $gets = DataGetter::POST_GETS;
    return "SELECT $gets FROM $wpdb->posts WHERE post_type LIKE '$post' AND post_status LIKE 'publish' AND ID = %d";
  }

  static function buildObject($posts) {
    global $wpdb;
    //--cut to own function
    $result = array();
    foreach ($posts as $key => $post) {
      $post_id = $post["ID"];
      $taxonomies = $wpdb->get_results("
        SELECT ".DataGetter::O_TAX_GETS." FROM $wpdb->term_taxonomy AS tt
        LEFT JOIN $wpdb->term_relationships AS tr ON (tt.term_taxonomy_id = tr.term_taxonomy_id)
        WHERE tr.object_id = $post_id");
        // AND tr.term_taxonomy_id = tt.term_taxonomy_id");
      // $post["taxonomy"] = $taxonomies;
      $taxonomies = json_decode(json_encode($taxonomies), true);
      foreach ($taxonomies as $rkey => $tax) {
        $tax_id = $tax["term_taxonomy_id"];
        $terms = $wpdb->get_results("
          SELECT ".DataGetter::O_TERM_GETS." FROM $wpdb->terms AS t
          LEFT JOIN $wpdb->term_taxonomy AS tt ON (t.term_id = tt.term_id)
          WHERE tt.term_taxonomy_id = $tax_id");
        $terms = array_values($terms);
        if (!isset($post[$tax["taxonomy"]])) {
          $post[$tax["taxonomy"]] = array();
        }
        foreach ($terms as $rkey => $term) {
          array_push($post[$tax["taxonomy"]], $term);
        }
      }
      //--
      //get meta-keys
      $keys = $wpdb->get_results("
        SELECT meta_key, meta_value
        FROM $wpdb->postmeta AS pm
        WHERE pm.post_id = $post_id
        AND (pm.meta_key LIKE 'doom_%'
        OR pm.meta_key LIKE 'fids_%'
        OR pm.meta_key LIKE '_thumbnail_id')");
      foreach ($keys as $i => $key) {
        $post[$key->meta_key] = $key->meta_value;
        if ($key->meta_key == '_thumbnail_id') {
          $post["image"] = $wpdb->get_results($wpdb->prepare("
            SELECT guid FROM $wpdb->posts WHERE ID = %d",$key->meta_value))[0]->guid;
        }
      }
      //--
      array_push($result, $post);
    }
    if (DOOM_DEBUG) {
      $result["queries"] = get_num_queries();
    }
    return $result;
  }

  static function getObjects($obj){
    global $wpdb;
    $posts = $wpdb->get_results(DataGetter::postAll($obj));
    $posts = json_decode(json_encode($posts), true);
    return DataGetter::buildObject($posts);
  }

  static function getObject($obj, $id){
    global $wpdb;
    $posts = $wpdb->get_results($wpdb->prepare(DataGetter::postId($obj),$id));
    $posts = json_decode(json_encode($posts), true);
    return DataGetter::buildObject($posts);
  }
  //--
  //queries by taxonomies
  static function taxAll() {
    global $wpdb;
   return "SELECT * FROM $wpdb->terms";
  }

  static function taxId() {
    global $wpdb;
   return "SELECT * FROM $wpdb->terms where slug like %s";
 }


 static function getTaxonomies(){
   global $wpdb;
   $terms = $wpdb->get_results(DataGetter::taxAll());
   $terms = json_decode(json_encode(array_values($terms)), true);
   return DataGetter::buildTax($terms);
 }

 static function getTaxonomy($id){
   global $wpdb;
//  $terms = $wpdb->get_results($wpdb->prepare(DataGetter::taxId(),$id));
   $terms = $wpdb->get_results(DataGetter::taxAll());
   $terms = json_decode(json_encode(array_values($terms)), true);
  //  return $id;
   return DataGetter::buildTax($terms, $id);
 }

 static function buildTax($terms, $id) {
   global $wpdb;
   $result = array();

   foreach ($terms as $tkey => $term) {
     $term_id = $term["term_id"];
     $sql = "
       SELECT ".DataGetter::TAX_GETS." FROM $wpdb->term_taxonomy AS tt
       LEFT JOIN $wpdb->terms AS t ON (t.term_id = tt.term_id)
       WHERE tt.term_id = $term_id
       AND tt.count > 0";
     if (isset($id)) {
       $sql .= " AND tt.taxonomy LIKE '%s'";
     }
    //  return $wpdb->prepare($sql, $id);
     $taxonomies = $wpdb->get_results($wpdb->prepare($sql, $id));
     foreach ($taxonomies as $tkey => $tax) {
      $tax_id = $tax->term_taxonomy_id;
      $posts = $wpdb->get_results("
        SELECT ".DataGetter::POST_GETS." FROM $wpdb->posts AS p
        LEFT JOIN $wpdb->term_relationships AS tr ON (tr.object_id = p.ID)
        WHERE tr.term_taxonomy_id = $tax_id");
      $posts = json_decode(json_encode(($posts)));
      // return $posts;
      foreach ($posts as $pkey => $post) {
        $post_id = $post->ID;
        if (!isset($tax->{$post->post_type})) {
          $tax->{$post->post_type} = array();
        }
        array_push($tax->{$post->post_type}, $post);
        //get meta-keys
        // $keys = $wpdb->get_results("
        //   SELECT meta_key, meta_value
        //   FROM $wpdb->postmeta AS pm
        //   WHERE pm.post_id = $post_id
        //   AND pm.meta_key LIKE 'doom_%'");
        // foreach ($keys as $i => $key) {
        //   $post[$key->meta_key] = $key->meta_value;
        // }
        //--
      }
      if (!isset($result[$tax->taxonomy])) {
        $result[$tax->taxonomy] = array();
      }
      array_push($result[$tax->taxonomy], $tax);
    }
   }
   if (DOOM_DEBUG) {
     $result["queries"] = get_num_queries();
   }
   return $result;
 }


  //queries by terms
  static function termAll($q) {
    global $wpdb;
    $gets = DataGetter::TERM_GETS;
    if ($q === null) {
      return "SELECT $gets FROM $wpdb->terms";
    } else {
      $q = htmlspecialchars($q);
      $q = explode(',',$q);
      // return $q;
      $where = "WHERE ";
      foreach ($q as $key => $term) {
        if ($key === count($q)-1) {
          $where .= "slug LIKE '$term' ";
        } else {
          $where .= "slug LIKE '$term' OR ";
        }
      }
      return "SELECT $gets FROM $wpdb->terms " . $where;
    }
  }

  static function termId() {
    global $wpdb;
    $gets = DataGetter::TERM_GETS;
   return "SELECT $gets FROM $wpdb->terms where slug like %s";
 }


 static function getTerms($q){
   global $wpdb;
  //  return DataGetter::termAll($q);
   $terms = $wpdb->get_results(DataGetter::termAll($q));
   $terms = json_decode(json_encode(array_values($terms)), true);
  //  return DataGetter::termAll($q);
   return DataGetter::buildTerm($terms);
 }

 static function getTerm($id){
   global $wpdb;
   $terms = $wpdb->get_results($wpdb->prepare(DataGetter::termId(),$id));
   $terms = json_decode(json_encode(array_values($terms)), true);
   return DataGetter::buildTerm($terms);
 }

 static function buildTerm($terms) {
   global $wpdb;
   $result = array();

   foreach ($terms as $tkey => $term) {
     $term_id = $term["term_id"];
     $taxonomies = $wpdb->get_results("
       SELECT ".DataGetter::TAX_GETS." FROM $wpdb->term_taxonomy AS tt
       LEFT JOIN $wpdb->terms AS t ON (t.term_id = tt.term_id)
       WHERE tt.term_id = $term_id
       AND tt.count > 0
       ORDER BY tt.taxonomy ASC");
     foreach ($taxonomies as $tkey => $tax) {
      $tax_id = $tax->term_taxonomy_id;
      $posts = $wpdb->get_results("
        SELECT ".DataGetter::POST_GETS." FROM $wpdb->posts AS p
        LEFT JOIN $wpdb->term_relationships AS tr ON (tr.object_id = p.ID)
        WHERE tr.term_taxonomy_id = $tax_id");
      $posts = json_decode(json_encode(($posts)));
      // return $posts;
      foreach ($posts as $pkey => $post) {
        $post_id = $post->ID;
        if (!isset($tax->{$post->post_type})) {
          $tax->{$post->post_type} = array();
        }
        array_push($tax->{$post->post_type}, $post);
        //get meta-keys
        $keys = $wpdb->get_results("
          SELECT meta_key, meta_value
          FROM $wpdb->postmeta AS pm
          WHERE pm.post_id = $post_id
          AND pm.meta_key LIKE 'doom_%'
          OR pm.meta_key LIKE '_thumbnail_id'");
        foreach ($keys as $i => $key) {
          $post->{$key->meta_key} = $key->meta_value;
          if ($key->meta_key == '_thumbnail_id') {
            $post["image"] = $wpdb->get_results($wpdb->prepare("
              SELECT guid FROM $wpdb->posts WHERE ID = %d",$key->meta_value))[0]->guid;
          }
        }
        //--
      }
      // if (!isset($result[$tax->taxonomy])) {
      //   $result[$tax->taxonomy] = array();
      // }
      array_push($result, $tax);
    }
   }
   if (DOOM_DEBUG) {
     $result["queries"] = get_num_queries();
   }
   return $result;
 }

 static private function getFaqSql() {
    global $wpdb;
    // $search = esc_html($search);
    $gets = DataGetter::POST_GETS;
    return "SELECT $gets
    FROM $wpdb->posts
    WHERE post_status LIKE 'publish'
    AND post_type LIKE 'faq'
    ORDER BY post_date DESC";
 }

static public function getFaqs() {
 //  return 'get';
  global $wpdb;
   // $search = esc_html($search);
   $sql = DataGetter::getFaqSql();

   return $wpdb->get_results($sql);
 }

  static public function getFaq($id) {
    global $wpdb;
    $sql = DataGetter::getFaqSql() . "AND ID = %d";

    return $wpdb->get_results($wpdb->prepare($sql, $id));
  }

 // static public function searchFaq($search) {
 //  //  return 'search';
 //   global $wpdb;
 //    // $search = esc_html($search);
 //    $sql = "SELECT *
 //    FROM $wpdb->posts
 //    WHERE MATCH(post_content, post_title)
 //    AGAINST('%s' IN NATURAL LANGUAGE MODE) AND
 //    post_type LIKE 'faq'
 //    AND post_status LIKE 'publish'";
 //
 //    return $result = array('count' => count($posts), 'results' => $posts, 'method' => 'natural');
 //  }

 static public function searchPosts($search, $post = '%%') {
  //  return 'search';
  if (empty($search)) {
    return null;
  }
  $time = microtime();
   global $wpdb;
    // $search = esc_html($search);
    $sql = "SELECT ".DataGetter::POST_GETS." FROM $wpdb->posts WHERE post_type LIKE '$post' AND post_type NOT LIKE 'post' AND post_type NOT LIKE 'page' AND post_type NOT LIKE 'retailer' AND post_status LIKE 'publish'";
    $search = urldecode($search);
    $isSpecific = DataGetter::startsAndEndsWith($search,'"');
    //Natural language search if string doesn't start and end with "
    if (!$isSpecific) {
      $natural = $sql . " AND MATCH(post_content, post_title) AGAINST('%s' IN NATURAL LANGUAGE MODE)";
        // $attachment = urldecode($search);
        // return str_replace('%s', $attachment, $natural);
        // return $wpdb->prepare($natural, urldecode($search));
      $posts = $wpdb->get_results($wpdb->prepare($natural, $search));
      
      foreach ($posts as $pkey => $post) {
        $post_id = $post->ID;
        //get meta-keys
        $keys = $wpdb->get_results("
          SELECT meta_key, meta_value
          FROM $wpdb->postmeta AS pm
          WHERE pm.post_id = $post_id
          AND (pm.meta_key LIKE 'doom_%'
          OR pm.meta_key LIKE '_thumbnail_id')");
        foreach ($keys as $i => $key) {
          $post->{$key->meta_key} = $key->meta_value;
          if ($key->meta_key == '_thumbnail_id') {
            $post->image = $wpdb->get_results($wpdb->prepare("
              SELECT guid FROM $wpdb->posts WHERE ID = %d",$key->meta_value))[0]->guid;
          }
        }
        //--
      }
      if (count($posts) > 0) {
        $dur  = round((microtime() - $time), 6);
        return $result = array('time' => $dur, 'count' => count($posts), 'results' => $posts, 'method' => 'natural');
      }
    }

    //if fail or "" then BOOLEAN search
    $boolean = $sql . "
      AND MATCH(post_content, post_title)
      AGAINST('%s' IN BOOLEAN MODE)";
    $posts = $wpdb->get_results($wpdb->prepare($boolean, '*+'.str_ireplace(" ", "+", $search)));
    
    foreach ($posts as $x => $post) {
      //get meta-keys
      $keys = $wpdb->get_results("
        SELECT meta_key, meta_value
        FROM $wpdb->postmeta AS pm
        WHERE pm.post_id = $post->ID
        AND pm.meta_key LIKE 'doom_%'
        OR pm.meta_key LIKE '_thumbnail_id'");
      foreach ($keys as $i => $key) {
        $post->{$key->meta_key} = $key->meta_value;
        if ($key->meta_key == '_thumbnail_id') {
          $post->image = $wpdb->get_results($wpdb->prepare("
            SELECT guid FROM $wpdb->posts WHERE ID = %d",$key->meta_value))[0]->guid;
        }
      }
      //--
    }
    if (count($posts) > 0) {
      $dur  = round((microtime() - $time), 6);
      return $result = array('time' => $dur, 'count' => count($posts), 'results' => $posts, 'method' => 'boolean');
    }

    //if fail and not "" then BASIC search
    if (!$isSpecific) {
      $basic = $sql . "
        AND (";
      $search = explode(' ', $search);

      foreach ($search as $key => $value) {
        if ($key != 0) {$basic .= "OR ";}
        $basic .= "
          post_content LIKE '%$value%'
          OR post_title LIKE '%$value%'";
      }
      $basic .= ")";
      // return var_dump($search, true) ." - ".$basic;
      // $posts = $wpdb->get_results($wpdb->prepare($basic, '%'.$search.'%', '%'.$search.'%'));
      $posts = $wpdb->get_results($basic);
      
      foreach ($posts as $x => $post) {
        //get meta-keys
        $keys = $wpdb->get_results("
          SELECT meta_key, meta_value
          FROM $wpdb->postmeta AS pm
          WHERE pm.post_id = $post->ID
          AND pm.meta_key LIKE 'doom_%'
          OR pm.meta_key LIKE '_thumbnail_id'");
        foreach ($keys as $i => $key) {
          $post->{$key->meta_key} = $key->meta_value;
          if ($key->meta_key == '_thumbnail_id') {
            $post->image = $wpdb->get_results($wpdb->prepare("
              SELECT guid FROM $wpdb->posts WHERE ID = %d",$key->meta_value))[0]->guid;
          }
        }
        //--
      }
      //--
      if (count($posts) > 0) {
        $dur  = round((microtime() - $time), 6);
        $result = array('time' => $dur, 'count' => count($posts), 'results' => $posts, 'method' => 'basic');
      }
    }
    // return $sql . "</br>" .
    // $natural . "</br>" .
    // $boolean . "</br>" .
    // $basic . "</br>";
    return $result;
  }
#===============================================================================
# Test function for fuzzy searching - Omitted because VERY slow (0.3s - 0.5s)
#===============================================================================
//   static private function TestFuzzy($search, $wpdb) {
//     $sql = "drop function if exists soundex_match;
// delimiter $$
// create function soundex_match (needle varchar(128), haystack text, splitChar varchar(1)) returns tinyint
//   deterministic
//   begin
//     declare spacePos int;
//     declare searchLen int default length(haystack);
//     declare curWord varchar(128) default '';
//     declare tempStr text default haystack;
//     declare tmp text default '';
//     declare soundx1 varchar(64) default soundex(needle);
//     declare soundx2 varchar(64) default '';
//
//     set spacePos = locate(splitChar, tempStr);
//
//     while searchLen > 0 do
//       if spacePos = 0 then
//         set tmp = tempStr;
//         select soundex(tmp) into soundx2;
//         if soundx1 = soundx2 then
//           return 1;
//         else
//           return 0;
//         end if;
//       end if;
//
//       if spacePos != 0 then
//         set tmp = substr(tempStr, 1, spacePos-1);
//         set soundx2 = soundex(tmp);
//         if soundx1 = soundx2 then
//           return 1;
//         end if;
//         set tempStr = substr(tempStr, spacePos+1);
//         set searchLen = length(tempStr);
//       end if;
//
//       set spacePos = locate(splitChar, tempStr);
//
//     end while;
//
//     return 0;
//
//   end
// $$
// delimiter ;
//
// SELECT * FROM $wpdb->posts WHERE soundex_match('$search', post_content, ' ')";
//
//  // return $sql;
//     $posts = $wpdb->get_results($sql);
//     // if (count($posts) > 0) {
//       $dur  = round((microtime() - $time), 6);
//       return $result = array('time' => $dur, 'count' => count($posts), 'results' => $posts, 'method' => 'fuzzy');
//     // }
//   }

  static private function startsAndEndsWith($haystack, $needle) {
    return (strpos($haystack, $needle) === 0 && strrpos($haystack, $needle, -0) === strlen($haystack)-1);
  }
}


 ?>
