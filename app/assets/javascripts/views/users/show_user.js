Hauler.Views.ShowUser = Backbone.CompositeView.extend({
		
	initialize: function(options){
		this.user = options.user;
		var that = this;
		this.user.hauls().models.forEach(function(haul){
			var haulCover = new Hauler.Views.HaulCover({
				model: haul,
				cUser: JSON.parse($('#bootstrapped-current-user').html()).id
			})
			that.addSubview('div.row', haulCover)
		});
		
	},
	
	events:{
		"click button#follow-button" : 'processFollow',
		'click button#followers' : 'goToFollowers',
		'click button#followed-users' : 'goToFollowing'
		
	},
	
	attributes: function(){
		return {
			
			'class' : 'user-div'
		}
	},
	
	following: function(){
		var that = this;
		var cUser = JSON.parse($('#bootstrapped-current-user').html()).id
		if (cUser === this.user.id){return false;}
		Hauler.Collections.users.getOrFetch(cUser, function(user){
			
			user.followedUsers().models.forEach(function(followed){
				
				if (followed.id === that.user.id) { 
					
					return true;}
			})
		})
		
		return false;
	},
	
	goToFollowers: function(){
		Backbone.history.navigate('/users/' + this.user.id + "/followers",
	{trigger: true} )
	},
	
	goToFollowing: function(){
		Backbone.history.navigate('/users/' + this.user.id + "/following",
	{trigger: true} )
	},
	
	
	processFollow: function(){
		if (this.following()){
			this.unfollow();
		} else{
			this.follow();
		}
	},
	
	follow: function(){
		var cUser = JSON.parse($('#bootstrapped-current-user').html()).id
		var data = {
			relationship: {
				follower_id: cUser,
				followed_id: this.user.id
			}
		};
		$.ajax({
			type: 'POST',
	    url: '/follows',
	    data: data,
	    dataType: 'json',
	    success: function( resp ) {
	      $('button#follow-button').html('Following')
	    }
		});
	},
	
	template: JST['users/show'],
	
	render: function(){
		
		var content = this.template({
			following: this.following(),
			user: this.user,
			cUser: JSON.parse($('#bootstrapped-current-user').html()).id,
			hauls: this.user.hauls(),
			followers: this.user.followers(),
			followed_users: this.user.followedUsers()
			
		});
		this.$el.html(content);
		this.renderSubviews()
		return this;
		
	}
	
});