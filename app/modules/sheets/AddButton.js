var View = require('core/View');
var template = require('./templates/AddButton');

/**
 * Add Button View
 * @extends View
 */
var AddButton = View.extend({

	tagName: 'label',
	template: template,
	
	serialize: function () {
		return this.options;
	}

});

module.exports = AddButton;
