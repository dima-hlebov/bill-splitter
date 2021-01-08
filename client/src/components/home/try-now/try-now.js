import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import Heading from "../../heading";

import './try-now.sass';

const TryNow = ({isLoggedIn}) => {

    return(
        <section className="try-now" id="try-now">
            <Container className="position-relative h-100">
                <Row>
                    <Col>
                        <Heading tag="h2" className="heading" text="Share Your bill fast!" />
                        {isLoggedIn ? 
                            <Link className="button button--main" to="/rooms">Try now</Link> :
                            <Link className="button button--main" to="/sign-in">Try now</Link>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

const mapStateToProps = ({auth: {isLoggedIn}}) => {
    return {
        isLoggedIn
    }
}

export default connect(mapStateToProps)(TryNow);