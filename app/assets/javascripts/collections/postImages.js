Hauler.Collections.PostImages = Backbone.Collection.extend({
	
	model: Hauler.Models.PostImageUrl,
	
	initialize: function(models, options){
		this.haul = options.haul;
	}
	
});