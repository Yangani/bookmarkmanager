//Get urls from the server
function getUrls() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', encodeURI('api/bookmarks'));
	xhr.onload = function() {
		if (xhr.status === 200) {
			var urls = xhr.responseText;
			displayBookMarks(urls);
		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

getUrls();

//Display bookmark list
function displayBookMarks(urls) {
	urls = JSON.parse(urls);

	//Loop through the bookmark list and render
	for(var key in urls) {
		if(urls.hasOwnProperty(key)) {
			//Render each bookmark using the render template
			renderBookMarkTemplate(key, urls[key]);
		}
    }
}

//Render Individual Bookmark Template
function renderBookMarkTemplate(url, title) {
	var renderdiv = document.getElementById("bookmarklist");
	renderdiv.innerHTML = renderdiv.innerHTML + '<div class="divTableRow" id="' + url + '"><div class="divTableCell">' + title + '</div><div class="divTableCell"><a href="' + url + '">' + url + '</a></div><div class="divTableCell divDelete"><button type="button" class="delete" id="delete" value="' + url + '"onclick="deleteBookMark(this.value)">Delete</button></div></div>';
}

//Add new URLs to the server
function addBookMark() {
	var url   = document.getElementById("urlAddress").value;
	var title = document.getElementById("urlTitle").value;

	//Check if user Intered a title
	if(!title) {
		alert("Please enter a title");
		return;
	}
	//Return if invalid URL
	if(!isUrlValid(url)) {
		alert("Please enter valid URL");
		return;
	}
	//Bookmark data to send to server
	var data = {
		"url": url,
		"title": title
	}

	xhr = new XMLHttpRequest();
	xhr.open('POST', encodeURI('api/addbookmark'));
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
		if (xhr.status === 200) {
			if(xhr.responseText === "Successful") {
				renderBookMarkTemplate(url, title);
			} else {
				alert("Bookmark Already Exists")
			}
			//Clear Text area
			document.getElementById("urlAddress").value= "";
			document.getElementById("urlTitle").value= "";
		} else if (xhr.status !== 200) {
			alert('Request failed ' + xhr.status);
		}
	};
	xhr.send(JSON.stringify(data));
}



//Check if input URL is Valid
function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}


//Delete bookmark
function deleteBookMark(bookmark) {
	//Delete the Bookmark
	document.getElementById(bookmark).remove();
	
	//Remove URL from the database
	xhr = new XMLHttpRequest();
	xhr.open('POST', encodeURI('api/deletebookmark'));
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
		if (xhr.status === 200) {
			console.log("Delete Successful");
		} else if (xhr.status !== 200) {
			alert('Request failed ' + xhr.status);
		}
	};
	xhr.send(JSON.stringify(bookmark));
}