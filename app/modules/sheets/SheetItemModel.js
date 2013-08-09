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
	}

});

module.exports = SheetItemModel;
