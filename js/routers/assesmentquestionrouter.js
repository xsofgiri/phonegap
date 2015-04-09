
OneTo1.AssesmentquestionRoute = Ember.Route.extend({

      model: function(params) {

        var assessmentId = params.assessmentId;

        return assessmentId;
      },

      setupController: function (controller, model) {
          controller.set('model', model);
          controller.set("assessmentId", model);
          controller.set("questions", []);
          controller.set("loading", true);
          controller.set("results", null);
          controller.set("currentCount", 0);

          var assesment =  microcache.get("assesment"+ model);

          if( assesment != undefined ) {
           controller.set("shortDescription", assesment.shortDescription);
           controller.set("assessmentName", assesment.assessmentName);
        }

        $.ajax({
            type: 'GET',
            dataType: 'JSON',
          url: 'http://dev.service.1to1help.net/rest/json/metallica/assessmentquestion/' + model,
            async: true,
            success: function (result) {

            controller.set("questions", result);
            controller.set("currentCount", 1);
            controller.set("loading", false);

        },
            error: function (err) {

                var x = errorMessaage(err);
                bootbox.alert(x);

                controller.set("loading", false);
            }
        });


      }


});
