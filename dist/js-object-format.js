(function(root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define(['lodash'], function(_) {
			return factory(_);
		});

	} else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = factory(require('lodash'));

	} else {
		var module = factory(root._),
			prev = root['jsObjectFormat'];

		root['jsObjectFormat'] = module;

		module.noConflict = function () {
			if (prev !== null) {
				root['jsObjectFormat'] = prev;
				prev = null;
			}

			return module;
		};
	}
}(this, function(_) {
	'use strict';


		
	
	var format,
		EMPTY = '-empty',
		rFormat,
		isRecursive,
		objProto = {},
		objHasOwnProp = objProto.hasOwnProperty,
		defaults = {
			pref: 'fjs-',
			tag:  'span',
			title: true
		};
	
	isRecursive = function (obj, all) {
		var l = all.length;
	
		while (l--) {
			if (all[l] === obj) {
				return true;
			}
		}
	
		all.push(obj);
	
		return false;
	};
	
	rFormat = function (obj, opt, all) {
		var k,
			ir,
			title = '',
			tag = opt.tag,
			tagL = '<' + tag,
			tagR = '</' + tag + '>',
			pref = opt.pref,
			type = objProto.toString.call(obj).replace(/\[object ([^\]]+)\]/, '$1').toLowerCase(),
			classes = [type],
			inner = '';
	
		if (obj == null) {
		} else if (type == 'function' || type == 'boolean' || type == 'regexp') {
			inner = obj.toString();
	
		} else if (type == 'number') {
			if (obj != +obj) {
				type = 'nan';
				classes = [type];
			} else {
				inner = obj;
			}
	
		} else if (type == 'string') {
			inner = obj;
	
			if (!obj.length) {
				classes.push(type + EMPTY);
			} else if (/\n/.test(obj)) {
				classes.push(type + '-multi');
			}
	
		} else {
			if (isRecursive(obj, all) && all.length > 1) {
				classes = ['recursive'];
	
			} else {
				if (type != 'array') {
					classes = ['object'];
				}
	
				for (k in obj) {
					if (objHasOwnProp.call(obj, k)) {
						inner += tagL + ' class="' + pref + 'item">' + tagL + ' class="' + pref + 'key">' + k + tagR + rFormat(obj[k], opt, all) + tagR;
					}
				}
	
				if (!inner) {
					classes.push(type + EMPTY);
				}
	
			}
		}
	
		if (opt.title) {
			title = ' title="' + type + '"';
		}
	
		return tagL + title + ' class="' + pref + 'val ' + pref + classes.join(' ' + pref) + '">' + inner + tagR;
	};
	
	format = function (obj, options) {
		var r, k, all = [obj], opts = {};
	
		for (k in defaults) {
			if (objHasOwnProp.call(defaults, k)) {
				opts[k] = options[k] == null ? defaults[k] : options[k];
			}
		}
	
		r = '<' + opts.tag + ' class="' + opts.pref + 'index">' + rFormat(obj, opts, all) +'</' + opts.tag + '>';
	
		return r;
	};
	
	return {
		format: format,
		defaults: defaults
	};
	

}));