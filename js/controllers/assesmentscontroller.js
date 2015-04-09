OneTo1.AssesmentsController = Ember.ObjectController.extend({

    assesments: [],
    loading: true,

    actions: {
        back: function () {

          //window.history.back();
		  this.transitionToRoute('landingPage');  
		        
		  },
        assesmentDetail: function(assesment){

          microcache.set("assesment"+assesment.assessmentId, assesment);

          this.transitionToRoute('/assesmentdetails/' + assesment.assessmentId);

        },
        tolandingpage: function () {
            this.transitionToRoute('/');
        }
    }
}); 