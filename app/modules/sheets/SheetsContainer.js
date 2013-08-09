var View = require('core/View');
var template = require('./templates/SheetsContainer');
var SheetView = require('./SheetView');
var SheetEvents = require('./SheetEvents');

/**
 * Sheet Container View
 * ====================
 * Holds the container element for all Sheets
 * @extends View
 */
var SheetsContainer = View.extend({

	template: template,
	className: 'container',

	appEvents: _.object([
		[SheetEvents.ADD_SHEET, 'addSheet'],
		[SheetEvents.REMOVE_SHEET, 'removeSheet'],
		[SheetEvents.HIDE_ALL_SHEETS, 'hideAllSheets'],
		[SheetEvents.SWITCH_TO_SHEET, 'switchToSheet'],
	]),

	dataEvents: {
		'add collection': 'attachSheet',
		'remove collection': 'detachSheet'
	},

	initialize: function () {
		this.render();
		this.collection.each(this.attachSheet, this);
	},

	attachSheet: function (model) {
		var view = new SheetView({ model: model });
		this.attach(view);
	},

	detachSheet: function (model) {
		var detached = _.filter(_.clone(this.children), function (view) {console.log('detachSheet',view,this.children);
			if (view.model === model) {
				view.dispose();
				return true;
			}
		}, this);
		this.activateFirstSheet();
	},

	addSheet: function (models) {
		this.app.trigger(SheetEvents.HIDE_ALL_SHEETS);
		this.collection.add(models);
	},

	removeSheet: function (models) {
		this.collection.remove(models);
	},
	
	hideAllSheets: function () {
		_.each(this.children, function (view) {
			view.hide();
		});
	},
	
	switchToSheet: function (id) {
		_.each(this.children, function (view) {
			if (view.model.get('id') === id) {
				view.show()
			} else {
				view.hide();
			}
		});
	},

	activateFirstSheet: function () {
		var model = this.collection.at(0);
		if (!model) {
			this.app.trigger(SheetEvents.NO_SHEETS_REMAIN);
		} else {
			this.app.trigger(SheetEvents.SWITCH_TO_SHEET, model.get('id'));
		}
	}

});

module.exports = SheetsContainer;
