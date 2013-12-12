function SaintLague ( votes, noOfSeats ) {

    this.votecopy = votecopy;
    this.deepcopy = deepcopy;
    this.wash = wash;
    this.elect = elect;
    this.voteMax = voteMax;
    this.result = result;

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
    }

    function result() {
        for (var i = 0; i < this.seats.length; i++ ) 
            console.log( this.seats[i][1] + ": " + this.seats[i][0] );
    }


    function wash() {
        // this function adds all institutions belov a certain size to an
        // electoral assembly in  accordance with the regulations of the Welfare
        // Council of Oslo and Akershus

        var temp_votes = new Array();
        var temp_valgf = 0;

        for (var i = 0; i < this.votes.length; i++ ) {
            if ( this.votes[i][0] >= 1500 ) {
                temp_votes.push( this.votes[i] );
            } else {
                temp_valgf += parseFloat( this.votes[i][0] );
            }
        }

        temp_votes.push( [ temp_valgf, "Valgforsamling" ] );
        this.votes = temp_votes;
        this.seats = this.deepcopy( temp_votes );
    }

    function votecopy( what ) {
        var temp = new Array();

        for (var i = 0; i < what.length; i++) {
            temp.push( parseFloat( what[i][0] ) );
        }
        return temp;
    }

    function deepcopy( what ) {
        var temp = new Array();

        for (var i = 0; i < what.length; i++) {
            temp.push( what[i].slice() );
            temp[i][0] = 0;
        }
        return temp;
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
