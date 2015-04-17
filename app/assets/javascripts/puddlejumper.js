window.PuddleJumper = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function($rootEl) {
    window.router = new PuddleJumper.Router($rootEl);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  PuddleJumper.initialize($("#main"));
});

localStorage.PuddleJumper = JSON.stringify({
  currUsername: '',
  pastSearches: [],
  lastSearch: function () {
    return this.pastSearches[-1];
  },

  addSearch: function (search) {
    this.pastSearches.push(search);
  }
});
