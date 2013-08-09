/**
 * Extendable and initializable Enum Class
 */

var Enum = function(){
	this.initialize.apply(this, arguments);
};

Enum.prototype.initialize = function (options) {
	_.defaults(this, options || {});
};

Enum.extend = Backbone.View.extend;

module.exports = Enum;
