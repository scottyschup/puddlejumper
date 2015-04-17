PuddleJumper.Collections.Planets = Backbone.Collection.extend({
  model: PuddleJumper.Models.Planet,
  url: "api/planets",

  randomDestinationFrom: function (originName) {
    return _.sample(_.without(this.pluck('name'), originName));
  },

  randomOriginName: function () {
    return _.sample(this.pluck('name'));
  },

  dataset: function () {
    // data used by typeAhead/bloodhound to populate suggestions
    var names = this.pluck('name');
    var aliases = this.pluck('alias');
    var dataset = [], value;

    _.each(names, function(name) {
      aliasName = aliases[names.indexOf(name)] + "  (" + name + ")";
      dataset.push({ value: name }, { value: aliasName });
    });

    return dataset;
  }
});
