OneTo1.CounsellingController = Ember.ObjectController.extend({
    Yes: true,
    No: false,
    actions: {
        tolandingpage: function () {
            userloggedIn = false;
            memberId = "0";
            this.transitionToRoute('/');
            alert('You have been logged out.');
        },
        setNotDone: function () {
            this.set("No", false);
            this.set("Yes", true);
        },
        setDone: function () {
            this.set("No", true);
            this.set("Yes", false);
        }
        }
    });
