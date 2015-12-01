'use strict'

function find(id) {
  return document.getElementById(id)
}

function get(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = _=> {
      resolve(xhr)
    }
    xhr.send()
  })
}

function toUint8Array(str) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onloadend = _=> {
      resolve(new Uint8Array(fileReader.result))
    }
    fileReader.readAsArrayBuffer(new Blob([str]))
  })
}

function compile(source) {
  toUint8Array(source).then(input => {
    rgbasm(input, (result)=> {
      console.log(result)
    })
  })
}

function start() {
  // set example source
  const sourceText = find('source-text')
  get('/hello.asm').then(res => {
    sourceText.value = res.responseText
  })

  // set event
  const compileButton = find('compile-button')
  compileButton.addEventListener('click', e => {
    compile(sourceText.value)
  })
}

window.onload = start
