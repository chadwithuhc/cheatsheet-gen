var Collection = require('core/Collection');
var SheetsModel = require('./SheetModel');

/**
 * Sheets Collection
 * @extends Collection
 */
var SheetsCollection = Collection.extend({
	model: SheetsModel
});

module.exports = SheetsCollection;
