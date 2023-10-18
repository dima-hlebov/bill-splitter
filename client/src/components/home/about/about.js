import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Heading from "../../heading";

import './about.sass'

const About = () => {
    return (
        <section className="about" id="about">
            <Container className="position-relative h-100">
                <Row>
                    <Col>
                        <Heading tag="h1" className="heading--center" text="BILL SPLITTER" />
                        <h2 className="about__sub-heading">New way to manage your group finance FAST</h2>
                        <p className="about__text">Bill Splitter is your go-to platform for effortlessly sharing expenses with friends and family. Our user-friendly app handles the math, so you don't have to. With Bill Splitter, enjoy stress-free bill splitting for every occasion.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default About;