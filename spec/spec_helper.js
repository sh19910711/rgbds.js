function toBuffer(str) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onloadend = _=> {
      resolve(new Uint8Array(fileReader.result))
    }
    fileReader.readAsArrayBuffer(new Blob([str]))
  })
}

function getFilename(path) {
  return path.replace(/.*\//, '')
}
