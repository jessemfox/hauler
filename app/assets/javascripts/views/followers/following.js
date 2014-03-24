Hauler.Views.Following = Backbone.View.extend({
	
	
	template: JST['followers/following'],
	
	render: function(){
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		return this;
	}
	
});