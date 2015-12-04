describe('rgbasm()', () => {
  it('should be a function', () => {
    expect(rgbasm).toBeFunction()
  })

  it('halt', (done) => {
    window.Module = {
      input: __html__['spec/rgbasm/hello.asm']
    }
    rgbasm(Module['input'], ret => {
      str = String.fromCharCode.apply(null, ret.slice(0, 4))
      expect(str).toBe('RGB2')
      done()
    })
  })
})
