function rgbfix(opts, callback) {
  var Module = {
    input: opts.input,
    canvas: document.createElement('canvas'),
    callback: callback,
    arguments: ['-ooutput', 'input'],
  };
