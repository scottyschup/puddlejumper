PuddleJumper.Views.TripSearchForm = Backbone.View.extend({
  template: JST['trips/form'],
  className: 'search-form',

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

    $("#from-box").val('Earth');
    $("#to-box").val(PuddleJumper.planets.randomDestinationFrom('Earth'));
    $("#num-box").val(Math.floor(Math.random() * 3) + 1);
    $("#depart-date").val(moment(_.sample(dDates)).format("ddd M/D"));
    $("#arrive-date").val(moment(_.sample(rDates)).format("ddd M/D"));
    setTimeout(function () {
      this.$("form").submit();
    }.bind(this), 1000);
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
