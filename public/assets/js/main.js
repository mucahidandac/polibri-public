const mainUrl = new URL(window.location.href).origin;

            function opennewpage(n) {
              window.open('/pages/' + n,'_self');
            }

            function currentDiv(n) {
              showDivs(slideIndex = n);
            }
            
            function showDivs(n) {
              var i;
              var x = document.getElementsByClassName("mySlides");
              var dots = document.getElementsByClassName("demo");
              if (n > x.length) {slideIndex = 1}
              if (n < 1) {slideIndex = x.length}
              for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
              }
              for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" opacity-off", "");
              }
              x[slideIndex-1].style.display = "block";
              dots[slideIndex-1].className += " opacity-off";
            }


function addtoCart(id) {
    console.log("clicked");
    var bookData = {
      book_id: id,
      quantity: 1
    };
  
    $.ajax({
      method: "PUT",
      beforeSend: function(request) {
        request.setRequestHeader('Accept','application/json; charset=utf-8');
      },
      url: mainUrl + "/api/orders/cart",
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
  function addtoReservations(id) {
    var bookData = {
      book_id: id,
      quantity: 1
    };
  
    $.ajax({
      method: "PUT",
      beforeSend: function(request) {
        request.setRequestHeader('Accept','application/json; charset=utf-8');
      },
      url: mainUrl + "/api/orders/reservations",
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