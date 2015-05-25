<?php

require("/wp-includes/pluggable.php")

// CHANGE THIS TO MATCH YOUR SETUP
$THIS_BASENAME = "/mandater/REST";

function update_index( $key, $name ) {	
	$indexf = fopen("index.json", "r+");

	$i = 0;

	while ( ($lock_success = flock($indexf, LOCK_EX)) === false && $i < 20  ) {
		sleep 1;
		$i++;
	}

	if ( !$lock_success ) {
		header("HTTP/1.1 500 Internal Server Error");
		echo "Could not update data. Server might be overloaded.";
		fclose($indexf);
		return "";
	}
	
	$index = json_decode( fread( $indexf, filesize( "index.json" ) ) );

	array_push( $index, array( $key, $name ) );

	fseek( $indexf, 0 );
	fwrite( $indexf, json_encode( $index ) );
	fflush( $indexf );

	flock( $indexf, LOCK_UN );
	fclose( $indexf );

	return $index;
}

// this could be REST, but there's only one controller here, so really it's
// kinda bare-bones QDREST for lazy people

function post_action($request) {

	// users need to be logged in to post
	if ( !is_user_logged_in() ) {
		header("HTTP/1.1 401 Unauthorized");
		echo "Please log in via wordpress.";
		return null;
	}

	if ( trim( $request["body"] ) == "whoami" ) {
		echo wp_get_current_user()->user_login;
		return;
	}

	if ( $request["content-type"] != "application/json" || trim( $request["body"] )[0] != "{" ) { // something is off
		header("HTTP/1.1 400 Bad Request");
		echo "Error, expected json data.";
		return;
	}

	// parse post, do something meaningful
	
	$data = json_decode( $request["body"] );
	if (json_last_error() != JSON_ERROR_NONE ) {
		header("HTTP/1.1 400 Bad Request");
		echo "Error, json failed validation.";
		return;
	}

	// check and sanitize title:
	if (array_key_exists( "title", $data ) { 
		$title = preg_replace("([^\w\d\-_.])", '_', $data["title"]);
		if ( strlen( $title ) == 0 ) 
			$title = "untitled";
	} else {
		$title = "untitled";
		$data["title"] = "untitled";
	}

	$filename = $title.".json";
	$i = 0;
	while ( file_exists( $filename ) )
		$filename = $title . ++$i . ".json" ;

	if ( $title == "untitled" ) {
		data["title"] = "untitled" . $i;
	}

	file_put_contents( $filename, $request["body"] );
	
	// update index to match
	
	$index = update_index ( $filename, $data["title"] );

	if( strlen( $index ) > 0 ) {
		// it failed
		return;
	}

	// success. return new index:
	header("HTTP/1.1 201 Created");
	header("Content-Type: application/json");
	echo json_encode( $index );

	return;
}

function get_action($request) {

	// empty request --> send list of files
	if ( $request["target"] == $THIS_BASENAME ) {
		header("Content-Type: application/json");
		readfile("index.json");
		return;
	}

	if ( substr( $request["target"], 0, strlen( $THIS_BASENAME ) ) != $THIS_BASENAME )
		header("HTTP/1.1 403 Forbidden");

	$filename = "data/" . ltrim( substr( $request["target"], strlen( $THIS_BASENAME ) -1 ), "/\\") . ".json";

	// non-empty request --> send contents of file they wanted
	if ( file_exists( $filename ) ) {
		header("Content-Type: application/json");
		readfile( $filename );
	} else {
		header("HTTP/1.1 404 File Not Found");
		echo "Could not find " . $filename . "!";
	}

	return;
}

function illegal_request($request_method) {

	header("HTTP/1.1 405 Method Not Allowed");
	echo $request_method." is not allowed!";
	return;
}

$request = array(
	'target' => $_SERVER['REQUEST_URI'],
	'content-type' => ( isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : false ),
	'body' => file_get_contents("php://input"), 
);

// handle request, call one of the functions above
switch ($_SERVER['REQUEST_METHOD']) {
case 'POST':
	post_action( $request );
	break;
case 'GET':
	get_action( $request );
	break;
default:
	illegal_request( $_SERVER['REQUEST_METHOD'] );
}


?>
