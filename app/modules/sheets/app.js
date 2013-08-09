var Module = require('core/Module');
var SheetModel = require('./SheetModel');
var SheetsCollection = require('./SheetsCollection');
var SheetFormView = require('./SheetFormView');
var SheetView = require('./SheetView');
var SheetsContainer = require('./templates/Container');
var SheetEvents = require('./SheetEvents');
var SheetsConfig = require('./SheetConfig');
var SheetFixture = require('./SheetFixture');

/**
 * Sheets Module
 */
var Sheets = Module.extend({
	
	namespace: SheetsConfig.namespace,
	
	className: 'container',
	template: SheetsContainer,
	
	defaultSheet: {
		title: 'Example Sheet',
		description: 'This is an example sheet for you.'
	},
	
	routes: {
		'sheets/add-sheet': 'route:addSheet'
	},
	
	appEvents: _.object([
		[SheetEvents.ADD_SHEET, 'addSheet'],
		[SheetEvents.REMOVE_SHEET, 'removeSheet']
	]),
	
	ui: {
		$addSheet: '.addSheetBtn'
	},
	
	events: {
		'click $addSheet': App.triggerEvent(SheetEvents.SHOW_ADD_SHEET_FORM)
	},
	
	dataEvents: {
		'add collection': 'attachSheet',
		'remove collection': 'detachSheet'
	},

	initialize: function (options) {
		// Attach to the App
		this.attachTo(this.app);
		
		this.views = {};
		this.collections = {};
		
		// Temporary fixture data
		if (options.useFixture) {
			this.addInitializer(function () {
				this.fixture = new SheetFixture();
				this.defaultSheet = this.fixture.FullSheet();
			});
		}
		
		// Append the views on initialize
		this.addInitializer(this.addViews);

		this.start();
	},
	
	addViews: function () {
		this.views.sheetFormView = new SheetFormView();
		this.collection = new SheetsCollection(this.defaultSheet);

		this.attach(this.views.sheetFormView);
		this.collection.each(this.attachSheet, this);
	},
	
	attachSheet: function (model) {
		var view = new SheetView({ model: model });
		this.attach(view);
	},

	detachSheet: function () {
		
	},
	
	addSheet: function (models) {
		this.collection.add(models);
	},
	
	removeSheet: function (models) {
		this.collection.remove(models);
	}
	
});

module.exports = Sheets;
