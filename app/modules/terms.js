define([
	"app"
],

function(app) {

	// Create a new module.
	var Terms = window.Terms = app.module();

	// Default Model.
	Terms.Model = Backbone.RelationalModel.extend({
		defaults: {
			term: null,
			description: null,
			order: 0
		}
	});

	// Default Collection.
	Terms.Collection = Backbone.Collection.extend({
		model: Terms.Model
	});

	Terms.Views.TermCollectionView = Backbone.View.extend({
		tagName: 'div',
		className: 'terms',
		initialize: function () {
			this.collection.each(this.addItem, this);
			this.listenTo(this.collection, 'add', this.appendItem);
		},
		appendItem: function (model) {
			this.$el.append(new Terms.Views.TermView({ model: model }).render().view.$el);
		},
		addItem: function (model) {
			this.insertView(new Terms.Views.TermView({ model: model }));
		}
	});

	Terms.Views.TermView = Backbone.View.extend({
		template: 'terms/view',
		tagName: 'dl',
		className: 'term',
		serialize: function() {
			return this.model.toJSON();
		}
	});

	Terms.Views.TermFormView = Backbone.View.extend({
		template: 'terms/form',
		tagName: 'form',
		className: 'term_form',
		attributes: {
			action: '#',
			method: 'foobar'
		},
		
		events: {
			'click button': 'submit'
		},
		
		serialize: function() {
			//return this.model.toJSON();
			return {};
		},
		
		submit: function (e) {
			e.preventDefault();
			this.collection.add(this.$el.serializeJSON());
		}
	});


	// Default View.
	Terms.Views.Layout = Backbone.Layout.extend({
		template: 'terms/layout',
		id: 'terms_panel',
		initialize: function () {
			this.setViews({
				'.content': new Terms.Views.TermCollectionView({ collection: this.collection }),
				'.form': new Terms.Views.TermFormView({ collection: this.collection })
			});
		}
	});

	return Terms;
});
