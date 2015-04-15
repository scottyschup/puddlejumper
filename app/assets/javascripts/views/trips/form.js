PuddleJumper.Views.TripSearchForm = Backbone.View.extend({
  template: JST['trips/form'],
  className: 'search-form',
  keyCodes : {
		'backspace' : '8',
		'tab' : '9',
		'enter' : '13',
		'shift' : '16',
		'ctrl' : '17',
		'alt' : '18',
		'pause_break' : '19',
		'caps_lock' : '20',
		'escape' : '27',
		'page_up' : '33',
		'page down' : '34',
		'end' : '35',
		'home' : '36',
		'left_arrow' : '37',
		'up_arrow' : '38',
		'right_arrow' : '39',
		'down_arrow' : '40',
		'insert' : '45',
		'delete' : '46',
		'0' : '48',
		'1' : '49',
		'2' : '50',
		'3' : '51',
		'4' : '52',
		'5' : '53',
		'6' : '54',
		'7' : '55',
		'8' : '56',
		'9' : '57',
		'a' : '65',
		'b' : '66',
		'c' : '67',
		'd' : '68',
		'e' : '69',
		'f' : '70',
		'g' : '71',
		'h' : '72',
		'i' : '73',
		'j' : '74',
		'k' : '75',
		'l' : '76',
		'm' : '77',
		'n' : '78',
		'o' : '79',
		'p' : '80',
		'q' : '81',
		'r' : '82',
		's' : '83',
		't' : '84',
		'u' : '85',
		'v' : '86',
		'w' : '87',
		'x' : '88',
		'y' : '89',
		'z' : '90',
		'left_window key' : '91',
		'right_window key' : '92',
		'select_key' : '93',
		'numpad 0' : '96',
		'numpad 1' : '97',
		'numpad 2' : '98',
		'numpad 3' : '99',
		'numpad 4' : '100',
		'numpad 5' : '101',
		'numpad 6' : '102',
		'numpad 7' : '103',
		'numpad 8' : '104',
		'numpad 9' : '105',
		'multiply' : '106',
		'add' : '107',
		'subtract' : '109',
		'decimal point' : '110',
		'divide' : '111',
		'f1' : '112',
		'f2' : '113',
		'f3' : '114',
		'f4' : '115',
		'f5' : '116',
		'f6' : '117',
		'f7' : '118',
		'f8' : '119',
		'f9' : '120',
		'f10' : '121',
		'f11' : '122',
		'f12' : '123',
		'num_lock' : '144',
		'scroll_lock' : '145',
		'semi_colon' : '186',
		'equal_sign' : '187',
		'comma' : '188',
		'dash' : '189',
		'period' : '190',
		'forward_slash' : '191',
		'grave_accent' : '192',
		'open_bracket' : '219',
		'backslash' : '220',
		'closebracket' : '221',
		'single_quote' : '222'
	},

  events: {
    "click #surprise-me-btn": "autofill",
    "submit form": "validate",
    "click input": "selectText",
    "click .trip-type-tabs li": "changeTypeTab",
    "click .date-tabs li": "changeDateTab",
    "focus .autocomplete": "activateAutocomplete",
    // "blur .autocomplete": "deactivateAutocomplete"
  },

  initialize: function (options) {
    this.prevSearch = options.prevSearch;
  },

  render: function () {
    $('body').removeClass("loading");

    var content = this.template();
    this.$el.html(content);

    if (this.prevSearch && this.prevSearch.isFetched()) {
      setTimeout(function () {
        this.refillForm();
        $("#from-box").select();
      }.bind(this), 1);
    }
    return this;
  },

  activateAutocomplete: function (ev) {
    $(ev.currentTarget).autocomplete({
      minLength: 1,
      source: PuddleJumper.planets.pluck("name")
    });
  },

  autofill: function (ev) {
    ev.preventDefault();

    var today = new moment(), nextWeek = new moment().add(1, 'week');
    var dDates = [], rDates = [];

    for (var i = 1; i < 8; i ++) {
      dDates.push(new moment(today).add(i, 'days'));
      rDates.push(new moment(nextWeek).add(i, 'days'));
    }

    // $("#from-box").val('Earth');
    var that = this;
    // var randOrigin = PuddleJumper.planets.randomOriginName();
    var randDest = PuddleJumper.planets.randomDestinationFrom("Earth");

    this.slowType($("#from-box"), "Earth", function () {
      that.slowType($("#to-box"), randDest, function() {
        setTimeout(function () {
          $("#num-box").val(Math.floor(Math.random() * 10) + 1);
          setTimeout(function () {
            $("#depart-date").val(moment(_.sample(dDates)).format("ddd M/D"));
            setTimeout(function () {
              $("#arrive-date").val(moment(_.sample(rDates)).format("ddd M/D"));
              setTimeout(function () {
                that.$("form").submit();
              }, 500);
            }, 700);
          }, 700);
        }, 500);
      });
    });

  },

  changeDateTab: function (ev) {
    var $li = $(ev.currentTarget);
    $(".date-tabs li").removeClass("selected");
    $li.addClass("selected");

    if ($li.text() === "Flexible Dates") {
      $(".flex-dates-select").css("display", "block");
      $(".flex-dates").val("true");
    } else {
      $(".flex-dates-select").css("display", "none");
      $(".flex-dates").val("false");
    }
  },

  changeTypeTab: function (ev) {
    var $li = $(ev.currentTarget);
    $(".trip-type-tabs li").removeClass("selected");
    $li.addClass("selected");

    if ($li.text() === "Round-trip") {
      $(".arrive").css("display", "block");
      $(".roundtrip-value").val("true");
    } else {
      $(".arrive").css("display", "none");
      $(".roundtrip-value").val("false");
    }
  },

  deactivateAutocomplete: function (ev) {
    $(ev.currentTarget).autocomplete('destroy');
  },

  refillForm: function () {
    var data = this.prevSearch.data();
    $("#from-box").val(data.originName);
    $("#to-box").val(data.destinationName);
    $("#depart-date").val(data.departureDate.format("ddd M/D"));

    if (data.roundtrip) {
      $(".trip-type-tabs li:first-child").trigger("click");
      $("#arrive-date").val(data.arrivalDate.format("ddd M/D"));
    } else {
      $(".trip-type-tabs li:last-child").trigger("click");
    }

    if (data.hasFlexDates) {
      $(".date-tabs li:last-child").trigger("click");
    } else {
      $(".date-tabs li:first-child").trigger("click");
    }
  },

  selectText: function (ev) {
    var $input = $(ev.target);
    if ($input.attr("type") === "text") {
      $input.select();
    }
  },

  slowType: function ($el, word, callback) {
    var currVal, currChar;
    var ev = $.Event("keydown");

    var slowTyping = setInterval(function () {
      currChar = word.slice(0, 1).toLowerCase();
      ev.which = parseInt(this.keyCodes[currChar]);

      $el.val($el.val() + currChar);
      $el.trigger(ev);

      word = word.substr(1);

      if (!word) {
        clearInterval(slowTyping);
        callback.call();
      }
    }.bind(this), 250);
  },

  submit: function (ev) {
    ev.preventDefault();
    var data = this.$('form').serializeJSON();
    PuddleJumper.tripSearch.fetch({
      data: data
    });
    Backbone.history.navigate("trips", { trigger: true });
  },

  validate: function (ev) {
    ev.preventDefault();
    var data = this.$("form").serializeJSON;

    // TODO: write client-side form validations
    if (true) {
      this.submit(ev);
    }
  },

});
