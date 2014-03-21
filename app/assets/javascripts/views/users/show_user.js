Hauler.Views.ShowUser = Backbone.CompositeView.extend({
	
	
	template: JST['users/show'],
	
	render: function(){
		var content = this.template({
			hauls: this.collection
		});
		this.$el.html(content);
		return this;
		
	}
	
});