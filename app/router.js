define([
	'app',
	
	'modules/ui',
	'modules/terms',
	'modules/groups',
	'modules/sheets'
],

function(app, UI, Terms, Groups, Sheets) {

	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({
		routes: {
			'': 'index'
		},

		index: function() {
			var sheets = new Sheets.Collection([
				{
					title: 'Sheet 1',
					description: 'The first sheet',
					groups: [{
						title: 'Events',
						description: 'Available Events',
						terms: [
							{ term: 'before', description: 'What happens before' },
							{ term: 'after', description: 'What happens after' },
							{ term: 'during', description: 'What happens during' }
						]
					}]
				},

				{
					title: 'Sheet 2',
					description: 'The second sheet',
					groups: [{
						title: 'Events',
						description: 'Available Events',
						terms: [
							{ term: 'before', description: 'What happens before' },
							{ term: 'after', description: 'What happens after' },
							{ term: 'during', description: 'What happens during' }
						]
					}]
				}
			]);
			
			app.useLayout('layout').setViews({
				'#sheet-nav': new UI.SheetNav({ collection: sheets }),
				'#stage': new Sheets.Views.Layout({ collection: sheets })
			}).render();
			
			window.sheets = sheets;
		}
	});

	return Router;
});
