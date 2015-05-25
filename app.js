var f = new Fordeling();

function myAddField() {
	f.r.addField();
}

function isWellformed( f ) {
	for (i = 0; i < f.length; ++i) {
		if (f.charCodeAt(i) == 65533 ) {
			// this will be true if you encounter a non-ascii latin1 character
			// in data you've read as utf-8. don't ask me why.
			console.log("File is not well formed");
			return false;
		}
	}
	console.log("file is good");
	return true;
}

function startRead() {  
	// find the file-input element

	var file = document.getElementById('filet').files[0];
	if(file){
		getAsText(file, "UTF-8");
	}
}

function startReadLatin1() {
	var file = document.getElementById('filet').files[0];
	if(file){
		getAsText(file, "iso-8859-1");
	}
}

function getAsText(readFile, encoding) {

	var reader = new FileReader();

	// Read file into memory
	reader.readAsText(readFile, encoding);

	// Handle progress, success, and errors
	reader.onprogress = updateProgress;
	reader.onload = loaded;
	reader.onerror = errorHandler;
}

function loaded(evt) {  
	// Get the read file data, check encoding, parse
	if ( isWellformed( evt.target.result ) ) {
		f.initiateFromData( ParseCSV( evt.target.result ) );
	} else {
		startReadLatin1();
	}
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		// The file could not be read
		alert("Could not read file!");
	}
}

function updateProgress(evt) {
	/*
	// You could do something here
	if (evt.lengthComputable) {
	// evt.loaded and evt.total are ProgressEvent properties
	var loaded = (evt.loaded / evt.total);
	if (loaded < 1) {
	// Increase the prog bar length
	// style.width = (loaded * 200) + "px";
	}
	}
	*/
}

