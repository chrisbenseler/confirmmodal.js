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
		function ConfirmModal(opts) {
			_classCallCheck(this, ConfirmModal);

			this.opts = opts;

			var prefix = this.opts.id_prefix ? this.opts.id_prefix : "mm-confirmmodal";
			this.ids = {
				btn_cancel: prefix + "-cancel",
				btn_proceed: prefix + "-proceed",
				container: prefix,
				overlay: prefix + "-overlay"
			};
		}

		ConfirmModal.prototype.open = function open() {
			if (!document.getElementById(this.ids.container)) {

				document.querySelector("body").innerHTML += "<div id='" + this.ids.container + "'>\n\t\t\t\t\t\t\t\t<div id='" + this.ids.container + "-content'>\n\t\t\t\t\t\t\t\t\t<h2>" + this.opts.messages.title + "</h2>\n\t\t\t\t\t\t\t\t\t<p>" + this.opts.messages.desc + "</p>\n\t\t\t\t\t\t\t\t\t<div class=\"pull-right\">\n\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" id=\"" + this.ids.btn_cancel + "\">" + this.opts.messages.cancel + "</button>\n\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" id=\"" + this.ids.btn_proceed + "\">" + this.opts.messages.proceed + "</button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t  <div id='mm-confirmmodal-overlay'></div>";
			}

			this.modalcontainer = document.getElementById(this.ids.container);
			this.modaloverlay = document.getElementById(this.ids.overlay);

			this.proceed = document.getElementById(this.ids.btn_proceed);
			this.cancel = document.getElementById(this.ids.btn_cancel);

			this.handlers();
		};

		ConfirmModal.prototype.handlers = function handlers() {
			var _this = this;

			this.proceed.onclick = function (event) {
				event.stopPropagation();
				if (_this.opts.onProceed) {
					_this.opts.onProceed(event);
				}
				_this.closeMe();
			};

			this.cancel.onclick = function (event) {
				event.stopPropagation();
				if (_this.opts.onCancel) _this.opts.onCancel(event);
				_this.closeMe();
			};
		};

		ConfirmModal.prototype.closeMe = function closeMe() {
			//$(this.modalcontainer).remove();
			//$(this.modaloverlay).remove();
			this.modalcontainer.parentNode.removeChild(this.modalcontainer);
			this.modaloverlay.parentNode.removeChild(this.modaloverlay);
		};

		return ConfirmModal;
	}();

	module.exports = ConfirmModal;
});