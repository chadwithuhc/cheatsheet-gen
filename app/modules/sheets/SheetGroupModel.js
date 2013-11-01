var Model = require('core/Model');

/**
 * Sheet Group Model
 * @extends Model
 */
var SheetGroupModel = Model.extend({

	defaults: {
		id: null,
		name: null,
		order: null,
		items: null
	},
	
	schema: {
		id: 'Hidden',
		name: 'Text',
		order: 'Hidden'
	}

});

module.exports = SheetGroupModel;
