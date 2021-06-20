import React, {useRef} from "react";
import style from "./index.module.css"
import {cred} from "../../data/cred"
import { FaSkyatlas } from "react-icons/fa";


const LoginPage=(props)=> {
  const usernameRef=useRef(null);
  const passwordRef=useRef(null);
   const validate=()=>{
     let vaild=false;
    
     cred.map((user)=>{
       if( user.usename===usernameRef.current.value && user.password===passwordRef.current.value){
        vaild=true;
       }
     })
     props.dispatch({type:vaild});
 
   }

    return (
      <>
      <div className={style.myBg}>
        <div className={style.logicCard}>
            <FaSkyatlas className={style.logo}/>
            <h3 className={style.myTitle}>Legendary Smart Monitor</h3>
            <input ref={usernameRef} type="text" placeholder="Username..." className={style.inputFormat}/>
            <input ref={passwordRef} type="password" placeholder="Password..." className={style.inputFormat}/>
            <button className={style.myButton} onClick={validate}>Login</button>
        </div>
      </div>
      </>
    );
  }


export default LoginPage;
