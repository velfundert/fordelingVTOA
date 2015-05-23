<?php

require("/wp-includes/pluggable.php")


// this could be REST, but there's only one controller here, so really it's
// kinda bare-bones QDREST for lazy people

function post_action($request) {

	// users need to be logged in to post
	if ( !is_user_logged_in() ) {
		header("HTTP/1.0 401 Unauthorized");
		return null;
	}

	// parse post, do something meaningful
}

function get_action($request) {

	// this:
	// empty request --> send list of files
	foreach ( scandir( "../csv/" ) as $filename ) {
		echo $filename;
	}	

	// TODO:
	// create a format for $request
	// use proper variable names

	// non-empty request --> send contents of file they wanted
	if ( exists( $filename ) ) 
		foreach( file( $filename ) as $line
			echo $line;


}

function illegal_request($request_method) {
	// send a 400 or a 403 ??
	header("HTTP/1.1 405 Method Not Allowed");
	echo $request_method." is not allowed!";
	return;
}

// handle request, call one of the functions above
switch ($_SERVER['REQUEST_METHOD']) {
	case 'POST':
		post_action( $some_variable );
		break;
	case 'GET':
		get_action( $some_variable );
		break;
	default:
		illegal_request( $_SERVER['REQUEST_METHOD'] );
}


?>
