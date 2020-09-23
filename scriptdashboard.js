function shorten(e){

	e.preventDefault();
	console.log("Shortening")
	var url = document.querySelector("#url").value;
	var key ;
	//key = document.querySelector("#key").value;

	if(key == "" || key == undefined){
		key = Math.random().toString(36).substr(2, 5);
	}

	fetch(`/shorten?url=${url}&key=${key}`);
	
	document.querySelector("h4").innerHTML = `Shortened URL is <a href="https://url-shortener-umesh.herokuapp.com/${key}">url-shortener-umesh.herokuapp.com/${key}</a>`;
}