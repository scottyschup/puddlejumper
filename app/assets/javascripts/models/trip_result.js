PuddleJumper.Models.TripResult = Backbone.Model.extend({
  urlRoot: 'api/trips',

  allTrips: function () {
    this._allTrips = [];
    this._departures = this.get('departures');
    this._arrivals = this.get('arrivals');
    var currentTrip;

    for (var i = 0; i < this._departures.length; i++) {
      currentTrip = [];

      if (this.get('roundtrip') === 'true') {
        for (var j = 0; j < this._arrivals.length; j++) {
          currentTrip.push(this._departures[i], this._arrivals[j]);
        }
      } else {
        currentTrip.push(this._departures[i]);
      }

      this._allTrips.push(currentTrip);
    }

    return this._allTrips;
  }
});
