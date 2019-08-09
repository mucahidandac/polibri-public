const registerUrl = new URL(window.location.href).origin + "/api/users/";
const d = $(document);

d.on("click", "#btn-register", function(e){
    register();
});

function validationFail(reason) {
    switch (reason) {
        case 'USER_CONFIRM_PASSWORD_FAILS': {
            $( "input[name='user_confirm_password']" ).after('<span class="error">Passwords are mismatching</span>');
            break;
        }
        case 'USER_DATA_UNCOMPLETE': {
            $( "input[name='user_name']" ).after('<span class="error">Name is required</span>');
            break;
        }
        case 'USER_EMAIL_NOT_VALID': {
            $( "input[name='user_email']" ).after('<span class="error">Valid email address is required</span>');
            break;
        }
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function register() {
    $(".error").remove();

    var email = $( "input[name='user_email']" ).val();
    var password = $( "input[name='user_password']" ).val();
    var confirmPassword = $( "input[name='user_confirm_password']" ).val();
    var name = $( "input[name='user_name']" ).val();
    
    var userData = {
        email: email,
        name: name,
        password: password
    };

    if (!validateEmail(email)){
        validationFail("USER_EMAIL_NOT_VALID");
        return;
    }

    if (password !== confirmPassword)
    {
        validationFail("USER_CONFIRM_PASSWORD_FAILS");
        return;
    }

    $.ajax({
        method: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('Accept','application/json; charset=utf-8');
        },
        url: registerUrl + "register",
        crossDomain: true,
        data: JSON.stringify(userData),
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            window.location.href = baseUrl.origin + '/';
        },
        error: function (data) {
            console.log(data);
        }
    });

}