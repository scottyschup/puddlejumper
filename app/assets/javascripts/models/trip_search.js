PuddleJumper.Models.TripSearch = Backbone.Model.extend({
  urlRoot: "api/trips",

  initialize: function () {
    this.fetched = false;
  },

  parse: function (response) {
    this.departures().set(response.departures, { parse: true });
    delete response.departures;

    if (response.arrivals) {
      this.arrivals().set(response.arrivals, { parse: true });
      delete response.arrivals;
    } else {
      this.roundtrip = false;
    }

    this.flexDates = response.flexDates;
    delete response.flexDates;

    if (response.companions) {
      this.companions().set(response.companions, { parse: true });
      delete response.companions;
    }

    this.origin = PuddleJumper.planets.get(response.originId);
    this.destination = PuddleJumper.planets.get(response.destinationId);
    this.numTravelers = response.numTravelers;

    return response;
  },

  arrivals: function () {
    this._arrivals = this._arrivals || new PuddleJumper.Collections.Trips([]);
    return this._arrivals;
  },

  companions: function () {
    this._companions = this._companions || new PuddleJumper.Collections.Trips([]);
    return this._companions;
  },

  departures: function () {
    this._departures = this._departures || new PuddleJumper.Collections.Trips([]);
    return this._departures;
  },

  fullTrips: function () {
    this._fullTrips = new PuddleJumper.Collections.FullTrips([], {
      tripSearch: this
    });

    if (this.departures().length > 0) {
      if (this.arrivals().length > 0 ? this.roundtrip : !this.roundtrip) {
        // this line makes sure roundtrips have arrivals and one-way trips do not

        var arrTime, depTime, thisTrip;
        for (var i = 0; i < this.departures().length; i++) {
          depTime = this.departures().models[i].get("datetime");
          if (this.roundtrip) {
            for (var j = 0; j < this.arrivals().length; j++) {
              arrTime = this.arrivals().models[j].get("datetime");
              if (moment(depTime) < moment(arrTime)) {
                thisTrip = new PuddleJumper.Models.FullTrip({
                  departure: this.departures().models[i],
                  arrival: this.arrivals().models[j],
                  roundtrip: true
                });
                this._fullTrips.add([thisTrip]);
              }
            }
          } else {
            thisTrip = new PuddleJumper.Models.FullTrip({
              departure: this.departures().models[i],
              arrival: null,
              roundtrip: false
            });
            this._fullTrips.add([thisTrip]);
          }
        }
      }
    }
    return this._fullTrips;
  },

  hasFlexDates: function () {
    return Math.max(this.flexDates.arr, this.flexDates.dep) > 0;
  },

  searchDates: function () {
    var dep, arr;
    if (this.hasFlexDates()) {
      dep = this._earliestDate(this.departures());
      arr = this.roundtrip ? this._earliestDate(this.arrivals()) : dep;
    } else {
      dep = this.departures().pluck("datetime")[0];
      arr = this.roundtrip ? this.arrivals().pluck("datetime")[0] : dep;
    }

    return { departure: moment(dep), arrival: moment(arr) };
  },

  _earliestDate: function (legsCollection) {
    var least = moment("2100-12-31");
    _.each(legsCollection.pluck("datetime"), function (legDatetime) {
      least = moment(legDatetime) < least ? moment(legDatetime) : least;
    });
    return least;
  }
});
