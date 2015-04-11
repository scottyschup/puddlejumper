PuddleJumper.Views.TripResultsIndex = Backbone.CompositeView.extend({
  template: JST['trips/index'],
  loadingTemplate: JST['trips/index_loading'],
  className: 'trip-results',

  initialize: function () {
    this.listenTo(PuddleJumper.tripSearch, "sync", this.render);
    this.results = PuddleJumper.tripSearch;
  },

  extractDetails: function () {
    if (this.results.attributes.departures > 0) {
      if (this.thereAreResults()) {
        var attrs = this.results.attributes;
        var details;
        if (attrs.roundtrip === 'true') {
          details = {
            roundtrip: true,
            numTrips: attrs.departures.length * attrs.arrivals.length,
            departureDate: attrs.departures[0].trip_date,
            arrivalDate: attrs.arrivals[0].trip_date,
            origin: PuddleJumper.planets.get(attrs.departures[0].origin_id),
            destination: PuddleJumper.planets.get(attrs.departures[0].destination_id),
            numTravelers: attrs.numTravelers
          };
        } else {
          details = {
            roundtrip: false,
            numTrips: attrs.departures.length,
            departureDate: attrs.departures[0].trip_date,
            arrivalDate: null,
            origin: PuddleJumper.planets.get(attrs.departures[0].origin_id),
            destination: PuddleJumper.planets.get(attrs.departures[0].destination_id),
            numTravelers: attrs.numTravelers
          };
        }
        
      this.details = details;
      }
    } else {
      this.details = { numTrips: 0 };
    }
  },

  thereAreResults: function () {
    return PuddleJumper.tripSearch.has('departures');
  },

  addAllSubviews: function () {
    var thisSubview;
    _.each(PuddleJumper.tripSearch.allTrips(), function (tripResult) {
      thisSubview = new PuddleJumper.Views.TripResultsIndexItem(tripResult);
      this.addSubview('.trip', thisSubview);
    }.bind(this));
  },

  render: function () {
    if (this.thereAreResults()) {
      this.results = PuddleJumper.tripSearch;
      this.extractDetails();
      this.resultsContent();
    } else {
      this.loadingContent();
      setTimeout(this.checkAgain.bind(this), 2000);
    }

    return this;
  },

  loadingContent: function () {
    var content = this.loadingTemplate();
    this.$el.html(content);
  },

  resultsContent: function () {
    var content;
    if (this.details.numTrips > 0) {
      content = this.template({ details: this.details });
      this.addAllSubviews();
    } else {
      content = "<p>There were no available trips. \
      Try again with different search parameters.</p>";
    }
    this.$el.html(content);
  },

  checkAgain: function () {
    if (this.thereAreResults()) {
      this.resultsContent();
    } else {
      this.$el.html('<p>There was a problem retrieving the data.</p>');
      this.$el.append('<p>Redirecting...</p>');
      setTimeout(function () {
        Backbone.history.navigate('', { trigger: true });
      }.bind(this), 3000);
    }
  }
});
