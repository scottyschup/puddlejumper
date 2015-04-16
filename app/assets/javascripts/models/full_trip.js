PuddleJumper.Models.FullTrip = Backbone.Model.extend({
  urlRoot: 'api/trips',

  initialize: function (options) {
    this.departure = new PuddleJumper.Collections.Trips([]);
  }
});
