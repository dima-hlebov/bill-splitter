import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Spinner } from 'reactstrap';
import { WithRoomService } from '../with-service';
import { handleError } from '../../helper';
import { useParams, useHistory } from 'react-router-dom';
import { setSelectedRoom } from '../../actions/room'

const InvitePage = ({ RoomService, setSelectedRoom }) => {
    const history = useHistory();

    const { id: roomId } = useParams()
    const [response, setResponse] = useState("");

    useEffect(() => {
        (async function fetch() {
            const fetchRooms = async () => {
                return await RoomService.addInvitedUser(roomId)
                    .then(response => {
                        setResponse(response);
                        setSelectedRoom(roomId)
                        history.push(`/rooms/${roomId}`);
                    })
                    .catch(e => handleError(e.response, history));
            };
            fetchRooms()
        })();
        // eslint-disable-next-line
    }, []);

    return (
        <section>
            <Container>
                <Row>
                    <Col>
                        <div className="mt-5 text-center">
                            {response ? response.statusText : <Spinner />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

const mapStateToProps = ({ rooms: { rooms, loading }, modal: { modal, modalProps } }) => {
    return {
        rooms,
        loading,
        modal,
        modalProps
    };
};

const mapDispatchToProps = {
    setSelectedRoom
}

export default WithRoomService()(connect(mapStateToProps, mapDispatchToProps)(InvitePage));
