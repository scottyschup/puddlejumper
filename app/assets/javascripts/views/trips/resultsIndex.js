PuddleJumper.Views.TripResultsIndex = Backbone.CompositeView.extend({
  template: JST['trips/index'],
  loadingTemplate: JST['trips/index_loading'],
  className: 'trip-results',

  initialize: function () {
    this.listenTo(PuddleJumper.tripSearch, "sync", this.addAllSubviews);

    if (this.thereAreResults()) {
      var results = PuddleJumper.tripSearch.attributes;
      this.details = {
        roundtrip: results.roundtrip,
        numTrips: results.departures.length * results.arrivals.length,
        departureDate: results.departures[0].trip_date,
        arrivalDate: results.arrivals[0].trip_date,
        origin: PuddleJumper.planets.get(results.departures[0].origin_id),
        destination: PuddleJumper.planets.get(results.departures[0].destination_id)
      };
    }
  },

  thereAreResults: function () {
    return PuddleJumper.tripSearch.has('departures');
  },

  addAllSubviews: function () {
    var thisSubview;
    _.each(PuddleJumper.tripSearch.allTrips(), function (tripResult) {
      thisSubview = new PuddleJumper.Views.TripResultsIndexItem(tripResult);
      this.addSubview('.trips', thisSubview);
    }.bind(this));
  },

  render: function () {
    if (this.thereAreResults()) {
      // timeout to simulate longer search time
      setTimeout(resultsContent.bind(this), 3000);
    } else {
      $("body").addClass("loading");
      this.loadingTemplate();
      setTimeout(this.noResults.bind(this), 3000);
    }

    return this;
  },

  resultsContent: function () {
    var content = this.template({ details: this.details });
    this.attachSubviews();
    this.$el.html(content);
  },

  noResults: function () {
    $("body").removeClass("loading");

    if (this.thereAreResults()) {
      this.resultsContent()
    } else {
      Backbone.history.navigate('', { trigger: true });
    }
  }
});
