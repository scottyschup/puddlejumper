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
    // this is all messed up to simulate longer loading time and test img
    var content;
    if (PuddleJumper.Collections.results.length > 0) {
      setTimeout(function () {
        content = this.template({
          results: PuddleJumper.Collections.results
        });
      }.bind(this), 600);
    } else {
      content = this.loadingTemplate();
      this.$el.html(content);
    }

    return this;
  }
});
