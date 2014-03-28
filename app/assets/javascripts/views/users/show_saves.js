Hauler.Views.UserSaves = Backbone.CompositeView.extend({
	
	
	initialize: function(options){
		this.model = options.model;
		var that = this;
		
		this.model.savedImages().forEach(function(img){
			
			var subView = new Hauler.Views.HaulImage ({
				model: img
			});
			that.addSubview('div.row', subView)
		});
		
		this.model.savedProducts().forEach(function(prod){
			
			var subView = new Hauler.Views.HaulProduct ({
				model: prod,
				owner: Hauler.Collections.users.get(prod.get('owner'))
			});
			that.addSubview('div.row', subView)
		})
		
	},
	
	
	template: JST['users/saves'],
	
	
	render: function(){
		var content = this.template({
			user: this.model
		});
		this.$el.html(content)
		this.renderSubviews()
		
		this.$el.find('.save').remove()
		this.$el.find('.tag').remove()
		return this;
	},
	
	
	
});