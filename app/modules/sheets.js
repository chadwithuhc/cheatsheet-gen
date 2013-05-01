define([
	'app',
	'modules/ui',
	'modules/groups'
],

function(app, UI, Groups) {

	// Create a new module.
	var Sheets = window.Sheets = app.module();

	// Default Model.
	Sheets.Model = Backbone.RelationalModel.extend({
		defaults: {
			title: null,
			description: null,
			order: 0
		},
		relations: [
			{
				type: 'HasMany',
				key: 'groups',
				relatedModel: 'Groups.Model',
				collectionType: 'Groups.Collection'
			}
		]
	});

	// Default Collection.
	Sheets.Collection = Backbone.Collection.extend({
		model: Sheets.Model
	});


	Sheets.Views.CollectionView = Backbone.View.extend({
		tagName: 'div',
		className: 'sheets_container',
		initialize: function () {
			this.collection.each(this.addItem, this);
			this.listenTo(this.collection, 'add', this.appendItem);
		},
		appendItem: function (model) {
			this.$el.append(new Sheets.Views.SheetView({ model: model }).render().view.$el);
		},
		addItem: function (model) {
			this.insertView(new Sheets.Views.SheetView({ model: model }));
		}
	});

	Sheets.Views.SheetView = Backbone.View.extend({
		template: 'sheets/view',
		tagName: 'div',
		className: 'sheet',
		initialize: function() {
			this.setViews({
				'.content': new Groups.Views.Layout({ collection: this.model.get('groups') })
			});
		},
		serialize: function() {
			return this.model.toJSON();
		}
	});

	// Default View.
	Sheets.Views.Layout = Backbone.Layout.extend({
		template: 'sheets/layout',
		tagName: 'div',
		className: 'sheet',
		initialize: function () {
			this.setViews({
				'.content': new Sheets.Views.CollectionView({ collection: this.collection })
			});
		}
	});

	return Sheets;
});
