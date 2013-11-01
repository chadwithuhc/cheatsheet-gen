var View = require('core/View');
var CollectionView = require('core/CollectionView');
var template = require('./templates/MenuView');
var SheetEvents = require('./SheetEvents');

/**
 * Sheet Menu Item View
 * A bootstrap menu item
 * @extends View
 */
var SheetMenuItemView = View.extend({

	tagName: 'li',
	template: _.template('<a href="#" data-gf-click="switchSheet"><%= title %></a>'),

	dataEvents: {
		'change model': 'render'
	},

	initialize: function () {
		// when we add a new sheet, we active it
		this.setActive();
	},

	setInactive: function () {
		this.$el.removeClass('active');
	},

	setActive: function () {
		this.$el.addClass('active');
	},

	serialize: function () {
		return this.model.toJSON();
	},

	switchSheet: function (e) {
		e.preventDefault();
		this.app.trigger(SheetEvents.SWITCH_TO_SHEET, this.model.get('id'));
	}

});


/**
 * Sheet Menu View
 * A bootstrap menu
 * @extends View
 */
var SheetMenuView = CollectionView.extend({

	id: 'menu',
	template: template,
	className: 'container',
	
	modelView: SheetMenuItemView,
	modelViewEl: '.nav-tabs',

	ui: {
		$nav: '.nav-tabs',
		$newSheet: '.new_sheet_btn'
	},

	events: {
		'click $newSheet': SheetEvents.triggerCb(SheetEvents.SHOW_ADD_SHEET_FORM)
	},

	appEvents: _.object([
		[SheetEvents.SWITCH_TO_SHEET, 'setActiveMenuItem']
	]),

	/**
	 * Sets all menu items to 'inactive' except passed id
	 * If no id is passed, all items will be set inactive
	 * @param {String} id
	 */
	setActiveMenuItem: function (id) {
		_.each(this.children, function (view) {
			if (view.model.get('id') === id) {
				view.setActive();
			} else {
				view.setInactive();
			}
		});
	},
	
	_onAdd: function (model) {debugger;
		var view = new this.ItemView({ model: model });
		this.setActiveMenuItem();
		view.attachTo(this.$nav, { method: 'prepend' });
		this.addChild(view);
	}

});


module.exports = SheetMenuView;
