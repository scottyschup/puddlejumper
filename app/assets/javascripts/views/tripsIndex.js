PuddleJumper.Views.TripsIndex = Backbone.CompositeView.extend({
  template: JST['trips/index'],
  className: 'search-results',

  initialize: function () {
    this.listenTo(PuddleJumper.Collections.results, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      results: PuddleJumper.Collections.results
    });

    this.$el.html(content);
    return this;
  }
});
