define([
	'app'
],

	function(app) {

		// Create a new module.
		var Boostrap = app.module();

//	// Default Model.
//	Boostrap.Model = Backbone.RelationalModel.extend({
//	  
//	});
//
//	// Default Collection.
//	Boostrap.Collection = Backbone.Collection.extend({
//		model: Boostrap.Model
//	});
//
//	// Default View.
//	Boostrap.Views.Layout = Backbone.Layout.extend({
//		template: 'ui'
//	});

//	<ul class="nav nav-tabs">
//		<li class="active">
//			<a href="#">Home</a>
//		</li>
//		<li><a href="#">...</a></li>
//		<li><a href="#">...</a></li>
//	</ul>
		Boostrap.Modal = Backbone.View.extend({
			template: 'bootstrap/modal',
			tagName: 'div',

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




		return Boostrap;
	});
