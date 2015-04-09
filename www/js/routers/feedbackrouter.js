OneTo1.FeedbackRoute = Ember.Route.extend({

    setupController: function (controller, model) {

        controller.set("likeDislikeAnswer", '');
        controller.set("additionalAnswer", '');


        $.ajax({
            type: 'GET',
            url: 'http://service.1to1help.net/rest/json/metallica/getfeedbackquestions',
            async: true,
            success: function (result) {

            },

            error: function (err) {
                var x = errorMessaage(err);
                bootbox.alert(x);
                controller.set("loading", false);
            }
        });


    }


});
