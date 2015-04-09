PuddleJumper.Views.TripsForm = Backbone.View.extend({
  template: JST['trips/form'],
  className: 'search-form',

  events: {
    "submit form": "submit"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function (ev) {
    ev.preventDefault();
    var data = this.$el.serializeJSON();
    var results = new PuddleJumper.Collections.Trips(data);

    Backbone.history.navigate("trips", { trigger: true });
  }
});
