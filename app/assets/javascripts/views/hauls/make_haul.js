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
		'click button#post-haul' : 'submit',
		'change input.file-upload-input': "retrieveCoverPhoto"
	},
	
	render: function(){
		var content = this.template({
			cUser: this.cUser
		});
		this.$el.html(content);
		return this;
	},
	
	retrieveCoverPhoto: function(event){
		var img = $('<img>');
		
		var that = this;
		var file = event.target.files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
			that.fileData = e.target.result;			
			img.attr('src', e.target.result);
			var canvas = that.$('#cover-preview')[0];
			var ctx = canvas.getContext('2d');		
			ctx.drawImage(img[0], 0, 0, 220, 220);
		}
		reader.readAsDataURL(file);
	},
	
	submit: function(event){
		event.preventDefault();
		$('button#post-haul').html('Posting...')
		var params = $(event.currentTarget.form).serializeJSON()['haul']
		var haul = new Hauler.Models.Haul({
			haul: {
				cover_photo: this.fileData,
				title: params.title,
				description: params.description,
				owner_id: params.owner_id
				
			}
			
			
		});
		var myHauls;
		Hauler.Collections.users.getOrFetch(this.cUser, function(user){
			myHauls = user.hauls();
			
		})
		
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