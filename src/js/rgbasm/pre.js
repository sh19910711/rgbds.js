Module['preRun'].push(function() {
  FS.createDataFile(
    '/',
    'input.asm',
    Module['input'],
    true,
    false
  )
})

Module['postRun'] = function() {
	const output = '/output.obj'.freeze()
	const length = FS.stat(output).size
	const stream = FS.open(output, 'r')
	const buf = new Uint8Array(length)
	FS.read(stream, buf, 0, length, 0)
	FS.close(stream)
	Module['callback'](buf)
}
