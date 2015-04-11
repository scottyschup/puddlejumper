PuddleJumper.Views.TripResultsDetails = Backbone.View.extend({
  template: JST['trips/index_details'],
  tagName: 'ul',
  className: 'trip-results-details',

  extractDetails: function () {
    var attrs = PuddleJumper.tripSearch.attributes;
    var details = {
      origin:       PuddleJumper.planets.get(attrs.departures[0].origin_id),
      destination:  PuddleJumper.planets.get(attrs.departures[0].destination_id),
      numTravelers: attrs.numTravelers
    };

    if (attrs.roundtrip === 'true') {
      details.roundtrip     = true;
      details.numTrips      = attrs.departures.length * attrs.arrivals.length;
      details.departureDate = attrs.departures[0].trip_date;
      details.arrivalDate   = attrs.arrivals[0].trip_date;
    } else {
      details.roundtrip     = false;
      details.numTrips      = attrs.departures.length;
      details.departureDate = attrs.departures[0].trip_date;
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
