Hauler.Models.User = Backbone.Model.extend({
	
	urlRoot: '/users',
	
	parse: function(response){
		
		if (response.hauls){
			this.hauls().set(response.hauls)
			delete response.hauls
		} else if( response.followers) {
			this.followers().set(response.followers)
			delete response.followers
			
		} else if( response.followed_users) {
			this.followedUsers().set(response.followed_users)
			delete response.followed_users
		
		} else if( response.saved_hauls) {
			this.savedHauls().set(response.saved_hauls)
			delete response.saved_hauls
		}
		
		return response
	},
	
	hauls: function(){
		if(!this._hauls){
			this._hauls = new Hauler.Collections.MyHauls([],{
				user: this
			});
		}
		return this._hauls
	},
	//ask a question about this!!
	followers: function(){
		if(!this._followers){
			//ask how to do followers
			this._followers = new Hauler.Collections.Followers([],{
				user: this
			});
		}
		return this._followers
	},
	
	savedHauls: function(){
		if(!this._savedHauls){
			//ask how to do followers
			this._savedHauls = new Hauler.Collections.SavedHauls([],{
				user: this
			});
		}
		return this._savedHauls
	},
	
	followedUsers: function(){
		if(!this._followedUsers){
			//ask how to do followers
			this._followedUsers = new Hauler.Collections.FollowedUsers([],{
				user: this
			});
		}
		return this._followedUsers
	},
	
	
});