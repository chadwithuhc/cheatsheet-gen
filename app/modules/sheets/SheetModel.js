var Model = require('core/Model');
var Collection = require('core/Collection');

/**
 * Sheet Model
 * @extends Model
 */
var SheetModel = Model.extend({

	defaults: {
		id: null,
		title: null,
		description: null,
		groups: null // Collection of SheetGroupModel
	},
	
	initialize: function () {
		//this.getGroups();
	},
	
	getGroups: function () {
		// return groups if defined
		var groups = this.get('groups');
		if (groups !== null) {
			return groups;
		}
		
		// Sheet ID required to get groups
		var id = this.get('id');
		if (id !== null) {
			this.groups = new Collection();
		}
	}
	
});

module.exports = SheetModel;
