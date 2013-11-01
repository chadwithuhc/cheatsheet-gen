var View = require('core/View');
var template = require('./templates/ItemView');
var SheetEvents = require('./SheetEvents');
var SheetItemModel = require('./SheetItemModel');

/**
 * Sheet Item View
 * @extends View
 */
var SheetItemView = View.extend({

	tagName: 'dl',
	template: template,
	className: 'item',
	
	ui: {
		$title: '.item-name',
		$caption: '.item-caption'
	},
	
	events: {
		'click $title': 'toggleDisplay'
	},
	
	initialize: function () {
		
	},

	serialize: function () {
		return this.model.toJSON();
	},
	
	toggleDisplay: function () {
		this.$caption.slideToggle(100);
	}

});

module.exports = SheetItemView;
