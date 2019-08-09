const boxshadow = 'rgb(191,191,191)'; //COLOR FOR CARD AND SEARCH SHADOW (IT IS AUTHOMATIC AND VISIBLE JUST IF THE BACKGROUND COLOR IS LIGHT)
const eventsUrl = new URL(window.location.href).origin + '/api/events';

//default: polibri color 255,156,0
const mainR = 129;
const mainG = 0;
const mainB = 44;
const maincolor = 'rgb(' + mainR + ',' + mainG + ',' + mainB + ')'; //COLOR FOR DATE, EVENT TITLE, SEARCH BUTTON, SHARE BUTTON,...

/********** 
How many events to show in each page
**********/
const cardsperpage = 9; //HOW MANY EVENTS TO SHOW IN ONE PAGE

/********** 
Other constants
**********/
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const abbrmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


/********** 
Current page number 
**********/
var pagenumber = 0;
if (getAllUrlParams().page == undefined) {
	//first page
	pagenumber = 1;
} else {
	pagenumber = getAllUrlParams().page;
}

/********** 
GET Request 
**********/
var request = new XMLHttpRequest();
request.open('GET', eventsUrl, true);

const app = document.getElementById('events'); //From where to attach the events

request.onload = function() {
	var data = JSON.parse(this.response);

	/*** STOP PAGE PRELOADER ***/
	const preloader = document.getElementById('preloader');
	preloader.setAttribute('style', 'display: none;');

	if (request.status >= 200 && request.status<400) { //GET request was successful
	
		if(data.length > 1) {
		document.getElementById('searchform').setAttribute('style', ''); //search bar visible
		document.getElementById('noevents').setAttribute('style', 'display:none;');
		
		/*************
		START PAGINATION
		****************/
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
				window.open('./events.html?page=' + pagenumber, "_self");
				}
		};	
				
		//list the page numbers		
		for (i=0; i < maxpage; i++) {
			const p = document.createElement('a');
			p.setAttribute('id', p + (i+1));
			p.setAttribute('style', 'cursor:pointer;');
			p.textContent = (i + 1);
			p.onclick = function() {
				window.open('./events.html?page=' + p.getAttribute('id'), "_self");
			}
			if ((i + 1) == pagenumber) {
				p.setAttribute('class', 'active');
				p.style.backgroundColor = maincolor;
			} else {
			p.setAttribute('class', 'pagei');
			}
			pagination.appendChild(p);
		}
		
		
		//forward page button
		const forward = document.createElement('a');
		forward.textContent = '»';	
		forward.setAttribute('style', 'pagei');
		forward.onclick = function () {
			if (pagenumber == maxpage) {
				//max page, cannot go forward
			} else {
				pagenumber++;
				window.open('./events.html?page=' + pagenumber, "_self");
				}
		};
		pagination.appendChild(forward);
//		}  //Maybe we want to show the page numbers just if there are more than 1 pages?
	
	/*************
	SHOW EVENTS FOR EACH PAGE
	****************/
	//initial and final event to show in the current page
	const start = (pagenumber-1)*(cardsperpage);
	var end = 0;
	if (start + cardsperpage > data.length) {
		end = data.length;
	} else {
		end = start + cardsperpage;
	}
	
	//EVENTS
	for (i=start; i<end; i++) {
		element = data[i];
		const container = document.createElement('div');
		container.setAttribute('class', 'intro_item col-lg-4 col-sm-6 snip1529');

		const card = document.createElement('div');
		card.setAttribute('id', element.id);
		card.setAttribute('class', 'intro_image');

		/*** EVENT COVER ***/
		const img = document.createElement('img');
		
		if(element.picture == null) {
			img.src = '/assets/img/event_default.png'; //If the customer did not choose any image for the event
		} else {
			img.src = element.picture;
		} 
		img.setAttribute('alt', '');
		img.setAttribute('style', 'cursor:pointer;');
			
		/*** EVENT START DATE AND END DATE ***/
		const stdate = new Date(element.startdate);
		const day = stdate.getDate();
			
		/*** DATE OF THE EVENT AT THE TOP RIGHT OF THE CARD ***/
		const divx = document.createElement('div');
		divx.setAttribute('class', 'date');
		divx.style.backgroundColor = maincolor;
		const spanx = document.createElement('span');
		spanx.setAttribute('class', 'day');
		spanx.textContent = day;
		const spanxx = document.createElement('span');
		const abbrmonth = abbrmonths[stdate.getMonth()];
		spanxx.setAttribute('class', 'month');
		spanxx.textContent = abbrmonth;
			
		/***CARD BODY WITH THE EVENT DETAILS ***/
		const intro_body = document.createElement('div');
		intro_body.setAttribute('class', 'intro_body');
		intro_body.style.color = maincolor;
		
		container.onmouseover = function() {
			card.setAttribute('style', 'box-shadow: 0 0 10px ' + boxshadow + ';');
			intro_body.setAttribute('style', 'box-shadow: 0 10px 10px ' + boxshadow + ';');
			}
	    container.onmouseout = function() {
			card.setAttribute('style', '');
			intro_body.setAttribute('style', '');
			}
			
		// EVENT TITLE
		const intro_title = document.createElement('div');
		intro_title.setAttribute('class', 'intro_title');
		intro_title.style.color = maincolor;
		const a = document.createElement('a');
		a.textContent = element.name;
			
		// OTHER DETAILS OF THE EVENT
		const intro_subtitle = document.createElement('div');
		intro_subtitle.setAttribute('class', 'intro_subtitle');
		
		// FROM...TO
		/*
		const sttime = element.starttime.replace(/:[^:]*$/,'');
		const endtime = element.endtime.replace(/:[^:]*$/,''); */
			
		const month = months[stdate.getMonth()]; // Get the month.
		const year = stdate.getFullYear(); // Get the year.
		const dayoftheweek = weekday[stdate.getDay()]; // Get the corresponding day of the week
		intro_subtitle.textContent = dayoftheweek + ", " + month + " " + day + ", " + year;
		const c = document.createElement('br');
		const f = document.createElement('a');
		f.setAttribute('class', 'intro_subtitle');
		f.textContent = "book promoted: " + element.book.name;
		
		// EVENT ADDRESS
		const g = document.createElement('br');
		const b = document.createElement('a');
		b.setAttribute('class', 'intro_subtitle');
		b.textContent = " " + element.address; // Address
		const e = document.createElement('br');
		const d = document.createElement('a');
		d.setAttribute('class', 'intro_subtitle');
		
		// IS THE EVENT FREE?
		/*
		if (element.is_free == true) {
			d.textContent = "Free";
			} else {
				d.textContent = "Paid event";
			}
				*/
		// SHARE EVENT BUTTON
		const sharebtn = document.createElement('i');
		sharebtn.setAttribute('class', 'fa fa-share-alt mybtn');
		sharebtn.setAttribute('style', 'font-size:24px;color:' + maincolor + ';cursor:pointer');
		sharebtn.setAttribute('id', 'myBtn');
		sharebtn.setAttribute('eventid', element.id);
		sharebtn.setAttribute('eventname', element.name);
		
		/*** COMBINE EVERYTHING IN THE HTML ***/		
		app.appendChild(container);
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
		
		intro_subtitle.appendChild(c);
		intro_subtitle.appendChild(f);
		
		//EVENT ADDRESS
		/*intro_subtitle.appendChild(g);
		intro_subtitle.appendChild(b);
		*/
		//EVENT FREE
		intro_subtitle.appendChild(e);
		//intro_subtitle.appendChild(d);
		
		//SHARE BUTTON
		intro_body.appendChild(sharebtn);
		
		/*** SEARCH EVENT ACTION - PASS THE VALUES THROUGH URL ***/
		buttonsearch = document.getElementById('filterbutton');
		buttonsearch.onclick = function() {
			console.log("CLICKED");
			const searchevents = document.getElementById('filtersearch').value;
			const searchday = document.getElementById('filterday').value;
			if ((searchevents == "" && searchday == "") || (searchevents.length < 2 && searchday == "")) {
				document.getElementById('popup').setAttribute('style', 'color:red;');
			} else {
			localStorage.setItem('filter', searchevents);
			localStorage.setItem('filterday', searchday);
			const idk = searchday.split('/');
			const expr = idk[2] + "-" + idk[1] + "-" + idk[0];
			window.open('./searchevent.html?keyword=' + searchevents + '&day=' + expr, "_self");
			}
		}
			
		/*** OPEN EVENT LANDING PAGE ***/
		card.onclick = function (event) {
			window.open('./event.html?id=' + this.getAttribute('id'), '_self');
			console.log(this.getAttribute('id'));
		};
				
		/*** When the user clicks on the button, open the modal ***/
		sharebtn.onclick = function() {
			modal.style.display = "block";
			
			//LINK TO THE LANDING PAGE OF THE SELECTED EVENT
			const eventlink = '/pages/event.html?id=' + this.getAttribute('eventid');
			const textfield = document.getElementById('myInput');
			textfield.setAttribute('value', eventlink);
			
			//TITLE OF THE SELECTED EVENT
			const selectedevent = document.getElementById('eventtitle');
			selectedevent.textContent = this.getAttribute('eventname');
			
			//SHARE BUTTONS WITH ACTIONS
			const sfb = document.getElementById('sharefb'); //FACEBOOK
			sfb.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + eventlink + '&amp;src=sdkpreparse');
			sfb.setAttribute('target', '_blank');
			const stw = document.getElementById('sharetw'); //TWITTER
			stw.setAttribute('href', 'https://twitter.com/intent/tweet?url=' + eventlink + '&text=Check+out+' + '&hashtags=event&via=polibri');
			stw.setAttribute('target', '_blank');
			const swa = document.getElementById('sharewa'); //IF AT THE COMPUTER -> WHATSAPP WEB, ELSE -> WHATSAPP APP
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				swa.setAttribute('href', 'https://api.whatsapp.com/send?text=' + eventlink);
				} else {
					swa.setAttribute('href', 'https://web.whatsapp.com/send?text=' + eventlink);
				}
			swa.setAttribute('target', '_blank');
			const sm = document.getElementById('sharemail'); //MAIL
			sm.setAttribute('href', 'mailto:?subject=I want you to see this event&body=Check%20out%20this%20event%20' + eventlink + '%20%40polibri');
			}

			// Get the modal
			var modal = document.getElementById('myModal');
			
			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];

			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
				modal.style.display = "none";
				}
				
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
					}
				}
			};//);
		}
	} else { //GET request was successful
		console.log('error');
		window.open('/pages/404.html', '_self');
	}
}

request.send();

const sharesocials = [document.getElementById('s1'), document.getElementById('s2'), document.getElementById('s3'), document.getElementById('s4')];
for (i=0; i<4; i++) {
	sharesocials[i].onmouseover = function() {
	this.style.color = maincolor;
	}
	
	sharesocials[i].onmouseout = function() {
	this.style.color = "#a09fa1";
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