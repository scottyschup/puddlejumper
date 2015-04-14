PuddleJumper.Views.TripResultsDetails = Backbone.View.extend({
  template: JST['trips/index_details'],
  tagName: 'ul',
  className: 'trip-details-list clearfix',

  extractDetails: function () {
    this.results = PuddleJumper.tripSearch
    var attrs = this.results.attributes;
    var details = {
      origin:       PuddleJumper.planets.get(attrs.departures[0].origin_id),
      destination:  PuddleJumper.planets.get(attrs.departures[0].destination_id),
      numTravelers: parseInt(attrs.numTravelers),
      numTrips:     parseInt(this.results.numTrips()),
      roundtrip:    this.results.isRoundtrip(),
      depDate:      moment(attrs.departures[0].datetime),
      depFlex:      parseInt(attrs.flexDates.dep),
      arrFlex:      parseInt(attrs.flexDates.arr)
    };

    if (this.results.isRoundtrip()) {
      details.arrDate = moment(attrs.arrivals[0].datetime);
    } else {
      details.arrDate = details.depDate;
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
