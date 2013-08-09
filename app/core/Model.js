/**
 * Base Class for all Models
 */

var Model = Giraffe.Model.extend({

	initialize: function () {
		if (this.get('id') === null) {
			this.set('id', _.uniqueId('id'));
		}
	}

});

module.exports = Model;
