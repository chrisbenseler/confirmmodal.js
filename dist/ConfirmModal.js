(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ConfirmModal = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

		/**
   * Overrides or not default configuration with user proveided options
   * @param {Object} options
   */


		_createClass(ConfirmModal, [{
			key: "_resolveOptions",
			value: function _resolveOptions() {
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
			}
		}, {
			key: "open",
			value: function open() {
				if (!document.getElementById(this.ids.container)) {

					var d = document.createElement("div"),
					    html = "<div id='" + this.ids.container + "'>\n\t\t\t\t\t\t\t\t<div id='" + this.ids.container + "-content'>\n\t\t\t\t\t\t\t\t\t<h2>" + this.messages.title + "</h2>\n\t\t\t\t\t\t\t\t\t<p>" + this.messages.desc + "</p>\n\t\t\t\t\t\t\t\t\t<footer>";

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
			}
		}, {
			key: "_handlers",
			value: function _handlers() {
				var _this = this;

				if (this.buttons.proceed) {
					this.proceed.onclick = function (event) {
						event.preventDefault();
						if (_this.callbacks.onProceed) {
							_this.callbacks.onProceed(event);
						}
						_this._closeMe();
					};
				}

				if (this.buttons.cancel) {
					this.cancel.onclick = function (event) {
						event.preventDefault();
						if (_this.callbacks.onCancel) _this.callbacks.onCancel(event);
						_this._closeMe();
					};
				}
			}
		}, {
			key: "_closeMe",
			value: function _closeMe() {
				this.modalcontainer.parentNode.removeChild(this.modalcontainer);
				this.modaloverlay.parentNode.removeChild(this.modaloverlay);
			}
		}]);

		return ConfirmModal;
	}();

	module.exports = ConfirmModal;
});

},{}]},{},[1])(1)
});