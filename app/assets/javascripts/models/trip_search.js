PuddleJumper.Models.TripSearch = Backbone.Model.extend({
  urlRoot: 'api/trips',

  allTrips: function () {
    this._departures = this.get('departures');
    this._allTrips = [];

    if (this._departures.length > 0) {
      this._arrivals = this.get('arrivals');

      if (this._arrivals.length > 0 ? this.isRoundtrip() : !this.isRoundtrip()) {
        // the above line makes sure roundtrips have arrivals and one-way trips do not

        var departure_time, arrival_time
        for (var i = 0; i < this._departures.length; i++) {
          departure_time = this._departures[i].datetime;
          if (this.isRoundtrip()) {
            for (var j = 0; j < this._arrivals.length; j++) {
              arrival_time = this._arrivals[j].datetime;
              if (moment(departure_time) < moment(arrival_time)) {

                this._allTrips.push([this._departures[i], this._arrivals[j]]);
              }
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
    return this.get('roundtrip');
  },

  isFetched: function () {
    return !(this.get('departures') === undefined);
  }
});
