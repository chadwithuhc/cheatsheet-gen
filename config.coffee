exports.config =
# See docs at http://brunch.readthedocs.org/en/latest/config.html.

# Application build path.  Default is public
#buildPath: ''

	paths:
		'public': 'public'

	files:
		javascripts:
			defaultExtension: 'js'
			joinTo:
				'javascripts/app.js': /^app/
				'javascripts/vendor.js': /^vendor(\/|\\)(?!bootstrap|backbone-m|z|l|p)/
				'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
				'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
			order:
				before: [
					'vendor/scripts/console-helper.js',
					'vendor/scripts/jquery-1.9.1.js',
					'vendor/scripts/jquery-serializeobject.js',
					#'vendor/scripts/zepto.js',
					# lodash
					#'vendor/scripts/lodash.underscore.js',
					# underscore
					'vendor/scripts/underscore-1.5.1.js',
					# backbone
					'vendor/scripts/backbone-1.0.0.js',
					'vendor/scripts/backbone.giraffe.js',
					'vendor/scripts/backbone.giraffe.module.js',
					'vendor/scripts/backbone.giraffe.mod.js',
					'vendor/scripts/backbone-mediator.js',
					'vendor/scripts/backbone.super.js',
					'vendor/scripts/backbone-module.js',
					# bootstrap
					'vendor/scripts/bootstrap/bootstrap-tooltip.js',
					'vendor/scripts/bootstrap/bootstrap-transition.js',
					'vendor/scripts/bootstrap/bootstrap-affix.js',
					'vendor/scripts/bootstrap/bootstrap-alert.js',
					'vendor/scripts/bootstrap/bootstrap-button.js',
					'vendor/scripts/bootstrap/bootstrap-carousel.js',
					'vendor/scripts/bootstrap/bootstrap-collapse.js',
					'vendor/scripts/bootstrap/bootstrap-dropdown.js',
					'vendor/scripts/bootstrap/bootstrap-modal.js',
					'vendor/scripts/bootstrap/bootstrap-popover.js',
					'vendor/scripts/bootstrap/bootstrap-scrollspy.js',
					'vendor/scripts/bootstrap/bootstrap-tab.js',
					'vendor/scripts/bootstrap/bootstrap-typeahed.js'
				]

		stylesheets:
			defaultExtension: 'scss'
			joinTo:
				'stylesheets/app.css': /^(app|vendor)/
				'test/stylesheets/test.css': /^test/
			order:
				before: [
					'vendor/styles/normalize.css',
					'vendor/styles/bootstrap/bootstrap.less'
				]
				after: ['vendor/styles/helpers.css']

		templates:
			#defaultExtension: 'html'
			joinTo:
				'javascripts/templates.js': /^app/

	minify: no

	plugins:
		autoReload:
			disabled: true
