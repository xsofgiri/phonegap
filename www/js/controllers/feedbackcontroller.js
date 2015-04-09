OneTo1.FeedbackController = Ember.ObjectController.extend({

    eapQuestion: 'How did you come to know about this EAP service?',
    webResourceQuestion: 'Have you used the website resources (articles, assessment tests, HRA)?',
    usefulWebQuestion: 'Did you find them useful?',
    eapTalksQuestion: 'Have you attended any talks conducted by the EAP?',
    usefuleapQuestion: 'Did you find them useful?',
    recomendServiceQuestion: 'Would you recommend this service to others?',
    satisfactionQuestion: 'Were you satisfied with the counselling service?',
    promptnessQuestion: "Were you satisfied with the promptness of the counsellor's response / fixing of the appointment?'",
    effectiveQuestion: 'How effective was your counsellor in addressing your concerns?',
    likeDislikeQuestion: 'What did you particularly like / dislike about your experience with the counselling service?',
    eworkshopQuestion: 'You have taken an eWorkshop (Choosing a partner / Stress Audit). Did you find it useful?',
    additionalCommentsQuestion: "Additional Comments (if any)",

    likeDislikeAnswer: '',
    additionalAnswer: '',
    resourceSelected: "No",
    eapSelected: "No",
    useFull_webResource: '',
    useFull_eapSelected: '',
    recommendSelected: 'No',

    satisfiedSelected: 'No',

    promptnessSelected: 'No',

    concernSelected: 'No',

    likeDislikeAnswer: '',
    eWorkshopSelected: 'No',
    loading_feedback: false,
    //brochure: 'Brochure / Wallet Card',
    //posters: 'Posters',
    //intranet: 'Intranet',
    //e_mailers: 'e-mailers',
    //talks: 'Talks',
    //trainings: 'Trainings / Seminars',
    //induction: 'Induction session',
    //colleagues: 'Colleagues, HR / Manager',
    //didnt: "I hadn't heard about it until now",

    showSubOptions_webResource: function () {

        if (this.get('resourceSelected') == "No") {
            return false;            
        }
         else {
            return true;
        }
   
    }.property('resourceSelected'),
  
    showSubOptions_eapTalk: function () {

        if (this.get('eapSelected') == "No") {
            return false;            
        }
        else {
            return true;
        }
   
    }.property('eapSelected'),

    actions: {
        
        back: function () {
            window.history.back();
        },

        quit: function () {
            this.transitionToRoute('/');
        },

        submitFeedback: function () {

            this.set("loading_feedback", true);

            if (!$("input:checkbox[name=posters]").is(":checked")) {
                bootbox.alert("Please select the answer how you came know about the EAP service?");
                this.set("loading_feedback", false);
                return;
            }

            if (!$("input:radio[name=resource]").is(":checked")) {
                bootbox.alert('Please select an option for Website Resources');
                this.set("loading_feedback", false);
                return;
            }

            if (this.get("resourceSelected") == "Yes") {
                if (!$("input:radio[name=resource_useful]").is(":checked")) {
                    bootbox.alert('Please select an option for usefulness of Website Resources');
                    this.set("loading_feedback", false);
                    return;
                }
            }

            if (!$("input:radio[name=EAP]").is(":checked")) {
                bootbox.alert('Please select an option for EAP');
                this.set("loading_feedback", false);
                return;
            }

            if (this.get("eapSelected") == "Yes") {
                if (!$("input:radio[name=EAP_useful]").is(":checked")) {
                    bootbox.alert('Please select an option for userfullness of eap services');
                    this.set("loading_feedback", false);
                    return;
                }
            }

            if (!$("input:radio[name=recommend]").is(":checked")) {
                bootbox.alert('Please select an option to recomend the eap services');
                this.set("loading_feedback", false);
                return;
            }

            if (!$("input:radio[name=satisfied]").is(":checked")) {
                bootbox.alert('Please select an option for satisfaction regarding counselling service');
                this.set("loading_feedback", false);
                return;
            }

            if (!$("input:radio[name=promptness]").is(":checked")) {
                bootbox.alert('Please select an option for promptness of counsellor');
                this.set("loading_feedback", false);
                return;
            }

            if (!$("input:radio[name=effectiveness]").is(":checked")) {
                bootbox.alert('Please select an option for effectiveness of counsellor');
                this.set("loading_feedback", false);
                return;
            }

            if (this.get('likeDislikeAnswer') == '') {
                bootbox.alert('Please fill the answer for your experience with the counselling service');
                this.set("loading_feedback", false);
                return;
            }

            if (!$("input:radio[name=eWorkshop]").is(":checked")) {
                bootbox.alert('Please select an option for usefullness of eWorkshop');
                this.set("loading_feedback", false);
                return;
            }
            
            var checkedValues = $('input[name="posters"]:checked').map(function () {
                return this.value;
            }).get();

            var checkInputs = checkedValues.toString();
			 if (this.get("resourceSelected") == "Yes") {
               var x = this.get("useFull_webResource");
           }
           else {
               var x = '';
           }

           if (this.get("eapSelected") == "Yes") {
               var y = this.get("useFull_eapSelected");
           }
           else {
               var y = '';
           }

          var feedbackInput =  {
                "memberId": memberId,
                "question1": checkInputs,
                "question2": this.get("resourceSelected"),
                "question2_1": x,
                "question3": this.get("eapSelected"),
                "question3_1": y,
                "question4": this.get("recommendSelected"),
                "question5": this.get("satisfiedSelected"),
                "question6": this.get("promptnessSelected"),
                "question7": this.get("concernSelected"),
                "question8": this.get("likeDislikeAnswer"),
                "question9": this.get("eWorkshopSelected"),
                "question10": this.get("additionalAnswer")
          }
			
          var controller = this;

            $.ajax({
                type: 'POST',
                url: 'http://service.1to1help.net/rest/json/metallica/memfeedback/addfeedback',
                async: true,
                contentType: 'text/plain',
                dataType: "JSON",
                data: JSON.stringify(feedbackInput),
                success: function (result) {        
                    bootbox.alert("Thank you for your feedback");
                    controller.transitionToRoute("/");
                    controller.set("loading_feedback", false);
                },

                error: function (err) {
                    var x = errorMessaage(err);
                    bootbox.alert(x);
                    controller.set("loading_feedback", false);
                }
            });

        }
    }

});

OneTo1.FeedbackView = Ember.View.extend({
    templateName: 'feedback',

    didInsertElement: function () {

        $('input[name=resource]').prop("checked", false);
        $('input[name=resource_useful]').prop("checked", false);
        $('input[name=EAP]').prop("checked", false);
        $('input[name=EAP_useful]').prop("checked", false);
        $('input[name=recommend]').prop("checked", false);
        $('input[name=satisfied]').prop("checked", false);
        $('input[name=promptness]').prop("checked", false);
        $('input[name=effectiveness]').prop("checked", false);
        $('input[name=concern]').prop("checked", false);
        $('input[name=likes]').prop("checked", false);
        $('input[name=eWorkshop]').prop("checked", false);

    }

});