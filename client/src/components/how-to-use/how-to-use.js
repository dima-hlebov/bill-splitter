import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import './how-to-use.sass'

import groupImg from './img/group.png'
import collectImg from './img/collect.png'
import ItemListImg from './img/item-list.png'
// import receiptImg from './img/receipt.png'
import shareLinkImg from './img/share-link.png'

const HowToUse = () => {
    return (
        <section className="how-to-use" id="how-to-use">
            <Container className="h-100">
                <Row>
                    <Col>
                        <h2 className="heading heading--center">HOW TO USE</h2>
                        {items()}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HowToUse;

const items = () => {
    const itemContent = [
        ['1. Make a room', groupImg],
        ['2. Add items you paid for', ItemListImg],
        ['3. Give your friends an invitation link', shareLinkImg],
        ['4. Collect money', collectImg]
    ];
    return itemContent.map((content, i) => {
        return (
            <Row key={i} className="mb-5">
                <Col className="d-flex align-items-center justify-content-center">
                    <p className="how-to-use__text">{content[0]}</p>
                </Col>
                <Col>
                    <img className="how-to-use__img" src={content[1]} alt="Group of people" />
                </Col>
            </Row>
        )
    });
};