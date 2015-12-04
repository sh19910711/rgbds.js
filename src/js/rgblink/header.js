function rgblink(options, callback) {
  var Module = {}

  Object.assign(Module, {
    canvas: document.createElement('canvas'),
    callback: callback,
    arguments: ['-ooutput.gb', 'input.obj'],

    preRun: _=> {
      FS.createDataFile(
        '/',
        'input.obj',
        Module['input'],
        true,
        false
      )
    },

    postRun: _=> {
      const output = '/output.obj'
      const length = FS.stat(output).size
      const stream = FS.open(output, 'r')
      const buf = new Uint8Array(length)
      FS.read(stream, buf, 0, length, 0)
      FS.close(stream)
      callback(buf)
    }
  });

  Object.assign(Module, options)
