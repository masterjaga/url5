async function shorten(e) {

	e.preventDefault();
	console.log("Shortening the url")
	var url = document.querySelector("#url").value;
	var key;
	//key = document.querySelector("#key").value;

	if (key == "" || key == undefined) {
		key = Math.random().toString(36).substr(2, 5);
	}

	let currentUserEmail = localStorage.getItem('currentUserEmail');

	let shorten = await fetch('https://url-shortener-umesh.herokuapp.com/shorten', {
		method: "POST",
		mode: 'cors',
		body: JSON.stringify({
			"shortURL": "https://url-shortener-umesh.herokuapp.com/" + key,
			"longURL": url,
			"currentUserEmail": currentUserEmail
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	document.querySelector("h4").innerHTML = `Shortened URL is -> <a href="https://url-shortener-umesh.herokuapp.com/${key}">url-shortener-umesh.herokuapp.com/${key}</a>`;
}

async function getURLsForUser(event) {

	console.log("Getting the urls of the user")

	let currentUserEmail = localStorage.getItem('currentUserEmail');

	let getURLs = await fetch('https://url-shortener-umesh.herokuapp.com/getURLs/' + currentUserEmail);
	let URLData = await getURLs.json();

	let tbody = document.getElementById("URLsTableTbody");
	tbody.innerHTML = "";

	URLData.forEach((eachURL) => {
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		td1.innerHTML = "<a class='tableDataShortURL' href=" + eachURL.shortURL + " target='_blank' >" + eachURL.shortURL + "</a>";
		let td2 = document.createElement("td");
		td2.innerHTML = "<a class='tableDataLongURL' href=" + eachURL.longURL + " target='_blank' >" + eachURL.longURL + "</a>";
		let td3 = document.createElement("td");
		td3.innerHTML = eachURL.timesClicked;
		let td4 = document.createElement("td");
		td4.innerHTML = eachURL.user;

		tr.appendChild(td2);
		tr.appendChild(td1);
		tr.appendChild(td3);
		tr.appendChild(td4);

		tbody.appendChild(tr);
	});
}

function logout() {

	//alert("Logout Successfull");
	window.location.assign('./index.html')
}