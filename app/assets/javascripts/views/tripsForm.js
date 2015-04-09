PuddleJumper.Views.TripsForm = Backbone.View.extend({
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
    this.$("#from-box").val('Earth');
    this.$("#to-box").val('Chulak');
    this.$("#num-box").val('2');
    this.$("#depart-datepicker").val('2015/05/04');
    this.$("#return-datepicker").val('2015/05/06');
    setTimeout(function () {
      this.$("form").submit();
    }.bind(this), 600);
  },

  submit: function (ev) {
    ev.preventDefault();
    var data = this.$('form').serializeJSON();
    PuddleJumper.Collections.results.fetch({
      data: data
    });
    Backbone.history.navigate("trips", { trigger: true });
  },

});
