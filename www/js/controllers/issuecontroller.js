OneTo1.IssueController = Ember.ObjectController.extend({

    noCounselorYet: false,
    reply: false,
    offYes: true,
    offNo: false,

    actions: {
        reply: function () {
            this.set("reply", true);
        },
        closePopUp: function () {
            this.set("reply", false);
        },
        tolandingpage: function () {
            this.transitionToRoute('landingPage');
        },
        hadOff: function () {
            this.set("offYes", true);
            this.set("offNo", false);
        },
        hadNoOff: function () {
            this.set("offYes", false);
            this.set("offNo", true);
        },
        tolandingpage: function(){
            userloggedIn = false;
            memberId = "0";
            this.transitionToRoute('/');
            alert('You have been logged out.');
        }
    }

    });
