OneTo1.IssueopenRoute = Ember.Route.extend({

      model: function(params) {
        return params.caseId;
      },
      setupController: function (controller, model) {

        controller.set('loading', true);
        controller.set('responses', []);

        var casedetail = microcache.get("case"+model);

        controller.set('canReply', false);

          $.ajax({
              type: 'POST',
              url: 'http://dev.service.1to1help.net/rest/json/metallica/casedetails/',
              async:true,
              contentType: 'text/plain',
              dataType: "JSON",
              data: JSON.stringify({"caseId" : model, "memberId" : memberId}),

              success: function (result) {

                var arr = [];
				var x;
				for (x = 0; x < result.length; x++) {
								
					var txt = result[x];

					
					if (((txt['canReply'] == 'true' || txt['canReply'] == true) && txt['canReply'] != null) && txt['transactionState'] == 'SENT') {

						 controller.set('canReply', true);
					  }

					if( txt['transactionState'] == "WAITING FOR USER" )	{
						txt['waitingMsgFromCounsellor'] = "Your counsellor will respond as soon as possible - thanks you for your patience." ;
					  }

					else if ( txt['transactionState'] === "WAITING FOR COUNSELLOR" ){
						txt['waitingMsgFromCounsellor'] = "You have chosen to wait for a response from your own counsellor." ;
					  }

					else {
						txt['waitingMsgFromCounsellor'] = "A counsellor will respond to you within two working days." ;
					  }

					arr.push(txt);

				}

				controller.set('responses', arr);
                controller.set('loading', false);
                controller.set('caseId', model);
                controller.set('issueDate', casedetail.issueDate);

              },
              error: function (err) {
                  // alert(memberId + 'memberID');
                  // alert(model + 'caseId');
                  var x = errorMessaage(err);
                  bootbox.alert(x);

                  controller.set('loading', false);
              }
          });

      }


});
