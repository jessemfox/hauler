Hauler.Collections.SavedImages = Backbone.Collection.extend({
	
	model: Hauler.Models.PostImage,
	
	initialize: function(models, options){
		this.user = options.user
	}
	
})