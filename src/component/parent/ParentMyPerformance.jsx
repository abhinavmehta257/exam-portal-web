import {Container, Row, Col} from 'react-bootstrap';
import classes from './parentStudent.module.css';
import { BiQuestionMark,  BiTimer, BiBookReader, BiTask } from "react-icons/bi";
import calender from '../../images/calender.jpg'

function ParentMyPerformance(props){
    return(
        <Container fluid>
            <h2>{props.heading}</h2>
            <Row className="gx-0">
                <Col lg={3} sm={6} className="p-2">
                    <div className={`${classes.whiteInfo} p-2`}>
                        <Row>
                            <Col xs={8} className="text-center">
                                <h3 className={`${classes.wHeading} mb-0`}>Ques. Answered</h3>
                                <div className={`${classes.wNumber}`}>
                                    5
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div className={`${classes.wIcons} bg-primary`}><BiQuestionMark/></div>
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
                                <h3 className={`${classes.wHeading} mb-0`}>Time spent</h3>
                                <div className={`${classes.wNumber}`}>
                                    23 Hrs
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div className={`${classes.wIcons} bg-success`}><BiTimer/></div>
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
                                <h3 className={`${classes.wHeading} mb-0`}>Days practised</h3>
                                <div className={`${classes.wNumber}`}>
                                    3
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div className={`${classes.wIcons} bg-danger`}><BiBookReader/></div>
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
                                <h3 className={`${classes.wHeading} mb-0`}>Correct Answers</h3>
                                <div className={`${classes.wNumber}`}>
                                    200
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
                <Col lg={6} className="p-2">
                    <div className={`${classes.whiteInfo} p-2`}>
                        <h3 className={classes.timeSpentHeading}>Time Spent</h3>
                        <img src={calender} alt="calender"/>
                    </div>
                </Col>
                <Col lg={6} className="p-2">
                    <Row className="gx-0">
                        <div className={`${classes.whiteInfo} p-2`}>
                            <h3 className={classes.timeSpentHeading}>Skills Mastered</h3>
                            <ul>
                                <li>Maths</li>
                                <li>English</li>
                            </ul>
                        </div>
                    </Row>
                    <Row className="gx-0">
                        <div className={`${classes.whiteInfo} p-2 mt-3`}>
                            <h3 className={classes.timeSpentHeading}>Skills Mastered in a Week</h3>
                            <ul>
                                <li>Maths</li>
                                <li>English</li>
                            </ul>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default ParentMyPerformance;
