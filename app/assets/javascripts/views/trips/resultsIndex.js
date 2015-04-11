PuddleJumper.Views.TripResultsIndex = Backbone.CompositeView.extend({
  template: JST['trips/index'],
  loadingTemplate: JST['trips/index_loading'],
  className: 'trip-results',

  initialize: function () {
    this.results = PuddleJumper.tripSearch;
    this.listenTo(this.results, "sync", this.render);
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

        this.details = details;
        this.addAllSubviews();
        }
      }
    } else {
      this.details = { numTrips: 0 };
      this.render();
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
      this.extractDetails();
      this.resultsContent();
    } else {
      this.loadingContent();
      setTimeout(this.noResults.bind(this), 1000);
    }

    return this;
  },

  loadingContent: function () {
    $("body").addClass("loading");
    var content = this.loadingTemplate();
    this.$el.html(content);
  },

  resultsContent: function () {
    var content;
    if (this.details.numTrips > 0) {
      content = this.template({ details: this.details });
      this.attachSubviews();
    } else {
      content = "<p>There were no available trips. \
      Try again with different search parameters.</p>";
    }
    this.$el.html(content);
  },

  noResults: function () {
    $("body").removeClass("loading");

    if (this.thereAreResults()) {
      this.resultsContent();
    } else {
      Backbone.history.navigate('', { trigger: true });
    }
  }
});
