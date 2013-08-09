var Enum = require('core/Enum');

/**
 * Application Events
 */

var Config = new Enum({

	namespace: 'sheets',


	MAX_SHEETS: 5,
	MAX_ITEMS_PER_SHEET: 10


});

module.exports = Config;
