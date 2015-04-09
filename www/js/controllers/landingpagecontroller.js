OneTo1.LandingPageController = Ember.ObjectController.extend({

    notLoggedIn: false,
    username: '',
    password: '',
    nextAction: '',
    loadingApp: false,
    LoggingIn: false,
    //disableLogin: false,
	    clearCookie: function () {
        $.cookie('seen-splash', null);
        console.log('cleared session cookie');
    },


    actions: {
        showSelfHelp: function () {

            if( userloggedIn ) {
                this.transitionTo("selfHelp");

            } else {

                this.set("nextAction", "selfHelp");

                this.set("username", '');
                this.set("password", '');
                this.set("notLoggedIn", true);

            }

        },
        toRegistration: function () {
            if( userloggedIn ) {

                this.transitionTo("registration");
            } else {
                this.set("nextAction", "registration");

                this.set("username", '');
                this.set("password", '');
                this.set("notLoggedIn", true);

            }
        },
        toCounselling: function(){

            if( userloggedIn ) {

                this.transitionTo("onlineCounselling");
            } else {

                this.set("nextAction", "onlineCounselling");

                this.set("username", '');
                this.set("password", '');
                this.set("notLoggedIn", true);

            }
        },
        toAssesments: function(){

            if( userloggedIn ) {

                this.transitionTo("assesments");

            } else {

                this.set("nextAction", "assesments");

                this.set("username", '');
                this.set("password", '');
                this.set("notLoggedIn", true);

            }

        },
        toAppointments: function(){

            if( userloggedIn ) {

                this.transitionTo("appointments");
            } else {

                this.set("nextAction", "appointments");

                this.set("username", '');
                this.set("password", '');
                this.set("notLoggedIn", true);

            }
        },

        login: function () {

			if (this.get("username") == "")
			{
				bootbox.alert("Please enter the username");
			}
			else if ( this.get("password") == "" )
			{
				bootbox.alert("Please enter the password");
			}

			else 
			{

            this.set("loadingApp", true);
            this.set("LoggingIn", true);
            var controller = this;
            var username = controller.get("username");
            var password = controller.get("password");

			var base64Key = "AQgAAAECAAABAgEAAAAAAA==";
		
			var key = CryptoJS.enc.Base64.parse(base64Key);
			
			// this is the plain text to be encrypted
			var plaintText = "prasad";
			
			// this is Base64-encoded encrypted data to be sent to server.
			var encryptedData = CryptoJS.AES.encrypt(password, key, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			
			
            $.ajax
			({
			    type: "POST",
			    url: "http://service.1to1help.net/rest/json/metallica/validate/user1",
			    contentType: 'text/plain',
			    async: true,
                dataType: 'JSON',
			    data: JSON.stringify({ "password": encryptedData.toString(), "userId": username }),
			    success: function (result) {

			        controller.set("LoggingIn", false);
			        if (result > "0") {

			            userloggedIn = true;
			            memberId = result;
			            window.localStorage.setItem("memberId", memberId);
			            controller.set("notLoggedIn", false);
			            controller.set("loadingApp", false);


			            if (controller.get("nextAction") != "") {

			                controller.transitionTo(controller.get("nextAction"));
			                controller.set("LoggingIn", false);

			            }
			        }
			        else if (result == "-2") {
			            bootbox.alert('User not activated.');
			            controller.set("loadingApp", false);
			            controller.set("LoggingIn", false);
			        }
			        else {
			            bootbox.alert('Invalid username or password');
			            controller.set("loadingApp", false);
			            controller.set("LoggingIn", false);

			        }

			    },

			    error: function (err) {
			        var x = errorLogIn(err);
			        bootbox.alert(x);

                    controller.set("loadingApp", false);
                    controller.set("LoggingIn", false);

			    }

			});

			}

        },

        slider: function () {

            if( ! userloggedIn ) {

                this.set("nextAction", "");

                this.set("username", '');
                this.set("password", '');
              this.set("notLoggedIn", true);
              return;

            }

            if ($(".slider").css("left") == "0px") {
                $(".slider").animate({ left: "80%" }, '500');
            }
            else {
                $(".slider").animate({ left: "0px" }, '500');
            }
        },
        logout: function() {

            bootbox.confirm( "Do you want to logout ?", function (result) {

                if (!result)
                    return;

                userloggedIn = false;
                memberId = "0";
                window.localStorage.setItem("memberId", "0");

                if ($(".slider").css("left") == "0px") {
                    $(".slider").animate({ left: "80%" }, '500');
                }
                else {
                    $(".slider").animate({ left: "0px" }, '500');
                }

                bootbox.alert('You have been logged out.');

                window.localStorage.clear();

                history.go(-(history.length - 1));
 

            });


        },
        toRegistration: function () {
            this.transitionToRoute("registration");
        },
        closepopup: function () {
            this.set("notLoggedIn", false);
        },
        closeLogin: function(){
          this.set("notLoggedIn", false);
        },
        doNothing: function(){
        },
        forgotPassword: function(){
          this.transitionToRoute('forgotpassword');
        },
        closeLoginScreen: function () {
          this.set("notLoggedIn", false);
        },
        toFeedBack: function () {
            this.transitionToRoute('feedback');
        }

    }

});
