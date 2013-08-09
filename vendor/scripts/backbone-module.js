Backbone.Module = function(options) {
	_.extend(this, options || {});
	this.mid = _.uniqueId('m');
	this.initialize.apply(this, arguments);
};

_.extend(Backbone.Module.prototype, {
	
	namespace: 'modules',

	initialize: function(){},
	
});

//Backbone.Module.extend = Backbone.Model.extend;
