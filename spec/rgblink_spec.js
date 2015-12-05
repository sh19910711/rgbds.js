describe('rgblink()', () => {
  it('should be a function', () => {
    expect(rgblink).toBeFunction()
  })

  it('hello', (done) => {
    const sources = [
      'spec/fake/hello/gbhw.inc',
      'spec/fake/hello/ibmpc1.inc',
      'spec/fake/hello/memory.asm',
      'spec/fake/hello/hello.asm'
    ]

    // convert string into buffer
    const promises = sources.map(source => toBuffer(__html__[source]))
    Promise.all(promises).then(codes => {
      // generate project
      const asmOptions = {
        entry: 'hello.asm',
        files: {},
        verbose: true
      }
      sources.forEach((source, k) => {
        asmOptions.files[getFilename(source)] = codes[k]
      })

      rgbasm(asmOptions, (obj) => {
        const linkOptions = {
          entry: 'hello.obj',
          files: { 'hello.obj': new Uint8Array(obj) }
        }
        rgblink(linkOptions, (gb) => {
          // title
          const name = String.fromCharCode.apply(null, gb.subarray(0x134, 0x134+7))
          expect(name).toBe('EXAMPLE')

          // logo
          const logo = new Uint8Array([
            0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B, 0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D,
            0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E, 0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99,
            0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC, 0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E
          ])
          expect(gb.subarray(0x104, 0x134)).toEqual(logo)

          done()
        })
      })
    })
  })
})
