/**
 * Application Initializer
 */

var application = require('application');

$(function () {
	application.attachTo('body').start();
	Backbone.history.start({pushState: true});
});
