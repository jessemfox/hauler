Hauler.Views.HaulProduct = Backbone.View.extend({
	
	initialize: function(options){
		this.model = options.model
		console.log(this.model)
		this.haul = options.haul;
		this._owner = Hauler.Collections.users.get(this.haul.get('owner_id'));
		
	},
	
	template: JST['hauls/product'],
	
	attributes: function(){
	
		return {
			'data-haul' : this.model.id,
			'class' : 'col-xs-4 square'
		}
	},
	
	render: function(){
		
		var content = this.template({
			product: this.model,
			owner: this._owner
		});
		this.$el.html(content);
		return this;
	}
	
	
});