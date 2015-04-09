OneTo1.AssesmentsRoute = Ember.Route.extend({

    setupController: function (controller, model) {
        controller.set('model', model);
        controller.set("assesments", []);

        this.loadList(controller);
    },
    loadList: function (controller) {

        controller.set("loading", true);

        $.ajax({
            type: 'GET',
            dataType: 'JSON',
          url: 'http://dev.service.1to1help.net/rest/json/metallica/assessment',
            async: true,
            success: function (result) {
              controller.set("loading", false);
              controller.set("assesments", result);
        },
            error: function (err) {
			
                var x = errorMessaage(err);
                bootbox.alert(x);
                controller.set("loading", false);
            }
        });

    }

});
