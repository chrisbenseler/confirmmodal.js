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
import ConfirmModal from "confirmmodal.js/lib/ConfirmModal";

### As script
include the script located on the `dist` folder
```html
<script src="dist/clipboard.min.js"></script>
```

Now, you need to instantiate it passing some 'options', and open it
```
var modal = new ConfirmModal(options);
modal.open();
```

#### Options
TODO