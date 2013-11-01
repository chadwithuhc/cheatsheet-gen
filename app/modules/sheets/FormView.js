var View = require('core/View');
var template = require('./templates/FormView');
var SheetEvents = require('./SheetEvents');

/**
 * Form View
 * @extends View
 */
var FormView = View.extend({

	template: template,
	tagName: 'form',

	modes: {
		EDIT: 'Edit',
		ADD: 'Add'
	},
	
	mode: null,
	
	ui: {
		$fields: '.fields'
	},

	/**
	 * Setup bindings for model changes
	 */
	initialize: function (options) {
		options || (options = {});
		this.mode = this.modes.ADD;
		
		// TODO: Change form so it is not reused.
		//       Create and dispose on form generation and submission.
		this.model.on('change', function() {
			_.each(this.model.attributes, function (value, name) {
				this.form.setValue(name, value);
			}, this);
		}, this);
		this.generate();
	},

	/**
	 * Generate the form and attach to `this.form`
	 */
	generate: function () {
		this.form = new Backbone.Form({ model: this.model }).render();
	},

	/**
	 * Clears the form of values and hides
	 */
	resetForm: function () {
		this.hideForm();
		this.model && this.model.reset(); // generate a blank model to empty form fields
		this.mode = this.modes.ADD;
		this.render();
	},

	/**
	 * Submit the form
	 */
	submitForm: function () {
		
	},

	/**
	 * Save the form values
	 * @param {Object} model  The raw object values from the form
	 * @param {String} mode   The mode of the save, corresponding to `this.modes`
	 */
	saveForm: function (model, mode) {
		
	},

	/**
	 * Create and show the Add form
	 */
	showAddForm: function () {
		this.mode = this.modes.ADD;
		this.resetForm();
		this.showForm();
	},

	/**
	 * Create and show the Edit form
	 * @param {Model} model
	 */
	showEditForm: function (model) {
		this.mode = this.modes.EDIT;
		this.model.set(model.toJSON());
		this.render();
		this.showForm();
	},

	/**
	 * Hide the form with `.hide()`
	 */
	hideForm: function () {
		this.$el.hide();
	},

	/**
	 * Show the form with `.show()`
	 */
	showForm: function () {
		this.$el.show();
	},

	/**
	 * Cancel form submission
	 */
	cancelForm: function () {
		this.resetForm();
	},

	/**
	 * Appends the form generated
	 * Every time in case the model changes
	 */
	afterRender: function () {
		this.$fields.empty().append(this.form.$el);
	},

	/**
	 * Get the title of the form (<legend>)
	 * @returns {String}
	 */
	getFormTitle: function () {
		return this.options.title;
	},

	/**
	 * Get the latest values from the form
	 * @returns {Object}
	 */
	getFormValues: function () {
		this.form.commit();
		return this.values = this.model.toJSON();
	},

	/**
	 * Serializes the data specifically for the `FormView` template
	 * @returns {{title: String, model: Object, mode: String}}
	 */
	serialize: function () {
		return { title: this.getFormTitle(), model: this.model.toJSON(), mode: this.mode };
	}

});

module.exports = FormView;
