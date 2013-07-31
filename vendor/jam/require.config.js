var jam = {
	"packages": [
		{
			"name": "backbone",
			"location": "../vendor/jam/backbone",
			"main": "backbone.js"
		},
		{
			"name": "backbone.layoutmanager",
			"location": "../vendor/jam/backbone.layoutmanager",
			"main": "backbone.layoutmanager.js"
		},
		{
			"name": "jquery",
			"location": "../vendor/jam/jquery",
			"main": "jquery.js"
		},
		{
			"name": "lodash",
			"location": "../vendor/jam/lodash",
			"main": "./lodash.js"
		},
		{
			"name": "underscore",
			"location": "../vendor/jam/underscore",
			"main": "underscore.js"
		},
		{
			"name": "bootstrapjs",
			"location": "../vendor/js/libs",
			"main": "bootstrap.min.js"
		}
	],
	"version": "0.2.17",
	"shim": {
		"backbone": {
			"deps": [
				"underscore",
				"jquery"
			],
			"exports": "Backbone"
		},
		"backbone.layoutmanager": {
			"deps": [
				"jquery",
				"backbone",
				"underscore"
			],
			"exports": "Backbone.LayoutManager"
		},
		"underscore": {
			"exports": "_"
		},
		"bootstrapjs": {
			"deps": [
				"jquery"
			]
		}
	}
};

if (typeof require !== "undefined" && require.config) {
	require.config({
		"packages": [
			{
				"name": "backbone",
				"location": "../vendor/jam/backbone",
				"main": "backbone.js"
			},
			{
				"name": "backbone.layoutmanager",
				"location": "../vendor/jam/backbone.layoutmanager",
				"main": "backbone.layoutmanager.js"
			},
			{
				"name": "jquery",
				"location": "../vendor/jam/jquery",
				"main": "jquery.js"
			},
			{
				"name": "lodash",
				"location": "../vendor/jam/lodash",
				"main": "./lodash.js"
			},
			{
				"name": "underscore",
				"location": "../vendor/jam/underscore",
				"main": "underscore.js"
			},
			{
				"name": "bootstrapjs",
				"location": "../vendor/js/libs",
				"main": "bootstrap.min.js"
			}
		],
		"shim": {
			"backbone": {
				"deps": [
					"underscore",
					"jquery"
				],
				"exports": "Backbone"
			},
			"backbone.layoutmanager": {
				"deps": [
					"jquery",
					"backbone",
					"underscore"
				],
				"exports": "Backbone.LayoutManager"
			},
			"underscore": {
				"exports": "_"
			},
			"bootstrapjs": {
				"deps": [
					"jquery"
				]
			}
		}
	});
}
else {
	var require = {
		"packages": [
			{
				"name": "backbone",
				"location": "../vendor/jam/backbone",
				"main": "backbone.js"
			},
			{
				"name": "backbone.layoutmanager",
				"location": "../vendor/jam/backbone.layoutmanager",
				"main": "backbone.layoutmanager.js"
			},
			{
				"name": "jquery",
				"location": "../vendor/jam/jquery",
				"main": "jquery.js"
			},
			{
				"name": "lodash",
				"location": "../vendor/jam/lodash",
				"main": "./lodash.js"
			},
			{
				"name": "underscore",
				"location": "../vendor/jam/underscore",
				"main": "underscore.js"
			},
			{
				"name": "bootstrapjs",
				"location": "../vendor/js/libs",
				"main": "bootstrap.min.js"
			}
		],
		"shim": {
			"backbone": {
				"deps": [
					"underscore",
					"jquery"
				],
				"exports": "Backbone"
			},
			"backbone.layoutmanager": {
				"deps": [
					"jquery",
					"backbone",
					"underscore"
				],
				"exports": "Backbone.LayoutManager"
			},
			"underscore": {
				"exports": "_"
			},
			"bootstrapjs": {
				"deps": [
					"jquery"
				]
			}
		}
	};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
	module.exports = jam;
}