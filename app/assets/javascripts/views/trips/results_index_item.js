PuddleJumper.Views.TripResultsIndexItem = Backbone.CompositeView.extend({
  template: JST['trips/index_item'],
  tagName: 'li',
  className: 'trip',

  events: {
    "click .select-btn > .btn": "openResView",
  },

  initialize: function (trip) {
    this.trip = trip;
  },

  render: function () {
    var content = this.template({
      trip: this.trip
    });
    this.$el.html(content);
    return this;
  },

  openResView: function (ev) {
    var resView = new PuddleJumper.Views.TripResView(this.trip);
    $("#modal").html(resView.render().$el);
  }
});
