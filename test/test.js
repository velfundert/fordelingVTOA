var assert = require("assert");

describe("Functional parseCSV", function() {
	describe("it has beeen changed, yes", function() {

		var a_csvstring = "12345,Universitetet i Oslo\n12312.2,Høgskolen i Oslo og Akershus\n450,Steinerhøgskolen\n",
		b_csvstring = "12345;Universitetet i Oslo\n12312,2;Høgskolen i Oslo og Akershus\n450;Steinerhøgskolen\n";


		it("should be able to read a correct file", function () {
			assert.deepEqual( parseCSV( a_csvstring ), [
					["12345", "Universitetet i Oslo"], 
					["12312.2", "Høgskolen i Oslo og Akershus"],
					["450", "Steinerhøgskolen"]
			]);
		});

		it("should be able to read a windows-style file", function () {
			assert.deepEqual( parseCSV( b_csvstring ), [
					["12345", "Universitetet i Oslo"], 
					["12312.2", "Høgskolen i Oslo og Akershus"],
					["450", "Steinerhøgskolen"]
			]);
		});
	});
});

describe("Saint Lagüë election", function() {

	var election_votes = [
		[26479.5,"Universitetet i Oslo"],
		[17017,"Høgskolen i Oslo og Akershus"],
		[6420,"Handelshøyskolen BI"],
		[1958,"Campus Kristiania"],
	],
	expected_result = [
		[19,"Universitetet i Oslo"],
		[12,"Høgskolen i Oslo og Akershus"],
		[5,"Handelshøyskolen BI"],
		[1,"Campus Kristiania"],
	];

	/*
	 * This used to test the original object oriented implementation
	 *
	describe("Original OO version", function() {
		it("should do a correct election", function() {
			var elector = new SaintLague( election_votes, 37 );
			elector.elect();
			assert.deepEqual(elector.seats, expected_result);
		});
	});
	*/

	describe("New functional version", function() {
		it("should do a correct election", function() {
			assert.deepEqual( saintLagueElect(election_votes, 37).seats, expected_result);
		});
	});

});
