PuddleJumper.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    PuddleJumper.planets = new PuddleJumper.Collections.Planets();
    PuddleJumper.planets.fetch();
    if (!PuddleJumper.tripResult) {
      Backbone.history.navigate("", { trigger: true });
      PuddleJumper.tripResult = new PuddleJumper.Models.TripResult();
    }
    // add loginDropdownView here later
  },

  routes: {
    "": "tripSearchForm",
    "trips": "tripResultsIndex"
  },

  tripSearchForm: function () {
    var tripsFormView = new PuddleJumper.Views.TripSearchForm({
      collection: PuddleJumper.planets
    });
    this._swapView(tripsFormView);
  },

  tripResultsIndex: function () {
    var tripsIndexView = new PuddleJumper.Views.TripResultsIndex();

    this._swapView(tripsIndexView);
  },

  _swapView: function (view) {
    this._currView && this._currView.remove();
    this._currView = view;
    this.$rootEl.html(view.render().$el);
  }
});
