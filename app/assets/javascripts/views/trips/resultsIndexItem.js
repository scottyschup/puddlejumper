PuddleJumper.Views.TripResultsIndexItem = Backbone.View.extend({
  template: JST['trips/resultsIndexItem'],
  tagName: 'li',
  className: 'trip',

  initialize: function (trip) {
    this.trip = trip;
  },

  render: function () {
    var content = this.template({
      trip: this.trip
    });
    this.$el.html(content);
    return this;
  }
});
