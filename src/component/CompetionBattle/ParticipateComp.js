import {Fragment} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Header from '../header/Header'
import Footer from '../footer/Footer';
import classes from './participate.module.css';

import Mcq from './TestType/Mcq';

function ParticipateComp(){
    return(
        <Fragment>
            <Header/>
            <Container fluid className={classes.darkBg}>
                <Container>
                    <Row className="gx-0 py-4">
                        <Col md={4} className="p-2">
                            <Row className="gx-0 mb-3">
                                <div className = {`${classes.pWhitebox}`}>
                                    <h3>Compitition 1</h3>
                                    <div className="mb-2"><strong>Letter Identification</strong></div>
                                    <div>Starts at: 10:30 am, Ends at 11:30 am<br/>
                                    Total questions: 20</div>
                                    <Button variant="primary" className="mt-3">Start</Button>
                                </div>
                            </Row>
                            <Row className="gx-0 mb-3">
                                <div className = {`${classes.pWhitebox}`}>
                                    <h3>Compitition 2</h3>
                                    <div className="mb-2"><strong>Letter Identification</strong></div>
                                    <div>Starts at: 10:30 am, Ends at 11:30 am<br/>
                                    Total questions: 20</div>
                                    <Button variant="primary" className="mt-3">Start</Button>
                                </div>
                            </Row>
                        </Col>
                        <Col md={8} className="p-2">
                            <Mcq/>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footer/>
        </Fragment>
    );
    
}
export default ParticipateComp;