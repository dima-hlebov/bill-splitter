import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { WithRoomService } from '../with-service';
import { handleError } from '../../helper';
import { useParams, useHistory } from 'react-router-dom';

const InvitePage = ({RoomService}) => {
    const history = useHistory();

    const { id: roomId } = useParams()
    
    const [response, setResponse] = useState("");

    useEffect(() =>{
        (async function fetch() {
            const fetchRooms = async () => {
                return await RoomService.addInvitedUser(roomId)
                    .then(response => {
                        history.push("/rooms");
                    })
                    .catch(e => handleError(e.response, history));
            };
            setResponse(await fetchRooms());
        })();
        // eslint-disable-next-line
      }, []);

    return (
        <section>
        <Container>
            <Row>
            <Col>
                <div className="mt-5 text-center">
                    {response}
                </div>
            </Col>
            </Row>
        </Container>
        </section>
    );
};

export default WithRoomService()(InvitePage);
