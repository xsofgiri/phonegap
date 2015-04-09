OneTo1.IntakeRoute = Ember.Route.extend({

      model: function(params) {

        return params.caseId;
      },
       setupController: function (controller, model) {

                    var casedetail = microcache.get("case" + model);
                    
                    controller.set("response", casedetail);
                    
                    var reply = casedetail['sessionId'];

                    controller.set('canReply', false);

                    if (((casedetail['canReply'] == 'true' || casedetail['canReply'] == true) && casedetail['canReply'] != null) && casedetail['transactionState'] == 'SENT') {
                        controller.set("canReply", true);
                    }

                    if (casedetail.sessionId != 0) {
                        controller.set("userIntake", false);
                    }
                    else
                    {
                    controller.set("loading", true);
                    controller.set("userIntake", true);
                    
                    $.ajax({
                           type: 'POST',
                           url: 'http://dev.service.1to1help.net/rest/json/metallica/intakedetails/',
                           async: true,
                           contentType: 'text/plain',
                           dataType: "JSON",
                           data: JSON.stringify({ "caseId": model, "memberId": memberId }),
                           success: function (result) {
                          
                           controller.set("loading", false);

                           if (result.length > 0) {
                           result = result[0];
                           }
                           
                           controller.set('additionalInfo', result.additionalInfo);
                           controller.set('situationImpact', result.situationImpact);
                           controller.set('concern', result.concern);
                           controller.set('concernCope', result.concernCope);
                           controller.set('counsellingInteraction', result.counsellingInteraction);
                           controller.set('furtherExplaination', result.furtherExplanation);
                           controller.set('isDaysOff', result.isDaysOff);
                           controller.set('additionalInfo', result.additionalInfo);
                           controller.set('levelOfPerformance', result.performance);
                           controller.set('abilityToFocus', result.focus);
                           controller.set('workplaceRelationship', result.relationship);
                           controller.set('controlOfEmotions', result.emotionControl);
                           controller.set('otherImpact', result.otherImpact);
                           if (result.isDaysOff == "YES") {
                           controller.set('daysOff', result.daysOff);
                           } else {
                           controller.set('daysOff', null);
                           
                           }
                           
                           },
                           error: function (err) {
                            var x = errorMessaage(err);
                            controller.set("loading", false);
                            bootbox.alert(x);
                           }
                           });
                    }
                    
                    }
                    
                    
                    });