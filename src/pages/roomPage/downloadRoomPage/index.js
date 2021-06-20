import React, {  useEffect, useState } from "react";
import style from "./index.module.css";
import { useLocation} from "react-router";
import SensorCard from "../../../components/sensorCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { room_api_getSensors} from "../../../data/api";

const DownloadRoomPage = () => {
    const location = useLocation();
    const {name} = location.state===undefined||null? {name:null} :location.state;
     const [sensors,setSensors] = useState([]);
    useEffect(()=>{
        let isMounted=true;
        try {
            if(typeof name===undefined||null){
                setSensors(JSON.parse(window.localStorage.getItem("sensors"))?JSON.parse(window.localStorage.getItem("sensors")):[]);

            }else{
                const body = {
                    name: name
                };
                axios.post(room_api_getSensors, body).then(res => {
                    if(isMounted) {
                        setSensors(res.data.sensors)
                        window.sessionStorage.setItem("sensors", JSON.stringify(res.data.sensors))
                    }
                }).catch(res=>{console.log(res)});
            }
        }catch (e){
            alert("Backend Unavailable Contact Developer")
        }
      return () => { isMounted = false }
    },[name])


  return (
      <div className={style.dashboardWrapper}>

        {sensors?sensors.map((sensor) => {
          return (
            <Link className='mylink'
              to={{
                pathname: "/sensor-data-download",
                state: {
                  identity: sensor.identity, name:name
                },
              }}
            >
              <SensorCard identity={sensor.identity} />
            </Link>
          );
        }):<div>Loading</div>}
      </div>

  );
};

export default DownloadRoomPage;
