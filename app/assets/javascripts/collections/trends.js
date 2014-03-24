Hauler.Collections.Trends = Backbone.Collection.extend({

  model: Hauler.Models.Haul,
	url: '/trends',
	
	parse: function(response){
		return response.hauls
	}

});
