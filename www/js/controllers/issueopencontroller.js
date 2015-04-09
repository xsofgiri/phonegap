function toggleMaxHeight(object) {

  if( $(object).css("max-height")  == "100px" ) {
    $(object).css("max-height", "") ;
  }
  else {
    $(object).css("max-height", "100px") ;
    }

}﻿

OneTo1.IssueopenController = Ember.ObjectController.extend({
    Yes: true,
    No: false,
    responses:[],
    caseId:"",
    issueDate: "",
    loading: false,
    toReply: false,
    canReply: false,
    reply: "",
    disablePost: function() {

      if( this.get('reply') != '') {
        return false;
      }

      return true;

    }.property('reply'),
    actions: {
      tolandingpage: function(){
        this.transitionToROute("/");

      },
        enableYes: function () {
            this.set('Yes', true);
            this.set('No', false);
        },
        disableYes: function () {
            this.set('Yes', false);
            this.set('No', true);
        },
        tolandingpage: function () {
            this.transitionToRoute('/');
        },
        back: function() {
          window.history.back();
        },
        reply: function () {
            this.set("toReply", true);
        },
        cancel: function () {
            this.set("toReply", false);
        },

        post: function (response) {
            
          var controller = this;

          var replyResponse =  {
            "userQuery": this.get("reply"),
           "memberId": memberId, "sessionId": response['sessionId'], "caseId": response['caseId'],
           "canReply": false }

                         $.ajax
                         ({
                       type: "POST",
                       url: "http://dev.service.1to1help.net/rest/json/metallica/memcase/addsession",
                       contentType: 'text/plain',
                       async: true,
                       data: JSON.stringify(replyResponse),
                       success: function (result){

                         controller.set("toReply", false);

                         $.ajax({
                           type: 'GET',
                           url: 'http://dev.service.1to1help.net/rest/json/metallica/casedetails/' + response['caseId'],
                             async: true,

                             success: function (result) {

                               controller.set('responses', result.reverse());

                               for( response in result) {

                                 if( response['canReply'] != null ) {
                                    controller.set('canReply', true);
                                 }

                               }

                               controller.set('loading', false);
                               controller.set('caseId', model);
                               controller.set('issueDate', casedetail.issueDate);

                           },
                             error: function (err) {
                                var x = errorMessaage(err);
                                bootbox.alert(x);
                               controller.set('loading', false);

                             }
                         });

                       },

                       error: function (err) {
                           var x = errorMessaage(err);
                           bootbox.alert(x);
                       }

                   });

        },

        showIntake: function () {
            this.transitionToRoute('/intake/' + this.get('caseId'));
        },

        gotoDetails: function (casedetails) {

            microcache.set("case" + casedetails.caseId, casedetails);
            this.transitionToRoute('/intake/' + casedetails.caseId);

        }
    }

});
