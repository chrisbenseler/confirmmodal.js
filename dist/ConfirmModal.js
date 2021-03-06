(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ConfirmModal = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

class PubSub {
  constructor() {
    this.subscriptions = {};
  }

  subscribe(key, fn) {
    this.subscriptions[key] = fn;
  }

  publish(key, parameters) {
    if (this.subscriptions[key]) {
      this.subscriptions[key](parameters);
    }
  }
}

class ConfirmModal {
  /**
   * @param {Object} options
   */
  constructor(opts) {
    this.pubSub = new PubSub();
    this.events = { proceed: null, cancel: null };
    this._resolveOptions(opts);
  }

  get promptvalue() {
    return this.prompt.value;
  }

  set promptvalue(value) {
    this.prompt.value = value;
  }

  /**
   * Overrides or not default configuration with user provided options
   * @param {Object} options
   */
  _resolveOptions(options = {}) {
    const prefix = options.id_prefix ? options.id_prefix : "mm-confirmmodal";

    this.ids = {
      btn_cancel: prefix + "-cancel",
      btn_proceed: prefix + "-proceed",
      container: prefix,
      overlay: prefix + "-overlay",
    };

    const cssclasses = options.cssclasses ? options.cssclasses : {};

    this.cssclasses = {
      btn_cancel: cssclasses.btn_cancel
        ? cssclasses.btn_cancel
        : "btn btn-danger",
      btn_proceed: cssclasses.btn_proceed
        ? cssclasses.btn_cancel
        : "btn btn-primary",
    };

    const messages = options.messages || {};
    this.messages = {
      title: messages.title ? messages.title : "Confirm",
      desc: messages.desc ? messages.desc : "",
      cancel: messages.cancel ? messages.cancel : "Cancel",
      proceed: messages.proceed ? messages.proceed : "Confirm",
    };

    this.callbacks = {
      onProceed:
        typeof options.onProceed === "function" ? options.onProceed : null,
      onCancel:
        typeof options.onCancel === "function" ? options.onCancel : null,
    };

    const buttons = options.buttons ? options.buttons : {};
    this.buttons = {
      cancel: typeof buttons.cancel === "boolean" ? buttons.cancel : true,
      proceed: typeof buttons.proceed === "boolean" ? buttons.proceed : true,
    };

    const prompt = options.prompt ? options.prompt : {};
    this.prompt = {
      enabled: typeof prompt.enabled === "boolean" ? prompt.enabled : false,
      required: typeof prompt.required === "boolean" ? prompt.required : false,
      value: null,
    };
  }

  /**
   * Open the confirm modal
   */
  open() {
    if (!document.getElementById(this.ids.container)) {
      let prompt = "";
      if (this.prompt.enabled) {
        prompt = "<form>";
        if (this.prompt.required)
          prompt += `<textarea class='form-control' required></textarea>`;
        else prompt += `<textarea class='form-control'></textarea>`;
        prompt += "</form>";
      }

      let d = document.createElement("div"),
        html = `<div id='${this.ids.container}'>
								<div id='${this.ids.container}-content'>
									<h2>${this.messages.title}</h2>
									<p>${this.messages.desc}</p>
									${prompt}
									<footer>`;

      if (this.buttons.cancel)
        html += `<button class="${this.cssclasses.btn_cancel}" id="${this.ids.btn_cancel}">${this.messages.cancel}</button>`;

      if (this.buttons.proceed)
        html += `<button class="${this.cssclasses.btn_proceed}" id="${this.ids.btn_proceed}">${this.messages.proceed}</button>`;

      html += `						</footer>
								</div>
							  </div>`;

      d.innerHTML = html;
      document.body.appendChild(d);

      let doverlay = document.createElement("div");
      doverlay.innerHTML = `<div id='${this.ids.overlay}'></div>`;
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

  on(event_name) {
    if (["proceed", "cancel"].indexOf(event_name) < 0) return null;

    return new Promise((resolve) => {
      this.pubSub.subscribe(event_name, () => {
        resolve(this);
      });
    });
  }

  /**
   * Button handlers
   */
  _handlers() {
    function handle_btn(type) {
      if (type == "onProceed") {
        if (
          this.prompt.enabled &&
          !document.querySelector(`#${this.ids.container} form`).checkValidity()
        )
          return false;
        if (this.prompt.enabled)
          this.promptvalue = document.querySelector(
            `#${this.ids.container} form textarea`
          ).value;
      }
      if (this.callbacks[type]) this.callbacks[type](this);

      if (type == "onProceed") this.pubSub.publish("proceed", this);
      else if (type == "onCancel") this.pubSub.publish("cancel", this);

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
  close() {
    if (!this.modalcontainer && !this.modaloverlay) {
      return new Error("Confirm Modal seems to be not opened");
    }
    this.modalcontainer.parentNode.removeChild(this.modalcontainer);
    this.modaloverlay.parentNode.removeChild(this.modaloverlay);
  }
}

module.exports = ConfirmModal;

},{}]},{},[1])(1)
});
