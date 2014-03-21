Hauler.Views.HaulShow = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.listenTo(this.model, 'sync', this.render)
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
			haul: this.model
		})
		this.$el.html(content);
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
		var that = this;
		var file = event.target.files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
			that.fileData = e.target.result;			
		}
		reader.readAsDataURL(file);
	},
	
	submitHaulImage: function(event){
		event.preventDefault();
		console.log(this.fileData);
		
		var params = $(event.currentTarget.form).serializeJSON()['post_image']
		var postImage = new Hauler.Models.PostImage({
			post_image:{
				photo: this.fileData,
				haul_id: params.haul_id
			}
		});
		
		postImage.save({},{
			
			success: function(a,b,c){
				debugger
				console.log(a);
				console.log(b);
				console.log(c);
			},
			error: function(a,b,c){
				debugger
			}
		})
	}
	
})