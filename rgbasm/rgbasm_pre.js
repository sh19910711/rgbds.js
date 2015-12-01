Module['preRun'].push(_=> {
  console.debug('create input.asm')
  FS.createDataFile(
    '/',
    'input.asm',
    Module['input'],
    true,
    false
  )
});

Module['postRun'] = _=> {
  console.log('postRun')
  console.log(FS.findObject('/input.asm').contents)

  const length = FS.stat('/output.obj').size
  const stream = FS.open('/output.obj', 'r')
  const buf = new Uint8Array(length)
  FS.read(stream, buf, 0, length, 0)
  FS.close(stream)
  Module['callback'](buf);
};
