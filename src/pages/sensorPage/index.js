import React, {useEffect, useState} from "react";
import style from "./index.module.css";
import GaugeChart from "react-gauge-chart";
import {useHistory, useLocation} from "react-router";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import GraphCard from "../../components/graphCard"
import axios from "axios";
import {sensor_api_deleteSensor, sensor_api_getSensorDataAll} from "../../data/api";
export default function SensorPage(){
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
        axios.post(sensor_api_deleteSensor,body).then(res=> {
            history.goBack()
        }).catch(res=>{console.log(res)})
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
            <div className={"container-fluid"}>
                <div className={"d-flex flex-row justify-content-end"}>
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className={"btn btn-primary "+style.excelDownloadButton}
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download as XLS"/>

                    <button className={style.customBtn} onClick={deleteSensor}>
                        Delete Sensor
                    </button>


                </div>

                <div className={"row"}>
                    <div className={"col-lg-6"}>
                        <div className={style.tableContainer}>
                            <table className={"table"} style={{overflow:"auto"}} id="table-to-xls">
                                <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Temperature</th>
                                    <th scope="col">Humidity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data?data.map((reading,i)=>{
                                    let info=getMinutes(reading);
                                    let row;
                                    if ((minutes % 1)===0){
                                        time_arr.push(info)
                                        handler(reading)
                                        console.log("SensorData")
                                        row= <tr key={"reading_"+i}>
                                            <td>{date_info}</td>
                                            <td>{info}</td>
                                            <td>{reading.temperature}</td>
                                            <td>{reading.humidity}</td>
                                        </tr>

                                    }

                                    return row;}):<div>Loading</div>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={"col-lg-6"}>
                        <GraphCard className={style.graphContainer} time={time_arr} humidity={humidity} temperature={temperature}/>
                        <div style={{backgroundColor:"black"}}>
                        </div>
                    </div>
                </div>

                <div className={"d-flex flex-row justify-content-center "+style.gaugeContainer}>
                    <GaugeChart
                        id="gauge-chart-1"
                        nrOfLevels={50}
                        textColor={"#000000"}
                        arcsLength={[0.3, 0.5, 0.2]}
                        colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                        percent={temperature[0]/45}
                        arcPadding={0.02}
                        style={{height:10}}
                    />
                    <GaugeChart
                        id="gauge-chart-2"
                        nrOfLevels={50}
                        arcsLength={[0.3, 0.5, 0.2]}
                        textColor={"#000000"}
                        colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                        percent={humidity[0]/100}
                        arcPadding={0.02}
                        style={{height:10}}
                    />
                </div>

            </div>
        </>
    );

}