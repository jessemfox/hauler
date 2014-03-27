window.Hauler = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		
    
		Hauler.Collections.users.fetch({
			complete: function(xhr, textStatus) {
			    
				
					var router =  new Hauler.Routers.Hauls();
					router.bind('all', function(route, action) {
						
						toggleNavBar(action)
					});
					$('#search-button').on('click', function(){
						window.search()
					});
					
					
					Backbone.history.start()
					
				}
		})
		
		
  }
};

toggleNavBar = function(action){
	if(action === 'saves'){
		
		$('li.nav.active').toggleClass('active');
		$('li.nav.save').toggleClass('active');
	}
	
	if(action === 'trendShow'){
		
		$('li.nav.active').toggleClass('active');
		$('li.nav.trends').toggleClass('active');
	}
	
	if(action === 'currentUserFeed'){
		
		$('li.nav.active').toggleClass('active');
		$('li.nav.feed').toggleClass('active');
	}
	
};

search = function(){
	var str = $('#search-bar').first().val();
	var data = {
		search: {string: str }
	};
	$.ajax({
		type: 'GET',
    url: '/searches',
    data: data,
    dataType: 'json',
    success: function( resp ) {
     	console.log(resp)
		}
	});
};

Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    selectorSubviews.push(subview);
		
    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);

    // remove all subviews as well
    _(this.subviews()).each(function (selectorSubviews, selector) {
      _(selectorSubviews).each(function (subview){
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubviews: function () {
    var view = this;
    
    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function (subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      });
    });
  },

  subviews: function () {
    if (!this._subviews) {
      this._subviews = {};
    }

    return this._subviews;
  }
});
