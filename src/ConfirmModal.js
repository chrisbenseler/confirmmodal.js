
class ConfirmModal {

	/**
     * @param {Object} options
     */
	constructor(opts) {
		this._resolveOptions(opts);
	}

	/**
	 * Overrides or not default configuration with user proveided options
	 * @param {Object} options
	 */
	_resolveOptions(options = {}) {

		let prefix = options.id_prefix ? options.id_prefix : "mm-confirmmodal"

		this.ids = {
			btn_cancel:  prefix + "-cancel",
			btn_proceed: prefix + "-proceed",
			container: prefix,
			overlay: prefix + "-overlay"
		}

		let cssclasses = options.cssclasses ? options.cssclasses : {};

		this.cssclasses = {
			btn_cancel: cssclasses.btn_cancel ? cssclasses.btn_cancel : "btn btn-danger",
			btn_proceed: cssclasses.btn_proceed ? cssclasses.btn_cancel : "btn btn-primary"
		}

		this.messages = options.messages;

		this.callbacks = {
			onProceed:  (typeof options.onProceed === 'function') ? options.onProceed : null,
			onCancel:  (typeof options.onCancel === 'function') ? options.onCancel : null
		}
	}

	/**
	 * Open the confirm modal
	 */
	open() {
		if(!document.getElementById(this.ids.container)) {

			let d = document.createElement("div");
			d.innerHTML = `<div id='${this.ids.container}'>
								<div id='${this.ids.container}-content'>
									<h2>${this.messages.title}</h2>
									<p>${this.messages.desc}</p>
									<footer>
										<button class="${this.cssclasses.btn_cancel}" id="${this.ids.btn_cancel}">${this.messages.cancel}</button>
										<button class="${this.cssclasses.btn_proceed}" id="${this.ids.btn_proceed}">${this.messages.proceed}</button>
									</footer>
								</div>
							  </div>`;
			document.body.appendChild(d);

			let doverlay = document.createElement("div");
			doverlay.innerHTML = `<div id='${this.ids.overlay}'></div>`;
			document.body.appendChild(doverlay);
		}

		this.modalcontainer = document.getElementById(this.ids.container);
		this.modaloverlay = document.getElementById(this.ids.overlay);
		this.proceed = document.getElementById(this.ids.btn_proceed);
		this.cancel = document.getElementById(this.ids.btn_cancel);

		this._handlers();
	}

	/**
	 * Button handlers
	 */
	_handlers() {
		this.proceed.onclick = event => {
			event.preventDefault();
			if(this.callbacks.onProceed) {
				this.callbacks.onProceed(event);
			}
			this._closeMe();
		}

		this.cancel.onclick = event => {
			event.preventDefault();
			if(this.callbacks.onCancel)
				this.callbacks.onCancel(event);
			this._closeMe();
		}
	}

	/**
	 * Close confirm
	 */

	_closeMe() {
		this.modalcontainer.parentNode.removeChild(this.modalcontainer);
		this.modaloverlay.parentNode.removeChild(this.modaloverlay);
	}
}

module.exports = ConfirmModal;