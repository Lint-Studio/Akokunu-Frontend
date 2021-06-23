import {useEffect, useState} from "react";
import style from "./index.module.css";
import {WiThermometer,WiHumidity} from "react-icons/wi";
import axios from "axios";
import {sensor_api_getSensorData} from "../../data/api";
export default function SensorCard(props){

    const [state,setState]=useState([]);
    let oneLoad=false;
    useEffect(()=>{
        let isMounted=true;
        let source = axios.CancelToken.source();
        if(isMounted) {
            const body = {
                identity: props.identity,
                length: 4
            };
            axios.post(sensor_api_getSensorData, body).then(res => {
                    oneLoad=true;
                    setState(res.data);
                }
            ).catch(res => {
                console.log(res)
            });
        }
        return () => { isMounted = false;
            source.cancel("Cancelling in cleanup");
        };
    },[oneLoad])
    return(
<>
<div className={style.Card} {...props}>
        <p>
          {props.identity}<span/>
        </p>
    <div className={"mt-.1 mb-.1"}>
        Current Readings
    </div>
        <div className={"row "}>
        <div className={"col-6 "}>
            <WiThermometer className={style.icon}/>
            <div className={"d-flex flex-row  "+style.info}>
            {state.length===0?<div className="spinner-grow mt-2" role="status"/>:state[0].temperature
                 }
              <span className={style.symbols}>&#8451;</span>
            </div>

          </div>
          <div className={"col-6 "}>
            <WiHumidity  className={style.icon}/>
            <div className={"d-flex flex-row  "+style.info}>
              {state.length===0?<div className="spinner-grow mt-2" role="status"/>:state[0].humidity}
              <span className={style.symbols}>%</span>
            </div>
          </div>
        </div>
      </div>
</>
    );

}