const calculator = { result: '0', initialIn: null, secondOp: false }
function updateDisplay() {
  const display = document.querySelector('.result')
  display.value = calculator.result.includes(',') ? (+(calculator.result.replace(/,/g, ''))).toLocaleString() : (+calculator.result).toLocaleString()
}

updateDisplay()

const keys = document.querySelector('.calc')
keys.addEventListener('click', (event) => {
  const { target } = event
  if (!target.matches('button')) {
    return
  }
  input(target.value)
  updateDisplay()
})

function input(digit) {
  const { result, secondOp } = calculator
  if (secondOp === true) {
    calculator.result = digit
    calculator.secondOp = false
  } else {
    calculator.result = result === '0' ? digit : result + digit
  }
}
