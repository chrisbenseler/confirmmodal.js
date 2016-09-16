(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["module"], factory);
	} else if (typeof exports !== "undefined") {
		factory(module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod);
		global.ConfirmModal = mod.exports;
	}
})(this, function (module) {
	"use strict";

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var ConfirmModal = function () {

		/**
      * @param {Object} options
      */
		function ConfirmModal(opts) {
			_classCallCheck(this, ConfirmModal);

			this._resolveOptions(opts);
		}

		/**
   * Overrides or not default configuration with user proveided options
   * @param {Object} options
   */


		ConfirmModal.prototype._resolveOptions = function _resolveOptions() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


			var prefix = options.id_prefix ? options.id_prefix : "mm-confirmmodal";

			this.ids = {
				btn_cancel: prefix + "-cancel",
				btn_proceed: prefix + "-proceed",
				container: prefix,
				overlay: prefix + "-overlay"
			};

			var cssclasses = options.cssclasses ? options.cssclasses : {};

			this.cssclasses = {
				btn_cancel: cssclasses.btn_cancel ? cssclasses.btn_cancel : "btn btn-danger",
				btn_proceed: cssclasses.btn_proceed ? cssclasses.btn_cancel : "btn btn-primary"
			};

			this.messages = options.messages;

			this.callbacks = {
				onProceed: typeof options.onProceed === 'function' ? options.onProceed : null,
				onCancel: typeof options.onCancel === 'function' ? options.onCancel : null
			};
		};

		ConfirmModal.prototype.open = function open() {
			if (!document.getElementById(this.ids.container)) {
				document.querySelector("body").innerHTML += "<div id='" + this.ids.container + "'>\n\t\t\t\t\t\t\t\t<div id='" + this.ids.container + "-content'>\n\t\t\t\t\t\t\t\t\t<h2>" + this.messages.title + "</h2>\n\t\t\t\t\t\t\t\t\t<p>" + this.messages.desc + "</p>\n\t\t\t\t\t\t\t\t\t<footer>\n\t\t\t\t\t\t\t\t\t\t<button class=\"" + this.cssclasses.btn_cancel + "\" id=\"" + this.ids.btn_cancel + "\">" + this.messages.cancel + "</button>\n\t\t\t\t\t\t\t\t\t\t<button class=\"" + this.cssclasses.btn_proceed + "\" id=\"" + this.ids.btn_proceed + "\">" + this.messages.proceed + "</button>\n\t\t\t\t\t\t\t\t\t</footer>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t  <div id='" + this.ids.overlay + "'></div>";
			}

			this.modalcontainer = document.getElementById(this.ids.container);
			this.modaloverlay = document.getElementById(this.ids.overlay);

			console.log(this.modalcontainer);
			console.log(this.modaloverlay);

			this.proceed = document.getElementById(this.ids.btn_proceed);
			this.cancel = document.getElementById(this.ids.btn_cancel);

			this.handlers();
		};

		ConfirmModal.prototype.handlers = function handlers() {
			var _this = this;

			this.proceed.onclick = function (event) {
				event.stopPropagation();
				if (_this.callbacks.onProceed) {
					_this.callbacks.onProceed(event);
				}
				_this._closeMe();
			};

			this.cancel.onclick = function (event) {
				event.stopPropagation();
				if (_this.callbacks.onCancel) _this.callbacks.onCancel(event);
				_this._closeMe();
			};
		};

		ConfirmModal.prototype._closeMe = function _closeMe() {
			//$(this.modalcontainer).remove();
			//$(this.modaloverlay).remove();
			this.modalcontainer.parentNode.removeChild(this.modalcontainer);

			this.modaloverlay.parentNode.removeChild(this.modaloverlay);
		};

		return ConfirmModal;
	}();

	module.exports = ConfirmModal;
});