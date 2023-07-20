let keyword = 'physical+activity'; //flu, preeclampsia, osteoporosis, tuberculosis, skin, weight, bone+density, weight, checkups, physical+activity, heart, lungs, cancer, diabetes, vaccines 

function turnKeywordIntoHeaderTxt(keyword) {
	wordLength = keyword.length;
	let wordsArr = keyword.split("+");
	if (wordsArr.length > 1) {
		return createTitleFromMultipleWords(wordsArr);
	} else {
		let wOutFrstLetter = keyword.slice(1, wordLength);
		let firstLetter = keyword.slice(0, 1);
		firstLetter = firstLetter.toUpperCase();
		let wordWith1stLetterCap = firstLetter + wOutFrstLetter;
		return wordWith1stLetterCap;
	}
}

function createTitleFromMultipleWords(wordsArr) {
	let wordsMinusFrstLetter = [];
	let capFrstLettter = [];
	let wordsWithCapFrstLettter = [];

	for (let i = 0; i < wordsArr.length; i++) { 
	let wordLength = wordsArr[i];
	wordLength = wordLength.length;
	let wOutFrstLetter = wordsArr[i].slice(1, wordLength);
		wordsMinusFrstLetter.push(wOutFrstLetter); 
	}

	for (let word of wordsArr) {
	let cFrstLetter = word.slice(0, 1);
		cFrstLetter = cFrstLetter.toUpperCase();
		capFrstLettter.push(cFrstLetter);
	}

	for (let i = 0; i < wordsArr.length; i++) { 
	let wordWithFrstLetterCap = capFrstLettter[i] +
		wordsMinusFrstLetter[i];
		wordsWithCapFrstLettter.push(wordWithFrstLetterCap); 
	}
	let wordsUnitedIntoTitle = "";
	for (let i=0; i < wordsWithCapFrstLettter.length; i++) {
		if (i === 0) {
			wordsUnitedIntoTitle += wordsWithCapFrstLettter[i];
		} else {
			wordsUnitedIntoTitle = `${wordsUnitedIntoTitle} ${wordsWithCapFrstLettter[i]}`;
		}
	}
	return wordsUnitedIntoTitle;
}

function populateWebPageWithServerData(jsonData) {
	const resource = jsonData.Result.Resources.Resource[0];
	let infoLinkURL = resource.AccessibleVersion;
	let imgURL = resource.ImageUrl;
	let title = resource.Title;
	let contentSections = resource.Sections.section;
	let h1 = document.createElement('h1');
	h1.innerText = title;
	document.body.appendChild(h1);

	let img = document.createElement("img");
	img.setAttribute("src", imgURL);
	img.setAttribute("width", 400)
	document.body.appendChild(img);

	for (let i = 0; i < contentSections.length; i++) {			
		let div = document.createElement('div');
		if (contentSections[i].Title !== null) {
			div.innerHTML = `<h2> ${contentSections[i].Title} </h2>`;
			div.innerHTML += contentSections[i].Content;
		} else {
			div.innerHTML = `<h2> ${turnKeywordIntoHeaderTxt(keyword)}: Overview </h2>`;
			div.innerHTML += contentSections[i].Content;
		}
		document.body.appendChild(div);
	}
	console.log(resource);

	let a = document.createElement('a'); 
	let link = document.createTextNode("Source");
	a.appendChild(link); 
	a.title = "Link to the source of this content."; 
	a.href = infoLinkURL;
	a.target = '_blank';
	document.body.appendChild(a); 
	/*let a = document.createElement('a');
	a.textContent = 'Source';
	a.setAttribute(href, infoLinkURL);
	document.body.insertBefore(div, a);
		//div1.appendChild(h2);
	/*
	var gifTitle = jsonData.data.title;
	var caption = document.createElement("h3");
	caption.innerHTML = gifTitle;
	document.body.appendChild(caption);
	*/
}

function loadPageContent(keyword) {
	fetch(`https://health.gov/myhealthfinder/api/v3/topicsearch.json?keyword=${keyword}`)
	.then(function(response) {
		if (response.status == 200) {
			return response.json();
		}
		else {
			console.log("Whoops! There is a problem with connecting to the API! The problem is likely an error in the URL of the request.");
		}
	})
	.then(function(jsonData) {
		populateWebPageWithServerData(jsonData);
	})
	.catch(function(error) {
		console.log("There was a problem with getting data from the API in JSON format.", error);
	});
}

loadPageContent(keyword);

let select = document.getElementById('medKeyword');
select.addEventListener('change', (e) => {
	let newKeyword = e.target.value;
	loadPageContent(newKeyword);
});