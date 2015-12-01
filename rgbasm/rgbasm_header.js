function rgbasm(input, callback) {
  console.debug('rgbasm: called')
  var Module = {
    input: input,
    canvas: document.getElementById('canvas'),
    callback: callback,
  };
  arguments = ['-v', '-ooutput.obj', 'input.asm'];
