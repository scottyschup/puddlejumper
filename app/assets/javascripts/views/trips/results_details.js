PuddleJumper.Views.TripResultsDetails = Backbone.View.extend({
  template: JST['trips/index_details'],
  tagName: 'ul',
  className: 'trip-details-list clearfix',

  extractDetails: function () {
    this.results = PuddleJumper.tripSearch
    var attrs = this.results.attributes;
    var details = {
      origin:        PuddleJumper.planets.get(attrs.departures[0].origin_id),
      destination:   PuddleJumper.planets.get(attrs.departures[0].destination_id),
      numTravelers:  attrs.numTravelers,
      numTrips:      this.results.numTrips(),
      roundtrip:     this.results.isRoundtrip(),
      departureDate: attrs.departures[0].trip_date
    };

    if (details.roundtrip) {
      details.arrivalDate   = attrs.arrivals[0].trip_date;
    } else {
      details.arrivalDate   = null;
    }

  return details;
  },

  render: function () {
    var content = this.template({
      details: this.extractDetails()
    });
    this.$el.html(content);
    return this;
  }
});
