import {useContext, useState} from "react";
import style from "./index.module.css"
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {room_api_postNewRoom, sensor_api_postNewSensor} from "../../data/api";
import UpdateContext from "../../data/context";
import {useHistory} from "react-router";
export default function SensorModal(props){
    const history = useHistory()
  let id="";
  const handleSensorIDChange=(event)=>{id=event.target.value}
  const handleSubmit=(event)=>{
    if(id===""){
    }else{
        const body={
            identity:id,
            roomName: props.roomName
        }

        axios.post(sensor_api_postNewSensor,body).then(res=> {
            history.go(0)
        }).catch(res=>{console.log(res)})
     props.onHide();
    }

  }
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Create Sensor
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <input type="text" placeholder={"Sensor ID"} onChange={handleSensorIDChange}/> 
    </Modal.Body>
    <Modal.Footer>
        <button className={"btn btn-primary"} onClick={handleSubmit}>Create</button>
        <button className={"btn btn-primary"} onClick={props.onHide}>Close</button>
    </Modal.Footer>
</Modal>
  );
}