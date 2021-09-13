// Taken from https://stackoverflow.com/questions/17445231/js-how-to-find-the-greatest-common-divisor
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a)

const $ = id => document.getElementById(id)

const form = $('simplifier')
const inputA = $('a')
const inputB = $('b')
const submit = $('go')

form.addEventListener('input', e => {
  form.classList.remove('intent-success')

  const a = inputA.valueAsNumber || 0
  const b = inputB.valueAsNumber || 0
  const d = gcd(a, b)
  console.log('GCD of %i and %i is %i', a, b, d)

  if (!inputA.value || !inputB.value || d != 1) {
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

  let a = inputA.valueAsNumber || 0
  let b = inputB.valueAsNumber || 0

  const places = Math.max(
    a.toString().split('.')[1]?.length ?? 0,
    b.toString().split('.')[1]?.length ?? 0
  )
  a *= Math.pow(10, places)
  b *= Math.pow(10, places)

  const d = gcd(a, b)
  a /= d || 1
  b /= d || 1

  inputA.valueAsNumber = a
  inputB.valueAsNumber = b

  form.classList.add('intent-success')
  submit.innerText = "Simplified"
})
