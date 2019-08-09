	const boxshadow = 'rgb(191,191,191)'; //COLOR FOR CARD AND SEARCH SHADOW
	const booksUrl = new URL(window.location.href).origin;

	// How many books to show in each page
	const cardsperpage = 10; //HOW MANY BOOKS TO SHOW IN ONE PAGE

	//current page number
	var params = getAllUrlParams();
	var pagenumber = 0;
	if (params.page == undefined) {
		//first page
		pagenumber = 1;
	} else {
		pagenumber = params.page;
	}


	$(document).ready(function () {
		var endpoint = '/api/books'
		if (params){
			switch (params.selected){
				case 'bestseller':{
					endpoint = '/api/books/bestsellers';
					document.getElementById('selected_name').textContent = " > " + 'Bestsellers';
					break;
				}
				case 'recommendations':{
					endpoint = '/api/books/recommendations';
					document.getElementById('selected_name').textContent = " > " + 'Recommendations';
					break;
				} 
				case 'theme':{
					endpoint = '/api/books/themes/' + params.theme_id;
					document.getElementById('selected_name').textContent = " > " + params.name;
					break;
				} 
				case 'genre':{
					endpoint = '/api/books/genres/' + params.genre_id;
					document.getElementById('selected_name').textContent = " > " + params.name;
					break;
				} 
				default: {
					endpoint = '/api/books';
					document.getElementById('selected_name').textContent = ''; 
					break;
				}

			}
			$.ajax({
				url: booksUrl + endpoint,
				success: function (data) {
						loadData(data);
				},
				error: function () {
					console.log("The information could not be obtained.");
				}
			});

		}
	});

	const app = document.getElementById('gridbooks'); 

	function loadData(data) {

		const preloader = document.getElementById('preloader');
		preloader.setAttribute('style', 'display: none;'); 

		
			if(data.length > 0) {
			// Pagination
			const maxpage = Math.ceil(data.length/cardsperpage); // Max number of pages to show - depending on the amount of data received
			//if (maxpaxpage > 1 { //Maybe we want to show the page numbers just if there are more than 1 pages?
			const pagination = document.getElementById('pagination'); // From where to attach the page numbers
			
			//backward page button
			const backward = document.getElementById('backward');
			backward.onclick = function () {
				if (pagenumber == undefined || pagenumber == 1) {
					//page 1, cannot go back
				} else {
					pagenumber--;
					window.open('./books.html?page=' + pagenumber, "_self");
					}
			};				
					
			//list the page numbers		
			for (i=0; i < maxpage; i++) {
				const p = document.createElement('a');
				p.setAttribute('id', p + (i+1));
				p.setAttribute('style', 'cursor:pointer;');
				p.textContent = (i + 1);
				p.onclick = function() {
					window.open('./books.html?page=' + p.getAttribute('id'), "_self");
				}
				if ((i + 1) == pagenumber) {
					p.setAttribute('class', 'active');
				} else {
					p.setAttribute('class', 'pagei');
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
					window.open('./books.html?page=' + pagenumber, "_self");
					}
			};
			pagination.appendChild(forward);
 
		const start = (pagenumber-1)*(cardsperpage);
		var end = 0;
		if (start + cardsperpage > data.length) {
			end = data.length;
		} else {
			end = start + cardsperpage;
		} 

 		for (i=start; i<end; i++) {
			element = data[i];
			var sum = 0;

			const container = document.createElement('div');
			container.setAttribute('class', 'intro_itemb col-lg-2 col-sm-6 snip1529');
			container.setAttribute('style', 'display:inline-block;');

			const card = document.createElement('div');
			card.setAttribute('id', element.id);
			card.setAttribute('class', 'intro_image');

			// Book COVER
			const img = document.createElement('img');
			if(element.picture == null) {
				img.src = '/assets/img/book_default.png';   
			} else {
				img.src = element.picture; 
				console.log(element.picture);
			}
			img.setAttribute('alt', '');
			img.setAttribute('style', 'cursor:pointer;');
				
				
			// CARD BODY WITH THE Book DETAILS
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
				
			// book TITLE
			const intro_title = document.createElement('div');
			intro_title.setAttribute('class', 'intro_title');
			const a = document.createElement('a');
			a.textContent = element.name;
			a.setAttribute('style', 'font-size:16px;font-weight:bold;');
				
			// OTHER DETAILS OF THE book
			const intro_subtitle = document.createElement('div');
			intro_subtitle.setAttribute('class', 'intro_subtitle');
			intro_subtitle.setAttribute('style', 'font-weight:bold;font-style:italic;color:#000;');
			
			//Authors
			const authorslength = data[i].authors.length;
			var authorsn = "";
			for (j=0; j<authorslength; j++) {
				if (j > 0) {
					authorsn = authorsn + ",";
				}
				authorsn = authorsn + " " + data[i].authors[j].name;
			}
			intro_subtitle.textContent = authorsn;

			// Price
			const c = document.createElement('br');
			const f = document.createElement('a');
			f.setAttribute('class', 'intro_subtitle');
			f.setAttribute('style', 'color:green;font-weight:bold;');
			f.textContent = element.price + " €";

			// Shopping Cart
			const g = document.createElement('br');
			const b = document.createElement('a');
			const r = document.createElement('a');

			const d = document.createElement('i');
			const e = document.createElement('i');


			b.setAttribute('class', 'fa fa-shopping-cart addtosc');
			b.setAttribute('id', element.id);
			b.setAttribute('style', 'cursor:pointer; color:white; margin-left:5px; ');
			
			r.setAttribute('class', 'fa fa-heart addtosc');
			r.setAttribute('id', element.id);
			r.setAttribute('style', 'cursor:pointer; margin-right:5px; float:right; color:white;');
			
			
			
			b.onclick = function () {

				var bookData = {
					book_id: b.getAttribute('id'),
					quantity: 1
				};
			
				$.ajax({
					method: "PUT",
					beforeSend: function(request) {
						request.setRequestHeader('Accept','application/json; charset=utf-8');
					},
					url: url + "/api/orders/cart",
					crossDomain: true,
					data: JSON.stringify(bookData),
					contentType: "application/json",
					success: function (data) {
						console.log(data);
						window.alert("The book has been added to your cart.");

					},
					error: function (data) {
						window.alert("The book could not be added to your cart!");

						console.log(data);
					}
				});
			};
			r.onclick = function () {

				var bookData = {
					book_id: b.getAttribute('id'),
					quantity: 1
				};
			
				$.ajax({
					method: "PUT",
					beforeSend: function(request) {
						request.setRequestHeader('Accept','application/json; charset=utf-8');
					},
					url: url + "/api/orders/reservations",
					crossDomain: true,
					data: JSON.stringify(bookData),
					contentType: "application/json",
					success: function (data) {
						console.log(data);
						window.alert("The book has been added to your reservations.");

					},
					error: function (data) {
						window.alert("The book could not be added to your reservation!");

						console.log(data);
					}
				});
			};

			// COMBINE EVERYTHING IN THE HTML	
			app.appendChild(container);
			container.appendChild(card);
			
			//book COVER
			card.appendChild(img);
			
			//PART UNDER THE COVER OF THE book
			container.appendChild(intro_body);
			
			//AUTHOR
			intro_body.appendChild(intro_title);
			intro_title.appendChild(a);

			// overall rating
			const overallstars = document.createElement('div');
			intro_title.appendChild(overallstars);
			if(element.reviews.length > 0) {
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
			//end of ratings

			intro_body.appendChild(intro_subtitle);
			
			//PRICE
			intro_subtitle.appendChild(c);
			intro_subtitle.appendChild(f);

			intro_subtitle.appendChild(g);
			intro_subtitle.appendChild(b);
			intro_subtitle.appendChild(r);
			// b.appendChild(d);
			// r.appendChild(e);
			
			//Go to the details of the book
			card.onclick = function (event) {
				window.open('./book.html?id=' + this.getAttribute('id'), '_self');
			};	
			};
			}
}

		

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
