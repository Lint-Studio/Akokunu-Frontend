import React, { Component, useEffect, useState } from "react";
import style from "./index.module.css";
import useSWR from "swr";
import { useLocation, useParams ,useHistory} from "react-router";
import SensorCard from "../../components/sensorCard";
import { Link } from "react-router-dom";
import SensorModal from "../../components/sensorModal";
import axios from "axios";
import {room_api_getAll, room_api_getSensors} from "../../data/api";
const fetcher = (url) => fetch(url).then((res) => res.json());
const RoomPage = () => {
    const { handle } = useParams();
    const location = useLocation();
    let history = useHistory();
    const {name} = location.state===undefined||null? {name:null} :location.state;
  const [sensors,setSensors] = useState([{identity:"SensorTest"}]);
    useEffect(()=>{

        try {
            if(typeof name===undefined||null){
                setSensors(JSON.parse(window.localStorage.getItem("sensors"))?JSON.parse(window.localStorage.getItem("sensors")):[{identity:"SensorTest"}]);

            }else{
                const body = {
                    name: name
                };
                axios.post(room_api_getSensors, body).then(res => {
                    setSensors(res.data.sensors)
                    window.sessionStorage.setItem("sensors", JSON.stringify(res.data.sensors))
                }).catch(res=>{console.log(res)});
            }
        }catch (e){
            alert("Backend Unavailable Contact Developer")
        }
    },[])
  const [show, setShow] = useState(false);
  return (
    <div>
      <SensorModal show={show} onHide={() => setShow(false)} />
      <div className={style.menuContainer}>
        <button className={style.customBtn} onClick={() => setShow(true)}>
          Add Sensor
        </button>
      </div>

      <div className={style.dashboardWrapper}>

        {sensors?sensors.map((sensor) => {
          return (
            <Link
              to={{
                pathname: "/sensor-data",
                state: {
                  identity: sensor.identity,
                },
              }}
            >
              <SensorCard identity={sensor.identity} />
            </Link>
          );
        }):<div>Loading</div>}
      </div>
    </div>
  );
};

export default RoomPage;
