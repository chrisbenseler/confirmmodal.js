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

	afterEach(() => {
		nock.cleanAll()
	})
})