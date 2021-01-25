import React from 'react';
import { Container, Row, Col} from 'reactstrap';

import Form from '../forms/sign-up-form';
import Heading from '../heading'

function SignUpPage() {
  return (
    <section>
      <Container>
        <Row>
          <Col>
            <Heading tag="h2" className="headin heading--2" text="Sign up" />
            <div className="d-flex flex-column align-items-center">
              <Form/>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SignUpPage;
