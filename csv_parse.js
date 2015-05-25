/**
 * ParseCSV( csv_string [, verbose ] )
 *
 * ParseCSV parses a string from a csv-file, and returns an array
 */
function ParseCSV( csv_string ) {

	var verbose = false;
	if (arguments.length > 1)
		verbose = arguments[1];

	function findSep( line ) {
		// start with ; for silly excel
		var i = line.indexOf(";");

		if ( i != -1 ) {
			if ( verbose ) console.log("separator is ; which isn't really the standard is it");
			i = line.indexOf(",");
			if ( i != -1 ) {
				if ( verbose ) console.log("someone has put , in the integers or something!!");
			}
			return ";";
		}

		i = line.indexOf(",");
		if ( i != -1 ) return ",";
	}

	function split( line, sep ) {
		// some code that fixes wild decimal separators ( , to . )
		var temp = line.split( sep );

		// this part fixes numbers with , as decimal separator
		var i;
		for ( i = 0; i < temp.length; ++i) {
			temp[i] = temp[i].replace(",",".");
		}
		return temp
	}

	var sep = findSep( csv_string.substr( 0, csv_string.indexOf("\n", 0)) );
	var data = new Array();

	var i = 0;

	while (i < csv_string.length) {
		var j = csv_string.indexOf("\n", i);
		if (j == -1)
			j = csv_string.length;

		data.push( split( csv_string.substr( i, j-i), sep ) );

		i = j+1;
	}

	return data;
}
