import React from "react";
import { Container, Form } from "react-bootstrap";

function Format2({ question, isMobile, answerUpdate, answer }) {
  function change(el) {
    answerUpdate(el.target.value);
  }

  return (
    <Container className="mt-1">
      <h4>{question.title}</h4>
      {/* todo body Image */}
      {/* todo description */}
      <div className="d-flex mt-4" style={{ fontSize: "1.2rem" }}>
        {!question.data.lhs && (
          <Form.Control
            type="text"
            placeholder=""
            onChange={change}
            value={answer || ""}
            style={{ width: "100px", borderColor: "black" }}
          />
        )}
        {question.data.lhs && (
          <p style={{ margin: "auto 0 auto 1rem" }}>{question.data.lhs}</p>
        )}

        <label style={{ margin: "auto 0 auto 1rem" }}>
          {question.data.lhsUnit}
        </label>

        <span style={{ margin: "auto 1rem" }}>=</span>

        {!question.data.rhs && (
          <Form.Control
            type="text"
            placeholder=""
            onChange={change}
            value={answer || ""}
            style={{ width: "100px", borderColor: "black" }}
          />
        )}
        {question.data.rhs && (
          <p style={{ margin: "auto 0 auto 1rem" }}>{question.data.rhs}</p>
        )}
        <label style={{ margin: "auto 0 auto 1rem" }}>
          {question.data.rhsUnit}
        </label>
      </div>
    </Container>
  );
}

export default Format2;
