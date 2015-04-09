PuddleJumper.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    PuddleJumper.Collections.planetsList = new PuddleJumper.Collections.Planets();
    PuddleJumper.Collections.planetsList.fetch();
    if (!PuddleJumper.Collections.results) {
      Backbone.history.navigate("", { trigger: true });
      PuddleJumper.Collections.results = new PuddleJumper.Collections.Trips();
    }
    // add loginDropdownView here later
  },

  routes: {
    "": "tripsForm",
    "trips": "tripsIndex"
  },

  tripsForm: function () {
    var tripsFormView = new PuddleJumper.Views.TripsForm({
      collection: PuddleJumper.Collections.planetsList
    });
    this._swapView(tripsFormView);
  },

  tripsIndex: function () {
    var tripsIndexView = new PuddleJumper.Views.TripsIndex();

    this._swapView(tripsIndexView);
  },

  _swapView: function (view) {
    this._currView && this._currView.remove();
    this._currView = view;
    this.$rootEl.html(view.render().$el);
  }
});
