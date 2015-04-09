var OneTo1 = Ember.Application.createWithMixins ({

    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    init: function () {
        this.deferReadiness();
        this._super();

    }
});

OneTo1.Router.map(function () {
    this.resource('splash');
    this.resource('landingPage', { path: '/' });
    this.resource('registration');
    this.resource('selfHelp');
    this.resource('articlesList', { path: '/articlesList/:subCatId'});
    this.resource('articles', { path: '/articles/:subCatId/:articleId'});
    this.resource('onlineCounselling');
    this.resource('issue');
    this.resource('assesments');
    this.resource('assesmentdetails', { path: '/assesmentdetails/:assessmentId'});
    this.resource('assesmentquestion', { path: '/assesmentquestion/:assessmentId'});
    this.resource('issueopen', { path: '/issueopen/:caseId'});
    this.resource('intake', { path: '/intake/:caseId'});
    this.resource('appointments');
    this.resource('forgotpassword');
});


OneTo1.IndexRoute = Ember.Route.extend({
    redirect: function () {
        var seenSplash = $.cookie('seen-splash');
		this.transitionTo('/');
		
        /*if (!seenSplash) {
	    $.cookie('seen-splash', "true");
            this.transitionTo('splash');
        } else {
            this.transitionTo('/');
        }*/
    }
});

OneTo1.SplashRoute = Ember.Route.extend({
    enter: function () {
        var widthOrHeight = $(window).height() > $(window).width() ? 'width' : 'height';
        $('#splash-content').find('img').css(widthOrHeight, '70%');
        $('#splash').fadeIn();
	bootbox.alert("inside the splash alert box.");
        Ember.run.later(this, function () {
            $('#splash').fadeOut().detach();
            this.transitionTo('/');
        }, 1500);
    }
});

var MicroCache	= function(){
	var _values	= {};
	return {
		get	: function(key){ return _values[key];	},
		contains: function(key){ return key in _values;	},
		remove	: function(key){ delete _values[key];	},
		set	: function(key, value){	_values[key] = value;},
		values	: function(){ return _values;	},
		getSet	: function(key, value){
			if( !this.contains(key) ){
				this.set(key, typeof value == 'function' ? value() : value )
			}
			return this.get(key);
		}
	}
}

OneTo1.DateField = Ember.TextField.extend({
  type: 'date',
  valueBinding: 'dateValue',
  dateValue: (function(key, value) {
    if (value) {
      return this.set('date', new Date(value));
    } else {
      return (this.get('date') || new Date()).toISOString().substring(0, 10);
    }
  }).property('date')
});

OneTo1.NewDateField = Ember.TextField.extend({
  type: 'text',
  didInsertElement: function () {

     var self = this;

     var onChangeDate = function(ev) {
        self.set('data', ev.date);
     };

     var format = this.get('format');

     this.$().datepicker({ format: format, defaultDate: null })
         .on('changeDate', onChangeDate);

  },

});

OneTo1.NewTimeField = Ember.TextField.extend({
  type: 'text',
  didInsertElement: function () {

     var self = this;

     this.$().timepicker({disableFocus: true, defaultTime: ''}).on('changeTime.timepicker', function(e) {

       self.set('data', e.time.value);
    });

  },

});

OneTo1.SliderView = Ember.View.extend({
    templateName : "slider",
    elementSelector : ".sliderDiv",
    didInsertElement: function() {

      var view = this;

        this.$(this.get("elementSelector")).slider({
         range: "min",
         value: view.get('value'),
         min: 1,
         max: 100,
         change: function( event, ui ) {

           view.set('value', $(this).slider('value'));

         }
        });
    }
});

var userloggedIn = false;

var memberId = window.localStorage.getItem("memberId");
if( memberId == null ) {
  memberId = "0";
  userloggedIn = false;
} else if( memberId == "0" ) {
  memberId = "0";
  userloggedIn = false;
}
else {
  userloggedIn = true;
}

var microcache = new MicroCache();

