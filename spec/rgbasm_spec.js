describe('rgbasm()', () => {
  it('should be a function', () => {
    expect(rgbasm).toBeFunction()
  })

  it('halt', (done) => {
    function toUint8Array(str) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onloadend = _=> {
          resolve(new Uint8Array(fileReader.result))
        }
        fileReader.readAsArrayBuffer(new Blob([str]))
      })
    }
    toUint8Array(__html__['spec/fake/halt.asm']).then(bytes => {
      const options = {
        entry: 'halt.asm',
        files: {
          'halt.asm': bytes,
        }
      }
      rgbasm(options, (ret) => {
        const str = String.fromCharCode.apply(null, ret.slice(0, 4))
        expect(str).toBe('RGB2')
        done()
      })
    })
  })
})
