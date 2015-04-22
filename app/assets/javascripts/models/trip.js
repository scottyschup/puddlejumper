PuddleJumper.Models.Trip = Backbone.Model.extend({
  urlRoot: 'api/trip',

  parse: function (response) {
    this.origin = PuddleJumper.planets.get(response.origin_id);
    this.destination = PuddleJumper.planets.get(response.destination_id);
    delete response.origin_id;
    delete response.destination_id;

    return response;
  },
});
