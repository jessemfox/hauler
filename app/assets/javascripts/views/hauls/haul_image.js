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
		'click div.save' : 'saveImage',
		
	},
	
	template: JST['hauls/image'],
	
	
	// {
// 		debugger
// 		"data-haul" : "1",
// 		"class" : 'col-xs-4 square'
// 	},
	
	render: function(){
		if(!this._owner){debugger}
		var content = this.template({
			image: this.model,
			owner: this._owner
		});
		this.$el.html(content);
		return this;
		
	},
	
	
	
	saveImage: function(event){
		var that = this;
		var data = {
			image_save: {
				user_id: JSON.parse($('#bootstrapped-current-user').html()).id,
				post_image_id: this.model.id	
			}
		}
		
		$.ajax({
			type: 'POST',
	    url: '/image_saves',
	    data: data,
	    dataType: 'json',
	    success: function( resp ) {
	      
				that._owner.savedImages().add(that.model)
	    }
		});
	}
	
})