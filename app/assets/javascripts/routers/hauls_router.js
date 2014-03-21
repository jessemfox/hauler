Hauler.Routers.Hauls = Backbone.Router.extend({

	routes: {
		'' : 'currentUserFeed',
		'trending' : 'trendShow',
		'postHaul' : 'postHaul',
		'hauls/:id' : 'showHaul',
		'users/:id' : 'userProfile'
	},
	
	currentUserFeed: function(){
		var current_user_id = JSON.parse($('#bootstrapped-current-user').html()).id
		var user = Hauler.Collections.users.getOrFetch(current_user_id)
	
		var view = new Hauler.Views.UserFeed({
			model: user
		})
		this._swapView(view)
		
	},
	
	userProfile: function(id){
		var user = Hauler.Collections.users.getOrFetch(id);
		var userHauls = new Hauler.Collections.MyHauls({
			user: user
		})
		var that = this;
		userHauls.fetch({
			success: function(){
				var view = new Hauler.Views.UserShow({
					collection: userHauls
				});
				that._swapView(view);
			}
		})
		
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
				cUser: current_user_id
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
