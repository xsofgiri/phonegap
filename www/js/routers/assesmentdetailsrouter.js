
OneTo1.AssesmentdetailsRoute = Ember.Route.extend({

      model: function(params) {

        var subCatId = params.assessmentId;

        return subCatId;
      },

      setupController: function (controller, model) {
          controller.set('model', model);
          controller.set("assesmentId", model);
          controller.set("loading", true);
          controller.set("shortDescription", '');
          controller.set("assessmentName", '');
          controller.set("instruction", '');
          controller.set("bottomNotes", '');

          $.ajax({
              type: 'GET',
              dataType: 'JSON',
            url: 'http://dev.service.1to1help.net/rest/json/metallica/assessment/' + model,
            async: true,

              success: function (result) {

                if( result.length > 0 ) {

                result = result[0];

                controller.set("shortDescription", result['description']);
                controller.set("assessmentName", result['assessmentName']);
                controller.set("instruction", result['instruction']);
                controller.set("bottomNotes", result['bottomNotes']);

                controller.set("loading", false);

              } else {

                controller.set("loading", false);
                bootbox.alert('Assesment not found.');

              }

          },
              error: function (err) {

                  var x = errorMessaage(err);
                  bootbox.alert(x);
                  controller.set("loading", false);
              }
          });


      }


});
