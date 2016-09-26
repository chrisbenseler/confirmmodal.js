
describe('ConfirmModal.js html test page', () => {

	let nav = browser.url(`file://${__dirname}/index.spec.html`)

    it('should have the right title', () => {
        var title = browser.getTitle()
        expect(title).to.be.equal('ConfirmModal.js Example');
	})

    it('should have confirm modal element', () => {
		return nav.click('#thisbtn').isExisting("#mm-confirmmodal").then( isExisting => {
			expect(isExisting).to.be.true
		})
    })
		
})