var Events = require('core/Events');
var SheetsConfig = require('./SheetConfig');

/**
 * Module Events
 */

var SheetEvents = new Events({
	
	app: Giraffe.app,

	namespace: 'module:' + SheetsConfig.namespace,

	/**
	 * Show the Add Sheet form
	 */
	SHOW_ADD_SHEET_FORM: true,
	/**
	 * Show the Edit Sheet form
	 * @param {String} sheet_id
	 */
	SHOW_EDIT_SHEET_FORM: true,
	

	/**
	 * Add a sheet
	 * @param {SheetModel} model
	 */
	ADD_SHEET: true,
	/**
	 * Remove a sheet
	 * @param {SheetModel} model
	 */
	REMOVE_SHEET: true,
	/**
	 * Save the sheet to the collection, etc.
	 * @param {SheetModel} model
	 * @param {String} mode 
	 */
	SAVE_SHEET: true,

	
	/**
	 * Make the Form Sheet visible
	 */
	SHOW_FORM_SHEET: true,
	/**
	 * Hide the visibility of the Form Sheet
	 */
	HIDE_FORM_SHEET: true,


	/**
	 * Switch to a specific sheet in the UI
	 * @param {String} sheet_id
	 */
	SWITCH_TO_SHEET: true,
	/**
	 * Hides all the sheets on the page
	 */
	HIDE_ALL_SHEETS: true,
	/**
	 * Show a specific sheet
	 * @param {String} sheet_id
	 */
	SHOW_SHEET: true,
	/**
	 * Triggered when we delete all sheets
	 */
	NO_SHEETS_REMAIN: true,


	/**
	 * Add an item from a group
	 * @param {SheetItemModel} model
	 */
	ADD_ITEM: true,
	/**
	 * Remove an item from a group
	 * @param {SheetItemModel} model
	 */
	REMOVE_ITEM: true,
	/**
	 * Save an item to a group collection, etc.
	 * @param {SheetItemModel} model
	 * @param {String} mode
	 */
	SAVE_ITEM: true

});

module.exports = SheetEvents;
