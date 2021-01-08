import React, { useEffect }from 'react';
import { Container, Row, Col, Spinner} from 'reactstrap';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
// import { Spinner } from 'reactstrap';

import Heading from "../heading";
import List, {AdminItem, UserItem} from '../list'
import Splitters, {Splitter} from '../splitters'; 
import {WithRoomService} from '../with-service';
import { setRoom, removeItem } from '../../actions/room'
import AddItemForm from '../forms/add-item-form';
import { AlertModal } from "../modals";
import { showModal, hideModal } from '../../actions/modal'

// import './home-page.sass';

function RoomPage({ RoomService, loading, room, setRoom, removeItem, modal, modalProps, showModal, hideModal }) {
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
          await RoomService.getRoom(room._id)
            .then(response => {
                setRoom(response.data.room)})
            .catch(e => { handleUnauthError(e) });
        };
        fetchRooms();
        // eslint-disable-next-line
      }, []);

    const onDelete = (i, itemId) => {
        const deleteItem = async () =>{
            return await RoomService.deleteItem(room._id, itemId)
            .catch(e => { handleUnauthError(e) });
        };
        deleteItem().then(() => hideModal()).then(() => removeItem(i));
    }

    const renderItems = () => {
        return room.items.map((item, i) => {
            const { _id, name, price, divideAmoung} = item;
            return room.isAdmin 
                ? <AdminItem 
                    key={_id} 
                    text={name} 
                    divideAmoung={divideAmoung} 
                    price={price}
                    onDelete={() => showModal({index: i, id: item._id, name})}/>
                : null;
        });
    };

    return (
        <section>
        <Container>
            <Row>
                <Col>
                    <Heading tag="h2" className="heading--2" text={"Room: " + (room.name ? room.name : "")}/>
                    <Row>
                        <Col md={{size: 5}}>
                            <Heading tag="h3" className="heading--3 heading--center" text="Splitters"/>
                            <Splitters>
                                <Splitter id="s1" firstName="Dima" lastName="Hlebov"/>
                                <Splitter id="s2" firstName="Dimafdsf" lastName="Hlesdfsbov"/>
                                <Splitter id="s3" firstName="Dima" lastName="Hlebov"/>
                                <Splitter id="s4" firstName="Dima" lastName="Hlebov"/>
                            </Splitters>
                        </Col>
                        <Col>
                            <Heading tag="h3" className="heading--3 heading--center" text="Items"/>
                            {
                                (loading) 
                                    ? <div className="d-flex justify-content-center"><Spinner color="secondary"/></div> 
                                        : (!room.items)
                                            ? <div className="mt-4 mb-4 text-center">Add new item using form below.</div> 
                                            : (room.items.length !== 0)
                                                ? <List headers={[
                                                        {header:'Name', className: 'item-name'}, 
                                                        {header:'Divide amoung', className: 'item-divide'}, 
                                                        {header:'Price', className: 'item-price'}, 
                                                        {header:'', className: 'item-remove'}
                                                        ]}>
                                                        {renderItems()}
                                                </List>
                                                : <div className="mt-4 mb-4 text-center">Add new item using form below.</div>
                            }
                            <AddItemForm/>
                        </Col>
                    </Row>
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

const mapStateToProps = ({room: { room, loading }, modal: {modal, modalProps}}) => {
    return {
        room,
        modal,
        modalProps,
        loading
    };
  };
  
  const mapDispatchToProps = {
    setRoom,
    removeItem,
    showModal,
    hideModal,
  }

export default WithRoomService()(connect(mapStateToProps, mapDispatchToProps)(RoomPage)) ;
