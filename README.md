# noclass

> Remove class names from strings

## Install

```shell
npm install noclass --save-dev
```

## Methods

### classFromString

Removes all classes from the string, unless an array is passed through to protect select classes.

```js
var noclass = require('noclass'),
saveclasses = ['safe'];
var cleanString = noclass.classFromFile('<div class="notSafe"><div class="Safe"><div class="safe"></div></div></div>', saveclasses);
```

In this case ```cleanString``` would return ```<div ><div ><div class="safe"></div></div></div>```.
This is because the classes will only match case sensitive.

### classFromFile

Remove all classes from a file. The file will be read in sync.
```js
var noclass = require('noclass'),
var cleanString = noclass.classFromFile('/path/to/file.html', []);
```