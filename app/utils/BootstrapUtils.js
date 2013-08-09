var Enum = require('core/Enum');

/**
 * Twitter Bootstrap Utils
 */
var BootstrapUtils = {

	/**
	 * Get a CSS class for a column span
	 * @param {Number} num
	 * The number of columns for the grid. This number is divided by total grid cols.
	 * @returns {String}
	 */
	getColSpanClass: function (num) {
		return BootstrapUtils.Config.COL_CLASS.replace('#', BootstrapUtils.Config.GRID_COLS / num);
	},

	/**
	 * Used to switch back and forth between column numbers
	 * @constructor
	 */
	ColumnCounter: function (options) {
		
		var config = _.extend({}, BootstrapUtils.Config, options || {});
		
		var count = 0;
		
		
		
		return {

			/**
			 * Increments to next Column
			 * @chainable
			 */
			next: function () {
				count++;
				return this;
			},

			/**
			 * See BootstrapUtils#getColSpanClass
			 */
			getColSpanClass: function (num) {
				return BootstrapUtils.getColSpanClass(num);
			}
			
		}
	}
	
};

BootstrapUtils.Config = {

	/**
	 * Number grid columns
	 */
	GRID_COLS: 12,
	/**
	 * Bootstrap class for column spans
	 */
	COL_CLASS: 'col-lg-#',
	/**
	 * Bootstrap class name for rows
	 */
	ROW_CLASS: 'row',

};

module.exports = BootstrapUtils;
