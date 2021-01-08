import React from 'react';
import {Container, Row, Col} from 'reactstrap';

import Heading from "../../heading";

import './about.sass'

const About = () => {
    return(
        <section className="about" id="about">
            <Container className="position-relative h-100">
                <Row>
                    <Col>
                        <Heading tag="h1" className="heading--center" text="BILL SPLITTER"/>
                        <h2 className="about__sub-heading">New way to manage your group finance FAST</h2>
                        <p className="about__text">Bill splitter allows you to pay for your friends and return your money back in 
                            a matter of minutes. 
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default About;