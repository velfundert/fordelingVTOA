var assert = require("assert");

describe("CSVparse", function() {
  describe("findSep", function() {

    var csvparser = new CSVparser();

    beforeEach(function() {
      csvparser.data = new Array();
    });

    it("should be able to determine , as default", function() {
      csvparser.findSep("12345,UiO\n");
      assert.equal(csvparser.sep, ",");
      assert.deepEqual(csvparser.split("12345,UiO"), new Array("12345", "UiO"));
    });

    it("should detect when ; is separator", function() {
      csvparser.findSep("12345;UiO");
      assert.equal(csvparser.sep, ";");
      assert.deepEqual(csvparser.split("12345;UiO"), new Array("12345", "UiO"));
    });

  });
});
