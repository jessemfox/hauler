Hauler.Views.TrendShow = Backbone.CompositeView.extend({

	template: JST['hauls/trendShow'],
	
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render)
		var that = this;
		this.collection.models.forEach(function(el){
			
			var haulCover = new Hauler.Views.HaulCover({
				model: el,
				cUser: JSON.parse($('#bootstrapped-current-user').html()).id
			})
			that.addSubview('div.row', haulCover)
			
		});
	},

 
	
	render: function(){
		var content = this.template();
		
		this.$el.html(content)
		this.renderSubviews();
		return this;
		
	}

});
