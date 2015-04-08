PuddleJumper.Views.TripsForm = Backbone.View.extend({
  template: JST['trips/form'],
  className: 'search-form',
  // you're adding planetslist typeahead

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
