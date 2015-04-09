OneTo1.ForgotpasswordRoute = Ember.Route.extend({

    setupController: function (controller, model) {
        
        controller.set("forgt_officialemail", '');
        controller.set("forgt_username", '');


    }

});