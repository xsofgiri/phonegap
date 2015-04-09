OneTo1.SelfHelpRoute = Ember.Route.extend({

    setupController: function (controller, model) {
        controller.set('model', model);
        this.loadList(controller);
    },
    loadList: function (controller) {

        controller.set("loading_categories", true);

        $.ajax({
        	type: 'GET',
        	async: true,
            dataType: 'JSON',
            url: 'http://service.1to1help.net/rest/json/metallica/category',
            success: function (result) {

            for (i = 0;  i < result.length; i++ ) {
            	result[i].open = false;
            	result[i].identifier = "category" + result[i].catId;
            	result[i].loading = false;
            	result[i].sub_categories = [];
            }

              controller.set("loading_categories", false);
       		  controller.set("categories", result);

			  },

              error: function (err) {
               var x = errorMessaage(err);
               bootbox.alert(x);
               controller.set("loading_categories", false);
              }
        }); 

    }

});
