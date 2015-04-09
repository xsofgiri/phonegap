function getformattedDate (date) {
  var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

   return date.getDate() + ' ' + monthNames[date.getMonth()] + ", " + date.getFullYear();

}

function getFormattedTime(time) {

    var hour = parseInt(time.substring(0,2));

    var minutes     = parseInt(time.substring(3,5));  /* Returns the minutes (from 0-59) */
    var result  = hour;
    var ext     = '';

    if(hour > 12){
        ext = 'PM';
        hour = (hour - 12);

        if(hour < 10){
            result = "0" + hour;
        }else if(hour == 12){
            hour = "00";
            ext = 'AM';
        }
    }
    else if(hour < 12){
        result = ((hour < 10) ? "0" + hour : hour);
        ext = 'AM';
    }else if(hour == 12){
        ext = 'PM';
    }

if(minutes < 10){
    minutes = "0" + minutes;
}

return result + ":" + minutes + ' ' + ext;

}

OneTo1.AppointmentsController = Ember.ObjectController.extend({

    loading: true,
    noAppointment: true,
    appointmentMode: '-Appointment Mode-',
    appointmentModes: ['-Appointment Mode-', 'FACE-TO-FACE', 'TELEPHONIC'],
    counsellingType: '-Counselling type-',
    counsellingTypes: ['-Counselling type-', 'COUNSELLING', 'WELLNESS'],
    preferredDate1: '',
    preferredDate2: '',
    preferredTime1: '',
    preferredTime2: '',
    city: '-City-',
    cities: cityList,
    contactNumber: '',
    status: 'Requested',
    confirmTime: '',
    confirmDate:    '',


    enableSubmit: function() {

      if(  this.get("appointmentMode") != ''  &&
            this.get("counsellingType") != '' &&
            this.get("preferredDate1") != "" &&
            this.get("preferredDate2") != "" &&
            this.get("preferredTime1") != "" &&
            this.get("preferredTime2") != "" &&
            this.get("city") != "" &&
            this.get("contactNumber") != ""
      ) {

        return false;
      }

      return false;

    }.property('appointmentMode', 'counsellingType', 'preferredDate1', 'preferredDate2','city', 'contactNumber', 'preferredTime1', 'preferredTime2'),


    actions: {

      back: function () {

          //window.history.back();
		  this.transitionToRoute('landingPage');

      },

      tolandingpage: function(){

          this.transitionToRoute('/');
      },
      newAppointment: function () {

          if (this.get("appointmentMode") == '-Appointment Mode-') {
              bootbox.alert("Please select the Appointment Mode");
              return;
          }

          if (this.get("counsellingType") == '-Counselling type-') {
              bootbox.alert("Please select the Counselling Type");
              return;
          }

          if (this.get('preferredDate1') == null || this.get('preferredDate1') == '') {
              bootbox.alert("Please select the Preferred Date1");
              return;
          }

          if (this.get('preferredTime1') == '') {
              bootbox.alert("Please select the Preferred Time1");
              return;
          }

          if (this.get('preferredDate2') == null || this.get('preferredDate2') == '') {
              bootbox.alert("Please select the Preferred Date2");
              return;
          }

          if (this.get('preferredTime2') == '') {
              bootbox.alert("Please select the Preferred Time2");
              return;
          }

          if( new Date(this.get("preferredDate1")) - new Date() < -86400 ||
              new Date(this.get("preferredDate2")) - new Date() < -86400 ) {
                bootbox.alert('Select a Valid Date.');
                return;
          }

		if( (this.get("preferredTime1") == this.get("preferredTime2")) && (getformattedDate(new Date(this.get('preferredDate1'))) == getformattedDate(new Date(this.get('preferredDate2')))) ) {

	            bootbox.alert('Both preferred date time cannot be same.');
	            return;
	      }

		if (this.get('city') == '-City-') {
		    bootbox.alert("Please select the city");
		    return;
		}

      if( ! validPhonenumber(this.get("contactNumber")) ) {
         bootbox.alert('Please enter valid contact number');
         return;
      }

      if (this.get("appointmentMode") == 'FACE-TO-FACE') {
          var face2face = 'FACETOFACE';
      }
      else {
          face2face = this.get("appointmentMode");
      }

        var appointment = {
          "apptFor": this.get("counsellingType"),
          "apptType": face2face,
            "city":  this.get("city"),
            "comment": "Appointment taken from mobile application.",
             "contactNo": this.get("contactNumber"),
               "memberId": memberId,
               "preferedDate1": getformattedDate(new Date(this.get('preferredDate1'))),
                "preferedDate2": getformattedDate(new Date(this.get('preferredDate2'))),
                "preferedTime1": getFormattedTime(this.get("preferredTime1")),
                "preferedTime2": getFormattedTime(this.get("preferredTime2"))
                }

         var controller = this;

         controller.set("loading", true);

            $.ajax
            ({
          type: "POST",
          url: "http://dev.service.1to1help.net/rest/json/metallica/add/appt",
          dataType: 'JSON',
          contentType: 'text/plain',
          async: true,
          data: JSON.stringify(appointment),
          success: function (result){

             controller.set("loading", false);

             bootbox.alert("New Appointment created");

             window.history.back();

          },

          error: function (err) {

             controller.set("loading", false);
             var x = errorMessaage(err);
             bootbox.alert(x);
          }

      });

      }


    }
});
