PuddleJumper.Views.TripSearchForm = Backbone.View.extend({
  template: JST['trips/form'],
  className: 'search-form',

  events: {
    "click #surprise-me-btn": "autofill",
    "submit form": "validate",
    "click input": "selectText",
    "click .trip-type-tabs li": "changeTypeTab",
    "click .date-tabs li": "changeDateTab",
  },

  initialize: function (options) {
    // this.listenTo(PuddleJumper.planets, 'sync', this.activateTypeahead);
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

    setTimeout(function () {
      this.activateTypeahead()
    }.bind(this), 100);
    return this;
  },

  activateTypeahead: function () {
    var planets = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: PuddleJumper.planets.dataset()
    });

    planets.initialize();

    $('.typeahead').typeahead({
      hint: true,
      minLength: 1,
      highlight: true,
    },
    {
      name: 'dataset',
      displayKey: 'value',
      source: planets.ttAdapter()
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
        $("#num-box").select();
        setTimeout(function () {
          $("#num-box").val(Math.floor(Math.random() * 10) + 1);
          $("#depart-date").select();
          setTimeout(function () {
            $("#depart-date").val(moment(_.sample(dDates)).format("ddd M/D"));
            $("#arrive-date").select();
            setTimeout(function () {
              $("#arrive-date").val(moment(_.sample(rDates)).format("ddd M/D"));
              $("#ui-datepicker-div").hide();
              $(".date-tabs li:last-child").trigger('click');
              setTimeout(function () {
                $('option select').removeAttr('selected');
                $(".flex-dates-select option:last-child").attr('selected', 'selected');
                setTimeout(function () {
                  $("#trip-search-submit").trigger('click');
                }, 500);
              }, 700);
            }, 1000);
          }, 1000);
        }, 700);
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

  deactivateTypeahead: function (ev) {
    $('.typeahead').typeahead('destroy');
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
    var currVal = "", currChar;
    $el.select()
    word = word.slice(0, 4);

    var slowTyping = setInterval(function () {
      currChar = word.slice(0, 1).toLowerCase();
      currVal += currChar;

      $el.val(currVal).trigger("input");

      word = word.substr(1);

      if (!word) {
        clearInterval(slowTyping);
        var $firstSuggestion = $el.parent().find(".tt-suggestions div:first");
        $firstSuggestion.trigger('cursor');
        setTimeout(function () {
          $firstSuggestion.trigger('click');
          setTimeout(function () {
            callback.call();
          }, 500);
        }, 500);
      }
    }.bind(this), 250);
  },

  submit: function (ev) {
    ev.preventDefault();
    var data = this.$('form').serializeJSON();
    PuddleJumper.tripSearch.fetch({
      data: data
    });
    this.deactivateTypeahead();
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

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    $("#ui-datepicker-div").remove();
  }

});
