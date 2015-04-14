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
    if (PuddleJumper.tripSearch.numTrips() > 0) {
      this.addItemSubviews();
    } else {
      this.$el.append(' \
      <div class=message> \
        <h3> \
          There were no results. Please try again with different parmaeters. \
        </h3> \
      </div>');
    }
  },

  addItemSubviews: function () {
    var tripItemView;
    _.each(PuddleJumper.tripSearch.allTrips(), function (trip) {
      tripItemView = new PuddleJumper.Views.TripResultsIndexItem(trip);
      this.addSubview('.trips-list', tripItemView);
    }.bind(this));
  },

  render: function () {
    var content;

    if (PuddleJumper.tripSearch.isFetched()) {
      $("body").removeClass("loading");
      content = this.template();
      this.$el.html(content);

      this.addAllSubviews();
    } else {
      $("body").addClass("loading");
      content = this.loadingTemplate();
      this.$el.html(content);
    }
    return this;
  },
});
