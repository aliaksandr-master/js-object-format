(function(root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define(['lodash'], function(_) {
			return factory(_);
		});
		return;
	}

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = factory(require('lodash'));
		return;
	}

	var jsonFormat = factory(root._),
		prevJsonFormat = root.jsonFormat;

	root.jsonFormat = jsonFormat;

	jsonFormat.noConflict = function () {
		root.jsonFormat = prevJsonFormat;
		prevJsonFormat = null;
		return jsonFormat;
	};

}(this, function(_) {
    'use strict';

	var formatter,
		defaults,
		recursiveFormatter,
		defaultOptions = {
			shortLength: 5,
			pref: 'fjson-',
			tag:  'span'
		};

	recursiveFormatter = function (obj, options) {
		var classes,
			full,
			inner = '';

		if (obj === null) {
			classes = ['null'];

		} else if (obj === undefined) {
			classes = ['undefined'];

		} else if (_.isNaN(obj)) {
			classes = ['nan'];

		} else if (_.isBoolean(obj)) {
			classes = ['boolean'];
			inner = obj ? 'true' : 'false';

		} else if (_.isString(obj)) {
			classes = ['string'];
			inner = obj;

			if (!obj.length) {
				classes.push(classes[0] + '-empty');
			} else if (/\n/.test(obj)) {
				classes.push(classes[0] + '-multi');
			}

		} else if (_.isNumber(obj)) {
			classes = ['number'];
			inner = obj;

		} else if (_.isFunction(obj)) {
			classes = ['function'];
			inner = obj.toString();

		} else if (_.isRegExp(obj)) {
			classes = ['regexp'];
			inner = obj.source;

		} else {
			classes = ['object'];
			if (_.isArray(obj)) {
				classes = ['array'];
				if (obj.length < options.shortLength) {
					classes.push(classes[0] + '');
				}
			}

			_.each(obj, function (v, k) {
				full = true;
				inner +=
					'<' + options.tag + ' class="' + options.pref + 'cover">' +
						'<' + options.tag + ' class="' + options.pref + 'key">' + k + '</' + options.tag + '>' + recursiveFormatter(v, options) +
					'</' + options.tag + '>';
			});

			if (!full) {
				classes.push(classes[0] + '-empty');
			}
		}

		return '<' + options.tag + ' title="' + classes[0] + '" class="' + options.pref + 'block ' + options.pref + classes.join(' ' + options.pref) + '">' + inner + '</' + options.tag + '>';
	};

	formatter = function (obj, options) {
		options = _.extend({}, defaultOptions, options);

		return '<' + options.tag + ' class="' + options.pref + 'index">' + recursiveFormatter(obj, options) +'</' + options.tag + '>';
	};

	defaults = function (options) {
		_.extend(defaultOptions, options);

		return formatter;
	};

	return {
		format: formatter,
		defaults: defaults
	};
}));