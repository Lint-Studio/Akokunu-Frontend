import React, { Component, useEffect, useRef, useState } from "react";
import style from "./index.module.css"
import useSWR from "swr";
import RoomCard from "../../components/roomCard";
import {cred} from "../../data/cred"
import { FaSkyatlas } from "react-icons/fa";

const fetcher = url => fetch(url).then(res => res.json());
const LoginPage=(props)=> {
  const usernameRef=useRef(null);
  const passwordRef=useRef(null);
   const validate=()=>{
     var vaildID=false;
    
     cred.map((user)=>{
       if( user.usename===usernameRef.current.value && user.password===passwordRef.current.value){
        vaildID=true;
       }
     })
     props.dispatch({type:vaildID}); 
 
   }

    return (
      <>
      <div className={style.myBg}>
        <div className={style.logicCard}>
            <FaSkyatlas className={style.logo}/>
            <h3 className={style.myTitle}>Legendary Smart Monitor</h3>
            <input ref={usernameRef} type="text" placeholder="Username..." className={style.inputFormat}/>
            <input ref={passwordRef}type="password" placeholder="Password..." className={style.inputFormat}/>
            <button className={style.myButton}onClick={validate}>Login</button>
        </div>
      </div>
      </>
    );
  }


export default LoginPage;
