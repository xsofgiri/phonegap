OneTo1.SelfHelpController = Ember.ObjectController.extend({

    categories: [],
    sub_categories: [],
    articles: [],
    loading_categories: false,
    loading_subcategories: false,

    actions: {
        back: function () {

            //window.history.back();
            this.transitionToRoute('landingPage');

        },

        quit: function () {
            this.transitionToRoute('landingPage');
        },

        showSubCategories: function(category){

            this.set("sub_categories", []);

            $(".category .loading").css("display", "none");
            $(".category .subcategory").css("display", "none");

            $((".category ." + category.identifier)).css("display", "inline");

            var controller = this;

                $.ajax({
                    type: 'POST',
                    url: 'http://service.1to1help.net/rest/json/metallica/subcategory/',
                    async:true,
                    contentType: 'text/plain',
                    dataType: "JSON",
                    data: JSON.stringify({"catId" : category.catId}),
                    success: function (result) {

                        controller.set("sub_categories", result);
                        $(".category .loading").css("display", "none");

                    },
                    error: function (err) {
                        // alert(category.catId);
                        // alert(JSON.stringify(err));
                        $(".category .loading").css("display", "none");

                        var x = errorMessaage(err);
                        bootbox.alert(x);
                    }
                });

        },

        goToArticlesList: function(subcategory){

          microcache.set("sub"+subcategory.subCatId, subcategory);

          this.transitionToRoute('/articlesList/' + subcategory.subCatId);

        }
    }
});
