function saveAnswer(controller) {

   var current = controller.get("questions")[controller.get("currentCount") - 1 ];
   current['checked'] = $("input:radio[name=question]").is(":checked");
   current['answer'] = $('input:radio[name=question]:checked').val();

}

function updateAnswer(controller) {

    var current = controller.get("questions")[controller.get("currentCount") - 1];

    if( current['checked'] ) {
      $("input:radio[name=question]").filter("[value="+current['answer']+"]").attr('checked', 'checked');
    } else {
      $("input:radio[name=question]").prop('checked', false);
    }
}

OneTo1.AssesmentquestionController = Ember.ObjectController.extend({

    assessmentId: 0,
    assessmentName: '',
    shortDescription: '',
    questions: [],
    loading: true,
    currentCount: 0,
    results: null,

    next: function () {

      if( this.get("currentCount") < this.get("questions").length ) {

         return true;
      }

      return false;

    }.property('currentCount'),

    prev: function () {

      if( this.get("currentCount") >= 2 ) {

         return true;
      }

      return false;

    }.property('currentCount'),

    submit: function () {

      if( this.get("currentCount") == this.get("questions").length ) {

         return true;
      }

      return false;

    }.property('currentCount'),

    current: function () {

      if( this.get("currentCount") <= this.get("questions").length ) {

         return this.get("questions")[this.get("currentCount") - 1 ];

      }

      return null;

    }.property('currentCount'),

    actions: {

        back: function () {
            this.transitionToRoute("assesments");
      },

      tolandingpage: function () {
          this.transitionToRoute('/');
      },

      nextQuestion: function () {

         if( ! $("input:radio[name=question]").is(":checked") ) {
            bootbox.alert('Please select an option');
            return;
         }

         saveAnswer(this);

         if( this.get("currentCount") < this.get("questions").length ) {

            this.set("currentCount", this.get("currentCount") + 1);

         }

        updateAnswer(this);

      },

      prevQuestion: function () {

         saveAnswer(this);

         if( this.get("currentCount") >= 2 ) {

            this.set("currentCount", this.get("currentCount") - 1);

         }

        updateAnswer(this);

      },

      submitQuestion: function () {

          if (!$("input:radio[name=question]").is(":checked")) {
              bootbox.alert('Please select an option');
              return;
          }

         saveAnswer(this);

         var response = {}

         response['selOptions'] = []

         for(i = 0 ; i < this.get("questions").length; i++) {

           var question = this.get("questions")[i];

           response['selOptions'].push(question['answer']);

         }

         response['memberId'] = memberId;
         response['assessmentId'] = this.get("assessmentId");
         response['totalQuestions'] = this.get("questions").length;

         var controller = this;

         $.ajax({
             type: 'POST',
             url: 'http://dev.service.1to1help.net/rest/json/metallica/assessment/submit/',
             data:JSON.stringify(response),
             contentType: 'text/plain',
             async: true,
             success: function (result) {

                controller.set("results", JSON.stringify(result))

             },
             error: function (err) {
                 var x = errorMessaage(err);
                 bootbox.alert(x);
             }
         });


      }

    }
});
