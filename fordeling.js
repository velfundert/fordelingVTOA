function Fordeling(data) {

    this.wash = wash;
    this.sort = sort;
    this.initiateFromData = initiateFromData;
    this.election = election;

    this.data;
    this.valgforsamling = new Array();

    this.r = new FordelingRender();
    this.s; // this will be the SaintLague-class

    function wash() {
        // this function adds all institutions belov a certain size to an
        // electoral assembly in  accordance with the regulations of the Welfare
        // Council of Oslo and Akershus

        var temp_votes = new Array();
        var temp_valgf = 0;

        for (var i = 0; i < this.data.length; i++ ) {
            if ( this.data[i][0] >= 1500 ) {
                temp_votes.push( this.data[i] );
            } else {
                temp_valgf += parseFloat( this.data[i][0] );
                this.valgforsamling.push( [ Math.ceil( parseFloat(this.data[i][0])/500 ) +1, this.data[i][1] ] );
            }
        }

        temp_votes.push( [ temp_valgf, "Valgforsamling" ] );
        this.data = temp_votes;

        this.r.clear();
        this.r.addAllInstitutions( this.data );
        this.r.renderVF( this.valgforsamling );

    }

    function sort() {
        this.data = this.data.sort( function (a, b) { return b[0] - a[0]; } );
    }

    function initiateFromData( dataString ) {  
        // Obtain the read file data    

        var p = new CSVparser;
        p.parse( dataString );

        this.data = p.data;
        
        var i;
        for ( i = 0; i < this.data.length; ) {
            if ( isNaN(this.data[i][0]) || this.data[i][0].length == 0) {
                this.data.splice(i, 1);
                // this implicitly iterates the array
            } else {
                console.log(this.data[i][1].length );
                ++i;
            }
        }

        this.sort();

        console.log( this.data );
        this.r.addAllInstitutions( this.data );

    }

    function election() {

        this.s = new SaintLague( this.data, 37 );

        this.s.elect();

        this.r.result( this.s );
        this.r.renderProcess( this.s );

    }


    /* TODO
     * add export function (probably just cut-paste csv for now)
     */

}
