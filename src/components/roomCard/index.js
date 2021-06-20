import {useEffect, useState} from "react";
import style from "./index.module.css"
import {WiThermometer,WiHumidity} from "react-icons/wi";
import axios from "axios";
import {room_api_getAll, room_api_getAverageTemperature} from "../../data/api";
export default function RoomCard(props){
 
    const [state,setState]=useState({humidity:0,temperature:0});
    useEffect(()=>{
          let isMounted=true;
          if(isMounted){
              if(props.room === null) {
          } else {
              const body = {
                  name: props.room
              }
              axios.post(room_api_getAverageTemperature, body).then(res => {
                  setState(res.data)
              }).catch(res => {
                  console.log(res)
              });
          }
    }
        return () => { isMounted = false };
    },[])
    return(
<>
<div className={style.Card} {...props}>
        <p>
          {props.room}
        </p>
        <div className={"row "}>
        <div className={"col-6 "}>
            <WiThermometer className={style.icon}/>
            <div className={"d-flex flex-row  "+style.info}>
            {state.temperature?state.temperature:<div className="spinner-grow mt-2" role="status">
                 </div>}
              <span className={style.symbols}>&#8451;</span>
            </div>

          </div>
          <div className={"col-6 "}>
            <WiHumidity  className={style.icon}/>
            <div className={"d-flex flex-row  "+style.info}>
              {state.humidity?state.humidity:<div className="spinner-grow mt-2" role="status"/>}
              <span className={style.symbols}>%</span>
            </div>
          </div>
        </div>
      </div>
</>
    );

}