/**
 * Base Class for all Views
 */
var View = Giraffe.View.extend({
	
	events: {
		all: console.logEvents
	},

	/**
	 * This is how we do it round here.
	 */
	templateStrategy: 'jst',

	/**
	 * Default template method
	 */
	template: function () {
	}
	
});

module.exports = View;
