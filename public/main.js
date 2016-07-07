var urls = [1, 3, 5, 6, 6,7];

var addBookMark = function() {
	var  newurl= document.getElementById("newbookmark").value;
	urls.push(newurl);
	//Refresh DOM to add the new URL
	// loadBookMarks();
}



function loadBookMarks() {
	var renderdiv = document.getElementById("bookmarklist")
	urls.map(function(url){
		renderdiv.innerHTML = renderdiv.innerHTML + url + "<br>";
	})
}

loadBookMarks();

// http://stackoverflow.com/questions/507138/how-do-i-add-a-class-to-a-given-element
//http://stackoverflow.com/questions/17650776/add-remove-html-inside-div-using-javascript


// https://thenewboston.com/forum/topic.php?id=751