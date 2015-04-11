PuddleJumper.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    PuddleJumper.planets = new PuddleJumper.Collections.Planets();
    PuddleJumper.planets.fetch();
    if (!PuddleJumper.tripSearch) {
      Backbone.history.navigate("", { trigger: true });
      PuddleJumper.tripSearch = new PuddleJumper.Models.TripSearch();
    }
  },

  routes: {
    "": "tripSearchForm",
    "trips": "tripResultsIndex"
  },

  tripSearchForm: function () {
    PuddleJumper.tripSearch = new PuddleJumper.Models.TripSearch(); //reset search results
    var tripsFormView = new PuddleJumper.Views.TripSearchForm({
      planets: PuddleJumper.planets
    });
    this._swapView(tripsFormView);
  },

  tripResultsIndex: function () {
    var tripResultsIndexView = new PuddleJumper.Views.TripResultsIndex();

    this._swapView(tripResultsIndexView);
  },

  _swapView: function (view) {
    this._currView && this._currView.remove();
    this._currView = view;
    this.$rootEl.html(view.render().$el);
  }
});
