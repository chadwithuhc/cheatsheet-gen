/**
 * Application Configuration
 */

var ApplicationConfig = (function () {

	/**
	 * @private
	 */
	var baseUrl = '/';

	/**
	 * Public interface
	 */
	return {

		/**
		 * Base URL of Application
		 * @property {String}
		 */
		BASE_URL: baseUrl
	}

}).call();

module.exports = ApplicationConfig;
