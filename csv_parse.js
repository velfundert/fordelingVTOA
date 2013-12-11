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

  var i=0;
  var ttrg = document.getElementById("teeekst");

  while (i < fileString.length) {
      var j = fileString.indexOf("\n", i);
      if (j == -1) j = fileString.length;

      console.log("i er " + i + " og j er " + j );
      var ttemp = document.createElement("p");
      ttemp.innerHTML = fileString.substr(i, j-i);
      // console.log( fileString.substr(i, j-i) );
      // console.log( " pupp " );
      ttrg.appendChild( ttemp );

      i = j+1;
  }

  // document.getElementById("teeekst").innerHTML=fileString;

}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    // The file could not be read
  }
}
