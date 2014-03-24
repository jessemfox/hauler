Hauler.Views.HaulCover = Backbone.View.extend({
	
	initialize: function(options){
		this.cUserId = options.cUser
	},
	
	template: JST['hauls/cover'],
	
	attributes: function(){
		
		return {
			'data-haul' : this.model.id,
			'class' : 'col-xs-4 haul-cover'
		}
	},
	
	render: function(){
		
		var content = this.template({
			haul: this.model,
			cUser: this.cUserId
		});
		this.$el.html(content);
		return this;
	}
	
})