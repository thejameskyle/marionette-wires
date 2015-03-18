var fs = require('fs-extra')

module.exports = {
	copy: function(source, target, cb) {
		fs.copy(source, target, function(err) {
			if (cb && !cbCalled) {
				cb(err);
				cbCalled = true;
			}
		})
	},

  remove: function(target, cb) {
    fs.removeSync(target);
    if(cb) return cb();
  },

	isPlainObject: function(obj) {
		if (typeof(obj) !== 'object' || obj.nodeType || obj === obj.window) {
			return false;
		}
		try {
			if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
				return false;
			}
		} catch (e) {
			return false;
		}
		return true;
	},

	merge: function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		for ( ; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) !== null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						}
						else {
							clone = src && this.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = this.extend(deep, clone, copy);

					}
					else if (copy !== undefined) {
						// Don't bring in undefined values
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	},
}
