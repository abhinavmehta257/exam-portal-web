import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { IMAGE_URL, stringError } from "../../helper/common";
import LoginService from "../../services/loginService";

function StudentCard({ student }) {
  return (
    <div className="col-md-3 p-2">
      <Card>
        <Card.Body>
          <div className="d-flex mb-3">
            <img
              src={`${IMAGE_URL}${student.profile || "user.png"}`}
              alt="Profile"
              className="profile"
              width={64}
              height={64}
            />
            <div className="ml-2">
              <Card.Title>{student.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Premium Membership
              </Card.Subtitle>
            </div>
          </div>
          <Button variant="primary" className="w-100">
            Pay For Subscription
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

function ParentStudentProfiles() {
  const [isLoading, setISloading] = useState(true);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const { addToast } = useToasts();

  useEffect(() => {
    LoginService.listStudents()
      .then((students) => {
        if (students.length === 0) {
          navigate("/parent/add/student");
        } else {
          setISloading(false);
          setStudents(students);
        }
      })
      .catch(
        stringError((x) =>
          addToast(x, {
            appearance: "error",
            autoDismissTimeout: 10000,
          })
        )
      );
  }, [navigate, addToast]);

  return (
    <Container>
      <h2 className="mb-3">{isLoading ? "Loading..." : "Student Profiles"}</h2>
      <Row>
        {students.map((ele) => (
          <StudentCard key={ele._id} student={ele} />
        ))}
      </Row>
    </Container>
  );
}

export default ParentStudentProfiles;
