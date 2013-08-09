var View = require('core/View');
var template = require('./templates/GroupView');
var SheetItemView = require('./SheetItemView');

/**
 * Sheet Group View
 * @extends View
 */
var SheetGroupView = View.extend({

	template: template,
	className: 'groups',

	ui: {
		$items: '.items'
	},

	events: {
		//'dblclick $sheet': 'triggerEdit'
	},

	appEvents: _.object([
		//[SheetEvents.ADD_SHEET, 'addSheet'],
		//[SheetEvents.REMOVE_SHEET, 'removeSheet']
	]),

	initialize: function () {
		//this.collection.on('add remove change', this.render, this);
	},

	serialize: function () {
		return { name: this.model.get('name') }
	},

	afterRender: function () {
		this.renderItems();
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
