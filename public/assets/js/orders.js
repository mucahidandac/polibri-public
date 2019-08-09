const boxshadow = 'rgb(191,191,191)'; //COLOR FOR CARD AND SEARCH SHADOW
const orderUrl = new URL(window.location.href).origin;

//current page number
var params = getAllUrlParams();

$(document).ready(function () {
    var endpoint = '/api/orders/cart'
    if (params){
        switch (params.selected){
            case 'reservations':{
                endpoint = '/api/orders/reservations';
                document.getElementById('order_container_title').textContent = " > " + 'Reservations';
                document.getElementById('checkout-button').setAttribute('style', 'display: none;');
                break;
            }
            case 'cart':
            default:{
                endpoint = '/api/orders/cart';
                document.getElementById('order_container_title').textContent = " > " + 'Shopping Cart';
                document.getElementById('checkout-button').setAttribute('style', 'display: "";');
                break;
            } 
        }

        $.ajax({
            url: orderUrl + endpoint,
            success: function (data) {
                console.log(endpoint);
                loadData(data);
                
            },
            error: function () {
                console.log("The information could not be obtained.");
            }
        });

    }
});

const orders_container = document.getElementById('order_container'); //From where to attach the events

function loadData(data) {
   
    if(data.length > 0) {

        //orders
        for (i=0; i<data.length; i++) {
            element = data[i];
            var sum = 0;

            const orderItem = document.createElement('div');
            orderItem.setAttribute('class', 'order-item');
            

            const orderButtons = document.createElement('div');
            orderButtons.setAttribute('class', 'order-buttons');
            const deleteButton = document.createElement('span');
            deleteButton.setAttribute('class', 'order-delete-btn');
            deleteButton.setAttribute('id',element.id);
            orderButtons.appendChild(deleteButton);

            const orderImageContainer = document.createElement('div');
            orderImageContainer.setAttribute('class', 'order-image');
        
            const orderImg = document.createElement('img');
            if(element.book != null && element.book.picture != null) {
                orderImg.src = element.book.picture; 
            } else {
                orderImg.src = '/assets/img/book_default.png'; 
            }
            orderImageContainer.appendChild(orderImg);

            const orderDescription = document.createElement('div');
            orderDescription.setAttribute('class','order-description');
            const orderBookTitle = document.createElement('span');
            const orderBookAuthor = document.createElement('span');
            const orderBookPrice = document.createElement('span');
            if(element.book) {
                orderBookTitle.textContent = element.book.name;
                orderBookPrice.textContent = element.book.price + " €";
                if (element.book.authors){
                    //Authors
                        const authorslength = element.book.authors.length;
                        var authorsn = "";
                        for (j=0; j<authorslength; j++) {
                            if (j > 0) {
                                authorsn = authorsn + ",";
                            }
                            authorsn = authorsn + " " + element.book.authors[j].name;
                        }
                        orderBookAuthor.textContent = authorsn;
                }
            }
            orderDescription.appendChild(orderBookTitle);
            orderDescription.appendChild(orderBookAuthor);
            orderDescription.appendChild(orderBookPrice);

            orderQuantityContainer = document.createElement('div');
            orderQuantityContainer.setAttribute('class','order-quantity');
            
            orderPlusButton = document.createElement('button');
            orderPlusButton.setAttribute('class','order-plus-btn'); 
            orderPlusButton.setAttribute('type','button');
            orderPlusButton.setAttribute('name','button');
            const plusImg = document.createElement('img');
            
            plusImg.src = '/assets/img/plus.svg'; 
            orderPlusButton.appendChild(plusImg);

            const orderInput = document.createElement('input');
            orderInput.setAttribute('type','text'); 
            orderInput.setAttribute('name','name');
            orderInput.setAttribute('value','1');
            orderInput.value = element.quantity;

            orderNegButton = document.createElement('button');
            orderNegButton.setAttribute('class','order-minus-btn'); 
            orderNegButton.setAttribute('type','button');
            orderNegButton.setAttribute('name','button');
            const negImg = document.createElement('img');
            negImg.src = '/assets/img/minus.svg'; 
            orderNegButton.appendChild(negImg);

            
        
            orderQuantityContainer.appendChild(orderPlusButton);
            orderQuantityContainer.appendChild(orderInput);
            orderQuantityContainer.appendChild(orderNegButton);

            const totalCost = document.createElement('div');
            totalCost.setAttribute('class','order-total-price');
            const cost = element.book.price * element.quantity;
            totalCost.textContent = cost.toFixed(2) + ' €';
            const price = element.book.price; 
            orderPlusButton.onclick = function() {
                
                var value = parseInt(orderInput.value);

                if (value < 100) {
                    value = value + 1;
                } else {
                    value =100;
                }

                orderInput.value = value;
                updateQuantity(value, deleteButton.getAttribute('id'), totalCost, price);

            };
            orderNegButton.onclick = function() { 
                
                var value = parseInt(orderInput.value);

                if (value > 1) {
                    value = value - 1;
                } else {
                    value = 0;
                }
                orderInput.value = value;
                updateQuantity(value, deleteButton.getAttribute('id'), totalCost, price);
            };
            deleteButton.onclick = function () {
                var orderId =  deleteButton.getAttribute('id');
                $.ajax({
                    method: "DELETE",
                    beforeSend: function(request) {
                        request.setRequestHeader('Accept','application/json; charset=utf-8');
                    },
                    url: orderUrl + "/api/orders/" + orderId,
                    crossDomain: true,
                    contentType: "application/json",
                    success: function (data) {
                        console.log(data);
                        orders_container.removeChild(orderItem);

                    },
                    error: function (data) {
                        window.alert("Order deleting failed.");
                        console.log(data);
                    }
                });
            };

            orderItem.appendChild(orderButtons);
            orderItem.appendChild(orderImageContainer);
            orderItem.appendChild(orderDescription);
            orderItem.appendChild(orderQuantityContainer);
            orderItem.appendChild(totalCost);
            orders_container.appendChild(orderItem);
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
     

function updateQuantity (quantity, orderId, totalCost, price) {
    var orderData = {
        order_id: orderId,
        quantity: quantity
    }
    $.ajax({
        method: "PATCH",
        beforeSend: function(request) {
            request.setRequestHeader('Accept','application/json; charset=utf-8');
        },
        url: orderUrl + "/api/orders/quantity",
        crossDomain: true,
        data: JSON.stringify(orderData),
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            var tempCost = price * quantity;
            totalCost.textContent = tempCost.toFixed(2) + ' €';
                    },
        error: function (data) {
            console.log(data);
        }
    });
}