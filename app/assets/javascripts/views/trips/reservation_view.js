PuddleJumper.Views.TripResView = Backbone.View.extend({
  template: JST['trips/reservation'],
  loadingTemplate: JST['loading'],
  confirmationTemplate: JST['trips/confirmation'],
  className: 'tripRes',

  events: {
    "click .close": "closeResView",
    "click .reserve": "validateForm",
    "click .new-search": "backToRoot"
  },

  initialize: function (options) {
    this.fullTrip = options.fullTrip;
    this.retrieveCurrUser();
    this.itinerary = new PuddleJumper.Models.Itinerary();
    this.listenTo(this.itinerary, 'sync', this.renderConfirmation);
    this.listenTo(this.itinerary.traveler(), 'sync', this.renderConfirmation);
    this.listenTo(this.itinerary.companions(), 'sync', this.renderConfirmation);

  },

  activateModal: function () {
    $("#modal").removeClass("inactive");
    setTimeout(function () { $("#modal").addClass("active"); }, 100);
    setTimeout(function () {
      $(".tripRes").addClass("active");
    }, 100);
  },

  backToRoot: function () {
    this.closeResView();
    Backbone.history.navigate("", { trigger: true });
  },

  closeResView: function (ev) {
    $(".tripRes").removeClass("active");
    setTimeout(function () {
      $("#modal").removeClass("active");
      $('#modal').empty();
      setTimeout(function () { $("#modal").addClass("inactive"); }, 500);
    }, 200);
  },

  retrieveCurrUser: function () {
    var currUsername = JSON.parse(localStorage.PuddleJumper).currUsername;
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
      traveler: this.itinerary.traveler(),
      companions: this.itinerary.companions()
    });
    this.$el.html(content);

    return this;
  },

  reserveItinerary: function (ev) {
    var data = $(".res-form form").serializeJSON();
    this.storeCurrUser(data.reservation.traveler_attributes.name);

    this.$el.addClass("loading");
    this.renderLoading();

    var that = this;
    this.itinerary.save(data, {
      success: function () {
        that.$el.removeClass("loading");
        that.renderConfirmation();
      },
      error: function () {
        that.$el.append(
          "<h2>Oops...there was an error processing your request</h2>"
        );
        setTimeout(function () {
          that.$el.removeClass("loading");
          that.closeResView();
        }, 2500);
      },
      type: "POST"
    });


  },

  storeCurrUser: function (name) {
    var ls = JSON.parse(localStorage.PuddleJumper);
    ls.currUsername = name;
    localStorage.PuddleJumper = JSON.stringify(ls);
  },

  validateForm: function (ev) {
    ev.preventDefault();
    this.reserveItinerary(ev);
  }

});
