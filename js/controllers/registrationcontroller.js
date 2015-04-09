OneTo1.RegistrationController= Ember.ObjectController.extend({

         

         hasOfficialMail: true,

         step1: true,

         forMale: false,

         forFemale: false,

         forShift: false,

         forNoShift: false,

         officialEmailId: "",

         companyName:"",

         empCode:"",

         loading:false,

         userName:"",

         password:"",

         phoneNumber: "",

         city: "Bangalore",

         cityOptions: cityList1,

         

         locationOptions: [],

         businessUnitOptions: [],

         

         location: '-Location*-',

         businessUnit: '-Business Unit*-',

         

         locationAvailable: false,

         businessUnitAvailable: false,

         

         dateOfBirth: "",

         dateOfBirthOptions:[],

         corporateId: "",

         userNameAvailable: false,

         

         

         

         available: function() {

         

         var username = this.get("userName");

         var validate = /^[a-z0-9]+$/i;

         var controller = this;

         if (this.get("userName") != '' && !validate.test(username)) {

         username = username.replace(/[^a-zA-Z0-9\d\s ]+/gi, "");

         username = username.replace(/\s/g, '');

         controller.set('userName', username);

         bootbox.alert("Special characters and spaces are not allowed for username");

         return;

         }

         

         if (controller.get('userName').length < 5) {

         

         return;

         }

         

         else {

         

         $.ajax

         ({

              type: "POST",

              url: "http://dev.service.1to1help.net/rest/json/metallica/memregister/chkusername",

              contentType: 'text/plain',

              async: true,

              dataType: 'JSON',

              data: JSON.stringify({ "userName": controller.get('userName'), "corporateId": controller.get("corporateId") }),

              success: function (result) {

                  if (result.indexOf("Available") > -1) {

                  

                    controller.set("userNameAvailable", true);

                  

                  } else {

                    controller.set("userNameAvailable", false);

                  }

              },

              

              error: function (err) {

                  bootbox.alert('error' + err);

                  controller.set("userNameAvailability", "Error!");

              }

          

          });

         

         }

         

         return true;

         

         }.property('userName'),

         

         actions: {

         

         emailRegistration: function () {

         

         if (this.get('officialEmailId') == '') {

             bootbox.alert("Please enter the Official e-mail id");

             return;

         }

         

         var email = this.get('officialEmailId');

         filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

         

         if (!filter.test(email)) {

             bootbox.alert("Please enter a valid e-mail address");

             return false;

         }

         

         var controller = this;

         controller.set("loading", true);

         

         $.ajax

         ({

              type: "POST",

              url: "http://dev.service.1to1help.net/rest/json/metallica/memregister/chkcorp",

              contentType: 'text/plain',

              async: true,

              dataType: 'JSON',

              data: JSON.stringify({ "officialEmail": this.get("officialEmailId") }),

              success: function (result){

              var dict = JSON.parse(result);

              controller.set("locationAvailable", false);

              controller.set("businessUnitAvailable", false);

              

              if( dict['toPage'] == 'regNewUser') {

                  if (dict['corpDisplayNames'].contains('Location') && dict['corpLocationList'].length > 0) {

                      controller.set("locationAvailable", true);

					  controller.set("location", "-Location*-");

                      dict['corpLocationList'].unshift('-Location*-');

                      controller.set("locationOptions", dict['corpLocationList']);

                  }

                  

                  if (dict['corpDisplayNames'].contains('Business Unit') && dict['corpBusinessUnitList'].length > 0) {

                      controller.set("businessUnitAvailable", true);

					  controller.set("businessUnit", '-Business Unit*-');

                      dict['corpBusinessUnitList'].unshift('-Business Unit*-');

                      controller.set("businessUnitOptions", dict['corpBusinessUnitList']);

                  }

                  controller.set("corporateId", dict['corporateId']);

                  controller.set("step1", false);

				  controller.set("forMale", false);
				  controller.set("forFemale", false);
				  controller.set("forShift", false);
				  controller.set("forNoShift", false);


                  controller.set("loading", false);


              } else {

                  bootbox.alert(dict['errorMsg']);

                  controller.set("loading", false);

              }

              },

              

              error: function (err) {

                  //bootbox.alert('error' + err);

                  var x = errorMessaage(err);

                  bootbox.alert(x);


                  controller.set("loading", false);

              }

          

          });

         

         //this.transitionTo("registrationComplete");

         //this.set("step1", false);

         },

         companyNameRegistration: function () {

         if (this.get('companyName') == ''){

         bootbox.alert("Please enter the company name");

         return;

         }

         else if (this.get('empCode') == ''){

         bootbox.alert("Please enter the valid employee code/OHR id");

         return;

         }

         else {            

         var controller = this;

         controller.set("loading", true);

         

         $.ajax

         ({

          type: "POST",

          url: "http://dev.service.1to1help.net/rest/json/metallica/memregister/chkcorp",

          contentType: 'text/plain',

          dataType: 'JSON',

          async: true,

          data: JSON.stringify({"companyName": controller.get("companyName")}),

          success: function (result){

          

          var dict = JSON.parse(result);

          

          controller.set("corporateId", dict['corporateId']);

          

          if( dict['toPage'] == 'regNewEmpCode') {

          

          $.ajax

          ({

           type: "POST",

           url: "http://dev.service.1to1help.net/rest/json/metallica/memregister/chkempCodes",

           contentType: 'text/plain',

           dataType: 'JSON',

           async: true,

           data: JSON.stringify({ "empCode": controller.get("empCode"), "corpId": controller.get("corporateId") }),

           success: function (result){

           var dict = JSON.parse(result);

           

           if( dict['toPage'] == 'regNewUser') {

           
		          if (dict['corpDisplayNames'].contains('Location') && dict['corpLocationList'].length > 0) {

                      controller.set("locationAvailable", true);

					  controller.set("location", "-Location*-");

                      dict['corpLocationList'].unshift('-Location*-');

                      controller.set("locationOptions", dict['corpLocationList']);

                  }

                  if (dict['corpDisplayNames'].contains('Business Unit') && dict['corpBusinessUnitList'].length > 0) {

                      controller.set("businessUnitAvailable", true);

					  controller.set("businessUnit", '-Business Unit*-');

                      dict['corpBusinessUnitList'].unshift('-Business Unit*-');

                      controller.set("businessUnitOptions", dict['corpBusinessUnitList']);

                  }

                  controller.set("corporateId", dict['corporateId']);

                  controller.set("step1", false);

				  controller.set("forMale", false);
				  controller.set("forFemale", false);
				  controller.set("forShift", false);
				  controller.set("forNoShift", false);

				 controller.set("loading", false);

           

           } else {
           
           bootbox.alert(dict['errorMsg']);
           controller.set("loading", false);


           }

           },

           

           error: function (err) {


           var x = errorRegistration(err);

           bootbox.alert(x);

           controller.set("loading", false);

           }

           });


          } else {

          bootbox.alert(dict['errorMsg']);

          controller.set("loading", false);

          }

          },


          error: function (err) {

              var x = errorMessaage(err);

              bootbox.alert(x);

          controller.set("loading", false);

          }

          });

         }

         //this.transitionTo("registrationComplete");

         //this.set("step1", false);

         },

         registerUser: function () {

         

             var username = this.get("userName");

             

             var validate = /^[a-z0-9]+$/i;

             
             if (this.get("userName") == '' || this.get("userName").length < 5) {

                 bootbox.alert("Username must have a minimum of 5 characters");

                 return;

             }


             if (this.get("userNameAvailable") == false)

             {
                 bootbox.alert("Username is not available.");
                 return;

             }

                                                             

             if (this.get("userName") != '' && !validate.test(username)) {

             bootbox.alert("Special characters and spaces are not allowed for username");

             return;

             }
             

             if (this.get("password") == '' || this.get("password").length < 5) {

             bootbox.alert("Password must have a minimum of 5 characters");

             return;

             }

             

             if( ! validPhonenumber(this.get("phoneNumber")) ) {

             bootbox.alert('Please enter valid Phone Number');

             return;

             }

             

             if (this.get("city") == '-City*-') {

             bootbox.alert("Please select a City");

             return;

             }

             

             if (this.get("locationAvailable") == true) {

             if (this.get("location") == '-Location*-') {

             bootbox.alert("Please select the Location");

             return;

             }

             }

             

             if (this.get("businessUnitAvailable") == true) {

             if (this.get("businessUnit") == '-Business Unit*-') {

             bootbox.alert("Please select the Business Unit");

             return;

             }

             }

             

             if (this.get("dateOfBirth") == '-Year of Birth*-') {

             bootbox.alert("Please select the Year of Birth");

             return;

             }

             

             if (this.get("forMale") == false && this.get("forFemale") == false) {

             bootbox.alert("Please select the Gender");

             return;

             }

             

             if (this.get("forShift") == false && this.get("forNoShift") == false) {

             bootbox.alert("Please select the option for night shift");

             return;

             }

             

             

             var user = {

             "userName": this.get("userName"),

             "password" : this.get("password"),

             "city": this.get("city"),

             "corpId": this.get("corporateId"),

             "city":  this.get("city"),

             "phoneNo": this.get("phoneNumber")

             };

             

             if( this.get("dateOfBirth") != '' ) {

             user["dob"] = this.get("dateOfBirth");

             }

             

             

             if (this.get("locationAvailable") == true) {

             user['cLocation'] = this.get("location");

             }

             else {

             user['cLocation'] = '';

             }

             

             if (this.get("businessUnitAvailable") == true) {

             user['businessUnit'] = this.get("businessUnit");

             }

             else {

             user['businessUnit'] = '';

             }

             

             if( this.get("officialEmailId") != '') {

             user['officialEmail'] = this.get("officialEmailId");

             } else {

             user['companyName'] = this.get("companyName");

             user['empCode'] = this.get("empCode");

             }

             

             if( this.get("forShift") == true) {

             user['isShift'] = 'Yes';

             } else {

             user['isShift'] = 'No';

             }

             

             if( this.get("forMale") == true) {

             user['gender'] = 'Male';

             } else {

             user['gender'] = 'Female';

             }

             

             var controller = this;

             

             controller.set("loading", true);

             

             $.ajax

             ({

              type: "POST",

              url: "http://dev.service.1to1help.net/rest/json/metallica/memregister/adduser",

              contentType: 'text/plain',

              async: true,

              dataType: 'JSON',

              data: JSON.stringify(user),

              success: function (result){

              

              if( result != "0" ) {

              

              controller.transitionTo("/");

              controller.set("loading", false);

              bootbox.alert('An activation code has been sent to your email id, Click on the same to activate it.');

              

              } else {

              bootbox.alert('Error in registration. Try again.');

              controller.set("loading", false);

              

              }

              

              },

              

              error: function (err) {

              var x = errorRegistration(err);

              bootbox.alert(x);

              controller.set("loading", false);

              

              }

              

              });

         

         },

         noOffiialMail: function () {

         this.set("hasOfficialMail", false);

         },

         officiaMail: function () {

         this.set("hasOfficialMail", true);

         },

         gotoDetailsFill: function () {

         this.set("step1", false);

         },

         makemale: function () {

         this.set("forMale", true);

         this.set("forFemale", false);

         },

         makeFemale: function () {

         this.set("forMale", false);

         this.set("forFemale", true);

         },

         nightShift: function () {

         this.set("forShift", true);

         this.set("forNoShift", false);

         },

         noShift: function () {

         this.set("forShift", false);

         this.set("forNoShift", true);

         },

         tolandingPage: function () {

         this.transitionToRoute('landingPage');

         },

         toSelfHelp: function () {

         this.transitionToRoute('selfHelp');

         }

         

         }

         

         });