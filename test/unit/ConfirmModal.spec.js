'use strict'

import chai from 'chai'
import nock from 'nock'
import ConfirmModal from '../../src/ConfirmModal.js'

let expect = chai.expect

describe('ConfirmModal (unit)', () => {

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
		})
		it('should not have cancel button', () => {
			expect(new_modal.prompt.required).to.be.true
		})
	})

	afterEach(() => {
		nock.cleanAll()
	})
})