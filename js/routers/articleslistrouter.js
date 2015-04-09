OneTo1.ArticlesListRoute = Ember.Route.extend({

	    model: function(params) {
	      var subCatId = params.subCatId;

	      return subCatId;
	    },

	    setupController: function (controller, model) {

	        controller.set('model', model);
					controller.set("articles", []);
					controller.set("subCatId", model);
					controller.set("loading", true);
					var subcategory =  microcache.get("sub"+ model);

					if( subcategory != undefined ) {
 					controller.set("title", subcategory.title);
				}


	        this.loadArticles(controller, model);
	    },

	    loadArticles: function(controller, subCatId){

             $.ajax({
                    type: 'POST',
                    url: 'http://service.1to1help.net/rest/json/metallica/articles/',
                    async:true,
                    contentType: 'text/plain',
                    dataType: "JSON",
                    data: JSON.stringify({"subCatId" : subCatId}),
                success: function (result) {

      						controller.set("articles", result);
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
