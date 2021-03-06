var View = require('core/View');
var FormView = require('./FormView');
var SheetModel = require('./SheetModel');
var SheetEvents = require('./SheetEvents');

/**
 * Sheet Form View
 * @extends FormView
 */
var SheetFormView = FormView.extend({
	
	appEvents: _.object([
		[SheetEvents.SHOW_SHEET_FORM, 'showForm'],
		[SheetEvents.HIDE_SHEET_FORM, 'hideForm'],
		[SheetEvents.SHOW_ADD_SHEET_FORM, 'showAddForm'],
		[SheetEvents.SHOW_EDIT_SHEET_FORM, 'showEditForm'],
		[SheetEvents.SAVE_SHEET, 'saveForm']
	]),
	
	model: new SheetModel(),

	/**
	 * Temporary crutch until form is updated
	 */
	afterInitialize: function () {
		this.hideForm();
	},

	/**
	 * Override to set custom form title
	 * @returns {String}  "[Add|Edit] Sheet"
	 */
	getFormTitle: function () {
		return [this.mode, 'Sheet'].join(' ');
	},

	/**
	 * Submit the form by triggering an event with form values
	 * @param {Event} e
	 */
	submitForm: function (e) {
		e.preventDefault();
		this.app.trigger(SheetEvents.SAVE_SHEET, this.getFormValues(), this.options.mode);
		this.resetForm();
	},

	/**
	 * Save the form values
	 * @param {Object} model  The raw object values from the form
	 * @param {String} mode   The mode of the save, corresponding to `this.modes`
	 */
	saveForm: function (model, mode) {
		// Save edits
		if (mode === this.modes.EDIT) {
			this.module.collection.get(model.id).set(model);
		}
		// Save a new guy
		else if (mode === this.modes.ADD) {
			this.app.trigger(SheetEvents.ADD_SHEET, new SheetModel(model));
		}
	}

});

module.exports = SheetFormView;
