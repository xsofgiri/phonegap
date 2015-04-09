
OneTo1.AssesmentdetailsController = Ember.ObjectController.extend({

    assesmentId: 0,
    assessmentName: '',
    shortDescription: '',
    instruction:'',
    bottomNotes:"",
    loading:false,

    actions: {

      back: function () {
          window.history.back()
      },
      gotoQuiz: function() {
        this.transitionToRoute('/assesmentquestion/' + this.get('assesmentId'));
      },
      tolandingpage: function(){
          this.transitionToRoute('/');
      }

    }
});
