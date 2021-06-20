import React, {useEffect, useState} from "react";
import style from "./index.module.css";
import GaugeChart from "react-gauge-chart";
import {useHistory, useLocation} from "react-router";
import GraphCard from "../../../components/graphCard"
import axios from "axios";
import {sensor_api_deleteSensor, sensor_api_getSensorDataAll} from "../../../data/api";
export default function DashboardSensorPage(){
    const location = useLocation() ;

    const {identity}  = location.state===undefined||null? {identity:null,name:null} : location.state;
    let current_date="none";

    let  date_info;
    let  minutes;

    let humidity = [];
    let temperature = [];
    let time_arr = [];

    const [data,setData] = useState([{humidity:0,temperature:0,timestamp:"2021-05-31T12:16:59.020Z"}])
    const  [toggle,setToggle]=useState(false);
    let history=useHistory();

    const deleteSensor=()=>{
        const body={
            identity: identity
        }
        axios.post(sensor_api_deleteSensor,body).then(()=> {
            history.goBack()
        }).catch(res=>{console.log(res,toggle)})
    }


    useEffect(()=>{
        let isMounted=true;
        if(isMounted) {
            try {
                if (typeof identity === undefined || null) {

                    setData(JSON.parse(window.localStorage.getItem("sensors-data")) ? JSON.parse(window.localStorage.getItem("sensors")) : [{
                        humidity: 0,
                        temperature: 0,
                        timestamp: "2021-05-31T12:16:59.020Z"
                    }]);
                } else {

                    const body = {
                        identity: identity
                    };

                    axios.post(sensor_api_getSensorDataAll, body).then(res => {
                        if (isMounted) {
                            setData(res.data);
                            window.sessionStorage.setItem("sensor-data", JSON.stringify(res.data))

                        }
                    }).catch(res => {
                        console.log(res)
                    });

                }
            } catch (e) {
                alert("Backend Unavailable Contact Admin")
            }
        }
        const intervalID = setTimeout(() =>  {
            if(isMounted) {
                setToggle((toggle) => !toggle)
            }
        }, 100);

        return () => {
            clearInterval(intervalID);
            isMounted=false;
        }
    },[identity])


    const getMinutes=(reading)=>{
        let date= new Date(reading.timestamp);
        minutes=date.getMinutes()
        return ""+date.getUTCHours()+":"+date.getMinutes()
    }

    const handler=(reading)=>{
        let date= new Date(reading.timestamp);
        humidity.push(reading.humidity);
        temperature.push(reading.temperature);
        date_info=date.getDate()+"-"+date.toLocaleString('default', { month: 'long' })+"-"+date.getFullYear();
        if (current_date===date_info){
            date_info="";
        }
        else {
            current_date=date_info;
        }
        return date_info;

    }
    return(
        <>
            <div className={"container-fluid "+style.mainContainer}>
                {data?data.map((reading)=>{
                    let info=getMinutes(reading);
                    if ((minutes % 1)===0){
                        time_arr.push(info)
                        handler(reading)
                        console.log("SensorData")

                    }
                }):<div>Loading</div>}
                <div className={"d-flex flex-row justify-content-end"}>
                    <button className={style.customBtn} onClick={deleteSensor}>
                        Delete Sensor
                    </button>
                </div>

                <div className={"row"}>
                    <div className={"col-lg-12"}>
                        <GraphCard className={style.graphContainer} time={time_arr} humidity={humidity} temperature={temperature}/>
                    </div>
                </div>

                <div className={"d-flex flex-row flex-wrap  justify-content-center "+style.gaugeContainer}>
                    <GaugeChart
                        id="gauge-chart-1"
                        nrOfLevels={50}
                        textColor={"#000000"}
                        arcsLength={[0.3, 0.5, 0.2]}
                        colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                        percent={temperature[0]/45}
                        arcPadding={0.02}

                    />
                    <GaugeChart
                        id="gauge-chart-2"
                        nrOfLevels={50}
                        arcsLength={[0.3, 0.5, 0.2]}
                        textColor={"#000000"}
                        colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                        percent={humidity[0]/100}
                        arcPadding={0.02}

                    />
                </div>

            </div>
        </>
    );

}