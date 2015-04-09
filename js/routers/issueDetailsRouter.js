OneTo1.IssueDetailsRoute = Ember.Route.extend({

    model: function (params) {
        return params.sessionId;
    },

    setupController: function (controller, model) {

        this.set("loading", false);

    }



});