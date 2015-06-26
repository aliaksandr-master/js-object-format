[![npm](http://img.shields.io/npm/v/js-object-format.svg?style=flat-square)](https://www.npmjs.com/package/js-object-format)
[![npm](http://img.shields.io/npm/l/js-object-format.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/aliaksandr-pasynkau/js-object-format.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/js-object-format)
[![devDependency Status](https://david-dm.org/aliaksandr-pasynkau/js-object-format/dev-status.svg?style=flat-square)](https://david-dm.org/aliaksandr-pasynkau/js-object-format#info=devDependencies)
[![Build Status](https://travis-ci.org/aliaksandr-pasynkau/js-object-format.svg?branch=master&style=flat-square)](https://travis-ci.org/aliaksandr-pasynkau/js-object-format)
[![Coverage Status](https://img.shields.io/coveralls/aliaksandr-pasynkau/js-object-format.svg?style=flat-square)](https://coveralls.io/r/aliaksandr-pasynkau/js-object-format?branch=master)

# js-object-format

format js object

## Getting Started
```html
<link type="stylesheet" href="path/to/default-skin.css" />

<script href="path/to/js-object-format.js"></script>

<script>
	var resultHtml = jsObjectFormat.format(objectToFormat, options);
</script>
```


## Options

### pref
Type: `String`
Default: `'fjson-'`

CSS Class prefix for different skins

### tag
Type: `String`
Default: `'span'`


### title
Type: `Boolean`
Default: `true`

## defaults options
Type: `Object`
```js
jsObjectFormat.defaults.tag = 'div';
```

## Usage

### RequireJs
```js
var jsObjectFormat = require('path/to/js-object-format');
var html = jsObjectFormat.format(objectToFormat);
```
