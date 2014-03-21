Hauler.Collections.Hauls = Backbone.Collection.extend({

  model: Hauler.Models.Haul,
	url: '/haul',
	
	getOrFetch: function(id, callback){
		var haul;
		var hauls = this;
		if(haul = this.get(id)){
			haul.fetch({
				success: function(){
					callback(haul)
				}
			});
			
		} else{
			haul = new Hauler.Models.Haul({id: id});
			haul.fetch({
				success: function(){
					hauls.add(haul)
					callback(haul)
				}
			});
			
		}
	}

});

Hauler.Collections.hauls = new Hauler.Collections.Hauls();