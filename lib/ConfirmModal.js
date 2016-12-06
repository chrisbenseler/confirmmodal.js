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
	'use strict';

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var ConfirmModal = function () {

		/**
      * @param {Object} options
      */
		function ConfirmModal(opts) {
			_classCallCheck(this, ConfirmModal);

			this._resolveOptions(opts);
		}

		ConfirmModal.prototype._resolveOptions = function _resolveOptions() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


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

			var messages = options.messages || {};
			this.messages = {
				title: messages.title ? messages.title : "Confirm",
				desc: messages.desc ? messages.desc : "",
				cancel: messages.cancel ? messages.cancel : "Cancel",
				proceed: messages.proceed ? messages.proceed : "Confirm"
			};

			this.callbacks = {
				onProceed: typeof options.onProceed === 'function' ? options.onProceed : null,
				onCancel: typeof options.onCancel === 'function' ? options.onCancel : null
			};

			var buttons = options.buttons ? options.buttons : {};
			this.buttons = {
				cancel: typeof buttons.cancel === 'boolean' ? buttons.cancel : true,
				proceed: typeof buttons.proceed === 'boolean' ? buttons.proceed : true
			};

			var prompt = options.prompt ? options.prompt : {};
			this.prompt = {
				enabled: typeof prompt.enabled === 'boolean' ? prompt.enabled : false,
				required: typeof prompt.required === 'boolean' ? prompt.required : false,
				value: null
			};
		};

		ConfirmModal.prototype.open = function open() {
			if (!document.getElementById(this.ids.container)) {

				var prompt = '';
				if (this.prompt.enabled) {
					prompt = '<form>';
					if (this.prompt.required) prompt += "<textarea class='form-control' required></textarea>";else prompt += "<textarea class='form-control'></textarea>";
					prompt += '</form>';
				}

				var d = document.createElement("div"),
				    html = "<div id='" + this.ids.container + "'>\n\t\t\t\t\t\t\t\t<div id='" + this.ids.container + "-content'>\n\t\t\t\t\t\t\t\t\t<h2>" + this.messages.title + "</h2>\n\t\t\t\t\t\t\t\t\t<p>" + this.messages.desc + "</p>\n\t\t\t\t\t\t\t\t\t" + prompt + "\n\t\t\t\t\t\t\t\t\t<footer>";

				if (this.buttons.cancel) html += "<button class=\"" + this.cssclasses.btn_cancel + "\" id=\"" + this.ids.btn_cancel + "\">" + this.messages.cancel + "</button>";

				if (this.buttons.proceed) html += "<button class=\"" + this.cssclasses.btn_proceed + "\" id=\"" + this.ids.btn_proceed + "\">" + this.messages.proceed + "</button>";

				html += "\t\t\t\t\t\t</footer>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t  </div>";

				d.innerHTML = html;
				document.body.appendChild(d);

				var doverlay = document.createElement("div");
				doverlay.innerHTML = "<div id='" + this.ids.overlay + "'></div>";
				document.body.appendChild(doverlay);
			}

			this.modalcontainer = document.getElementById(this.ids.container);
			this.modaloverlay = document.getElementById(this.ids.overlay);
			if (this.buttons.proceed) {
				this.proceed = document.getElementById(this.ids.btn_proceed);
			}
			if (this.buttons.cancel) {
				this.cancel = document.getElementById(this.ids.btn_cancel);
			}
			this._handlers();
		};

		ConfirmModal.prototype._handlers = function _handlers() {

			function handle_btn(e, type) {
				e.preventDefault();

				if (type == 'onProceed') {
					if (this.prompt.enabled && !document.querySelector("#" + this.ids.container + " form").checkValidity()) return false;
					this.promptvalue = document.querySelector("#" + this.ids.container + " form textarea").value;
				}
				if (this.callbacks[type]) this.callbacks[type].call(this, e);
				this._closeMe();
			}

			if (this.buttons.proceed) {
				this.proceed.onclick = handle_btn.bind(this, event, 'onProceed');
			}

			if (this.buttons.cancel) {
				this.cancel.onclick = handle_btn.bind(this, event, 'onCancel');
			}
		};

		ConfirmModal.prototype._closeMe = function _closeMe() {
			this.modalcontainer.parentNode.removeChild(this.modalcontainer);
			this.modaloverlay.parentNode.removeChild(this.modaloverlay);
		};

		_createClass(ConfirmModal, [{
			key: "promptvalue",
			get: function get() {
				return this.prompt.value;
			},
			set: function set(value) {
				this.prompt.value = value;
			}
		}]);

		return ConfirmModal;
	}();

	module.exports = ConfirmModal;
});