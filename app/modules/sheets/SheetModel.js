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
		if (!this.get('id')) {
			this.set('id', _.uniqueId('id'));
		}
	},
	
});

module.exports = SheetModel;
