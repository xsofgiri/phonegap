OneTo1.LandingPageRoute = Ember.Route.extend({

    clearHistory: function (controller) {
        //history.go(-(history.length - 1));
    },

    setupController: function (controller, model) {

        controller.set("username", '');
        controller.set("password", '');
        //this.clearHistory(controller);

    }

}); 
