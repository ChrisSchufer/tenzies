import React, { useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Header from './components/Header'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(createNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  useEffect(() => {
    const firstValue = dice[0].value
    const allDiceSame = dice.every(die => die.isHeld && firstValue === die.value)
    if(allDiceSame){
      setTenzies(true)
    }
    
  }, [dice])

  function generateDie() {
    return (
      {
        id: nanoid(),
        isHeld: false,
        value: Math.ceil(Math.random() * 6)
      }
    )
  }
  console.log(tenzies)

  function createNewDice() {
    const diceArray = []
    for(let i = 0; i < 10; i++){
      diceArray.push(generateDie())
    }
    return diceArray
  }

  function rollDice(){
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die :
          generateDie()
      }))
    }else{
      setTenzies(false)
      setDice(createNewDice())
    }
  }
  console.log(dice)

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return (
        die.id === id ? 
        {...die, isHeld: !die.isHeld} :
        die 
      )
    }))
  }

  const diceElements = dice.map(die => (
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <div className="App">
      {tenzies && <Confetti gravity={.02} />}
      <Header/>
      <div className="die-container">
        {diceElements}
        <button className='btn' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </div>
  )
}

export default App
