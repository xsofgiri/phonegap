OneTo1.IntakeController = Ember.ObjectController.extend({

    response: null,
    userIntake: false,
    toReply: false,
    canReply: false,
    reply: "",
    concernQuestion: 'Describe your problem or self-development concern',
    concern: '',
    situationImpactQuestion: 'How does this situation impact you and or others in your environment',
    situationImpact: '',
    concernCopeQuestion: 'How have you coped with the concern so far? What/who helped?',
    concernCope: '',
    counsellingInteractionQuestion: 'What do you hope to achieve through this counselling interaction?',
    counsellingInteraction: '',
    isDaysOffQuestion: 'In the last one month, have you taken any days off work because of this situation?',
    isDaysOff:'',
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
    otherImpact : '',
    furtherExplainationQuestion: 'Would you like to explain this further?',
    furtherExplaination: '',
    commentsQuestion:'Further comments(if any)',
    additionalInfo: '',
    loading:false,

    actions: {
      tolandingpage: function(){
        this.transitionToRoute("/");
      },
        back: function() {
          window.history.back();
        },
        reply: function (response) {

            var caseid = response['caseId'];

                if (window.localStorage.getItem(caseid)) {
                    this.set("reply", window.localStorage.getItem(caseid));
                }
                else {
                    this.set("reply", '');
                }
                this.set("toReply", true);

            

        },
        cancel: function () {
            this.set("toReply", false);
        },
        post: function (response) {

            var trimmed = this.get('reply').trim();

            if (trimmed == '') {
                bootbox.alert("Please enter the reply");
                return;
            }

            var controller = this;
            var replyResponse = {
                "userQuery": this.get("reply"),
                "memberId": memberId,
                "sessionId": response['sessionId'],
                "caseId": response['caseId'],
                "canReply": false
            }

            

            $.ajax
            ({
                type: "POST",
                url: "http://dev.service.1to1help.net/rest/json/metallica/memcase/addsession",
                contentType: 'text/plain',
                async: true,
                data: JSON.stringify(replyResponse),
                success: function (result) {

                    controller.set("reply", '');

                    if (window.localStorage.getItem(response['caseId']) != null) {

                        window.localStorage.removeItem(response['caseId']);

                    }

                    controller.set("toReply", false);

                    window.history.back();
                  
                },

                error: function (err) {
                    var x = errorMessaage(err);
                    bootbox.alert(x);
                }
            });

        },

        save: function (response) {

            var caseid = response['caseId'];

            var trimmedText = this.get('reply').trim();

            if (trimmedText.length != 0) {

                window.localStorage.setItem(caseid, trimmedText);

                this.set("toReply", false);
            }
            else {
                window.localStorage.setItem(caseid, '');
                bootbox.alert("Please enter the reply text to save");
            }
        },

        showIntake: function () {

            this.transitionToRoute('/intake/' + this.get('caseId'));

        },

    }

});



