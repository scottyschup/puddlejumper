PuddleJumper.Views.TripResView = Backbone.View.extend({
  template: JST['trips/reservation'],
  className: 'tripRes',

  initialize: function (options) {
    this.fullTrip = options.fullTrip;
  },

  events: {
    "click .reserve": "reserveTrip",
    "click .close": "closeResView",
    "click a.get-new-id": "getNewSgtid",
  },

  render: function () {
    $("#modal").removeClass("inactive");
    setTimeout(function () { $("#modal").addClass("active"); }, 100);
    var content = this.template({
      fullTrip: this.fullTrip
    });
    this.$el.html(content);
    setTimeout(function () {
      $(".tripRes").addClass("active");
    }, 100);

    return this;
  },

  closeResView: function (ev) {
    $(".tripRes").removeClass("active");
    setTimeout(function () {
      $("#modal").removeClass("active");
      $('#modal').empty();
      setTimeout(function () { $("#modal").addClass("inactive"); }, 500);
    }, 200);
  },

  reserveTrip: function (ev) {
    var data = $(".res-form form").serializeJSON();

  },

});
