function Fordeling(data) {

	this.wash = wash;
	this.initiateFromData = initiateFromData;
	this.election = election;
	this.updateValue = updateValue;
	this.delInstitution = delInstitution;

	this.data = [];
	this.valgforsamling = [];

	this.r = new FordelingRender( this );
	this.s; // this will be the SaintLague-class

	function wash() {
		// this function adds all institutions below a certain size to an
		// electoral assembly in  accordance with the regulations of the Welfare
		// Council of Oslo and Akershus

		var temp_votes = [],
			temp_valgf = 0,
			i;

		for ( i = 0; i < this.data.length; i++ ) {
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

	function initiateFromData( studentarray ) {  

		var i;

		this.data = studentarray;

		for ( i = 0; i < this.data.length; ) {
			if ( isNaN(this.data[i][0]) || !this.data[i][0].length )  {
				this.data.splice(i, 1);
				// this implicitly iterates the array
			} else {
				++i;
			}
		}

		this.data = this.data.sort( function (a, b) { return b[0] - a[0]; } );

		this.r.addAllInstitutions( this.data );

	}

	function election() {

		var result = saintLagueElect( this.data, 37 );

		this.r.result( result );
		this.r.renderProcess( result );

	}


	function updateValue( id ) {

		var a;

		if (id[0] == "s") {// studentcount -> data[i][0]
			a = 0;
		} else if (id[0] == "i") { // instname -> data[i][1]
			a = 1;
		} else {
			return;
		}

		this.data[ parseInt( id.substring(1) ) ][ a ] = document.getElementById(id).value;

	}

	function delInstitution( id ) {

		this.data.splice( parseInt( id.substring(1) ), 1 );
	}


	/* TODO
	 * add export function (probably just cut-paste csv for now)
	 */
}
