// Set the require.js configuration for your application.
require.config({

	// Initialize the application with the main application file and the JamJS
	// generated configuration file.
	deps: ["../vendor/jam/require.config", "main"],

	paths: {
		'libs': '../vendor/js/libs'
	},
	
	packages: [
		{
			"name": "jquery.serializejson",
			"location": "../vendor/js/libs",
			"main": "jquery.serializejson.min.js"
		}
	],

	shim: {
		"jquery.serializejson": {
			"deps": ["jquery"]
		}
	}

});
