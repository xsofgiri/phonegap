OneTo1.OnlineCounsellingController = Ember.ObjectController.extend({

    resetIntake: function () {

      this.set("concern", "");
      this.set("situationImpact", "");
      this.set("concernCope", "");
      this.set("counsellingInteraction", "");
      this.set("Yes", false);
      this.set("No", false);
      this.set("clicksYes", false);
      this.set("daysOff", '');
      this.set("abilityToFocus", 0);
      this.set("levelOfPerformance", 0);
      this.set("workplaceRelationship", 0);
      this.set("controlOfEmotions", 0);
      this.set("additionalInfo", '');
      this.set("furtherExplaination", '');
      this.set("comments", '');
    },

    clearLocalIntake: function () {

        window.localStorage.removeItem("intake");
        window.localStorage.removeItem("concern");
        window.localStorage.removeItem("situationImpact");
        window.localStorage.removeItem("concernCope");
        window.localStorage.removeItem("counsellingInteraction");
        window.localStorage.removeItem("Yes");
        window.localStorage.removeItem("No");
        window.localStorage.removeItem("daysOff");
        window.localStorage.removeItem("abilityToFocus");
        window.localStorage.removeItem("levelOfPerformance");
        window.localStorage.removeItem("workplaceRelationship");
        window.localStorage.removeItem("controlOfEmotions");
        window.localStorage.removeItem("additionalInfo");
        window.localStorage.removeItem("furtherExplaination");
        window.localStorage.removeItem("comments");
    },

    disableSubmit: function () {

       if (this.get("concern") != ''
         && this.get("situationImpact") != ''
         && this.get("concernCope") != ''
         && this.get("counsellingInteraction") != ''
         && this.get("additionalInfo") != ''
         && this.get("furtherExplaination") != ''
         )
       {
           return false;
       }

       return true;

   }.property('concern', 'situationImpact', 'concernCope', 'counsellingInteraction', 'additionalInfo', 'furtherExplaination'),

   disableSave: function () {

      if (this.get("concern") != ''
        || this.get("situationImpact") != ''
        || this.get("concernCope") != ''
        || this.get("counsellingInteraction") != ''
        || this.get("additionalInfo") != ''
        || this.get("furtherExplaination") != ''
        )
       {
          return false;
      }
     
      return true;

   }.property('concern', 'situationImpact', 'concernCope', 'counsellingInteraction', 'additionalInfo',
                'furtherExplaination'),

   updateIntakeFromCache: function () {

      this.set("concern", window.localStorage.getItem("concern"));
      this.set("situationImpact", window.localStorage.getItem("situationImpact"));
      this.set("concernCope", window.localStorage.getItem("concernCope"));
      this.set("counsellingInteraction", window.localStorage.getItem("counsellingInteraction"));
      var yesButton = window.localStorage.getItem("Yes");
      var noButton = window.localStorage.getItem("No");
      if (yesButton == 'false' && noButton == 'true') {
          this.set("Yes",false);
          this.set("No",true);
          this.set("clicksYes", false);
      }
      else if (yesButton == 'true' && noButton == 'false') {
          this.set("Yes", true);
          this.set("No", false);
          this.set("clicksYes", true);
      }
      else {
          this.set("Yes", false);
          this.set("No", false);
          this.set("clicksYes", false);
      }

      this.set("daysOff", window.localStorage.getItem("daysOff"));
      this.set("abilityToFocus", window.localStorage.getItem("abilityToFocus"));
      this.set("levelOfPerformance", window.localStorage.getItem("levelOfPerformance"));
      this.set("workplaceRelationship", window.localStorage.getItem("workplaceRelationship"));
      this.set("controlOfEmotions", window.localStorage.getItem("controlOfEmotions"));
      this.set("additionalInfo", window.localStorage.getItem("additionalInfo"));
      this.set("furtherExplaination", window.localStorage.getItem("furtherExplaination"));
      this.set("comments", window.localStorage.getItem("comments"));

    },

   updateCache: function () {

      window.localStorage.setItem("intake", true);
      window.localStorage.setItem("concern", this.get("concern"));
      window.localStorage.setItem("situationImpact", this.get("situationImpact"));
      window.localStorage.setItem("concernCope", this.get("concernCope"));
      window.localStorage.setItem("counsellingInteraction", this.get("counsellingInteraction"));
      window.localStorage.setItem("Yes", this.get("Yes"));
      window.localStorage.setItem("No", this.get("No"));
      window.localStorage.setItem("daysOff", this.get("daysOff"));
      window.localStorage.setItem("abilityToFocus", this.get("abilityToFocus"));
      window.localStorage.setItem("levelOfPerformance", this.get("levelOfPerformance"));
      window.localStorage.setItem("workplaceRelationship", this.get("workplaceRelationship"));
      window.localStorage.setItem("controlOfEmotions", this.get("controlOfEmotions"));
      window.localStorage.setItem("additionalInfo", this.get("additionalInfo"));
      window.localStorage.setItem("furtherExplaination", this.get("furtherExplaination"));
      window.localStorage.setItem("comments", this.get("comments"));

    },

    initFromCache: function() {
       
      var intake = window.localStorage.getItem("intake");

      if( intake == null || intake == false) {

        this.resetIntake();

      } else {

          this.updateIntakeFromCache();

      }

    },

    actions: {

        back: function () {
			this.transitionToRoute('/');
        },
        toCounselling: function () {
            this.transitionToRoute('counselling');
        },
        toIssue: function () {
            this.transitionToRoute('issueopen');
        },
        tolandingpage: function () {
          this.transitionToRoute('/');
        },
        openCase: function(casedetail) {

          microcache.set("case"+casedetail.caseId, casedetail);

          this.transitionToRoute('/issueopen/' + casedetail.caseId);

        },
        saveIntake: function () {

          this.updateCache();
          bootbox.alert('Intake Form Saved.');
        },
        submitIntake: function() {
            
            if (this.get("Yes") == false && this.get("No") == false) {
                bootbox.alert("Please select an answer if you have taken any days off");
                return;
            }
            if (this.get("Yes") == true) {
               if (this.get("daysOff") == '') {
                   bootbox.alert("Please answer how many days you have taken off");
                   return;
               }
           }
            

          var controller = this;

          controller.set("loading", true);

         var isDaysOff = "Yes";
         if( this.get('Yes') == false ){
           isDaysOff = "No";
         }

         var intakeForm = {
                               "additionalInfo": this.get('comments'),
                               "situationImpact": this.get('situationImpact'),
                               "concern": this.get('concern'),
                               "concernCope": this.get('concernCope'),
                               "counsellingInteraction": this.get('counsellingInteraction'),
                               "furtherExplanation": this.get('furtherExplaination'),
                               "isDaysOff": isDaysOff,
                               "otherImpact": this.get('additionalInfo'),
                               "performance": parseInt(this.get('levelOfPerformance')),
                               "memberId": parseInt(memberId),
                               "focus": parseInt(this.get('abilityToFocus')),
                               "relationship": parseInt(this.get('workplaceRelationship')),
                               "emotionControl": parseInt(this.get('controlOfEmotions')),
                               "daysOff": parseInt(this.get('daysOff')),
                               "caseId": 0,
                               "canReply": false
                          }



              $.ajax
              ({
            type: "POST",
            url: "http://dev.service.1to1help.net/rest/json/metallica/memcase/addcase",
            contentType: 'text/plain',
            async: true,
            data: JSON.stringify(intakeForm),
            success: function (result){

              controller.set("loading", false);

              controller.resetIntake();

                //controller.updateIntakeFromCache();

              controller.clearLocalIntake();

              bootbox.alert('Thank you. A counsellor will get back to you with in two days.');

              controller.transitionTo("/");

            },

            error: function (err) {

                controller.set("loading", false);

                var x = errorMessaage(err);
                bootbox.alert(x);
            }

        });

      },
      setNotDone: function(){
        this.set("No", true);
        this.set("Yes", false);
        this.set("clicksYes", false);
      },

      setDone: function(){
        this.set("Yes", true);
        this.set("No", false);
        this.set("clicksYes", true);
      }
    },

    loading: true,
    cases:[],
    issueNotOpened: true,
    notYetTakenCounselling: true,
    intake: true,
    concernQuestion: 'Describe your problem or self-development concern',
    concern: '',
    situationImpactQuestion: 'How does this situation impact you and or others in your environment',
    situationImpact: '',
    concernCopeQuestion: 'How have you coped with the concern so far? What/who helped?',
    concernCope: '',
    counsellingInteractionQuestion: 'What do you hope to achieve through this counselling interaction?',
    counsellingInteraction: '',
    isDaysOffQuestion: 'In the last one month, have you taken any days off work because of this situation?',
    daysOffQuestion : '(If yes) How many days?',
    daysOff: "1",
    abilityToFocusQuestion: 'Ability to focus',
    abilityToFocus :0,
    levelOfPerformanceQuestion: 'Level of Performance',
    levelOfPerformance:0,
    workplaceRelationshipQuestion: 'Workplace relationships',
    workplaceRelationship:0,
    controlOfEmotionsQuestion: 'Control of emotions at work',
    controlOfEmotions:0,
    additionalInfoQuestion: "Has there been any other impact?",
    additionalInfo: '',
    furtherExplainationQuestion: 'Would you like to explain this further?',
    furtherExplaination: '',
    commentsQuestion:'Further comments(if any)',
    comments:'',
    No: false,
    Yes: false,
    clicksYes: false,
    yesNoAnswer: ''
});


OneTo1.OnlineCounsellingView = Ember.View.extend({
    templateName: 'onlineCounselling',

    didInsertElement: function () {
        $('.nstSlider').nstSlider({
            "left_grip_selector": ".leftGrip",
            "right_grip_selector": ".rightGrip",
            "value_bar_selector": ".bar",
            "highlight": {
                "grip_class": "gripHighlighted",
                "panel_selector": ".highlightPanel"
            },
            "value_changed_callback": function(cause, leftValue, rightValue) {
                $('.leftLabel').text(leftValue);
                $('.rightLabel').text(rightValue);
            }

      });

   }

});




﻿
