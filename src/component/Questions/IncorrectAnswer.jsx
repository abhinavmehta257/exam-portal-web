import React from "react";
import { Alert, Container } from "react-bootstrap";

function IncorrectAnswer() {
  return (
    <Container>
      <Alert variant="danger">
        <Alert.Heading>You can do Better!!</Alert.Heading>
        <p>Your answer is incorrect!!</p>
      </Alert>
    </Container>
  );
}

export default IncorrectAnswer;
