

describe('ConfirmModal.js html test page', () => {

	browser.url(`file://${__dirname}/index.spec.html`)

	it('should have the right title', () => {
		expect(browser.getTitle()).to.be.equal('ConfirmModal.js Example');
	})

	it('should have confirm modal element', () => {
		browser.click('#thisbtn')
		expect(browser.isExisting("#mm-confirmmodal")).to.be.true
	})

	it('should have proceed button', () => {
		expect(browser.isExisting('.btn.btn-primary')).to.be.true
	})

	it('should have cancel button', () => {
		expect(browser.isExisting('.btn.btn-danger')).to.be.true
	})

	it('should close the modal on cancel button click', () => {
		browser.click('.btn.btn-danger')
		expect(browser.isExisting("#mm-confirmmodal")).to.be.false
	})

	it('should open new modal without buttons', () => {
		browser.click('#thisbtnnobuttons')
	})
	
	it('should not have proceed button', () => {
		expect(browser.isExisting('.btn.btn-primary')).to.be.false
	})

	it('should not have cancel button', () => {
		expect(browser.isExisting('.btn.btn-danger')).to.be.false
	})
})
