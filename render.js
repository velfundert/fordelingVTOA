function addField() {
    var temp = document.createElement("input");
    var trg = document.getElementById("studentNumbers");
    temp.type="text";
    temp.setAttribute('id',"lagtTilFelt");
    temp.value="Heisann, her er jeg!";
    trg.appendChild( document.createElement("br") );
    trg.appendChild(temp);
}
