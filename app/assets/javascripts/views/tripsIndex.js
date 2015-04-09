PuddleJumper.Views.TripsIndex = Backbone.CompositeView.extend({
  template: JST['trips/index'],
  loadingTemplate: JST['trips/index_loading'],
  className: 'search-results',

  initialize: function () {
    this.listenTo(PuddleJumper.Collections.results, "sync", this.render);
  },

  renderTemplate: function (type) {

  },

  render: function () {
    var content;
    if (PuddleJumper.Collections.results.length > 0) {
      content = this.template({
        results: PuddleJumper.Collections.results
      });
    } else {
      content = this.loadingTemplate();
    }

    this.$el.html(content);
    return this;
  }
});
