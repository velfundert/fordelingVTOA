function FordelingRender() {

    this.institutionCount = 0;

    this.addField = addField;
    this.addInstitution = addInstitution;
    this.clear = clear;
    this.result = result;
    this.renderProcess = renderProcess;

    console.log("Render loaded");

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

    function result( slInst ) {
        var line;
        var resBox = document.getElementById("resultbox");
        for (var i = 0; i < slInst.seats.length; i++ ) {
            line = document.createElement("p");
            line.innerHTML = ""+ slInst.seats[i][1] +" fikk "+ slInst.seats[i][0] +" mandater.";
            resBox.appendChild( line );
        }

    }

    function renderProcess( slInst ) {
        var resBox = document.getElementById("processbox");
        var line = document.createElement("p");
        for (var i = 0; i < slInst.votelog.length; i++ ) {
            line.innerHTML += slInst.votelog[i] +"<br />";
        }
        resBox.appendChild( line );

    }

    function renderVF( slInst ) {
        var VFBox = document.getElementById("valgforsamling");
        var title = document.createElement("h3");
        title.innerHTML = "Valgforsamling";
        VFBox.appendChild( title );
        
        var line = document.createElement("p");
        for (var i = 0; i < slInst.valgforsamling.length; i++ ) {
            line.innerHTML += slInst.valgforsamling[i][1] + ": "+ slInst.valgforsamling[i][0] +" plasser<br />";
        }
        VFBox.appendChild( line );
    }

}

