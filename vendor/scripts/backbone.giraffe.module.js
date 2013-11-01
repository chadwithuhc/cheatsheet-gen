/**
 * Giraffe Module
 * ==============
 * Acts as a mix of an App and a View.
 * 
 * - Adds `this.namespace` property to "name" your modules
 * - Adds `this.mid` for unique module identification
 * - Uses `module.start()` like App
 *   - Triggers `appEvents` for `initializing/initialized` as `module:initialize module:[namespace]:initialize`...
 * - Allows `routes` like App
 * - Adds reference to `this.module` on attached views and subviews
 */
;(function (Giraffe) {

	var $, $document, $window, Backbone, error, _, _afterInitialize, _setEventBindings, _setEventMapBindings,
		__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
		__hasProp = {}.hasOwnProperty,
		__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
		__slice = [].slice;

	$ = window.$, _ = window._, Backbone = window.Backbone;

	$window = $(window);

	$document = $(document);
	
	Giraffe.modules = {};

	Giraffe.Module = (function(_super) {
		__extends(Module, _super);

		function Module(options) {
			//this._onUnload = __bind(this._onUnload, this);
			//this.app = this;
			// NEW: I think?
			if (options != null ? options.routes : void 0) {
				this.routes = options.routes;
			}
			this._initializers = [];
			this.started = false;
			// NEW: added for module instances
			this.mid = _.uniqueId('m');
			if (this.namespace === undefined) {
				this.namespace = this.mid;
			}
			Module.__super__.constructor.apply(this, arguments);
		}

		Module.prototype._cache = function() {
			//if (Giraffe.app == null) {
			//	Giraffe.app = this;
			//}
			//Giraffe.apps[this.cid] = this;
			// NEW: Modules support
			Giraffe.modules[this.mid] = this;
			if (this.routes) {
				if (this.router == null) {
					this.router = new Giraffe.Router({
						app: this,
						triggers: this.routes
					});
				}
			}
			//$window.on('unload', this._onUnload);
			return Module.__super__._cache.apply(this, arguments);
		};

		Module.prototype._uncache = function() {
			//if (Giraffe.app === this) {
			//	Giraffe.app = null;
			//}
			//delete Giraffe.apps[this.cid];
			// NEW: Module support
			delete Giraffe.modules[this.mid];
			if (this.router) {
				this.router = null;
			}
			//$window.off('unload', this._onUnload);
			return Module.__super__._uncache.apply(this, arguments);
		};

		// NEW: // Currently not needed since auto-disposed on app dispose
		//Module.prototype._onUnload = function() {
		//	return this.dispose();
		//};

		/**
		 * NEW: Overrides the View.prototype._wrapInitialize to include adding `mid` to data attributes
		 * @returns {Function}
		 * @private
		 */
		Module.prototype._wrapInitialize = function() {
			var _this = this;
			Giraffe.View.prototype._wrapInitialize.apply(_this, arguments);
			return this.initialize = _.wrap(this.initialize, function(initialize) {
				//_this._cache();
				_this.$el.attr('data-view-mid', _this.mid);
				//_this.setParent(Giraffe.View.getClosestView(_this.$el));
				//_this._cacheUiElements();
				return initialize.apply(_this, Array.prototype.slice.call(arguments, 1));
			});
		};

		/*
		 * Similar to the `events` hash of __Backbone.View__, `appEvents` maps events
		 * on `this.app` to methods on a __Giraffe__ object. Module events can be
		 * triggered from routes or by any object in your application. If a
		 * __Giraffe.Module__ has been created, every __Giraffe__ object has a reference
		 * to the global __Giraffe.app__ instance at `this.app`, and a specific app
		 * instance can be set by passing `options.app` to the object's constructor.
		 * This instance of `this.app` is used to bind `appEvents`, and these bindings
		 * are automatically cleaned up when an object is disposed.
		 *
		 *     // in a Giraffe object
		 *     this.appEvents = {'some:appEvent': 'someMethod'};
		 *     this.app.trigger('some:appEvent', params) // => this.someMethod(params)
		 */


		Module.prototype.appEvents = null;

		/*
		 * If `routes` is defined on a __Giraffe.Module__ or passed to its constructor
		 * as an option, the app will create an instance of __Giraffe.Router__ as
		 * `this.router` and set the router's `triggers` to the app's `routes`. Any
		 * number of routers can be instantiated manually, but they do require that an
		 * instance of __Giraffe.Module__ is first created, because they use `appEvents`
		 * for route handling. See [`Giraffe.Router#triggers`](#Router-triggers)
		 * for more.
		 *
		 *     var app = new Giraffe.Module({routes: {'route': 'appEvent'}});
		 *     app.router; // => instance of Giraffe.Router
		 *     // or
		 *     var MyModule = Giraffe.Module.extend({routes: {'route': 'appEvent'}});
		 *     var myModule = new MyModule();
		 *     myModule.router; // => instance of Giraffe.Router
		 */


		Module.prototype.routes = null;

		/*
		 * Queues up the provided function to be run on `start`. The functions you
		 * provide are called with the same `options` object passed to `start`. If the
		 * provided function has two arguments, the options and a callback, the app's
		 * initialization will wait until you call the callback. If the callback is
		 * called with a truthy first argument, an error will be logged and
		 * initialization will halt. If the app has already started when you call
		 * `addInitializer`, the function is called immediately.
		 *
		 *     app.addInitializer(function(options) {
		 *         doSyncStuff();
		 *     });
		 *     app.addInitializer(function(options, cb) {
		 *         doAsyncStuff(cb);
		 *     });
		 *     app.start();
		 *
		 * @param {Function} fn `function(options)` or `function(options, cb)`
		 *     {Object} options - options passed from `start`
		 *     {Function} cb - optional async callback `function(err)`
		 */


		Module.prototype.addInitializer = function(fn) {
			if (this.started) {
				fn.call(this, this._startOptions);
				_.extend(this, this._startOptions);
			} else {
				this._initializers.push(fn);
			}
			return this;
		};

		/*
		 * Starts the app by executing each initializer in the order it was added,
		 * passing `options` through the initializer queue. Triggers the `appEvents`
		 * `'app:initializing'` and `'app:initialized'`.
		 *
		 * @param {Object} [options]
		 */


		Module.prototype.start = function(options) {
			var next,
				_this = this,
			// NEW: Module support
				triggerData = _.pick(this, 'mid', 'cid', 'namespace');
			if (options == null) {
				options = {};
			}
			this._startOptions = options;
			//this.trigger('app:initializing', options);
			// NEW: Module support
			this.app.trigger('module:initializing module:' + this.namespace + ':initializing', triggerData);
			next = function(err) {
				var fn;
				if (err) {
					return error(err);
				}
				fn = _this._initializers.shift();
				if (fn) {
					if (fn.length === 2) {
						return fn.call(_this, options, next);
					} else {
						fn.call(_this, options);
						return next();
					}
				} else {
					_.extend(_this, options);
					_this.started = true;
					//return _this.trigger('app:initialized', options);
					// NEW: Module support
					return _this.app.trigger('module:initialized module:' + _this.namespace + ':initialized', triggerData);
				}
			};
			next();
			return this;
		};

		/**
		 * NEW: Includes the module instance when attaching a View to a module
		 * @returns {*}
		 */
		Module.prototype.attach = function() {
			if (arguments && arguments[0]) {
				arguments[0].module = this;
			}
			return Module.__super__.attach.apply(this, arguments);
		};

		/**
		 * NEW: Hack to override the View.attach and pass on the module info
		 * @type {Function}
		 */
		var attach = Giraffe.View.prototype.attach;
		Giraffe.View.prototype.attach = function() {
			if (this.parent && this.parent.module) {
				arguments[0].module = this.parent.module;
			}
			return attach.apply(this, arguments);
		};

		/**
		 * See [`Giraffe.View#dispose`](#View-dispose).
		 */
		Module.prototype.dispose = function() {
			return Module.__super__.dispose.apply(this, arguments);
		};

		/**
		 * Looks up a module from the cache by `cid`, returning undefined if not found.
		 *
		 * @param {String} cid
		 */
		Module.getByCid = function(cid) {
			return Giraffe.View.getByCid(cid);
		};

		/**
		 * Looks up a module from the cache by `mid`, returning undefined if not found.
		 *
		 * @param {String} mid
		 */
		Module.getByMid = function(mid) {
			return Giraffe.modules[mid];
		};

		return Module;

	})(Giraffe.View);
	
	
}).call(this, Backbone.Giraffe);


