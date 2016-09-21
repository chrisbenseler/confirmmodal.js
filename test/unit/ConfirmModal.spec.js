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
		it('should return an object', () => {
			expect(new ConfirmModal()).to.be.an('object')
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

	

	afterEach(() => {
		nock.cleanAll()
	})
})