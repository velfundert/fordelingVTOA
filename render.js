function FordelingRender() {

    this.institutionCount = 0;

    this.addField = addField;
    this.addInstitution = addInstitution;
    this.clear = clear;

    function addField() {
        this.addInstitution( "Studenter", "Institusjon");
    }

    function addInstitution( students, name ) {
        var tf1 = document.createElement("input");
        var tf2 = document.createElement("input");
        var trg = document.getElementById("studentNumbers");
        tf1.type="text";
        tf2.type="text";
        tf1.value = name;
        tf2.value = students;
        tf1.setAttribute("id", "i" + this.institutionCount );
        tf2.setAttribute("id", "s" + this.institutionCount );
        this.institutionCount++;
        trg.appendChild( document.createElement("br") );
        trg.appendChild( tf1 );
        trg.appendChild( tf2 );
    }

    function clear() {
       var trg = document.getElementById("studentNumbers");
       while (trg.lastChild) {
           trg.removeChild( trg.lastChild );
       }
       this.institutionCount = 0;
    }


}

