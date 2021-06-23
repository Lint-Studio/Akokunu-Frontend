import React, {useEffect, useState} from "react";
import style from "./index.module.css";
import {useHistory, useLocation} from "react-router";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from "axios";
import { sensor_api_getSensorDataAll} from "../../../data/api";
export default function DownloadSensorPage(){
    const location = useLocation() ;

    const {identity}  = location.state===undefined||null? {identity:null,name:null} : location.state;
    let current_date="none";

    let  date_info;
    let  minutes;

    let time_arr = [];

    const [data,setData] = useState([{humidity:0,temperature:0,createdAt:"2021-05-31T12:16:59.020Z"}])
    const  [toggle,setToggle]=useState(false);
    useHistory();


    useEffect(()=>{
        let isMounted=true;
        if(isMounted) {
            try {
                if (typeof identity === undefined || null) {

                    setData(JSON.parse(window.localStorage.getItem("sensors-data")) ? JSON.parse(window.localStorage.getItem("sensors")) : [{
                        humidity: 0,
                        temperature: 0,
                        createdAt: "2021-05-31T12:16:59.020Z"
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
                        console.log(res,toggle)
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
    },[identity]);

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

    const getMinutes=(reading)=>{
        let date= new Date(reading.createdAt);
        minutes=date.getMinutes()
        return ""+date.getUTCHours()+":"+date.getMinutes()
    }

    const handler=(reading)=>{
        let date= new Date(reading.createdAt);
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
                        table={"table-to-xls-"+identity}
                        filename={identity}
                        sheet={identity}
                        buttonText="Download as XLS"/>

                </div>
                <div className={style.tableContainer}>
                            <table className={"table"} id={"table-to-xls-"+identity}>
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


        </>
    );

}