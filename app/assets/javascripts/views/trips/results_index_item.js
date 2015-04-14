PuddleJumper.Views.TripResultsIndexItem = Backbone.CompositeView.extend({
  template: JST['trips/index_item'],
  tagName: 'li',
  className: 'trip',

  events: {
    "click .select-btn > .btn": "openResView",
  },

  initialize: function (trip) {
    this.trip = trip;
  },

  render: function () {
    var content = this.template({
      trip: this.trip
    });
    this.$el.html(content);
    return this;
  },

  openResView: function (ev) {
    var thesePlanets = {
      origin: PuddleJumper.planets.get(this.trip[0].origin_id),
      destination: PuddleJumper.planets.get(this.trip[0].destination_id)
    };

    var resView = new PuddleJumper.Views.TripResView({
      planets: thesePlanets,
      trip: this.trip
    });

    $("#modal").html(resView.render().$el);
  }
});
