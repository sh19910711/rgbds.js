function rgblink(opts, callback) {
  var Module = {
    input: opts.input,
    canvas: document.createElement('canvas'),
    callback: callback,
    arguments: ['-ooutput.obj', 'input.asm'],
  };
