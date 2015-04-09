OneTo1.ArticlesListController = Ember.ObjectController.extend({

    articles: [],
    subCatId: 0,
    title: 'Sub Category',
    loading: false,

    actions: {

      back: function () {
          window.history.back()
      },

		getArticleDetails : function(article){

          var subCatId = this.get("subCatId");

          this.transitionToRoute("/articles/" + subCatId + "/" + article.articleId);
		},

    tolandingpage : function(){
      this.transitionToRoute('/');
    }

    }
});
