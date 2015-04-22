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
    this.listenTo(PuddleJumper.planets, 'sync', this.render);
    this.prevSearch = _.last(PuddleJumper.searchHistory.trips)
    if (!this.prevSearch) {
      this.prevSearch = JSON.parse(localStorage.PuddleJumper).lastSearch;
    }
  },

  render: function () {
    $('body').removeClass("loading");

    var content = this.template();
    this.$el.html(content);

    setTimeout(function () {
      this.activateTypeahead();
      if (this.prevSearch) {
        this.refillForm();
      }
    }.bind(this), 1);

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
          $("#num-box").val(Math.floor(Math.random() * 5) + 1);
          $("#depart-date").select();
          setTimeout(function () {
            $("#depart-date").val(moment(_.sample(dDates)).format("ddd M/D"));
            $("#arrive-date").select();
            setTimeout(function () {
              $("#arrive-date").val(moment(_.sample(rDates)).format("ddd M/D"));
              $("#ui-datepicker-div").hide();
              setTimeout(function () {
                $(".date-tabs li:last-child").trigger('click');
                setTimeout(function () {
                  $('option select').removeAttr('selected');
                  var rando = Math.floor(Math.random() * 6) + 1;
                  $(".depart select option:nth-child(" + rando + ")")
                    .attr('selected', 'selected');
                  setTimeout(function () {
                    $('option select').removeAttr('selected');
                    var rando = Math.floor(Math.random() * 6) + 1;
                    $(".arrive select option:nth-child(" + rando + ")")
                      .attr('selected', 'selected');
                    setTimeout(function () {
                      $("#trip-search-submit").trigger('click');
                    }, 800);
                  }, 600);
                }, 600);
              }, 500);
            }, 800);
          }, 800);
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
    var prev = this.prevSearch
    $("#from-box").val(prev.origin);
    $("#to-box").val(prev.destination);
    $("#num-box").val(prev.num_travelers);
    $("#depart-date").val(prev.depart);

    if (prev.roundtrip === "true") {
      $(".trip-type-tabs li:first-child").trigger("click");
      $("#arrive-date").val(prev.arrive);
    } else {
      $(".trip-type-tabs li:last-child").trigger("click");
    }

    if (prev.flex_dates === "true") {
      $(".date-tabs li:last-child").trigger("click");
      $(".depart option:nth-child(" + (parseInt(prev.depart_range) + 1) + ")")
        .attr('selected', 'selected');
      $(".arrive option:nth-child(" + (parseInt(prev.arrive_range) + 1) + ")")
        .attr('selected', 'selected');
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
    word = word.slice(0, 3);

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
          }, 800);
        }, 800);
      }
    }.bind(this), 200);
  },

  submit: function (ev) {
    ev.preventDefault();
    var data = this.$('form').serializeJSON();
    PuddleJumper.searchHistory.trips.push(data.trip);

    var ls = JSON.parse(localStorage.PuddleJumper);
    ls.lastSearch = data.trip;
    localStorage.PuddleJumper = JSON.stringify(ls);

    PuddleJumper.tripSearch.fetched = false;
    PuddleJumper.tripSearch.fetch({
      data: data,
      success: function () {
        PuddleJumper.tripSearch.fetched = true;
      }
    });
    // this.deactivateTypeahead();
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
