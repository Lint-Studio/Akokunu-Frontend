import React, {useEffect, useState } from "react";
import style from "./index.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {room_api_getAll} from "../../data/api";
import RoomCard from "../../components/roomCard";




const DownloadPage = () => {
    const [data,setData]=useState([]);
    useEffect(()=>{
        let isMounted=true;
        if(isMounted) {
            axios.get(room_api_getAll).then(res => {
                setData(res.data)
            }).catch(res => {
                console.log(res)
            });
        }

        return () => {
            isMounted = false}
    },[])



    return (
        <div>
            <div className={style.dashboardWrapper}>
                {data.map((room) => {
                    return (
                        <Link className='mylink'
                              to={{
                                  pathname: "/room-data-download",
                                  state: {
                                      name: room.name,
                                  },
                              }}
                        >
                            <RoomCard room={room.name}/>
                        </Link>
                    );
                })
                }
            </div>
        </div>
    );
};

export default DownloadPage;
