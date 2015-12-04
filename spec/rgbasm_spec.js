describe('rgbasm()', () => {
	it('should be a function', () => {
		expect(rgbasm).toBeFunction()
	})

  it('halt', (done) => {
    console.log(__html__['spec/rgbasm/hello.asm'])
    window.Module = {
      input: __html__['spec/rgbasm/hello.asm']
    }
    rgbasm(Module['input'], _=> {
      console.log('done?')
      done()
    })
  })
})
