Hauler.Collections.Users = Backbone.Collection.extend({

  model: Hauler.Models.User,
	url: '/users',
	
	getOrFetch: function(id){
		var user;
		var users = this;
		if(user = this.get(id)){
			user.fetch();
			return user;
		} else{
			user = new Hauler.Models.User({id: id});
			user.fetch({
				success: function(){
					users.add(user)
				}
			});
			return user;
		}
	}

});

Hauler.Collections.users =  new Hauler.Collections.Users();
