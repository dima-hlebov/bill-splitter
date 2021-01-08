import React from 'react';
import {Container, Row, Col} from 'reactstrap';

import './how-to-use.sass'

import groupImg from './img/group.png'
import collectImg from './img/collect.png'
import ItemListImg from './img/item-list.png'
import receiptImg from './img/receipt.png'
import shareLinkImg from './img/share-link.png'

const HowToUse = () => {
    return(
        <section className="how-to-use" id="how-to-use">
            <Container className="h-100">
                <Row>
                    <Col>
                        <h1 className="heading heading--center">HOW TO USE</h1>
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
        ['1. Just make a group', groupImg],
        ['2. Add items you paied for', ItemListImg],
        ['2.a Or take a photo and our application\n will get them for you', receiptImg],
        ['3. Give your friends a link',  shareLinkImg],
        ['4. Collect money',  collectImg] 
    ];
    return itemContent.map((content, i) => {
        return (
            <Row key={i} className="mb-2">
                <Col className="d-flex align-items-center justify-content-center">
                    <p className="how-to-use__text">{content[0]}</p>
                </Col>
                <Col>
                    <img className="how-to-use__img"src={content[1]} alt="Group of people"/>
                </Col>
            </Row>
        )
    });
};