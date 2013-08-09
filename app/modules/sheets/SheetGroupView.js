var View = require('core/View');
var template = require('./templates/GroupView');
var SheetItemView = require('./SheetItemView');
var SheetConfig = require('./SheetConfig');
var BootstrapUtils = require('utils/BootstrapUtils');

/**
 * Sheet Group View
 * @extends View
 */
var SheetGroupView = View.extend({

	template: template,
	className: 'group',

	ui: {
		$items: '.items'
	},
	
	colNumber: 0,
	
	initialize: function (options) {
		if (options) {
			this.setColNumber(options.column);
		}
	},
	
	setColNumber: function (num) {
		this.colNumber = num;
	},
	
	getColNumber: function () {
		return this.colNumber;
	},

	serialize: function () {
		return this.model.toJSON();
	},

	afterRender: function () {
		this.renderCols();
		this.renderItems();
	},
	
	renderCols: function () {
		this.$el.addClass(BootstrapUtils.getColSpanClass(SheetConfig.COLS));
	},

	renderItems: function () {
		var items = this.model.get('items');
		if (items) {
			items.each(function (model) {
				var view = new SheetItemView({ model: model });
				view.attachTo(this.$items);
				this.addChild(view);
			}, this);
		}
	}

});

module.exports = SheetGroupView;
