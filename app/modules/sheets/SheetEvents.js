var Events = require('core/Events');
var SheetsConfig = require('./SheetConfig');

/**
 * Module Events
 */

var SheetEvents = new Events({

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
	 * @param {String} sheet_id
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

});

module.exports = SheetEvents;
