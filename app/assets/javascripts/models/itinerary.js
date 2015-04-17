PuddleJumper.Models.Itinerary = Backbone.Model.extend({
  urlRoot: 'api/itineraries',

  parse: function (response) {
    if (response.companions) {
      this.companions().set(response.companions, { parse: true });
      delete response.companions;
    }
  },

  companions: function () {
    if (!this._companions) {
      this._companions = new PuddleJumper.Collections.Travelers([]);
    }

    return this._companions
  },
});
