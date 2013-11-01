/**
 * Base Class for all Models
 */

var Model = Giraffe.Model.extend({

	initialize: function () {
		if (this.get('id') === null) {
			this.set('id', _.uniqueId('id'));
		}
	},

	/**
	 * Reset the model to it's default state
	 * Accepts the silent option
	 */
	reset: function (options) {
		this.clear().set(this.defaults, options);
		return this;
	}

});

module.exports = Model;
