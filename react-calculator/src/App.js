import { useReducer } from 'react';
import DigitBtn from './DigitBtn';
import OperationBtn from './OperationBtn';
import './App.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }

      if (payload.digit === '0' && state.currentOperand === '0') {
        return state
      }

      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }

      case ACTIONS.CHOOSE_OPERATION:
        // eslint-disable-next-line no-undef
        if (state.currentOperand == null && state.prevOperand == null) {
          return state
        }

        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }

        if (state.prevOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            prevOperand: state.currentOperand,
            currentOperand: null,
          }
        }

        return {
          ...state,
          prevOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null,
        }

      case ACTIONS.CLEAR: 
        return {}

      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperand: null
          }
        }

        if (state.currentOperand == null) return state

        if (state.currentOperand.length === 1) {
          return { 
            ...state,
            currentOperand: null,
          }
        }

        return {
          ...state, 
          currentOperand: state.currentOperand.slice(0, -1),
        }

      case ACTIONS.EVALUATE:
        if(state.operation == null ||
           state.currentOperand == null ||
           state.prevOperand == null) {
             return state
           }
        
        return {
          ...state,
          overwrite: true,
          prevOperand: null,
          operation: null,
          currentOperand: evaluate(state),
        }
  }
}

function evaluate({ currentOperand, prevOperand, operation}) {
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) {
    return ''
  }
  let computation = ''

  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {maximumFractionDigits: 0,})

function formatOperand(operand) {
  if (operand == null) return

  const [integer, decimal] = operand.split('.')

  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {

  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="prev-operand">{formatOperand(prevOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>

      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>

      <OperationBtn operation="/" dispatch={dispatch} />
      <DigitBtn digit="1" dispatch={dispatch} />
      <DigitBtn digit="2" dispatch={dispatch} />
      <DigitBtn digit="3" dispatch={dispatch} />
      <OperationBtn operation="*" dispatch={dispatch} />

      <DigitBtn digit="4" dispatch={dispatch} />
      <DigitBtn digit="5" dispatch={dispatch} />
      <DigitBtn digit="6" dispatch={dispatch} />
      <OperationBtn operation="+" dispatch={dispatch} />

      <DigitBtn digit="7" dispatch={dispatch} />
      <DigitBtn digit="8" dispatch={dispatch} />
      <DigitBtn digit="9" dispatch={dispatch} />
      <OperationBtn operation="-" dispatch={dispatch} />

      <DigitBtn digit="." dispatch={dispatch} />
      <DigitBtn digit="0" dispatch={dispatch} />
      <button 
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
