PuddleJumper.Views.TripResView = Backbone.View.extend({
  template: JST['trips/reservation'],
  loadingTemplate: JST['loading'],
  confirmationTemplate: JST['trips/confirmation'],
  className: 'tripRes',

  events: {
    "click .close": "closeResView",
    "click .reserve": "validateForm",
  },

  initialize: function (options) {
    this.fullTrip = options.fullTrip;
    var currUser = JSON.parse(localStorage.PuddleJumper).currUsername;
    if (currUser) {
      this.traveler = new PuddleJumper.Models.Traveler({ name: currUser });
      this.traveler.fetch()
    } else {
      this.traveler = new PuddleJumper.Models.Traveler();
    }
  },

  activateModal: function () {
    $("#modal").removeClass("inactive");
    setTimeout(function () { $("#modal").addClass("active"); }, 100);
    setTimeout(function () {
      $(".tripRes").addClass("active");
    }, 100);
  },

  closeResView: function (ev) {
    $(".tripRes").removeClass("active");
    setTimeout(function () {
      $("#modal").removeClass("active");
      $('#modal').empty();
      setTimeout(function () { $("#modal").addClass("inactive"); }, 500);
    }, 200);
  },

  render: function () {
    this.activateModal();

    var content = this.template({
      fullTrip: this.fullTrip,
      traveler: this.traveler
    });
    this.$el.html(content);

    return this;
  },

  renderLoading: function () {
    var content = this.loadingTemplate();
    this.$el.html(content);

    return this;
  },

  renderConfirmation: function () {
    var content = this.confirmationTemplate({
      itinerary: this.itinerary
    });
    this.$el.html(content);

    return this;
  },

  reserveItinerary: function (ev) {
    var data = $(".res-form form").serializeJSON();
    this.itinerary = new PuddleJumper.Models.Itinerary();
    this.listenTo(this.itinerary, 'sync', this.render);
    localStorage.PuddleJumper.currUsername = $(
      "form label.name:first + input"
    ).val();

    this.$el.addClass("loading");
    this.renderLoading();

    var that = this;
    this.itinerary.fetch({
      data: data,
      error: function () {
        that.$el.append("<h2>Oops...there was an error processing your request</h2>")
        setTimeout(function () {
          that.$el.removeClass("loading");
          that.closeResView();
        }, 2500);
      }
    });


  },

  validateForm: function (ev) {
    ev.preventDefault();
    this.reserveItinerary(ev);
  }

});
