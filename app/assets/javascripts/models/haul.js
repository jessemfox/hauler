Hauler.Models.Haul = Backbone.Model.extend({
	urlRoot: '/hauls',
	
  parse: function (jsonResp) {
		
    if (jsonResp.postImages) {
      this.postImages().set(jsonResp.postImages);
      delete jsonResp.postImages;
    }
		
		if (jsonResp.products){
			
			this.products().set(jsonResp.products)
			delete jsonResp.products
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
	
  products: function () {
    if (!this._products) {
      this._products = new Hauler.Collections.HaulProducts([], {
        haul: this
      });
    }
		

    return this._products;
  },
	
});
