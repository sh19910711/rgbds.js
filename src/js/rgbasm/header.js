function rgbasm(opts, callback) {
  var Module = {
    input: opts.input,
    canvas: document.createElement('canvas'),
    callback: callback,
    arguments: ['-ooutput.obj', 'input.asm'],

		preRun: _=> {
			FS.createDataFile(
				'/',
				'input.asm',
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
  };