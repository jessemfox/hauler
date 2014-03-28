Hauler.Views.SearchResults = Backbone.CompositeView.extend({
	
	
	initialize: function(){
		var that = this;
		searchResults.models.forEach(function(el){
			var subView = new Hauler.Views.SearchItem ({
				model: el
			});
			that.addSubview('ul', subView)
		})
	},
	
	template: JST['searches/show'],
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.renderSubviews();
		return this;
	},
	
});