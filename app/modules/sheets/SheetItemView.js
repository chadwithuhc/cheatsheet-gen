var View = require('core/View');
var template = require('./templates/ItemView');
var SheetEvents = require('./SheetEvents');

/**
 * Sheet Item View
 * @extends View
 */
var SheetItemView = View.extend({

	tagName: 'li',
	template: template,
	className: 'item',

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

	getSheetModelByEl: function (el) {
		var id = $(el).attr('data-sheet-id');
		return this.module.collection.get(id);
	},

	triggerEdit: function (e) {
		var model = this.getSheetModelByEl(e.currentTarget);
		this.app.trigger(SheetEvents.SHOW_EDIT_SHEET_FORM, model);
	},

	triggerRemove: function (e) {
		var model = this.getSheetModelByEl(e.currentTarget);
		this.app.trigger(SheetEvents.REMOVE_SHEET, [model]);
	},

	serialize: function () {
		return this.model.toJSON();
	}

});

module.exports = SheetItemView;
