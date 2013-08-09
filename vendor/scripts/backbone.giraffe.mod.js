/**
 * App with AppEvents
 * ==================
 * A quick fix to allow Giraffe.App() to accept `appEvents` option
 */
;(function (Giraffe) {
	
	var App = Giraffe.App;
	
	Giraffe.App = function (options) {
		var app = new App(options);
		Giraffe.bindEventMap(app, app, options.appEvents);
		return app;
	};
	
}).call(this, Backbone.Giraffe);
