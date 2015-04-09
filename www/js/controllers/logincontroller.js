OneTo1.LoginController = Ember.ObjectController.extend({
    actions: {
        takeToLandingPage: function () {
            this.transitionTo('landingPage');
        }
    }
});