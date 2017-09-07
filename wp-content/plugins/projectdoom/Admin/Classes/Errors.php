<?php
#=====================================
#
#=====================================
class Errors
{

  public static function getError($err) {
    switch ($err) {
      case "invalid_input" :
        return new WP_Error( 'doom_invalid_input', 'The required input is invalid or too short.', array( 'status' => 400 ) );
      case "no_result" :
        return new WP_Error( 'doom_no_results', 'There is no result.', array( 'status' => 500 ) );
    }
  }

}

?>
