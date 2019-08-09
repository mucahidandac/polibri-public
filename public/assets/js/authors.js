
const boxshadow = 'rgb(191,191,191)'; //COLOR FOR CARD AND SEARCH SHADOW 
const cardsperpage = 20; //HOW MANY authors TO SHOW IN ONE PAGE
const authorsUrl = new URL(window.location.href).origin + '/api/authors';

//Current page number 
var pagenumber = 0;
if (getAllUrlParams().page == undefined) {
	//first page
	pagenumber = 1;
} else {
	pagenumber = getAllUrlParams().page;
}

// GET request
var request = new XMLHttpRequest();
request.open('GET', authorsUrl, true);

const app = document.getElementById('gridauthors'); //From where to attach the authors

request.onload = function() {
	var data = JSON.parse(this.response);

	// STOP PAGE PRELOADER
	const preloader = document.getElementById('preloader');
	preloader.setAttribute('style', 'display: none;'); 

	if (request.status >= 200 && request.status<400) { //GET request was successful
	
		if(data.length > 1) {

		// PAGINATION
		const maxpage = Math.ceil(data.length/cardsperpage); // Max number of pages to show - depending on the amount of data received
		//if (maxpaxpage > 1 { //Maybe we want to show the page numbers just if there are more than 1 pages?
		const pagination = document.getElementById('pagination'); // From where to attach the page numbers
		
		//backward page button
		const backward = document.getElementById("backward");
		backward.onclick = function () {
			if (pagenumber == undefined || pagenumber == 1) {
				//page 1, cannot go back
			} else {
				pagenumber--;
				window.open('./authors.html?page=' + pagenumber, "_self");
				}
		};				
				
		//list the page numbers		
		for (i=0; i < maxpage; i++) {
			const p = document.createElement('a');
			p.setAttribute('id', p + (i+1));
			p.setAttribute('style', 'cursor:pointer;');
			p.textContent = (i + 1);
			p.onclick = function() {
				window.open('./authors.html?page=' + p.getAttribute('id'), "_self");
			}
			if ((i + 1) == pagenumber) {
				p.setAttribute('class', 'active');
			} else {
				p.setAttribute('class', 'pagei')
			}
			pagination.appendChild(p);
		}
		
		
		//forward page button
		const forward = document.createElement('a');
		forward.textContent = '»';	
		forward.setAttribute('class', 'pagei');
		forward.onclick = function () {
			if (pagenumber == maxpage) {
				//max page, cannot go forward
			} else {
				pagenumber++;
				window.open('./authors.html?page=' + pagenumber, "_self");
				}
		};
		pagination.appendChild(forward);
//		}  //Maybe we want to show the page numbers just if there are more than 1 pages?

	
	// SHOW Authors FOR EACH PAGE
	//initial and final author to show in the current page
	const start = (pagenumber-1)*(cardsperpage);
	var end = 0;
	if (start + cardsperpage > data.length) {
		end = data.length;
	} else {
		end = start + cardsperpage;
	} 

	//AUTHORS
	for (i=start; i<end; i++) {
		element = data[i];
		const container = document.createElement('div');
		container.setAttribute('class', 'intro_itemb col-lg-2 col-sm-6 snip1529');
		container.setAttribute('style', 'display:inline-block;');

		const card = document.createElement('div');
		card.setAttribute('id', element.id);
		card.setAttribute('class', 'intro_image');

		//Author's picture
		const img = document.createElement('img');
		if(element.picture == null) {
			img.src = '/assets/img/book_default.png'; //If there is no picture for the author
		} else {
			img.src = element.picture; 
			console.log(element.picture);
		}
		img.setAttribute('alt', '');
		img.setAttribute('style', 'cursor:pointer;');
			
			
		//CARD BODY WITH the author name
		const intro_body = document.createElement('div');
		intro_body.setAttribute('class', 'intro_bodyb');
		
		container.onmouseover = function() {
			card.setAttribute('style', 'box-shadow: 0 0 10px ' + boxshadow + ';');
			intro_body.setAttribute('style', 'box-shadow: 0 10px 10px ' + boxshadow + ';');
			}
	    container.onmouseout = function() {
			card.setAttribute('style', '');
			intro_body.setAttribute('style', '');
			}
			
		const intro_title = document.createElement('div');
		intro_title.setAttribute('class', 'intro_title');
		const a = document.createElement('a');
		a.textContent = element.name;
		a.setAttribute('style', 'font-size:16px;font-weight:bold;');
		
		// COMBINE EVERYTHING IN THE HTML		
		app.appendChild(container);
		container.appendChild(card);
		
		//Author picture
		card.appendChild(img);
		
		//PART UNDER THE picture OF THE author
		container.appendChild(intro_body);
		
		//AUTHOR name
		intro_body.appendChild(intro_title);
		intro_title.appendChild(a);
		
		// Open the page with the details about the author
		card.onclick = function (event) {
			window.open('./author.html?id=' + this.getAttribute('id'), '_self');
		};	
			};//);
		 } 
	} else { //GET request was unsuccessful
		console.log('error');
		window.open('/pages/404.html', '_self');
	}
}

request.send();


/*** GET THE PARAMETERS PASSED THROUGH URL ***/
function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

  // stuff after # is not part of query string, so get rid of it
  queryString = queryString.split('#')[0];

  // split our query string into its component parts
  var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }
  return obj;
}