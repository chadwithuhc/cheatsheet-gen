var View = require('core/View');
var template = require('./templates/ItemView');
var SheetEvents = require('./SheetEvents');

/**
 * Sheet Item View
 * @extends View
 */
var SheetItemView = View.extend({

	tagName: 'dl',
	template: template,
	className: 'item',

	serialize: function () {
		return this.model.toJSON();
	}

});

module.exports = SheetItemView;
