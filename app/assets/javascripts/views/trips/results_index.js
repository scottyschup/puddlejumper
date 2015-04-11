PuddleJumper.Views.TripResultsIndex = Backbone.CompositeView.extend({
  template: JST['trips/index'],
  className: 'trip-results',

  initialize: function () {
    this.listenTo(PuddleJumper.tripSearch, 'sync', this.departuresCheck);
  },

  addAllSubviews: function () {
    // details subview
    var tripDetailsView = new PuddleJumper.Views.TripResultsDetails();
    this.addSubview('.trip-results-details', tripDetailsView);
    // trip item subviews
    var tripItemView;
    _.each(PuddleJumper.tripSearch.allTrips(), function (trip) {
      tripItemView = new PuddleJumper.Views.TripResultsIndexItem(trip);
      this.addSubview('.trips-list', tripItemView);
    }.bind(this));
  },

  departuresCheck: function () {
    if (PuddleJumper.tripSearch.attributes.departures.length > 0) {
      this.addAllSubviews();
    } else {
      this.$el.html('<h3>There were no results. Please try again with different search parmaeters.</h3>');
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    if (PuddleJumper.tripSearch.has("departures")) {
      this.departuresCheck();
    } else {
      // loading
    }
    return this;
  }
});
