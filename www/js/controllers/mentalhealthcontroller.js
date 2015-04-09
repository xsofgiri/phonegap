OneTo1.MentalhealthController = Ember.ObjectController.extend({

    actions  : {
        goToArticles: function () {
            this.transitionTo('articles');
        },
        toSelfHelp: function () {
            this.transitionToRoute('selfHelp');
        },
        tolandingpage: function () {
            this.transitionToRoute('/');
        }
    }

});


