PuddleJumper.Views.TripResultsIndex = Backbone.CompositeView.extend({
  template: JST['trips/index'],
  loadingTemplate: JST['trips/index_loading'],
  className: 'trip-results',

  initialize: function () {
    this.listenTo(PuddleJumper.tripResult, "sync", this.render);
  },

  render: function () {
    var content;
    if (PuddleJumper.tripResult.has('departures')) {
      setTimeout(function () {
        content = this.template({
          trips: PuddleJumper.tripResult.allTrips()
        });
        this.$el.html(content);
      }.bind(this), 1500);
    } else {
      content = this.loadingTemplate();
      this.$el.html(content);

      setTimeout(function () {
        if (PuddleJumper.tripResult.has('departures')) {
          content = this.template({
            trips: PuddleJumper.tripResult.allTrips()
          });
          this.$el.html(content);
        } else {
          Backbone.history.navigate('', { trigger: true });
        }
      }.bind(this), 3000);
    }

    return this;
  }
});
