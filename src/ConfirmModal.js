export default class ConfirmModal {

	constructor(opts) {
		this.opts = opts;

		let prefix = this.opts.id_prefix ? this.opts.id_prefix : "mm-confirmmodal"
		;
		this.ids = {
			btn_cancel:  prefix + "-cancel",
			btn_proceed: prefix + "-proceed",
			container: prefix,
			overlay: prefix + "-overlay"
		};
	}

	open() {
		if(!document.getElementById(this.ids.container)) 
			$("body").append(`<div id='${this.ids.container}'>
								<div id='${this.ids.container}-content'>
									<h2>${this.opts.messages.title}</h2>
									<p>${this.opts.messages.desc}</p>
									<div class="pull-right">
									<button class="btn btn-primary" id="${this.ids.btn_cancel}">${this.opts.messages.cancel}</button>
									<button class="btn btn-primary" id="${this.ids.btn_proceed}">${this.opts.messages.proceed}</button>
									</div>
								</div>
							  </div>
							  <div id='mm-confirmmodal-overlay'></div>`);

		this.modalcontainer = document.getElementById(this.ids.container);
		this.modaloverlay = document.getElementById(this.ids.overlay);

		this.proceed = document.getElementById(this.ids.btn_proceed);
		this.cancel = document.getElementById(this.ids.btn_cancel);

		this.handlers();
	}

	handlers() {
		this.proceed.onclick = event => {
			event.stopPropagation();
			if(this.opts.onProceed) {
				this.opts.onProceed(event);
			}
			this.closeMe();
		}

		this.cancel.onclick = event => {
			event.stopPropagation();
			if(this.opts.onCancel)
				this.opts.onCancel(event);
			this.closeMe();
		}
	}

	closeMe() {
		$(this.modalcontainer).remove();
		$(this.modaloverlay).remove();
	}
}