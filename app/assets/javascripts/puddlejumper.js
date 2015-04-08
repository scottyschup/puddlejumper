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
