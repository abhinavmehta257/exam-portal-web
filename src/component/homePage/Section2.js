import Container from 'react-bootstrap/Container';
import doubleWhite from '../../images/sep-double-white.png';
import classes from './section2.module.css';
import Dropdown from 'react-bootstrap/Dropdown'

function Section2(){
    return(
        <div className={`container-fluid ${classes.s2} py-5 text-center`}>
            <Container>
                <h3>Start Practice</h3>
                <p>Lorem ipsum dolor sit amet consectetuer adipiscing elit sed diam nonummy</p>
                <img src={doubleWhite} alt=""/>

                <div class="row justify-content-center d-flex mt-5">
                    <div className="col-auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" className = {classes.btnWhite}>
                                Class
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">LKG</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">UKG</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Class I</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Class 2</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="col-auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" className = {classes.btnWhite}>
                                Subject
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Mathematics</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">LR</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Aptitude</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="col-auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" className = {classes.btnWhite}>
                                Topic
                            </Dropdown.Toggle>

                            <Dropdown.Menu className = {classes.btnWhite}>
                                <Dropdown.Item href="#/action-1">Addition</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Subtraction</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Multiplication</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Division</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Section2;