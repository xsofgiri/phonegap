OneTo1.Note8Route = Ember.Route.extend({
    beforeModel: function () {
        this.transitionTo('landingPage');
    }   
});
