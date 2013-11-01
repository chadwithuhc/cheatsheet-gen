var FormView = require('./FormView');
var SheetItemModel = require('./SheetItemModel');
var SheetEvents = require('./SheetEvents');

/**
 * Sheet Item Form View
 * @extends FormView
 */
var SheetItemFormView = FormView.extend({

	model: new SheetItemModel(),

	/**
	 * Override to set custom form title
	 * @returns {String}  "[Add|Edit] Sheet"
	 */
	getFormTitle: function () {
		return [this.mode, 'Item'].join(' ');
	},

	/**
	 * Submit the form by triggering an event with form values
	 * @param {Event} e
	 */
	submitForm: function (e) {
		e.preventDefault();
		this.saveForm(this.getFormValues(), this.mode);
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
			this.invoke('addItem', this.model); // Safe way of calling this.parent.addItem()
		}
	}

});

module.exports = SheetItemFormView;
