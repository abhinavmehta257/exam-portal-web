import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import classes from './section1.module.css';
import u1 from '../../images/u1.png';
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import PopUP from './PopUp';
import { useState } from 'react';

function Section1() {
    const navigate = useNavigate();

    const moveToCompetition = e => {
        navigate("/Competion");
    }

    const [popStatus, setPopStatus] = useState(false);

    const showPop = (e) => {
        setPopStatus(true);
    }
    const closePop = () => {
        setPopStatus(false);
    }
    let condPopup;

    if (popStatus) {
        condPopup = <PopUP
            heading="Heading"
            content="Hello"
            detailList={[["First", "LKG_Maths_first"], ["Second", "LKG_Maths_second"], ["Second", "LKG_Maths_third"]]}
            exitPop={closePop}
        />

    } else {
        condPopup = "";
    }

    return (
        <Container className='my-4'>
            <Row>
                <Col md={3}>

                    <Col className={`${classes.s1LeftBoxes} ${classes.s1lbGreen} mb-3 p-2 text-center`}>

                        <h4 className={classes.s1lbGreenheading}>Competitions</h4>
                        <p>
                            We help students to learn from the basics and improve their level with customized questions of different level.
                        </p>
                        <Button variant="success" onClick={moveToCompetition}>Participate</Button>
                    </Col>

                    <Col className={`${classes.s1LeftBoxes} ${classes.s1lbGreen} mb-3 p-2 text-center`}>
                        <h4 className={classes.s1lbGreenheading}>Battles</h4>
                        <p>
                            Every Battle has 25 questions and based on performance top 10 performer will be appeared on the page.
                        </p>
                        <Button variant="success">Participate</Button>
                    </Col>
                </Col>
                <Col md={6} className={`${classes.s1Leftbox}`}>

                    {condPopup}
                    <Row>
                        <Col sm={6}>
                            <div className={`rounded  p-3 mb-2 ${classes.boxGreen}`}>
                                <h3>LKG</h3>
                                Lorem ipsum dolor sit amet.
                                <div className={`${classes.boxDividerBorderGreen} ${classes.boxDivider} d-flex`}>
                                    <Col className={classes.subject} onClick={showPop} data="maths_LKG">
                                        Maths
                                    </Col>
                                    <Col className={classes.subject} onClick={showPop} data="lr_LKG"> LR</Col>
                                    <Col> Aptitude</Col>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={`rounded  p-3 mb-2 ${classes.boxOrange}`}>
                                <h3>UKG</h3>
                                Lorem ipsum dolor sit amet.
                                <div className={`${classes.boxDividerBorderOrange} ${classes.boxDivider} d-flex`}>
                                    <Col>Maths</Col>
                                    <Col>LR</Col>
                                    <Col>Aptitude</Col>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <div className={`rounded  p-3 mb-2 ${classes.boxBlue}`}>
                                <h3>Class I</h3>
                                Lorem ipsum dolor sit amet.
                                <div className={`${classes.boxDividerBorderBlue} ${classes.boxDivider} d-flex`}>
                                    <Col>Maths</Col>
                                    <Col>LR</Col>
                                    <Col>Aptitude</Col>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={`rounded  p-3 mb-2 ${classes.boxDblue}`}>
                                <h3>Class II</h3>
                                Lorem ipsum dolor sit amet.
                                <div className={`${classes.boxDividerboxDblue} ${classes.boxDivider} d-flex`}>
                                    <Col>Maths</Col>
                                    <Col>LR</Col>
                                    <Col>Aptitude</Col>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <div className={`rounded  p-3 mb-2 ${classes.boxDorange}`}>
                                <h3>Class III</h3>
                                Lorem ipsum dolor sit amet.
                                <div className={`${classes.boxDividerBorderDorange} ${classes.boxDivider} d-flex`}>
                                    <Col>Maths</Col>
                                    <Col>LR</Col>
                                    <Col>Aptitude</Col>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={`rounded  p-3 mb-2 ${classes.boxDgreen}`}>
                                <h3>Class IV</h3>
                                Lorem ipsum dolor sit amet.
                                <div className={`${classes.boxDividerBorderDgreen} ${classes.boxDivider} d-flex`}>
                                    <Col>Maths</Col>
                                    <Col>LR</Col>
                                    <Col>Aptitude</Col>
                                </div>
                            </div>
                        </Col>
                    </Row>





                </Col>

                <Col md={3}>
                    <div className={`rounded p-4 mb-2 overflow-auto ${classes.customTopbox} ${classes.boxBlack} `}>
                        <h3 className="mb-4">Top 10 Performer</h3>
                        <ol className={`list-inline  ${classes.listInline}`} >
                            <li>
                                <div className="d-flex align-items-center">
                                    <div className="pe-3">1.</div>
                                    <div className={`pe-3 ${classes.toperImg}`}>
                                        <img src={u1} alt="Toppers" className="rounded-circle" />
                                    </div>
                                    <div className="toperTxt">Andy</div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex align-items-center">
                                    <div className="pe-3">2.</div>
                                    <div className={`pe-3 ${classes.toperImg}`}>
                                        <img src={u1} alt="Toppers" className="rounded-circle" />
                                    </div>
                                    <div className="toperTxt">Andy</div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex align-items-center">
                                    <div className="pe-3">3.</div>
                                    <div className={`pe-3 ${classes.toperImg}`}>
                                        <img src={u1} alt="Toppers" className="rounded-circle" />
                                    </div>
                                    <div className="toperTxt">Andy</div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex align-items-center">
                                    <div className="pe-3">4.</div>
                                    <div className={`pe-3 ${classes.toperImg}`}>
                                        <img src={u1} alt="Toppers" className="rounded-circle" />
                                    </div>
                                    <div className="toperTxt">Andy</div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Section1;