var assert = require("assert");

describe("Functional parseCSV", function() {
	describe("it has beeen changed, yes", function() {

		var a_csvstring = "12345,Universitetet i Oslo\n12312.2,Høgskolen i Oslo og Akershus\n450,Steinerhøgskolen\n",
			b_csvstring = "12345;Universitetet i Oslo\n12312,2;Høgskolen i Oslo og Akershus\n450;Steinerhøgskolen\n";


		it("should be able to read a correct file", function () {
			assert.deepEqual( parseCSV( a_csvstring ), new Array(
						new Array("12345", "Universitetet i Oslo"), 
						new Array ("12312.2", "Høgskolen i Oslo og Akershus"),
						new Array ("450", "Steinerhøgskolen")
						));
		});

		it("should be able to read a windows-style file", function () {
			assert.deepEqual( parseCSV( b_csvstring ), new Array(
						new Array("12345", "Universitetet i Oslo"), 
						new Array ("12312.2", "Høgskolen i Oslo og Akershus"),
						new Array ("450", "Steinerhøgskolen")
						));
		});
	});
});
