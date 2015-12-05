describe('rgbasm()', () => {
  it('should be a function', () => expect(rgbasm).toBeFunction())

  it('halt', (done) => {
    toBuffer(__html__['spec/fake/halt.asm']).then(bytes => {
      const asmOptions = {
        entry: 'halt.asm',
        files: {
          'halt.asm': bytes,
        }
      }
      rgbasm(asmOptions, (ret) => {
        const str = String.fromCharCode.apply(null, ret.slice(0, 4))
        expect(str).toBe('RGB2')
        done()
      })
    })
  })
})
