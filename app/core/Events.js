var Enum = require('core/Enum');

/**
 * Application Events
 */

var Events = Enum.extend({
	
	initialize: function (options) {
		options = options || {};
		_.defaults(options, Events.prototype.defaults);
		Enum.prototype.initialize.call(this, options);
		this.app || (this.app = Giraffe.app);
		this.setNamespace(options.namespace);
	},

	/**
	 * A Helper for setting event triggers as callbacks
	 * @param {String} trigger_name  The name of the event
	 * @param {Array} args  Args to pass to the trigger, gets `.apply()`d
	 * @example
	 *   {
	 *     'click .new_item': Events.triggerCb(Events.ADD_ITEM)
	 *   }
	 */
	triggerCb: function () {
		return _.callback.call(this.app, this.app.trigger, arguments);
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
