Hauler.Views.UserFeed = Backbone.CompositeView.extend({
	
	initialize: function(options){
		
		var that = this;
		var hauls = this.collection.models
		
		hauls.forEach(function(haul){
			
			var haulCover = new Hauler.Views.HaulCover({
				model: haul,
				cUser: that.collection.user
			})
			that.addSubview('div.row', haulCover)
		});
		
	},
	
	template: JST['users/feed'],
	
	render: function(){
	
		var content = this.template({
			user: this.collection.user
		});
		
		this.$el.html(content);
		this.renderSubviews()
		return this;
	}
	
	
	
});