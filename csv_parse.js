function startRead() {  
  // obtain input element through DOM 
  
  var file = document.getElementById('filet').files[0];
  if(file){
    getAsText(file);
  }
}

function getAsText(readFile) {
        
  var reader = new FileReader();
  
  // Read file into memory as UTF-8      
  reader.readAsText(readFile, "UTF-8");
  
  // Handle progress, success, and errors
  reader.onprogress = updateProgress;
  reader.onload = loaded;
  reader.onerror = errorHandler;
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    if (loaded < 1) {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
    }
  }
}

function loaded(evt) {  
  // Obtain the read file data    
  var fileString = evt.target.result;   

  var p = new CSVparser;
  p.parse( fileString );

  var i = 0;
  while ( i < p.data.length ) {
      console.log( p.data[i][0] );
      console.log( p.data[i][1] );
      i++;
  }
  console.log("Done");

}

function CSVparser() {

    this.parse = parse;
    this.splitCSV = splitCSV;
    this.findSep = findSep;

    this.data = new Array();
    this.sep = ',';

    function parse( CSVString ) {

        var i=0;

        this.findSep( CSVString.substr( 0, CSVString.indexOf("\n",0) ) );

        while (i < CSVString.length) {
            var j = CSVString.indexOf("\n", i);
            if (j == -1) j = CSVString.length;

            this.data.push( this.splitCSV( CSVString.substr( i, j-i) ) );

            i = j+1;
        }
    }

    function splitCSV( line ) {
        return line.split( this.sep );
    }

    function findSep( line ) {
        var i = line.indexOf(",");
        if ( i != -1 ) return;

        i = line.indexOf(";");

        if ( i != -1 ) {
            this.sep = ";";
            console.log("separator is ; which isn't really the standard is it");
            return;
        }

        console.log("could not determine separator!");
    }

}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    // The file could not be read
  }
}


