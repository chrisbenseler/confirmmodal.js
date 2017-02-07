<p align="center">
<a href="https://travis-ci.org/chrisbenseler/confirmmodal.js">
    <img src="https://api.travis-ci.org/chrisbenseler/confirmmodal.js.svg?branch=master">
  </a>
<a href="https://www.npmjs.com/package/confirmmodal.js">
<img src="https://badge.fury.io/js/confirmmodal.js.svg" />
</a>
<a href="https://coveralls.io/github/chrisbenseler/confirmmodal.js?branch=master">
<img src="https://coveralls.io/repos/github/chrisbenseler/confirmmodal.js/badge.svg?branch=master">
</a>
</p>

# ConfirmModal.js

> Modern Confirm Modal javascript module for browsers, standalone instalation. No libs/frameworks (jQuery, Bootstrap, etc...) required

## Install

As npm package, from Github
```
npm install confirmmodal.js --save
```

As [zip](https://github.com/chrisbenseler/confirmmodal.js/archive/master.zip) file 

## Setup

### As ES6 module
```javascript
import ConfirmModal from "confirmmodal.js/lib/ConfirmModal";
```

### As script
include the script located on the `dist` folder
```html
<script src="dist/ConfirmModal.js"></script>
```

Now, you need to instantiate it passing some 'options', and open it
```javascript
let modal = new ConfirmModal(options)
modal.open()
```

#### Options
User can provide an object with several keys:
* messages: json with the labels (title, description, cancel and proceed buttons)
* cssclasses: json with the css classes from the cancel and proceed buttons. If provided, will override default values
* onProceed: function to be called after proceed, if provided
* onCancel: function to be called after cancel, if provided
* prompt: json with settings for user prompt (if is enabled, and if is required)

Examples:
```javascript
var options = { messages: {
				title: "Título!",
				desc: "descrição longa",
				proceed: "ok",
				cancel: "cancelar"
			},
			onProceed: function() {
				console.log('ok clicked');
			},
			cssclasses: {
				btn_cancel: "btn any-class", //default is 'btn btn-danger'
				btn_proceed: "any-other-class" //default is 'btn btn-primary'
			},
			buttons: {
				cancel: false, //default is true
				proceed: false //default is true
			},
			prompt: {
				enabled: true, //default is false
				required: true //default is false 
			}
		}
```

#### onProceed callback

When onProceed callback is called, the instance of the ConfirmModal is passed as the argument to it. If prompt is enabled, the value filled by in the modal can be retrieved using the 'promptvalue' attribute, as follows:
```javascript
onProceed: function(my_modal) {
	console.log(my_modal.promptvalue)
}
```

#### Close the confirm modal programmatically

```javascript
modal.close()
```

#### Events
The ConfirmModal object has 2 events: _proceed_ and _cancel_. Both return a promise, which are resolved when user clicks in one of the buttons.

```javascript
confirm
.on('proceed')
.then( function(my_modal) {
	console.log('Resolved, button proceed clicked')
})

confirm
.on('cancel')
.then( function(my_modal) {
	console.log('Resolved, button proceed clicked')
})
```
Check the promises.html in the examples/ folder

## Examples
Checkout the examples/ folder for with samples or the [official page of the project](https://chrisbenseler.github.io/confirmmodal.js) with links

## Tests

### Unit

Specs are under _test/unit/_ path

Run
```
npm run test-unit
```

### e2e

Specs are under _test/e2e/_ path. They use Webdriver.io to control a browser and automatize tests
Install [selenium-standalone](https://www.npmjs.com/package/selenium-standalone) as npm package and start it
```
npm install selenium-standalone@latest -g
selenium-standalone install
selenium-standalone start
```

Run
```
npm run test-e2e
```

All definitions are set in wdio.conf.js

### Both unit and e2e
To run _unit_ and _e2e_ tests
```
npm run test
```
