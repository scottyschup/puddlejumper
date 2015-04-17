PuddleJumper.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    PuddleJumper.planets = new PuddleJumper.Collections.Planets();
    PuddleJumper.planets.fetch();
    PuddleJumper.tripSearch = new PuddleJumper.Models.TripSearch();
    PuddleJumper.searchHistory = {};
    PuddleJumper.searchHistory.trips = [];
  },

  routes: {
    "": "tripSearchForm",
    "trips": "tripResultsIndex",
    "ships": "shipSearchForm",
    "lodging": "lodgingSearchForm"
  },

  tripSearchForm: function () {
    $(".nav-left *").removeClass("current-page");
    $("#gates > a").addClass("current-page");

    if (PuddleJumper.tripSearch.fetched) {
      PuddleJumper.searchHistory.trips.push(PuddleJumper.tripSearch);
    }
      PuddleJumper.tripSearch = new PuddleJumper.Models.TripSearch();

    var tripsFormView = new PuddleJumper.Views.TripSearchForm({
      planets: PuddleJumper.planets,
    });
    this._swapView(tripsFormView);
  },

  tripResultsIndex: function () {
    var tripResultsIndexView = new PuddleJumper.Views.TripResultsIndex({
      results: PuddleJumper.tripSearch,
      planets: PuddleJumper.planets
    });

    this._swapView(tripResultsIndexView);
  },

  _swapView: function (view) {
    this._currView && this._currView.remove();
    this._currView = view;
    this.$rootEl.html(view.render().$el);
  },

  shipSearchForm: function () {
    $(".nav-left *").removeClass("current-page");
    $("#ships > a").addClass("current-page");
    alert("Coming Soon!");
    Backbone.history.navigate("", { trigger: true });

  },

  lodgingSearchForm: function () {
    $(".nav-left *").removeClass("current-page");
    $("#lodging > a").addClass("current-page");
    alert("Coming Soon!");
    Backbone.history.navigate("", { trigger: true });

  }
});
