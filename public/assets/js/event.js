const eventUrl = new URL(window.location.href).origin + '/api/events';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const abbrmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


/********** 
Current page number 
**********/
var eventid = getAllUrlParams().id;

/********** 
GET Request 
**********/
var request = new XMLHttpRequest();
request.open('GET', eventUrl + '/' + eventid, true);

request.onload = function() {
  var data = JSON.parse(this.response);
  
  /*** STOP PAGE PRELOADER ***/
	const preloader = document.getElementById('preloader');
  preloader.setAttribute('style', 'display: none;'); 
  
    if (request.status >= 200 && request.status<400) { //GET request was successful
        document.getElementById('title').textContent = data.name;
        document.getElementById('eventtitle').textContent = " > " + data.name;

        const img = document.getElementById('eventflyer');
		
		if(data.picture != null) {
      img.setAttribute('style', 'background-image:url(' + data.picture + ')');
		}

        const eventaddress = document.getElementById('where');
        if (data.address == '') {
            eventaddress.setAttribute('style', 'visibility: hidden');
        } else {
            eventaddress.textContent(data.address);
        }
        /*** EVENT START DATE AND END DATE ***/
		const stdate = new Date(data.startdate);
        const startevent = weekday[stdate.getDay()] + ", " + stdate.getDate() + " " + months[stdate.getMonth()] + " " + stdate.getFullYear();
        const endate = new Date(data.enddate);
        const endevent = weekday[endate.getDay()] + ", " + endate.getDate() + " " + months[endate.getMonth()] + " " + endate.getFullYear();
        
        document.getElementById('when').textContent = "From " + startevent + " \nto " + endevent;
        document.getElementById('evbook').textContent = data.book.name;
        const wby = document.getElementById('writtenby');
        for (i=0; i<data.book.authors.length; i++) {
          if (i>0) {
            const p = document.createElement('p');
            p.setAttribute('style', 'display:inline-block; padding-right:10px;');
            p.textContent = ', ';
            wby.appendChild(p);
          }
          const authorlink = document.createElement('a');
          authorlink.setAttribute('style', 'display:inline-block');
          authorlink.textContent = data.book.authors[i].name;
          authorlink.setAttribute('href', '/pages/author.html?id=' + data.book.authors[i].id);
          wby.appendChild(authorlink);
        }
        document.getElementById('evbook').setAttribute("href", "/pages/book.html?id=" + data.book.id);
        document.getElementById('description').textContent = data.book.abstract;
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