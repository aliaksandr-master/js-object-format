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
