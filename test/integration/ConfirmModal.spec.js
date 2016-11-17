let chai = require('chai')
let chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('ConfirmModal.js html test page', () => {

	let nav = browser.url(`file://${__dirname}/index.spec.html`)

	it('should have the right title', () => {
		expect(browser.getTitle()).to.be.equal('ConfirmModal.js Example');

	})

	it('should have confirm modal element', () => {
		return nav.click('#thisbtn').isExisting("#mm-confirmmodal").should.eventually.true
	})

	it('should close the modal on cancel button click', () => {
		browser.click('.btn.btn-danger')
		expect(browser.isExisting("#mm-confirmmodal")).to.be.false
	})

})