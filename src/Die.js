import React from "react";
import "./style.css"

export default function Die(props){

  const diceElements = props.dice.map((die) => (
    <div
      className="die-face"
      style={{backgroundColor: die.held? "#59e391" : "white"}}
      key={die.id}
      onClick={()=> props.holdDice(die.id)}
    ><h2>
      {die.value}
    </h2>
    </div>
    ))

  return (
    <div>
      <div className="dice-container">{diceElements}</div>
    </div>
  );
}
