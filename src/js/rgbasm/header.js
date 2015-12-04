function rgbasm(options, callback) {
  var Module = {}

  Object.assign(Module, options)

  Object.assign(Module, {
    canvas: document.createElement('canvas'),
    callback: callback,
    arguments: ['-ooutput.obj', Module.entry],

    preRun: _=> {
      Object.keys(Module.files).forEach(function(filename) {
        createProjectFile(filename)
      })
    },

    postRun: _=> {
      const output = '/output.obj'
      const length = FS.stat(output).size
      const stream = FS.open(output, 'r')
      const buf = new Uint8Array(length)
      FS.read(stream, buf, 0, length, 0)
      FS.close(stream)
      callback(buf)
    },
  })

  function createProjectFile(filename) {
    FS.createDataFile(
      '/',
      filename,
      Module.files[filename],
      true,
      false
    )
  }

