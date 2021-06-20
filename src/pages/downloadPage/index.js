import React, {useEffect, useState} from "react";
import style from "./index.module.css"
import SearchBar from "../../components/searchBar";
import axios from "axios";
import {room_api_getAll, room_api_getSensors, sensor_api_getSensorDataAll} from "../../data/api";

const DownloadPage=()=> {
    const [sensorName,setSensorName]=useState("");
    const [data,setData]=useState([])
    const [rooms,setRooms]=useState([])
    let sbData = [];
    useEffect(()=>{
        let isMounted=true
        if(isMounted){
            axios.get(room_api_getAll).then(res => {
                setRooms(res.data);
                sbData.push(
                    rooms.map((room)=>{
                    const body = {
                        name: room.name
                    };
                    let re_val={}

                    axios.post(room_api_getSensors, body).then(res => {
                        console.log(res)
                       re_val={label: "RoomOne",
                           options: [
                               res.data.map((sensor)=>{
                                   return {label: sensor.identity, value: sensor.identity};
                           })
                           ]
                       }
                    }).catch(res=>{console.log(res)
                    });
                    console.log(sbData)
                    return re_val
                    }

                ))
            }).catch(res => {
                console.log(res)
            });
        }
        return ()=>{isMounted=false}

    },[]);

   useEffect(()=>{
       let isMounted=true
       if(isMounted){
           if (sensorName===""){}
           else {
               const body = {
                   identity: sensorName
               };
               axios.post(sensor_api_getSensorDataAll, body).then(res => {
                       setData(res.data);
               }).catch(res => {
                   console.log(res)
               });
           }

       }
       return ()=>{isMounted=false}

   },[]);

    const handleChange=(e)=>{
         setSensorName(e.value)
    }
    return (
        <>
      <div>
          <div>
              <SearchBar className={style.searchBar}
                         value={sensorName}
                         onChange={handleChange}
                         data={sbData}/>
          </div>
          <div>

          </div>
      </div>
            </>
    );
  }


export default DownloadPage;
