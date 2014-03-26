Hauler.Collections.Users = Backbone.Collection.extend({

  model: Hauler.Models.User,
	url: '/api/users',
	
	parse: function(response){
		return response.users
	},
	
	getOrFetch: function(id, callback){
		var user;
		var users = this;
		if(user = this.get(id)){
			user.fetch({
				success: callback
			});
		} else{
			user = new Hauler.Models.User({id: id});
			user.fetch({
				
				success: function(){
					users.add(user)
					callback(user)
				}
			});
	
		}
	}

});

Hauler.Collections.users =  new Hauler.Collections.Users();
