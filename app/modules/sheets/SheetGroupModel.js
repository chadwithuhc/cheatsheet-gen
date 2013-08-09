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
	}

});

module.exports = SheetGroupModel;
