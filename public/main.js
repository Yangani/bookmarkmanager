//Get urls from the server
function getUrls(urls) {
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
	//Render URLS
	var renderdiv = document.getElementById("bookmarklist");

	for(var key in urls) {
		if(urls.hasOwnProperty(key)) { 
			renderdiv.innerHTML = renderdiv.innerHTML + '<div class="divTableRow" value="' + key + '"><div class="divTableCell">' + urls[key] + '</div><div class="divTableCell"><a href="' + key + '">' + key + '</a></div><div class="divTableCell"><button type="button" class="delete" id="delete" value="' + key + '"onclick="deleteUrl()">Delete</button></div></div>';
		}
    }
}

//Post new URLs to the server
function postUrls() {
	var url   = document.getElementById("urlAddress").value;
	var title = document.getElementById("urlTitle").value;
	//Return if invalid URL
	if(!isUrlValid(url)) {
		alert("Please enter valid url");
		return;
	}

	var data = {
		"url": url,
		"title": title
	}

	xhr = new XMLHttpRequest();
	xhr.open('POST', encodeURI('api/addbookmark'));
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
		if (xhr.status === 200) {
			document.getElementById('bookmarklist').innerHTML = "";
			displayBookMarks(xhr.responseText);
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
function deleteUrl(url) {
	var url   = document.getElementById("delete").value;

	//Remove URL from the database
	xhr = new XMLHttpRequest();
	xhr.open('POST', encodeURI('api/deletebookmark'));
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
		if (xhr.status === 200) {
			document.getElementById('bookmarklist').innerHTML = "";
			displayBookMarks(xhr.responseText);
		} else if (xhr.status !== 200) {
			alert('Request failed ' + xhr.status);
		}
	};
	xhr.send(JSON.stringify(url));
}