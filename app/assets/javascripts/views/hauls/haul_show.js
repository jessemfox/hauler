Hauler.Views.HaulShow = Backbone.CompositeView.extend({
	
	initialize: function(options){
		this._cUser = options.cUser
		this.listenTo(this.model, 'sync', this.render)
		this.listenTo(this.model.postImages(), 'sync add', this.render)
		this.listenTo(this.model.products(), 'sync add', this.render)
		var that = this;
		
		this.model.postImages().forEach(function(img){
			
			var subView = new Hauler.Views.HaulImage ({
				model: img
			});
			that.addSubview('div.row', subView)
		})
		
		this.model.products().forEach(function(prod){
			
			var subView = new Hauler.Views.HaulProduct ({
				model: prod,
				owner: Hauler.Collections.users.get(that.model.get('owner_id'))
			});
			that.addSubview('div.row', subView)
		})
		
	},
	
	events: {
		'click button#add-post-image' : "showPostImageModal",
		'click button#add-product' : "showProductModal",
		'click button.close-mymodal' : "removeModal",
		'change input.file-upload-input': "retrieveFile",
		'click button#post-haul-image' : 'submitHaulImage',
		'click button#find-product' : 'findProduct',	
		'click img.prodPic' : 'selectPic',
		'click button#submit-product' : 'submitProduct'
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
	
	showProductModal: function(){
		var that = this;
		var productModal = JST['items/productForm']({
			haul: that.model.id
		});
		this.$el.append(productModal)
		$('#product-modal').modal();
		
	},
	
	putImgs: function(links){
		links.forEach(function(link){
			var lnk = $('<img src="' + link +'" height="220" width="220" class="prodPic">')
			$('.modal-body').append(lnk)
		});
		
	},
	
	putPrice: function(price){
		 
		var inp = $('<input type="text" id="productPrice" value="' + price[0] + '">')
		$('.modal-body').append(inp)
		
	},
	
	selectPic: function(event){
		$(event.currentTarget).toggleClass('select')
	},
	
	changeProductFormButton: function(){
		$('button#find-product').remove()
		var btn = $('<button id="submit-product" type="btn btn-primary" >')
		btn.html('Submit')
		$('.modal-footer').append(btn)
	},
	
	findProduct: function(event){
		var that = this;
		event.preventDefault();
		var data = {
			url: $('input#product-url').val()
		}
		
		$.ajax({
			type: 'POST',
	    url: '/product_parsers',
	    data: data,
	    dataType: 'json',
	    success: function( resp ) {
	      //console.log(resp[0])
				that.putPrice(resp[2])
				that.putImgs(resp[1])
				var url = $('<p class="prod-url">')
				url.attr('data-url',resp[0][0])
				$('.modal-body').append(url)
				
				that.changeProductFormButton()
	    }
		});
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
	
	retrieveProductFile: function(event){
		var img = $('.select')[0]
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
				var subView = new Hauler.Views.HaulImage({
					model: img
				})
				that.addSubview('div.row', subView)
				that.model.postImages().add(img)
				$('#postImage-modal').modal('hide');
				$('body').removeClass('modal-open')
				$('div.modal-backdrop').remove()
				
				// var subView = new Hauler.Views.HaulImage ({
// 					model: img
// 				});
// 				that.addSubview('div.row', subView);
				
			}

		})
		
		//that.showPostImage();
	},
	
	submitProduct: function(event){
		event.preventDefault();
		$('button#submit-product').html("Posting...")
		var that = this;
		var img = $('.select').first().attr('src')
		var url = $('.prod-url').data('url')
		var price = parseInt($('#productPrice').val().substring(1),10)
		var data = {
			url: url,
			image: img,
			price: price,
			haul_id: this.model.id,
			
		};
		
		$.ajax({
			type: 'POST',
	    url: '/product_parsers/encode',
	    data: data,
	    dataType: 'json',
	    success: function( resp ) {
	      //console.log(resp[0])
				var product = new Hauler.Models.Product(resp);
				var subView = new Hauler.Views.HaulProduct ({
					model: product,
					owner: Hauler.Collections.users.get(that.model.get('owner_id'))
				});
				that.addSubview('div.row', subView)
				that.model.products().add(product)
				$('#product-modal').modal('hide');
				$('body').removeClass('modal-open')
				$('div.modal-backdrop').remove()
	    }
		});
		
	}
	
})