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
	urls.map(function(url) {
		renderdiv.innerHTML = renderdiv.innerHTML + "<li>" + '<a href="' + url + '">' + url + '</a>' + "</li>";
	});
}

//Post new URLs to the server
function postUrls() {
	var  url= document.getElementById("newbookmark").value;

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
	xhr.send(url);
}
