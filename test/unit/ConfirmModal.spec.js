'use strict'

import chai from 'chai'
import nock from 'nock'
import ConfirmModal from '../../src/ConfirmModal.js'
import jsdom from 'mocha-jsdom'

let expect = chai.expect

describe('ConfirmModal (unit)', () => {

	jsdom()

	describe('when imported', () => {
		it('should return a Function', () => {
			expect(ConfirmModal).to.be.an('function')
		})
	})

	describe('when instantiated', () => {
		let modal = new ConfirmModal();
		it('should return an object', () => {
			expect(modal).to.be.an('object')
		})

		it('should have default message values', () => {
			expect(modal.messages.title).to.be.equal('Confirm')
			expect(modal.messages.desc).to.be.equal('')
			expect(modal.messages.cancel).to.be.equal('Cancel')
			expect(modal.messages.proceed).to.be.equal('Confirm')
		})
	})

	describe('when passed custom messages', () => {
		let modal = new ConfirmModal({
			messages: {
				title: "test title",
				desc: "test desc",
				cancel: "test cancel",
				proceed: "test proceed"
			}
		});

		it('should have custom message values', () => {
			expect(modal.messages.title).to.be.equal('test title')
			expect(modal.messages.desc).to.be.equal('test desc')
			expect(modal.messages.cancel).to.be.equal('test cancel')
			expect(modal.messages.proceed).to.be.equal('test proceed')
		})

		let other_modal = new ConfirmModal({
			messages: {
				title: "test title",
				cancel: "test cancel",
				proceed: "test proceed"
			}
		})

		it('should be blank if desc is not set', () => {
			expect(other_modal.messages.desc).to.be.equal('')
		})

		it('should have proceed button', () => {
			expect(other_modal.buttons.proceed).to.be.true
		})
		it('should have cancel button', () => {
			expect(other_modal.buttons.cancel).to.be.true
		})

	})

	describe('when passed callback functions', () => {
		
		let modal = new ConfirmModal({
			onProceed: () => {},
			onCancel: () => {}
		})

		it('onProceed should be a function', () => {
			expect(modal.callbacks.onProceed).to.be.an('function')
		})

		it('onCancel should be a function', () => {
			expect(modal.callbacks.onCancel).to.be.an('function')
		})
	})

	describe('when not passed function to callback', () => {
		
		let modal = new ConfirmModal({
			onProceed: 1,
			onCancel: Symbol()
		})

		it('onProceed should not have been changed', () => {
			expect(modal.callbacks.onProceed).to.be.null
		})

		it('onCancel should not have been changed', () => {
			expect(modal.callbacks.onCancel).to.be.null
		})
	})

	describe('when passed prefix to ids', () => {
		
		let modal = new ConfirmModal({
			id_prefix: "customprefix"
		})

		it('prefix should be customprefix', () => {
			expect(modal.ids.container).to.be.equal('customprefix')
		})

	})

	describe('when passed css class names to be overriden', () => {
		
		let modal = new ConfirmModal({
			cssclasses: {
				btn_cancel: "class1",
				btn_proceed: "class2"
			}
		})

		it('css class from cancel button should be class1', () => {
			expect(modal.cssclasses.btn_cancel).to.be.equal('class1')
		})

		it('css class from proceed button should be class2', () => {
			expect(modal.cssclasses.btn_proceed).to.be.equal('class1')
		})

	})

	describe('when passed false to buttons', () => {
		let new_modal = new ConfirmModal({ buttons: { cancel: false, proceed: false } });
		
		it('should not have proceed button', () => {
			expect(new_modal.buttons.proceed).to.be.false
		})
		it('should not have cancel button', () => {
			expect(new_modal.buttons.cancel).to.be.false
		})
	})

	describe('when create modal with prompt', () => {
		let new_modal = new ConfirmModal({ prompt: { enabled: true, required: true } });
		
		it('should have textarea', () => {
			expect(new_modal.prompt.enabled).to.be.true
			new_modal.open()
			expect(document.querySelector('#mm-confirmmodal form')).to.be.not.null
			expect(document.querySelector('#mm-confirmmodal form textarea').getAttribute('required')).to.be.not.null
		})
		it('should not have cancel button', () => {
			expect(new_modal.prompt.required).to.be.true
		})
		it('should have get/set for prompt value', () => {
			new_modal.promptvalue = 3
			expect(new_modal.promptvalue).to.be.equals(3)
			new_modal.close()
		})
		
		let o_new_modal = new ConfirmModal({ prompt: { enabled: true, required: false } });
		it('should have textarea not required', () => {
			o_new_modal.open()
			expect(document.querySelector('#mm-confirmmodal form textarea').getAttribute('required')).to.be.null
		})
	})

	describe('when use promise', () => {

		let p_modal = new ConfirmModal()
		it('should have a promise for proceed event', () => {
			expect(p_modal.on('proceed')).to.be.a('promise')
		})
		it('should have a promise for cancel event', () => {
			expect(p_modal.on('cancel')).to.be.a('promise')
		})
		it('should not have a promise for other event', () => {
			expect(p_modal.on('proc')).to.be.null
		})
		
	})

	let options = {
		prompt: {
			enabled: true,
			required: true
		}
	}

	describe('close', () => {
		let p_modal = new ConfirmModal(options)
		it('should not close if is not opened', () => {
			let e = p_modal.close()
			expect(e instanceof Error).to.be.true
		})
		it('should close', () => {
			p_modal.open()
			expect(document.querySelector('#mm-confirmmodal')).to.be.not.null
			p_modal.close()
			expect(document.querySelector('#mm-confirmmodal')).to.be.null
		})
	})

	describe('inner pubsub', () => {
		let modal = new ConfirmModal()
		expect(modal.pubSub).to.be.an('object')
		expect(modal.pubSub.subscriptions instanceof Object).to.be.true

		it('should subscribe', () => {
			modal.pubSub.subscribe('key one', function() { return true })
			expect(modal.pubSub.subscriptions['key one']).to.be.an('function')
		})

		it('should publish', () => {
			modal.pubSub.subscribe('key two', function(random_data) { 
				expect(25).to.be.equals(random_data)
			})
			modal.pubSub.publish('key two', 25)
		})
	})

	

	afterEach(() => {
		nock.cleanAll()
	})
})