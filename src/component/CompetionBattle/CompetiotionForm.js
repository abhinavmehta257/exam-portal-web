import BlackCover from '../utilities/BlackCover'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React from "react";
import Select from 'react-select'

const styles = {
    multiValue: styles => {
        return {
            ...styles,
            backgroundColor: "papayawhip"
        };
    }
};

function CompetitionForm(props) {
    return (
        <BlackCover onClick={props.onSubmit}>
            <h2 className="text-center my-4">New Competition</h2>
            <Container>
                <Form>
                    <Row className="mb-3">
                        <Col md={6}>Region</Col>
                        <Col md={6}>
                            <Select
                                styles={styles}
                                closeMenuOnSelect={true}
                                options={[
                                    { value: "UK", label: "UK" },
                                    { value: "US", label: "US" }
                                ]}
                            //defaultValue={{ value: "React", label: "React" }}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>Year/Level</Col>
                        <Col md={6}>
                            <Select
                                styles={styles}
                                closeMenuOnSelect={true}
                                options={[
                                    { value: "1", label: "1" },
                                    { value: "2", label: "2" },
                                    { value: "3", label: "3" },
                                    { value: "4", label: "4" },
                                    { value: "5", label: "5" },
                                    { value: "6", label: "6" }
                                ]}
                            //defaultValue={{ value: "React", label: "React" }}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>Subject</Col>
                        <Col md={6}>
                            <Select
                                styles={styles}
                                closeMenuOnSelect={true}
                                isMulti
                                options={[
                                    { value: "Maths", label: "Maths" },
                                    { value: "Logical reasoning", label: "Logical reasoning" },
                                    { value: "Aptitude", label: "Aptitude" }
                                ]}
                            //defaultValue={{ value: "React", label: "React" }}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>Skill</Col>
                        <Col md={6}>
                            <Select
                                styles={styles}
                                closeMenuOnSelect={true}
                                isMulti
                                options={[
                                    { value: "Skill 1", label: "Skill 1" },
                                    { value: "Skill 2", label: "Skill 2" },
                                    { value: "Skill 3", label: "Skill 3" }
                                ]}
                            //defaultValue={{ value: "React", label: "React" }}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}><h4 className="text-center my-4">Schedule Competition</h4></Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>Competition heading</Col>
                        <Col md={6}>
                            <Form.Control type="input" name="name" placeholder="Name" />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>Date</Col>
                        <Col md={6}>
                            <Form.Control type="date" name="date" placeholder="Name" />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={3}>Start time</Col>
                        <Col md={3}>
                            <Form.Control type="time" name="date" placeholder="Name" />
                        </Col>
                        <Col md={3}>End time</Col>
                        <Col md={3}>
                            <Form.Control type="time" name="date" placeholder="Name" />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>No. of Questions</Col>
                        <Col md={6}>
                            <Form.Control type="number" name="number" placeholder="25" value="25" />
                        </Col>
                    </Row>
                    <div class="col-auto px-1 text-center">
                        <Button variant="primary" onClick={props.onSubmit}>Submit</Button>
                    </div>
                </Form>
            </Container>
        </BlackCover>
    );
}

export default CompetitionForm;