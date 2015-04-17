PuddleJumper.Views.TripResultsDetails = Backbone.View.extend({
  template: JST['trips/index_details'],
  tagName: 'ul',
  className: 'trip-details-list clearfix',

  initialize: function (options) {
    this.results = options.results;
    this.planets = options.planets
  },

  render: function () {
    var content = this.template({
      results: this.results,
      planets: this.planets
    });
    this.$el.html(content);
    return this;
  },
});
