function SaintLague ( votes, noOfSeats ) {

	this.votecopy = votecopy;
	this.deepcopy = deepcopy;
	this.elect = elect;
	this.voteMax = voteMax;

	this.valgforsamling = [];
	this.noOfSeats = noOfSeats;
	this.votes = votes;
	this.seats = this.deepcopy( votes );
	this.votelog = [];

	function elect() {

		var j = 0,
			i,
			temp_votes = this.votecopy( this.votes );

		for ( i = 0; i < this.noOfSeats; i++ ) {
			j = this.voteMax( temp_votes );
			this.votelog.push("" + this.votes[j][1] + " får plass "+ (i+1) +", stemmetall: " + temp_votes[j] );
			this.seats[ j ][0] += 1;
			temp_votes[ j ] = this.votes[ j ][0] / ( 2 * this.seats[ j ][0] +1 );
		}
		this.seats.sort( function (a, b) { return b[0] - a[0]; } );
	}


	function votecopy( what ) {
		var temp = [],
			i;

		for ( i = 0; i < what.length; i++) {
			temp.push( parseFloat( what[i][0] ) );
		}
		return temp;
	}

	function deepcopy( what ) {
		var temp = [],
			i;

		for ( i = 0; i < what.length; i++ ) {
			temp.push( what[i].slice() );
			temp[i][0] = 0;
		}
		return temp;
	}

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
}
