Hauler.Views.TrendShow = Backbone.CompositeView.extend({

	template: JST['hauls/trendShow'],
	
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render)
		var that = this;
		this.collection.forEach(function(el){
			
			
			var subView = new Hauler.Views.HaulImage ({
				model: el
			});
			that.addSubview('div', subView)
			
		});
	},

 
	
	render: function(){
		var content = this.template();
		
		this.$el.html(content)
		this.renderSubviews();
		return this;
		
	}

});
