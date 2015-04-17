PuddleJumper.Models.FullTrip = Backbone.Model.extend({
  url: 'api/trips',
  model: PuddleJumper.Models.Trip,

  initialize: function (options) {
    this.roundtrip = options.roundtrip;
    this.departure = options.departure;

    if (this.roundtrip) {
      this.arrival = options.arrival;
    } else {
      this.arrival = new PuddleJumper.Models.Trip();
    }
  },

  remainingSpace: function () {
    var min;
    if (this.roundtrip) {
      min = Math.min([
        this.departure.get("remaining_space"),
        this.arrival.get("remaining_space")
      ]);
    } else {
      min = this.departure.get("remaining_space");
    }

    return min;
  },

});
