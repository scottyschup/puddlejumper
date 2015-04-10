PuddleJumper.Models.TripResult = Backbone.Model.extend({
  url: "api/trip",
  model: PuddleJumper.Models.Trip,

  initialize: function () {
    this.legs = new PuddleJumper.Collections.Trips();
    this.clearance = Math.max(this.pluck("clearance"));
  },

  departure: function () {
    // var first;
    // if (this.legs.length > 1) {
    //   first = Math.min(this.legs.pluck("date"));
    //   return this.legs.findWhere({ date: first });
    // } else {
    //   return this.legs.first();
    // }
  }
});
