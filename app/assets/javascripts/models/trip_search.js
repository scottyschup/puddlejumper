PuddleJumper.Models.TripSearch = Backbone.Model.extend({
  urlRoot: 'api/trips',

  allTrips: function () {
    this._departures = this.get('departures');
    this._allTrips = [];

    if (this._departures.length > 0) {
      this._arrivals = this.get('arrivals');

      if (this._arrivals.length > 0 ? this.isRoundtrip() : !this.isRountrip()) {
        // the above line makes sure roundtrips have arrivals and one-way trips do not
        for (var i = 0; i < this._departures.length; i++) {
          if (this.isRoundtrip()) {
            for (var j = 0; j < this._arrivals.length; j++) {
              this._allTrips.push([this._departures[i], this._arrivals[j]]);
            }
          } else {
            this._allTrips.push([this._departures[i]]);
          }
        }
      }
    }
    return this._allTrips;
  },

  numTrips: function () {
    if (this.isRoundtrip()) {
      return this.get('departures').length * this.get('arrivals').length;
    } else {
      return this.get('departures').length;
    }
  },

  isRoundtrip: function () {
    return this.get('roundtrip') === 'true' ? true : false;
  },

  isFetched: function () {
    return !(this.get('departures') === undefined);
  }
});
