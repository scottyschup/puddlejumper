PuddleJumper.Collections.Trips = Backbone.Collection.extend({
  model: PuddleJumper.Models.Trip,
  url: 'api/trips',

  getOrFetch: function (id) {
    var trip = this.get(id);

    if (!trip) {
      trip = new PuddleJumper.Models.Trip({ id: id });
      trip.fetch({
        success: function () {
          this.add(trip);
        }.bind(this)
      });
    } else {
      trip.fetch();
    }

    return trip;
  }
});
