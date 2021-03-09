"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PubSub = /*#__PURE__*/function () {
  function PubSub() {
    _classCallCheck(this, PubSub);

    this.subscriptions = {};
  }

  _createClass(PubSub, [{
    key: "subscribe",
    value: function subscribe(key, fn) {
      this.subscriptions[key] = fn;
    }
  }, {
    key: "publish",
    value: function publish(key, parameters) {
      if (this.subscriptions[key]) {
        this.subscriptions[key](parameters);
      }
    }
  }]);

  return PubSub;
}();

var ConfirmModal = /*#__PURE__*/function () {
  /**
   * @param {Object} options
   */
  function ConfirmModal(opts) {
    _classCallCheck(this, ConfirmModal);

    this.pubSub = new PubSub();
    this.events = {
      proceed: null,
      cancel: null
    };

    this._resolveOptions(opts);
  }

  _createClass(ConfirmModal, [{
    key: "promptvalue",
    get: function get() {
      return this.prompt.value;
    },
    set: function set(value) {
      this.prompt.value = value;
    }
    /**
     * Overrides or not default configuration with user provided options
     * @param {Object} options
     */

  }, {
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
        onProceed: typeof options.onProceed === "function" ? options.onProceed : null,
        onCancel: typeof options.onCancel === "function" ? options.onCancel : null
      };
      var buttons = options.buttons ? options.buttons : {};
      this.buttons = {
        cancel: typeof buttons.cancel === "boolean" ? buttons.cancel : true,
        proceed: typeof buttons.proceed === "boolean" ? buttons.proceed : true
      };
      var prompt = options.prompt ? options.prompt : {};
      this.prompt = {
        enabled: typeof prompt.enabled === "boolean" ? prompt.enabled : false,
        required: typeof prompt.required === "boolean" ? prompt.required : false,
        value: null
      };
    }
    /**
     * Open the confirm modal
     */

  }, {
    key: "open",
    value: function open() {
      if (!document.getElementById(this.ids.container)) {
        var prompt = "";

        if (this.prompt.enabled) {
          prompt = "<form>";
          if (this.prompt.required) prompt += "<textarea class='form-control' required></textarea>";else prompt += "<textarea class='form-control'></textarea>";
          prompt += "</form>";
        }

        var d = document.createElement("div"),
            html = "<div id='".concat(this.ids.container, "'>\n\t\t\t\t\t\t\t\t<div id='").concat(this.ids.container, "-content'>\n\t\t\t\t\t\t\t\t\t<h2>").concat(this.messages.title, "</h2>\n\t\t\t\t\t\t\t\t\t<p>").concat(this.messages.desc, "</p>\n\t\t\t\t\t\t\t\t\t").concat(prompt, "\n\t\t\t\t\t\t\t\t\t<footer>");
        if (this.buttons.cancel) html += "<button class=\"".concat(this.cssclasses.btn_cancel, "\" id=\"").concat(this.ids.btn_cancel, "\">").concat(this.messages.cancel, "</button>");
        if (this.buttons.proceed) html += "<button class=\"".concat(this.cssclasses.btn_proceed, "\" id=\"").concat(this.ids.btn_proceed, "\">").concat(this.messages.proceed, "</button>");
        html += "\t\t\t\t\t\t</footer>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t  </div>";
        d.innerHTML = html;
        document.body.appendChild(d);
        var doverlay = document.createElement("div");
        doverlay.innerHTML = "<div id='".concat(this.ids.overlay, "'></div>");
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

      return this;
    }
  }, {
    key: "on",
    value: function on(event_name) {
      var _this = this;

      if (["proceed", "cancel"].indexOf(event_name) < 0) return null;
      return new Promise(function (resolve) {
        _this.pubSub.subscribe(event_name, function () {
          resolve(_this);
        });
      });
    }
    /**
     * Button handlers
     */

  }, {
    key: "_handlers",
    value: function _handlers() {
      function handle_btn(type) {
        if (type == "onProceed") {
          if (this.prompt.enabled && !document.querySelector("#".concat(this.ids.container, " form")).checkValidity()) return false;
          if (this.prompt.enabled) this.promptvalue = document.querySelector("#".concat(this.ids.container, " form textarea")).value;
        }

        if (this.callbacks[type]) this.callbacks[type](this);
        if (type == "onProceed") this.pubSub.publish("proceed", this);else if (type == "onCancel") this.pubSub.publish("cancel", this);
        this.close();
      }

      if (this.buttons.proceed) {
        this.proceed.onclick = handle_btn.bind(this, "onProceed");
      }

      if (this.buttons.cancel) {
        this.cancel.onclick = handle_btn.bind(this, "onCancel");
      }
    }
    /**
     * Close confirm
     */

  }, {
    key: "close",
    value: function close() {
      if (!this.modalcontainer && !this.modaloverlay) {
        return new Error("Confirm Modal seems to be not opened");
      }

      this.modalcontainer.parentNode.removeChild(this.modalcontainer);
      this.modaloverlay.parentNode.removeChild(this.modaloverlay);
    }
  }]);

  return ConfirmModal;
}();

module.exports = ConfirmModal;