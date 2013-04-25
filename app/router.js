define([
	"app",
	
	'modules/terms'
],

function(app, Terms) {

	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({
		routes: {
			"": "index"
		},

		index: function() {
			var terms = new Terms.Collection([
				{ term: 'before', description: 'What happens before' },
				{ term: 'after', description: 'What happens after' },
				{ term: 'during', description: 'What happens during' }
			]);
			
			app.useLayout('layout').setViews({
				'#app': new Terms.Views.Layout({ collection: terms })
			}).render();
			
		}
	});

	return Router;
});
