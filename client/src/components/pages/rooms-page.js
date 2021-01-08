import React, { useEffect } from 'react';
import { Container, Row, Col} from 'reactstrap';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spinner } from 'reactstrap';

import Form from '../forms/add-room-form.js';
import Heading from "../heading";
import List, {RoomItem} from '../list'
import {WithRoomService} from '../with-service';
import { setRooms, removeRoom } from '../../actions/rooms'
import { setSelectedRoom } from '../../actions/room'
import { AlertModal } from "../modals";
import { showModal, hideModal } from '../../actions/modal'

const RoomsPage = ({RoomService, rooms, setRooms, removeRoom, setSelectedRoom, loading, modal, modalProps, showModal, hideModal}) => {
  let history = useHistory();

  const handleUnauthError = (err) => {
    if(err.response){
      if(err.response.status === 401){
        history.push("/sign-in");
      }
    }else{
      console.log(err)
    }
  }

  useEffect(() =>{
    const fetchRooms = async () => {
      await RoomService.getRooms()
        .then(response => setRooms(response.data.rooms))
        .catch(e => { handleUnauthError(e) });
    };
    fetchRooms();
    // eslint-disable-next-line
  }, []);

  const onDelete = (i, id) => {
    const deleteRooms = async () =>{
     return await RoomService.deleteRoom(id)
      .catch(e => { handleUnauthError(e) });
    };
    deleteRooms().then(() => hideModal()).then(() => removeRoom(i));
  }

  const onSelect = (roomID) => {
    history.push(`/rooms/${roomID}`);
    setSelectedRoom(roomID);
  };

  const renderRoomItems = () => {
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const year = date.getUTCFullYear() + 1,
            month = date.getUTCMonth(),
            day = date.getUTCDate();
      return `${day}.${month}.${year}`
    }

    return rooms.map((item, i) => {
      const name = `${item.name} ${formatDate(item.createdAt)}`;
      return (
        <RoomItem 
          key={item._id} 
          text={name} 
          onDelete={ () => showModal({index: i, id: item._id, name}) }
          onSelect={ () => onSelect(item._id)}
          admin={item.isAdmin}/>
      )
      });
  }

  return (
    <section>
      <Container>
        <Row>
          <Col>
            <Heading tag="h2" className="heading--2" text="Rooms"/>
            <Form/>
            {  
              (loading) 
                ? <div className="d-flex justify-content-center"><Spinner color="secondary"/></div>
                  : (rooms) 
                    ? <List headers={["Room name"]}>
                        {renderRoomItems()}
                      </List>
                    : <div>You don't have rooms yet. Provide name to create one.</div>
            }
          </Col>
        </Row>
        
      </Container>
      <AlertModal 
        modal={modal} 
        onClose={hideModal} 
        onConfirm={() => onDelete(modalProps.index, modalProps.id)} 
        text={`Are you sure you want to remove \n
        ${modalProps.name}`} />
    </section>
  );
}

const mapStateToProps = ({rooms: {rooms, loading}, modal: {modal, modalProps}}) => {
  return {
    rooms,
    loading,
    modal,
    modalProps
  };
};

const mapDispatchToProps = {
  setRooms,
  removeRoom,
  showModal,
  hideModal,
  setSelectedRoom
}

export default WithRoomService()(connect(mapStateToProps, mapDispatchToProps)(RoomsPage)) ;

