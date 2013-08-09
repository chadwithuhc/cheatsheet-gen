console.logEvents = function () {
	console.log('AppEvent', arguments);
};

/**
 * Application Bootstrapper
 */
var Application = new Giraffe.App({

	id: 'CheatseetGenerator',
	
	appEvents: {
		
		'app:initializing': function () {
			/**
			 * Create a callback function with some args passed to it
			 * Example:
			 *     onLoad: _.callback(this.trigger, 'dom_loaded');
			 * @param {Function} fn  A function to call
			 * @param {Arguments} arguments  Arguments to pass to the function
			 * @return {Function}
			 * Returns a function that will call your function. To change context of which
			 * your function is called, use `_.callback.call(context, fn, arguments)`
			 */
			_.mixin({
				callback: function (fn, args) {
					return _.bind(function () {
						return fn.apply(this, args);
					}, this);
				}
			});
		},
		
		'app:initialized': function () {
			// Import views
			var Sheets = require('modules/sheets/app');

			// Initialize views
			this.attach(new Sheets({ useFixture: true }));

			// We don't want to start this before the app has Initialized
			this.on('all', console.logEvents);
			this.trigger('events:app:start_logging');
		}
		
	}
	
});

module.exports = window.App = Application;
