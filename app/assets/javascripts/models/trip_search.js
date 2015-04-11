PuddleJumper.Models.TripSearch = Backbone.Model.extend({
  urlRoot: 'api/trips',

  allTrips: function () {
    this._departures = this.get('departures');
    this._arrivals = this.get('arrivals');
    this._allTrips = [];
    var currentTrip;

    for (var i = 0; i < this._departures.length; i++) {
      if (this.get('roundtrip') === 'true') {
        for (var j = 0; j < this._arrivals.length; j++) {
          this._allTrips.push([this._departures[i], this._arrivals[j]]);
        }
      } else {
        this._allTrips.push([this._departures[i]]);
      }
    }
    return this._allTrips;
  }
});
