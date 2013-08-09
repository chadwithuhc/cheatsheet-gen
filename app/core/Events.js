var Enum = require('core/Enum');

/**
 * Application Events
 */

var Events = Enum.extend({
	
	initialize: function (options) {
		options = options || {};
		_.defaults(options, Events.prototype.defaults);
		Enum.prototype.initialize.call(this, options);
		this.setNamespace(options.namespace);
	},
	
	event: function (name) {
		return this[name];
	},
	
	setNamespace: function (ns) {
		this.namespace = ns || this.namespace;
		this.refresh();
	},
	
	refresh: function () {
		_.map(this, function (val, key) {
			if (this.hasOwnProperty(key) && !_.isFunction(this[key]) && (/^([A-Z0-9_]+)$/.test(key))) {
				var name = (val === true) ? key : val.split(this.separator).slice(-1).join('');
				this[key] = [this.namespace,this.separator,name.toLowerCase()||'UNDEFINED_EVENT'].join('');
			}
		}, this);
	},
	
	separator: ':',
	namespace: 'events',
	
	defaults: {
		INITIALIZING: 'initializing',
		INITIALIZED: 'initialized',
		DISPOSING: 'disposing',
		DISPOSED: 'disposed',

		ADD: 'add',
		REMOVE: 'remove',
		CREATE: 'create',
		UPDATE: 'update'
	}

});

module.exports = Events;
