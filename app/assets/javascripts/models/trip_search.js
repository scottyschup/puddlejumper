PuddleJumper.Models.TripSearch = Backbone.Model.extend({
  urlRoot: 'api/trips',

  initialize: function () {
    this.fetched = false;
  },

  parse: function (response) {
    this.departures().set(response.departures, { parse: true });
    delete response.departures;

    if (response.arrivals) {
      this.roundtrip = true;
      this.arrivals().set(response.arrivals, { parse: true });
      delete response.arrivals;
    } else {
      this.roundtrip = false;
    }

    this.flexDates = response.flexDates
    delete response.flexDates;

    if (response.companions) {
      this.companions().set(response.companions, { parse: true });
      delete response.companions;
    }

    this.origin = this.departures().models[0].origin;
    this.destination = this.departures().models[0].destination;
    this.numTravelers = response.numTravelers;

    return response
  },

  departures: function () {
    this._departures = this._departures || new PuddleJumper.Collections.Trips([]);
    return this._departures
  },

  arrivals: function () {
    this._arrivals = this._arrivals || new PuddleJumper.Collections.Trips([]);
    return this._arrivals
  },

  companions: function () {
    this._companions = this._companions || new PuddleJumper.Collections.Trips([]);
    return this._companions
  },

  fullTrips: function () {
    this._fullTrips = new PuddleJumper.Collections.FullTrips([], {
      tripSearch: this
    });

    if (this.departures().length > 0) {
      if (this.arrivals().length > 0 ? this.roundtrip : !this.roundtrip) {
        // this line makes sure roundtrips have arrivals and one-way trips do not

        var dep_time, arr_time, thisTrip
        for (var i = 0; i < this.departures().length; i++) {
          dep_time = this.departures().models[i].get("datetime");
          if (this.roundtrip) {
            for (var j = 0; j < this.arrivals().length; j++) {
              arr_time = this.arrivals().models[j].get("datetime");
              if (moment(dep_time) < moment(arr_time)) {
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
      arr = this.roundtrip ? this._earliestDate(this.arrivals().pluck("datetime")) : dep;
    } else {
      dep = this.departures().pluck("datetime")[0];
      arr = this.roundtrip ? this.arrivals().pluck("datetime")[0] : dep;
    }

    return { departure: moment(dep), arrival: moment(arr) };
  },

  _earliestDate: function (legs) {
    var least = moment("2222-12-31")
    _.each(legs, function (leg) {
      least = moment(leg) < least ? moment(leg) : least
    });
    return least;
  }
});
