PuddleJumper.Models.Itinerary = Backbone.Model.extend({
  urlRoot: 'api/itineraries',

  parse: function (response) {
    if (response.companions) {
      this.companions().set(response.companions, { parse: true });
      delete response.companions;
    }

    this.traveler().set(response.traveler, { parse: true });
    delete response.traveler;
  },

  companions: function () {
    if (!this._companions) {
      this._companions = new PuddleJumper.Collections.Travelers([]);
    }
    return this._companions;
  },

  traveler: function () {
    this._traveler = this._traveler || new PuddleJumper.Models.Traveler();
    return this._traveler;
  }
});
