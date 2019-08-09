const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const abbrmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


var bookid = getAllUrlParams().id;
// const baseUrl = new URL(window.location.href);
const bookUrl = new URL(window.location.href).origin + '/api/books';

openDetails(event, 'Abstract');

const boxshadow = 'rgb(191,191,191)'; //COLOR FOR CARD AND SEARCH SHADOW (IT IS AUTHOMATIC AND VISIBLE JUST IF THE BACKGROUND COLOR IS LIGHT)


// GET request
var request = new XMLHttpRequest();
request.open('GET', bookUrl +'/' + bookid, true);

const app = document.getElementById("similarbooks");

request.onload = function() {
  var data = JSON.parse(this.response);

  // STOP PAGE PRELOADER
  const preloader = document.getElementById('preloader');
  preloader.setAttribute('style', 'display: none;');

    if (request.status >= 200 && request.status<400) { //GET request was successful
        document.getElementById('title').textContent = data.name;
        document.getElementById('eventtitle').textContent = " > " + data.name;

        const bauthors = document.getElementById('authors');
        bauthors.setAttribute('style', 'font-style:italic;')
        for (i = 0; i < data.authors.length; i++) {
            if (i>0) {
                const comma = document.createElement('h3');
                comma.setAttribute('style', 'display:inline-block;')
                comma.textContent = ", ";
                bauthors.appendChild(comma);
            }
            const x = document.createElement('a');
            x.setAttribute('href', '/pages/author.html?id=' + data.authors[i].id);
            console.log(data.authors[i].name);
            x.setAttribute('style', 'display:inline-block;');
            const y = document.createElement('h3');
            y.textContent = data.authors[i].name;
            bauthors.appendChild(x);
            x.appendChild(y);
        }
        document.getElementById("price").textContent = "€ " + data.price;

        if (data.picture != "") {
            document.getElementById("cover").setAttribute('style', 'background-image:url(' + data.picture + ")");
        }
      
        document.getElementById("description").textContent = data.abstract;
        document.getElementById("fgenre").textContent = data.genre.display_name;
        document.getElementById("ftheme").textContent = data.theme.display_name;
        document.getElementById("fprice").textContent = "€ " + data.price;

        console.log(data.reviews.length);
        const comments = document.getElementById("commentscontainer");
		var sum = 0;
		
    // RATINGS
    const overallstars = document.getElementById("overall");
    if(data.reviews.length == 0) {
      const norate = document.createElement('p');
      norate.setAttribute('style', 'color:#81002C');
      norate.textContent = "No ratings for this book yet";
      overallstars.appendChild(norate);
    } else {

      for (k=0; k<data.reviews.length; k++) {  
        const comm = document.createElement('div');
        comm.setAttribute('class', 'comment');
  
        const cuser = document.createElement('p');
        cuser.setAttribute('style', 'font-weight:bold;display: inline-block;padding-right:10px;')
        cuser.textContent = data.reviews[k].user.name;
  
        comments.appendChild(comm);
        comm.appendChild(cuser);
  
        const rating = data.reviews[k].rating;
  
        for (x=0; x<5; x++) {
          const star = document.createElement('span');
          star.setAttribute('class', 'fa fa-star');
          if (x < rating) {
            star.className += " checked";
          }
          comm.appendChild(star);
        }
  
        sum = sum + rating;
  
        const usercomment = document.createElement('p');
        usercomment.textContent = data.reviews[k].content;
        comm.appendChild(usercomment);
      }
  
      const mean = sum/data.reviews.length;
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

    }
        
	// RELATED EVENTS
	var modal = document.getElementById('myModal'); // Get the modal
    const related = document.getElementById('relatedevents');
    for (k=0; k<data.events.length; k++) {
      element = data.events[k];

      const container = document.createElement('div');
		container.setAttribute('class', 'intro_item col-lg-4 col-sm-6 snip1529');

		const card = document.createElement('div');
		card.setAttribute('id', element.id);
		card.setAttribute('class', 'intro_image');

		/*** EVENT COVER ***/
		const img = document.createElement('img');
		
		if(element.picture == null) {
			img.src = '/assets/img/event_default.png'; //If there is no image for the event
		} else {
			img.src = element.picture;
		} 
		img.setAttribute('alt', '');
		img.setAttribute('style', 'cursor:pointer;');
			
		// EVENT START DATE AND END DATE
		const stdate = new Date(element.startdate);
		const day = stdate.getDate();
			
		// DATE OF THE EVENT AT THE TOP RIGHT OF THE CARD
		const divx = document.createElement('div');
		divx.setAttribute('class', 'date');
		const spanx = document.createElement('span');
		spanx.setAttribute('class', 'day');
		spanx.textContent = day;
		const spanxx = document.createElement('span');
		const abbrmonth = abbrmonths[stdate.getMonth()];
		spanxx.setAttribute('class', 'month');
		spanxx.textContent = abbrmonth;
			
		// CARD BODY WITH THE EVENT DETAILS
		const intro_body = document.createElement('div');
		intro_body.setAttribute('class', 'intro_body');
		
		container.onmouseover = function() {
			card.setAttribute('style', 'box-shadow: 0 0 10px ' + boxshadow + ';');
			intro_body.setAttribute('style', 'box-shadow: 0 10px 10px ' + boxshadow + ';');
			}
	    container.onmouseout = function() {
			card.setAttribute('style', '');
			intro_body.setAttribute('style', '');
			}

			// OPEN EVENT PAGE
		card.onclick = function (event) {
			window.open('./event.html?id=' + this.getAttribute('id'), '_self');
		};	
			
		// EVENT TITLE
		const intro_title = document.createElement('div');
		intro_title.setAttribute('class', 'intro_title');
		const a = document.createElement('a');
		a.textContent = element.name;
			
		// OTHER DETAILS OF THE EVENT
		const intro_subtitle = document.createElement('div');
		intro_subtitle.setAttribute('class', 'intro_subtitle');
		
		const month = months[stdate.getMonth()]; // Get the month.
		const year = stdate.getFullYear(); // Get the year.
		const dayoftheweek = weekday[stdate.getDay()]; // Get the corresponding day of the week
		intro_subtitle.textContent = dayoftheweek + ", " + month + " " + day + ", " + year;
		
		// EVENT ADDRESS
		const g = document.createElement('br');
		const b = document.createElement('a');
		b.setAttribute('class', 'intro_subtitle');
		b.textContent = " " + element.address; // Address
		const d = document.createElement('a');
		d.setAttribute('class', 'intro_subtitle');
		
		/*** COMBINE EVERYTHING IN THE HTML ***/		
		related.appendChild(container);
		container.appendChild(card);
		// EVENT DATE AT THE TOP-RIGHT OF THE CARD
		container.appendChild(divx);
		divx.appendChild(spanx);
		divx.appendChild(spanxx);
		
		//EVENT COVER
		card.appendChild(img);
		
		//PART UNDER THE COVER OF THE EVENT
		container.appendChild(intro_body);
		
		//EVENT TITLE
		intro_body.appendChild(intro_title);
		
		//EVENT DAY
		intro_title.appendChild(a);
		intro_body.appendChild(intro_subtitle);
		
		//EVENT ADDRESS
		/*intro_subtitle.appendChild(g);
		intro_subtitle.appendChild(b);
		*/
    }

        /* SIMILAR BOOKS */
	for (i=0; i<data.similarities.length; i++) {
		element = data.similarities[i];
		const container = document.createElement('div');
		container.setAttribute('class', 'intro_itemb col-lg-2 col-sm-6 snip1529');
		container.setAttribute('style', 'display:inline-block;');

		const card = document.createElement('div');
		card.setAttribute('id', element.id);
    card.setAttribute('class', 'intro_image');
		card.onclick = function () {
				window.open('./book.html?id=' + this.getAttribute('id'), '_self');
			};	

		/*** book COVER ***/
		const img = document.createElement('img');
		if(element.picture == null) {
			img.src = '/assets/img/book_default.png'; //If there is no image for the book
		} else {
			img.src = element.picture; 
			console.log(element.picture);
		}
		img.setAttribute('alt', '');
		img.setAttribute('style', 'cursor:pointer;');
			
			
		/***CARD BODY WITH THE book DETAILS ***/
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
		

		// COMBINE EVERYTHING IN THE HTML	
		app.appendChild(container);
		container.appendChild(card);
		
		//book COVER
		card.appendChild(img);
		
		//PART UNDER THE book OF THE EVENT
		container.appendChild(intro_body);
		
		//AUTHOR
		intro_body.appendChild(intro_title);
		intro_title.appendChild(a);
		intro_body.appendChild(intro_subtitle);
		
		
			
			};
    } else { //GET request was successful
    console.log('error');
    window.open('/pages/404.html', '_self');
	}
}

request.send();

function openDetails(evt, bookName) {
  var i, x, tablinks;
  x = document.getElementsByClassName(" book");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" border-red", "");
  }
  document.getElementById(bookName).style.display = "block";
  try {
    evt.currentTarget.firstElementChild.className += " border-red";
  }
  catch (err) {
  }
}

function addtoCart() {
  console.log("clicked");
  var bookData = {
    book_id: bookid,
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
}
function addtoReservation() {
  var bookData = {
    book_id: bookid,
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
      window.alert("The book could not be added to your reservations!");
      console.log(data);
    }
  });
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