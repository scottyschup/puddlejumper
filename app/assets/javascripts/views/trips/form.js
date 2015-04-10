PuddleJumper.Views.TripSearchForm = Backbone.View.extend({
  template: JST['trips/form'],
  className: 'search-form',

  events: {
    "click #surprise-me-btn": "autofill",
    "submit form": "validate",
    "click input": "selectText",
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  selectText: function (ev) {
    var $input = $(ev.target);
    if ($input.attr("type") === "text") {
      $input.select();
    }
  },

  validate: function (ev) {
    ev.preventDefault();
    // TODO: write client-side form validations
    if (true) {
      this.submit(ev);
    }
  },

  autofill: function (ev) {
    ev.preventDefault();

    var dDates = ['2015/05/01', '2015/05/02', '2015/05/03', '2015/05/04'];
    var rDates = ['2015/05/05', '2015/05/06', '2015/05/07', '2015/05/08'];

    this.$("#from-box").val('Earth');
    this.$("#to-box").val(PuddleJumper.planets.randomDestinationFrom('Earth'));
    this.$("#num-box").val(Math.floor(Math.random() * 3) + 1);
    this.$("#depart-datepicker").val(_.sample(dDates));
    this.$("#return-datepicker").val(_.sample(rDates));
    setTimeout(function () {
      this.$("form").submit();
    }.bind(this), 1000);
  },

  submit: function (ev) {
    ev.preventDefault();
    var data = this.$('form').serializeJSON();
    PuddleJumper.tripResult.fetch({
      data: data
    });
    Backbone.history.navigate("trips", { trigger: true });
  },

});
