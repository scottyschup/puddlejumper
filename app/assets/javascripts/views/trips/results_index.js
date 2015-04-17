PuddleJumper.Views.TripResultsIndex = Backbone.CompositeView.extend({
  template: JST['trips/index'],
  loadingTemplate: JST['loading'],
  className: 'trip-results',

  initialize: function (options) {
    this.results = options.results;
    this.planets = options.planets;
    // listener turned off because long search time being simulated
    // this.listenTo(this.results, 'sync', this.render);
  },

  events: {
    "click .restart-btn": "backToRoot"
  },

  addAllSubviews: function () {
    // details subview
    var tripDetailsView = new PuddleJumper.Views.TripResultsDetails({
      results: this.results,
    });
    this.addSubview('.trip-details', tripDetailsView);

    // trip item subviews
    if (this.results.fullTrips().length > 0) {
      this.addItemSubviews();
    } else {
      var html = "<div class=message><h3>There were no results. \
        Please try again with different parmaeters.</h3></div>";
      this.$el.append(html);
    }
  },

  addItemSubviews: function () {
    var tripItemView;
    _.each(this.results.fullTrips().models, function (fullTrip) {
      tripItemView = new PuddleJumper.Views.TripResultsIndexItem({
        fullTrip: fullTrip
      });
      this.addSubview('.trips-list', tripItemView);
    }.bind(this));
  },

  backToRoot: function () {
    Backbone.history.navigate("", { trigger: true })
  },

  render: function () {
    var content;

    if (this.results.fetched) {
      $("body").removeClass("loading");
      content = this.template();
      this.$el.html(content);

      this.addAllSubviews();
    } else {
      $("body").addClass("loading");
      content = this.loadingTemplate();
      this.$el.html(content);
      setTimeout(function () {
        this.tryRenderingAgain();
      }.bind(this), 2000);
    }
    return this;
  },

  tryRenderingAgain: function () {
    if (this.results.fetched) {
      this.render();
    } else {
      $("body").removeClass("loading");

      var content = "<div class=message> \
        <h3>We were unable to process your request at this time. \
        Please try again.</h3><p>Redirecting...</p></div>";
      this.$el.html(content);
      setTimeout(function () {
        this.backToRoot();
      }.bind(this), 3500);
    }
  }
});
