PuddleJumper.Collections.Planets = Backbone.Collection.extend({
  model: PuddleJumper.Models.Planet,
  url: "api/planets",

  randomDestinationFrom: function (planet) {
    return _.sample(_.without(this.pluck('name'), planet));
  }
});
