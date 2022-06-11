import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { Alert, Modal } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import { useSelector, useDispatch } from "react-redux";
import { NEW_LOGIN, userRegistration } from "../../redux/actions/UserActions";
import { useToasts } from "react-toast-notifications";

function RegisterModal(props) {
  const [userData, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    repassword: "",
    country: "IN",
  });

  const user = useSelector((selector) => selector.user);
  const dispatch = useDispatch();
  const [passwordNotMatch, setPasswordMatch] = useState(false);
  const [noEmail, setNoEmail] = useState(false);
  const { addToast } = useToasts();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userData, [name]: value });
  };

  const handleSubmit = () => {
    if (userData.password === userData.repassword) {
      setPasswordMatch(false);
      dispatch(
        userRegistration(
          noEmail,
          userData.name,
          userData.email,
          userData.mobile,
          userData.password,
          userData.country
        )
      ).then((x) => {
        if (x) {
          props.handleClose();
          addToast("Your Account is Created Please Login!", {
            appearance: "success",
            autoDismissTimeout: 50000,
          });
        }
      });
    } else {
      setPasswordMatch(true);
    }
  };

  useEffect(() => {
    dispatch({ type: NEW_LOGIN });
  }, [dispatch]);

  return (
    <Modal
      show={props.show}
      backdrop="static"
      onHide={props.handleClose}
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>

      <Container className="p-4">
        <Form>
          {user.createError && (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              {Array.isArray(user.createError) ? (
                user.createError.map((ele, i) => <p key={i}>{ele.msg}</p>)
              ) : (
                <p>{user.createError}</p>
              )}
            </Alert>
          )}

          <Form.Group className="mb-2" controlId="name">
            <Form.Label>Parent Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            {/* <Form.Text className="text-muted">Error</Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-2" controlId="isEmail">
            <Form.Check
              type="checkbox"
              label="Check if You don't have email."
              value={noEmail}
              onChange={(e) => setNoEmail(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Id"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={noEmail}
            />
            {/* <Form.Text className="text-muted">Error</Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-2" controlId="phone">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Mobile Number"
              name="mobile"
              value={userData.mobile}
              onChange={handleChange}
            />
            {/* <Form.Text className="text-muted">Error</Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="repassword"
              value={userData.repassword}
              onChange={handleChange}
            />
            {passwordNotMatch && (
              <Form.Text className="text-danger">
                Password and Confirm Password Doesn't match
              </Form.Text>
            )}
            {/* <Form.Text className="text-muted">Error</Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-2" controlId="Country">
            <Form.Label>Country</Form.Label>
            <ReactFlagsSelect
              countries={["IN", "GB"]}
              selected={userData.country}
              onSelect={(code) =>
                setUser({
                  ...userData,
                  country: code,
                })
              }
            />

            {/* <Form.Text className="text-muted">Error</Form.Text> */}
          </Form.Group>
        </Form>
      </Container>

      <Modal.Footer>
        <Button
          variant="primary"
          disabled={user.isLoading || user.isCreated}
          onClick={handleSubmit}
        >
          {user.isLoading ? "Loading..." : "Register"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;
