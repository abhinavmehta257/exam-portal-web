import classes from '../../CompetionBattle/TestType/testType.module.css';
import { FaVolumeUp, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Row, Col, Button } from 'react-bootstrap';

function Mcq() {
    return (
        <Row className="gx-0">
            <div>
                <div className={classes.rubricQ}>
                    <div className={classes.icon}><FaVolumeUp /></div>
                    <div className={classes.txt}>Heading of the question will come here.</div>
                </div>

                <div className={classes.options}>
                    <Row className="gx-0">
                        <Col md={6} className={`${classes.correctIcon} ${classes.option}`}>A. Option 1</Col>
                        <Col md={6} className={classes.option}>B. Option 1</Col>
                    </Row>
                    <Row className="gx-0">
                        <Col md={6} className={classes.option}>C. Option 1</Col>
                        <Col md={6} className={classes.option}>D. Option 1</Col>
                    </Row>
                </div>

                <div className={`${classes.checkButtons} mt-3`}>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col className="col-auto"><FaAngleLeft /></Col>
                        <Col className="col-auto"><Button variant="primary">Check</Button></Col>
                        <Col className="col-auto"><FaAngleRight /></Col>
                    </Row>
                </div>
            </div>
        </Row>
    );
}

export default Mcq;