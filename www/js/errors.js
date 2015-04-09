function errorMessaage(error) {

    var result = JSON.stringify(error.status);

    if (result == 500) {
        return 'Server down';
    }
    else if (result == 0) {
        return "Unable to Connect to Internet";
    }
    else {
        return 'Unable to Process Your Request';
    }
}


function errorRegistration(error) {

    var result = JSON.stringify(error.status);

    if (result == 500) {
        return 'Server down';
    }
    else if (result == 0) {
        return "Unable to Connect to Internet";
    }
    else {
        return 'Error in registration. Try again';
    }
}

function errorLogIn(error) {

    var result = JSON.stringify(error.status);

    if (result == 500) {
        return 'Server down';
    }
    else if (result == 0) {
        return "Unable to Connect to Internet";
    }
    else {
        return 'Unable to login. Please try again';
    }
   
}


