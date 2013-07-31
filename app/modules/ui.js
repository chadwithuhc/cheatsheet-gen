define([
	'app'
],

function(app) {

	// Create a new module.
	var UI = app.module();

//	// Default Model.
//	UI.Model = Backbone.RelationalModel.extend({
//	  
//	});
//
//	// Default Collection.
//	UI.Collection = Backbone.Collection.extend({
//		model: UI.Model
//	});
//
//	// Default View.
//	UI.Views.Layout = Backbone.Layout.extend({
//		template: 'ui'
//	});

//	<ul class="nav nav-tabs">
//		<li class="active">
//			<a href="#">Home</a>
//		</li>
//		<li><a href="#">...</a></li>
//		<li><a href="#">...</a></li>
//	</ul>
	UI.SheetNav = Backbone.View.extend({
		tagName: 'ul',
		className: 'nav nav-tabs',
		
		initialize: function () {
			this.collection.each(this.addItem, this);
			this.listenTo(this.collection, 'add', this.addItem);
			this.addAddButton();
		},
		addItem: function (model) {
			if (this.collection.first() === model) {
				model.set('active', true);
			}
			this.$el.append(new UI.SheetNav.Item({ model: model }).render());
		},
		addAddButton: function () {
			this.$el.append(new UI.SheetNav.AddSheetButton().render());
		}
	});
	
	UI.SheetNav.Item = Backbone.View.extend({
		template: _.template('<a href="#switch-sheet" data-sheet-id="<%= cid %>"><%= title %></a>'),
		manage: false,
		tagName: 'li',
		className: '',
		initialize: function () {
			if (this.model.get('active') === true) {
				this.$el.addClass('active');
			}
		},
		render: function () {
			return this.$el.append(this.template(_.extend(this.model.toJSON(), { cid: this.model.cid })));
		}
	});
	
	UI.SheetNav.AddSheetButton = Backbone.View.extend({
		template: _.template('<a href="#add-sheet">Add Sheet</a>'),
		manage: false,
		tagName: 'li',
		
		events: {
			'click #add-sheet': 'addSheet'
		},
		render: function () {
			return this.$el.append(this.template());
		},

		addSheet: function () {
			// add sheet modal
		}
	});
	
	
	

	return UI;
});
