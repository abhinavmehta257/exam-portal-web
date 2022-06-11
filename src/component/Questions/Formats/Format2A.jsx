import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";

function Format2A({ question, isMobile, answerUpdate, answer }) {
    const ans = answer || [];
    function change(e) {
        var temp = ans
        if (e.target.name !== "to2") {
            var temp = [e.target.value, ans[1] || null];
        } else {
            var temp = [ans[0] || null, e.target.value];
        }
        answerUpdate([...temp])
    }

    return (
        <Container className="mt-1">
            <h4>{question.title}</h4>
            <div className="d-flex mt-4" style={{ fontSize: "1.2rem", width: "fit-content" }}>
                {question.data.from && (
                    <p style={{ margin: "20px" }}>{question.data.from} {question.data.fromUnit} = </p>
                )}
                <div >
                    {!question.data.to1 && (
                        <input
                            className="digit"
                            type="number"
                            name="to1"
                            min={0}
                            max={9}
                            value={ans[0] || ""}
                            onChange={(e) => change(e)}
                        />
                    )}
                </div>
                {question.data.to1Unit && (
                    <p style={{ margin: "15px" }}>{question.data.to1Unit} . </p>
                )}
                <div >
                    {!question.data.to2 && (
                        <input
                            className="digit"
                            type="number"
                            name="to2"
                            min={0}
                            max={9}
                            value={ans[1] || ""}
                            onChange={(e) => change(e)}
                        />
                    )}
                </div>
                {question.data.to2Unit && (
                    <p style={{ margin: "auto 0 auto 1rem" }}>{question.data.to2Unit}</p>
                )}
            </div>
        </Container>
    );
}

export default Format2A;
