Hauler.Views.UserFeed = Backbone.CompositeView.extend({
	
	template: JST['users/feed'],
	
	render: function(){
		var content = this.template({
			user: this.model
		});
		
		this.$el.html(content);
		return this;
	}
	
	
	
});