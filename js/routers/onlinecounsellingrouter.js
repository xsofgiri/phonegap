OneTo1.OnlineCounsellingRoute = Ember.Route.extend({

      setupController: function (controller, model) {

          controller.set("loading", true);
          controller.set("intake", false);

         $.ajax({
              type: 'POST',
              url: 'http://dev.service.1to1help.net/rest/json/metallica/counselling/',
              async:true,
              contentType: 'text/plain',
              dataType: "JSON",
              data: JSON.stringify({"memberId" : memberId}),

              success: function (result) {
              if( result.length > 0 ) {
                controller.set("cases", result);
                controller.set("intake", false);
                controller.set("loading", false);

              } else {

                controller.initFromCache();
                controller.set("intake", true);
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


});
