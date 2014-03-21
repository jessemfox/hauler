Hauler.Collections.Hauls = Backbone.Collection.extend({

  model: Hauler.Models.Haul,
	url: '/haul',
	
	getOrFetch: function(id){
		var haul;
		var hauls = this;
		if(haul = this.get(id)){
			haul.fetch();
			return haul;
		} else{
			haul = new Hauler.Models.Haul({id: id});
			haul.fetch({
				success: function(){
					hauls.add(haul)
				}
			});
			return haul;
		}
	}

});

Hauler.Collections.hauls = new Hauler.Collections.Hauls();