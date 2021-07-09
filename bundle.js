(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { getBase64 } = require('../lib/getBase64')

document.addEventListener('DOMContentLoaded', function onDomReady() {
  const username = document.getElementById('username')
  const description = document.getElementById('description')
  const amount = document.getElementById('amount')
  const participants = document.getElementById('participants')
  const date = document.getElementById('date')
  const image = document.getElementById('image')

  const submit = document.getElementById('submit')
  const form = document.getElementById('new-expense')

  date.valueAsDate = new Date()

  form.addEventListener('submit', event => event.preventDefault())
  submit.addEventListener('click', async function onFormSubmission() {
    const debug = document.getElementById('debug')
    const imgData = await getBase64(image.files[0])
    const jsObject = {
      username: username.value,
      description: description.value,
      amount: amount.valueAsNumber,
      participants: participants.value.split(','),
      date: date.valueAsDate,
      image: imgData
    }

    debug.innerText = JSON.stringify(jsObject, null, 2)
    document.getElementById("preview").src = imgData
  })
})



},{"../lib/getBase64":2}],2:[function(require,module,exports){
module.exports = { getBase64 }

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

},{}]},{},[1]);
