var Model = require('core/Model');

/**
 * Sheet Item Model
 * @extends Model
 */
var SheetItemModel = Model.extend({

	defaults: {
		id: null,
		name: null,
		caption: null,
		order: null
	},
	
	schema: {
		id: 'Hidden',
		name: 'Text',
		caption: 'TextArea',
		order: 'Hidden'
	}

});

module.exports = SheetItemModel;
