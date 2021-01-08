import React from 'react';
import { Container, Row, Col} from 'reactstrap';

// import Form from '../form/form'

function ProfilePage() {


  return (
    <section>
      <Container>
        <Row>
          <Col >
            <h3 className="heading heading--2">Profile</h3>
            {/* <Form inputs={formInputs}/> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ProfilePage;