Storage.prototype.setComplex= function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getComplex = function(key) {
    return JSON.parse(this.getItem(key))
}

function validPhonenumber(inputphoneno)
{
  var phoneno = /^\+?([0-9]{2})?[-. ]?([0]{1})?([0-9]{5})[-. ]?([0-9]{5})$/;
  if(inputphoneno.match(phoneno))
        {
      return true;
        }
        return false;
}

Ember.View.reopen({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },
  afterRenderEvent : function(){
    // implement this hook in your own subclasses and run your jQuery logic there
  }
});

var cityList = ['-City-', 'Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Hyderabad', 'Kolkatta', 'Pune', 'Noida',
                'Gurgaon', 'Coimbatore', 'Kochi', 'Mysore', 'Agra', 'Ahmedabad', 'Amritsar',
                'Aurangabad', 'Awarpur', 'Baroda', 'Bharuch', 'Bhilai', 'Bhopal', 'Bhubaneshwar',
                'Chandigarh', 'Chandrapur', 'Dehradun', 'Dharwad', 'Faridabad',
                'Gandhinagar', 'Ghaziabad', 'Goa', 'Gulbarga', 'Guwahati', 'Hosur',
                'Indore', 'Jaipur', 'Jammu', 'Jamshedpur', 'Lucknow', 'Ludhiana',
                'Madurai', 'Mangalore', 'Nagda', 'Palakkad', 'Panaji', 'Patiala',
                'Patna', 'Pondicherry', 'Raipur', 'Rajkot', 'Ranchi', 'Renukoot', 'Rudrapur',
                'Shimoga', 'Srinagar', 'Surat', 'Tadipatri', 'Thane', 'Thiruvanathapuram', 'Tiruchi',
                'Vishakhapatnam'];

var cityList1 = ['-City*-', 'Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Hyderabad', 'Kolkatta', 'Pune', 'Noida',
                'Gurgaon', 'Coimbatore', 'Kochi', 'Mysore', 'Agra', 'Ahmedabad', 'Amritsar',
                'Aurangabad', 'Awarpur', 'Baroda', 'Bharuch', 'Bhilai', 'Bhopal', 'Bhubaneshwar',
                'Chandigarh', 'Chandrapur', 'Dehradun', 'Dharwad', 'Faridabad',
                'Gandhinagar', 'Ghaziabad', 'Goa', 'Gulbarga', 'Guwahati', 'Hosur',
                'Indore', 'Jaipur', 'Jammu', 'Jamshedpur', 'Lucknow', 'Ludhiana',
                'Madurai', 'Mangalore', 'Nagda', 'Palakkad', 'Panaji', 'Patiala',
                'Patna', 'Pondicherry', 'Raipur', 'Rajkot', 'Ranchi', 'Renukoot', 'Rudrapur',
                'Shimoga', 'Srinagar', 'Surat', 'Tadipatri', 'Thane', 'Thiruvanathapuram', 'Tiruchi',
                'Vishakhapatnam'];

//var locationList = ['-Location*-', 'Bangalore', 'Chennai', 'Coimbatore', 'Gurgaon', 'Hyderabad', 'Mohali', 'Noida', 'Others'];

//var unitList = ['-Business Unit*-', 'ASIS', 'BPS', 'DIPL', 'DIS', 'ICC'];


OneTo1.advanceReadiness();

Ember.RadioButton = Ember.View.extend({
    tagName: "input",
    type: "radio",
    attributeBindings: ["name", "type", "value", "checked:checked:"],
    click: function () {
        this.set("selection", this.$().val());
    },
    checked: function () {
        return this.get("value") == this.get("selection");
    }.property()
});

Ember.CheckBox = Ember.View.extend({
    tagName: "input",
    type: "checkbox",
    attributeBindings: ["name", "type", "value", "checked:checked:"],
    click: function () {
        this.set("selection", this.$().val());
    },
    checked: function () {
        return this.get("value") == this.get("selection");
    }.property()
});