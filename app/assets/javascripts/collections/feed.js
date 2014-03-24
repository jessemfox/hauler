Hauler.Collections.Feed = Backbone.Collection.extend({
	
	model: Hauler.Models.Haul,
	
	url: function(){
		return this.user.url() + "/feeds"
	
	},
	
  initialize: function (models, options) {
    this.user = options.user;
  },
	
	parse: function(response){
		return response.hauls
	}
	
});