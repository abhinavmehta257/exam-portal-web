import {Container, Col, Row} from 'react-bootstrap';
import classes from './parentStudent.module.css';
import { BiCheckDouble, BiAward, BiCoin, BiTask } from "react-icons/bi";

function ParentDashboard(props){
    return(
        <Container fluid>
            <h2>{props.heading}</h2>
            <Row className="gx-0">
                <Col lg={3} sm={6} className="p-2">
                    <div className={`${classes.whiteInfo} p-2`}>
                        <Row>
                            <Col xs={8} className="text-center">
                                <h3 className={`${classes.wHeading} mb-0`}>Recommendation</h3>
                                <div className={`${classes.wNumber}`}>
                                    5
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div className={`${classes.wIcons} bg-primary`}><BiCheckDouble/></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={classes.wText}>Some text about this will come here. This is dummy text. </Col>
                        </Row>
                    </div>
                </Col>
                <Col lg={3} sm={6} className="p-2">
                <div className={`${classes.whiteInfo} p-2`}>
                        <Row>
                            <Col xs={8} className="text-center">
                                <h3 className={`${classes.wHeading} mb-0`}>Awards</h3>
                                <div className={`${classes.wNumber}`}>
                                    2
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div className={`${classes.wIcons} bg-success`}><BiAward/></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={classes.wText}>Some text about this will come here. This is dummy text. </Col>
                        </Row>
                    </div>
                </Col>
                <Col lg={3} sm={6} className="p-2">
                <div className={`${classes.whiteInfo} p-2`}>
                        <Row>
                            <Col xs={8} className="text-center">
                                <h3 className={`${classes.wHeading} mb-0`}>Golden Coins</h3>
                                <div className={`${classes.wNumber}`}>
                                    3
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div className={`${classes.wIcons} bg-danger`}><BiCoin/></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={classes.wText}>Some text about this will come here. This is dummy text. </Col>
                        </Row>
                    </div>
                </Col>
                <Col lg={3} sm={6} className="p-2">
                <div className={`${classes.whiteInfo} p-2`}>
                        <Row>
                            <Col xs={8} className="text-center">
                                <h3 className={`${classes.wHeading} mb-0`}>SuperC Score</h3>
                                <div className={`${classes.wNumber}`}>
                                    10
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div className={`${classes.wIcons} bg-warning`}><BiTask/></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={classes.wText}>Some text about this will come here. This is dummy text. </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row className="gx-0">
                <Col sm={6} className="p-2">
                    <div className={`${classes.whiteInfo} p-3`}>
                        <h3 className={classes.wInfoHeading}>Award List</h3>
                        <ol>
                            <li>Maths Exam Topper</li>
                            <li>Maths Exam Topper</li>
                            <li>Maths Exam Topper</li>
                        </ol>
                    </div>
                </Col>
                
                <Col sm={6} className="p-2">
                    <div className={`${classes.whiteInfo} p-3`}>
                        <h3 className={classes.wInfoHeading}>Upcomings</h3>
                        <Row className={classes.borderBottom}>
                            <Col sm={2}>
                                <Row>
                                    <Col xs={4} className={classes.wDate}>3</Col>
                                    <Col xs={8} className={classes.wMonth}>Dec<br/>2021</Col>
                                </Row>
                            </Col>
                            <Col sm={10} className="ps-3 pt-2">Details of events will come here. This is details of the event.Details of events will come here. This is details of the event.</Col>
                        </Row>
                        <Row className={classes.borderBottom}>
                            <Col sm={2}>
                                <Row>
                                    <Col xs={4} className={classes.wDate}>3</Col>
                                    <Col xs={8} className={classes.wMonth}>Dec<br/>2021</Col>
                                </Row>
                            </Col>
                            <Col sm={10} className="ps-3 pt-2">Details of events will come here. This is details of the event.Details of events will come here. This is details of the event.</Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ParentDashboard;