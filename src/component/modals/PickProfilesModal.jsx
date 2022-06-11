import React, { useState } from "react";
import { Button, Card, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_URL } from "../../helper/common";
import { addProfile } from "../../redux/actions/LoginActions";
import { userLogin } from "../../redux/actions/UserActions";
import ParentCreateStudent from "../parent/ParentCreateUser";
import classes from "./PickProfilesModal.module.css";

function ProfilesCard({ profile, onClick }) {
  return (
    <Card
      className={"mb-2 " + classes.card}
      onClick={() => onClick(profile._id)}
    >
      <Card.Body className="p-2">
        <div className="d-flex">
          <img
            src={`${IMAGE_URL}${profile.profile || "user.png"}`}
            alt="Profile"
            className="profile"
            width={64}
            height={64}
          />
          <div className="ml-2">
            <Card.Title>{profile.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {profile.role}
            </Card.Subtitle>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function PickProfilesModal(props) {
  const [role, setRole] = useState("");
  const [addNewStudent, setAddNewStudent] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((selector) => selector.user);
  const login = useSelector((selector) => selector.login);

  function pickProfile(id) {
    const profile = (props.profiles || []).filter((ele) => ele._id === id);
    if (profile && profile.length > 0) {
      setRole(profile[0].role);
      setSelectedProfile(profile[0]);
    }
  }

  function submit() {
    if (selectedProfile) {
      dispatch(userLogin(selectedProfile._id, password));
    }
  }

  function PasswordForm() {
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Form.Group className="mb-2" controlId="name">
          <Form.Label>
            Please Enter your {role === "PARENT" ? "Password" : "Passcode"}.
          </Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {user.error && (
            <Form.Text className="text-danger mr-2">
              {Array.isArray(user.error) ? user.error.join(", ") : user.error}
            </Form.Text>
          )}
        </Form.Group>
      </Form>
    );
  }

  function getTitle() {
    if (addNewStudent) return "Add New Student";
    if (role === "") return "Pick Profile";
    return "Enter your Credentials";
  }

  function AddNewStudent() {
    return (
      <Container className="p-2">
        <ParentCreateStudent
          modal={true}
          token={login.token}
          addUser={(user) => {
            // console.log(user);
            dispatch(addProfile(user));
          }}
        />
      </Container>
    );
  }

  return (
    <Modal
      show={props.show}
      backdrop="static"
      onHide={() => {
        if (addNewStudent) {
          setAddNewStudent(false);
        } else {
          props.handleClose();
        }
      }}
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{getTitle()}</Modal.Title>
      </Modal.Header>
      {addNewStudent && AddNewStudent()}
      {!addNewStudent && (
        <div>
          <Container className={"p-4 " + classes.container}>
            {role === "" && (
              <Row>
                {(props.profiles || []).map((ele) => (
                  <ProfilesCard
                    key={ele._id}
                    profile={ele}
                    onClick={pickProfile}
                  />
                ))}
              </Row>
            )}

            {role !== "" && PasswordForm()}
          </Container>
          <Modal.Footer>
            {role === "" && (
              <Button
                variant="primary"
                className="w-100"
                onClick={() => setAddNewStudent(true)}
              >
                Add New Student
              </Button>
            )}
            {role !== "" && (
              <div className="w-100 d-flex justify-content-between">
                <Button variant="danger" onClick={() => setRole("")}>
                  Back
                </Button>
                <Button variant="primary" onClick={submit}>
                  Submit
                </Button>
              </div>
            )}
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
}

export default PickProfilesModal;
