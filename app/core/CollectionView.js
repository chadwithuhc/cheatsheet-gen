/**
 * Base Class for all Collection Views
 */
var CollectionView = Giraffe.Contrib.CollectionView.extend({

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

module.exports = CollectionView;
