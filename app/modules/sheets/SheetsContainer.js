var CollectionView = require('core/CollectionView');
var template = require('./templates/SheetsContainer');
var SheetView = require('./SheetView');
var SheetEvents = require('./SheetEvents');

/**
 * Sheet Container View
 * ====================
 * Holds the container element for all Sheets
 * @extends View
 */
var SheetsContainer = CollectionView.extend({
	
	modelView: SheetView,

	template: template,
	className: 'container',

	appEvents: _.object([
		[SheetEvents.ADD_SHEET, 'addSheet'],
		[SheetEvents.REMOVE_SHEET, 'removeSheet'],
		[SheetEvents.HIDE_ALL_SHEETS, 'hideAllSheets'],
		[SheetEvents.SWITCH_TO_SHEET, 'switchToSheet']
	]),

	dataEvents: {
		'remove collection': 'activateFirstSheet'
	},

	/**
	 * Adds a Sheet to the collection  
	 * Automatically triggers `CollectionView`'s add which renders the new View
	 * @param {SheetModel} models
	 */
	addSheet: function (models) {
		this.app.trigger(SheetEvents.HIDE_ALL_SHEETS);
		this.collection.add(models);
	},

	/**
	 * Remove a Sheet from the collection  
	 * Automatically triggers `CollectionView`'s remove which `dispose()`'s the View
	 * @param models
	 */
	removeSheet: function (models) {
		this.collection.remove(models);
	},

	/**
	 * Hide all of the Sheets
	 */
	hideAllSheets: function () {
		_.each(this.children, function (view) {
			view.hide();
		});
	},

	/**
	 * Switches the Sheet view to a specific Sheet
	 * @param {String} id
	 */
	switchToSheet: function (id) {
		_.each(this.children, function (view) {
			if (view.model.get('id') === id) {
				view.show()
			} else {
				view.hide();
			}
		});
	},

	/**
	 * Activate the first Sheet in the collection (which is actually the last)
	 * If no Sheets exist, we will trigger an event for it
	 */
	activateFirstSheet: function () {
		var model = this.collection.at(this.collection.length - 1);
		if (!model) {
			this.app.trigger(SheetEvents.NO_SHEETS_REMAIN);
		} else {
			this.app.trigger(SheetEvents.SWITCH_TO_SHEET, model.get('id'));
		}
	}

});

module.exports = SheetsContainer;
