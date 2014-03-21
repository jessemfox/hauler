Hauler.Models.Haul = Backbone.Model.extend({
	urlRoot: '/hauls',
	
  parse: function (jsonResp) {
		
    if (jsonResp.postImages) {
      this.postImages().set(jsonResp.postImages);
      delete jsonResp.postImages;
    }
		
    return jsonResp;
  },
	
  postImages: function () {
    if (!this._postImages) {
      this._postImages = new Hauler.Collections.PostImages([], {
        haul: this
      });
    }

    return this._postImages;
  },
	
});
