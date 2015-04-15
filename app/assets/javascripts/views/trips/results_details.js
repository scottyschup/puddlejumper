PuddleJumper.Views.TripResultsDetails = Backbone.View.extend({
  template: JST['trips/index_details'],
  tagName: 'ul',
  className: 'trip-details-list clearfix',

  render: function () {
    var content = this.template({
      data: PuddleJumper.tripSearch.data()
    });
    this.$el.html(content);
    return this;
  },
});
