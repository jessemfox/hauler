Hauler.Routers.Hauls = Backbone.Router.extend({

	routes: {
		'' : 'currentUserFeed',
		'trending' : 'trendShow',
		'postHaul' : 'postHaul',
		'hauls/:id' : 'showHaul',
		'users/:id' : 'userProfile',
		'users/:id/followers' : 'followList',
		'users/:id/following' : "followingList",
		'saves' : 'saves'
	},
	//fix this!!! for now i'm defaulting to userProfile
	currentUserFeed: function(){
		var that = this;
		var current_user_id = JSON.parse($('#bootstrapped-current-user').html()).id
		var user = Hauler.Collections.users.get(current_user_id)
		
		var feed = new Hauler.Collections.Feed([],{ user: user })
		
		feed.fetch({
			success: function(){
				var view = new Hauler.Views.UserFeed({
					collection: feed
				});
				
				that._swapView(view)
			}
		})
		
		// var user = Hauler.Collections.users.getOrFetch(current_user_id, function(user){
// 			var view = new Hauler.Views.UserFeed({
// 				model: user
// 			})
// 			
// 			that._swapView(view)
// 		})
		
		
		
	},
	
	saves: function(){
		var that = this;
		var current_user_id = JSON.parse($('#bootstrapped-current-user').html()).id
		Hauler.Collections.users.getOrFetch(current_user_id, function(user){
			var view = new Hauler.Views.UserSaves({
				model: user
			});
			
			that._swapView(view);
		});
		
	},
	
	followList: function(id) {
		var that = this;
		Hauler.Collections.users.getOrFetch(id, function(user){
			
			var view = new Hauler.Views.Followers({
				model: user
			});
			
			that._swapView(view)
		});
	},
	
	followingList: function(id) {
		var that = this;
		Hauler.Collections.users.getOrFetch(id, function(user){
			
			var view = new Hauler.Views.Following({
				model: user
			});
			
			that._swapView(view)
		});
	},
	
	
	userProfile: function(id){
		var that = this;
		Hauler.Collections.users.getOrFetch(id, function(user){
			
			var view = new Hauler.Views.ShowUser({
				user: user
			});
			
			that._swapView(view)
		});
		
	},
	
	trendShow: function(){
		var trends = new Hauler.Collections.Trends();
		
		
		var that = this;
		trends.fetch({
			success: function(){
				var view = new Hauler.Views.TrendShow({
					collection: trends
				});
				
				that._swapView(view) 
			}
		});

	},
	
	postHaul: function(){
		var current_user_id = JSON.parse($('#bootstrapped-current-user').html()).id
		
		var view = new Hauler.Views.MakeHaul({
			cUser: current_user_id
		});
		$('div#content').append(view.render().$el)
		
		$('#haul-modal').modal();
	},
	
	showHaul: function(id){
		var current_user_id = JSON.parse($('#bootstrapped-current-user').html()).id
		var that = this;
		Hauler.Collections.hauls.getOrFetch(id, function(haul){
			var view = new Hauler.Views.HaulShow({
				model: haul,
				cUser: Hauler.Collections.users.get(current_user_id)
			});
			
			that._swapView(view)
			
		});
		
	},
	
	
	_swapView: function(view){
		if (this._currentView){
			this._currentView.remove();
		};
		this._currentView = view;
		
		$('div#content').append(view.render().$el)
		
	}

});
