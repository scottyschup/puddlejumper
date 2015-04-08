PuddleJumper.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.planetsList = new PuddleJumper.Collections.Planets();
    // add loginDropdownView here later
  },

  routes: {
    "": "tripsForm",
    "trips": "tripsIndex"
  },

  tripsForm: function () {
    var tripsFormView = new PuddleJumper.Views.TripsForm({
      planets: this.planetsList
    });
    this._swapView(tripsFormView);
  },

  tripsIndex: function () {
    var tripsIndexView = new PuddleJumper.Views.TripsIndex();
  },

  _swapView: function (view) {
    this._currView && this._currView.remove();
    this._currView = view;
    this.$rootEl.html(view.render().$el);
  }
});
