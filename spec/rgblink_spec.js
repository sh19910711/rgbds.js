describe('rgblink()', () => {
  it('should be a function', () => {
    expect(rgblink).toBeFunction()
  })

  it('hello', (done) => {
    function toUint8Array(str) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onloadend = _=> {
          resolve(fileReader.result)
        }
        fileReader.readAsArrayBuffer(new Blob([str]))
      })
    }

    const sources = [
      'spec/fake/hello/gbhw.inc',
      'spec/fake/hello/ibmpc1.inc',
      'spec/fake/hello/memory.asm',
      'spec/fake/hello/hello.asm'
    ]

    function getFilename(path) {
      return path.replace(/.*\//, '')
    }

    const promises = sources.map(source => toUint8Array(__html__[source]))
    Promise.all(promises).then(codes => {
      const options = {
        entry: 'hello.asm',
        files: {}
      }
      sources.forEach((source, k) => {
        options.files[getFilename(source)] = codes[k]
      })
      rgbasm(options, (obj) => {
        const str = String.fromCharCode.apply(null, obj.slice(0, 4))
        expect(str).toBe('RGB2')
        done()
      })
    })
  })
})
