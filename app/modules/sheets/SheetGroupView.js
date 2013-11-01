var View = require('core/View');
var template = require('./templates/GroupView');
var AddButton = require('./AddButton');
var SheetItemView = require('./SheetItemView');
var SheetItemFormView = require('./SheetItemFormView');
var SheetConfig = require('./SheetConfig');
var SheetEvents = require('./SheetEvents');
var BootstrapUtils = require('utils/BootstrapUtils');

/**
 * Sheet Group View
 * @extends View
 */
var SheetGroupView = View.extend({

	template: template,
	className: 'group',

	ui: {
		$wrapper: '.group-wrapper',
		$items: '.items'
	},
	
	colNumber: 0,
	
	initialize: function (options) {
		if (options) {
			this.setColNumber(options.column);
		}
	},

	/**
	 * Set current column number
	 * @param {Number} num
	 */
	setColNumber: function (num) {
		this.colNumber = num;
	},

	/**
	 * Get current column number
	 * @returns {number}
	 */
	getColNumber: function () {
		return this.colNumber;
	},

	serialize: function () {
		return this.model.toJSON();
	},

	/**
	 * Gets the `Backbone.Collection` of `SheetItemModel`s
	 * @returns {Backbone.Collection}
	 */
	getItems: function () {
		return this.model.get('items');
	},

	afterRender: function () {
		this.renderCols();
		this.renderItems();
		this.renderAddButton();
	},

	/**
	 * Adds the CSS class for bootstrap cols
	 */
	renderCols: function () {
		this.$el.addClass(BootstrapUtils.getColSpanClass(SheetConfig.COLS));
	},

	/**
	 * Renders each of the items in the model
	 */
	renderItems: function () {
		var items = this.getItems();
		if (items) {
			items.each(this.addItem, this);
		}
	},

	/**
	 * Add an Item to the group
	 * @param {SheetItemModel} model
	 */
	addItem: function (model) {
		// If model is not in collection yet, add it
		if (this.getItems().indexOf(model) === -1) {
			this.getItems().add(model);
		}
		
		var view = new SheetItemView({ model: model });
		view.attachTo(this.$items);
		this.addChild(view);
	},

	/**
	 * Renders the "Add Item" button
	 */
	renderAddButton: function () {
		var view = new AddButton({ label: 'Add Item' });
		
		view.attachTo(this.$wrapper);
		this.addChild(view);
	},

	/**
	 * Triggered when you click on "Add Item" button
	 */
	addButtonClick: function () {
		this.showAddForm();
	},

	/**
	 * Creates a new form and shows it
	 */
	showAddForm: function () {
		if (this.form && this.form.$el) {
			this.form.dispose();
		}
		
		this.form = new SheetItemFormView();
		this.attach(this.form);
		this.form.showForm();
	}

});

module.exports = SheetGroupView;
