var Module = require('core/Module');
var SheetModel = require('./SheetModel');
var SheetsCollection = require('./SheetsCollection');
var SheetMenuView = require('./SheetMenuView');
var SheetFormView = require('./SheetFormView');
var SheetView = require('./SheetView');
var SheetsContainer = require('./SheetsContainer');
var SheetEvents = require('./SheetEvents');
var SheetsConfig = require('./SheetConfig');
var SheetFixture = require('./SheetFixture');

/**
 * Sheets Module
 */
var Sheets = Module.extend({
	
	namespace: SheetsConfig.namespace,
	
	defaultSheet: {
		title: 'Example Sheet',
		description: 'This is an example sheet for you.'
	},
	
	routes: {
		'sheets/add-sheet': 'route:addSheet'
	},
	
	appEvents: _.object([
		
	]),

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
		
		// Append an additional sheet later on
		this.addInitializer(function () {
			var model = this.fixture.FullSheet();
			this.app.trigger(SheetEvents.ADD_SHEET, model);
		});

		this.start();
	},
	
	addViews: function () {
		this.collection = new SheetsCollection(this.defaultSheet);
		this.views.sheetsContainer = new SheetsContainer({ collection: this.collection });
		this.views.sheetMenuView = new SheetMenuView({ collection: this.collection });
		this.views.sheetFormView = new SheetFormView();

		this.attach(this.views.sheetFormView);
		this.attach(this.views.sheetMenuView);
		this.attach(this.views.sheetsContainer);
	},
	
});

module.exports = Sheets;
