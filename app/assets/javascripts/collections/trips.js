PuddleJumper.Collections.Trips = Backbone.Collection.extend({
  url: 'api/trip',
  model: PuddleJumper.Models.Trip,

  initialize: function (models) {
    // _.each(models, function (model) {
    //   this.add(new PuddleJumper.Models.Trip(model));
    // });
  }
});
