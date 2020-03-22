import './scss/style.scss'
import Data from './data.csv'

const calculator = { result: '0', initialIn: null, secondOp: false }
const performCalculation = {
  '/': (initialIn, secondIn) => initialIn / secondIn,
  '*': (initialIn, secondIn) => initialIn * secondIn,
  '+': (initialIn, secondIn) => initialIn + secondIn,
  '-': (initialIn, secondIn) => initialIn - secondIn,
  '=': (initialIn, secondIn) => secondIn
}

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
  if (target.classList.contains('mathbutton')) {
    doMath(target.value)
    updateDisplay()
    return
  }
  if (target.classList.contains('decimal')) {
    point(target.value)
    updateDisplay()
    return
  }
  if (target.classList.contains('all-clear')) {
    resetCalculator()
    updateDisplay()
    return
  }
  if (target.classList.contains('save')) {
    // perform php here
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

function point(dot) {
  if (calculator.secondOp === true) return
  if (!calculator.result.includes(dot)) { calculator.result += dot }
}

function doMath(nextOperator) {
  const { initialIn, result, operator } = calculator
  const inputValue = parseFloat(result)

  if (operator && calculator.secondOp) {
    calculator.operator = nextOperator
    return
  }
  if (initialIn == null) {
    calculator.initialIn = inputValue
  } else if (operator) {
    const currentValue = initialIn || 0
    const result = performCalculation[operator](currentValue, inputValue)
    calculator.result = String(result.toLocaleString())
    calculator.initialIn = result
  }

  calculator.secondOp = true
  calculator.operator = nextOperator
}


function resetCalculator() {
  calculator.result = '0'
  calculator.initialIn = null
  calculator.secondOp = false
  calculator.operator = null
}