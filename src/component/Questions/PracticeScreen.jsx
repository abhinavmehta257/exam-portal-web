import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../footer/Footer";
import InfoHeader from "../infoheader/InfoHeader";
import ScoreBar from "../Student/ScoreBar";
import TopicsSameSubject from "../Student/TopicsSameSubject";
import QuestionContent from "./QuestionContent";

function PracticeScreen() {
  return (
    <React.Fragment>
      <InfoHeader />
      <Container fluid className={`px-0`}>
        <Row className="gx-0" style={{ minHeight: "85vh" }}>
          <Col md={2}>
            <TopicsSameSubject />
          </Col>
          <Col md={8} className="p-3">
            <QuestionContent />
          </Col>
          <Col md={2}>
            <ScoreBar />
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default PracticeScreen;
