PuddleJumper.Models.Itinerary = Backbone.Model.extend({
  urlRoot: 'api/itineraries',

  parse: function (response) {
    if (response.trips) {
      this.trips().set(response.trips, { parse: true });
      delete response.trips;
    }
  },

  trips: function () {
    if (!this._trips) {
      this._trips = new PuddleJumper.Collections.Trips([], { itinerary: this });
    }

    return this._lists
  },

  travelers: function () {

  },
});
