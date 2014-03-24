Hauler.Collections.HaulProducts = Backbone.Collection.extend({
	
	model: Hauler.Models.Product,
	
	initialize: function(models, options){
		this.haul = options.haul;
	}
	
});