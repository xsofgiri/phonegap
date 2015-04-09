OneTo1.RegistrationRoute = Ember.Route.extend({

    setupController: function (controller, model) {
        controller.set('loading', false);
        controller.set('step1', true);
        controller.set("dateOfBirth", null);
        controller.set("companyName", "");
        controller.set("empCode", "");
        controller.set("userName", "");
        controller.set("password", "");
        controller.set("phoneNumber", "");
        controller.set("officialEmailId", "");
        controller.set("city", "-City*-");
		controller.set("location", "-Location*-");
        controller.set("businessUnit", '-Business Unit*-');



      var date = new Date();
      var currentYear = date.getFullYear();
      var year = currentYear - 100;
      var dateOfBirthOptions = []
      dateOfBirthOptions.push('-Year of Birth*-');
      for (year; year <= currentYear; year++) {
      dateOfBirthOptions.push(year);
      }

        controller.set("dateOfBirthOptions", dateOfBirthOptions);

    }

});
