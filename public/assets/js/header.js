const baseUrl = new URL(window.location.href).origin;

$(document).ready(function () {
    checkSession();

    $.ajax({
        url: baseUrl + '/api/books/genres',
        success: function (data) {

            var subMenu = "";
            console.log(data);
            for (var x = 0; x < data.length; x++) {
                subMenu = subMenu + '<li>' +
                    '<a href="/pages/books.html?genre_id=' + data[x].id + '&selected=genre&name=' + data[x].name + '&page=1">' + data[x].display_name + '</a>' +
                    '</li>';    
            }
            $("#genre-sub-menu").html(subMenu);
            
        },
        error: function () {
            console.log("The information could not be obtained.");
        }
    });
    $.ajax({
        url: baseUrl + '/api/books/themes',
        success: function (data) {

            var subMenu = "";
            console.log(data);
            for (var x = 0; x < data.length; x++) {
                subMenu = subMenu + '<li>' +
                    '<a href="/pages/books.html?theme_id=' + data[x].id + '&selected=theme&name=' + data[x].name + '&page=1">' + data[x].display_name + '</a>' +
                    '</li>';
            }
            $("#theme-sub-menu").html(subMenu);
        },
        error: function () {
            console.log("The information could not be obtained.");
        }
    });
});

function checkSession() {
    
    $.ajax({
        url: baseUrl + '/api/users/is-cookie-alive',
        success: function (response, status, xhr) {
            console.log(xhr.status);
            if(xhr.status == 401){
                // return false;
                $("#login").css({
                    'display': ''
                });

                $("#user_name").css({
                    'display': 'none'
                });
                $("#user_menu").css({
                    'display': 'none'
                });
            }else {
                $("#login").css({
                    'display': 'none'
                });
                $("#user_name").css({
                    'display': '',
                     'color':'white'
                });
                $("#user_menu").css({
                    'display': ''
                });
                document.getElementById('user_name').textContent = response.name;
            
            }
        },
        error: function () {
            console.log("The information could not be obtained.");
                $("#login").css({
                    'display': ''
                });

                $("#user_name").css({
                    'display': 'none'
                });
                $("#user_menu").css({
                    'display': 'none'
                });
        }
    });

}

function onLogout() {
    $.ajax({
        url: baseUrl + '/api/users/logout',
        success: function (response, status, xhr) {
            console.log(xhr.status);
            if(xhr.status == 200){
                window.location.href = baseUrl + '/';
            }
        },
        error: function () {
            console.log("The information could not be obtained.");         
        }
    });
}