Hauler.Views.ShowUser = Backbone.CompositeView.extend({
		
	initialize: function(options){
		this.user = options.user;
		var that = this;
		this.user.hauls().models.forEach(function(haul){
			var haulCover = new Hauler.Views.HaulCover({
				model: haul,
				cUser: JSON.parse($('#bootstrapped-current-user').html()).id
			})
			that.addSubview('div.row', haulCover)
		});
		
		
	},
	
	events:{
		"click button#follow-button" : 'processFollow',
		'click button#followers' : 'goToFollowers',
		'click button#followed-users' : 'goToFollowing',
		'click div.editable' : 'showPicModal',
		'change input.file-upload-input': "retrieveFile",
		'click button#post-haul-image' : 'submitHaulImage',
	},
	
	attributes: function(){
		return {
			
			'class' : 'user-div'
		}
	},
	
	
	following: function(){
		var that = this;
		var cUser = JSON.parse($('#bootstrapped-current-user').html()).id
		if (cUser === this.user.id){return false;}
		Hauler.Collections.users.getOrFetch(cUser, function(user){
			
			user.followedUsers().models.forEach(function(followed){
				
				if (followed.id === that.user.id) { 
					
					return true;}
			})
		})
		
		return false;
	},
	
	goToFollowers: function(){
		Backbone.history.navigate('/users/' + this.user.id + "/followers",
	{trigger: true} )
	},
	
	goToFollowing: function(){
		Backbone.history.navigate('/users/' + this.user.id + "/following",
	{trigger: true} )
	},
	
	
	processFollow: function(){
		if (this.following()){
			this.unfollow();
		} else{
			this.follow();
		}
	},
	
	follow: function(){
		var cUser = JSON.parse($('#bootstrapped-current-user').html()).id
		var data = {
			relationship: {
				follower_id: cUser,
				followed_id: this.user.id
			}
		};
		$.ajax({
			type: 'POST',
	    url: '/follows',
	    data: data,
	    dataType: 'json',
	    success: function( resp ) {
	      $('button#follow-button').html('Following')
	    }
		});
	},
	
	template: JST['users/show'],
	
	render: function(){
		var cUser = JSON.parse($('#bootstrapped-current-user').html()).id;
		var content = this.template({
			following: this.following(),
			user: this.user,
			cUser: cUser,
			hauls: this.user.hauls(),
			followers: this.user.followers(),
			followed_users: this.user.followedUsers()
			
		});
		this.$el.html(content);
		this.renderSubviews()
		if (this.user.id === cUser){
			this.$el.find('div.edit-pic-button').addClass('editable')
		}
		return this;
		
	},
	
	showPicModal: function(){
		var that = this;
		var imageModal = JST['items/editProfilePic']({
			user: that.user.id
		});
		this.$el.append(imageModal)
		$('#haulImage-modal').modal();
		
	},
	
	retrieveFile: function (event) {
		var img = $('<img>');
		
		var that = this;
		var file = event.target.files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
			that.fileData = e.target.result;			
			img.attr('src', e.target.result);
			var canvas = that.$('#pic-preview')[0];
			var ctx = canvas.getContext('2d');		
			ctx.drawImage(img[0], 0, 0, 220, 220);
		}
		reader.readAsDataURL(file);
	},
	
	showPostImage: function() {
		var user = this._cUser
		var newSquare = $('<div class="col-xs-4 square">')
		//fix this preview line (get it to copy the canvas and image to the page)
		var preview = this.$('#pic-preview').clone()[0]
		//.drawImage(this.fileData, 0, 0, 220, 220)
		
		newSquare.append(preview)
		var label = $('<div class="square-label"><span>' + user.escape('email') + "</span></div>")
		newSquare.append(label[0])
		$('div.row').append(newSquare[0])
		
		$('#haulImage-modal').modal('hide');
		$('div.modal-backdrop').remove()
	},
	
	submitHaulImage: function(event){
		event.preventDefault();
		$('button#post-haul-image').html("Posting...")
		var that = this;
		var data = {
			user: {
				photo:this.fileData
			}
		}
		
		$.ajax({
			type: 'PATCH',
	    url: '/change_pictures/' + this.user.id,
	    data: data,
	   	
	    success: function( resp ) {
				console.log(resp)
	      $('img.profile-picture').attr('src', resp)
				$('#postImage-modal').modal('hide');
				$('body').removeClass('modal-open')
				$('div.modal-backdrop').remove()
	    },
			error: function(a, b, c){
				debugger
			}
			
		});
	
	},
	
	
});