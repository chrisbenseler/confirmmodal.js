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
	"use strict";

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

		_createClass(ConfirmModal, [{
			key: "open",
			value: function open() {
				if (!document.getElementById(this.ids.container)) {

					document.querySelector("body").innerHTML += "<div id='" + this.ids.container + "'>\n\t\t\t\t\t\t\t\t<div id='" + this.ids.container + "-content'>\n\t\t\t\t\t\t\t\t\t<h2>" + this.opts.messages.title + "</h2>\n\t\t\t\t\t\t\t\t\t<p>" + this.opts.messages.desc + "</p>\n\t\t\t\t\t\t\t\t\t<div class=\"pull-right\">\n\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" id=\"" + this.ids.btn_cancel + "\">" + this.opts.messages.cancel + "</button>\n\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" id=\"" + this.ids.btn_proceed + "\">" + this.opts.messages.proceed + "</button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t  <div id='mm-confirmmodal-overlay'></div>";
				}

				this.modalcontainer = document.getElementById(this.ids.container);
				this.modaloverlay = document.getElementById(this.ids.overlay);

				this.proceed = document.getElementById(this.ids.btn_proceed);
				this.cancel = document.getElementById(this.ids.btn_cancel);

				this.handlers();
			}
		}, {
			key: "handlers",
			value: function handlers() {
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
			}
		}, {
			key: "closeMe",
			value: function closeMe() {
				//$(this.modalcontainer).remove();
				//$(this.modaloverlay).remove();
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