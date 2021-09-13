// Taken from https://stackoverflow.com/questions/17445231/js-how-to-find-the-greatest-common-divisor
const gcd = (a, b) => !b ? a : gcd(b, a % b)

const $ = id => document.getElementById(id)

const form = $('simplifier')
const inputA = $('a')
const inputB = $('b')
const submit = $('go')

form.addEventListener('input', e => {
  form.classList.remove('intent-success')

  const a = inputA.valueAsNumber || 0
  const b = inputB.valueAsNumber || 0
  const f = gcd(a, b)

  if (!inputA.value || !inputB.value || f != 1) {
    submit.disabled = false
    submit.innerText = "Simplify"
  } else {
    submit.disabled = true
    submit.innerText = "Not Simplifiable"
  }
})

form.addEventListener('submit', e => {
  e.preventDefault()

  if (!inputA.value) return inputA.focus()
  if (!inputB.value) return inputB.focus()

  const a = inputA.valueAsNumber || 0
  const b = inputB.valueAsNumber || 0
  const f = gcd(a, b)
  inputA.valueAsNumber = a / f
  inputB.valueAsNumber = b / f

  form.classList.add('intent-success')
  submit.innerText = "Simplified"
})
