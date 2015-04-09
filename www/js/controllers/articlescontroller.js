
OneTo1.ArticlesController = Ember.ObjectController.extend({

    title: "",
    description: "",
    loading: false,

    actions: {

      back: function () {
          window.history.back()
      },
      toMentalHealth: function () {
          this.transitionToRoute('mentalhealth');
      },
      tolandingpage: function () {
          this.transitionToRoute('/');
      }

    }
});
