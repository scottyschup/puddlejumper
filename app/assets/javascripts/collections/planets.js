PuddleJumper.Collections.Planets = Backbone.Collection.extend({
  model: PuddleJumper.Models.Planet,
  url: "api/planets",

  randomDestinationFrom: function (originName) {
    return _.sample(_.without(this.pluck('name'), originName));
  },

  randomOriginName: function () {
    return _.sample(this.pluck('name'));
  }
});
