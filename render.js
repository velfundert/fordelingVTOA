function addField() {
    addInstitution( "Studenter", "Institusjon");
}

function addInstitution( students, name ) {
    var tf1 = document.createElement("input");
    var tf2 = document.createElement("input");
    var trg = document.getElementById("studentNumbers");
    tf1.type="text";
    tf2.type="text";
    tf1.value = name;
    tf2.value = students;
    trg.appendChild( document.createElement("br") );
    trg.appendChild( tf1 );
    trg.appendChild( tf2 );
}
