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

	schema: {
		id: 'Hidden',
		title: 'Text',
		description: 'TextArea'
	}
	
});

module.exports = SheetModel;
