import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotLoggedIn() {
  return (
    <div className="d-flex" style={{ width: "100vw", height: "100vh" }}>
      <Alert variant="danger" className="m-auto">
        <Alert.Heading>Error 401</Alert.Heading>
        <p>
          Either you are not logged in or you are not Authorized to view this.
        </p>
        <hr />
        <Link to="/">Click Here</Link> to Log In.
      </Alert>
    </div>
  );
}

export default NotLoggedIn;
