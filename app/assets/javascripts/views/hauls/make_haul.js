Hauler.Views.MakeHaul = Backbone.View.extend({
	
	initialize: function(options){
		this.cUser = options.cUser
	},
	
	attributes: {
		'class' : 'modal fade make-haul',
		'role' : 'dialog',
		'tabindex' : '-1',
		'id' : "haul-modal",
		'aria-hidden': 'true'
	},
	
	template: JST['hauls/make'],
	
	events: {
		'click button#post-haul' : 'submit'
	},
	
	render: function(){
		var content = this.template({
			cUser: this.cUser
		});
		this.$el.html(content);
		return this;
	},
	
	submit: function(event){
		event.preventDefault();
	
		var params = $(event.currentTarget.form).serializeJSON()['haul']
		var haul = new Hauler.Models.Haul(params)
		var myHauls = Hauler.Collections.users.getOrFetch(this.cUser).hauls()
		
		haul.save({},{
			
			success: function(){
				myHauls.add(haul)
				Hauler.Collections.hauls.add(haul)
				$('#haul-modal').find('form').trigger('reset')
				$('#haul-modal').modal('hide');
				
				Backbone.history.navigate('hauls/' + haul.id, {trigger: true})
			}
		})
	}

	
	
});