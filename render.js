function FordelingRender( mother ) {

    this.mother = mother;
    this.institutionCount = 0;

    this.addField = addField;
    this.addInstitution = addInstitution;
    this.addAllInstitutions = addAllInstitutions;
    this.clear = clear;
    this.result = result;
    this.renderProcess = renderProcess;
    this.renderVF = renderVF;
    this.returnChangeHandler = returnChangeHandler;
    this.returnDropHandler = returnDropHandler;
    this.updateValue = updateValue;
	this.delInstitution = delInstitution;


    console.log("Render loaded");

    function addField() {
        this.addInstitution( "Studenter", "Institusjon");
        this.mother.data.push([ 0, "Institusjon"]);
    }

    function addInstitution( students, name ) {
        var tf0 = document.createElement("div");
        var tf1 = document.createElement("input");
        var tf2 = document.createElement("input");
        var trg = document.getElementById("studentNumbers");
        tf1.type="text";
        tf2.type="text";
        tf1.value = name;
        tf2.value = students;
        tf0.setAttribute("id", "d" + this.institutionCount );
        tf1.setAttribute("id", "i" + this.institutionCount );
        tf2.setAttribute("id", "s" + this.institutionCount );
        this.institutionCount++;
        tf0.appendChild( tf1 );
        tf0.appendChild( tf2 );
        trg.appendChild( tf0 );
        tf1.addEventListener('change', this.returnChangeHandler(), false);
        tf2.addEventListener('change', this.returnChangeHandler(), false);

        // drag and drop-functions
        tf0.setAttribute('draggable', true);
        tf0.addEventListener('dragstart', handlestart, false);
        tf0.addEventListener('dragover', handledragover, false);
        tf0.addEventListener('drop', this.returnDropHandler(), false);
    }

    function addAllInstitutions ( data ) {
        this.clear();
        var i = 0;
        while ( i < data.length ) {
            this.addInstitution( data[i][0], data[i][1] );
            i++;
        }
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

    function renderVF( valgforsamling ) {
        var VFBox = document.getElementById("valgforsamling");
        var title = document.createElement("h3");
        var j = valgforsamling.reduce( function(a,b) { return a + b[0]; }, 0 );
        title.innerHTML = "Valgforsamling (" + j + "/" + Math.ceil( j/2 ) + ")";
        VFBox.appendChild( title );

        var line = document.createElement("p");
        for (var i = 0; i < valgforsamling.length; i++ ) {
            line.innerHTML += valgforsamling[i][1] + ": "+ valgforsamling[i][0] +" plasser<br />";
        }
        VFBox.appendChild( line );
    }

    /* Drag and drop-related functions */
    function returnDropHandler() {
        var a = this;
        return function(e) {
            console.log("Drop!");
            dropped = document.getElementById(e.dataTransfer.getData("text/html"));
            if ( dropped != e.target ) {
                e.target.getElementsByTagName("input")[0].value =
                    e.target.getElementsByTagName("input")[0].value + " + " +
                    dropped.getElementsByTagName("input")[0].value;
                e.target.getElementsByTagName("input")[1].value =
                    parseFloat( e.target.getElementsByTagName("input")[1].value) +
                    parseFloat( dropped.getElementsByTagName("input")[1].value );
                // add something so that f.data is updated accordingly
                a.updateValue( e.target.getElementsByTagName("input")[0].id );
                a.updateValue( e.target.getElementsByTagName("input")[1].id );
                a.delInstitution( dropped.getElementsByTagName("input")[0].id );

                // remove the dropped node:
                dropped.parentNode.removeChild(dropped);
            }
        };
    }

    function handledragover(e) {
        console.log("over");
        if (e.preventDefault()) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = "copy";
    }

    function handlestart(e) {
        console.log("Start");
        e.dataTransfer.setData("text/html", e.target.id );
    }

    /*
       function handlechange(e) {
       this.mother.updateValue( e.target.id );
       }
       */

    function returnChangeHandler() {
        var a = this;
        return function (e) { a.updateValue( e.target.id ); };
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

        this.mother.updateValue( parseInt( id.substring(1) ), a, document.getElementById(id).value );

    }

    function delInstitution( id ) {
        this.mother.delInstitution( parseInt( id ) );
    }
}

