function SaintLague ( votes, noOfSeats ) {

    this.votecopy = votecopy;
    this.deepcopy = deepcopy;
    this.elect = elect;
    this.voteMax = voteMax;

    this.valgforsamling = new Array();
    this.noOfSeats = noOfSeats;
    this.votes = votes;
    this.seats = this.deepcopy( votes );
    this.votelog = new Array();

    function elect() {
        var temp_votes = this.votecopy( this.votes );
        var j = 0;

        for (var i = 0; i < this.noOfSeats; i++ ) {
            j = this.voteMax( temp_votes );
            this.votelog.push("" + this.votes[j][1] + " får plass "+ (i+1) +", stemmetall: " + temp_votes[j] );
            this.seats[ j ][0] += 1;
            temp_votes[ j ] = this.votes[ j ][0] / ( 2 * this.seats[ j ][0] +1 );
        }
        this.seats.sort( function (a, b) { return b[0] - a[0] } );
    }


    function votecopy( what ) {
        var temp = new Array();

        for (var i = 0; i < what.length; i++) {
            temp.push( parseFloat( what[i][0] ) );
        }
        return temp;
        /*
         * return what.map( function( x ){ return parseFloat( x[0] ) );
         */
    }

    function deepcopy( what ) {
        var temp = new Array();

        for (var i = 0; i < what.length; i++) {
            temp.push( what[i].slice() );
            temp[i][0] = 0;
        }
        return temp;
        /*
         * return what.map( function( x ){ return [ x[0], 0 ] } );
         */
    }

    function voteMax( where ) {
        var m = 0;
        var w = 0;

        for (var i = 0; i < where.length; i++ ) {
            if ( where[i] > m ) {
                m = where[i];
                w = i;
            }
        }
        return w;
    }
}
