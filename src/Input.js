import React from "react";
import "./style.css"
import {nanoid} from "nanoid"
import moment from "moment";

export default function Input(props){

    const[record, setRecord] = React.useState(() => JSON.parse(localStorage.getItem("record")) || [])
    const[cambio, setCambio] = React.useState("")
    const[arrowRoll, setArrowRoll] = React.useState(null)
    const[arrowTime, setArrowTime] = React.useState(null)



    console.log(cambio)

    React.useEffect(() => {
      localStorage.setItem("record", JSON.stringify(record))
    }, [record]);

    const array = record.slice(0, 5).map((item) =>(
      <div key={item.id} className="record">
        <p className="record-name">{item.name}</p>
        <p className="record-rolls">{item.rolls}</p>  
        <p className="record-clicks">{item.clicks}</p>
        <p className="record-time">{item.time + "s"}</p>
        <p className="record-date">{item.date}</p>
      </div>
    ))
    
    function createNewRecord(){
      const newRecord ={
        id: nanoid(),
        name: document.getElementById("nameRecord").value || "User",
        rolls: props.numOfRolls,
        clicks: props.numOfClicks,
        date: moment().subtract(10, 'days').calendar(),
        time: props.seconds
      }
    setRecord(prevRecord => [...prevRecord, newRecord])
    props.setDice(props.allNewDice())
    props.setNumOfRolls(0)
    props.setnumOfClicks(0)
    props.setSeconds(0)
 
    }

    React.useEffect(()=>{
      if (cambio === ""){
      function SortArray(x, y){
        if (x.time < y.time) {return -1;}
        if (x.time > y.time) {return 1;}
        return 0;
      }
      setRecord(record.sort(SortArray))
      setCambio("")

    } else if (cambio ==="sortByRoll"){
      function SortArray(x, y){
        if (x.rolls < y.rolls) {return -1;}
        if (x.rolls > y.rolls) {return 1;}
        return 0;
      }
      setRecord(record.sort(SortArray))
      setCambio("")
      setArrowRoll(true)
      setArrowTime(false)

    } else if (cambio === "sortByTime"){
      function SortArray(x, y){
        if (x.time < y.time) {return -1;}
        if (x.time > y.time) {return 1;}
        return 0;
      }
      setRecord(record.sort(SortArray))
      setCambio("")
      setArrowRoll(false)
      setArrowTime(true)
    }
    },[record, cambio])

    function sortByTime(){
      setCambio("sortByTime")
    }
    function sortByRolls(){
      setCambio("sortByRoll")
    }

  return (
    <div>
      <div className="input">
          <label htmlFor="nameRecord"></label>
          {props.tenzies &&<input 
              className="inputName"
              id="nameRecord"
              placeholder="Write your name to save the record..."
          ></input>}
          {props.tenzies &&<button
            className="save"          
            onClick={createNewRecord}
          >Save
          </button>}
      </div>
        <h2 className="recordTable">Record Table</h2>
      <div className="recordHeader">
        <h3 className="record-name-button">Name</h3>
        <h3 onClick={sortByRolls} className="record-rolls-button">Rolls {arrowRoll? "↓" : ""}</h3>
        <h3 className="record-clicks-button">Click</h3>
        <h3 onClick={sortByTime} className="record-time-button">Time {arrowTime? "↓" : ""}</h3>
        <h3 className="record-date-button">Date</h3>
      </div>
        <h4 className="array">{array}</h4>
    </div>
    
  );
}
