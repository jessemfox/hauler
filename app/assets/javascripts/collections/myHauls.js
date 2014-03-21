Hauler.Collections.MyHauls = Backbone.Collection.extend({

  model: Hauler.Models.Haul,
	url: function(){
		return this.user.url() + "/user_hauls"
	
	},
	
  initialize: function (models, options) {
    this.user = options.user;
  }

});