Hauler.Models.User = Backbone.Model.extend({
	
	urlRoot: '/api/users',
	
	parse: function(response){
		
		
		
		if (response.hauls){
			this.hauls().set(response.hauls)
			delete response.hauls
		}
		if( response.followers) {
			this.followers().set(response.followers)
			delete response.followers
			
		} 
		if( response.followed_users) {
			this.followedUsers().set(response.followed_users)
			delete response.followed_users
		
		} 
		if( response.saved_products) {
			this.savedProducts().set(response.saved_products)
			delete response.saved_products
		}
		if( response.saved_images) {
			this.savedImages().set(response.saved_images)
			delete response.saved_images
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
	
	savedProducts: function(){
		if(!this._savedProducts){
			//ask how to do followers
			this._savedProducts = new Hauler.Collections.SavedProducts([],{
				user: this
			});
		}
		return this._savedProducts
	},
	
	savedImages: function(){
		if(!this._savedImages){
			//ask how to do followers
			this._savedImages = new Hauler.Collections.SavedImages([],{
				user: this
			});
		}
		return this._savedImages
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