OneTo1.AppointmentsRoute = Ember.Route.extend({

    setupController: function (controller, model) {
        controller.set('model', model);
        this.loadAppointment(controller);
    },
    loadAppointment: function (controller) {

        controller.set("appointmentMode", '-Appointment Mode-');
        controller.set("counsellingType", '-Counselling type-');
        controller.set("preferredDate1", '');
        controller.set("preferredDate2", '');
        controller.set("preferredTime1", '');
        controller.set("preferredTime2", '');
        controller.set("city", '-City-');
        controller.set("contactNumber", '');

        controller.set('loading', true);
        

        $.ajax({
            type: 'POST',
            url: 'http://dev.service.1to1help.net/rest/json/metallica/appt/',
            async:true,
            contentType: 'text/plain',
            dataType: "JSON",
            data: JSON.stringify({"memberId" : memberId}),

            success: function (result) {

              if( result != null && result.length > 0 ) {
                  // alert(">1");
                var appointment = result[0];
                controller.set('appointmentMode', appointment['apptType']);
                controller.set('counsellingType', appointment['apptFor']);
                controller.set('preferredDate1', appointment['preferedDate1']);
                controller.set('preferredDate2', appointment['preferedDate2']);
                controller.set('preferredTime1', appointment['preferedTime1']);
                controller.set('preferredTime2', appointment['preferedTime2']);
                controller.set('city', appointment['city']);
                controller.set('contactNumber', appointment['contactNo']);
                controller.set('status', appointment['status']);
				        controller.set('confirmDate', appointment['confirmDate']);
				        controller.set('confirmTime', appointment['confirmTime']);
                controller.set('loading', false);
                controller.set('noAppointment', false);



              } else {
                  // alert("<1");

              controller.set('loading', false);
              controller.set('noAppointment', true);
              controller.set('preferredDate1', null);
              controller.set('preferredDate2', null);
          }



          },
            error: function (err) {

                var x = errorMessaage(err);
                bootbox.alert(x);

              controller.set('loading', false);

            }
        });

    }

});
