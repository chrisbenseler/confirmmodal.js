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
var modal = new ConfirmModal(options);
modal.open();
```

#### Options
User can provide an object with several keys:
* messages: json with the labels (title, description, cancel and proceed buttons)
* cssclasses: json with the css classes from the cancel and proceed buttons. If provided, will override default values
* onProceed: function to be called after proceed, if provided
* onCancel: function to be called after cancel, if provided

Examples:
```javascript
var options = { messages: {
				title: "Título!",
				desc: "descrição longa",
				proceed: "ok",
				cancel: "cancelar"
			},
			onProceed: function(e) {
				console.log(e);
			},
            cssclasses: {
            	btn_cancel: "btn any-class", //default is 'btn btn-danger'
                btn_proceed: "any-other-class" //default is 'btn btn-primary'
            }
}
```