function saintLagueElect( votes, noOfSeats ) {

	var i,
		j = 0,
		votelog = [],
		seats = votes.map( function( val ) { return [ 0, val[1] ]; }),
		temp_votes = votes.map( function( val ) { return parseFloat( val[0] ); });

	function voteMax( where ) {
		var m = 0,
			w = 0,
			i;

		for ( i = 0; i < where.length; i++ ) {
			if ( where[i] > m ) {
				m = where[i];
				w = i;
			}
		}
		return w;
	}

	for ( i = 0; i < noOfSeats; i++ ) {
		j = voteMax( temp_votes );
		votelog.push("" + votes[j][1] + " får plass "+ (i+1) +", stemmetall: " + temp_votes[j] );
		seats[ j ][0] += 1;
		temp_votes[ j ] = votes[ j ][0] / ( 2 * seats[ j ][0] +1 );
	}

	seats.sort( function (a, b) { return b[0] - a[0]; } );

	return {
		"seats": seats,
		"votelog": votelog
	};

}
