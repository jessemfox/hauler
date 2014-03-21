Hauler.Views.HaulShow = Backbone.CompositeView.extend({
	
	initialize: function(options){
		this._cUser = options.cUser
		this.listenTo(this.model, 'sync', this.render)
		this.listenTo(this.model.postImages(), 'sync', this.render)
		var that = this;
		
		this.model.postImages().forEach(function(img){
			
			var subView = new Hauler.Views.HaulImage ({
				model: img
			});
			that.addSubview('div.row', subView)
		})
	},
	
	events: {
		'click button#add-post-image' : "showPostImageModal",
		'click button.close-mymodal' : "removeModal",
		'change input.file-upload-input': "retrieveFile",
		'click button#post-haul-image' : 'submitHaulImage'		
	},
	
	template: JST['hauls/show'],
	
	render: function(){
		
		var content = this.template({
			haul: this.model,
			cUser: this._cUser
		})
		this.$el.html(content);
		this.renderSubviews()
		return this;
	},

	showPostImageModal: function(){
		var that = this;
		var imageModal = JST['items/imageForm']({
			haul: that.model.id
		});
		this.$el.append(imageModal)
		$('#haulImage-modal').modal();
		
	},
	
	removeModal: function(event){
		
		$('#haulImage-modal').remove();
		$('div.modal-backdrop').remove()
		
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
		var user = Hauler.Collections.users.getOrFetch(this._cUser)
		var newSquare = $('<div class="col-xs-4 square">')
		var preview = this.$('#pic-preview')[0]
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
		var params = $(event.currentTarget.form).serializeJSON()['post_image']
		var postImage = new Hauler.Models.PostImage({
			post_image:{
				photo: this.fileData,
				haul_id: params.haul_id
			}
		});
		
		postImage.save({},{
			
			
			success: function(a,response,c){
				
				var img = new Hauler.Models.PostImageUrl(response);
				that.model.postImages().push(img);
				// var subView = new Hauler.Views.HaulImage ({
// 					model: img
// 				});
// 				that.addSubview('div.row', subView);
				
			}

		})
		
		that.showPostImage();
	}
	
})