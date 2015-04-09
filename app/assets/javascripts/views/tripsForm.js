PuddleJumper.Views.TripsForm = Backbone.View.extend({
  template: JST['trips/form'],
  className: 'search-form',

  events: {
    "click #surpise-me": "autofill",
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
    console.log("Validate");

    if (true) {
      this.submit(ev);
    }
  },

  autofill: function (ev) {
    ev.preventDefault();
    console.log("Autofill");
  },

  submit: function (ev) {
    ev.preventDefault();
    console.log("Submit");
    var data = this.$('form').serializeJSON();
    PuddleJumper.Collections.results.fetch(data);
    Backbone.history.navigate("trips", { trigger: true })
  },

});
