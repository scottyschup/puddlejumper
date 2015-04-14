PuddleJumper.Models.Planet = Backbone.Model.extend({
  urlRoot: "api/planets",

  getAddressGlyphs: function () {
    var glyphNums = this.gate_address.split("-");
    var glyphImgUrls = [];
    _.each(glyphNums, function (num) {
      glyphImgUrls.push("<img src=assets/images/glyphs/" + num + ".gif");
    });

    return glyphImgUrls;
  }
});
