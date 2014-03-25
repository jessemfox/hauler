Hauler.Views.HaulProduct = Backbone.View.extend({
	
	initialize: function(options){
		this.model = options.model
		
		// this.haul = options.haul;
		this._owner = options.owner
		
	},
	
	template: JST['hauls/product'],
	
	attributes: function(){
	
		return {
			'data-haul' : this.model.id,
			'class' : 'col-xs-4 square'
		}
	},
	
	events: {
		'click div.save' : 'saveProduct'
	},
	
	render: function(){
		
		var content = this.template({
			product: this.model,
			owner: this._owner
		});
		this.$el.html(content);
		return this;
	},
	
	saveProduct: function(event){
		var that = this;
		var data = {
			product_save: {
				user_id: JSON.parse($('#bootstrapped-current-user').html()).id,
				product_id: this.model.id	
			}
		}
		
		$.ajax({
			type: 'POST',
	    url: '/product_saves',
	    data: data,
	    dataType: 'json',
	    success: function( resp ) {
	     	console.log(resp)
				that._owner.savedProducts().add(that.model)
				console.log(that._owner.savedProducts())
	    }
		});
	}
	
	
});