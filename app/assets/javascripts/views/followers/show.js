Hauler.Views.Followers = Backbone.View.extend({
	
	
	template: JST['followers/show'],
	
	render: function(){
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		return this;
	}
	
});