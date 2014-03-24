Hauler.Collections.Followers = Backbone.Collection.extend({
	
	model: Hauler.Models.User,
	
	initialize: function(models, options){
		this.user = options.user
	}
	
})