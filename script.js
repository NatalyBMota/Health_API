fetch("https://health.gov/myhealthfinder/api/v3/topicsearch.json?keyword=skin")
.then(function(response) {
	if (response.status == 200) {
		return response.json();
	}
	else {
		console.log("Whoops! There is a problem with connecting to the API! The problem is likely an error in the URL of the request.");
	}
})
.then(function(jsonData) {
	const resource = jsonData.Result.Resources.Resource[0];
	let infoLinkURL = resource.AccessibleVersion;
	let imgURL = resource.ImageUrl;
	let title = resource.Title;
	let contentSections = resource.Sections.section;

	let img = document.createElement("img");
	img.setAttribute("src", imgURL);
	img.setAttribute("width", 400)
	document.body.appendChild(img);

	for (let i = 0; i < contentSections.length; i++) {
		console.log(contentSections[i].Title);
		
		//let h2 = document.createElement('h2');
		
		let div1 = document.getElementById('my-data')
		//h2.textContent = contentSections[i].Title;
		//div1.appendChild(h2);
	
		let div = document.createElement('div');
		div.innerHTML = '<h2>' + contentSections[i].Title + '</h2>';
		div.innerHTML += contentSections[i].Content;
		document.body.appendChild(div);
		
		console.log(contentSections[i].Content);
	}
	console.log(resource);
	
	/*
    var gifTitle = jsonData.data.title;
	var caption = document.createElement("h3");
	caption.innerHTML = gifTitle;
	document.body.appendChild(caption);
	*/
})
.catch(function(error) {
	console.log("There was a problem with getting data from the API in JSON format.", error);
});