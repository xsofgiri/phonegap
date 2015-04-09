OneTo1.ForgotpasswordController = Ember.ObjectController.extend({

forgt_officialemail: '',
forgt_username: '',
loading: false,


actions: {

  tolandingpage: function (){
    this.transitionToRoute('/');
  },

  submitChange: function () {

      var email = this.get('forgt_officialemail');
      filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if (this.get("forgt_officialemail").length > 0 && !filter.test(email)) {
          bootbox.alert("Please enter a valid e-mail address");
          return false;
      }

      else if (this.get('forgt_username') == '' && this.get('forgt_officialemail') == '') {
          bootbox.alert("Please enter the official e-mail id or username");
          return;
      }

      else if (this.get('forgt_officialemail') == '' && this.get('forgt_username').length == 0) {
          bootbox.alert("Please enter the username");
          return;
      }

      else if (this.get('forgt_username') == '' && this.get('forgt_officialemail').length == 0) {
          bootbox.alert("Please enter the username");
          return;
      }

      else {

          this.set("loading", true);
          var controller = this;

          $.ajax
          ({
              type: "POST",
              url: "http://service.1to1help.net/rest/json/metallica/member/forgotpass",
              contentType: 'text/plain',
              dataType: "JSON",
              async: true,

              data: JSON.stringify({ "officialEmail": this.get("forgt_officialemail"), "userName": this.get("forgt_username") }),

              success: function (result) {

                  var x = JSON.parse(result);
                  controller.set("loading", false);
                  bootbox.alert(x.responseMsg);

                  if (x.status == 1) {
                      controller.transitionToRoute('/');
                  }

              },

              error: function (err) {
                  controller.set("loading", false);
                  var x = errorMessaage(err);
                  bootbox.alert(x);

              }

          });

      }
  }

}


});


OneTo1.ForgotpasswordView = Ember.View.extend({
    templateName: 'forgotpassword',

    didInsertElement: function () {
		$(".forgt_inputs").val('');

   }

});
