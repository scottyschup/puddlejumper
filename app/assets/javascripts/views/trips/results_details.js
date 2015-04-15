PuddleJumper.Views.TripResultsDetails = Backbone.View.extend({
  template: JST['trips/index_details'],
  tagName: 'ul',
  className: 'trip-details-list clearfix',

  extractDetails: function () {
    this.search = PuddleJumper.tripSearch
    var data = this.search.data();
    var details = {
      origin:       PuddleJumper.planets.get(data.departures[0].origin_id),
      destination:  PuddleJumper.planets.get(data.departures[0].destination_id),
      numTravelers: parseInt(data.numTravelers),
      numTrips:     parseInt(this.search.numTrips()),
      roundtrip:    this.search.isRoundtrip(),
      depDate:      moment(data.departures[0].datetime),
      depFlex:      parseInt(data.flexDates.dep),
      arrFlex:      parseInt(data.flexDates.arr)
    };

    if (this.search.isRoundtrip()) {
      details.arrDate = moment(data.arrivals[0].datetime);
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
