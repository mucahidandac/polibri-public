const boxshadow = 'rgb(191,191,191)'; //COLOR FOR CARD AND SEARCH SHADOW (IT IS AUTHOMATIC AND VISIBLE JUST IF THE BACKGROUND COLOR IS LIGHT)
const searchUrl = new URL(window.location.href).origin;

/********** 
Other constants
**********/
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const abbrmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


/********** 
Get searched values from URL 
**********/
try {
var expr = getAllUrlParams().keyword.replace('%20', ' '); // SEARCHED KEYWORD
var expr1 = getAllUrlParams().day; // SEARCHED DATE

if (expr1 == "undefined-undefined-") { //The user did not choose any date
	var expr2 = "";
} else {
	var idk = expr1.split('-');
	var expr2 = idk[2] + "/" + idk[1] + "/" + idk[0];
}
document.getElementById('filtersearch').value = expr; // Set the fields of the search bar with the searched values
document.getElementById('filterday').value = expr2; // Set the fields of the search bar with the searched values

} catch(err) {
	console.log("Looking for events this month");
}
var thismonth = getAllUrlParams().thismonth; // SEARCHED event this month

/********** 
GET Request 
**********/
const app = document.getElementById('events');

var request = new XMLHttpRequest();

request.open('GET', searchUrl + '/api/events', true);

request.onload = function() {
	var data = JSON.parse(this.response);

	/*** STOP PAGE PRELOADER ***/
	const preloader = document.getElementById('preloader');
	preloader.setAttribute('style', 'display: none;');

	if (request.status >= 200 && request.status<400) {
		
		/*** CONDITIONS TO CHECK ***/
		data.forEach(element => {
			
			if (thismonth == null) {
			if (expr == "") {
				var condition = (element.startdate == expr1);
			} else {
				//var condition = ((element.name.toUpperCase()).indexOf(expr.toUpperCase())>=0) || (element.startdate == expr1) || ((element.description.toUpperCase()).indexOf(expr.toUpperCase())>=0);
				var condition = ((element.name.toUpperCase()).indexOf(expr.toUpperCase())>=0) || (element.startdate == expr1) || ((element.book.name.toUpperCase()).indexOf(expr.toUpperCase())>=0);
			}
		} else {
			var d = new Date();
			var n = d.getMonth();
			var condition = new Date(element.startdate).getMonth()==n;
		}

			/*** CHECK CONDITIONS AND SHOW RESULTS ***/
			if (condition) {
			
				/*** SHOW THE TEXT - RESULTS FOR ***/
				if (thismonth == null) {
				if (expr == "") {
					var res = document.getElementById('textresults').innerHTML = "Results for: <u>" + expr2 + "</u>";
				} else {
					if (expr2 == "") {
						var res = document.getElementById('textresults').innerHTML = "Results for: <u>" + expr + "</u>";
					} else {
						var res = document.getElementById('textresults').innerHTML = "Results for: <u>" + expr + "</u> - <u>" + expr2 + "</u>";
					}
				}
			} else {
				var res = document.getElementById('textresults').innerHTML = "Results for: <u>Events this month</u>";
			}

			/*** SHOW CARDS **/
			const container = document.createElement('div');
			container.setAttribute('class', 'intro_item col-lg-4 col-sm-6 snip1529');

			const card = document.createElement('div');
			card.setAttribute('id', element.id);
			card.setAttribute('class', 'intro_image');

			const img = document.createElement('img');
			if(element.picture == null) {
				img.src = '/assets/img/event_default.png';
			} else {
				img.src = element.picture;
			}
			img.setAttribute('alt', '');
			img.setAttribute('style', 'cursor:pointer;');
			
			var stdate = new Date(element.startdate);
			var day = stdate.getDate();
			
			const divx = document.createElement('div');
			divx.setAttribute('class', 'date');
			const spanx = document.createElement('span');
			spanx.setAttribute('class', 'day');
			spanx.textContent = day;
			const spanxx = document.createElement('span');
			var abbrmonth = abbrmonths[stdate.getMonth()];
			spanxx.setAttribute('class', 'month');
			spanxx.textContent = abbrmonth;
			
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
			
			const intro_title = document.createElement('div');
			intro_title.setAttribute('class', 'intro_title');
			const a = document.createElement('a');
			a.textContent = element.name;
			
			const intro_subtitle = document.createElement('div');
			intro_subtitle.setAttribute('class', 'intro_subtitle');
			//intro_subtitle.setAttribute('class', 'fa fa-calendar-o');
			//var sttime = element.starttime.replace(/:[^:]*$/,'');
			//var endtime = element.endtime.replace(/:[^:]*$/,'');
			// Get the month.
			var month = months[stdate.getMonth()];
			// Get the year.
			var year = stdate.getFullYear();
			var dayoftheweek = weekday[stdate.getDay()];
			intro_subtitle.textContent = dayoftheweek + ", " + month + " " + day + ", " + year;
			const c = document.createElement('br');
			const f = document.createElement('a');
			f.setAttribute('class', 'intro_subtitle');
			f.textContent = "book promoted: " + element.book.name;
			const g = document.createElement('br');
			const b = document.createElement('a');
			//b.setAttribute('class', 'fa fa-map-marker');
			b.setAttribute('class', 'intro_subtitle');
			b.textContent = " " + element.address;
			
			var sharebtn = document.createElement('i');
			sharebtn.setAttribute('class', 'fa fa-share-alt mybtn');
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
		    intro_subtitle.appendChild(g);
		    intro_subtitle.appendChild(b);
		
		    //SHARE BUTTON
		    intro_body.appendChild(sharebtn);
			
			/*** SEARCH EVENT ACTION - PASS THE VALUES THROUGH URL ***/
			buttonsearch = document.getElementById('filterbutton');
			buttonsearch.onclick = function() {
			const searchevents = document.getElementById('filtersearch').value;
			const searchday = document.getElementById('filterday').value;
			if ((searchevents == "" && searchday == "") || (searchevents.length < 2 && searchday == "")) {
				window.open('./events.html', "_self");
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
			window.open('/pages/event.html?id=' + this.getAttribute('id'));
			console.log(this.getAttribute('id'));
			};
			
			
			/*** When the user clicks on the button, open the modal ***/
			sharebtn.onclick = function() {
				modal.style.display = "block";
			
			//LINK TO THE PAGE OF THE SELECTED EVENT
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

			// Get the button that opens the modal
			var btn = sharebtn;

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
			} else {
			}				
			});
	} else {
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
