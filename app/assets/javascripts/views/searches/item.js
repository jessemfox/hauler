Hauler.Views.SearchItem = Backbone.View.extend({
	
	template: JST["searches/item"],
	
	tagName: 'li',
	
	render: function(){
		var content = this.template({
			result: this.model
		});
		this.$el.html(content);
		return this;
	}
	
	
});