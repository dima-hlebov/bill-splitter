import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";

import Heading from "../heading";

import Form from '../forms/sign-in-form';

function LoginPage() {
  return (
    <section>
      <Container>
        <Row>
          <Col>
            <Heading tag="h2" className="heading heading--2" text="Sign in" />
            <div className="d-flex flex-column align-items-center">
              <Form />
              <span >Don't have account yet? Fast<Link to="/sign-up"> sign up</Link></span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoginPage;
