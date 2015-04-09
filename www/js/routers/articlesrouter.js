OneTo1.ArticlesRoute = Ember.Route.extend({

  model: function(params) {
    var subCatId = params.subCatId;
    var articleId = params.articleId;

    return {'subCatId': subCatId, 'articleId': articleId, 'id': articleId};
  },

  setupController: function (controller, model) {
      controller.set('model', model);
      controller.set('title', '');
      controller.set('description', '');
      controller.set('loading', true);

      this.loadArticle(controller, model['subCatId'], model['articleId']);
  },

  loadArticle: function(controller, subCatId, articleId){

        controller.set("loading", true);

        $.ajax({
           type: 'POST',
           url: 'http://service.1to1help.net/rest/json/metallica/articledetails/',
           async:true,
           contentType: 'text/plain',
           dataType: 'JSON',
           data: JSON.stringify({"articleId" : articleId, "memberId" : memberId}),
          
           success: function (result) {

               controller.set('title', result[0]['title']);
               controller.set('description', result[0]['Description']);
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
