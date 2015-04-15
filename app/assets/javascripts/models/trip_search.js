PuddleJumper.Models.TripSearch = Backbone.Model.extend({
  urlRoot: 'api/trips',

  initialize: function () {
    this.formData = { request: {}, response: {} };
  },

  parse: function (responseData) {
    this.formData.response =  responseData;
    return responseData;
  },

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

  hasFlexDates: function () {
    return Math.min(this.get("flexDates").arr, this.get("flexDates").dep) > 0;
  },

  isFetched: function () {
    return (this.get('departures') !== undefined);
  },

  hasTrips: function () {
    return this.numTrips() > 0;
  },

  planetName: function (idType) {
    var id = this.get(idType);
    return PuddleJumper.planets.get(id).get("name");
  },

  getEarliestDate: function (legName) {
    if (this.hasFlexDates()) {
      var least = moment("2020-12-31")
      _.each(this.get(legName), function (leg) {
        if (least > moment(leg.datetime)) {
          least = moment(leg.datetime);
        }
      })
      return least;
    } else {
      if (this.get(legName).length > 0) {
        return this.get(legName)[0].datetime;
      } else {
        return null;
      }
    }
  },

  data: function () {
    var data = this.attributes;
    data.originName = this.planetName('originId');
    data.destinationName = this.planetName('destinationId');
    data.numTrips = this.numTrips();
    data.arrivalDate = moment(this.getEarliestDate('arrivals'));
    data.departureDate = moment(this.getEarliestDate('departures'));
    data.hasFlexDates = this.hasFlexDates();
    return data;
  }
});
