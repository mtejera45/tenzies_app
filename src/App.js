import React from "react";
import Die from "./Die";
import Input from "./Input";
import "./style.css";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App() {

  const[dice, setDice] = React.useState(allNewDice())
  const[tenzies, setTenzies] = React.useState(false)
  const[numOfRolls, setNumOfRolls] = React.useState(0)
  const[numOfClicks, setnumOfClicks] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.held)
    const fisrtValue = dice[0].value
    const sameValue = dice.every(die => die.value === fisrtValue)
    if (allHeld && sameValue){
      setTenzies(true)
      setIsActive(false)
    } else {
      setTenzies(false)
    }
  },[dice])
  
  function generateNewDie(){
    return {
      value: randomDieValue(),
      held: false,
      id: nanoid()
    }
  }
  function randomDieValue(){
    return Math.ceil(Math.random() * 6)
  }
  function allNewDice(){
    const newArray =[]
    for (var i = 0; i < 10; i++){
      newArray.push(generateNewDie())
    }
    return newArray
  }

  function rollDice(){
    setNumOfRolls(numOfRolls+1)
    if (!tenzies){
    setDice(prevDice => prevDice.map(die =>{
      return die.held?
      die:
      generateNewDie()
      setNumOfRolls(0)
      setnumOfClicks(0)
      setSeconds(0)
    }))
  } else {
    setDice(allNewDice())
    setNumOfRolls(0)
    setnumOfClicks(0)
    setSeconds(0)
  }
}
  function holdDice(id){
    setIsActive(true)
    setnumOfClicks(numOfClicks+1)
    setDice(prevDice => prevDice.map(die => {
      return die.id === id?
      {...die,
      held: !die.held} :
      die
    }))
  }  
    //TIMER//

    React.useEffect(() => {
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds]);

    //TIMER//

  return (
    <main>
      
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <br/>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <br/>
      <Die
        dice={dice}
        holdDice={holdDice}
      />
      <br/>
      <br/>
      <button className="roll-dice" onClick={rollDice}>{tenzies? "New Game" : "Roll"}</button>
      <p className="numOfRolls"> <strong>Rolls: </strong>{numOfRolls} &#160; <strong>clicks:</strong> {numOfClicks} &#160; <strong>Time:</strong> {seconds}</p>

      <Input
      numOfRolls={numOfRolls}
      numOfClicks={numOfClicks}
      setNumOfRolls={setNumOfRolls}
      setnumOfClicks={setnumOfClicks}
      setDice={setDice}
      allNewDice={allNewDice}
      tenzies={tenzies}
      setSeconds={setSeconds}
      setIsActive={setIsActive}
      seconds={seconds}
      />
    </main>
  );
}

