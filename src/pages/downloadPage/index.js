import React, { Component, useEffect, useState } from "react";
import style from "./index.module.css"
import useSWR from "swr";
import RoomCard from "../../components/roomCard";
const fetcher = url => fetch(url).then(res => res.json());
const DownloadPage=()=> {


    return (
      <div className={style.dashboardWrapper}>

      </div>
    );
  }


export default DownloadPage;
