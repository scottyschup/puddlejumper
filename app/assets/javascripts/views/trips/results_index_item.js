PuddleJumper.Views.TripResultsIndexItem = Backbone.View.extend({
  template: JST['trips/index_item'],
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
