define([
	'app',
	'modules/ui',
	'modules/terms'
],

function(app, UI, Terms) {

	// Create a new module.
	var Groups = window.Groups = app.module();

	// Default Model.
	Groups.Model = Backbone.RelationalModel.extend({
		defaults: {
			title: null,
			description: null,
			order: 0
		},
		relations: [
			{
				type: 'HasMany',
				key: 'terms',
				relatedModel: 'Terms.Model',
				collectionType: 'Terms.Collection'
			}
		]
	});

	// Default Collection.
	Groups.Collection = Backbone.Collection.extend({
		model: Groups.Model
	});
	
	
	Groups.Views.CollectionView = Backbone.View.extend({
		tagName: 'div',
		className: 'groups_container',
		initialize: function () {
			this.collection.each(this.addItem, this);
			this.listenTo(this.collection, 'add', this.appendItem);
		},
		appendItem: function (model) {
			this.$el.append(new Groups.Views.GroupView({ model: model }).render().view.$el);
		},
		addItem: function (model) {
			this.insertView(new Groups.Views.GroupView({ model: model }));
		}
	});

	Groups.Views.GroupView = Backbone.View.extend({
		template: 'groups/view',
		tagName: 'div',
		className: 'group',
		initialize: function() {
			this.setViews({
				'.content': new Terms.Views.Layout({ collection: this.model.get('terms') })
			});
		},
		serialize: function() {
			return this.model.toJSON();
		}
	});

	// Default View.
	Groups.Views.Layout = Backbone.Layout.extend({
		template: 'groups/layout',
		tagName: 'div',
		className: 'group',
		initialize: function () {
			this.setViews({
				'.content': new Groups.Views.CollectionView({ collection: this.collection })
			});
		}
	});

	return Groups;
});
