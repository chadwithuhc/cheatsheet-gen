var View = require('core/View');
var template = require('./templates/FormView');
var SheetModel = require('./SheetModel');
var SheetEvents = require('./SheetEvents');

/**
 * Sheet View
 * @extends View
 */
var SheetFormView = View.extend({

	template: template,
	tagName: 'form',
	
	modes: {
		EDIT: 'Edit',
		ADD: 'Add'
	},
	
	appEvents: _.object([
		[SheetEvents.SHOW_SHEET_FORM, 'showForm'],
		[SheetEvents.HIDE_SHEET_FORM, 'hideForm'],
		[SheetEvents.SHOW_ADD_SHEET_FORM, 'addForm'],
		[SheetEvents.SHOW_EDIT_SHEET_FORM, 'editForm'],
		[SheetEvents.SAVE_SHEET, 'saveForm']
	]),
	
	initialize: function (options) {
		if (options && options.data) {
			this.generateModel(options.data);
		}
		else {
			this.generateModel();
		}
	},

	/**
	 * Generate a new model with supplied data,
	 * then assign to `this.model`
	 * @param {Object} data  Data for `SheetModel`
	 * @returns {SheetModel}
	 */
	generateModel: function (data) {
		return this.model = new SheetModel(data);
	},

	/**
	 * Clears the form of values and hides
	 */
	resetForm: function () {
		this.hideForm();
		this.generateModel(); // generate a blank model to empty form fields
		this.options.mode = this.modes.ADD;
		this.render();
	},

	/**
	 * Submit the form by triggering an event with form values
	 * @param {Event} e
	 */
	submitForm: function (e) {
		e.preventDefault();
		this.app.trigger(SheetEvents.SAVE_SHEET, this.$el.serializeObject(), this.options.mode);
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
	},

	/**
	 * Create and show the Add form
	 */
	addForm: function () {
		this.options.mode = this.modes.ADD;
		this.resetForm();
		this.showForm();
	},

	/**
	 * Create and show the Edit form
	 * @param {SheetModel} model
	 */
	editForm: function (model) {
		this.options.mode = this.modes.EDIT;
		this.model = model;
		this.render();
		this.showForm();
	},

	hideForm: function () {
		this.$el.hide();
	},

	showForm: function () {
		this.$el.show();
	},
	
	cancelForm: function (e) {
		e.preventDefault();
		this.resetForm();
	},
	
	beforeRender: function () {
		this.hideForm();
	},
	
	serialize: function () {
		return _.extend(this.model.toJSON(), { mode: this.options.mode });
	}

});

module.exports = SheetFormView;
