var authorid = getAllUrlParams().id;
const authorUrl = new URL(window.location.href).origin + '/api/authors';

const boxshadow = 'rgb(191,191,191)'; //COLOR FOR CARD AND SEARCH SHADOW

/* GET Request */
var request = new XMLHttpRequest();
request.open('GET', authorUrl + '/' + authorid, true);

const app = document.getElementById("booksforauthor"); //where to start attaching the authors

request.onload = function() {
	var data = JSON.parse(this.response);

	// STOP PAGE PRELOADER
	const preloader = document.getElementById('preloader');
	preloader.setAttribute('style', 'display: none;'); 

	if (request.status >= 200 && request.status<400) { //GET request was successful

		document.getElementById('eventtitle').textContent = " > " + data.name; // AUTHOR > AUTHOR NAME
        document.getElementById('title').textContent = data.name; //AUTHOR NAME
		document.getElementById("biography").textContent = data.shortbio; //AUTHOR BIO
		
		// AUTHOR PICTURE
        if (data.picture != "") {
            document.getElementById("cover").setAttribute('style', 'background-image:url(' + data.picture + ")");
        }

		/* Start books written by the author */
	for (i=0; i<data.books.length; i++) {
		element = data.books[i];

		//Setting up the card
		const container = document.createElement('div');
		container.setAttribute('class', 'intro_itemb col-lg-2 col-sm-6 snip1529');
		container.setAttribute('style', 'display:inline-block;');
		const card = document.createElement('div');
		card.setAttribute('id', element.id);
		card.setAttribute('class', 'intro_image');

		//Book cover
		const img = document.createElement('img');
		if(element.picture == null) {
			img.src = '/assets/img/book_default.png'; //If there is no image for the book
		} else {
			img.src = element.picture; 
			console.log(element.picture);
		}
		img.setAttribute('alt', '');
		img.setAttribute('style', 'cursor:pointer;');
				
		//Details of the book
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
			
		// Book title
		const intro_title = document.createElement('div');
		intro_title.setAttribute('class', 'intro_title');
		const a = document.createElement('a');
		a.textContent = element.name;
		a.setAttribute('style', 'font-size:16px;font-weight:bold;');

		// Other details
		const intro_subtitle = document.createElement('div');
		intro_subtitle.setAttribute('class', 'intro_subtitle');
				

		// Price
		const f = document.createElement('a');
		f.setAttribute('class', 'intro_subtitle');
		f.setAttribute('style', 'color:green;font-weight:bold;');
		f.textContent = element.price + " €";

		//Add to shopping cart
		const g = document.createElement('br');
		const b = document.createElement('a');
		b.setAttribute('href', '#');
		const d = document.createElement('i');
		b.setAttribute('class', 'fa fa-shopping-cart addtosc');
		

		// COMBINE EVERYTHING IN THE HTML		
		app.appendChild(container);
		container.appendChild(card);
		
		//Book COVER
		card.appendChild(img);
		
		//PART UNDER THE COVER OF THE book
		container.appendChild(intro_body);
		
		intro_body.appendChild(intro_title);
		intro_title.appendChild(a);
		intro_body.appendChild(intro_subtitle);
		
		//PRICE
		intro_subtitle.appendChild(f);

		intro_subtitle.appendChild(g);
		intro_subtitle.appendChild(b);
		b.appendChild(d);

		//Rating
		const overallstars = document.createElement('div');
		intro_title.appendChild(overallstars);
		if(element.reviews.length > 0) {
			var sum = 0;
		for (k=0; k<element.reviews.length; k++) {  
			const rate = element.reviews[k].rating;
			sum = sum + rate;
		}
	
		const mean = sum/element.reviews.length;
		for (x=0; x<5; x++) {
			const star = document.createElement('span');
			star.setAttribute('class', 'fa fa-star');
			if (x < mean) {
			if (mean-x < 1) {
				star.className += " halfchecked";
			} else {
				star.className += " checked";
			}
			}
			overallstars.appendChild(star);
		}
		} else {
			const star = document.createElement('span');
			star.setAttribute('class', 'fa fa-star');
			star.setAttribute('style', 'visibility:hidden;');
			overallstars.appendChild(star);
		}
			
		
		// OPEN BOOK DETAILS WHEN CLICKIN ON THE BOOK
		card.onclick = function (event) {
			window.open('./book.html?id=' + this.getAttribute('id'), '_self');
		};	
			};
    } else { //GET request was successful
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