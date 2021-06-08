import React from "react";
import "./App.css";
// STEP 4 - import the button and display components
// Don't forget to import any extra css/scss files you build into the correct component

// Logo has already been provided for you. Do the same for the remaining components
import Logo from "./components/DisplayComponents/Logo";
import Display from './components/DisplayComponents/Display'
import Specials from './components/ButtonComponents/SpecialButtons/Specials'
import Numbers from './components/ButtonComponents/NumberButtons/Numbers'
import Operators from './components/ButtonComponents/OperatorButtons/Operators'

function App() {
  // STEP 5 - After you get the components displaying using the provided data file, write your state hooks here.
  // Once the state hooks are in place write some functions to hold data in state and update that data depending on what it needs to be doing
  // Your functions should accept a parameter of the the item data being displayed to the DOM (ie - should recieve 5 if the user clicks on
  // the "5" button, or the operator if they click one of those buttons) and then call your setter function to update state.
  // Don't forget to pass the functions (and any additional data needed) to the components as props
  const [numA, setNumA] = React.useState('0')
  const [operator, setOperator] = React.useState('')
  const [numB, setNumB] = React.useState('')
  const [displayNum, setDisplayNum] = React.useState(numA)

  function inputNumber(label) {
    if (!operator || operator === '=') { // set first number
        if (numA == '0' || operator === '=') {
            setNumA(label)
            setOperator('')
        }
        else setNumA(numA + label)
    }
    else { // set second number
        if (!numB || numB === '0') setNumB(label)
        else setNumB(numB + label)
    }
  }

  function inputOperator(value) {
      if (!operator || !numB) { // set operator
          setOperator(value)
      }
      else { // eval previous operator
          setNumA(eval(numA+operator+numB))
          setNumB('')
          setOperator(value)
      }
  }

  function inputSpecial(label) {
      switch (label) {
        case 'C':
            setNumA('0')
            setOperator('')
            setNumB('')
            break
        case '+/-':
            if (numB) setNumB(String(Number(numB) * -1))
            else setNumA(String(Number(numA) * -1))
            break
        case '%':
            if (numB) setNumB(String(Number(numB) / 100))
            else setNumA(String(Number(numA) / 100))
            break
      }
  }

  React.useEffect(()=>{
    setDisplayNum(numB?numB:numA)
  },[numA,numB])

  return (
    <div className="container">
      <Logo />
      <div className="App">
        {/* STEP 4 - Render your components here and be sure to properly import/export all files */}
        <Display displayNum={displayNum} />
        <div className='button-container'>
            <div>
                <Specials className='specials-container' handler={inputSpecial} />
                <Numbers className='numbers-container' handler={inputNumber} />
            </div>
            <Operators className='operators-container' handler={inputOperator} />
        </div>
      </div>
    </div>
  );
}

export default App;
