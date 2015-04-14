PuddleJumper.Views.TripResView = Backbone.View.extend({
  template: JST['trips/resView'],
  className: 'tripRes',

  initialize: function (trip) {
    this.trip = trip;
  },

  events: {
    "click .reserve": "reserveTrip",
    "click .close": "closeResView",
    "click modal": "closeResView"
  },

  render: function () {
    $("#modal").css("display", "block");
    var content = this.template({ trip: this.trip });
    this.$el.html(content);

    return this;
  },

  closeResView: function (ev) {
    $("#modal").css("display", "none");
    $('#modal').empty();
  },

  reserveTrip: function (ev) {
    // get trip ids, num of travs
    // add form for name
  }
});
