PuddleJumper.Views.TripResultsIndex = Backbone.CompositeView.extend({
  template: JST['trips/index'],
  loadingTemplate: JST['trips/index_loading'],
  className: 'trip-results',

  initialize: function () {
    this.listenTo(PuddleJumper.tripSearch, 'sync', this.render);
  },

  addAllSubviews: function () {
    // details subview
    var tripDetailsView = new PuddleJumper.Views.TripResultsDetails();
    this.addSubview('.trip-details', tripDetailsView);

    // trip item subviews
    var tripItemView;
    _.each(PuddleJumper.tripSearch.allTrips(), function (trip) {
      tripItemView = new PuddleJumper.Views.TripResultsIndexItem(trip);
      this.addSubview('.trips-list', tripItemView);
    }.bind(this));
  },

  addValidSubviews: function () {
    if (PuddleJumper.tripSearch.numTrips() > 0) {
      this.addAllSubviews();
    } else {
      this.$el.html('<h3>There were no results. Please try again with different search parmaeters.</h3>');
    }
  },

  render: function () {
    var content;

    if (PuddleJumper.tripSearch.isFetched()) {
      content = this.template();
      this.$el.html(content);

      this.addValidSubviews();
    } else {
      content = this.loadingTemplate();
      this.$el.html(content);
    }
    return this;
  },
});
