var View = require('core/View');
var template = require('./templates/SheetView');
var SheetEvents = require('./SheetEvents');
var SheetGroupView = require('./SheetGroupView');

/**
 * Sheet View
 * @extends View
 */
var SheetView = View.extend({
	
	template: template,
	className: 'sheet',
	
	ui: {
		$groups: '.sheet-data'
	},
	
	events: {
		'dblclick': 'triggerEdit'
	},
	
	dataEvents: {
		'change model': 'render'
	},
	
	initialize: function (options) {
		this.$el.attr({ 'data-sheet-id': options.model.get('id') });
	},

	triggerEdit: function (e) {
		this.app.trigger(SheetEvents.SHOW_EDIT_SHEET_FORM, this.model);
	},

	triggerRemove: function (e) {
		this.app.trigger(SheetEvents.REMOVE_SHEET, [this.model]);
	},
	
	serialize: function () {
		return this.model.toJSON();
	},
	
	beforeRender: function () {
		// used to cache the views for reattachment
		// if they have not changed
		this.viewCache = _.clone(this.children);
	},
	
	afterRender: function () {
		this.renderGroups();
	},
	
	renderGroups: function () {
		// if the model has not changed,
		// we reattach the old views
		if (!this.model.hasChanged('groups')) {
			_.each(this.viewCache, this.attachGroup, this);
			return;
		}
		
		// generate new views
		var groups = this.model.get('groups');
		if (groups) {
			groups.each(function (model) {
				var view = new SheetGroupView({ model: model, disposeOnDetach: false });
				this.attachGroup(view);
			}, this);
		}
	},

	/**
	 * Attach a `SheetGroupView` to our Sheet
	 * @param {SheetGroupView} view
	 */
	attachGroup: function (view) {
		view.attachTo(this.$groups);
		this.addChild(view);
	}

});

module.exports = SheetView;
