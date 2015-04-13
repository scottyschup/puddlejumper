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
      depDate: moment(attrs.departures[0].datetime).tz('America/Denver'),
      flexDates:     this.results.hasFlexDates()
    };

    if (details.roundtrip) {
      details.arrDate = moment(attrs.arrivals[0].datetime).tz('America/Denver');
    } else {
      details.arrDate = null;
    }
    details.arrFlex = details.flexDates ? parseInt(attrs.flexDates.arr) : null;
    details.depFlex = details.flexDates ? parseInt(attrs.flexDates.dep) : null;

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
