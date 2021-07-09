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


