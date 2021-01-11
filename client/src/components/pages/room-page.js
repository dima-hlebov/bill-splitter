import React, { useEffect }from 'react';
import { Container, Row, Col, Spinner, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
// import { Spinner } from 'reactstrap';

import Heading from "../heading";
import List, {Item} from '../list'
import Splitters, {Splitter} from '../splitters'; 
import AddItemForm from '../forms/add-item-form';
import { AlertModal } from "../modals";
import {WithRoomService} from '../with-service';
import { setRoom, removeItem, selectItem, unSelectItem } from '../../actions/room'
import { showModal, hideModal } from '../../actions/modal'
import { formatDate, handleError } from '../../helper';

import '../forms/input.sass';
import Button from '../button';

function RoomPage({ RoomService, loading, user, room, setRoom, removeItem, selectItem, unSelectItem, modal, modalProps, showModal, hideModal }) {
    let history = useHistory();

    useEffect(() =>{
        const fetchRooms = async () => {
          await RoomService.getRoom(room._id)
            .then(response => {
                setRoom(response.data.room)})
            .catch(e => { handleError(e, history) });
        };
        fetchRooms();
        // eslint-disable-next-line
      }, []);

      
    const renderSplitters = () => {
        if(room.members){
            return room.members.map((splitter, i) => {
                const { _id: id, firstName, secondName } = splitter;
                return (<Splitter key={id} id={`splitter${i}`} firstName={firstName} lastName={secondName}/>);
            })
        }
        return (<div className="d-flex justify-content-center"><Spinner color="secondary"/></div> );
    }
    
    const onDelete = (i, itemId) => {
        RoomService.deleteItem(room._id, itemId)
            .then(() => hideModal())
            .then(() => removeItem(i))
            .catch(e => { handleError(e) });
    }

    const onToggle = (index, itemId) => {
        if(!(room.items[index].payees.filter(payee => payee._id === user._id).length > 0)){
            RoomService.selectItem(room._id, itemId)
                .then(() => selectItem(index, user))
                .catch(e => handleError(e, history));
        }else{
            RoomService.unSelectItem(room._id, itemId)
                .then(() => unSelectItem(index, user))
                .catch(e => handleError(e, history));
        }
    };

    const renderItems = () => {
        return room.items.map((item, i) => {
            const { _id, name, price, divideAmoung, payees } = item;
            return room.isAdmin 
                ? <Item 
                    key={_id} 
                    text={`${name}`} 
                    divideAmoung={divideAmoung} 
                    price={price}
                    onDelete={() => showModal({index: i, id: item._id, name})}
                    onToggleItem={() => onToggle(i, _id)}
                    payees={payees}
                    admin/>
                : <Item 
                    key={_id} 
                    text={`${name}`} 
                    divideAmoung={divideAmoung} 
                    price={price}
                    onDelete={() => showModal({index: i, id: item._id, name})}/>;
            });
    };

    const getHeaders = () => {
        if (room.isAdmin){
            return [{header:'Name', className: 'item-name'}, 
                    // {header:'Divide amoung', className: 'item-divide'}, 
                    {header:'Price', className: 'item-price'}, 
                    {header:'', className: 'item-remove'}]
        }
        return [{header:'Name', className: 'item-name'}, 
                // {header:'Divide amoung', className: 'item-divide'}, 
                {header:'Price', className: 'item-price'}]
    };

    return (
        <section>
        <Container>
            <Row>
                <Col>
                    <Heading tag="h2" className="heading--2" text={`Room: ${(room.name ? room.name : "")} ${(formatDate(room.createdAt))}`}/>
                    <Row>
                        <Col md={{size: 5}}>
                            <Heading tag="h3" className="heading--3 heading--center" text="Splitters"/>
                            <Splitters>
                                {renderSplitters()}
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
                                                ? <List headers={getHeaders()}>
                                                        {renderItems()}
                                                </List>
                                                : <div className="mt-4 mb-4 text-center">Add new item using form below.</div>
                            }
                            <div className="d-flex">
                                <Button text="Pay" className="button--w100"/>
                                <div className="d-flex justify-self-end">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Sum</InputGroupText>
                                        <Input type="number" className="my-input" disabled value={room.sum ? room.sum : 0}/>
                                    </InputGroupAddon>
                                </div>
                            </div>
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

const mapStateToProps = ({auth: {user}, room: { room, loading }, modal: {modal, modalProps}}) => {
    return {
        room,
        modal,
        modalProps,
        loading,
        user
    };
  };
  
  const mapDispatchToProps = {
    setRoom,
    removeItem,
    showModal,
    hideModal,
    selectItem,
    unSelectItem
  }

export default WithRoomService()(connect(mapStateToProps, mapDispatchToProps)(RoomPage)) ;
