Hauler.Views.HaulImage = Backbone.View.extend({
	
	initialize: function(options){
		this.model = options.model;
		this.haul_id = this.model.get('haul')
		this._owner = Hauler.Collections.users.get(this.model.get('owner'));
	},
	
	attributes: function(){
		
		return {
			'data-haul' : this.model.id,
			'class' : 'col-xs-4 square'
		}
	},
	
	events: {
		// 'mouseover img' : 'showProductInfo'
	},
	
	template: JST['hauls/image'],
	
	
	// {
// 		debugger
// 		"data-haul" : "1",
// 		"class" : 'col-xs-4 square'
// 	},
	
	render: function(){
		var content = this.template({
			image: this.model,
			owner: this._owner
		});
		this.$el.html(content);
		return this;
		
	},
	
	showProductInfo: function(){
		
	}
	
})