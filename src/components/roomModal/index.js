
import {Button, Modal} from "react-bootstrap";
import axios from "axios"
import {room_api_deleteRoom, room_api_postNewRoom} from "../../data/api";
import {useContext} from "react";
import UpdateContext from "../../data/context";
import {useHistory} from "react-router";
export default function RoomModal(props) {
    const history = useHistory()
    let roomName="";
    const handleRoomNameChange=(event)=>{roomName=event.target.value}
    const handleSubmit=()=>{
      if(roomName===""){

      }else{
          const body={
              name:roomName
          }
          axios.post(room_api_postNewRoom,body).then(res=> {
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
              Create Room
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <input type="text" placeholder={"Room Name"} onChange={handleRoomNameChange}/> 
      </Modal.Body>
      <Modal.Footer>
          <button className={"btn btn-primary"} onClick={handleSubmit}>Create</button>
          <button className={"btn btn-primary"} onClick={props.onHide}>Close</button>
      </Modal.Footer>
  </Modal>
    );
}