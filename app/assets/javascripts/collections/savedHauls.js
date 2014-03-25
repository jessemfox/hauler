Hauler.Collections.SavedProducts = Backbone.Collection.extend({
	
	model: Hauler.Models.Product,
	
	initialize: function(models, options){
		this.user = options.user
	}
	
})