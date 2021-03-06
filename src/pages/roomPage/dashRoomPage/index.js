import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useLocation,useHistory} from "react-router";
import SensorCard from "../../../components/sensorCard";
import { Link } from "react-router-dom";
import SensorModal from "../../../components/sensorModal";
import axios from "axios";
import {room_api_deleteRoom, room_api_getSensors} from "../../../data/api";
const DashboardRoomPage = () => {
    const  [toggle,setToggle]=useState(false);
    const location = useLocation();
    const {name} = location.state===undefined||null? {name:null} :location.state;
    let history=useHistory();

    const deleteRoom=()=>{
        const body={
            name: name
        }
        axios.post(room_api_deleteRoom,body).then(()=> {
            history.push("/")
        }).catch(res=>{console.log(res)})
    }
    useEffect(()=>{
        let isMounted=true;
        const intervalID = setTimeout(() =>  {
            if(isMounted) {
                setToggle((toggle) => !toggle)
            }
        }, 2000);

        return () => {
            clearInterval(intervalID);
            isMounted=false;}
    },[toggle])
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
                        setSensors(res.data)
                        window.sessionStorage.setItem("sensors", JSON.stringify(res.data))
                    }
                }).catch(res=>{console.log(res)});
            }
        }catch (e){
            alert("Backend Unavailable Contact Developer")
        }
      return () => { isMounted = false }
    },[name])
  const [show, setShow] = useState(false);

  return (
    <div>
      <SensorModal roomName={name} show={show} onHide={() => setShow(false)} />
      <div className={style.menuContainer}>
        <button className={style.customBtn} onClick={() => setShow(true)}>
          Add Sensor
        </button>
          <button className={style.customBtn} onClick={deleteRoom}>
              Delete Room
          </button>
      </div>

      <div className={style.dashboardWrapper}>
        {sensors?sensors.map((sensor) => {
          return (
            <Link className='mylink'
              to={{
                pathname: "/sensor-data",
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

    </div>
  );
};

export default DashboardRoomPage;
